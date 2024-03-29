import { useState } from 'react';
import { getProductsApi, addProductApi, updateProductApi, deleteProductApi, getProductByIdApi, getProductsByCategoryApi } from '../api/product';
import { useAuth } from "./useAuth";

export function useProduct() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);
    const { auth } = useAuth();

    // Get all products
    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await getProductsApi();
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    // Add a new product
    const addProduct = async (data) => {
        try {
            setLoading(true);
            await addProductApi(data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Update a product
    const updateProduct = async (id, data) => {
        try {
            setLoading(true);
            await updateProductApi(id, data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await deleteProductApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Get a product by id
    const getProductById = async (id) => {
        try {
            setLoading(true);
            const product = await getProductByIdApi(id);
            setLoading(false);
            return product;
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Get products by category
    const getProductsByCategory = async (idCategory) => {
        try {
            setLoading(true);
            const response = await getProductsByCategoryApi(idCategory);
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory
    };
}