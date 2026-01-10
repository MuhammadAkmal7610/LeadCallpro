import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock Data
const activeIntegrations = [
    { id: 1, name: 'Facebook', status: 'Active', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg' },
    { id: 2, name: 'Website/API', status: 'Active', logo: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png' }, // Generic Web icon
    { id: 3, name: 'Whatsapp', status: 'Active', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
    { id: 4, name: 'Whatsapp Chat Widget', status: 'Active', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
    { id: 5, name: 'Whatsapp Cloud API', status: 'Active', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
];

const availableIntegrations = [
    { id: 6, name: '99acres', description: 'Capture 99acres Leads in your Telecrm account', logo: 'https://play-lh.googleusercontent.com/BJDwXl2tO7RjDg-Z5XqB2nK6C1R8QP-D3L5fQ6R8nE7T9U0V1W4Y2Z3A-G5H9I0J7w' }, // Placeholder or use text
    { id: 7, name: 'CallerDesk', description: 'Integrate CallerDesk in your Telecrm account', logo: 'https://pbs.twimg.com/profile_images/1283688869919576064/g4w-4yq__400x400.jpg' },
    // Add more if needed, just demonstrating the layout
];

export default function Integrations() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 bg-gray-50/50">
                    <div className="mx-auto max-w-5xl space-y-8">

                        {/* Search Bar */}
                        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center">
                            <span className="px-4 py-2 font-medium text-gray-700 border-r border-gray-200">Integrations</span>
                            <div className="flex-1 flex items-center px-4">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search Integration by name"
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                                />
                            </div>
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-4 cursor-pointer" />
                        </div>

                        {/* Active Integrations */}
                        <section>
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Active Integration ({activeIntegrations.length})</h2>
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <div className="col-span-6">Note</div> {/* Header says "INTEGRATIONS" in screenshot, sticking to screenshot visual which has "INTEGRATIONS" */}
                                    <div className="col-span-6">Status</div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {activeIntegrations.map((item) => (
                                        <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                                            <div className="col-span-6 flex items-center gap-3">
                                                {/* Using external images for now or generic icons if failed, for speed */}
                                                <div className="w-8 h-8 flex-shrink-0">
                                                    {/* Use simple colored circles or SVGs if real logos aren't available locally */}
                                                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/32' }} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                            </div>
                                            <div className="col-span-6 flex items-center justify-between">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    {item.status}
                                                </span>
                                                <button className="text-gray-600 hover:text-[#08A698] border border-gray-300 hover:border-[#08A698] px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
                                                    Manage
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Available Integrations */}
                        <section>
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Available Integration ({availableIntegrations.length})</h2>
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    INTEGRATIONS
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {availableIntegrations.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex-shrink-0">
                                                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/40' }} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-xs text-gray-500">{item.description}</p>
                                                </div>
                                            </div>
                                            <button className="text-[#08A698] hover:text-teal-700 border border-[#08A698] hover:border-teal-700 px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
                                                Activate now
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
}
