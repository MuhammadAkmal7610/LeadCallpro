import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    MagnifyingGlassIcon,
    DevicePhoneMobileIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    EnvelopeIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const Search = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Auto');
    const [searchValue, setSearchValue] = useState('');

    const filters = [
        { name: 'Auto', icon: null }, // Special styling for Auto
        { name: 'Mobile', icon: DevicePhoneMobileIcon, label: 'Phone' },
        { name: 'Text', icon: ChatBubbleLeftRightIcon, label: 'Text' },
        { name: 'Call', icon: PhoneIcon, label: 'Phone' },
        { name: 'Email', icon: EnvelopeIcon, label: 'Email' },
    ];

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col h-full min-w-0">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto space-y-6">

                        {/* Page Title */}
                        <h1 className="text-2xl font-bold text-gray-700">Search leads</h1>

                        {/* Search Container */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">

                            {/* Input Field */}
                            <div className="relative border-b border-gray-200">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Search for a lead's name, phone or other details"
                                    className="w-full py-3 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                                />
                                <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {/* Filters Toolbar */}
                            <div className="flex items-center gap-2 pt-3 px-2 pb-1 overflow-x-auto no-scrollbar">
                                <div className="text-gray-400 pr-2">
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                </div>

                                {filters.map((filter) => {
                                    const isAuto = filter.name === 'Auto';
                                    const isActive = activeFilter === filter.name;
                                    const Icon = filter.icon;

                                    if (isAuto) {
                                        return (
                                            <button
                                                key={filter.name}
                                                onClick={() => setActiveFilter(filter.name)}
                                                className={`
                                                    flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold transition-all
                                                    ${isActive
                                                        ? 'bg-[#08A698] text-white shadow-sm' // Matches the purple in the image (Indigo-500) or we can use Teal: bg-[#08A698]  <-- UPDATED to Teal
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                                                `}
                                            >
                                                {filter.name}
                                            </button>
                                        );
                                    }

                                    return (
                                        <button
                                            key={filter.name}
                                            onClick={() => setActiveFilter(filter.name)}
                                            className={`
                                                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap
                                                ${isActive
                                                    ? 'border-[#08A698] text-[#08A698] bg-teal-50'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                                            `}
                                        >
                                            {Icon && <Icon className="w-3.5 h-3.5" />}
                                            {filter.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Empty State / Results Area */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Enter search value to see results here</p>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Search;
