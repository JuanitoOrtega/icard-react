import React, { useState, useEffect } from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { map, forEach } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { useOrder, useTable } from '../../../hooks';
import { removeProductCartApi, cleanProductCartApi } from '../../../api/cart';
import './ListProductsCart.scss';

export function ListProductsCart(props) {
    const { products, onReloadCart } = props;
    const [total, setTotal] = useState(0);
    const { addOrderToTable } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();
    const history = useHistory();

    // console.log(useParams());

    useEffect(() => {
        let totalTemp = 0;
        forEach(products, (product) => {
            totalTemp += Number(product.price);
        });
        setTotal(totalTemp.toFixed(2));
    }, [products]);

    const removeProduct = (index) => {
        removeProductCartApi(index);
        onReloadCart();
    }

    const createOrder = async () => {
        const tableData = await getTableByNumber(tableNumber);
        const idTable = tableData[0].id;

        for await (const product of products) {
            await addOrderToTable(idTable, product.id);
        }

        cleanProductCartApi();
        history.push(`/client/${tableNumber}/orders`);
    }

    return (
        <div className='list-products-cart'>
            {map(products, (product, index) => (
                <div key={index} className='list-products-cart__product'>
                    <div>
                        <Image src={product.image} avatar />
                        <span>{product.title.substring(0, 15)}</span>
                    </div>
                    <span>Bs. {product.price}</span>
                    <Icon name='remove' onClick={() => removeProduct(index)} />
                </div>
            ))}

            <Button primary fluid onClick={createOrder}>
                Realizar pedido (Bs. {total})
            </Button>
        </div>
    );
}
