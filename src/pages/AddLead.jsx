import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
    Bars3Icon,
    VariableIcon, // Placeholder for text field icon
    PhoneIcon
} from '@heroicons/react/24/outline';

export default function AddLead() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Reusable Input Component to keep code clean
    const InputField = ({ label, placeholder, icon: Icon, type = "text" }) => (
        <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-[#08A698]">
                    {Icon && <Icon className="h-4 w-4 text-gray-400 group-focus-within:text-[#08A698]" />}
                </div>
                <input
                    type={type}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] transition-all bg-white text-gray-700 shadow-sm hover:border-gray-300"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    const SelectField = ({ label, options }) => (
        <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bars3Icon className="h-4 w-4 text-gray-400 group-focus-within:text-[#08A698]" />
                </div>
                <select className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] transition-all bg-white appearance-none cursor-pointer shadow-sm hover:border-gray-300">
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xs">▼</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto bg-gray-50/50">
                    <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">

                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div className="relative flex-1 max-w-md">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#08A698]" />
                                <input
                                    type="text"
                                    placeholder="Search for lead fields"
                                    className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 focus:border-[#08A698] outline-none text-sm transition-colors text-gray-700 placeholder-gray-400 focus:bg-white/50 rounded-t-sm"
                                />
                            </div>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#08A698] text-[#08A698] rounded-lg text-sm font-medium hover:bg-teal-50 transition-all shadow-sm">
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                Previously uploaded leads
                            </button>
                        </div>

                        {/* Form Container */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-6">

                            {/* Personal Info */}
                            <InputField label="Name" placeholder="Enter full name" icon={VariableIcon} />

                            <div className="mb-4">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                    Phone <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 font-medium">Lead ID</span>
                                </label>
                                <div className="flex group relative">
                                    <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50/50 text-gray-600 text-sm group-focus-within:border-[#08A698] group-focus-within:bg-teal-50/10 transition-colors">
                                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400 group-focus-within:text-[#08A698]" />
                                        <div className="flex items-center gap-1 font-medium select-none">
                                            <span className="text-lg leading-none">🇵🇰</span>
                                            <span>+92</span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="300 1234567"
                                        className="flex-1 block w-full px-4 py-2.5 border border-gray-200 bg-white rounded-r-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] transition-all text-gray-700 shadow-sm"
                                    />
                                </div>
                            </div>

                            <InputField label="Do you want to earn Millions" placeholder="Enter response" icon={VariableIcon} />

                            {/* Alternate Phone Section - Similar structure */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                                    Alternate Phone
                                </label>
                                <div className="flex group relative">
                                    <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50/50 text-gray-600 text-sm group-focus-within:border-[#08A698] group-focus-within:bg-teal-50/10 transition-colors">
                                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400 group-focus-within:text-[#08A698]" />
                                        <div className="flex items-center gap-1 font-medium select-none">
                                            <span className="text-lg leading-none">🇵🇰</span>
                                            <span>+92</span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="300 7654321"
                                        className="flex-1 block w-full px-4 py-2.5 border border-gray-200 bg-white rounded-r-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] transition-all text-gray-700 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                <InputField label="Facebook Ad" placeholder="Ad Name" icon={VariableIcon} />
                                <InputField label="Facebook Campaign" placeholder="Campaign Name" icon={VariableIcon} />
                                <InputField label="Lead ID Facebook" placeholder="Enter ID" icon={VariableIcon} />
                                <InputField label="City" placeholder="Enter City" icon={VariableIcon} />
                            </div>

                            {/* Age - Number input style */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Age</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400 text-sm font-bold group-focus-within:text-[#08A698] transition-colors">#</span>
                                    </div>
                                    <input type="number" placeholder="e.g. 25" className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] bg-white text-gray-700 shadow-sm" />
                                </div>
                            </div>

                            {/* Dropdowns Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                <SelectField label="Do you want to earn Millionss" options={['Select', 'Yes', 'No']} />
                                <SelectField label="Whats your goal with forex trading" options={['Select', 'Profit', 'Learning']} />
                                <SelectField label="When do you want to start" options={['Select', 'Immediately', 'Next Week']} />
                                <SelectField label="Are you ready to learn" options={['Select', 'Yes', 'No']} />
                                <SelectField label="Interest Level" options={['Select', 'High', 'Medium', 'Low']} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                <InputField label="Job Title" placeholder="Enter Job Title" icon={VariableIcon} />
                                <InputField label="Campaign Source" placeholder="Source" icon={VariableIcon} />
                                <SelectField label="Lead Source" options={['Select', 'Facebook', 'Website', 'Referral']} />
                                <InputField label="Best time to call" placeholder="e.g. 10:00 AM" icon={VariableIcon} />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 flex justify-center sticky bottom-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-100 -mx-6 -mb-6 lg:-mx-8 lg:-mb-8 rounded-b-xl z-10">
                                <button className="bg-[#08A698] text-white px-16 py-3 rounded-lg text-sm font-bold tracking-wide hover:bg-teal-700 transition-all duration-300 shadow-lg shadow-teal-100 transform hover:-translate-y-0.5">
                                    + ADD LEAD
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
