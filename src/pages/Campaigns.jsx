import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowPathIcon,
    TrashIcon,
    ChartBarIcon,
    EllipsisHorizontalIcon,
    CalendarIcon,
    UserIcon,
    PlusIcon
} from '@heroicons/react/24/outline';

export default function Campaigns() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock Data based on screenshot
    const campaigns = [
        {
            id: 1,
            name: '@website-leads-',
            priority: 'Medium',
            assignees: ['EA', 'MA', 'MM', 'GA'],
            totalLeads: '13.29K',
            progress: 62,
            createdOn: '5M ago',
            status: 'Active'
        },
        {
            id: 2,
            name: '@facebook-ad-',
            priority: 'High',
            assignees: ['EA', 'MM', 'GA', '+24'],
            totalLeads: '64.84K',
            progress: 66,
            createdOn: '5M ago',
            status: 'Active'
        },
        {
            id: 3,
            name: '@2-months-old-leads-',
            priority: 'Low',
            assignees: ['MM', 'GA', 'LA', 'EM', '+11'],
            totalLeads: '5.13K',
            progress: 95,
            createdOn: '5M ago',
            status: 'Completed'
        },
        {
            id: 4,
            name: '@march-webinar-signup',
            priority: 'High',
            assignees: ['EA', 'GA'],
            totalLeads: '2.1K',
            progress: 15,
            createdOn: '6M ago',
            status: 'Active'
        },
        {
            id: 5,
            name: '@cold-outreach-q1',
            priority: 'Medium',
            assignees: ['MA', 'MM'],
            totalLeads: '8.5K',
            progress: 45,
            createdOn: '1Y ago',
            status: 'Paused'
        },
    ];

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 md:p-8">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
                                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#08A698] transition-colors" title="Refresh Data">
                                    <ArrowPathIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Your calling list sorted. <a href="#" className="text-[#08A698] hover:underline font-medium">Learn More</a>
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#08A698] hover:bg-[#078F82] text-white rounded-lg shadow-sm transition-colors text-sm font-semibold">
                            <PlusIcon className="w-4 h-4" /> Create New
                        </button>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 font-sans">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1 relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search campaign"
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#08A698] focus:bg-white transition-all"
                                />
                            </div>
                            <FilterDropdown placeholder="Priority" />
                            <FilterDropdown placeholder="Date" icon={CalendarIcon} />
                            <FilterDropdown placeholder="Select Assignee" icon={UserIcon} />
                            <FilterDropdown placeholder="Select Created by" />
                        </div>
                    </div>

                    {/* Campaigns Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignee</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Leads</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created on</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-700">{campaign.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <FlagIcon priority={campaign.priority} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex -space-x-2">
                                                    {campaign.assignees.map((initial, idx) => (
                                                        <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-600 bg-gray-100 shadow-sm ${initial.startsWith('+') ? 'bg-gray-200 text-gray-800' : 'bg-indigo-100 text-indigo-600'}`}>
                                                            {initial}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-700">{campaign.totalLeads}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <ProgressCircle percent={campaign.progress} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500">{campaign.createdOn}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <ActionButton icon={ChartBarIcon} title="Analytics" />
                                                    <ActionButton icon={ArrowPathIcon} title="Refresh" />
                                                    <ActionButton icon={TrashIcon} title="Delete" danger />
                                                </div>
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

/* --- Components --- */

const FilterDropdown = ({ placeholder, icon: Icon }) => (
    <div className="relative min-w-[160px]">
        <select className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 focus:outline-none focus:border-[#08A698] appearance-none cursor-pointer transition-all">
            <option value="">{placeholder}</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <CodeChevronDownIcon className="w-3 h-3" />
        </div>
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 hidden">
            <Icon className="w-4 h-4" />
        </div>}
    </div>
);

const FlagIcon = ({ priority }) => {
    let color = 'text-gray-400';
    if (priority === 'High') color = 'text-red-400';
    if (priority === 'Medium') color = 'text-yellow-400';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${color}`}>
            <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.158l-.106-.053a8.25 8.25 0 00-6.89-1.517l-1.077.291v6.79a.75.75 0 01-1.5 0v-18a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>

    )
}

const ProgressCircle = ({ percent }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    // Color logic
    let color = '#08A698'; // Teal default
    if (percent < 30) color = '#f59e0b'; // Amber
    if (percent < 15) color = '#ef4444'; // Red

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r={radius} stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                <circle
                    cx="24" cy="24" r={radius}
                    stroke={color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-gray-700">{percent}%</span>
        </div>
    );
};

const ActionButton = ({ icon: Icon, title, danger }) => (
    <button className={`p-1.5 rounded-md hover:bg-gray-100 border border-gray-100 transition-colors ${danger ? 'text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100' : 'text-gray-400 hover:text-[#08A698] hover:bg-teal-50 hover:border-teal-100'}`} title={title}>
        <Icon className="w-4 h-4" />
    </button>
);

const CodeChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
)
