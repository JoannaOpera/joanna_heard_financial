import React from 'react';
import { Transaction } from '../types/transaction';

interface TransactionItemProps {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDelete: (transactionId: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{transaction.title}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.fromAccount}</td>
            <td>{transaction.toAccount}</td>
            <td>{transaction.transactionDate}</td>
            <td>
                <button onClick={() => onEdit(transaction)}>Edit</button>
                <button onClick={() => onDelete(transaction.transactionId)}>Delete</button>
            </td>
        </tr>
    );
};

export default TransactionItem;

