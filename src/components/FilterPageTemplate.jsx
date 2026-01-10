import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowPathIcon,
    PlusIcon,
    ChevronDownIcon,
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    CalendarIcon,
    UserIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline'; // Outline star for empty rating
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'; // Solid star for filled rating


export default function FilterPageTemplate({ title, data = [], showEmptyState = false }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 md:p-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#08A698] transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#08A698] transition-colors"><ArrowPathIcon className="w-4 h-4" /></button>
                            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#08A698] transition-colors"><PlusIcon className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600"><div className="w-5 h-5 flex items-end gap-0.5"><div className="w-1 h-2 bg-current"></div><div className="w-1 h-3 bg-current"></div><div className="w-1 h-4 bg-current"></div></div></button>
                            <button className="p-2 text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700"><div className="w-5 h-5 flex flex-col gap-0.5"><div className="w-full h-0.5 bg-current"></div><div className="w-full h-0.5 bg-current"></div><div className="w-full h-0.5 bg-current"></div></div></button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white p-2 rounded-xl border border-gray-100 mb-6 shadow-sm flex flex-col md:flex-row items-center gap-3">
                        <div className="flex-1 flex w-full md:w-auto">
                            <div className="relative group md:w-96 w-full">
                                <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 group-focus-within:text-[#08A698]" />
                                </div>
                                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium flex items-center gap-1 cursor-pointer hover:text-gray-700"> Name <ChevronDownIcon className="w-3 h-3" /> </div>
                                <div className="absolute left-20 top-2 bottom-2 w-px bg-gray-200"></div>
                                <input
                                    type="text"
                                    placeholder="Search lead"
                                    className="w-full pl-24 pr-4 py-2 bg-transparent border-none text-sm focus:ring-0 placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <FilterPill label="Assignee" icon={UserIcon} />
                            <FilterPill label="Creation Date" icon={CalendarIcon} />
                            <FilterPill label="Status" />
                        </div>
                    </div>

                    {/* Bulk Actions (Optional / Contextual) */}
                    <div className="flex items-center justify-end gap-2 mb-4">
                        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:border-gray-300 flex items-center gap-1.5"><PencilSquareIcon className="w-3.5 h-3.5" /> Bulk Edit</button>
                        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:border-gray-300 flex items-center gap-1.5"><ChatBubbleLeftRightIcon className="w-3.5 h-3.5" /> Bulk WACA Message</button>
                        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:border-gray-300 flex items-center gap-1.5">More <ChevronDownIcon className="w-3 h-3" /></button>
                    </div>

                    {/* Table Content */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        {showEmptyState ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <MagnifyingGlassIcon className="w-8 h-8" />
                                </div>
                                <h3 className="text-gray-900 font-medium">No Data Found!</h3>
                                <p className="text-gray-500 text-sm mt-1">(Please try changing filters)</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 p-3 border-b border-gray-100 text-xs text-gray-500 bg-gray-50/30">
                                    <span className="bg-gray-200 rounded text-[10px] px-1.5 py-0.5">1-20 of {data.length > 0 ? data.length + '024' : '0'}</span>
                                    <ChevronDownIcon className="w-3 h-3" />
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-[#08A698] focus:ring-[#08A698]" /></th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Assignee</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Created On</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Modified On</th>
                                                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Lead source</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {data.map((lead) => (
                                                <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors group">
                                                    <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-[#08A698] focus:ring-[#08A698]" /></td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm font-medium text-indigo-900 group-hover:text-[#08A698] transition-colors cursor-pointer">{lead.name}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <StatusBadge status={lead.status} subStatus={lead.subStatus} />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <StarIcon className="w-4 h-4 text-gray-300" />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold uppercase">{lead.assigneeInitials}</div>
                                                            <span className="text-xs text-gray-600">{lead.assigneeName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-gray-500">{lead.createdOn}</td>
                                                    <td className="px-4 py-3 text-xs text-gray-500">{lead.modifiedOn}</td>
                                                    <td className="px-4 py-3">
                                                        {lead.source && <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] border border-amber-100 rounded">{lead.source}</span>}
                                                        {!lead.source && <span className="text-gray-300 text-xs">--</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

const FilterPill = ({ label, icon: Icon }) => (
    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 flex items-center gap-1.5 whitespace-nowrap shadow-sm transition-all">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
        {label} <ChevronDownIcon className="w-3 h-3 text-gray-300" />
    </button>
);

const StatusBadge = ({ status, subStatus }) => {
    let styles = 'bg-emerald-50 text-emerald-700 border-emerald-100'; // Fresh/Default
    if (status === 'Lost') styles = 'bg-red-50 text-red-700 border-red-100';
    if (status === 'Dead') styles = 'bg-gray-100 text-gray-600 border-gray-200';
    if (status.includes('Attempted')) styles = 'bg-gray-100 text-gray-700 border-gray-200';
    if (status.includes('Support')) styles = 'bg-gray-100 text-gray-700 border-gray-200';
    if (status.includes('Interested')) styles = 'bg-orange-50 text-orange-700 border-orange-100';
    if (status.includes('Recapture')) styles = 'bg-orange-100 text-orange-800 border-orange-200';

    return (
        <div className="flex flex-col items-start gap-0.5">
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${styles} whitespace-nowrap`}>
                {status}
            </span>
            {subStatus && (
                <span className="text-[9px] text-gray-500 flex items-center gap-1 ml-1">
                    <span className="w-1.5 h-px bg-gray-300"></span> {subStatus}
                </span>
            )}
        </div>
    );
};
