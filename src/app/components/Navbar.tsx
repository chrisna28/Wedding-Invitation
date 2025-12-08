// scr/app/components/navbar.tsx

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

interface NavbarProps {
  className?: string;
}

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/details', label: 'Detail' },
  { href: '/guestbook', label: 'Guest Book' },
];

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    navRef.current!.dataset.startX = touch.clientX.toString();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(navRef.current!.dataset.startX || '0');
    const endX = touch.clientX;
    const deltaX = startX - endX;

    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      const currentIndex = navItems.findIndex(item => pathname.startsWith(item.href));

      if (deltaX > 0 && currentIndex < navItems.length - 1) {
        // Swipe kiri → halaman berikutnya
        router.push(navItems[currentIndex + 1].href);
      } else if (deltaX < 0 && currentIndex > 0) {
        // Swipe kanan → halaman sebelumnya
        router.push(navItems[currentIndex - 1].href);
      }
    }
  };

  return (
    <div
      ref={navRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed top-0 left-0 right-0 z-50 
      backdrop-blur-xl bg-white/40 border-b border-[#d4af37]/30 shadow-sm 
      ${className}`}
    >
      <div className="flex justify-around py-3 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-3 py-1 transition-colors 
                ${isActive
                  ? 'text-[#d4af37] font-semibold'
                  : 'text-[#5a4a42] hover:text-[#d4af37]'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
