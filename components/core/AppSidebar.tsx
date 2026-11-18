"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpen, History, LayoutDashboard, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My lessons", url: "/dashboard/lesson", icon: BookOpen },
  { title: "Session history", url: "/dashboard/history", icon: History },
  { title: "Profile", url: "/dashboard/profile", icon: UserRound },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  // "/dashboard" must only match itself; the others also own their sub-routes
  const isActive = (url: string) =>
    url === "/dashboard" ? pathname === url : pathname.startsWith(url);

  return (
    <Sidebar className="border-r border-white/10 bg-[#09090b] text-zinc-300">
      <SidebarHeader className="px-6 pt-7 pb-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 w-fit">
          <span className="grid size-8 place-items-center rounded-lg bg-primary">
            <Sparkles className="size-4 text-white" aria-hidden />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Converso
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-transparent px-3 pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors duration-150",
                        active
                          ? "bg-white/10 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <item.icon
                        className={cn("size-[18px]", active && "text-primary")}
                        aria-hidden
                      />
                      {item.title}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
        >
          <UserButton appearance={{ elements: { avatarBox: "size-9" } }} />
          <span className="min-w-0 flex flex-col">
            <span className="truncate text-sm font-semibold text-white">
              {user?.fullName || "Your account"}
            </span>
            <span className="truncate text-xs text-zinc-500">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
