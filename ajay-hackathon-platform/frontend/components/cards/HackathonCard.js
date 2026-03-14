import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const modeColors = {
  online: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  offline: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  hybrid: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
};

export default function HackathonCard({ hackathon, index = 0 }) {
  const isExpired = new Date(hackathon.deadline) < new Date();

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
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
          {hackathon.organizer.charAt(0).toUpperCase()}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${modeColors[hackathon.mode] || modeColors.online}`}>
          {hackathon.mode}
        </span>
      </div>

      {/* Title & Organizer */}
      <div>
        <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug">
          {hackathon.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">by {hackathon.organizer}</p>
      </div>

      {/* Prize & Deadline */}
      <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
          <TrophyIcon /> {hackathon.prize}
        </span>
        <span className={`flex items-center gap-1.5 ${isExpired ? 'text-red-500' : ''}`}>
          <CalendarIcon />
          {isExpired ? 'Expired' : format(new Date(hackathon.deadline), 'MMM dd, yyyy')}
        </span>
      </div>

      {/* Tags */}
      {hackathon.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hackathon.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          href={`/hackathons/${hackathon._id}`}
          className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-brand-500 hover:text-brand-500 transition-all"
        >
          Details
        </Link>
        <a
          href={hackathon.registrationLink}
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
