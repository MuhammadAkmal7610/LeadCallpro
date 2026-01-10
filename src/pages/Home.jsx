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

                        {/* Search / Top Space (Removed 'Hi' header) */}
                        <div className="h-4"></div>

                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                            {/* Main Content Area (3 Cols) */}
                            <div className="xl:col-span-3 space-y-12">

                                {/* Get Started Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Get started</h2> {/* This gets changed as per the requirements */}
                                        <button className="text-teal-600 font-semibold text-sm hover:underline flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors hover:bg-teal-100">
                                            <PlayCircleIcon className="w-5 h-5" /> Setup Guide
                                        </button>
                                    </div>
                                    {/* Grid adapted for 6 items now */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {getStartedActions.map((action, idx) => (
                                            <ActionCard key={idx} {...action} />
                                        ))}
                                    </div>
                                </section>

                                {/* Integrations Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
                                        <button className="text-teal-600 font-medium text-sm hover:underline">Explore All &gt;</button>
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
                            <div className="space-y-8 mt-4">
                                {/* Download App Widget */}
                                <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200 p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                                    {/* Hover Decor - Dark Green Gradient */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-900 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">Get the App</h3>
                                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                                                <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                            Manage your leads and track progress from anywhere.
                                        </p>

                                        {/* Google Play Button */}
                                        <button className="w-full bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-3 group/btn">
                                            <div className="w-6 h-6 flex items-center justify-center">
                                                <svg className="w-full h-full text-green-400" viewBox="0 0 512 512" fill="currentColor">
                                                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                                </svg>
                                            </div>
                                            <span>Google Play</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Support Widget */}
                                <div className="relative bg-teal-50 rounded-2xl p-6 overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 group">
                                    {/* Hover Decor - Black Gradient */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-900 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20"></div>
                                    {/* Illustration placeholder */}
                                    <div className="absolute right-2 top-2 opacity-10 pointer-events-none -scale-x-100">
                                        <PhoneIcon className="w-32 h-28 text-teal-600" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md shadow-teal-100 mb-4">
                                            <PhoneIcon className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Need help?</h4>
                                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                            Urgent seeking assistance? Request support to resolve issues quickly.
                                        </p>
                                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full shadow-lg shadow-teal-600/20">
                                            View Help Videos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Important Links Section */}
                        <section className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Important Links</h2>
                            <div className="flex flex-wrap gap-4">
                                {importantLinks.map((link, idx) => (
                                    <button key={idx} className="flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-600 hover:shadow-sm transition-all">
                                        <link.icon className="w-5 h-5" />
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
