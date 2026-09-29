import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WelcomePopup } from '@/components/site/WelcomePopup';

function mockReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

const current = () =>
  screen.getByRole('button', { name: /flyer$/, current: true }).getAttribute('aria-label');

describe('WelcomePopup', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.sessionStorage.clear();
    mockReducedMotion(false);
  });
  afterEach(() => vi.useRealTimers());

  it('opens a second after the page loads, with the flyers and both calls to action', () => {
    render(<WelcomePopup />);
    expect(screen.queryByRole('dialog')).toBeNull();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole('dialog', { name: 'Welcome to KAD ICT Hub!' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register now/ })).toHaveAttribute('href', '/register');
    expect(screen.getByRole('link', { name: /View courses/ })).toHaveAttribute('href', '/programs');
    expect(screen.getByRole('link', { name: 'Data Analytics course flyer' })).toHaveAttribute(
      'href',
      'https://learn.kadhub.ng/courses/data-analytics',
    );
  });

  it('shows once per session: closing it remembers, and it stays shut next time', () => {
    const { unmount } = render(<WelcomePopup />);
    act(() => vi.advanceTimersByTime(1000));
    act(() => screen.getByRole('button', { name: 'Close' }).click());
    expect(window.sessionStorage.getItem('hasSeenWelcomePopup')).toBe('true');
    unmount();
    render(<WelcomePopup />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('moves through the flyers by arrow, dot and on its own', () => {
    render(<WelcomePopup />);
    act(() => vi.advanceTimersByTime(1000));
    expect(current()).toBe('Show the Data Analytics flyer');
    act(() => screen.getByRole('button', { name: 'Next flyer' }).click());
    expect(current()).toBe('Show the Cyber Security flyer');
    act(() => screen.getByRole('button', { name: 'Previous flyer' }).click());
    act(() => screen.getByRole('button', { name: 'Previous flyer' }).click());
    expect(current()).toBe('Show the Digital Literacy flyer');
    act(() => screen.getByRole('button', { name: 'Show the Networking flyer' }).click());
    expect(current()).toBe('Show the Networking flyer');
    act(() => vi.advanceTimersByTime(4500));
    expect(current()).toBe('Show the Digital Literacy flyer');
  });

  it('does not advance by itself for visitors who prefer reduced motion', () => {
    mockReducedMotion(true);
    render(<WelcomePopup />);
    act(() => vi.advanceTimersByTime(1000));
    act(() => vi.advanceTimersByTime(20000));
    expect(current()).toBe('Show the Data Analytics flyer');
  });
});
