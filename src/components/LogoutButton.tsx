"use client";

import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-[#ead8cf] bg-white/75 px-4 py-2 text-sm font-semibold text-[#7a3f2a] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#fff8f5] hover:shadow-md"
    >
      Log out
    </button>
  );
}
