import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Layout from '../../components/layout/Layout';
import { LoadingSpinner } from '../../components/ui';
import { getHackathon, saveOpportunity, unsaveOpportunity, getSaved } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function HackathonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getHackathon(id)
      .then((res) => setHackathon(res.data.hackathon))
      .catch(() => router.push('/hackathons'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user && id) {
      getSaved().then((res) => {
        const isSaved = res.data.hackathons?.some((h) => h._id === id);
        setSaved(isSaved);
      }).catch(() => {});
    }
  }, [user, id]);

  const handleSave = async () => {
    if (!user) { toast.error('Please login to save opportunities'); return; }
    setSavingLoading(true);
    try {
      if (saved) {
        await unsaveOpportunity(id);
        setSaved(false);
        toast.success('Removed from saved');
      } else {
        await saveOpportunity({ opportunityId: id, opportunityType: 'Hackathon' });
        setSaved(true);
        toast.success('Saved to dashboard!');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSavingLoading(false);
    }
  };

  if (loading) return <Layout><LoadingSpinner size="lg" /></Layout>;
  if (!hackathon) return null;

  const isExpired = new Date(hackathon.deadline) < new Date();

  return (
    <Layout>
      <Head><title>{hackathon.title} — AJAY MASANA'S Platform</title></Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8 font-mono">
          <Link href="/hackathons" className="hover:text-brand-500 transition-colors">Hackathons</Link>
          <span>/</span>
          <span className="text-zinc-600 dark:text-zinc-300 truncate">{hackathon.title}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex items-start gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
              {hackathon.organizer.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white leading-tight mb-2">
                {hackathon.title}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">Organized by <span className="text-brand-500 font-semibold">{hackathon.organizer}</span></p>
            </div>
            <button
              onClick={handleSave}
              disabled={savingLoading}
              className={`flex-shrink-0 p-3 rounded-xl border transition-all ${
                saved
                  ? 'bg-brand-500/10 border-brand-500 text-brand-500'
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-brand-500 hover:text-brand-500'
              }`}
              title={saved ? 'Unsave' : 'Save opportunity'}
            >
              {saved ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Prize', value: hackathon.prize, icon: '🏆' },
              { label: 'Mode', value: hackathon.mode, icon: '💻' },
              { label: 'Deadline', value: isExpired ? 'Expired' : format(new Date(hackathon.deadline), 'MMM dd, yyyy'), icon: '📅' },
              { label: 'Status', value: isExpired ? 'Closed' : 'Open', icon: isExpired ? '🔴' : '🟢' },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                <p className="text-xs text-zinc-400 mb-1">{item.icon} {item.label}</p>
                <p className="font-bold text-sm text-zinc-900 dark:text-white capitalize">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {hackathon.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {hackathon.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">About this hackathon</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {hackathon.description}
            </div>
          </div>

          {/* Apply */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={hackathon.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 text-center py-3.5 rounded-xl font-bold text-base transition-all ${
                isExpired
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
              onClick={isExpired ? (e) => e.preventDefault() : undefined}
            >
              {isExpired ? '🔒 Registration Closed' : '🚀 Register Now'}
            </a>
            <Link href="/hackathons" className="flex-1 text-center py-3.5 rounded-xl font-bold text-base btn-secondary">
              ← Back to Hackathons
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
