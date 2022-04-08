import { BASE_API } from '../utils/constants';

// Get all products
export async function getProductsApi() {
    try {
        const url = `${BASE_API}/api/products/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Add a new product
export async function addProductApi(data, token) {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('image', data.image);
        formData.append('active', data.active);

        const url = `${BASE_API}/api/products/`;
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

// Update a product
export async function updateProductApi(id, data, token) {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('price', data.price);

        if (data.image) {
            formData.append('image', data.image);
        }

        formData.append('active', data.active);

        const url = `${BASE_API}/api/products/${id}/`;
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

// Delete product
export async function deleteProductApi(id, token) {
    try {
        const url = `${BASE_API}/api/products/${id}/`;
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