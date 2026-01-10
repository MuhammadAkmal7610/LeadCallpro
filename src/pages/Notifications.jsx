import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    ArrowPathIcon,
    Cog6ToothIcon,
    BellIcon,
    PhoneIcon,
    CalendarIcon,
    UserIcon,
    ChatBubbleLeftEllipsisIcon,
    ChartBarIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('New Leads');
    const [showUnread, setShowUnread] = useState(true);

    const tabs = [
        { id: 'All', label: 'All', icon: BellIcon },
        { id: 'Missed Calls', label: 'Missed Calls', icon: PhoneIcon },
        { id: 'Missed Reminders', label: 'Missed Reminders', icon: CalendarIcon },
        { id: 'New Leads', label: 'New Leads', icon: UserIcon },
        { id: 'Whatsapp', label: 'Whatsapp', icon: ChatBubbleLeftEllipsisIcon },
        { id: 'Reports', label: 'Reports', icon: ChartBarIcon },
        { id: 'Payment', label: 'Payment', icon: CurrencyDollarIcon },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
                    <div className="flex flex-col h-full">
                        {/* Page Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
                                <button className="text-[#08A698] hover:text-[#068f82] transition-colors p-1 rounded-full hover:bg-teal-50">
                                    <ArrowPathIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <Link to="/my-preferences" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                                <Cog6ToothIcon className="w-5 h-5" />
                                Configure
                            </Link>
                        </div>

                        {/* Tabs & Filter Bar */}
                        <div className="px-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            {/* Tabs */}
                            <nav className="flex space-x-6 overflow-x-auto no-scrollbar">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                                ? 'border-[#08A698] text-[#08A698]'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            {/* Show Unread Toggle */}
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 ml-4 py-3 shrink-0">
                                <button
                                    onClick={() => setShowUnread(!showUnread)}
                                    className={`w-10 h-5 rounded-full p-0.5 transition-colors relative ${showUnread ? 'bg-[#08A698]' : 'bg-gray-300'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${showUnread ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </button>
                                <span className="text-sm text-gray-600">Show unread</span>
                            </div>
                        </div>

                        {/* Content Area - Empty State */}
                        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/30">
                            <div className="relative mb-6">
                                {/* Bell Illustration Background Circle */}
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                    <BellIcon className="w-16 h-16 text-gray-300" />
                                </div>
                                {/* Notification Count Badge Mockup */}
                                <div className="absolute top-2 right-2 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md">
                                    <span className="font-bold text-gray-800 text-sm">0</span>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -left-4 bottom-4 text-[#08A698]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" opacity="0.4" />
                                    </svg>
                                </div>
                                <div className="absolute -right-2 top-8 text-blue-300">
                                    <div className="w-2 h-2 rounded-full bg-current"></div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications Yet</h3>
                            <p className="text-gray-500 text-center max-w-xs">
                                You have no notifications right now. Come back later.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Notifications;
