import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const CashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const typeColors = {
  remote: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  onsite: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  hybrid: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
};

const companyColors = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-purple-500 to-pink-600',
  'from-brand-500 to-brand-700',
];

export default function InternshipCard({ internship, index = 0 }) {
  const isExpired = new Date(internship.deadline) < new Date();
  const colorIdx = internship.company.charCodeAt(0) % companyColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 flex flex-col gap-4 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${companyColors[colorIdx]} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
          {internship.company.charAt(0).toUpperCase()}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${typeColors[internship.type] || typeColors.remote}`}>
          {internship.type}
        </span>
      </div>

      {/* Title & Company */}
      <div>
        <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug">
          {internship.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{internship.company}</p>
      </div>

      {/* Stipend & Location */}
      <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-semibold">
          <CashIcon /> {internship.stipend}
        </span>
        <span className="flex items-center gap-1.5">
          <LocationIcon /> {internship.location}
        </span>
      </div>

      {/* Skills */}
      {internship.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {internship.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="tag">{skill}</span>
          ))}
        </div>
      )}

      {/* Deadline */}
      {internship.deadline && (
        <p className={`text-xs ${isExpired ? 'text-red-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
          Deadline: {isExpired ? 'Expired' : format(new Date(internship.deadline), 'MMM dd, yyyy')}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          href={`/internships/${internship._id}`}
          className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-brand-500 hover:text-brand-500 transition-all"
        >
          Details
        </Link>
        <a
          href={internship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isExpired
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
          onClick={isExpired ? (e) => e.preventDefault() : undefined}
        >
          {isExpired ? 'Closed' : 'Apply →'}
        </a>
      </div>
    </motion.div>
  );
}
