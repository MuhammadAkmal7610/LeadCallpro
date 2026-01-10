import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    ArrowDownTrayIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const reports = [
    { id: 1, name: 'Calls-Report-08-Jan-2026_14:4...', size: '726 KB', status: 'COMPLETED', date: '2:15 PM Thu, 8 Jan 26', creator: 'Eon Holding' },
    { id: 2, name: 'Calls-Report-07-Jan-2026_09:4...', size: '743 KB', status: 'COMPLETED', date: '9:16 AM Wed, 7 Jan 26', creator: 'Eon Holding' },
    { id: 3, name: 'Calls-Report-06-Jan-2026_09:2...', size: '651 KB', status: 'COMPLETED', date: '8:54 AM Tue, 6 Jan 26', creator: 'Eon Holding' },
    { id: 4, name: 'Leaderboard-Report-05-Jan-202...', size: '2 KB', status: 'COMPLETED', date: '5:13 PM Mon, 5 Jan 26', creator: 'Ayesha Tariq' },
    { id: 5, name: 'Calls-Report-05-Jan-2026_14:2...', size: '550 KB', status: 'COMPLETED', date: '1:52 PM Mon, 5 Jan 26', creator: 'Eon Holding' },
    { id: 6, name: 'Calls-Report-05-Jan-2026_14:2...', size: '550 KB', status: 'COMPLETED', date: '1:51 PM Thu, 5 Jan 26', creator: 'Eon Holding' },
];

export default function ReportDownload() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-gray-900">Report Download</h1>
                                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ArrowPathIcon className="w-5 h-5 text-gray-400" /></button>
                            </div>

                            {/* Tabs/Filter Mock - Top Bar like screenshot */}
                            <div className="flex gap-6 text-sm font-medium text-gray-500 border-b border-gray-200 w-full max-w-2xl px-4">
                                {['All', 'Leads', 'Tasks', 'Leaderboard', 'Calls', 'Sales', 'Action', 'Salesform'].map((tab, idx) => (
                                    <button key={tab} className={`pb-3 border-b-2 hover:text-[#08A698] transition-colors ${idx === 0 ? 'border-[#08A698] text-[#08A698]' : 'border-transparent'}`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Filter</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Completed On</th>
                                        <th className="px-6 py-4">Created by</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center">
                                                        <ArrowDownTrayIcon className="w-4 h-4 text-[#08A698]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-700 text-[#08A698] group-hover:underline cursor-pointer">{report.name}</p>
                                                        <p className="text-[10px] text-gray-400">{report.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <FunnelIcon className="w-4 h-4 text-gray-400" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-[10px] font-bold border border-green-100">
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-600 font-medium">
                                                {report.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${report.creator.includes('Eon') ? 'bg-teal-50 text-teal-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {report.creator.substring(0, 2).toUpperCase()}
                                                    </span>
                                                    <span className="text-xs text-gray-600">{report.creator}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 hover:bg-teal-50 rounded-lg text-gray-400 hover:text-[#08A698] transition-all border border-transparent hover:border-teal-100 shadow-sm">
                                                    <ArrowDownTrayIcon className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
