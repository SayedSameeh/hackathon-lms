import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/core/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile trigger & top bar */}
          <div className="md:hidden flex items-center p-4 border-b border-slate-200">
            <SidebarTrigger />
            <span className="ml-4 font-bold text-slate-900">Converso</span>
          </div>
          
          {/* Main Page Content */}
          <div className="page-in flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}