import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/core/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#faf7f2]">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-stone-200 bg-[#faf7f2]">
            <SidebarTrigger aria-label="Open navigation" />
            <span className="font-bold text-zinc-900">Converso</span>
          </div>
          <div className="page-in flex-1 p-4 md:p-10">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
