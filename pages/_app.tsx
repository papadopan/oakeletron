import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex" style={{ minHeight: '80vh' }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
