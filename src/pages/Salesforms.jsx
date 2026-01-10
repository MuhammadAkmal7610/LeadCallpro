import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowPathIcon, PlusIcon, MagnifyingGlassIcon, TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

// Mock Data
const salesforms = [
    {
        id: 1,
        name: 'Basic Lead qualification',
        events: 'On Button Click',
        status: true, // true = ON, false = OFF
        statusUpdatedOn: '5M ago',
        statusUpdatedBy: 'EH',
    }
];

export default function Salesforms() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Published');

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
                                <h1 className="text-2xl font-semibold text-gray-800">Salesforms</h1>
                                <ArrowPathIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                            </div>
                            <button className="bg-[#08A698] hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                                Create Salesform <PlusIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">To automatically fill lead form data</p>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-6">
                            {['Published', 'Draft'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                        ? 'border-[#08A698] text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Filter Bar */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-2 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search salesform by Name"
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                                />
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center w-64">
                                <select className="w-full outline-none text-gray-700 text-sm bg-transparent cursor-pointer">
                                    <option value="">Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 min-w-[200px]">Name</th>
                                            <th className="px-6 py-3">Events</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3 bg-gray-100/50 border-x border-gray-200/50 cursor-pointer hover:bg-gray-100 transition-colors">
                                                Status Updated On <span className="text-[10px] ml-1">▼</span>
                                            </th>
                                            <th className="px-6 py-3">Status Updated by</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {activeTab === 'Published' && salesforms.map((form) => (
                                            <tr key={form.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-[#08A698] hover:text-teal-700 cursor-pointer">
                                                    {form.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 flex w-fit items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                        {form.events}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* Custom Toggle Switch */}
                                                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#08A698] focus:ring-offset-2 bg-[#08A698]">
                                                        <span className="sr-only">Use setting</span>
                                                        <span
                                                            className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                                        >
                                                            <span className="absolute inset-0 flex h-full w-full items-center justify-center opacity-100 transition-opacity duration-200 ease-in">
                                                                <span className="text-[8px] font-bold text-[#08A698]">ON</span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{form.statusUpdatedOn}</td>
                                                <td className="px-6 py-4">
                                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold ring-2 ring-white">
                                                        {form.statusUpdatedBy}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-1.5 text-gray-400 hover:text-[#08A698] hover:bg-teal-50 rounded-md transition-colors border border-gray-200">
                                                            <DocumentDuplicateIcon className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-gray-200">
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {activeTab === 'Draft' && (
                                    <div className="p-12 text-center text-gray-500">No drafts found</div>
                                )}
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
