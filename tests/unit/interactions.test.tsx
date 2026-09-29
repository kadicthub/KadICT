import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Interactions } from '@/components/brand/Interactions';

type Callback = (entries: { target: Element; isIntersecting: boolean }[]) => void;
let ioCallback: Callback;
const observed: Element[] = [];

function mockMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: reduce,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

function placeAt(el: Element, top: number) {
  el.getBoundingClientRect = () => ({ top, left: 10, width: 200, height: 100 }) as DOMRect;
}

describe('Interactions', () => {
  beforeEach(() => {
    observed.length = 0;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: Callback) {
          ioCallback = cb;
        }
        observe = (el: Element) => observed.push(el);
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    mockMotion(false);
    document.body.innerHTML = '';
  });
  afterEach(() => vi.unstubAllGlobals());

  it('holds back only below-the-fold content, and reveals it on intersection', () => {
    document.body.innerHTML =
      '<section id="above" data-reveal></section><section id="below" data-reveal></section>';
    const above = document.getElementById('above')!;
    const below = document.getElementById('below')!;
    placeAt(above, 100);
    placeAt(below, window.innerHeight + 200);
    render(<Interactions />);
    expect(above.hasAttribute('data-reveal-pending')).toBe(false);
    expect(below.hasAttribute('data-reveal-pending')).toBe(true);
    expect(observed).toEqual([below]);
    act(() => ioCallback([{ target: below, isIntersecting: true }]));
    expect(below.hasAttribute('data-reveal-pending')).toBe(false);
  });

  it('staggers the children of a reveal list', () => {
    document.body.innerHTML = '<ul data-reveal-stagger><li></li><li></li><li></li></ul>';
    render(<Interactions />);
    const items = Array.from(document.querySelectorAll('li'));
    expect(items.every((li) => li.hasAttribute('data-reveal'))).toBe(true);
    expect(items.map((li) => li.style.getPropertyValue('--reveal-delay'))).toEqual([
      '0ms',
      '70ms',
      '140ms',
    ]);
  });

  it('holds nothing back when the visitor prefers reduced motion', () => {
    mockMotion(true);
    document.body.innerHTML = '<section id="below" data-reveal></section>';
    placeAt(document.getElementById('below')!, window.innerHeight + 200);
    render(<Interactions />);
    expect(document.querySelector('[data-reveal-pending]')).toBeNull();
  });

  it('follows the pointer across spotlight surfaces', () => {
    document.body.innerHTML = '<article data-spotlight><p id="inner">x</p></article>';
    const card = document.querySelector<HTMLElement>('[data-spotlight]')!;
    placeAt(card, 50);
    render(<Interactions />);
    const move = new MouseEvent('pointermove', { bubbles: true, clientX: 60, clientY: 80 });
    document.getElementById('inner')!.dispatchEvent(move);
    expect(card.style.getPropertyValue('--mx')).toBe('50px');
    expect(card.style.getPropertyValue('--my')).toBe('30px');
  });

  it('marks the page as scrolled for the header', () => {
    render(<Interactions />);
    expect(document.documentElement.hasAttribute('data-scrolled')).toBe(false);
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 120, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(document.documentElement.hasAttribute('data-scrolled')).toBe(true);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });
});
