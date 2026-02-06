import { useEffect, useMemo, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { defaultContent } from '../lib/contentDefaults';

type ProjectRow = {
  id?: string;
  name: string;
  img: string;
  github_url: string;
  hosted_url: string;
  description: string;
  color: string;
  sort_order: number;
};

const emptyProject: ProjectRow = {
  name: '',
  img: '',
  github_url: '',
  hosted_url: '',
  description: '',
  color: '#111111',
  sort_order: 0,
};

const contentKeys = ['about', 'skills', 'services', 'contact', 'socials'] as const;

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'content'>('projects');

  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectDraft, setProjectDraft] = useState<ProjectRow | null>(null);
  const [projectMessage, setProjectMessage] = useState('');
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [contentLoading, setContentLoading] = useState(false);
  const [contentMessage, setContentMessage] = useState('');
  const [contentMap, setContentMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!supabase || !session?.user?.email) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }
      const { data } = await supabase.rpc('is_admin');
      setIsAdmin(Boolean(data));
      setCheckingAdmin(false);
    };
    checkAdmin();
  }, [session]);

  const fetchProjects = async () => {
    if (!supabase) return;
    setProjectsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, img, github_url, hosted_url, description, color, sort_order')
      .order('sort_order', { ascending: true });
    if (!error && data) setProjects(data);
    setProjectsLoading(false);
  };

  const fetchContent = async () => {
    if (!supabase) return;
    setContentLoading(true);
    const { data } = await supabase.from('site_content').select('key, data').in('key', contentKeys);
    const nextMap: Record<string, string> = {};
    contentKeys.forEach((key) => {
      const row = data?.find((item) => item.key === key);
      const fallback = (defaultContent as Record<string, unknown>)[key];
      nextMap[key] = JSON.stringify(row?.data ?? fallback, null, 2);
    });
    setContentMap(nextMap);
    setContentLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchProjects();
    fetchContent();
  }, [isAdmin]);

  const handleSignIn = async () => {
    if (!supabase || !email || !password) return;
    setAuthMessage('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAuthMessage(error.message);
  };

  const handlePasswordReset = async () => {
    if (!supabase || !email) return;
    setAuthMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    if (error) setAuthMessage(error.message);
    else setAuthMessage('Password reset email sent.');
  };

  const handleUpdatePassword = async () => {
    if (!supabase || !newPassword) return;
    setAuthMessage('');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setAuthMessage(error.message);
    else setAuthMessage('Password updated.');
    setNewPassword('');
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const startNewProject = () => {
    setProjectDraft({ ...emptyProject });
    setProjectMessage('');
    setProjectImageFile(null);
  };

  const startEditProject = (project: ProjectRow) => {
    setProjectDraft({ ...project });
    setProjectMessage('');
    setProjectImageFile(null);
  };

  useEffect(() => {
    if (projectDraft && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [projectDraft]);

  const saveProject = async () => {
    if (!supabase || !projectDraft) return;
    setProjectMessage('');
    const payload = {
      name: projectDraft.name.trim(),
      img: projectDraft.img.trim(),
      github_url: projectDraft.github_url.trim(),
      hosted_url: projectDraft.hosted_url.trim(),
      description: projectDraft.description.trim(),
      color: projectDraft.color.trim(),
      sort_order: Number(projectDraft.sort_order) || 0,
    };
    if (projectDraft.id) {
      const { error } = await supabase.from('projects').update(payload).eq('id', projectDraft.id);
      if (error) {
        setProjectMessage(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from('projects').insert(payload);
      if (error) {
        setProjectMessage(error.message);
        return;
      }
    }
    setProjectDraft(null);
    setProjectImageFile(null);
    await fetchProjects();
    setProjectMessage('Saved.');
  };

  const deleteProject = async (projectId?: string, projectName?: string) => {
    if (!supabase || !projectId) return;
    const confirmation = window.prompt(
      `Type "delete" to confirm deleting ${projectName || 'this project'}.`,
    );
    if (confirmation !== 'delete') {
      setProjectMessage('Delete cancelled.');
      return;
    }
    const { error } = await supabase.from('projects').delete().eq('id', projectId);
    if (error) {
      setProjectMessage(error.message);
      return;
    }
    await fetchProjects();
    setProjectMessage('Deleted.');
  };

  const moveProject = async (index: number, direction: 'up' | 'down') => {
    if (!supabase) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const current = projects[index];
    const swap = projects[targetIndex];
    if (!current?.id || !swap?.id) return;

    const currentOrder = current.sort_order ?? index + 1;
    const swapOrder = swap.sort_order ?? targetIndex + 1;

    const { error: errorA } = await supabase
      .from('projects')
      .update({ sort_order: swapOrder })
      .eq('id', current.id);
    if (errorA) {
      setProjectMessage(errorA.message);
      return;
    }
    const { error: errorB } = await supabase
      .from('projects')
      .update({ sort_order: currentOrder })
      .eq('id', swap.id);
    if (errorB) {
      setProjectMessage(errorB.message);
      return;
    }
    await fetchProjects();
    setProjectMessage('Order updated.');
  };

  const uploadProjectImage = async () => {
    if (!supabase || !projectDraft || !projectImageFile) return;
    setProjectMessage('');
    const fileExt = projectImageFile.name.split('.').pop() || 'png';
    const safeName = projectDraft.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    const fileName = `${safeName || 'project'}-${crypto.randomUUID()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('project-images')
      .upload(fileName, projectImageFile, { upsert: false });
    if (error) {
      setProjectMessage(error.message);
      return;
    }
    const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
    if (data?.publicUrl) {
      setProjectDraft({ ...projectDraft, img: data.publicUrl });
      setProjectMessage('Image uploaded. Save the project to apply.');
    }
  };

  const saveContent = async (key: string) => {
    if (!supabase) return;
    setContentMessage('');
    try {
      const parsed = JSON.parse(contentMap[key]);
      const { error } = await supabase.from('site_content').upsert({ key, data: parsed });
      if (error) {
        setContentMessage(error.message);
        return;
      }
      setContentMessage('Saved.');
    } catch (err) {
      setContentMessage('Invalid JSON. Please fix and try again.');
    }
  };

  const resetContent = (key: string) => {
    const fallback = (defaultContent as Record<string, unknown>)[key];
    setContentMap((prev) => ({
      ...prev,
      [key]: JSON.stringify(fallback, null, 2),
    }));
  };

  const isReady = useMemo(() => isSupabaseConfigured, []);

  if (!isReady) {
    return (
      <div className="page-section admin-page">
        <h1 className="admin-title">Admin Panel</h1>
        <p className="admin-subtitle">Supabase is not configured yet.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-section admin-page">
        <h1 className="admin-title">Admin Login</h1>
        <p className="admin-subtitle">Email + password access.</p>
        <div className="admin-auth">
          <input
            className="admin-input"
            type="email"
            value={email}
            placeholder="you@email.com"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="admin-input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="services-btn" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="services-btn secondary" onClick={handlePasswordReset}>
            Forgot Password
          </button>
        </div>
        {authMessage && <div className="admin-message">{authMessage}</div>}
      </div>
    );
  }

  if (checkingAdmin) {
    return (
      <div className="page-section admin-page">
        <h1 className="admin-title">Admin Panel</h1>
        <p className="admin-subtitle">Checking access…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="page-section admin-page">
        <h1 className="admin-title">Access Denied</h1>
        <p className="admin-subtitle">This account does not have admin access.</p>
        <button className="services-btn" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="page-section admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Manage projects and content in one place.</p>
        </div>
        <div className="admin-header-actions">
          <button className="services-btn secondary" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
      <div className="admin-password">
        <div className="admin-password-title">Update Password</div>
        <div className="admin-auth">
          <input
            className="admin-input"
            type="password"
            value={newPassword}
            placeholder="New password"
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button className="services-btn secondary" onClick={handleUpdatePassword}>
            Update Password
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Site Content
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2>Projects</h2>
            <button className="services-btn" onClick={startNewProject}>
              New Project
            </button>
          </div>
          {projectMessage && <div className="admin-message">{projectMessage}</div>}
          {projectsLoading ? (
            <div className="admin-muted">Loading projects…</div>
          ) : (
            <div className="admin-projects">
              {projects.map((project, index) => (
                <div key={project.id} className="admin-card">
                  <div className="admin-card-title">{project.name}</div>
                  <div className="admin-card-meta">{project.description}</div>
                  <div className="admin-card-actions">
                    <button
                      className="services-btn secondary"
                      onClick={() => moveProject(index, 'up')}
                      disabled={index === 0}
                    >
                      Move Up
                    </button>
                    <button
                      className="services-btn secondary"
                      onClick={() => moveProject(index, 'down')}
                      disabled={index === projects.length - 1}
                    >
                      Move Down
                    </button>
                    <button className="services-btn secondary" onClick={() => startEditProject(project)}>
                      Edit
                    </button>
                    <button
                      className="services-btn danger"
                      onClick={() => deleteProject(project.id, project.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {projectDraft && (
            <div className="admin-form" ref={formRef}>
              <h3>
                {projectDraft.id ? `Edit Project: ${projectDraft.name || 'Untitled'}` : 'New Project'}
              </h3>
              <div className="admin-grid">
                <label className="form-field">
                  <span>Name</span>
                  <input
                    value={projectDraft.name}
                    onChange={(event) => setProjectDraft({ ...projectDraft, name: event.target.value })}
                  />
                </label>
                <label className="form-field">
                  <span>Image URL</span>
                  <input
                    value={projectDraft.img}
                    onChange={(event) => setProjectDraft({ ...projectDraft, img: event.target.value })}
                  />
                </label>
                <label className="form-field">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setProjectImageFile(event.target.files?.[0] ?? null)}
                  />
                </label>
                <button
                  className="services-btn secondary"
                  type="button"
                  onClick={uploadProjectImage}
                  disabled={!projectImageFile}
                >
                  Upload to Supabase
                </button>
                <label className="form-field">
                  <span>GitHub URL</span>
                  <input
                    value={projectDraft.github_url}
                    onChange={(event) =>
                      setProjectDraft({ ...projectDraft, github_url: event.target.value })
                    }
                  />
                </label>
                <label className="form-field">
                  <span>Live URL</span>
                  <input
                    value={projectDraft.hosted_url}
                    onChange={(event) =>
                      setProjectDraft({ ...projectDraft, hosted_url: event.target.value })
                    }
                  />
                </label>
                <label className="form-field form-field-full">
                  <span>Description</span>
                  <textarea
                    rows={4}
                    value={projectDraft.description}
                    onChange={(event) =>
                      setProjectDraft({ ...projectDraft, description: event.target.value })
                    }
                  />
                </label>
                <label className="form-field">
                  <span>Color</span>
                  <div className="admin-color-field">
                    <input
                      type="color"
                      value={projectDraft.color || '#111111'}
                      onChange={(event) => setProjectDraft({ ...projectDraft, color: event.target.value })}
                    />
                    <input
                      value={projectDraft.color}
                      onChange={(event) => setProjectDraft({ ...projectDraft, color: event.target.value })}
                    />
                  </div>
                </label>
                <label className="form-field">
                  <span>Sort Order</span>
                  <input
                    type="number"
                    value={projectDraft.sort_order}
                    onChange={(event) =>
                      setProjectDraft({ ...projectDraft, sort_order: Number(event.target.value) })
                    }
                  />
                </label>
              </div>
              <div className="admin-form-actions">
                <button className="services-btn" onClick={saveProject}>
                  Save
                </button>
                <button className="services-btn secondary" onClick={() => setProjectDraft(null)}>
                  Cancel
                </button>
              </div>
              {projectMessage && <div className="admin-message">{projectMessage}</div>}
            </div>
          )}
        </div>
      )}

      {activeTab === 'content' && (
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2>Site Content</h2>
            <span className="admin-muted">Edit JSON blocks for each section.</span>
          </div>
          {contentLoading ? (
            <div className="admin-muted">Loading content…</div>
          ) : (
            <div className="admin-content">
              {contentKeys.map((key) => (
                <div key={key} className="admin-card admin-content-card">
                  <div className="admin-card-title">{key}</div>
                  <textarea
                    className="admin-textarea"
                    rows={14}
                    value={contentMap[key] ?? ''}
                    onChange={(event) =>
                      setContentMap((prev) => ({ ...prev, [key]: event.target.value }))
                    }
                  />
                  <div className="admin-card-actions">
                    <button className="services-btn" onClick={() => saveContent(key)}>
                      Save
                    </button>
                    <button className="services-btn secondary" onClick={() => resetContent(key)}>
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {contentMessage && <div className="admin-message">{contentMessage}</div>}
        </div>
      )}
    </div>
  );
}

