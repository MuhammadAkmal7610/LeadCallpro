import React from 'react';
import FilterPageTemplate from '../components/FilterPageTemplate';

const mockData = [
    { id: 1, name: 'X**S', status: 'Dead', rating: 0, assigneeInitials: 'EA', assigneeName: 'Esha Aftab', createdOn: '12h ago', modifiedOn: '12h ago', source: null },
    { id: 2, name: 'Faisal Ali Arain', status: 'Interested', rating: 0, assigneeInitials: 'NI', assigneeName: 'Nida', createdOn: '5h ago', modifiedOn: '5h ago', source: null },
    { id: 3, name: 'Nadeem Ahmed', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '16h ago', modifiedOn: '16h ago', source: null },
    { id: 4, name: 'CRQR', status: 'Recapture lead', rating: 0, assigneeInitials: 'MA', assigneeName: 'Masfa', createdOn: '4M ago', modifiedOn: '4M ago', source: null },
    { id: 5, name: 'Ahmed Farooq', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '27m ago', modifiedOn: '27m ago', source: null },
    { id: 6, name: 'Sana', status: 'WA Support Leads', rating: 0, assigneeInitials: 'FA', assigneeName: 'Fatima', createdOn: '21h ago', modifiedOn: '21h ago', source: null },
    { id: 7, name: 'Adnan Zaman', status: 'WA Support Leads', rating: 0, assigneeInitials: 'EM', assigneeName: 'Eman', createdOn: '13h ago', modifiedOn: '13h ago', source: null },
    { id: 8, name: 'Haseeb Khan', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '14h ago', modifiedOn: '14h ago', source: null },
    { id: 9, name: 'Khudayar Khuad', status: 'Fresh', rating: 0, assigneeInitials: 'UM', assigneeName: 'umaila', createdOn: '14h ago', modifiedOn: '14h ago', source: null },
];

export default function WhatsappLeads() {
    return <FilterPageTemplate title="All Incoming Whatsapp Leads" data={mockData} />;
}
