"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight } from "lucide-react";

interface Companion {
    id: string;
    subject: string;
    name: string;
    topic: string;
    duration: number;
}

interface CompanionsListProps {
    title?: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    if (!companions || companions.length === 0) {
        return (
            <div className={cn("bg-white rounded-2xl border border-slate-200 p-8 text-center", classNames)}>
                <p className="text-slate-500 font-medium">No sessions found.</p>
            </div>
        );
    }

    return (
        <article className={cn('bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden', classNames)}>
            {title && (
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-extrabold text-xl text-slate-900 tracking-tight">{title}</h2>
                </div>
            )}

            <Table>
                <TableHeader className="bg-slate-50/80">
                    <TableRow className="hover:bg-transparent">
                        {/* Fluid width for the main column */}
                        <TableHead className="font-bold text-slate-500 uppercase tracking-wider text-xs py-4 px-6 w-full">Mentor & Topic</TableHead>
                        {/* Fixed widths for side columns */}
                        <TableHead className="font-bold text-slate-500 uppercase tracking-wider text-xs py-4 px-6 w-[120px] max-md:hidden">Subject</TableHead>
                        <TableHead className="font-bold text-slate-500 uppercase tracking-wider text-xs py-4 px-6 w-[140px] text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions.map(({ id, subject, name, topic, duration }, index) => (
                        <TableRow key={`${id}-${index}`} className="group hover:bg-slate-50/80 transition-colors">
                            
                            <TableCell className="px-6 py-4 max-w-0"> {/* max-w-0 forces truncate to work in tables */}
                                <Link href={`/dashboard/lesson/${id}`} className="block">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div 
                                            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl shadow-sm max-md:hidden transition-transform group-hover:scale-105" 
                                            style={{ backgroundColor: getSubjectColor(subject) }}
                                        >
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={24}
                                                height={24} 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <p className="font-bold text-slate-900 text-base group-hover:text-primary transition-colors truncate">
                                                {name}
                                            </p>
                                            <p className="text-sm text-slate-500 font-medium truncate">
                                                {topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>

                            <TableCell className="px-6 py-4 max-md:hidden">
                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 capitalize ring-1 ring-inset ring-slate-200 whitespace-nowrap">
                                    {subject}
                                </span>
                            </TableCell>

                            <TableCell className="px-6 py-4">
                                <Link href={`/dashboard/lesson/${id}`} className="flex items-center justify-end gap-3 w-full group whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
                                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>{duration} <span className="max-md:hidden font-medium text-slate-400">mins</span></span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors max-md:hidden flex-shrink-0" />
                                </Link>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    );
}

export default CompanionsList;