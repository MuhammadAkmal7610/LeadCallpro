import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ActionCard from '../components/ActionCard';
import IntegrationCard from '../components/IntegrationCard';
import {
    UserPlusIcon, DocumentArrowUpIcon, SignalIcon,
    PresentationChartLineIcon, AdjustmentsHorizontalIcon,
    PhoneIcon, PlayCircleIcon, WrenchScrewdriverIcon,
    ShoppingCartIcon, ChatBubbleLeftRightIcon, BoltIcon,
    RectangleStackIcon, DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

// SVG Logos
const FacebookLogo = () => (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const GoogleSheetsLogo = () => (
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v3h14V6H5zm0 5v7h4v-7H5zm6 0v7h8v-7h-8z" />
    </svg>
);

const getStartedActions = [
    { title: 'Add Team', description: 'Collaborate with team at one location', icon: UserPlusIcon, buttonText: '+ Add Team' },
    { title: 'Excel upload', description: 'Import your data flexibly', icon: DocumentArrowUpIcon, buttonText: '+ Import data' },
    { title: 'Lead', description: 'Connect with potential customers', icon: SignalIcon, buttonText: '+ Add lead' },
    { title: 'Lead Stage', description: 'Visualize and manage sales pipeline', icon: RectangleStackIcon, buttonText: '+ Add Stage' },
    { title: 'Reports', description: 'Analyse your team performance', icon: PresentationChartLineIcon, buttonText: 'Check reports' },
    { title: 'Lead Fields', description: 'Create your custom lead fields', icon: AdjustmentsHorizontalIcon, buttonText: '+ Custom Field' },
];

const integrations = [
    { name: 'Facebook', description: 'Capture and instantly engage with Facebook leads.', color: 'blue', linkText: 'How to use', buttonText: 'Connect', icon: FacebookLogo },
    { name: 'Google sheet', description: 'Capture and instantly engage with Google Sheet leads.', color: 'green', linkText: 'How to use', buttonText: 'Connect', icon: GoogleSheetsLogo },
];

const importantLinks = [
    { name: 'Configure sim', icon: WrenchScrewdriverIcon },
    { name: 'Configure call recording', icon: PhoneIcon },
    { name: 'How to start calling', icon: PlayCircleIcon },
    { name: 'Buy new License', icon: ShoppingCartIcon },
    { name: 'Get WhatsApp Official API', icon: ChatBubbleLeftRightIcon },
    { name: 'Create Automation', icon: BoltIcon },
];

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 bg-gray-50/50">
                    <div className="mx-auto max-w-7xl">

                        {/* Top Spacer */}
                        <div className="h-6"></div>

                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                            {/* Main Content Area (3 Cols) */}
                            <div className="xl:col-span-3 space-y-12">

                                {/* Get Started Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Get Started</h2>
                                            <p className="text-sm text-gray-500 mt-1">Quick actions to setup your CRM.</p>
                                        </div>
                                        <button className="text-[#08A698] font-semibold text-sm hover:underline flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100 transition-colors hover:bg-teal-100">
                                            <PlayCircleIcon className="w-5 h-5" /> Setup Guide
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {getStartedActions.map((action, idx) => (
                                            <ActionCard key={idx} {...action} />
                                        ))}
                                    </div>
                                </section>

                                {/* Integrations Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Integrations</h2>
                                            <p className="text-sm text-gray-500 mt-1">Connect your favorite tools.</p>
                                        </div>
                                        <button className="text-[#08A698] font-medium text-sm hover:text-teal-700 hover:underline">Explore All &gt;</button>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <IntegrationCard
                                            name="Facebook"
                                            description="Capture and instantly engage with Facebook leads."
                                            color="blue"
                                            linkText="How to use"
                                            buttonText="Connect"
                                            icon={FacebookLogo}
                                        />
                                        <IntegrationCard
                                            name="Google sheet"
                                            description="Capture and instantly engage with Google Sheet leads."
                                            color="green"
                                            linkText="How to use"
                                            buttonText="Connect"
                                            icon={GoogleSheetsLogo}
                                        />
                                    </div>
                                </section>

                            </div>

                            {/* Right Sidebar (1 Col) */}
                            <div className="space-y-6 xl:mt-0">

                                {/* Download App Widget */}
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden group">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <DevicePhoneMobileIcon className="w-32 h-32 transform rotate-12 text-white" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/10">
                                            <DevicePhoneMobileIcon className="w-6 h-6 text-[#08A698]" />
                                        </div>

                                        <h3 className="text-lg font-bold mb-2">Get the Mobile App</h3>
                                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                            Access your leads and track progress on the go.
                                        </p>

                                        <button className="w-full bg-white text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
                                            <div className="w-5 h-5">
                                                <svg viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                                            </div>
                                            <span>Google Play</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Support Widget */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-teal-200 transition-colors">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-[#08A698]">
                                                <PhoneIcon className="w-5 h-5" />
                                            </div>
                                            <h4 className="font-bold text-gray-900">Need Help?</h4>
                                        </div>

                                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                            Stuck somewhere? Request support or watch our guide videos.
                                        </p>

                                        <button className="w-full border border-[#08A698] text-[#08A698] hover:bg-[#08A698] hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                            View Help Videos
                                        </button>
                                    </div>
                                </div>

                                {/* Important Links Section - Moved to Sidebar for better fit */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/60">
                                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h2>
                                    <div className="space-y-3">
                                        {importantLinks.map((link, idx) => (
                                            <button key={idx} className="w-full flex items-center gap-3 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-[#08A698] hover:border-teal-200 hover:shadow-sm transition-all group">
                                                <link.icon className="w-4 h-4 text-gray-400 group-hover:text-[#08A698]" />
                                                <span className="truncate">{link.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
