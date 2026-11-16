import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useActiveSection } from '../src/hooks/useActiveSection';
import { MobileHeader } from '../src/components/MobileHeader/MobileHeader';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observerInstances: MockIntersectionObserver[] = [];

class MockIntersectionObserver {
  callback: ObserverCallback;
  observed: Element[] = [];
  observe = vi.fn((el: Element) => {
    this.observed.push(el);
  });
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds: number[] = [];

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    observerInstances.push(this);
  }
}

function TestHarness({ ids }: { ids: string[] }) {
  const activeId = useActiveSection(ids);
  return (
    <div>
      <span data-testid="active">{activeId ?? 'none'}</span>
      {ids.map((id) => (
        <section key={id} id={id} />
      ))}
    </div>
  );
}

describe('useActiveSection', () => {
  beforeEach(() => {
    observerInstances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('초기 상태에서는 첫 항목을 반환한다', () => {
    render(<TestHarness ids={['sec-1', 'sec-2', 'sec-3']} />);
    expect(screen.getByTestId('active')).toHaveTextContent('sec-1');
    expect(observerInstances).toHaveLength(1);
    expect(observerInstances[0].observed.map((el) => el.id)).toEqual(['sec-1', 'sec-2', 'sec-3']);
  });

  it('여러 섹션이 화면에 들어오면 ids 순서상 가장 위쪽 섹션을 반환한다', () => {
    render(<TestHarness ids={['sec-1', 'sec-2', 'sec-3']} />);
    const obs = observerInstances[0];

    act(() => {
      obs.callback([
        { target: document.getElementById('sec-3')!, isIntersecting: true },
        { target: document.getElementById('sec-2')!, isIntersecting: true },
      ]);
    });

    expect(screen.getByTestId('active')).toHaveTextContent('sec-2');
  });

  it('화면에 보이는 섹션이 없으면 마지막 활성 섹션을 유지한다', () => {
    render(<TestHarness ids={['sec-1', 'sec-2']} />);
    const obs = observerInstances[0];

    act(() => {
      obs.callback([{ target: document.getElementById('sec-2')!, isIntersecting: true }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('sec-2');

    act(() => {
      obs.callback([{ target: document.getElementById('sec-2')!, isIntersecting: false }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('sec-2');
  });

  it('ids가 바뀌어 현재 activeId가 사라지면 새 첫 항목으로 리셋한다', () => {
    const { rerender } = render(<TestHarness ids={['sec-1', 'sec-2']} />);
    const obs = observerInstances[0];

    act(() => {
      obs.callback([{ target: document.getElementById('sec-2')!, isIntersecting: true }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('sec-2');

    rerender(<TestHarness ids={['sec-3', 'sec-4']} />);
    expect(screen.getByTestId('active')).toHaveTextContent('sec-3');
  });

  it('문서 끝에 도달하면 마지막 id를 반환하고, 벗어나면 관측 기반 값으로 복귀한다', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    });

    render(<TestHarness ids={['sec-1', 'sec-2', 'sec-3']} />);
    const obs = observerInstances[0];

    act(() => {
      obs.callback([{ target: document.getElementById('sec-2')!, isIntersecting: true }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('sec-2');

    act(() => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 1199 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByTestId('active')).toHaveTextContent('sec-3');

    act(() => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByTestId('active')).toHaveTextContent('sec-2');
  });

  it('ids가 바뀌면 기존 observer를 disconnect하고 재구성하며 unmount 시 disconnect한다', () => {
    const { rerender, unmount } = render(<TestHarness ids={['sec-1', 'sec-2']} />);
    const firstObs = observerInstances[0];

    rerender(<TestHarness ids={['sec-1', 'sec-3']} />);
    expect(firstObs.disconnect).toHaveBeenCalledTimes(1);
    expect(observerInstances).toHaveLength(2);

    const secondObs = observerInstances[1];
    unmount();
    expect(secondObs.disconnect).toHaveBeenCalledTimes(1);
  });

  it('IntersectionObserver가 없는 환경에서도 안전하게 첫 항목을 반환한다', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<TestHarness ids={['sec-1']} />);
    expect(screen.getByTestId('active')).toHaveTextContent('sec-1');
  });
});

describe('MobileHeader menuExpanded', () => {
  it('menuExpanded 미지정 시 aria-expanded를 렌더하지 않는다', () => {
    render(<MobileHeader title="Sonagi" onMenuClick={() => {}} />);
    const btn = screen.getByRole('button', { name: '메뉴 열기' });
    expect(btn).not.toHaveAttribute('aria-expanded');
  });

  it('menuExpanded 지정 시 aria-expanded 속성을 전달한다', () => {
    const { rerender } = render(
      <MobileHeader title="Sonagi" onMenuClick={() => {}} menuExpanded={false} />
    );
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveAttribute('aria-expanded', 'false');

    rerender(<MobileHeader title="Sonagi" onMenuClick={() => {}} menuExpanded={true} />);
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveAttribute('aria-expanded', 'true');
  });
});
