import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// The card shown when the link is pasted into WhatsApp, LinkedIn, Slack, etc.
// Same typography as the site (Bodoni Moda for the name, JetBrains Mono for the label) on
// the champagne paper. Fonts are static instances of the site's variable fonts, in
// src/fonts/og/ (the renderer cannot read WOFF2). Rendered once at build time (reads the fonts from disk).
export const alt = 'Muhammad Qasim: Full-stack & mobile engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#F6EAD4';
const INK = '#16120C';
const INK_SOFT = '#5B5346';
const RULE = '#D8C7A6';
const ACCENT = '#0B5F46';

export default async function OpengraphImage() {
  const [bodoni, mono] = await Promise.all([
    readFile(join(process.cwd(), 'src/fonts/og/BodoniModa-400.ttf')),
    readFile(join(process.cwd(), 'src/fonts/og/JetBrainsMono-500.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER,
          display: 'flex',
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `1px solid ${RULE}`,
            padding: '56px 64px',
          }}
        >
          <div style={{ display: 'flex', fontFamily: 'Bodoni', fontSize: 44, color: INK }}>MQ</div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Bodoni',
                fontSize: 104,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: INK,
              }}
            >
              Muhammad Qasim
            </div>
            <div style={{ display: 'flex', width: 120, height: 2, background: ACCENT, margin: '40px 0 32px' }} />
            <div
              style={{
                display: 'flex',
                fontFamily: 'Mono',
                fontSize: 34,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: INK_SOFT,
              }}
            >
              Full-stack &amp; mobile engineer
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bodoni', data: bodoni, weight: 400, style: 'normal' },
        { name: 'Mono', data: mono, weight: 500, style: 'normal' },
      ],
    }
  );
}
