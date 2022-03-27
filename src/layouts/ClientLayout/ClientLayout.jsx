import React from 'react';
import './ClientLayout.scss';

export function ClientLayout(props) {
    // El children es el contenido que tiene nuestro layout
    const { children } = props;
    return (
        <div>
            <p>ClientLayout</p>

            {children}
        </div>
    );
}
