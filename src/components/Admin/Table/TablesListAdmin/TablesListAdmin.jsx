import React from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import { map } from 'lodash';
import { TableAdmin } from '../TableAdmin';
import './TablesListAdmin.scss';

export function TablesListAdmin(props) {
    const { tables } = props;

    return (
        <div className='tables-list-admin'>
            <Button primary icon className='tables-list-admin__reload' onClick={() => console.log('onRefetch')}>
                <Icon name='refresh' />
            </Button>

            <div className='tables-list-admin__reload-toggle'>
                <Checkbox toggle label='Reload automático' onChange={(_, data) => console.log(data.checked)} />
            </div>

            {map(tables, (table) => (
                <TableAdmin key={table.number} table={table} />
            ))}
        </div>
    );
}
