import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
    ArrowPathIcon,
    Bars2Icon,
    PencilIcon,
    EyeSlashIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PhoneIcon,
    EnvelopeIcon,
    DocumentTextIcon, // Used for 'T'
    HashtagIcon,
    ChevronDownIcon,
    EllipsisVerticalIcon,
    XMarkIcon,
    InformationCircleIcon,
    ArrowDownTrayIcon,
    LockClosedIcon,
    CodeBracketIcon,
    ArrowRightIcon,
    ArrowsRightLeftIcon,
    ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const Toggle = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#08A698] focus:ring-offset-2 ${enabled ? 'bg-[#08A698]' : 'bg-gray-300'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

const FieldModal = ({ isOpen, onClose, mode = 'edit' }) => {
    if (!isOpen) return null;

    const isCreate = mode === 'create';

    const [toggles, setToggles] = useState({
        showInImport: true,
        showInQuickAdd: true,
        lockAfterCreate: false,
        canUseVariable: true,
        searchable: false
    });

    const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">{isCreate ? 'Create Field' : 'Edit Field'}</h2>
                    {/* Only show buttons in Edit mode header per previous design, or if consistent with Create design. 
                        The Create mock shows buttons? Actually the Create mock cuts off the top right. 
                        Assuming consistent header buttons or lack thereof. 
                        Wait, the Create mock DOES NOT show header buttons in the crop, but standard modals usually have them.
                        Keeping buttons for consistency but can hide if needed. 
                        Actually, let's look at the Edit mock again. It had Save/Cancel in header.
                        The Create mock doesn't show them. Let's keep them for usability.
                    */}
                    {!isCreate && (
                        <div className="flex gap-3">
                            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-[#08A698] rounded-lg hover:bg-[#068f82] transition-colors shadow-sm shadow-[#08A698]/20">
                                Save
                            </button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700">Name</label>
                            <input
                                type="text"
                                defaultValue={isCreate ? "" : "Do You Want to earn Millions"}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#08A698] focus:border-[#08A698]"
                            />
                            {isCreate && (
                                <p className="text-xs text-red-500">Name can be 1 to 40 letters in length.</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700">Type</label>
                            <div className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 flex items-center justify-between ${!isCreate ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}>
                                <span className={`flex items-center gap-2 ${isCreate && 'text-gray-400'}`}>
                                    {isCreate ? 'Select Type' : (
                                        <>
                                            <DocumentTextIcon className="w-4 h-4 text-gray-500" />
                                            Text
                                        </>
                                    )}
                                </span>
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                            </div>
                            {isCreate && (
                                <p className="text-xs text-red-500">Please select a field type.</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea
                            rows="4"
                            defaultValue={isCreate ? "" : "User Answers these Questions"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#08A698] focus:border-[#08A698] resize-none"
                        ></textarea>
                    </div>

                    {/* Check if Properties section is visually separated differently in Create mode. 
                        It looks like a dropdown/collapsible in the screenshot "Properties v". 
                    */}
                    <div className="border-b border-gray-200"></div>

                    {/* Properties */}
                    <div className="space-y-4">
                        <button className="flex items-center gap-2 text-sm text-gray-900 border border-black rounded px-2 py-0.5 w-max font-bold">
                            Properties
                            <ChevronDownIcon className="w-4 h-4" strokeWidth={2.5} />
                        </button>

                        <div className="space-y-4 pl-1">
                            {/* Toggle Rows */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ArrowDownTrayIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">Show in import</span>
                                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <Toggle enabled={toggles.showInImport} onChange={() => handleToggle('showInImport')} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PlusIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">Show in quick add</span>
                                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <Toggle enabled={toggles.showInQuickAdd} onChange={() => handleToggle('showInQuickAdd')} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <LockClosedIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">Lock after create</span>
                                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <Toggle enabled={toggles.lockAfterCreate} onChange={() => handleToggle('lockAfterCreate')} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CodeBracketIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">Can use variable</span>
                                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <Toggle enabled={toggles.canUseVariable} onChange={() => handleToggle('canUseVariable')} />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-2">
                                    <ArrowRightIcon className="w-4 h-4 text-gray-400 rotate-90 scale-x-[-1]" />
                                    <span className="text-sm font-bold text-gray-600">Variable default value</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="NA"
                                    className="w-48 px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-2">
                                    <ArrowsRightLeftIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">Length Range</span>
                                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>From</span>
                                    <input type="text" defaultValue="1" className="w-16 px-2 py-1 border border-gray-300 rounded text-center" />
                                    <span>To</span>
                                    <input type="text" defaultValue="102" className="w-16 px-2 py-1 border border-gray-300 rounded text-center" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">Searchable</span>
                                    <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                </div>
                                <Toggle enabled={toggles.searchable} onChange={() => handleToggle('searchable')} />
                            </div>
                        </div>
                    </div>

                    {!isCreate && (
                        <>
                            <div className="border-b border-gray-200"></div>

                            {/* Information */}
                            <div className="space-y-4">
                                <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded px-2 py-0.5 bg-gray-50 w-max shadow-sm">
                                    <InformationCircleIcon className="w-4 h-4" />
                                    Information
                                    <ChevronDownIcon className="w-3 h-3" />
                                </button>

                                <div className="space-y-3 pl-1 text-sm">
                                    <div className="flex justify-between items-center text-gray-500">
                                        <span className="font-bold">Created by</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium">EH</div>
                                            <span>Eon Holding</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500">
                                        <span className="font-bold">Modified by</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium">EH</div>
                                            <span>Eon Holding</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500">
                                        <span className="font-bold">Last modified on</span>
                                        <span>5M</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500">
                                        <span className="font-bold">Created on</span>
                                        <span>5M</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 pt-2">
                                        <span className="font-bold">API Name</span>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#08A698] transition-colors">
                                            <ClipboardDocumentIcon className="w-4 h-4" />
                                            do_you_want_to_earn_millions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="h-4"></div>
                </div>
            </div>
        </div>
    );
};

const DragHandle = () => (
    <div className="cursor-move text-gray-300 hover:text-gray-500">
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a1 1 0 11-2 0 1 1 0 012 0zm0 5a1 1 0 11-2 0 1 1 0 012 0zM7 12a1 1 0 11-2 0 1 1 0 012 0zm0 5a1 1 0 11-2 0 1 1 0 012 0zm6-15a1 1 0 11-2 0 1 1 0 012 0zm0 5a1 1 0 11-2 0 1 1 0 012 0zM13 12a1 1 0 11-2 0 1 1 0 012 0zm0 5a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
    </div>
);

const FieldRow = ({ icon: Icon, title, subtitle, isH1, isH2, onEdit }) => {
    return (
        <div className="group flex items-center bg-white border border-gray-100 p-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg -mb-px relative z-0 hover:z-10">
            {/* Left Content */}
            <div className="flex items-center gap-4 flex-1">
                {(isH1 || isH2) ? (
                    <span className="w-8 text-sm font-bold text-gray-400 select-none">
                        {isH1 ? 'H1:' : 'H2:'}
                    </span>
                ) : (
                    <div className="w-8 flex justify-center">
                        <DragHandle />
                    </div>
                )}

                <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{title}</span>
                    {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pl-4">
                <button
                    onClick={onEdit}
                    className="p-1.5 text-gray-400 hover:text-[#08A698] rounded-full hover:bg-[#08A698]/5 transition-colors"
                >
                    <PencilIcon className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    {(isH1 || isH2) ? (
                        <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                        <EyeSlashIcon className="w-4 h-4" />
                    )}
                </button>
            </div>
        </div>
    );
};

const SetupLeadIdModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [selection, setSelection] = useState('map'); // 'map' or 'create'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="text-xl font-bold text-gray-900">Setup Lead id</h2>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 space-y-4">

                    {/* Map from Existing */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="setup-type"
                                checked={selection === 'map'}
                                onChange={() => setSelection('map')}
                                className="w-4 h-4 text-[#08A698] border-gray-300 focus:ring-[#08A698] cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-900 group-hover:text-[#08A698] transition-colors">Map from Existing Fields</span>
                        </label>

                        {selection === 'map' && (
                            <div className="ml-6 relative">
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-between cursor-pointer hover:border-[#08A698] transition-colors">
                                    <span className="text-sm text-gray-600">Select Field</span>
                                    <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Create New Field */}
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="setup-type"
                                checked={selection === 'create'}
                                onChange={() => setSelection('create')}
                                className="w-4 h-4 text-[#08A698] border-gray-300 focus:ring-[#08A698] cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-900 group-hover:text-[#08A698] transition-colors">Create New Field</span>
                        </label>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-6 pb-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-2 text-sm font-medium text-white bg-[#08A698] hover:bg-[#068f82] rounded-lg shadow-sm shadow-[#08A698]/20 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function LeadFields() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, mode: 'edit' });
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

    const openCreateModal = () => setModalState({ isOpen: true, mode: 'create' });
    const openEditModal = () => setModalState({ isOpen: true, mode: 'edit' });
    const closeModal = () => setModalState({ ...modalState, isOpen: false });

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#202124] font-sans antialiased">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <FieldModal isOpen={modalState.isOpen} onClose={closeModal} mode={modalState.mode} />
            <SetupLeadIdModal isOpen={isSetupModalOpen} onClose={() => setIsSetupModalOpen(false)} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setIsSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    Fields Settings
                                    <button className="p-1 text-gray-400 hover:text-[#08A698] hover:bg-[#08A698]/5 rounded-full transition-colors">
                                        <ArrowPathIcon className="w-4 h-4" />
                                    </button>
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Lead Id <a href="#" className="text-[#08A698] hover:underline underline-offset-2">Learn more</a>
                                </p>
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="bg-[#08A698] hover:bg-[#068f82] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm shadow-[#08A698]/20"
                            >
                                <PlusIcon className="w-4 h-4" strokeWidth={2.5} />
                                Add a new field
                            </button>
                        </div>

                        {/* Identity Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <PhoneIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Phone</h3>
                                    <p className="text-xs text-gray-400">+91 9999999999</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsSetupModalOpen(true)}
                                className="text-sm font-medium text-[#08A698] hover:underline"
                            >
                                Change
                            </button>
                        </div>

                        {/* Primary Fields */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Primary Fields (Assign)</h2>
                            <div className="shadow-sm rounded-lg overflow-hidden">
                                <FieldRow icon={DocumentTextIcon} title="Name" isH1 />
                                <FieldRow icon={PhoneIcon} title="Phone" isH2 />
                            </div>
                        </div>

                        {/* Other Fields */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Other Fields</h2>
                            </div>

                            {/* Filter Bar */}
                            <div className="flex gap-3 mb-4">
                                <div className="flex-1 relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#08A698] focus:border-[#08A698] shadow-sm"
                                    />
                                </div>
                                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-[#08A698] focus:border-[#08A698] bg-white shadow-sm min-w-[140px]">
                                    <option>Select type</option>
                                    <option>Text</option>
                                    <option>Number</option>
                                </select>
                                <button className="px-4 py-2 border border-[#08A698] bg-[#08A698]/5 text-[#08A698] rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#08A698]/10 transition-colors">
                                    <EyeSlashIcon className="w-4 h-4" />
                                    Active Fields
                                    <ChevronDownIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">27 results found</p>

                            {/* List */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
                                <FieldRow icon={EnvelopeIcon} title="Email" subtitle="abc@xyz.com" onEdit={openEditModal} />
                                <FieldRow icon={DocumentTextIcon} title="Do You Want to earn Millions" subtitle="Text field value" onEdit={openEditModal} />
                                <FieldRow icon={PhoneIcon} title="Alternate Phone" subtitle="+91 9999999999" onEdit={openEditModal} />
                                <FieldRow icon={DocumentTextIcon} title="Facebook Ad" subtitle="Text field value" onEdit={openEditModal} />
                                <FieldRow icon={DocumentTextIcon} title="Facebook Campaign" subtitle="Text field value" onEdit={openEditModal} />
                                <FieldRow icon={DocumentTextIcon} title="Lead ID FACEBOOK" subtitle="Text field value" onEdit={openEditModal} />
                                <FieldRow icon={DocumentTextIcon} title="City" subtitle="Text field value" onEdit={openEditModal} />
                                <FieldRow icon={HashtagIcon} title="Age" subtitle="123" onEdit={openEditModal} />
                                <FieldRow icon={ChevronDownIcon} title="Do You Want to earn MillionsS" subtitle="value1" onEdit={openEditModal} />
                                <FieldRow icon={ChevronDownIcon} title="Whats your goal with forex trading" subtitle="value1" onEdit={openEditModal} />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
