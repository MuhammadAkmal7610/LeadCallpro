import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    ArrowRightOnRectangleIcon,
    PlusIcon,
    CheckCircleIcon,
    UserIcon,
    BuildingOfficeIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const ManageWorkspaces = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto space-y-8">

                        {/* Page Header */}
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <BuildingOfficeIcon className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                        Manage Workspaces
                                        <button className="p-1.5 text-gray-400 hover:text-[#08A698] hover:bg-[#08A698]/5 rounded-full transition-colors">
                                            <ArrowPathIcon className="w-4 h-4" />
                                        </button>
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">Switch between your active workspaces or create a new one.</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-[#08A698] text-sm font-semibold hover:text-[#068f82] transition-colors bg-white border border-[#08A698]/20 px-4 py-2 rounded-lg hover:bg-[#08A698]/5 shadow-sm">
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                Logout
                            </button>
                        </div>

                        {/* Workspaces Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            {/* Card Header */}
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 rounded-t-xl flex items-center justify-between">
                                <h2 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
                                    EXISTING WORKSPACES (2)
                                </h2>
                            </div>

                            {/* List Content */}
                            <div className="p-6 space-y-4 rounded-b-xl">
                                {/* Workspace 1 */}
                                <div className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-[#08A698] hover:shadow-md transition-all duration-200 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#08A698]/10 flex items-center justify-center text-[#08A698] font-bold text-lg">
                                            E
                                        </div>
                                        <span className="text-[#08A698] font-semibold text-base group-hover:text-[#068f82] transition-colors">
                                            Eon Holdings
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full text-gray-500 text-[10px] font-bold uppercase tracking-wide">
                                        <UserIcon className="w-3.5 h-3.5" />
                                        ROOT
                                    </div>
                                </div>

                                {/* Workspace 2 (Active) */}
                                <div className="group flex items-center justify-between p-4 bg-[#08A698]/5 border border-[#08A698] rounded-lg shadow-sm transition-all duration-200 cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#08A698]/10 rounded-bl-full -mr-8 -mt-8 z-0"></div>

                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-[#08A698]/10 flex items-center justify-center text-[#08A698] font-bold text-lg">
                                            S
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[#08A698] font-bold text-base">
                                                SCA
                                            </span>
                                            <span className="text-[10px] text-[#08A698]/80 font-medium uppercase tracking-wider">Current Workspace</span>
                                        </div>
                                        <CheckCircleIcon className="w-6 h-6 text-[#08A698] ml-2" />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 border border-[#08A698]/20 rounded-full text-[#08A698] text-[10px] font-bold uppercase tracking-wide relative z-10">
                                        <UserIcon className="w-3.5 h-3.5" />
                                        ROOT
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 rounded-b-xl flex justify-center">
                                <button className="flex items-center gap-2 text-sm font-bold text-[#08A698] hover:bg-[#08A698]/10 px-6 py-2.5 rounded-lg transition-colors border border-transparent hover:border-[#08A698]/20">
                                    <PlusIcon className="w-5 h-5" strokeWidth={2.5} />
                                    Create New Workspaces
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManageWorkspaces;
