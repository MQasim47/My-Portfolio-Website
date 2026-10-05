import Link from 'next/link';
import { Container, MonoLabel, TerminalBlock } from './components/ui';

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100dvh] items-center bg-paper py-24">
      <Container>
        <div className="max-w-xl">
          <MonoLabel as="p" className="mb-4">
            Error 404
          </MonoLabel>
          <h1 className="mb-6 font-display text-display-l text-ink">Page not found</h1>
          <p className="mb-8 text-body-l text-ink-soft">
            This page doesn&apos;t exist. Let&apos;s get you back to the homepage.
          </p>

          <TerminalBlock title="bash — 404" className="mb-8">
            {`ERROR 404: ROUTE_NOT_FOUND
> The page you requested does not exist.
$ cd /`}
          </TerminalBlock>

          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </Container>
    </main>
  );
}
