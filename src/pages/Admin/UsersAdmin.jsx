import React, { useEffect } from 'react';
import { useUser } from '../../hooks';

export function UsersAdmin() {
    const { loading, users, getUsers } = useUser();

    useEffect(() => getUsers(), []);

    return (
        <div>
            <h1>Estamos en Users Admin</h1>
        </div>
    );
}
