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
const StatusPill = ({ count, colorClasses, label }) => {
    if (count === 0 && !label) return <span className="text-gray-300 font-normal">-</span>;
    return (
        <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border border-transparent ${colorClasses}`}>
            {label ? label : count}
        </span>
    );
};

// Premium Card Component
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
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:border-teal-100 ${className}`}>
        {/* Card Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-50 to-white rounded-lg border border-teal-50 text-[#08A698] shadow-sm">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-800 leading-none">{title}</h3>
                        {manageLink && (
                            <span className="text-[10px] font-semibold text-[#08A698] cursor-pointer hover:underline border-l border-gray-300 pl-2 leading-none hover:text-teal-700 transition-colors">Manage</span>
                        )}
                        {onAdd && (
                            <span className="text-[10px] font-semibold text-[#08A698] cursor-pointer hover:underline border-l border-gray-300 pl-2 leading-none hover:text-teal-700 transition-colors" onClick={onAdd}>+ Add</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {headerRight || (
                    <>
                        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors">
                            <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                            {headerDate}
                            <ChevronDownIcon className="w-3 h-3 text-gray-400 ml-0.5" />
                        </button>
                        <button className="text-gray-300 hover:text-gray-500 transition-colors p-1 hover:bg-gray-50 rounded">
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 flex flex-col min-h-0 p-5 space-y-4 overflow-hidden relative">
            {children}
        </div>
    </div>
);

const SearchBar = ({ placeholder = "Search..." }) => (
    <div className="relative group">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#08A698] transition-colors" />
        <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-[#08A698] focus:border-[#08A698] outline-none transition-all placeholder:text-gray-400 hover:bg-white focus:bg-white"
        />
    </div>
);

const TableHeader = ({ columns }) => (
    <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <tr>
            {columns.map((col, idx) => (
                <th
                    key={idx}
                    className={`pb-3 pt-1 text-[11px] font-bold uppercase tracking-wider ${col.align === 'center' ? 'text-center' : 'text-left'} text-gray-400 ${col.width || ''}`}
                >
                    <div className={`flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : ''} cursor-pointer hover:text-gray-600 transition-colors`}>
                        {col.label} {col.sortable !== false && <ChevronDownIcon className="w-2.5 h-2.5 opacity-40" />}
                    </div>
                </th>
            ))}
            <th className="pb-3 pt-1 w-6"></th>
        </tr>
    </thead>
);


// --- PAGE COMPONENT ---

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Default');

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col h-full min-w-0">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8 bg-gray-50/50">
                    <div className="max-w-[1600px] mx-auto space-y-8">

                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                                <button className="text-[#08A698] hover:text-[#068f82] transition-colors bg-teal-50 hover:bg-teal-100 p-1.5 rounded-lg border border-teal-100/50">
                                    <ArrowPathIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#08A698] hover:bg-teal-50 hover:border-teal-200 transition-all shadow-sm">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>Today</span>
                                    <ChevronDownIcon className="w-3 h-3 text-gray-400 ml-1" />
                                </button>
                                <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-[#08A698] hover:border-teal-200 hover:bg-teal-50 transition-all shadow-sm">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs - Simple Line Style */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex gap-8" aria-label="Tabs">
                                {['Default', 'My Dashboard'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`
                                            whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm flex items-center gap-2 transition-all
                                            ${activeTab === tab
                                                ? 'border-[#08A698] text-[#08A698]'
                                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}
                                        `}
                                    >
                                        {tab}
                                        {tab === 'Default' && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${activeTab === tab ? 'bg-teal-50 text-[#08A698] border border-teal-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>MAIN</span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>


                        {/* --- DASHBOARD GRID --- */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">

                            {/* Card 1: Follow Ups */}
                            <DashboardCard icon={ClockIcon} title="Follow Ups" className="h-[440px]">
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
                                                <tr key={i} className="group hover:bg-teal-50/30 transition-colors">
                                                    <td className="py-3 pl-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[10px] font-bold shadow-sm">{r.i}</div>
                                                            <span className="text-gray-700 font-semibold group-hover:text-[#08A698] transition-colors">{r.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-center"><StatusPill count={r.u} colorClasses="bg-amber-50 text-amber-600 border-amber-100" /></td>
                                                    <td className="py-3 text-center"><StatusPill count={r.l} colorClasses="bg-rose-50 text-rose-600 border-rose-100" /></td>
                                                    <td className="py-3 text-center"><StatusPill count={r.d} colorClasses="bg-teal-50 text-teal-600 border-teal-100" /></td>
                                                    <td className="py-3 text-center"><StatusPill count={r.c} colorClasses="bg-gray-100 text-gray-500 border-gray-200" /></td>
                                                    <td className="py-3 text-center"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#08A698] transition-colors" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 2: Lead by stages */}
                            <DashboardCard icon={BarsArrowDownIcon} title="Lead by stages" manageLink={true} className="h-[440px]">
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
                                                <tr key={i} className="group hover:bg-teal-50/30 transition-colors">
                                                    <td className="py-3 pl-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[10px] font-bold shadow-sm">{r.i}</div>
                                                            <span className="text-gray-700 font-semibold group-hover:text-[#08A698] transition-colors">{r.n}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-center"><StatusPill count={r.f} colorClasses="bg-gray-100 text-gray-600 border-gray-200" /></td>
                                                    <td className="py-3 text-center"><StatusPill count={r.a} colorClasses="bg-blue-50 text-blue-600 border-blue-100 font-bold" /></td>
                                                    <td className="py-3 text-center"><StatusPill count={r.w} colorClasses="bg-teal-50 text-teal-600 border-teal-100" /></td>
                                                    <td className="py-3 text-center"><StatusPill count={r.l} colorClasses="bg-rose-50 text-rose-600 border-rose-100" /></td>
                                                    <td className="py-3 text-center"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#08A698] transition-colors" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 3: Filters */}
                            <DashboardCard icon={TableCellsIcon} title="Filter(s)" manageLink={true} className="h-[400px]">
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
                                                <tr key={i} className="group hover:bg-teal-50/30 transition-colors">
                                                    <td className="py-3.5 pl-1">
                                                        <div className="flex items-center gap-2.5">
                                                            <FunnelIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#08A698] transition-colors" />
                                                            <span className="text-gray-700 font-medium truncate max-w-[140px]" title={r.n}>{r.n}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 text-center text-gray-400 font-medium">{r.f || '-'}</td>
                                                    <td className="py-3.5 text-center text-gray-700 font-semibold">{r.a}</td>
                                                    <td className="py-3.5 text-center font-bold text-[#08A698]">{r.w > 0 ? r.w : '-'}</td>
                                                    <td className="py-3.5 text-center font-bold text-rose-500">{r.l > 0 ? r.l : '-'}</td>
                                                    <td className="py-3.5 text-center"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#08A698] transition-colors" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 4: Activity */}
                            <DashboardCard icon={ChartBarIcon} title="Activity & Performance" className="h-[400px]">
                                <SearchBar placeholder="Search by name..." />
                                <div className="overflow-auto flex-1 custom-scrollbar -mx-4 px-4 pt-2">
                                    <table className="w-full text-left text-xs">
                                        <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
                                            <tr>
                                                <th className="pb-3 pt-1 pl-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Agent</th>
                                                <th className="pb-3 pt-1 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Calls</th>
                                                <th className="pb-3 pt-1 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Time</th>
                                                <th className="pb-3 pt-1 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-2">Conn.</th>
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
                                                <tr key={i} className="group hover:bg-teal-50/30 transition-colors">
                                                    <td className="py-3 pl-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[10px] font-bold shadow-sm">{r.i}</div>
                                                            <span className="text-gray-700 font-semibold group-hover:text-[#08A698] transition-colors">{r.n}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-right font-semibold text-gray-700">{r.m1}</td>
                                                    <td className="py-3 text-right font-medium text-gray-500">{r.m2}</td>
                                                    <td className="py-3 text-right font-bold text-[#08A698] pr-2">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#08A698] shadow-sm shadow-teal-200"></span>
                                                            {r.m3}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-right"><ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#08A698] ml-auto transition-colors" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>

                            {/* Card 5: Campaigns */}
                            <DashboardCard icon={MegaphoneIcon} title="Calling Campaigns" onAdd={() => { }} className="h-[400px] border-dashed border-2 hover:border-[#08A698]">
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center shadow-inner">
                                        <MegaphoneIcon className="w-10 h-10 text-indigo-500" />
                                    </div>

                                    <div className="space-y-2 max-w-xs mx-auto">
                                        <h3 className="text-base font-bold text-gray-900">Optimization in Progress</h3>
                                        <p className="text-gray-500 text-sm">We are enhancing the campaign experience. Check back soon.</p>
                                    </div>

                                    <button className="px-6 py-2.5 bg-[#4338CA] text-white rounded-lg text-sm font-bold hover:bg-[#3730A3] transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5">
                                        Go to Campaigns
                                    </button>
                                </div>
                            </DashboardCard>

                            {/* Card 6: All Leads Chart */}
                            <DashboardCard
                                icon={ChartBarIcon}
                                title="All Leads Overview"
                                className="h-[400px]"
                                headerRight={(
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors">
                                        <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
                                        By Creation Date
                                        <ChevronDownIcon className="w-3 h-3 text-gray-400" />
                                    </button>
                                )}
                            >
                                <div className="flex-1 w-full flex items-end justify-between gap-3 px-2 pb-2 relative">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between px-2 pb-8 pt-4 pointer-events-none opacity-20">
                                        {[1, 2, 3, 4].map((_, i) => <div key={i} className="w-full h-px bg-gray-300 border-dashed border-b"></div>)}
                                    </div>

                                    {[
                                        { l: 'Fresh', v: 361, h: '4%', c: 'bg-gray-300' },
                                        { l: 'First Contact', v: '30.5K', h: '85%', c: 'bg-teal-700' },
                                        { l: 'Dead', v: '2K', h: '15%', c: 'bg-rose-400' },
                                        { l: 'Mobile off', v: '4K', h: '25%', c: 'bg-gray-400' },
                                        { l: 'Auto Int.', v: '1060', h: '10%', c: 'bg-amber-400' },
                                        { l: 'Interested', v: '2130', h: '18%', c: 'bg-blue-400' },
                                        { l: 'Scheduled', v: '4080', h: '30%', c: 'bg-[#08A698]' }, // Teal
                                        { l: 'Payment Exp', v: 78, h: '5%', c: 'bg-purple-400' },
                                        { l: 'Demo Done', v: 4, h: '2%', c: 'bg-green-600' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-2 group w-full h-full justify-end relative z-10">

                                            <div
                                                className={`w-full max-w-[40px] min-w-[24px] rounded-t-md transition-all duration-500 group-hover:scale-y-105 origin-bottom relative shadow-sm ${item.c} group-hover:brightness-110`}
                                                style={{ height: item.h }}
                                            >
                                                {/* Tooltip value */}
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none z-20 shadow-lg">
                                                    {item.v}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900/90"></div>
                                                </div>
                                            </div>

                                            <div className="h-8 flex items-start justify-center w-full">
                                                <span className="text-[10px] text-gray-500 font-semibold text-center leading-tight w-full block group-hover:text-[#08A698] transition-colors line-clamp-2">{item.l}</span>
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
