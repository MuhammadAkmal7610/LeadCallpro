import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    MagnifyingGlassIcon,
    Bars3Icon,
    PhoneIcon,
    EnvelopeIcon,
    UserIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function AllDuplicates() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Phone');

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-hidden flex flex-col lg:flex-row relative">

                    {/* LEFT COLUMN: Duplicate Groups */}
                    <div className="w-full lg:w-1/4 bg-white border-r border-gray-200 flex flex-col h-full">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-800 mb-4">All Duplicates</h2>
                            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                                <button
                                    onClick={() => setActiveTab('Phone')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'Phone' ? 'bg-white text-[#08A698] shadow-sm' : 'text-gray-500'}`}
                                >
                                    <PhoneIcon className="w-3 h-3" /> Phone
                                </button>
                                <button
                                    onClick={() => setActiveTab('Email')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'Email' ? 'bg-white text-[#08A698] shadow-sm' : 'text-gray-500'}`}
                                >
                                    <EnvelopeIcon className="w-3 h-3" /> Email
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 bg-teal-50 p-2 rounded border border-teal-100">
                                <span className="flex items-center gap-1.5"><input type="checkbox" className="rounded text-[#08A698] focus:ring-0" /> Select All</span>
                                <button className="bg-[#08A698] text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-[#078F82] transition-colors">Merge (0)</button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${i === 1 ? 'bg-teal-50/30 border-teal-100' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded text-[#08A698] focus:ring-0" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2 text-[#08A698]">103055769275</p>
                                            <p className="text-xs text-gray-400">3 Leads</p>
                                        </div>
                                        <ChevronRightIcon className="w-4 h-4 text-gray-300 ml-auto" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Leads in Group */}
                    <div className="w-full lg:w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
                        <div className="p-4 border-b border-gray-200 bg-white">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duplicate Leads</p>
                            <p className="text-xs text-gray-500">1 duplicate entries for '103055769275'</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">

                            {/* Selected Lead */}
                            <div className="bg-white border-l-4 border-l-[#08A698] border-y border-r border-[#08A698]/20 p-4 rounded-r-lg shadow-md relative bg-gradient-to-r from-teal-50/50 to-white">
                                <div className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold shadow-sm">FA</div>
                                <h3 className="text-sm font-bold text-[#08A698] mb-1">shehroz_hassan_5</h3>
                                <p className="text-xs text-gray-500 mb-2 font-mono bg-white inline-block px-1 rounded shadow-sm border border-gray-100">103055769275</p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#08A698] text-white shadow-sm">First Contact Attempted</span>
                            </div>

                            {/* Other Leads in Group */}
                            <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm opacity-60 hover:opacity-100 transition-opacity">
                                <div className="absolute top-3 right-3 w-5 h-5 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-[10px] font-bold">MA</div>
                                <h3 className="text-sm font-bold text-gray-700 mb-1">Duplicate Entry 2</h3>
                                <p className="text-[10px] text-gray-400 mb-2">103055769275</p>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded border border-gray-200">Fresh</span>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COLUMN: Master/Merge View */}
                    <div className="flex-1 bg-white p-8 overflow-y-auto">
                        {/* Reusing Lead Detail View Mock */}
                        <div className="max-w-3xl mx-auto">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">shehroz_hassan_5</h1>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold uppercase rounded-full">First Contact Attempted</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Fatima Arif</span>
                                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold">FA</div>
                                </div>
                            </div>

                            {/* Data Fields */}
                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Do You Want to earn Millions</label>
                                    <p className="font-medium text-gray-900 border-b border-gray-100 pb-1">hell__yes</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone</label>
                                    <p className="font-medium text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-2"><PhoneIcon className="w-3 h-3 text-[#08A698]" /> 00103055769275</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Facebook Campaign</label>
                                    <p className="font-medium text-gray-900 border-b border-gray-100 pb-1">Success Story 25000 course 1</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Lead ID FACEBOOK</label>
                                    <p className="font-medium text-gray-900 border-b border-gray-100 pb-1">1566295161420677</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
