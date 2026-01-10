
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LeadDetailModal from '../components/LeadDetailModal';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    Bars3CenterLeftIcon,
    FunnelIcon,
    UserCircleIcon,
    PhoneIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

const initialColumns = {
    fresh: {
        id: 'fresh',
        title: 'Fresh',
        color: 'border-blue-500',
        badgeColor: 'bg-blue-50 text-blue-700',
        items: [
            { id: 1, name: 'Qaiser', phone: '03001234567', assignee: 'EA', time: '12m' },
            { id: 2, name: 'Sajid', phone: '03217654321', assignee: 'NI', time: '1h' },
            { id: 3, name: 'New Lead 3', phone: '03450000000', assignee: 'MA', time: '2h' },
        ]
    },
    attempted: {
        id: 'attempted',
        title: 'First Contact Attempted',
        color: 'border-yellow-500',
        badgeColor: 'bg-yellow-50 text-yellow-700',
        items: [
            { id: 4, name: 'Ali Raza', phone: '03011112222', assignee: 'FA', time: '4h' },
            { id: 5, name: 'Bilal Khan', phone: '03023334444', assignee: 'EM', time: '1d' },
        ]
    },
    connected: {
        id: 'connected',
        title: 'Connected',
        color: 'border-slate-400',
        badgeColor: 'bg-slate-50 text-slate-700',
        items: [
            { id: 6, name: 'Zeeshan', phone: '03335556666', assignee: 'AY', time: '2d' },
        ]
    },
    interested: {
        id: 'interested',
        title: 'Interested',
        color: 'border-teal-500',
        badgeColor: 'bg-teal-50 text-teal-700',
        items: [
            { id: 7, name: 'Faisal Arain', phone: '03009998888', assignee: 'NI', time: '3d' },
            { id: 8, name: 'Interested Lead', phone: '03211110000', assignee: 'SA', time: '4d' },
        ]
    },
    won: {
        id: 'won',
        title: 'Won / Sale',
        color: 'border-green-500',
        badgeColor: 'bg-green-50 text-green-700',
        items: [
            { id: 9, name: 'Happy Customer', phone: '03007777777', assignee: 'EA', time: '1w' },
        ]
    },
    lost: {
        id: 'lost',
        title: 'Lost',
        color: 'border-red-500',
        badgeColor: 'bg-red-50 text-red-700',
        items: [
            { id: 10, name: 'Dead Lead', phone: '03000000000', assignee: 'MA', time: '2w' },
        ]
    }
};

export default function Pipeline() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [columns, setColumns] = useState(initialColumns);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLeadClick = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <LeadDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                lead={selectedLead}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-x-auto overflow-y-hidden p-6 relative">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sticky left-6 right-0">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs font-bold text-gray-500 border border-gray-200">10 Leads</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#08A698] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] w-64 transition-all shadow-sm"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-[#08A698] hover:text-[#08A698] transition-colors shadow-sm">
                                <FunnelIcon className="w-4 h-4" /> Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#08A698] hover:bg-[#078F82] text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all">
                                <PlusIcon className="w-5 h-5" /> Add Lead
                            </button>
                        </div>
                    </div>

                    {/* Board */}
                    <div className="flex gap-4 h-[calc(100%-80px)] min-w-max pb-4">
                        {Object.values(columns).map((column) => (
                            <div key={column.id} className="w-72 flex-shrink-0 flex flex-col h-full bg-gray-100/50 rounded-xl border border-gray-200/60">
                                {/* Column Header */}
                                <div className={`p-3 border-t-4 rounded-t-xl bg-white border-b border-gray-100 flex items-center justify-between ${column.color}`}>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-gray-800">{column.title}</h3>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${column.badgeColor}`}>{column.items.length}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><PlusIcon className="w-4 h-4" /></button>
                                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><EllipsisHorizontalIcon className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                {/* Column Items */}
                                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                                    {column.items.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleLeadClick(item)}
                                            className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all group relative border-l-4 border-l-transparent hover:border-l-[#08A698]"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-sm text-gray-800 group-hover:text-[#08A698]">{item.name}</h4>
                                                <span className="w-6 h-6 rounded bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold flex items-center justify-center">
                                                    {item.assignee}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <PhoneIcon className="w-3 h-3" />
                                                    {item.phone}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium pt-1 border-t border-gray-50 mt-2">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    Modified {item.time} ago
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button className="w-72 flex-shrink-0 h-12 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-400 font-bold text-sm hover:bg-gray-50 hover:border-gray-400 hover:text-gray-500 transition-all">
                            <PlusIcon className="w-4 h-4" /> Add Stage
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
