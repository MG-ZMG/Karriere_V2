import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Karriere bei ZAHNÄRZTEMG',
  description: 'Jobs in Mönchengladbach – ZFA, ZMP, Zahnarzt, Kinderzahnarzt, KFO.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
            <Image src="/logo.png" alt="ZAHNÄRZTEMG" width={42} height={42}/>
            <div className="font-semibold">Karriere bei ZAHNÄRZTEMG</div>
            <nav className="ml-auto flex gap-6 text-sm">
              <Link href="/">Start</Link>
              <Link href="/jobs/zfa-in-der-behandlung">Jobs</Link>
              <a href="mailto:{process.env.CONTACT_EMAIL}">Kontakt</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
            © {new Date().getFullYear()} ZAHNÄRZTEMG · Kontakt: {process.env.CONTACT_EMAIL}
          </div>
        </footer>
      </body>
    </html>
  );
}
