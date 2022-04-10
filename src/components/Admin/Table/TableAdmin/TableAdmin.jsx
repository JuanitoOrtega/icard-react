import React from 'react';
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react';
import { ReactComponent as ImgTable } from '../../../../assets/mesa.svg';
import './TableAdmin.scss';

export function TableAdmin(props) {
    const { table } = props;

    return (
        <div className='table-admin'>
            <ImgTable />
            <p>Mesa {table.number}</p>
        </div>
    );
}
