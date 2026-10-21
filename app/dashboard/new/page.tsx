import CompanionForm from "@/components/CompanionForm";

export default function NewCompanionPage() {
    return (
        <div className="flex flex-col gap-8 max-w-4xl w-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                    Build a Custom Mentor
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-2xl">
                    Design a specialized AI companion tailored to your exact learning style, subject focus, and vocal preference.
                </p>
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10">
                <CompanionForm />
            </div>
        </div>
    );
}