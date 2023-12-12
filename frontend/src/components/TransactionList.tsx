import React from 'react';
import { Transaction } from '../types/transaction';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (transactionId: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>From Account</th>
                    <th>To Account</th>
                    <th>Transaction Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <TransactionItem key={transaction.transactionId} transaction={transaction} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
};

export default TransactionList;
