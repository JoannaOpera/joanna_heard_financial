import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { Transaction } from './types/transaction';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from './api/transactionsApi';

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

    useEffect(() => {
        getTransactions().then(data => setTransactions(data));
    }, []);

    const handleCreate = async (transaction: Transaction) => {
        try {
            const newTransaction = await createTransaction(transaction);
            if (newTransaction) {
                setTransactions([...transactions, newTransaction]);
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
            // Handle error (show error message to user, etc.)
        }
    };

    const handleUpdate = async (transaction: Transaction) => {
        try {
            const updatedTransaction = await updateTransaction(transaction);
            if (updatedTransaction) {
                setTransactions(transactions.map(t => t.transactionId === transaction.transactionId ? updatedTransaction : t));
            }
            setEditingTransaction(undefined);
        } catch (error) {
            console.error("Error updating transaction:", error);
            // Handle error (show error message to user, etc.)
        }
    };

    const handleDelete = async (transactionId: string) => {
        try {
            await deleteTransaction(transactionId);
            setTransactions(transactions.filter(t => t.transactionId !== transactionId));
        } catch (error) {
            console.error("Error deleting transaction:", error);
            // Handle error (show error message to user, etc.)
        }
    };

    return (
        <div>
            <h1>Transactions List</h1>
            {editingTransaction ? (
                <TransactionForm onSubmit={handleUpdate} transaction={editingTransaction} />
            ) : (
                <TransactionForm onSubmit={handleCreate} />
            )}
            <TransactionList transactions={transactions} onEdit={setEditingTransaction} onDelete={handleDelete} />
        </div>
    );
};

export default App;


