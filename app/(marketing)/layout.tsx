import SiteNav from "@/components/landing/SiteNav";
import Footer from "@/components/landing/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="flex min-h-screen flex-col overflow-x-clip bg-background">
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main" className="!m-0 !h-auto !max-w-none !gap-0 !p-0">{children}</main>
      <Footer />
    </div>
  );
}
