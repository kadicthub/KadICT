import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CountUp } from '@/components/site/CountUp';

let trigger: (visible: boolean) => void;

describe('CountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: (e: { isIntersecting: boolean }[]) => void) {
          trigger = (v) => cb([{ isIntersecting: v }]);
        }
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('renders the final figure until it scrolls into view, then counts up to it', () => {
    const { container } = render(<CountUp value="20,000+" />);
    const shown = () => container.querySelector('[aria-hidden="true"]')!.textContent;
    expect(shown()).toBe('20,000+');
    expect(screen.getByText('20,000+', { selector: '.sr-only' })).toBeInTheDocument();
    act(() => trigger(true));
    act(() => vi.advanceTimersByTime(100));
    expect(Number(shown()!.replace(/\D/g, ''))).toBeLessThan(20000);
    act(() => vi.advanceTimersByTime(2000));
    expect(shown()).toBe('20,000+');
  });

  it('leaves the figure alone for visitors who prefer reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { container } = render(<CountUp value="55" />);
    expect(container.querySelector('[aria-hidden="true"]')!.textContent).toBe('55');
  });
});
