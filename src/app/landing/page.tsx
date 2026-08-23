"use client";

import { useEffect } from "react";
import { useUser } from "@/providers/UserProvider";
import { getUserProfile, loginWithLLEToken } from "@/service/auth";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { APP_ENV } from "@/utils/env";
import { getHealth } from "@/service/health";
import { useSearchParams } from "next/navigation";

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

const Landing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userLoading, setUser, setUserLoading, setUserToken } =
    useUser();

  const tokenQuery = searchParams.get("token");
  const langQuery = searchParams.get("lang");

  const locale = useLocale();

  useEffect(() => {
    async function checkHealth() {
      if (APP_ENV === "development" && process.env.NODE_ENV !== "production") {
        const health = await getHealth();
        console.log("Health check:", health);
      }
    }

    checkHealth();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = tokenQuery || "";

      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        const accessToken = await loginWithLLEToken(token);
        const fetchedUser = await getUserProfile(accessToken);
        setUser(fetchedUser);
        setUserToken(accessToken);

        const redirect_locale =
          langQuery === "th" ? "th-th" : langQuery === "en" ? "en-us" : locale;

        router.replace("/", { locale: redirect_locale });
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [tokenQuery, langQuery, router]);

  if (userLoading || user === undefined) {
    return <UserLoading />;
  }

  return null;
};

export default Landing;
