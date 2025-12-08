// src/app/guestbook/page.tsx

import Guestbook from "@/app/components/Guestbook";

export default function Page() {
  return (
    <div className="px-4 pt-6 pb-24 max-w-xl mx-auto fade-in">
      <div className="glass rounded-2xl p-6 shadow-xl">
        <Guestbook />
      </div>
    </div>
  );
}
