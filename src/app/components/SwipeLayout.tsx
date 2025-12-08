// src/app/components/SwipeLayout.tsx

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useRef } from 'react';
import { navItems } from '../config/navConfig';

export default function SwipeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const swipeRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    swipeRef.current!.dataset.startX = touch.clientX.toString();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(swipeRef.current!.dataset.startX || '0');
    const endX = touch.clientX;
    const deltaX = startX - endX;

    const minSwipeDistance = 50;
    if (Math.abs(deltaX) > minSwipeDistance) {
      const currentIndex = navItems.findIndex(item => pathname.startsWith(item.href));

      if (deltaX > 0 && currentIndex < navItems.length - 1) {
        // Swipe kiri → next page
        router.push(navItems[currentIndex + 1].href);
      } else if (deltaX < 0 && currentIndex > 0) {
        // Swipe kanan → previous page
        router.push(navItems[currentIndex - 1].href);
      }
    }
  };

  return (
    <div
      ref={swipeRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen w-full overflow-x-hidden"
    >
      {children}
    </div>
  );
}
