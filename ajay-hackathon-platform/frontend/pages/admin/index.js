import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Layout from '../../components/layout/Layout';
import { LoadingSpinner } from '../../components/ui';
import { getHackathons, getInternships, adminDeleteHackathon, adminDeleteInternship } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const tabs = ['Hackathons', 'Internships'];

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('Hackathons');
  const [hackathons, setHackathons] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [h, i] = await Promise.all([getHackathons({ limit: 50 }), getInternships({ limit: 50 })]);
      setHackathons(h.data.hackathons);
      setInternships(i.data.internships);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchAll();
  }, [user]);

  const deleteHackathon = async (id) => {
    if (!confirm('Delete this hackathon?')) return;
    try {
      await adminDeleteHackathon(id);
      setHackathons((prev) => prev.filter((h) => h._id !== id));
      toast.success('Hackathon deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const deleteInternship = async (id) => {
    if (!confirm('Delete this internship?')) return;
    try {
      await adminDeleteInternship(id);
      setInternships((prev) => prev.filter((i) => i._id !== id));
      toast.success('Internship deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (authLoading || !user) return <Layout><LoadingSpinner size="lg" /></Layout>;
  if (user.role !== 'admin') return null;

  return (
    <Layout>
      <Head><title>Admin Panel — AJAY MASANA'S Platform</title></Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label">⚙️ Admin</p>
            <h1 className="section-title">Admin Panel</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/add-hackathon" className="btn-primary text-sm py-2 px-4">+ Add Hackathon</Link>
            <Link href="/admin/add-internship" className="btn-secondary text-sm py-2 px-4">+ Add Internship</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-2xl font-black text-brand-500">{hackathons.length}</div>
            <div className="text-sm text-zinc-500">Total Hackathons</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-2xl font-black text-brand-500">{internships.length}</div>
            <div className="text-sm text-zinc-500">Total Internships</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500 dark:text-zinc-400">Title</th>
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                    {activeTab === 'Hackathons' ? 'Organizer' : 'Company'}
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Deadline</th>
                  <th className="text-right px-6 py-4 font-semibold text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'Hackathons' ? hackathons : internships).map((item) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                      {activeTab === 'Hackathons' ? item.organizer : item.company}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell font-mono text-xs">
                      {item.deadline ? format(new Date(item.deadline), 'MMM dd, yyyy') : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/edit-${activeTab === 'Hackathons' ? 'hackathon' : 'internship'}/${item._id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-500 hover:bg-brand-500/20 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => activeTab === 'Hackathons' ? deleteHackathon(item._id) : deleteInternship(item._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {(activeTab === 'Hackathons' ? hackathons : internships).length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-zinc-400">
                      No {activeTab.toLowerCase()} yet.{' '}
                      <Link href={`/admin/add-${activeTab === 'Hackathons' ? 'hackathon' : 'internship'}`} className="text-brand-500 hover:underline">
                        Add one →
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
