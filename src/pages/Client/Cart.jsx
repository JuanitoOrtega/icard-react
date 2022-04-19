import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader, Button } from 'semantic-ui-react';
import { size } from 'lodash';
import { useProduct } from '../../hooks';
import { getProductsCart } from '../../api/cart';
import { ListProductsCart } from '../../components/Client';

export function Cart() {
    const [products, setProducts] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const { getProductById } = useProduct();
    const { tableNumber } = useParams();

    // console.log(useParams());
    // console.log(products);

    useEffect(() => {
        (async () => {
            const idProductsCart = await getProductsCart();

            const productsArray = [];
            for await (const idProduct of idProductsCart) {
                const response = await getProductById(idProduct);
                productsArray.push(response);
            }
            setProducts(productsArray);
        })();
    }, [reloadCart]);

    const onReloadCart = () => setReloadCart((prev) => !prev);
    
    return (
        <div>
            <h1>Carrito</h1>
            {!products ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : size(products) === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <p>Tu carrito está vacío</p>
                    <Link to={`/client/${tableNumber}/orders`}>
                        <Button primary>Ver pedidos</Button>
                    </Link>
                </div>
            ) : (
                <ListProductsCart products={products} onReloadCart={onReloadCart} />
            )}
        </div>
    );
}
