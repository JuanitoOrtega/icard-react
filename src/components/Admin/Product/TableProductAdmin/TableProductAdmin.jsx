import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableProductAdmin.scss';

export function TableProductAdmin(props) {
    const { products, updateProduct, deleteProduct } = props;

    return (
        <Table className='table-product-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Imagen</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Categoría</Table.HeaderCell>
                    <Table.HeaderCell>Activo</Table.HeaderCell>
                    <Table.HeaderCell>Precio</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(products, (product, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                            <Image src={product.image} size='tiny' rounded />
                        </Table.Cell>
                        <Table.Cell>
                            {product.title}
                        </Table.Cell>
                        <Table.Cell>
                            {product.category_data?.title || 'Sin categoría'}
                        </Table.Cell>
                        <Table.Cell className='status'>
                            {product.active ? <Icon name='check' color='green' /> : <Icon name='remove' color='red' />}
                        </Table.Cell>
                        <Table.Cell>
                            Bs. {product.price}
                        </Table.Cell>

                        <Actions
                            product={product}
                            updateProduct={updateProduct}
                            deleteProduct={deleteProduct}
                        />

                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

function Actions(props) {
    const { product, updateProduct, deleteProduct } = props;

    return (
        <Table.Cell textAlign='right'>
            <Button color='yellow' icon onClick={() => updateProduct(product)}>
                <Icon name='edit' />
            </Button>
            <Button icon negative onClick={() => deleteProduct(product)}>
                <Icon name='trash' />
            </Button>
        </Table.Cell>
    );
}