import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import ProjectCard from '../components/ui/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { supabase } from '../lib/supabaseClient';
import type { Project } from '../data/projects';

export default function Works() {
    const { projects, refetch } = useProjects();
    const [localProjects, setLocalProjects] = useState<Project[]>(projects);
    const [isAdmin, setIsAdmin] = useState(false);
    const [colorMessage, setColorMessage] = useState('');
    const [draftColors, setDraftColors] = useState<Record<string, string>>({});

    useEffect(() => {
        setLocalProjects(projects);
        setDraftColors({});
    }, [projects]);

    useEffect(() => {
        if (!supabase) return;
        let active = true;
        const init = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            if (!active) return;
            if (sessionData.session) {
                const { data } = await supabase.rpc('is_admin');
                if (active) setIsAdmin(Boolean(data));
                if (active) refetch();
            } else {
                setIsAdmin(false);
            }
        };
        init();
        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!active) return;
            if (session) {
                const { data } = await supabase.rpc('is_admin');
                if (active) setIsAdmin(Boolean(data));
                if (active) refetch();
            } else {
                setIsAdmin(false);
            }
        });
        return () => {
            active = false;
            listener.subscription.unsubscribe();
        };
    }, [refetch]);

    const updateProjectColor = async (project: Project, color: string) => {
        if (!project.id) {
            setColorMessage('Color update failed: missing project id.');
            return;
        }
        const previous = project.color;
        setLocalProjects((prev) =>
            prev.map((item) => (item.id === project.id ? { ...item, color } : item)),
        );
        if (!supabase) return;
        const { error } = await supabase.from('projects').update({ color }).eq('id', project.id);
        if (error) {
            setLocalProjects((prev) =>
                prev.map((item) => (item.id === project.id ? { ...item, color: previous } : item)),
            );
            setColorMessage(`Color update failed: ${error.message}`);
            return;
        }
        setDraftColors((prev) => {
            const next = { ...prev };
            delete next[project.id!];
            return next;
        });
        setColorMessage('Color updated.');
    };

    const colorDraftValue = useMemo(() => {
        return (project: Project) => {
            if (!project.id) return project.color || '#111111';
            return draftColors[project.id] ?? project.color ?? '#111111';
        };
    }, [draftColors]);

    const container = {
        hidden: { opacity: 0, y: 12 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
    };

    return (
        <motion.div className="page-section" variants={container} initial="hidden" animate="show">
            <motion.div variants={item} style={{ fontSize: '1.5rem', marginBottom: '50px' }}>
                These are my projects:
            </motion.div>

            {isAdmin && colorMessage && (
                <div className="admin-message" style={{ marginBottom: '14px' }}>
                    {colorMessage}
                </div>
            )}
            <motion.div className="projects-grid" variants={container} initial={false} animate="show">
                {localProjects.map((project) => (
                    <motion.div key={project.name} variants={item} className="project-card-wrap">
                        {isAdmin && (
                            <div className="project-color-admin">
                                <input
                                    type="color"
                                    value={colorDraftValue(project)}
                                    onChange={(event) => {
                                        if (!project.id) return;
                                        const color = event.target.value;
                                        setDraftColors((prev) => ({ ...prev, [project.id!]: color }));
                                        setLocalProjects((prev) =>
                                            prev.map((item) =>
                                                item.id === project.id ? { ...item, color } : item,
                                            ),
                                        );
                                    }}
                                    title="Pick project color"
                                />
                                <button
                                    className="project-color-save"
                                    type="button"
                                    onClick={() => updateProjectColor(project, colorDraftValue(project))}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
