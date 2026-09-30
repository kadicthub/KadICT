'use client';

import { RotateCcw, SendHorizontal, Sparkles, Square, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { assistantCopy as t } from '@/lib/brand';
import { cn } from '@/lib/utils';
import { AssistantMessage } from './AssistantMessage';

type Turn = { role: 'user' | 'assistant'; content: string; error?: boolean };

export type AssistantProps = {
  /** `/api/assistant` in the app; KAD Learn's `/api/public/assistant` for visitors. */
  endpoint: string;
  mode: 'app' | 'public';
  /** Sent with every question: the page it was asked from (ids or a path). */
  extra?: Record<string, unknown>;
  /** sessionStorage key, so a conversation survives moving between pages. */
  storageKey: string;
};

const MAX_TURNS = 10;
const MAX_INPUT = 2000;

function load(key: string): Turn[] {
  try {
    const raw = window.sessionStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter(
          (m): m is Turn =>
            typeof m === 'object' &&
            m !== null &&
            ((m as Turn).role === 'user' || (m as Turn).role === 'assistant') &&
            typeof (m as Turn).content === 'string',
        )
      : [];
  } catch {
    return [];
  }
}

function save(key: string, turns: Turn[]) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(turns.slice(-MAX_TURNS * 2)));
  } catch {
    // Storage blocked or full: the conversation just will not survive a reload.
  }
}

/** What the server accepts: the last few turns, errors left out, the question last. */
function toRequest(turns: Turn[]) {
  return turns
    .filter((m) => !m.error && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === 'user' ? 2000 : 6000) }));
}

async function errorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: { message?: unknown } };
    if (typeof body.error?.message === 'string') return body.error.message;
  } catch {
    // Not JSON: fall through to the generic wording.
  }
  return t.error;
}

/**
 * The KAD assistant: a floating button that opens a chat panel. Answers stream
 * in as they are written. Shared by kadhub.ng (visitors) and KAD Learn (the
 * public catalogue, and signed-in people inside the app).
 */
export function Assistant({ endpoint, mode, extra, storageKey }: AssistantProps) {
  const [open, setOpen] = useState(false);
  // Nothing that depends on `turns` renders until the panel is opened, so
  // reading storage during the first client render cannot cause a hydration
  // mismatch.
  const [turns, setTurns] = useState<Turn[]>(() =>
    typeof window === 'undefined' ? [] : load(storageKey),
  );
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!busy) save(storageKey, turns);
  }, [busy, storageKey, turns]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, open]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes the panel from anywhere, as for any popover.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim().slice(0, MAX_INPUT);
      if (!q || busy) return;
      const history: Turn[] = [...turns, { role: 'user', content: q }];
      setTurns([...history, { role: 'assistant', content: '' }]);
      setDraft('');
      setBusy(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const reply = (content: string, error = false) =>
        setTurns((cur) => [...cur.slice(0, -1), { role: 'assistant', content, error }]);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: mode === 'app' ? 'same-origin' : 'omit',
          body: JSON.stringify({ messages: toRequest(history), ...extra }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          reply(await errorMessage(res), true);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          reply(text);
        }
        text += decoder.decode();
        reply(text || t.error, !text);
      } catch (e) {
        if ((e as Error).name === 'AbortError') {
          setTurns((cur) => {
            const last = cur.at(-1);
            return last?.role === 'assistant' && !last.content ? cur.slice(0, -1) : cur;
          });
        } else {
          setTurns((cur) => {
            const last = cur.at(-1);
            return [
              ...cur.slice(0, -1),
              last?.content
                ? { ...last, content: `${last.content}\n\n${t.error}`, error: true }
                : { role: 'assistant', content: t.offline, error: true },
            ];
          });
        }
      } finally {
        abortRef.current = null;
        setBusy(false);
      }
    },
    [busy, endpoint, extra, mode, turns],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(draft);
  };

  const reset = () => {
    abortRef.current?.abort();
    setTurns([]);
    save(storageKey, []);
    inputRef.current?.focus();
  };

  const last = turns.at(-1);
  const waiting = busy && last?.role === 'assistant' && !last.content;

  return (
    <div className="print:hidden">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed right-4 bottom-20 z-50 flex h-[min(36rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
        >
          <header className="flex items-center gap-3 border-b px-4 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="font-heading text-sm font-semibold">
                {t.title}
              </h2>
              <p className="truncate text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={turns.length === 0}
              aria-label={t.newChat}
              title={t.newChat}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-40"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              title={t.close}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-busy={busy}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed"
          >
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
              {t.greeting[mode]}
            </div>
            {turns.length === 0 && (
              <ul className="flex flex-col items-start gap-2" aria-label={t.suggestionsLabel}>
                {t.suggestions[mode].map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => void ask(s)}
                      className="rounded-full border px-3 py-1.5 text-left text-xs hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {turns.map((m, i) =>
              m.role === 'user' ? (
                <div
                  key={i}
                  className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 [overflow-wrap:anywhere] whitespace-pre-wrap text-primary-foreground"
                >
                  <span className="sr-only">{t.you}: </span>
                  {m.content}
                </div>
              ) : m.content ? (
                <div
                  key={i}
                  className={cn(
                    'max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2',
                    m.error && 'bg-destructive/10 text-destructive',
                  )}
                >
                  <span className="sr-only">{t.name}: </span>
                  <AssistantMessage text={m.content} />
                </div>
              ) : null,
            )}
            {waiting && (
              <div className="flex w-fit items-center gap-1 rounded-2xl bg-muted px-3 py-3">
                <span className="sr-only">{t.thinking}</span>
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce"
                    style={{ animationDelay: `${d * 150}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t p-3">
            <div className="flex items-end gap-2">
              <label htmlFor={`${panelId}-input`} className="sr-only">
                {t.inputLabel}
              </label>
              <textarea
                ref={inputRef}
                id={`${panelId}-input`}
                value={draft}
                maxLength={MAX_INPUT}
                rows={1}
                placeholder={t.placeholder[mode]}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    void ask(draft);
                  }
                }}
                className="[field-sizing:content] max-h-32 min-h-10 flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
              {busy ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  aria-label={t.stop}
                  title={t.stop}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Square className="size-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label={t.send}
                  title={t.send}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-40"
                >
                  <SendHorizontal className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="mt-2 text-[0.7rem] text-muted-foreground">{t.disclaimer}</p>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t.close : t.openLabel}
        className="fixed right-4 bottom-4 z-50 flex h-12 items-center gap-2 rounded-full bg-primary px-4 font-medium text-primary-foreground shadow-lg ring-1 ring-primary/30 transition-transform hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Sparkles className="size-5" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{open ? t.closeShort : t.open}</span>
      </button>
    </div>
  );
}
