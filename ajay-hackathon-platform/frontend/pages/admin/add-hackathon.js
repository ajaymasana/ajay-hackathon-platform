import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { LoadingSpinner } from '../../components/ui';
import { adminCreateHackathon } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const initialForm = {
  title: '', organizer: '', description: '', deadline: '',
  prize: '', mode: 'online', tags: '', registrationLink: '', featured: false,
};

export default function AddHackathon() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) router.push('/login');
  }, [user, authLoading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      await adminCreateHackathon(payload);
      toast.success('Hackathon created!');
      router.push('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create hackathon');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout>
      <Head><title>Add Hackathon — Admin</title></Head>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8 font-mono">
          <Link href="/admin" className="hover:text-brand-500 transition-colors">Admin</Link>
          <span>/</span>
          <span>Add Hackathon</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <h1 className="text-2xl font-black mb-8">Add New Hackathon</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Title *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Hackathon name" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Organizer *</label>
                <input name="organizer" value={form.organizer} onChange={handleChange} placeholder="Org name" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Prize *</label>
                <input name="prize" value={form.prize} onChange={handleChange} placeholder="₹1,00,000 / $5000" className="input-field" required />
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
                <input name="registrationLink" value={form.registrationLink} onChange={handleChange} placeholder="https://devpost.com/..." className="input-field" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Tags (comma separated)</label>
                <input name="tags" value={form.tags} onChange={handleChange} placeholder="Web Dev, AI/ML, Blockchain" className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the hackathon..." rows={5} className="input-field resize-none" required />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-brand-500" />
                <label htmlFor="featured" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">Mark as Featured (shown on homepage)</label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-60">
                {saving ? 'Creating...' : '✓ Create Hackathon'}
              </button>
              <Link href="/admin" className="btn-secondary flex-1 py-3 text-center">Cancel</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
