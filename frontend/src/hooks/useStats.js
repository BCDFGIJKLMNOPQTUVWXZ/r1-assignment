import { useState, useEffect, useCallback } from 'react';
import { ticketApi } from '../api/ticketApi';
import toast from 'react-hot-toast';

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ticketApi.getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};
