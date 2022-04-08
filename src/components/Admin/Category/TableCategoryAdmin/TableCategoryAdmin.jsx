import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableCategoryAdmin.scss';

export function TableCategoryAdmin(props) {
    const { categories, updateCategory, deleteCategory } = props;

    return (
        <Table className='table-category-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Imagen</Table.HeaderCell>
                    <Table.HeaderCell>Categoría</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(categories, (category, index) => (
                    <Table.Row key={index}>
                        <Table.Cell width={3}>
                            <Image src={category.image} size='tiny' />
                        </Table.Cell>
                        <Table.Cell width={6}>
                            {category.title}
                        </Table.Cell>
                        <Actions
                            category={category}
                            updateCategory={updateCategory}
                            deleteCategory={deleteCategory}
                        />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

function Actions(props) {
    const { category, updateCategory, deleteCategory } = props;

    return (
        <Table.Cell textAlign='right' width={3}>
            <Button color='yellow' icon onClick={() => updateCategory(category)}>
                <Icon name='edit' />
            </Button>
            <Button icon negative onClick={() => deleteCategory(category)}>
                <Icon name='trash' />
            </Button>
        </Table.Cell>
    );
}