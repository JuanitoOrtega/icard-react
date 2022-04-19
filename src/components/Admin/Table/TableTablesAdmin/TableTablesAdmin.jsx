import React, {useState } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import QRCode from 'qrcode.react';
import { ModalBasic } from '../../../Common';
import './TableTablesAdmin.scss';

export function TableTablesAdmin(props) {
    const { tables, updateTable, deleteTable } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openCloseModal = () => setShowModal(!showModal);

    const showQr = (table) => {
        const tableQr = `${window.location.origin}/client/${table.number}`;

        setContentModal(
            <div className='qr-code'>
                <QRCode value={tableQr} size={200} />
            </div>
        );
        openCloseModal();
    }

    return (
        <>
            <Table className='table-tables-admin'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Mesa</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {map(tables, (table, index) => (
                        <Table.Row key={table.id}>
                            <Table.Cell>Mesa: {table.number}</Table.Cell>
                            
                            <Actions
                                table={table}
                                updateTable={updateTable}
                                deleteTable={deleteTable}
                                showQr={showQr}
                            />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <ModalBasic
                title='Código QR'
                show={showModal}
                onClose={openCloseModal}
                size='mini'
                children={contentModal}
            />
        </>
    );
}

function Actions(props) {
    const { table, updateTable, deleteTable, showQr } = props;

    return (
        <Table.Cell textAlign='right'>
            <Button color='blue' icon onClick={() => showQr(table)}>
                <Icon name='qrcode' />
            </Button>
            
            <Button color='yellow' icon onClick={() => updateTable(table)}>
                <Icon name='edit' />
            </Button>

            <Button icon negative onClick={() => deleteTable(table)}>
                <Icon name='trash' />
            </Button>
        </Table.Cell>
    );
}