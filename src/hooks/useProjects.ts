import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { projects as fallbackProjects } from '../data/projects';
import type { Project } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState<boolean>(true);
  const retryRef = useRef(0);

  const fetchProjects = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, img, github_url, hosted_url, description, color, sort_order')
      .order('sort_order', { ascending: true });
    if (error) {
      if (retryRef.current < 2) {
        retryRef.current += 1;
        setTimeout(fetchProjects, 1200);
        return;
      }
    } else if (data) {
      setProjects(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    fetchProjects();
    if (!supabase) return () => {};
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      if (!active) return;
      fetchProjects();
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [fetchProjects]);

  return { projects, loading, refetch: fetchProjects };
}
