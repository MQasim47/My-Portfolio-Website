import SplitLines from './SplitLines';
import { Container, TerminalBlock } from './ui';

// Confirmed deployments only. "Since" is left blank until the months are confirmed (QUESTIONS.md).
const ROWS = [
  {
    project: 'Flacron GameZone',
    platform: 'Azure',
    delivery: 'CI/CD on merge',
    environment: 'Production',
    status: 'Live',
    since: '',
  },
  {
    project: 'Flacron GameZone',
    platform: 'AWS ECS',
    delivery: 'Docker, my own deployment',
    environment: 'Production',
    status: 'Live',
    since: '',
  },
  {
    project: 'Flacron Enterprises',
    platform: 'Azure App Service',
    delivery: 'CI/CD on merge',
    environment: 'Production',
    status: 'Live',
    since: '',
  },
  {
    project: 'Unknot',
    platform: 'GitHub Pages',
    delivery: 'GitHub Actions, signed APK per tagged release',
    environment: 'Production',
    status: 'Live',
    since: '',
  },
];

const COLUMNS = ['Project', 'Platform', 'Delivery', 'Environment', 'Status', 'Since'];

/**
 * The page's one dark band. Opaque --terminal with hard 1px edges (no gradient); RegisterFade
 * deliberately never blends into or out of it. Mono text stays at 12px or above.
 */
export default function ShippingRecord() {
  return (
    <section
      id="shipping"
      aria-labelledby="shipping-title"
      data-register="terminal"
      className="on-dark relative border-y border-panel-rule bg-terminal py-[var(--section-space)] text-paper-inv"
      style={{ borderTopWidth: 'var(--hairline)', borderBottomWidth: 'var(--hairline)' }}
    >
      <Container>
        <header data-reveal-group className="mb-10 lg:mb-14">
          <p className="rv-eyebrow mb-4 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-signal">
            Delivery
          </p>
          <SplitLines
            as="h2"
            id="shipping-title"
            className="font-display text-display-l text-paper-inv"
            text="Shipping record"
          />
          <p className="mt-6 max-w-[52ch] text-body-l text-ink-soft-inv">
            Everything I&rsquo;ve put into production, and how it gets there.
          </p>
        </header>

        {/* own horizontal scroll on narrow screens */}
        <div
          data-reveal
          className="overflow-x-auto border-t border-panel-rule"
          style={{ borderTopWidth: 'var(--hairline)' }}
          role="region"
          aria-label="Shipping record table, scrolls horizontally"
          tabIndex={0}
        >
          <table className="w-full min-w-[820px] border-collapse text-left font-mono text-[0.8125rem] leading-snug">
            <thead>
              <tr>
                {COLUMNS.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="whitespace-nowrap border-b border-panel-rule px-4 py-3 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-soft-inv first:pl-0"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={`${r.project}-${r.platform}`} className="align-top">
                  <th
                    scope="row"
                    className="border-b border-panel-rule py-4 pl-0 pr-4 text-left font-medium text-paper-inv"
                  >
                    {r.project}
                  </th>
                  <td className="border-b border-panel-rule px-4 py-4 text-paper-inv">{r.platform}</td>
                  <td className="border-b border-panel-rule px-4 py-4 text-ink-soft-inv">{r.delivery}</td>
                  <td className="border-b border-panel-rule px-4 py-4 text-ink-soft-inv">{r.environment}</td>
                  <td className="whitespace-nowrap border-b border-panel-rule px-4 py-4 text-paper-inv">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-dot bg-signal" />
                      {r.status}
                    </span>
                  </td>
                  <td className="border-b border-panel-rule px-4 py-4 text-ink-soft-inv">{r.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div data-reveal className="mt-10 max-w-[640px]">
          <TerminalBlock title="Unknot: release pipeline, from the repository" className="!bg-panel">
            <span className="text-signal">$</span> release.unknot{'\n'}
            {'  '}
            <span className="text-ink-soft-inv">TESTS</span>
            {'     '}257 passed{'\n'}
            {'  '}
            <span className="text-ink-soft-inv">WEB</span>
            {'       '}built → GitHub Pages{'\n'}
            {'  '}
            <span className="text-ink-soft-inv">ANDROID</span>
            {'   '}signed APK attached to release
          </TerminalBlock>
        </div>
      </Container>
    </section>
  );
}
