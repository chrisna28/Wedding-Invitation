// scr/app/components/navbar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <div
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
