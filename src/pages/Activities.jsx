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
    CheckCircleIcon
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
                description: 'Discussed project requirements and timeline. Client is interested in the premium plan.',
                time: '10:42 AM',
                user: 'John Doe',
                duration: '4m 32s',
                statusColor: 'bg-green-100 text-green-700'
            },
            {
                id: 2,
                type: 'email',
                title: 'Email Sent',
                subtitle: 'Proposal Follow-up',
                description: 'Sent the revised proposal document as requested in the last meeting.',
                time: '09:15 AM',
                user: 'John Doe',
                statusColor: 'bg-blue-100 text-blue-700'
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
                statusColor: 'bg-purple-100 text-purple-700'
            },
            {
                id: 4,
                type: 'note',
                title: 'Note Added',
                subtitle: 'Billing Query',
                description: 'Client asked to hold off on billing until the new fiscal year starts.',
                time: '1:30 PM',
                user: 'John Doe',
                statusColor: 'bg-amber-100 text-amber-700'
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
                description: 'Can you send me the pricing sheet again?',
                time: '11:20 AM',
                user: 'Sarah Wilson',
                statusColor: 'bg-teal-100 text-teal-700'
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

                <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 bg-gray-50/50">
                    <div className="mx-auto max-w-4xl">

                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800">Activities</h1>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search timeline..."
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#08A698] focus:ring-1 focus:ring-[#08A698] transition-all w-64 bg-white"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                    <FunnelIcon className="h-4 w-4" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* Timeline Container */}
                        <div className="space-y-8">
                            {activities.map((group, groupIndex) => (
                                <div key={groupIndex} className="relative">
                                    {/* Date Header */}
                                    <div className="sticky top-0 z-10 flex justify-center mb-6">
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 shadow-sm">
                                            {group.date}
                                        </span>
                                    </div>

                                    <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:inset-y-0 before:left-[19px] sm:before:left-[39px] before:w-px before:bg-gray-200">
                                        {group.items.map((activity) => (
                                            <div key={activity.id} className="relative flex gap-4 group">

                                                {/* Icon Node */}
                                                <div className="absolute -left-[30px] sm:-left-[50px] top-1.5 w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center z-10 shadow-sm ring-1 ring-gray-100">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activity.type === 'call' || activity.type === 'whatsapp' ? 'bg-teal-50 text-[#08A698]' : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        <ActivityIcon type={activity.type} />
                                                    </div>
                                                </div>

                                                {/* Card */}
                                                <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="text-sm font-semibold text-gray-900">{activity.title}</h3>
                                                                {activity.duration && (
                                                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
                                                                        {activity.duration}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-[#08A698] font-medium">{activity.subtitle}</p>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500 whitespace-nowrap">
                                                            <span>{activity.user}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <span>{activity.time}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                                        {activity.description}
                                                    </p>

                                                    {/* Actions / Footer (Simulated) */}
                                                    <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                                                        <button className="text-xs font-medium text-gray-500 hover:text-[#08A698] transition-colors">
                                                            View Details
                                                        </button>
                                                        {activity.type === 'call' && (
                                                            <button className="text-xs font-medium text-gray-500 hover:text-[#08A698] transition-colors">
                                                                Listen to Recording
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* End of Timeline */}
                        <div className="mt-12 flex justify-center">
                            <button className="px-6 py-2 border border-gray-200 bg-white text-gray-600 text-sm font-medium rounded-full hover:bg-gray-50 hover:text-[#08A698] transition-colors shadow-sm">
                                Load Earlier Activities
                            </button>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
