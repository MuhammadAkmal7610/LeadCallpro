import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowPathIcon, PlusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'; // Using generic icons for actions

// Mock Data
const templates = [
    {
        id: 1,
        name: 'Telecrm Facebook Api',
        endpoint: 'https://graph.facebook.com/v23.0/5332060898...',
        variables: ['status', '+4'],
        workflow: 'FCAPI',
        lastModified: '4M ago',
        lastModifiedBy: 'EH',
    }
];

export default function ApiTemplates() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 bg-gray-50/50">
                    <div className="mx-auto max-w-7xl">

                        {/* Page Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-semibold text-gray-800">API Templates</h1>
                                <ArrowPathIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                            </div>
                            <button className="bg-[#08A698] hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                                Create New <PlusIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Create an API template once and use it everywhere</p>

                        {/* Table */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 min-w-[200px]">Template Name</th>
                                            <th className="px-6 py-3 min-w-[300px]">Endpoint URL</th>
                                            <th className="px-6 py-3">Variables Used</th>
                                            <th className="px-6 py-3">Workflow</th>
                                            <th className="px-6 py-3 bg-gray-100/50 border-x border-gray-200/50 cursor-pointer hover:bg-gray-100 transition-colors">
                                                Last Modified <span className="text-[10px] ml-1">▼</span>
                                            </th>
                                            <th className="px-6 py-3">Last Modified By</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {templates.map((template) => (
                                            <tr key={template.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{template.name}</td>
                                                <td className="px-6 py-4 text-gray-500 truncate max-w-[300px]" title={template.endpoint}>
                                                    {template.endpoint}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-1">
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded textxs">{template.variables[0]}</span>
                                                        <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-xs font-semibold">{template.variables[1]}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded-md text-xs font-medium border border-teal-100">
                                                        {template.workflow}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{template.lastModified}</td>
                                                <td className="px-6 py-4">
                                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold ring-2 ring-white">
                                                        {template.lastModifiedBy}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-1.5 text-gray-400 hover:text-[#08A698] hover:bg-teal-50 rounded-md transition-colors border border-gray-200">
                                                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Empty state filler if needed, but keeping it minimal as per screenshot */}
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
