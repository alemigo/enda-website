import React from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  APP_DASHBOARD_URL,
  getUserAvatarUrl,
  getUserInitials,
  goToDashboardAfterLogin,
} from "@/hooks/useCurrentUser";

export default function AuthHeaderButton({ user, status }) {

  if (status === "loading") {
    return (
      <div
        className="h-9 w-9 rounded-full bg-slate-100 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  if (status !== "user" || !user) {
    return (
      <Button
        variant="ghost"
        onClick={goToDashboardAfterLogin}
        className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
      >
        Log in
      </Button>
    );
  }

  const firstName = user.full_name?.trim()?.split(/\s+/)[0];
  const initials = getUserInitials(user);
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto gap-2 rounded-full px-1.5 py-1 text-slate-700 hover:text-slate-900"
          aria-label={user.full_name ? `Account menu for ${user.full_name}` : "Account menu"}
        >
          <Avatar className="h-9 w-9 border border-slate-200">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
            <AvatarFallback className="bg-[#003B73] text-xs font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          {firstName ? (
            <span className="hidden pr-1 font-medium sm:inline">{firstName}</span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium text-slate-900">
            {user.full_name || "Account"}
          </p>
          <p className="truncate text-xs font-normal text-slate-500">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => (window.location.href = APP_DASHBOARD_URL)}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => base44.auth.logout("/")}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
