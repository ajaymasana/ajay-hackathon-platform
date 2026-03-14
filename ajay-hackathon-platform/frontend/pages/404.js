import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <Head><title>404 — Page Not Found</title></Head>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-8xl font-black text-brand-500 mb-4">404</p>
          <h1 className="text-3xl font-black mb-3">Page not found</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-primary px-6 py-3">Go Home</Link>
            <Link href="/hackathons" className="btn-secondary px-6 py-3">Browse Hackathons</Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
