import { BASE_API } from '../utils/constants';

// Get all tables
export async function getTablesApi() {
    try {
        const url = `${BASE_API}/api/tables/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Add a new table
export async function addTableApi(data, token) {
    try {
        const formData = new FormData();
        formData.append('number', data.number);

        const url = `${BASE_API}/api/tables/`;
        const params = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Update table
export async function updateTableApi(id, data, token) {
    try {
        const formData = new FormData();
        formData.append('number', data.number);

        const url = `${BASE_API}/api/tables/${id}/`;
        const params = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Delete table
export async function deleteTableApi(id, token) {
    try {
        const url = `${BASE_API}/api/tables/${id}/`;
        const params = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Get table number
export async function getTableApi(id) {
    try {
        const url = `${BASE_API}/api/tables/${id}/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Get table by number
export async function getTableByNumberApi(tableNumber) {
    try {
        const tableFilter = `number=${tableNumber}`;

        const url = `${BASE_API}/api/tables/?${tableFilter}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}