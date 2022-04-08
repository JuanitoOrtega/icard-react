import { useState } from "react";
import { getCategoriesApi, addCategoryApi, updateCategoryApi, deleteCategoryApi } from "../api/category";
import { useAuth } from "./useAuth";

export function useCategory() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(null);
    const { auth } = useAuth();

    // Get all categories
    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategoriesApi();
            setLoading(false);
            setCategories(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Add a new category
    const addCategory = async (data) => {
        try {
            setLoading(true);
            await addCategoryApi(data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Update a category
    const updateCategory = async (id, data) => {
        try {
            setLoading(true);
            await updateCategoryApi(id, data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Delete a category
    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            await deleteCategoryApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        loading,
        error,
        categories,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    }
}