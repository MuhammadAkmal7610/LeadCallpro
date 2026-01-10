import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    FunnelIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon
} from '@heroicons/react/24/outline';

// Mock Data
const INITIAL_STAGES = [
    { id: 'fresh', name: 'Fresh', isDefault: true }
];

const ACTIVE_STAGES = [
    { id: 'curious', name: 'Just Curious', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'interested', name: 'Interested', color: 'bg-gray-100 text-gray-800 border-gray-200' }, // Using gray for neutral
    { id: 'hot', name: 'Hot', color: 'bg-amber-100 text-amber-800 border-amber-200' }
];

const LOST_REASONS = [
    'No Need',
    'Unable to Connect',
    'Budget Issues',
    'Product does not fit need',
    'Lost to competitor',
    'Unknown Reason'
];

const GripIcon = () => (
    <svg className="w-4 h-4 text-gray-400 cursor-grab" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 12v.01M12 18v.01M12 6v.01M12 12v.01M12 18v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6v.01M9 12v.01M9 18v.01M15 6v.01M15 12v.01M15 18v.01" />
    </svg>
);

const StageItem = ({ name, isDefault, colorClass = "bg-gray-200/50 border-gray-300", showActions = false }) => (
    <div className={`group flex items-center justify-between p-3 rounded-lg border ${colorClass} mb-2 select-none hover:shadow-sm transition-all`}>
        <div className="flex items-center gap-3">
            <GripIcon />
            <span className="text-sm font-medium text-gray-700">{name}</span>
            {isDefault && (
                <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Default
                </span>
            )}
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-black/5 rounded">
                <PencilIcon className="w-3.5 h-3.5 text-gray-500" />
            </button>
            {showActions && (
                <button className="p-1 hover:bg-black/5 rounded">
                    <TrashIcon className="w-3.5 h-3.5 text-gray-500" />
                </button>
            )}
        </div>
    </div>
);

const SectionArrowHeader = ({ title, bgColor = "bg-gray-100", textColor = "text-gray-700" }) => (
    <div className="relative mb-4 h-10 w-full drop-shadow-sm">
        <div className={`absolute inset-0 ${bgColor} flex items-center justify-center`}>
            <h3 className={`font-bold ${textColor} uppercase tracking-wide text-sm z-10 relative`}>{title}</h3>
        </div>
        {/* Right Arrow CSS shape */}
        <div className={`absolute top-0 -right-4 w-0 h-0 
            border-t-[20px] border-t-transparent
            border-l-[20px] border-l-${bgColor.replace('bg-', '')}
            border-b-[20px] border-b-transparent
            z-20`}></div>
        {/* Left Notch for chaining - only if not first (simplify for now, just flat left for first, notched for others if needed, but the image shows distinct blocks. Actually image shows connected arrows.
             Let's try to mimic the "Arrow" shape using clip-path for better flexibility or just simple borders.
             Given the complexity of CSS arrows with Tailwind, simpler might be separate blocks with pointed ends.
         */}
    </div>
);
// Simplified Header for robustness
const ArrowHeader = ({ title, type }) => {
    let bgClass = "bg-[#F3F4F6]"; // Gray
    let textClass = "text-gray-600";

    if (type === 'active') {
        bgClass = "bg-[#E6FFFA]"; // Light Teal
        textClass = "text-[#08A698]";
    } else if (type === 'closed') {
        bgClass = "bg-[#D1FAE5]"; // Light Green? actually the image shows Green for Won, Red for Lost. The header itself is Light Green
        // Wait, "Closed Stage" header in image is Green.
        bgClass = "bg-[#DCFCE7]"; // Green-100
        textClass = "text-green-700";
    }

    return (
        <div className={`relative h-11 w-full ${bgClass} flex items-center justify-center mb-6`}>
            {/* Left Arrow Cutout (white triangle overlay) */}
            {type !== 'initial' && (
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-white" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
            )}

            <h3 className={`font-bold ${textClass} text-sm uppercase tracking-wide`}>{title}</h3>

            {/* Right Arrow Point */}
            <div className="absolute -right-4 top-0 bottom-0 w-4 z-10" style={{ backgroundColor: 'inherit', clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
        </div>
    )
}


export default function LeadStage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-white text-[#202124] font-sans antialiased">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">

                        {/* Page Header */}
                        <div className="flex items-center gap-3 mb-1">
                            <FunnelIcon className="w-6 h-6 text-gray-500" />
                            <h1 className="text-xl font-bold text-gray-900">Lead stages</h1>
                        </div>
                        <div className="flex items-center gap-2 mb-8 ml-9">
                            <p className="text-sm text-gray-500">Configure Your Sales Pipeline</p>
                            <a href="#" className="text-xs text-[#6B21A8] hover:underline font-medium" style={{ color: '#5b21b6' }}>How to use</a>
                        </div>


                        {/* Board Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Column 1: Initial Stage */}
                            <div className="flex flex-col">
                                <ArrowHeader title="Initial stage" type="initial" />
                                <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 min-h-[200px]">
                                    {INITIAL_STAGES.map(stage => (
                                        <StageItem key={stage.id} name={stage.name} isDefault={stage.isDefault} />
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: Active Stage */}
                            <div className="flex flex-col">
                                <ArrowHeader title="Active stage" type="active" />
                                <div className="space-y-4">
                                    {/* Add Button */}
                                    <button className="w-full py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-600 hover:border-[#08A698] hover:text-[#08A698] transition-colors flex items-center justify-center gap-2 shadow-sm">
                                        <PlusIcon className="w-4 h-4" />
                                        Add
                                    </button>

                                    {/* List */}
                                    <div className="p-4 border border-[#08A698]/20 rounded-xl bg-[#08A698]/5">
                                        {ACTIVE_STAGES.map(stage => (
                                            <StageItem
                                                key={stage.id}
                                                name={stage.name}
                                                colorClass={stage.color}
                                                showActions={true}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Closed Stage */}
                            <div className="flex flex-col">
                                <ArrowHeader title="Closed stage" type="closed" />

                                <div className="space-y-6">
                                    {/* Won Section */}
                                    <div className="border border-green-200 bg-green-50/50 rounded-xl overflow-hidden">
                                        <div className="px-4 py-2 bg-green-100/80 border-b border-green-200">
                                            <h4 className="text-sm font-bold text-green-800">Won</h4>
                                        </div>
                                        <div className="p-3">
                                            <StageItem name="Won" colorClass="bg-green-200/50 border-green-300" />
                                        </div>
                                    </div>

                                    {/* Lost Section */}
                                    <div className="border border-rose-200 bg-rose-50/50 rounded-xl overflow-hidden">
                                        <div className="px-4 py-2 bg-rose-100/80 border-b border-rose-200">
                                            <h4 className="text-sm font-bold text-rose-800">Lost</h4>
                                        </div>
                                        <div className="p-3 pb-0">
                                            <StageItem name="Lost" colorClass="bg-rose-200/50 border-rose-300" />
                                        </div>

                                        {/* Reasons */}
                                        <div className="px-4 py-4 mt-2">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-medium text-gray-500">Reason for Lost leads <span className="text-gray-400">(6/25)</span></span>
                                                <button className="text-xs font-bold text-[#6B21A8] hover:underline flex items-center gap-1" style={{ color: '#5b21b6' }}>
                                                    <PlusIcon className="w-3 h-3" /> Add
                                                </button>
                                            </div>

                                            <div className="space-y-1">
                                                {LOST_REASONS.map((reason, idx) => (
                                                    <div key={idx} className="group flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-white px-2 -mx-2 rounded transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <GripIcon />
                                                            <span className="text-sm text-gray-600">{reason}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                                                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><PencilIcon className="w-3 h-3" /></button>
                                                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500"><TrashIcon className="w-3 h-3" /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
