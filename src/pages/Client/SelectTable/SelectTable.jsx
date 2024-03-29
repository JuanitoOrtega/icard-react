import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useTable } from '../../../hooks';
import './SelectTable.scss';

export function SelectTable(props) {
    const { history } = props;
    const [tableNum, setTableNum] = useState(null);
    const [error, setError] = useState(null);
    const { isExistTable } = useTable();

    const onSubmit = async () => {
        setError(null);
        if (!tableNum) {
            setError('Debes ingresar el número de la mesa');
        } else {
            const exist = await isExistTable(tableNum);
            if (exist) history.push(`/client/${tableNum}`);
            else setError('El número de la mesa no existe');
        }
    }

    return (
        <div className='select-table'>
            <div className='select-table__content'>
                <h1>Bienvenido a Menú digital</h1>
                <h2>Ingresa tu número de mesa</h2>

                <Form onSubmit={onSubmit}>
                    <Form.Input
                        placeholder='Ejemplo: 135, 140, 145, 150'
                        type='number'
                        onChange={(_, data) => setTableNum(data.value)}
                    />

                    <Button primary fluid>
                        Entrar
                    </Button>
                </Form>

                <p className='select-table__content-error'>{error}</p>
            </div>
        </div>
    );
}
