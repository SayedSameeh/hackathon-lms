import CTA from "@/components/CTA";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  // Automatically route active users to their private dashboard
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main>
      <section className="home-section flex-col items-center text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Master any tech skill, without the fluff.
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mb-10">
          Upload your university syllabus or enter a topic. Get a modern, industry-standard roadmap taught by a real-time AI mentor.
        </p>
        
        <Link href="/sign-up">
          <button className="btn-primary px-10 py-4 justify-center text-lg font-bold">
            Get Started
          </button>
        </Link>
      </section>

      <section className="home-section flex-col mt-12 border-t pt-12">
        <CTA />
      </section>
    </main>
  );
};

export default Page;