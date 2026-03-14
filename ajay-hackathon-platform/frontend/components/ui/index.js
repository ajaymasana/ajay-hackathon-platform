import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex justify-center items-center py-16">
      <div className={`${sizes[size]} border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin`} />
    </div>
  );
}

export function EmptyState({ icon, title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20 px-4"
    >
      <div className="text-5xl mb-4">{icon || '🔍'}</div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 max-w-sm mx-auto">{message}</p>
      {action}
    </motion.div>
  );
}

export function PageHeader({ label, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      {label && <p className="section-label">{label}</p>}
      <h1 className="section-title mb-4">{title}</h1>
      {subtitle && <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-base">{subtitle}</p>}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="input-field pl-10"
      />
    </div>
  );
}

export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 hover:border-brand-500 hover:text-brand-500 transition-all disabled:hover:border-zinc-200 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>
      <span className="text-sm text-zinc-500 font-mono px-3">
        {page} / {pages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="px-4 py-2 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 hover:border-brand-500 hover:text-brand-500 transition-all disabled:hover:border-zinc-200 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}

export function StatCard({ value, label, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 text-center"
    >
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-3xl font-black text-brand-500 mb-1">{value}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{label}</div>
    </motion.div>
  );
}
