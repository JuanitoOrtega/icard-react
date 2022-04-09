import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableTablesAdmin.scss';

export function TableTablesAdmin(props) {
    const { tables } = props;

    return (
        <Table className='table-tables-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Mesa</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(tables, (table, index) => (
                    <Table.Row key={table.id}>
                        <Table.Cell>Mesa: {table.number}</Table.Cell>
                        <Actions table={table} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

function Actions(props) {
    const { table } = props;

    return (
        <Table.Cell textAlign='right' width={3}>
            <Button color='yellow' icon onClick={() => console.log('Editar mesa')}>
                <Icon name='edit' />
            </Button>
            <Button icon negative onClick={() => console.log('Eliminar mesa')}>
                <Icon name='trash' />
            </Button>
        </Table.Cell>
    );
}