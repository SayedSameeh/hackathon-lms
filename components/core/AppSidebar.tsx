"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  History,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { title } from "process";

// Menu items
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "New Companion", url: "/dashboard/new", icon: PlusCircle },
  { title: "My Lessons", url: "/dashboard/lesson", icon: BookOpen },
  { title: "Session History", url: "/dashboard/history", icon: History },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      {/* HEADER */}
      <SidebarHeader className="p-6 border-b border-slate-100 bg-white">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Converso<span className="text-primary">.</span>
          </h2>
        </Link>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-white pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-4">
            Learning Hub
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    {/* We bypassed SidebarMenuButton and styled the Link directly */}
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 font-semibold text-base py-3 px-4 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-primary" : "text-slate-400",
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4 border-t border-slate-100 mt-auto bg-slate-50/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { avatarBox: "w-9 h-9" } }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Account</span>
            <span className="text-xs font-medium text-slate-500">
              Manage Profile
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
