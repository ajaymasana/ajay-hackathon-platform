import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import InternshipCard from '../../components/cards/InternshipCard';
import { LoadingSpinner, EmptyState, PageHeader, SearchBar, Pagination } from '../../components/ui';
import { getInternships } from '../../lib/api';

const TYPES = ['', 'remote', 'onsite', 'hybrid'];

export default function InternshipsPage() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchInternships = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getInternships({ page, search, type: type || undefined, limit: 9 });
      setInternships(res.data.internships);
      setPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, type]);

  useEffect(() => {
    const timer = setTimeout(fetchInternships, 300);
    return () => clearTimeout(timer);
  }, [fetchInternships]);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleType = (val) => { setType(val); setPage(1); };

  return (
    <Layout>
      <Head><title>Internships — AJAY MASANA'S Platform</title></Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <PageHeader
          label="💼 Career Opportunities"
          title="Internships"
          subtitle={`Discover ${total} internships from top companies with real stipends.`}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="flex-1">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search companies, roles, skills..." />
          </div>
          <div className="flex gap-2">
            {TYPES.map((t) => (
              <button
                key={t || 'all'}
                onClick={() => handleType(t)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                  type === t
                    ? 'bg-brand-500 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {t || 'All'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : internships.length === 0 ? (
          <EmptyState
            icon="💼"
            title="No internships found"
            message="Try adjusting your search or filters."
            action={<button onClick={() => { setSearch(''); setType(''); }} className="btn-primary">Clear filters</button>}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((i, idx) => (
                <InternshipCard key={i._id} internship={i} index={idx} />
              ))}
            </div>
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </>
        )}
      </div>
    </Layout>
  );
}
