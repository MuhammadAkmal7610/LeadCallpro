import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    PhoneIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    UserCircleIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

// Mock Data Grouped by Date
const activities = [
    {
        date: 'Today',
        items: [
            {
                id: 1,
                type: 'call',
                title: 'Outbound Call - Connected',
                subtitle: 'Sarah Wilson',
                description: 'Discussed project requirements and timeline. Client is interested in the premium plan. Scheduled follow-up for next week.',
                time: '10:42 AM',
                user: 'John Doe',
                duration: '4m 32s',
                badgeColor: 'bg-green-50 text-green-700 border-green-100'
            },
            {
                id: 2,
                type: 'email',
                title: 'Email Sent',
                subtitle: 'Proposal Follow-up',
                description: 'Sent the revised proposal document as requested in the last meeting.',
                time: '09:15 AM',
                user: 'John Doe',
                badgeColor: 'bg-blue-50 text-blue-700 border-blue-100'
            }
        ]
    },
    {
        date: 'Yesterday',
        items: [
            {
                id: 3,
                type: 'meeting',
                title: 'Meeting Scheduled',
                subtitle: 'Demo with Engineering',
                description: 'Demo scheduled with the engineering team for next Tuesday.',
                time: '4:00 PM',
                user: 'Alice Smith',
                badgeColor: 'bg-purple-50 text-purple-700 border-purple-100'
            },
            {
                id: 4,
                type: 'note',
                title: 'Note Added',
                subtitle: 'Billing Query',
                description: 'Client asked to hold off on billing until the new fiscal year starts.',
                time: '1:30 PM',
                user: 'John Doe',
                badgeColor: 'bg-amber-50 text-amber-700 border-amber-100'
            }
        ]
    },
    {
        date: 'Oct 12, 2023',
        items: [
            {
                id: 5,
                type: 'whatsapp',
                title: 'Incoming Message',
                subtitle: 'Pricing Question',
                description: 'Can you send me the pricing sheet again? Also needing info on enterprise tiers.',
                time: '11:20 AM',
                user: 'Sarah Wilson',
                badgeColor: 'bg-teal-50 text-teal-700 border-teal-100'
            }
        ]
    }
];

const ActivityIcon = ({ type }) => {
    switch (type) {
        case 'call': return <PhoneIcon className="w-4 h-4" />;
        case 'email': return <EnvelopeIcon className="w-4 h-4" />;
        case 'whatsapp': return <ChatBubbleLeftRightIcon className="w-4 h-4" />;
        case 'meeting': return <CalendarIcon className="w-4 h-4" />;
        case 'note': return <UserCircleIcon className="w-4 h-4" />;
        default: return <CheckCircleIcon className="w-4 h-4" />;
    }
};

export default function Activities() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-12 bg-gray-50/50">
                    <div className="mx-auto max-w-5xl">

                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
                                <p className="text-sm text-gray-500 mt-1">Track all team interactions and updates.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative group">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#08A698] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search timeline..."
                                        className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] transition-all w-full sm:w-64 shadow-sm"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                    <FunnelIcon className="h-4 w-4" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* Timeline Container */}
                        <div className="space-y-12 relative">
                            {/* Continuous vertical line if needed, but per-group is often cleaner for date grouping */}

                            {activities.map((group, groupIndex) => (
                                <div key={groupIndex} className="relative">
                                    {/* Date Header */}
                                    <div className="sticky top-0 z-10 flex justify-start pl-[68px] mb-8">
                                        <span className="bg-white text-gray-500 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200 shadow-sm uppercase tracking-wider">
                                            {group.date}
                                        </span>
                                    </div>

                                    <div className="relative space-y-8">
                                        {group.items.map((activity, idx) => (
                                            <div key={activity.id} className="relative pl-[68px] group">

                                                {/* Vertical Line Segment */}
                                                {/* We draw a line from this item up to the previous one or top */}
                                                <div className={`absolute left-[34px] top-0 bottom-0 w-0.5 bg-gray-200 ${idx === group.items.length - 1 ? 'bottom-auto h-full' : ''} ${groupIndex === activities.length - 1 && idx === group.items.length - 1 ? 'h-0' : ''}`}></div>

                                                {/* If it's the last item of the last group, we stop the line at the icon.
                                                    Actually, purely visual CSS lines are easier with a continuous full-height border on a parent wrapper if simple.
                                                    Here we want a 'connector' style.
                                                */}

                                                {/* Icon Node */}
                                                <div className="absolute left-[18px] top-0 w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center z-10 shadow-sm ring-4 ring-[#F8F9FA] group-hover:ring-white group-hover:shadow-md transition-all">
                                                    <div className={`w-full h-full rounded-full flex items-center justify-center ${activity.type === 'call' ? 'text-[#08A698] bg-teal-50' :
                                                        activity.type === 'meeting' ? 'text-purple-600 bg-purple-50' :
                                                            activity.type === 'email' ? 'text-blue-600 bg-blue-50' :
                                                                'text-gray-500 bg-gray-100'
                                                        }`}>
                                                        <ActivityIcon type={activity.type} />
                                                    </div>
                                                </div>

                                                {/* Card */}
                                                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:border-[#08A698]/30 group-hover:translate-x-1">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-sm font-bold text-gray-900">{activity.title}</h3>
                                                            {activity.duration && (
                                                                <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md border border-gray-100 font-medium flex items-center gap-1">
                                                                    <ClockIcon className="w-3 h-3" /> {activity.duration}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-400 tabular-nums">{activity.time}</span>
                                                    </div>

                                                    <div className="mb-3">
                                                        <p className="text-sm text-[#08A698] font-semibold mb-1">{activity.subtitle}</p>
                                                        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                                                            {activity.description}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 pt-3 border-t border-gray-50 mt-3">
                                                        <div className="flex items-center gap-2 mr-auto">
                                                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500">
                                                                {activity.user.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <span className="text-xs font-medium text-gray-500">{activity.user}</span>
                                                        </div>

                                                        <button className="text-xs font-bold text-gray-400 hover:text-[#08A698] transition-colors py-1 px-2 rounded hover:bg-teal-50">
                                                            View Details
                                                        </button>
                                                        {activity.type === 'call' && (
                                                            <button className="text-xs font-bold text-[#08A698] hover:text-[#078F82] transition-colors py-1 px-2 rounded hover:bg-teal-50 border border-transparent hover:border-teal-100">
                                                                ▶ Listen
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Connector to next group */}
                                    {groupIndex !== activities.length - 1 && (
                                        <div className="absolute left-[34px] top-full h-8 w-0.5 bg-gray-200"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* End of Timeline */}
                        <div className="mt-12 flex flex-col items-center gap-4">
                            <div className="w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent"></div>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-full hover:bg-gray-50 hover:text-[#08A698] hover:border-[#08A698] transition-all shadow-sm group">
                                <ArrowPathIcon className="w-4 h-4 group-hover:animate-spin" />
                                Load Earlier Goals
                            </button>
                        </div>

                    </div>
                </main>
            </div>
            {/* Global Styles override for this page if needed, or scoped */}
        </div>
    );
}
