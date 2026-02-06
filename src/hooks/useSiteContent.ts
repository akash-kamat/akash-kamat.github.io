import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useSiteContent<T>(key: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState<boolean>(true);
  const retryRef = useRef(0);

  useEffect(() => {
    let active = true;
    const fetchContent = async () => {
      if (!supabase) {
        if (active) setLoading(false);
        return;
      }
      const { data: row, error } = await supabase
        .from('site_content')
        .select('data')
        .eq('key', key)
        .maybeSingle();
      if (!active) return;
      if (error) {
        if (retryRef.current < 2) {
          retryRef.current += 1;
          setTimeout(fetchContent, 1200);
          return;
        }
      } else if (row?.data) {
        setData({ ...(fallback as object), ...(row.data as object) } as T);
      }
      setLoading(false);
    };
    fetchContent();
    return () => {
      active = false;
    };
  }, [key, fallback]);

  return { data, loading };
}
