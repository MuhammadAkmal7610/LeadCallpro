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
    { id: 6, name: '99acres', description: 'Capture 99acres Leads in your Telecrm account', logo: 'https://logo.clearbit.com/99acres.com' },
    { id: 7, name: 'CallerDesk', description: 'Integrate CallerDesk in your Telecrm account', logo: 'https://logo.clearbit.com/callerdesk.io' },
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
                    <div className="mx-auto max-w-7xl space-y-8">

                        {/* Page Header & Search */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Integrations</h1>
                                <p className="text-sm text-gray-500 mt-1">Manage your connections and extend CRM capabilities.</p>
                            </div>

                            <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center max-w-2xl">
                                <div className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-100 select-none">
                                    Search
                                </div>
                                <div className="flex-1 flex items-center px-3">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Find an integration..."
                                        className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Active Integrations */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Active Integrations</h2>
                                <span className="bg-teal-50 text-[#08A698] text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-100">
                                    {activeIntegrations.length}
                                </span>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <div className="md:col-span-4">Integration</div>
                                    <div className="md:col-span-4 text-center md:text-left">Status</div>
                                    <div className="md:col-span-4 text-right">Actions</div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {activeIntegrations.map((item) => (
                                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50/50 transition-colors group">
                                            <div className="md:col-span-4 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg border border-gray-100 bg-white p-1.5 shadow-sm flex-shrink-0">
                                                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/32' }} />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-800 group-hover:text-[#08A698] transition-colors">{item.name}</span>
                                            </div>
                                            <div className="md:col-span-4 flex justify-center md:justify-start">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="md:col-span-4 flex justify-end">
                                                <button className="text-gray-600 hover:text-[#08A698] bg-white hover:bg-teal-50 border border-gray-200 hover:border-teal-200 px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow">
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
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Available Integrations</h2>
                                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                                    {availableIntegrations.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {availableIntegrations.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 group flex flex-col items-start gap-4 h-full relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

                                        <div className="w-12 h-12 rounded-xl border border-gray-100 bg-white p-2 shadow-sm relative z-10">
                                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/40' }} />
                                        </div>

                                        <div className="relative z-10 flex-1">
                                            <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-[#08A698] transition-colors">{item.name}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                        </div>

                                        <button className="w-full mt-2 text-[#08A698] hover:text-white border border-[#08A698] hover:bg-[#08A698] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all relative z-10 shadow-sm hover:shadow-teal-100">
                                            Activate Now
                                        </button>
                                    </div>
                                ))}

                                {/* Coming Soon Card */}
                                <div className="bg-gray-50 rounded-xl border border-gray-200 border-dashed p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[240px]">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <span className="text-2xl">+</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-600">More coming soon</h3>
                                    <p className="text-xs text-gray-400 max-w-[150px]">We are constantly adding new integrations.</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
}
