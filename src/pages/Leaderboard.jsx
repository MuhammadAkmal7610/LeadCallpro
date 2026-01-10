import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    ArrowPathIcon,
    ArrowDownTrayIcon,
    ChartBarIcon,
    ChevronRightIcon,
    ClockIcon,
    PhoneIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    XCircleIcon,
    FunnelIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

const agents = [
    { id: 1, name: 'Mehwish Abbas', role: 'Caller', calls: 72, duration: '52m', sales: 0, firstCall: '10:01 am', lastCall: '12:47 pm', initials: 'MA', color: 'bg-teal-50 text-teal-700' },
    { id: 2, name: 'Aiman Fatima', role: 'Caller', calls: 67, duration: '9m', sales: 0, firstCall: '09:20 am', lastCall: '12:22 pm', initials: 'AF', color: 'bg-teal-100 text-teal-800' },
    { id: 3, name: 'Esha Aftab', role: 'Caller', calls: 51, duration: '10m', sales: 0, firstCall: '09:02 am', lastCall: '12:49 pm', initials: 'EA', color: 'bg-emerald-50 text-emerald-700' },
    { id: 4, name: 'Irha Muqadas', role: 'Caller', calls: 49, duration: '25m', sales: 0, firstCall: '09:17 am', lastCall: '12:37 pm', initials: 'IM', color: 'bg-green-50 text-green-700' },
    { id: 5, name: 'Wania Ahad', role: 'Caller', calls: 45, duration: '12m', sales: 0, firstCall: '10:09 am', lastCall: '1:57 pm', initials: 'WA', color: 'bg-gray-100 text-gray-700' },
];

export default function Leaderboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Day');

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row gap-6 h-full">

                        {/* Left Column: Agents List */}
                        <div className="lg:w-1/3 flex flex-col gap-6">
                            {/* Header & Tabs */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">Leaderboard <ArrowPathIcon className="w-5 h-5 text-gray-400 group-hover:animate-spin cursor-pointer" /></h1>
                                <div className="flex gap-2">
                                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><ChartBarIcon className="w-5 h-5" /></button>
                                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><ArrowDownTrayIcon className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex mb-2">
                                {['Day', 'Week', 'Month', 'Year'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === tab ? 'bg-gray-100 text-[#08A698]' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            {/* Search & Total Stats */}
                            <div className="bg-gradient-to-br from-[#08A698]/10 via-teal-50 to-white rounded-xl p-6 border border-teal-100/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <ChartBarIcon className="w-24 h-24 text-[#08A698] -mr-8 -mt-8" />
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="p-1.5 bg-white rounded-lg shadow-sm text-[#08A698]"><ChartBarIcon className="w-5 h-5" /></span>
                                        <span className="text-sm font-bold text-gray-700">Total Stats</span>
                                    </div>
                                    <span className="text-[10px] font-medium bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Team size: 30</span>
                                </div>
                                <div className="grid grid-cols-3 divide-x divide-gray-200">
                                    <div className="text-center px-2">
                                        <div className="text-2xl font-bold text-gray-900">561</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">Calls</div>
                                    </div>
                                    <div className="text-center px-2">
                                        <div className="text-2xl font-bold text-gray-900">4:06h</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">Duration</div>
                                    </div>
                                    <div className="text-center px-2">
                                        <div className="text-2xl font-bold text-gray-900">5K</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">Sales</div>
                                    </div>
                                </div>
                            </div>

                            {/* Agents List */}
                            <div className="space-y-3">
                                {agents.map((agent, index) => (
                                    <div key={agent.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-100/50 transition-all cursor-pointer group relative overflow-hidden">

                                        {/* Rank Badge */}
                                        <div className={`absolute top-0 left-0 w-1 h-full ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-amber-600' : 'bg-transparent'}`}></div>

                                        <div className="flex items-center justify-between mb-3 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    {index < 3 && (
                                                        <span className={`absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm z-10 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}`}>
                                                            {index + 1}
                                                        </span>
                                                    )}
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${agent.color} shadow-sm ring-2 ring-white`}>{agent.initials}</div>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#08A698] transition-colors">{agent.name}</h3>
                                                    <p className="text-xs text-gray-400 font-medium">{agent.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-gray-400 text-right">
                                                <p>First Call: <span className="font-medium text-gray-600">{agent.firstCall}</span></p>
                                                <p>Last Call: <span className="font-medium text-gray-600">{agent.lastCall}</span></p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 divide-x divide-gray-50 border-t border-gray-50 pt-3">
                                            <div className="text-center">
                                                <span className="block text-lg font-bold text-gray-800">{agent.calls}</span>
                                                <span className="block text-[9px] text-gray-400">Calls</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="block text-lg font-bold text-gray-800">{agent.duration}</span>
                                                <span className="block text-[9px] text-gray-400">Duration</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="block text-lg font-bold text-gray-800">{agent.sales}</span>
                                                <span className="block text-[9px] text-gray-400">Sales</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Details & Stats */}
                        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-bold text-gray-900">Total Stats</h2>
                                <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                                    <span className="text-base text-gray-400 font-normal">PKR</span> 5K <ChevronRightIcon className="w-5 h-5 text-gray-300" />
                                </div>
                            </div>

                            {/* Detailed Breakdown Sections */}
                            <div className="space-y-8">

                                {/* Calls Section */}
                                <StatSection title="Calls" items={[
                                    { label: 'First Call', value: 'NA', icon: PhoneIcon },
                                    { label: 'Last Call', value: 'NA', icon: PhoneIcon },
                                    { label: 'All Calls', value: '561 ( 350)', icon: PhoneIcon, highlight: true },
                                    { label: 'Incoming Calls', value: '8', icon: ArrowDownTrayIcon },
                                    { label: 'Outgoing Calls', value: '545', icon: ArrowPathIcon },
                                    { label: 'Missed Calls', value: '8', icon: XCircleIcon, color: 'text-red-500' },
                                    { label: 'Connected Calls (> 2 sec)', value: '153', icon: CheckCircleIcon, color: 'text-green-500' },
                                    { label: 'Attempted Calls', value: '0', icon: PhoneIcon },
                                    { label: 'Total Duration', value: '4:06h', icon: ClockIcon },
                                ]} />

                                {/* Tasks Section */}
                                <StatSection title="Tasks" items={[
                                    { label: 'Late', value: '9', icon: ClockIcon, color: 'text-red-500' },
                                    { label: 'Pending', value: '6', icon: CalendarIcon },
                                    { label: 'Done', value: '1', icon: CheckCircleIcon, color: 'text-green-500' },
                                    { label: 'Created', value: '13', icon: PlusIcon },
                                ]} />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

// Helper Components
const StatSection = ({ title, items }) => (
    <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-[#08A698] pl-3">{title}</h3>
        <div className="space-y-1">
            {items.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group ${item.highlight ? 'bg-gray-50 font-medium' : ''}`}>
                    <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${item.color || 'text-gray-400'} group-hover:text-[#08A698] transition-colors`} />
                        <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">{item.value}</span>
                        <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#08A698]" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Fake PlusIcon since it wasn't imported above and isn't strictly needed for the snippet to work if I added it
const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
