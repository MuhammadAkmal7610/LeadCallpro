import React from 'react';
import FilterPageTemplate from '../components/FilterPageTemplate';

const mockData = [
    { id: 1, name: 'Junaid Warsi', status: 'Fresh', rating: 0, assigneeInitials: 'EA', assigneeName: 'Esha Aftab', createdOn: '6m ago', modifiedOn: '6m ago', source: 'Meta' },
    { id: 2, name: 'Haji Khan', status: 'Fresh', rating: 0, assigneeInitials: 'AT', assigneeName: 'Ayesha Tariq', createdOn: '13m ago', modifiedOn: '13m ago', source: 'Meta' },
    { id: 3, name: 'Sunny UG', status: 'Fresh', rating: 0, assigneeInitials: 'EM', assigneeName: 'Eman', createdOn: '22m ago', modifiedOn: '21m ago', source: null },
    { id: 4, name: 'Farhan Ali', status: 'Lost', subStatus: 'Unknown Reason', rating: 0, assigneeInitials: 'AJ', assigneeName: 'Areeba Javaid', createdOn: '22m ago', modifiedOn: '1m ago', source: 'Meta' },
    { id: 5, name: 'Ahmed Farooq', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'JA', assigneeName: 'Javeria', createdOn: '26m ago', modifiedOn: '41s ago', source: 'Meta' },
    { id: 6, name: 'Sajjad Blaa', status: 'Fresh', rating: 0, assigneeInitials: 'MA', assigneeName: 'Mahrukh', createdOn: '30m ago', modifiedOn: '30m ago', source: 'Meta' },
    { id: 7, name: 'Ziaullah Zargar', status: 'Fresh', rating: 0, assigneeInitials: 'SE', assigneeName: 'Sehrish', createdOn: '30m ago', modifiedOn: '30m ago', source: 'Meta' },
    { id: 8, name: 'Muhammad Hamza', status: 'Fresh', rating: 0, assigneeInitials: 'AN', assigneeName: 'Amna Noor', createdOn: '32m ago', modifiedOn: '32m ago', source: 'Meta' },
    { id: 9, name: 'HamZza Rasheed', status: 'Fresh', rating: 0, assigneeInitials: 'WA', assigneeName: 'Wania Ahad', createdOn: '39m ago', modifiedOn: '39m ago', source: 'Meta' },
    { id: 10, name: 'Abdul Rehman Warraich', status: 'Fresh', rating: 0, assigneeInitials: 'MA', assigneeName: 'Mahrukh', createdOn: '43m ago', modifiedOn: '27m ago', source: 'Meta' },
    { id: 11, name: 'abdulrehmanwarrich2001', status: 'First Contact Attempted', rating: 0, assigneeInitials: 'SA', assigneeName: 'Samaha', createdOn: '1h ago', modifiedOn: '9m ago', source: null },
    { id: 12, name: 'Muhammad Ali', status: 'Fresh', rating: 0, assigneeInitials: 'MA', assigneeName: 'Maha', createdOn: '1h ago', modifiedOn: '1h ago', source: 'Meta' },
];

export default function AllLeads() {
    return <FilterPageTemplate title="All Leads" data={mockData} />;
}
