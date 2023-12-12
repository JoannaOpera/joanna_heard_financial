import { Transaction } from '../types/transaction';

// Base URL of your Flask backend
const BASE_URL = 'http://localhost:5000';

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(`${BASE_URL}/transactions`);
    if (!response.ok) {
        throw new Error('Error fetching transactions');
    }
    return response.json();
};

export const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });
    if (!response.ok) {
        throw new Error('Error creating transaction');
    }
    return response.json();
};

export const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch(`${BASE_URL}/transactions/${transaction.transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });
    if (!response.ok) {
        throw new Error('Error updating transaction');
    }
    return response.json();
};

export const deleteTransaction = async (transactionId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Error deleting transaction');
    }
};

