import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import HackathonCard from '../../components/cards/HackathonCard';
import { LoadingSpinner, EmptyState, PageHeader, SearchBar, Pagination } from '../../components/ui';
import { getHackathons } from '../../lib/api';

const MODES = ['', 'online', 'offline', 'hybrid'];

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchHackathons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getHackathons({ page, search, mode: mode || undefined, limit: 9 });
      setHackathons(res.data.hackathons);
      setPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, mode]);

  useEffect(() => {
    const timer = setTimeout(fetchHackathons, 300);
    return () => clearTimeout(timer);
  }, [fetchHackathons]);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleMode = (val) => { setMode(val); setPage(1); };

  return (
    <Layout>
      <Head><title>Hackathons — AJAY MASANA'S Platform</title></Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <PageHeader
          label="🏆 Competitions"
          title="Hackathons"
          subtitle={`Discover ${total} hackathons with prizes, mentors, and networking opportunities.`}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="flex-1">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search hackathons, organizers..." />
          </div>
          <div className="flex gap-2">
            {MODES.map((m) => (
              <button
                key={m || 'all'}
                onClick={() => handleMode(m)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                  mode === m
                    ? 'bg-brand-500 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {m || 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : hackathons.length === 0 ? (
          <EmptyState
            icon="🏆"
            title="No hackathons found"
            message="Try adjusting your search or filters."
            action={<button onClick={() => { setSearch(''); setMode(''); }} className="btn-primary">Clear filters</button>}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hackathons.map((h, i) => (
                <HackathonCard key={h._id} hackathon={h} index={i} />
              ))}
            </div>
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </>
        )}
      </div>
    </Layout>
  );
}
