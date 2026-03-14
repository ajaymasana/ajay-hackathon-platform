import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Layout from '../../../components/layout/Layout';
import { LoadingSpinner } from '../../../components/ui';
import { getHackathon, adminUpdateHackathon } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function EditHackathon() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) router.push('/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (!id || !user) return;
    getHackathon(id)
      .then((res) => {
        const h = res.data.hackathon;
        setForm({
          title: h.title, organizer: h.organizer, description: h.description,
          deadline: h.deadline ? format(new Date(h.deadline), 'yyyy-MM-dd') : '',
          prize: h.prize, mode: h.mode,
          tags: h.tags?.join(', ') || '',
          registrationLink: h.registrationLink,
          featured: h.featured || false,
        });
      })
      .catch(() => { toast.error('Not found'); router.push('/admin'); })
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
      await adminUpdateHackathon(id, payload);
      toast.success('Hackathon updated!');
      router.push('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user || loading) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout>
      <Head><title>Edit Hackathon — Admin</title></Head>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8 font-mono">
          <Link href="/admin" className="hover:text-brand-500 transition-colors">Admin</Link>
          <span>/</span>
          <span>Edit Hackathon</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <h1 className="text-2xl font-black mb-8">Edit Hackathon</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Title *</label>
                <input name="title" value={form.title} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Organizer *</label>
                <input name="organizer" value={form.organizer} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Prize *</label>
                <input name="prize" value={form.prize} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Deadline *</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Mode</label>
                <select name="mode" value={form.mode} onChange={handleChange} className="input-field">
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Registration Link *</label>
                <input name="registrationLink" value={form.registrationLink} onChange={handleChange} className="input-field" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Tags (comma separated)</label>
                <input name="tags" value={form.tags} onChange={handleChange} className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="input-field resize-none" required />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-brand-500" />
                <label htmlFor="featured" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">Featured on homepage</label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-60">
                {saving ? 'Saving...' : '✓ Save Changes'}
              </button>
              <Link href="/admin" className="btn-secondary flex-1 py-3 text-center">Cancel</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
