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
                    <div className="mx-auto max-w-5xl space-y-8">

                        {/* Page Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm">
                                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Import Leads</h1>
                                    <p className="text-sm text-gray-500 mt-1">Bulk upload your leads via CSV or Excel</p>
                                </div>
                            </div>
                            <button className="text-primary bg-teal-50 hover:bg-teal-100 border border-teal-200 text-sm font-semibold transition-colors flex items-center gap-2 px-4 py-2 rounded-lg">
                                <span className="w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold">?</span>
                                How to upload?
                            </button>
                        </div>

                        {/* Upload Section */}
                        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-primary p-12 text-center relative overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer">
                            <div className="relative z-10 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-8 ring-teal-50/50 group-hover:ring-teal-100/50">
                                    <CloudArrowUpIcon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Click to upload .csv or .xlsx files</h3>
                                <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                                    Maximize your efficiency by uploading bulk leads. <br />
                                    <span className="text-xs text-gray-400 mt-2 block">(Max 100mb and 100k rows per sheet)</span>
                                </p>

                                <button className="px-8 py-3 bg-[#08A698] text-white rounded-lg text-sm font-bold hover:bg-teal-700 transition-all shadow-md shadow-teal-100 hover:shadow-lg hover:-translate-y-0.5 mb-8">
                                    Select File
                                </button>

                                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-primary transition-colors group/link">
                                    <DocumentArrowDownIcon className="w-4 h-4 group-hover/link:translate-y-0.5 transition-transform" />
                                    Download Sample Template
                                </button>
                            </div>

                            {/* Background hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-50/0 via-teal-50/0 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                        {/* Recent Imports Table */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <h2 className="text-lg font-bold text-gray-800">Recent Imports</h2>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary transition-colors flex items-center gap-2 shadow-sm">
                                        Date <span className="text-[10px]">▼</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-200 text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4">File Name</th>
                                                <th className="px-6 py-4 text-center">Leads Count</th>
                                                <th className="px-6 py-4">Uploaded By</th>
                                                <th className="px-6 py-4">Time</th>
                                                <th className="px-6 py-4 text-center">Status</th>
                                                <th className="px-6 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {uploadHistory.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                        <div className="p-1.5 bg-green-50 text-green-600 rounded">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                                                        </div>
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-semibold text-gray-700">{item.leads}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">EH</div>
                                                            <span className="text-gray-600 text-xs">{item.uploadedBy}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 text-xs">{item.time}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50 border-t border-gray-200">
                                            <tr>
                                                <td colSpan="6" className="px-6 py-3">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <button className="p-1 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 text-gray-500 hover:text-gray-700">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                                        </button>
                                                        <span className="text-xs font-semibold text-gray-500 select-none">Showing 1 - 5 of 5</span>
                                                        <button className="p-1 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 text-gray-500 hover:text-gray-700">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
