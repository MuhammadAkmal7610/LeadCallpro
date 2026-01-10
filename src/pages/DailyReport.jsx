import React from 'react';
import FilterPageTemplate from '../components/FilterPageTemplate';

const mockData = [
    { id: 1, name: 'X**S', status: 'Dead', rating: 0, assigneeInitials: 'EA', assigneeName: 'Esha Aftab', createdOn: '40s ago', modifiedOn: '43s ago', source: null },
    { id: 2, name: 'Faisal Ali Arain', status: 'Interested', rating: 0, assigneeInitials: 'NI', assigneeName: 'Nida', createdOn: '42s ago', modifiedOn: '44s ago', source: null },
    { id: 3, name: 'Nadeem Ahmed', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '1m ago', modifiedOn: '1m ago', source: null },
    { id: 4, name: 'CRQR', status: 'Recapture lead', rating: 0, assigneeInitials: 'MA', assigneeName: 'Masfa', createdOn: '1m ago', modifiedOn: '1m ago', source: null },
    { id: 5, name: 'Ahmed Farooq', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '2m ago', modifiedOn: '2m ago', source: null },
    { id: 6, name: 'Farhan Ali', status: 'Lost', subStatus: 'Unknown Reason', rating: 0, assigneeInitials: 'AJ', assigneeName: 'Areeba Javaid', createdOn: '2m ago', modifiedOn: '2m ago', source: null },
    { id: 7, name: 'Muhammad Raheel', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'HI', assigneeName: 'Hifza', createdOn: '4m ago', modifiedOn: '4m ago', source: null },
    { id: 8, name: 'Sana', status: 'WA Support Leads', rating: 0, assigneeInitials: 'FA', assigneeName: 'Fatima', createdOn: '4m ago', modifiedOn: '4m ago', source: null },
    { id: 9, name: 'Adnan Zaman', status: 'WA Support Leads', rating: 0, assigneeInitials: 'EM', assigneeName: 'Eman', createdOn: '5m ago', modifiedOn: '5m ago', source: null },
    { id: 10, name: 'Haseeb Khan', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '5m ago', modifiedOn: '5m ago', source: null },
];

export default function DailyReport() {
    return <FilterPageTemplate title="Daily Report" data={mockData} />;
}
