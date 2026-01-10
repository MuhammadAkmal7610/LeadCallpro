import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowPathIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock Data
const schedules = []; // Empty as per screenshot

export default function Schedules() {
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
                                <h1 className="text-2xl font-semibold text-gray-800">Schedules</h1>
                                <ArrowPathIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                            </div>
                            <button className="bg-[#08A698] hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                                Create New Schedule <PlusIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            To automatically keep in touch with your leads <span className="text-[#08A698] underline cursor-pointer decoration-dotted">Learn More</span>
                        </p>

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
                        <div className="flex flex-col md:flex-row gap-4 mb-2">
                            <div className="flex-1 bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-2 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search flowchart by Name"
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                                />
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center w-full md:w-64">
                                <select className="w-full outline-none text-gray-700 text-sm bg-transparent cursor-pointer text-gray-400">
                                    <option value="">Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center w-full md:w-64">
                                <select className="w-full outline-none text-gray-700 text-sm bg-transparent cursor-pointer text-gray-400">
                                    <option value="">Select Event Types</option>
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 mb-6">
                            0 matching flowcharts found
                        </div>

                        {/* Table / Empty State */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 min-w-[200px]">Name</th>
                                            <th className="px-6 py-3">Events</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3 bg-gray-100/50 border-x border-gray-200/50 cursor-pointer hover:bg-gray-100 transition-colors">
                                                Status updated on <span className="text-[10px] ml-1">▼</span>
                                            </th>
                                            <th className="px-6 py-3">Status updated by</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-gray-50/20">
                                        <tr>
                                            <td colSpan="6" className="py-24 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <span className="text-base font-bold text-gray-300 mb-2">No Flowcharts Found</span>
                                                </div>
                                            </td>
                                        </tr>
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
