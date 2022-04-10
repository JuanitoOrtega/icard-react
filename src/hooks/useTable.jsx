import { useState } from 'react';
import { getTablesApi, addTableApi, updateTableApi, deleteTableApi } from '../api/table';
import { useAuth } from "./useAuth";

export function useTable() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState(null);
    const { auth } = useAuth();

    // Get all tables
    const getTables = async () => {
        try {
            setLoading(true);
            const response = await getTablesApi(auth.token);
            setLoading(false);
            setTables(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    // Add a new table
    const addTable = async (data) => {
        try {
            setLoading(true);
            await addTableApi(data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Update a table
    const updateTable = async (id, data) => {
        try {
            setLoading(true);
            await updateTableApi(id, data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Delete a table
    const deleteTable = async (id) => {
        try {
            setLoading(true);
            await deleteTableApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        loading,
        error,
        tables,
        getTables,
        addTable,
        updateTable,
        deleteTable
    };
}
