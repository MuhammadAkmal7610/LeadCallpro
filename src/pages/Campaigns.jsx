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
    PlusIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

const FlagIcon = ({ priority }) => {
    let color = 'text-gray-300';
    if (priority === 'High') color = 'text-rose-400';
    if (priority === 'Medium') color = 'text-amber-400';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${color}`}>
            <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.158l-.106-.053a8.25 8.25 0 00-6.89-1.517l-1.077.291v6.79a.75.75 0 01-1.5 0v-18a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
    );
};

const ProgressCircle = ({ percent }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    // Color logic - Consistently Teal unless critical
    let color = '#08A698';
    if (percent < 15) color = '#ef4444'; // Red for very low

    return (
        <div className="relative flex items-center justify-center w-10 h-10">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="20" cy="20" r={radius} stroke="#e2e8f0" strokeWidth="3" fill="transparent" />
                <circle
                    cx="20" cy="20" r={radius}
                    stroke={color}
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <span className="absolute text-[9px] font-bold text-gray-700">{percent}%</span>
        </div>
    );
};

const ActionButton = ({ icon: Icon, title, danger }) => (
    <button className={`p-1.5 rounded-md transition-colors ${danger ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' : 'text-gray-400 hover:text-[#08A698] hover:bg-teal-50'}`} title={title}>
        <Icon className="w-4 h-4" />
    </button>
);

const FilterDropdown = ({ placeholder, icon: Icon }) => (
    <div className="relative min-w-[140px]">
        <select className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-gray-300 focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] appearance-none cursor-pointer transition-all shadow-sm">
            <option value="">{placeholder}</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDownIcon className="w-3 h-3" />
        </div>
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 hidden">
            <Icon className="w-4 h-4" />
        </div>}
    </div>
);


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
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col h-full min-w-0">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
                    <div className="mx-auto max-w-7xl space-y-6">

                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Campaigns</h1>
                                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#08A698] transition-colors" title="Refresh Data">
                                        <ArrowPathIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Manage your calling lists and outreach programs.
                                </p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#08A698] hover:bg-[#078F82] text-white rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-semibold">
                                <PlusIcon className="w-4 h-4" /> Create Campaign
                            </button>
                        </div>

                        {/* Filter Bar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search campaigns..."
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#08A698] focus:bg-white transition-all placeholder-gray-400"
                                    />
                                </div>
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                                    <FilterDropdown placeholder="Priority" />
                                    <FilterDropdown placeholder="Date Range" icon={CalendarIcon} />
                                    <FilterDropdown placeholder="Assignee" icon={UserIcon} />
                                    <FilterDropdown placeholder="Status" />
                                </div>
                            </div>
                        </div>

                        {/* Campaigns Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Priority</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Assignee</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total Leads</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Progress</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Created</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {campaigns.map((campaign) => (
                                            <tr key={campaign.id} className="hover:bg-teal-50/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-[#08A698] transition-colors">{campaign.name}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center">
                                                        <FlagIcon priority={campaign.priority} />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex -space-x-2">
                                                        {campaign.assignees.map((initial, idx) => (
                                                            <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold shadow-sm ${initial.startsWith('+') ? 'bg-gray-100 text-gray-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                                                {initial}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-gray-700">{campaign.totalLeads}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <ProgressCircle percent={campaign.progress} />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{campaign.createdOn}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
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

                    </div>
                </main>
            </div>
        </div>
    );
}
