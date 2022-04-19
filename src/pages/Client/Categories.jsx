import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useCategory } from '../../hooks';
import { ListCategories } from '../../components/Client';

export function Categories() {
    const { loading, categories, getCategories } = useCategory();

    useEffect(() => getCategories(), []);

    // console.log(categories);
    
    return (
        <div>
            <h2>Categorías</h2>
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <ListCategories categories={categories} />
            )}
        </div>
    );
}