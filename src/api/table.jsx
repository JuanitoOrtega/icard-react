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