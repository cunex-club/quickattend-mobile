"use client";

import { useEffect } from "react";
import { useUser } from "@/providers/UserProvider";
import { getUserProfile } from "@/service/auth";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { APP_ENV } from "@/utils/env";
import { getHealth } from "@/service/health";

const UserLoading = () => {
  const tCommon = useTranslations("common");

  return (
    <div className="w-full sm:max-w-[390px] fixed min-h-screen bg-neutral-white flex items-center justify-center z-50">
      <p className="text-xl animate-pulse headline-large-primary">
        {tCommon("loading")}
      </p>
    </div>
  );
};

const UserNotFound = () => {
  const tCommon = useTranslations("common");

  return (
    <div className="w-full sm:max-w-[390px] fixed min-h-screen bg-neutral-white flex items-center justify-center z-50">
      <p className="text-xl animate-pulse headline-large-primary">
        {tCommon("userNotFound")}
      </p>
    </div>
  );
};

const Landing = () => {
  const router = useRouter();
  const { user, userLoading, setUser, setUserLoading } = useUser();

  useEffect(() => {
    async function checkHealth() {
      if (APP_ENV === "development") {
        const health = await getHealth();
        console.log("Health check:", health);
      }
    }

    checkHealth();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = process.env.NEXT_PUBLIC_MOCK_JWT_TOKEN ?? "";
      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }
      try {
        const fetchedUser = await getUserProfile(token);
        setUser(fetchedUser);
        router.replace("/");
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [router, setUser, setUserLoading]);

  if (userLoading || user === undefined) {
    return <UserLoading />;
  }

  if (user === null) {
    return <UserNotFound />;
  }

  return null;
};

export default Landing;
