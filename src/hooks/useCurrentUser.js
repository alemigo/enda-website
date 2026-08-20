import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export const APP_DASHBOARD_URL = "https://docs.endatech.app/dashboard";
export const APP_GETSTARTED_URL = "https://docs.endatech.app/getstarted";

export function getUserInitials(user) {
  const name = user?.full_name?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  const email = user?.email?.trim();
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

export function getUserAvatarUrl(user) {
  return user?.profile_image || user?.avatar_url || user?.picture || "";
}

export function goToDashboardAfterLogin() {
  try {
    base44.auth.redirectToLogin(APP_DASHBOARD_URL);
  } catch {
    window.location.href = APP_DASHBOARD_URL;
  }
}

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const current = await base44.auth.me();
        if (!cancelled) {
          setUser(current);
          setStatus(current ? "user" : "guest");
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setStatus("guest");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, status, isLoggedIn: status === "user" };
}
