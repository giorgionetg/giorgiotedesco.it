'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';

type SmoothScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function SmoothScrollLink({ href, onClick, ...props }: SmoothScrollLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!href.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey) return;

    // A tap does not consistently expose `button` as 0 on every mobile browser.
    // Only reject a click when the browser explicitly reports a non-primary button.
    if (typeof event.button === 'number' && event.button > 0) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    const startY = window.scrollY;
    const targetY = Math.max(0, target.getBoundingClientRect().top + startY - 88);
    const distance = targetY - startY;
    const duration = 700;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        window.requestAnimationFrame(animate);
        return;
      }

      target.focus({ preventScroll: true });
    };

    window.requestAnimationFrame(animate);
    window.history.replaceState(null, '', href);
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
