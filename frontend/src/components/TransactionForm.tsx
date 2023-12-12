import React, { useState, useEffect } from 'react';
import { Transaction } from '../types/transaction';

interface TransactionFormProps {
    onSubmit: (transaction: Transaction) => void;
    transaction?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, transaction }) => {
    const [formState, setFormState] = useState<Transaction>(transaction || {
        transactionId: '',
        title: '',
        description: '',
        amount: 0,
        fromAccount: '',
        toAccount: '',
        transactionDate: '',
    });

    useEffect(() => {
        if (transaction) {
            setFormState(transaction);
        }
    }, [transaction]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
        setFormState({
            transactionId: '',
            title: '',
            description: '',
            amount: 0,
            fromAccount: '',
            toAccount: '',
            transactionDate: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input name="title" value={formState.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <input name="description" value={formState.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Amount</label>
                <input type="number" name="amount" value={formState.amount} onChange={handleChange} required />
            </div>
            <div>
                <label>From Account</label>
                <input name="fromAccount" value={formState.fromAccount} onChange={handleChange} required />
            </div>
            <div>
                <label>To Account</label>
                <input name="toAccount" value={formState.toAccount} onChange={handleChange} required />
            </div>
            <div>
                <label>Transaction Date</label>
                <input type="date" name="transactionDate" value={formState.transactionDate} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransactionForm;
