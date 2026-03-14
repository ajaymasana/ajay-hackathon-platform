import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-black">A</span>
              <div>
                <div className="font-black text-base tracking-tight">AJAY MASANA'S</div>
                <div className="text-[10px] font-mono text-brand-500 tracking-widest uppercase">Opportunity Finder</div>
              </div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Helping students discover hackathons and internship opportunities faster.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-zinc-900 dark:text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/hackathons" className="hover:text-brand-500 transition-colors">Hackathons</Link></li>
              <li><Link href="/internships" className="hover:text-brand-500 transition-colors">Internships</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-500 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-zinc-900 dark:text-white">Account</h4>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/login" className="hover:text-brand-500 transition-colors">Login</Link></li>
              <li><Link href="/signup" className="hover:text-brand-500 transition-colors">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-400 dark:text-zinc-600">
          <span>© {new Date().getFullYear()} Ajay Masana's Hackathon & Internship Finder</span>
          <span className="font-mono">Built with Next.js + Express</span>
        </div>
      </div>
    </footer>
  );
}
