import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhoneIcon, ChatBubbleLeftRightIcon, CalendarIcon, UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function LeadDetailModal({ isOpen, onClose, lead }) {
    if (!lead) return null;

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                {/* Header */}
                                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg">
                                            {lead.assignee || 'NA'}
                                        </div>
                                        <div>
                                            <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                                                {lead.name}
                                            </Dialog.Title>
                                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-xs font-semibold">
                                                    ID: {lead.id}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs">
                                                    <ClockIcon className="w-3.5 h-3.5" /> Modified {lead.time || 'recently'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="px-6 py-6 space-y-6">
                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-[#08A698] hover:bg-[#078F82] text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm">
                                            <PhoneIcon className="w-4 h-4" /> Call Lead
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm">
                                            <ChatBubbleLeftRightIcon className="w-4 h-4" /> WhatsApp
                                        </button>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                {lead.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Source</label>
                                            <p className="text-sm font-semibold text-gray-800">Meta / Facebook</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Assigned To</label>
                                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                <UserCircleIcon className="w-4 h-4 text-gray-400" /> Esha Aftab
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Created On</label>
                                            <p className="text-sm font-semibold text-gray-800">10 Jan 2026</p>
                                        </div>
                                    </div>

                                    {/* Recent Activity Mock */}
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4 text-[#08A698]" /> Recent Activity
                                        </h4>
                                        <div className="relative pl-4 space-y-4 before:content-[''] before:absolute before:left-1.5 before:top-1 before:h-full before:w-px before:bg-gray-200">
                                            <div className="relative">
                                                <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#08A698] border-2 border-white shadow-sm" />
                                                <p className="text-xs text-gray-600">Status changed to <span className="font-bold text-gray-800">First Contact Attempted</span></p>
                                                <span className="text-[10px] text-gray-400">2 hours ago</span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white" />
                                                <p className="text-xs text-gray-600">Lead Created from Meta</p>
                                                <span className="text-[10px] text-gray-400">1 day ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-gray-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
