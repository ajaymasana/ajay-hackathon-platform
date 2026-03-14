import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { LoadingSpinner } from '../../components/ui';
import { adminCreateInternship } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const initialForm = {
  company: '', title: '', description: '', stipend: '',
  location: '', skills: '', applyLink: '', deadline: '',
  duration: '', type: 'remote', featured: false,
};

export default function AddInternship() {
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
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await adminCreateInternship(payload);
      toast.success('Internship created!');
      router.push('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create internship');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout>
      <Head><title>Add Internship — Admin</title></Head>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8 font-mono">
          <Link href="/admin" className="hover:text-brand-500 transition-colors">Admin</Link>
          <span>/</span>
          <span>Add Internship</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <h1 className="text-2xl font-black mb-8">Add New Internship</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Company *</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Role / Title *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Frontend Developer Intern" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Stipend *</label>
                <input name="stipend" value={form.stipend} onChange={handleChange} placeholder="₹15,000/month" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Location *</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore / Remote" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="input-field">
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="2 months" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Deadline *</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="input-field" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Apply Link *</label>
                <input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="https://internshala.com/..." className="input-field" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Skills (comma separated)</label>
                <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the role..." rows={5} className="input-field resize-none" required />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-brand-500" />
                <label htmlFor="featured" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">Mark as Featured (shown on homepage)</label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-60">
                {saving ? 'Creating...' : '✓ Create Internship'}
              </button>
              <Link href="/admin" className="btn-secondary flex-1 py-3 text-center">Cancel</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
