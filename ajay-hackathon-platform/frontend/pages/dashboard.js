import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import HackathonCard from '../components/cards/HackathonCard';
import InternshipCard from '../components/cards/InternshipCard';
import { LoadingSpinner, EmptyState } from '../components/ui';
import { getSaved } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const tabs = ['Overview', 'Hackathons', 'Internships'];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [saved, setSaved] = useState({ hackathons: [], internships: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      getSaved()
        .then((res) => setSaved({ hackathons: res.data.hackathons || [], internships: res.data.internships || [] }))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (authLoading || !user) return <Layout><LoadingSpinner size="lg" /></Layout>;

  const totalSaved = saved.hackathons.length + saved.internships.length;

  return (
    <Layout>
      <Head><title>Dashboard — AJAY MASANA'S Platform</title></Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-black text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white">{user.name}</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg">
                  Admin
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link href="/admin" className="btn-outline text-sm py-2 px-4">Admin Panel →</Link>
            )}
            <button onClick={logout} className="btn-secondary text-sm py-2 px-4">Logout</button>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Saved', value: totalSaved, icon: '❤️' },
            { label: 'Hackathons', value: saved.hackathons.length, icon: '🏆' },
            { label: 'Internships', value: saved.internships.length, icon: '💼' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-5 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-brand-500">{stat.value}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
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

        {/* Tab content */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Overview tab */}
            {activeTab === 'Overview' && (
              <div className="space-y-10">
                {saved.hackathons.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-bold text-lg text-zinc-900 dark:text-white">🏆 Saved Hackathons</h2>
                      <button onClick={() => setActiveTab('Hackathons')} className="text-sm text-brand-500 hover:text-brand-600 font-semibold">View all →</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {saved.hackathons.slice(0, 3).map((h, i) => <HackathonCard key={h._id} hackathon={h} index={i} />)}
                    </div>
                  </div>
                )}
                {saved.internships.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-bold text-lg text-zinc-900 dark:text-white">💼 Saved Internships</h2>
                      <button onClick={() => setActiveTab('Internships')} className="text-sm text-brand-500 hover:text-brand-600 font-semibold">View all →</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {saved.internships.slice(0, 3).map((i, idx) => <InternshipCard key={i._id} internship={i} index={idx} />)}
                    </div>
                  </div>
                )}
                {totalSaved === 0 && (
                  <EmptyState
                    icon="🔖"
                    title="Nothing saved yet"
                    message="Browse hackathons and internships and save the ones you like."
                    action={
                      <div className="flex gap-3 justify-center">
                        <Link href="/hackathons" className="btn-primary">Browse Hackathons</Link>
                        <Link href="/internships" className="btn-secondary">Find Internships</Link>
                      </div>
                    }
                  />
                )}
              </div>
            )}

            {/* Hackathons tab */}
            {activeTab === 'Hackathons' && (
              saved.hackathons.length === 0 ? (
                <EmptyState
                  icon="🏆"
                  title="No saved hackathons"
                  message="Save hackathons from the listings page."
                  action={<Link href="/hackathons" className="btn-primary">Browse Hackathons</Link>}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {saved.hackathons.map((h, i) => <HackathonCard key={h._id} hackathon={h} index={i} />)}
                </div>
              )
            )}

            {/* Internships tab */}
            {activeTab === 'Internships' && (
              saved.internships.length === 0 ? (
                <EmptyState
                  icon="💼"
                  title="No saved internships"
                  message="Save internships from the listings page."
                  action={<Link href="/internships" className="btn-primary">Find Internships</Link>}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {saved.internships.map((i, idx) => <InternshipCard key={i._id} internship={i} index={idx} />)}
                </div>
              )
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
