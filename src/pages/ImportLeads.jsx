import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    CloudArrowUpIcon,
    DocumentArrowDownIcon,
    TrashIcon,
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

// Mock Data for Upload History
const uploadHistory = [
    { id: 1, name: 'Untitled spreadsheet', leads: 3, uploadedBy: 'EH Eon Holding', time: '5M ago', status: 'Uploaded' },
    { id: 2, name: 'Qurat', leads: 413, uploadedBy: 'EH Eon Holding', time: '5M ago', status: 'Uploaded' },
    { id: 3, name: 'Masfa', leads: 165, uploadedBy: 'EH Eon Holding', time: '5M ago', status: 'Uploaded' },
    { id: 4, name: 'Fatima (1)', leads: 317, uploadedBy: 'EH Eon Holding', time: '5M ago', status: 'Uploaded' },
    { id: 5, name: 'Old Leads', leads: '4.24K', uploadedBy: 'EH Eon Holding', time: '5M ago', status: 'Uploaded' },
];

export default function ImportLeads() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 bg-gray-50/50">
                    <div className="mx-auto max-w-6xl">

                        {/* Page Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm">
                                {/* Excel icon placeholder */}
                                <svg className="w-6 h-6 text-[#08A698]" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Import Leads</h1>
                            <div className="flex-1 flex justify-end">
                                <button className="text-[#08A698] text-sm font-medium hover:text-teal-700 transition-colors flex items-center gap-2 px-3 py-1.5 hover:bg-teal-50 rounded-md">
                                    <span className="w-4 h-4 bg-[#08A698] text-white rounded-full flex items-center justify-center text-[10px] font-bold">?</span>
                                    How to upload?
                                </button>
                            </div>
                        </div>

                        {/* Upload Section */}
                        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-[#08A698] p-12 mb-8 text-center relative overflow-hidden group transition-all duration-300 hover:shadow-md cursor-pointer">
                            <div className="relative z-10 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ring-4 ring-teal-50 group-hover:ring-teal-100">
                                    <CloudArrowUpIcon className="w-8 h-8 text-[#08A698]" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Click to upload .csv or .xlsx files</h3>
                                <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                                    Maximize your efficiency by uploading bulk leads. <br />(Max 100mb and 100k rows per sheet)
                                </p>

                                <button className="px-8 py-3 bg-[#08A698] text-white rounded-lg text-sm font-bold hover:bg-teal-700 transition-all shadow-md shadow-teal-100 hover:shadow-lg hover:-translate-y-0.5 mb-6">
                                    Upload File
                                </button>

                                <button className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-[#08A698] transition-colors border-b border-transparent hover:border-[#08A698] pb-0.5">
                                    <DocumentArrowDownIcon className="w-4 h-4" />
                                    Download Sample Template
                                </button>
                            </div>

                            {/* Background hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-50/0 via-teal-50/0 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                        {/* Table Controls */}
                        <div className="flex justify-between items-center mb-4 px-1">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                                    <button className="p-1 hover:bg-gray-50 rounded transition-colors disabled:opacity-50 text-gray-500 hover:text-[#08A698]">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <span className="text-xs font-medium text-gray-700 px-3 select-none">1 - 5 of 5</span>
                                    <button className="p-1 hover:bg-gray-50 rounded transition-colors disabled:opacity-50 text-gray-500 hover:text-[#08A698]">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-[#08A698] hover:text-[#08A698] transition-colors flex items-center gap-2 shadow-sm">
                                    Date <span className="text-[10px]">▼</span>
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-[#08A698] hover:text-[#08A698] transition-colors flex items-center gap-2 shadow-sm">
                                    Uploaded by <span className="text-[10px]">▼</span>
                                </button>
                            </div>
                        </div>

                        {/* History Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/80 text-gray-500 font-medium border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Uploaded File Name</th>
                                            <th className="px-6 py-4 font-semibold">Leads</th>
                                            <th className="px-6 py-4 font-semibold">Uploaded by</th>
                                            <th className="px-6 py-4 font-semibold">Uploaded on</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {uploadHistory.map((item) => (
                                            <tr key={item.id} className="hover:bg-teal-50/20 transition-colors group">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[#08A698] font-semibold hover:underline decoration-dotted cursor-pointer flex items-center gap-1 w-fit">
                                                        {item.leads} <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 inline opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-6 h-6 rounded-full bg-teal-100 text-[#08A698] flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-sm">
                                                            EH
                                                        </div>
                                                        <span className="text-gray-600">{item.uploadedBy}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 tabular-nums">{item.time}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-gray-400 hover:text-[#08A698] border border-transparent hover:border-[#08A698]/30 hover:bg-teal-50 rounded-lg transition-all" title="Retry">
                                                            <ArrowPathIcon className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
