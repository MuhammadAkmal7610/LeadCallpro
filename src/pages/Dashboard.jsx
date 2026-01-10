import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    ArrowPathIcon,
    CalendarIcon,
    Cog6ToothIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    FunnelIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ClockIcon,
    BarsArrowDownIcon,
    TableCellsIcon,
    ChartBarIcon,
    MegaphoneIcon
} from '@heroicons/react/24/outline';

// --- STYLES & HELPERS ---

const customScrollbarStyle = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e5e7eb;
    border-radius: 3px;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
  }
`;

const StatusPill = ({ count, colorClasses, label }) => {
    if (count === 0 && !label) return <span className="text-gray-300 font-normal">-</span>;
    // Flat: bg + text, no rings/borders
    return (
        <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${colorClasses}`}>
            {label ? label : count}
        </span>
    );
};

// Flat Card: standard white, simple border, no shadow
const DashboardCard = ({
    icon: Icon,
    title,
    manageLink,
    onAdd,
    headerDate = "Today",
    children,
    className = "",
    headerRight
}) => (
    <div className={`bg-white rounded-lg border border-gray-200 flex flex-col ${className}`}>
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="p-1.5 bg-gray-50 rounded-md text-gray-700">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-800 leading-none">{title}</h3>
                        {manageLink && (
                            <span className="text-[10px] font-semibold text-[#08A698] cursor-pointer hover:underline border-l border-gray-300 pl-2 leading-none">Manage</span>
                        )}
                        {onAdd && (
                            <span className="text-[10px] font-semibold text-[#08A698] cursor-pointer hover:underline border-l border-gray-300 pl-2 leading-none" onClick={onAdd}>+ Add</span>
                        )}
                    </div>
                    {/* Timestamp removed for cleaner flat look, or made very subtle */}
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-gray-400">Updated just now</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {headerRight || (
                    <>
                        <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors">
                            <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                            {headerDate}
                            <ChevronDownIcon className="w-3 h-3 text-gray-400 ml-0.5" />
                        </button>
                        <button className="text-gray-300 hover:text-gray-500">
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 flex flex-col min-h-0 p-4 space-y-3 overflow-hidden relative">
            {children}
        </div>
    </div>
);

const SearchBar = ({ placeholder = "Search..." }) => (
    <div className="relative group">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-md text-xs focus:ring-1 focus:ring-[#08A698] focus:border-[#08A698] outline-none transition-colors placeholder:text-gray-400"
        />
    </div>
);

const TableHeader = ({ columns }) => (
    <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <tr>
            {columns.map((col, idx) => (
                <th
                    key={idx}
                    className={`pb-2 pt-1 text-[11px] font-semibold ${col.align === 'center' ? 'text-center' : 'text-left'} text-gray-500 ${col.width || ''}`}
                >
                    <div className={`flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : ''} cursor-pointer hover:text-gray-700`}>
                        {col.label} {col.sortable !== false && <ChevronDownIcon className="w-2.5 h-2.5 opacity-40" />}
                    </div>
                </th>
            ))}
            <th className="pb-2 pt-1 w-6"></th>
        </tr>
    </thead>
);


// --- PAGE COMPONENT ---

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Default');

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased overflow-hidden">
            <style>{customScrollbarStyle}</style>
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col h-full min-w-0">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto space-y-6">

                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                <button className="text-[#08A698] hover:text-[#068f82] transition-colors bg-teal-50 p-1 rounded-md">
                                    <ArrowPathIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#08A698] hover:bg-gray-50 transition-colors">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>Today</span>
                                    <ChevronDownIcon className="w-3 h-3 text-gray-400 ml-1" />
                                </button>
                                <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-[#08A698] transition-colors">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs - Simple Line Style */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex gap-6" aria-label="Tabs">
                                {['Default', 'My Dashboard'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`
                                            whitespace-nowrap pb-3 px-1 border-b-2 font-semibold text-sm flex items-center gap-2 transition-colors
                                            ${activeTab === tab
                                                ? 'border-[#08A698] text-[#08A698]'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                        `}
                                    >
                                        {tab}
                                        {tab === 'Default' && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${activeTab === tab ? 'bg-teal-50 text-[#08A698]' : 'bg-gray-100 text-gray-400'}`}>Main</span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>


                        {/* --- DASHBOARD GRID --- */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">

                            {/* Card 1: Follow Ups */}
                            <DashboardCard icon={ClockIcon} title="Follow Ups" className="h-[420px]">
                                <SearchBar placeholder="Search by assignee..." />
                                <div className="overflow-auto flex-1 custom-scrollbar -mx-4 px-4 pt-2">
                                    <table className="w-full text-left text-xs">
                                        <TableHeader columns={[
                                            { label: 'Assignee', width: 'w-[32%]' },
                                            { label: 'Upcoming', align: 'center' },
                                            { label: 'Late', align: 'center' },
                                            { label: 'Done', align: 'center' },
                                            { label: 'Cancel', align: 'center' },
                                        ]} />
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { name: 'Nida', i: 'NI', u: 0, l: 0, d: 1, c: 0 },
                                                { name: 'Khansa', i: 'KH', u: 1, l: 5, d: 0, c: 2 },
                                                { name: 'Esha Aftab', i: 'EA', u: 0, l: 2, d: 0, c: 0 },
                                                { name: 'Quratulain', i: 'QU', u: 0, l: 0, d: 0, c: 1 },
                                                { name: 'Minahil', i: 'MI', u: 0, l: 2, d: 0, c: 5 },
                                                { name: 'Eman', i: 'EM', u: 0, l: 1, d: 0, c: 0 },
                                            ].map((r, i) => (
                                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-2.5 pl-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-7 h-7 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">{r.i}</div>
                                                            <span className="text-gray-700 font-medium">{r.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.u} colorClasses="bg-yellow-100 text-yellow-700" /></td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.l} colorClasses="bg-red-100 text-red-700" /></td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.d} colorClasses="bg-teal-100 text-teal-700" /></td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.c} colorClasses="bg-gray-100 text-gray-600" /></td>
                                                    <td className="py-2.5 text-center"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 2: Lead by stages */}
                            <DashboardCard icon={BarsArrowDownIcon} title="Lead by stages" manageLink={true} className="h-[420px]">
                                <SearchBar placeholder="Type assigned name..." />
                                <div className="overflow-auto flex-1 custom-scrollbar -mx-4 px-4 pt-2">
                                    <table className="w-full text-left text-xs">
                                        <TableHeader columns={[
                                            { label: 'Assignee', width: 'w-[32%]' },
                                            { label: 'Fresh', align: 'center' },
                                            { label: 'Active', align: 'center' },
                                            { label: 'Won', align: 'center' },
                                            { label: 'Lost', align: 'center' },
                                        ]} />
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { n: 'Aiman Fatima', i: 'AF', f: 5, a: 18, w: 0, l: 1 },
                                                { n: 'Amrat', i: 'AM', f: 8, a: 15, w: 0, l: 0 },
                                                { n: 'Aysha Younas', i: 'AY', f: 8, a: 16, w: 0, l: 0 },
                                                { n: 'Eman', i: 'EM', f: 5, a: 17, w: 0, l: 2 },
                                                { n: 'Esha Aftab', i: 'EA', f: 4, a: 20, w: 0, l: 2 },
                                            ].map((r, i) => (
                                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-2.5 pl-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-7 h-7 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">{r.i}</div>
                                                            <span className="text-gray-700 font-medium">{r.n}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.f} colorClasses="bg-gray-100 text-gray-600" /></td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.a} colorClasses="bg-gray-100 text-gray-900 font-bold" /></td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.w} colorClasses="bg-teal-100 text-teal-700" /></td>
                                                    <td className="py-2.5 text-center"><StatusPill count={r.l} colorClasses="bg-red-100 text-red-700" /></td>
                                                    <td className="py-2.5 text-center"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 3: Filters */}
                            <DashboardCard icon={TableCellsIcon} title="Filter(s)" manageLink={true} className="h-[380px]">
                                <SearchBar placeholder="Search filters..." />
                                <div className="overflow-auto flex-1 custom-scrollbar -mx-4 px-4 pt-2">
                                    <table className="w-full text-left text-xs">
                                        <TableHeader columns={[
                                            { label: 'Filter Name', width: 'w-[32%]' },
                                            { label: 'Fresh', align: 'center' },
                                            { label: 'Active', align: 'center' },
                                            { label: 'Won', align: 'center' },
                                            { label: 'Lost', align: 'center' },
                                        ]} />
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { n: 'All Incoming Whatapp', f: 0, a: 13, w: 0, l: 0 },
                                                { n: 'All Leads', f: 179, a: 329, w: 0, l: 19 },
                                                { n: 'Daily Report', f: 0, a: 318, w: 0, l: 16 },
                                                { n: 'Major Clients', f: 12, a: 45, w: 5, l: 2 },
                                            ].map((r, i) => (
                                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-3 pl-1">
                                                        <div className="flex items-center gap-2.5">
                                                            <FunnelIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                                                            <span className="text-gray-700 font-medium truncate max-w-[140px]" title={r.n}>{r.n}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-center text-gray-400 font-medium">{r.f || '-'}</td>
                                                    <td className="py-3 text-center text-gray-700 font-semibold">{r.a}</td>
                                                    <td className="py-3 text-center font-bold text-[#08A698]">{r.w > 0 ? r.w : '-'}</td>
                                                    <td className="py-3 text-center font-bold text-red-500">{r.l > 0 ? r.l : '-'}</td>
                                                    <td className="py-3 text-center"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 4: Activity */}
                            <DashboardCard icon={ChartBarIcon} title="Activity & Performance" className="h-[380px]">
                                <SearchBar placeholder="Search by name..." />
                                <div className="overflow-auto flex-1 custom-scrollbar -mx-4 px-4 pt-2">
                                    <table className="w-full text-left text-xs">
                                        <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
                                            <tr>
                                                <th className="pb-2 pt-1 pl-1 text-[11px] font-semibold text-gray-500">Agent</th>
                                                <th className="pb-2 pt-1 text-right text-[11px] font-semibold text-gray-500">Calls</th>
                                                <th className="pb-2 pt-1 text-right text-[11px] font-semibold text-gray-500">Time</th>
                                                <th className="pb-2 pt-1 text-right text-[11px] font-semibold text-gray-500 pr-2">Conn.</th>
                                                <th className="w-6"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { n: 'Aiman Fatima', i: 'AF', m1: 133, m2: '31m', m3: 0 },
                                                { n: 'Hifza', i: 'HI', m1: 132, m2: '33m', m3: 0 },
                                                { n: 'Nida', i: 'NI', m1: 129, m2: '1:32h', m3: 0 },
                                                { n: 'Aysha Younas', i: 'AY', m1: 127, m2: '1:31h', m3: 0 },
                                                { n: 'Mehwish', i: 'MA', m1: 126, m2: '1:43h', m3: 0 },
                                                { n: 'Samaha', i: 'SA', m1: 126, m2: '38m', m3: 0 },
                                            ].map((r, i) => (
                                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-2.5 pl-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-7 h-7 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">{r.i}</div>
                                                            <span className="text-gray-700 font-medium">{r.n}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 text-right font-semibold text-gray-700">{r.m1}</td>
                                                    <td className="py-2.5 text-right font-medium text-gray-500">{r.m2}</td>
                                                    <td className="py-2.5 text-right font-bold text-[#08A698] pr-2">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#08A698]"></span>
                                                            {r.m3}
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 text-right"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500 ml-auto" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 5: Campaigns */}
                            <DashboardCard icon={MegaphoneIcon} title="Calling Campaigns" onAdd={() => { }} className="h-[380px]">
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-full text-gray-400">
                                        <MegaphoneIcon className="w-8 h-8" />
                                    </div>

                                    <div className="space-y-1 max-w-xs mx-auto">
                                        <h3 className="text-sm font-bold text-gray-900">Optimization in Progress</h3>
                                        <p className="text-gray-400 text-xs">This view is currently unavailable. Please check back later.</p>
                                    </div>

                                    <button className="px-5 py-2 bg-[#4338CA] text-white rounded-md text-xs font-bold hover:bg-[#3730A3] transition-colors" style={{ backgroundColor: 'rgb(88 80 236)' }}>
                                        Go to Campaigns
                                    </button>
                                </div>
                            </DashboardCard>

                            {/* Card 6: All Leads Chart */}
                            <DashboardCard
                                icon={ChartBarIcon}
                                title="All Leads Overview"
                                className="h-[380px]"
                                headerRight={(
                                    <button className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-[11px] font-semibold text-gray-600 hover:bg-gray-100 border border-gray-200">
                                        <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
                                        By Creation Date
                                        <ChevronDownIcon className="w-3 h-3 text-gray-400" />
                                    </button>
                                )}
                            >
                                <div className="flex-1 w-full flex items-end justify-between gap-3 px-2 pb-2 relative">
                                    {/* Grid Lines - Subtle */}
                                    <div className="absolute inset-0 flex flex-col justify-between px-2 pb-8 pt-4 pointer-events-none opacity-20">
                                        {[1, 2, 3, 4].map((_, i) => <div key={i} className="w-full h-px bg-gray-200"></div>)}
                                    </div>

                                    {[
                                        { l: 'Fresh', v: 361, h: '4%', c: 'bg-gray-300' },
                                        { l: 'First Contact', v: '30.5K', h: '85%', c: 'bg-[#436460]' },
                                        { l: 'Dead', v: '2K', h: '15%', c: 'bg-[#8F8778]' },
                                        { l: 'Mobile off', v: '4K', h: '25%', c: 'bg-[#8F8778]' },
                                        { l: 'Auto Int.', v: '1060', h: '10%', c: 'bg-[#D4A017]' },
                                        { l: 'Interested', v: '2130', h: '18%', c: 'bg-[#8F8778]' },
                                        { l: 'Scheduled', v: '4080', h: '30%', c: 'bg-[#08A698]' }, // Teal
                                        { l: 'Payment Exp', v: 78, h: '5%', c: 'bg-[#8F8778]' },
                                        { l: 'Demo Done', v: 4, h: '2%', c: 'bg-red-800' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-2 group w-full h-full justify-end relative z-10">

                                            <div
                                                className={`w-full max-w-[40px] min-w-[24px] rounded-t-sm transition-opacity hover:opacity-80 relative ${item.c}`}
                                                style={{ height: item.h }}
                                            >
                                                {/* Simple hover value */}
                                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    {item.v}
                                                </div>
                                            </div>

                                            <div className="h-8 flex items-start justify-center w-full">
                                                <span className="text-[10px] text-gray-500 text-center leading-tight w-full block group-hover:text-gray-900 line-clamp-2">{item.l}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DashboardCard>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
