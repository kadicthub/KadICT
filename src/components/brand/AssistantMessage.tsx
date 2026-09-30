import { Fragment, type ReactNode } from 'react';

/**
 * Renders the assistant's replies: a small, safe subset of markdown (paragraphs,
 * bullet and numbered lists, headings, bold, inline code and links) built as
 * React elements. No HTML from the model is ever injected, and a link is kept
 * only if it is http(s) or a site-relative path.
 */
const INLINE = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\)|https?:\/\/[^\s)<]+)/g;
const SAFE_HREF = /^(https?:\/\/|\/(?!\/))/;

function isExternal(href: string): boolean {
  if (href.startsWith('/')) return false;
  try {
    return new URL(href).origin !== window.location.origin;
  } catch {
    return true;
  }
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-2"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
      return <strong key={i}>{inline(part.slice(2, -2))}</strong>;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
      return (
        <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link?.[1] && link[2])
      return SAFE_HREF.test(link[2]) ? (
        <A key={i} href={link[2]}>
          {link[1]}
        </A>
      ) : (
        <Fragment key={i}>{link[1]}</Fragment>
      );
    if (/^https?:\/\//.test(part))
      return (
        <A key={i} href={part}>
          {part}
        </A>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type Block =
  | { kind: 'p'; lines: string[] }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'h'; text: string };

function blocks(source: string): Block[] {
  const out: Block[] = [];
  for (const raw of source.replace(/\r/g, '').split('\n')) {
    const line = raw.trimEnd();
    const last = out.at(-1);
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (!line.trim()) out.push({ kind: 'p', lines: [] });
    else if (heading?.[1]) out.push({ kind: 'h', text: heading[1] });
    else if (bullet?.[1] !== undefined) {
      if (last?.kind === 'ul') last.items.push(bullet[1]);
      else out.push({ kind: 'ul', items: [bullet[1]] });
    } else if (numbered?.[1] !== undefined) {
      if (last?.kind === 'ol') last.items.push(numbered[1]);
      else out.push({ kind: 'ol', items: [numbered[1]] });
    } else if (last?.kind === 'p') last.lines.push(line);
    else out.push({ kind: 'p', lines: [line] });
  }
  return out.filter((b) => b.kind !== 'p' || b.lines.length > 0);
}

export function AssistantMessage({ text }: { text: string }) {
  return (
    <div className="space-y-2 [overflow-wrap:anywhere]">
      {blocks(text).map((b, i) => {
        if (b.kind === 'h')
          return (
            <p key={i} className="font-semibold">
              {inline(b.text)}
            </p>
          );
        if (b.kind === 'ul')
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {b.items.map((item, j) => (
                <li key={j}>{inline(item)}</li>
              ))}
            </ul>
          );
        if (b.kind === 'ol')
          return (
            <ol key={i} className="list-decimal space-y-1 pl-5">
              {b.items.map((item, j) => (
                <li key={j}>{inline(item)}</li>
              ))}
            </ol>
          );
        return (
          <p key={i}>
            {b.lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
