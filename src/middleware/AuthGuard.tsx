"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/providers/UserProvider";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, userLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (userLoading) return;

    if (!user && pathname !== "/") {
      router.replace("/");
    }
  }, [user, userLoading, pathname, router]);

  if (userLoading) return <div />;

  return <>{children}</>;
}
