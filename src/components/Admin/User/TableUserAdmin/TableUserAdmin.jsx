import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableUserAdmin.scss';

export function TableUserAdmin(props) {
    const { users, updateUser, onDeleteUser } = props;

    return (
        <Table className='table-users-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Usuario</Table.HeaderCell>
                    <Table.HeaderCell>Correo</Table.HeaderCell>
                    <Table.HeaderCell>Nombres</Table.HeaderCell>
                    <Table.HeaderCell>Apellidos</Table.HeaderCell>
                    <Table.HeaderCell>Activo</Table.HeaderCell>
                    <Table.HeaderCell>Staff</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(users, (user, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.first_name}</Table.Cell>
                        <Table.Cell>{user.last_name}</Table.Cell>
                        <Table.Cell>
                            {user.is_active ? <Icon name='check' color='green' /> : <Icon name='remove' color='red' />}
                        </Table.Cell>
                        <Table.Cell>
                            {user.is_staff ? <Icon name='check' color='green' /> : <Icon name='remove' color='red' />}
                        </Table.Cell>
                        <Actions user={user} updateUser={updateUser} onDeleteUser={onDeleteUser} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

function Actions(props) {
    const { user, updateUser, onDeleteUser } = props;

    return (
        <Table.Cell textAlign='right'>
            <Button color='yellow' icon onClick={() => updateUser(user)}>
                <Icon name='edit' />
            </Button>
            <Button icon negative onClick={() => onDeleteUser(user)}>
                <Icon name='trash' />
            </Button>
        </Table.Cell>
    );
}