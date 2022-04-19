import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { useProduct } from '../../hooks';
import { ListProducts } from '../../components/Client';

export function Products() {
    const { tableNumber, idCategory } = useParams();
    const { loading, products, getProductsByCategory } = useProduct();
    // console.log(useParams());

    useEffect(() => getProductsByCategory(idCategory), [idCategory]);
    
    // console.log(products);

    return (
        <div>
            <Link to={`/client/${tableNumber}`}>Volver atrás</Link>
            
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <ListProducts products={products} />
            )}
        </div>
    );
}
