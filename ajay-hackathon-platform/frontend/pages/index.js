import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import HackathonCard from '../components/cards/HackathonCard';
import InternshipCard from '../components/cards/InternshipCard';
import { StatCard, LoadingSpinner } from '../components/ui';
import { getFeaturedHackathons, getFeaturedInternships } from '../lib/api';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const [hackathons, setHackathons] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFeaturedHackathons(), getFeaturedInternships()])
      .then(([h, i]) => {
        setHackathons(h.data.hackathons);
        setInternships(i.data.internships);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Head><title>AJAY MASANA'S — Hackathon & Internship Finder</title></Head>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-60" />

        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-500 bg-brand-500/10 border border-brand-500/20 px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                New opportunities added daily
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            >
              Find{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-brand-500 to-accent-400">
                Hackathons
              </span>
              <br />& Internships
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">Faster.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Your one-stop platform to discover the best student opportunities — curated hackathons with prizes and top internships with real stipends.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/hackathons" className="btn-primary text-base px-8 py-3.5">
                Browse Hackathons 🏆
              </Link>
              <Link href="/internships" className="btn-secondary text-base px-8 py-3.5">
                Find Internships →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="500+" label="Hackathons Listed" icon="🏆" />
          <StatCard value="1,200+" label="Internship Roles" icon="💼" />
          <StatCard value="₹50K+" label="Avg Prize Pool" icon="💰" />
          <StatCard value="10K+" label="Students Helped" icon="🎓" />
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label">🏆 Trending Now</p>
            <h2 className="section-title">Latest Hackathons</h2>
          </div>
          <Link href="/hackathons" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : hackathons.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">No hackathons yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.slice(0, 6).map((h, i) => (
              <HackathonCard key={h._id} hackathon={h} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Internships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label">💼 Hot Roles</p>
            <h2 className="section-title">Latest Internships</h2>
          </div>
          <Link href="/internships" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : internships.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">No internships yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.slice(0, 6).map((i, idx) => (
              <InternshipCard key={i._id} internship={i} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-500 p-10 md:p-16 text-center text-white"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to level up?</h2>
          <p className="text-brand-100 mb-8 max-w-md mx-auto">
            Create your free account to save opportunities and track your applications.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-brand-600 font-bold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all active:scale-95"
          >
            Get started for free →
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
