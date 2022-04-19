import React from 'react';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { useLocation, useHistory } from 'react-router-dom';
import './ListCategories.scss';

export function ListCategories(props) {
    const { categories } = props;
    const location = useLocation();
    const history = useHistory();
    // console.log(location);

    const goToCategory = (id) => {
        history.push(`${location.pathname}/${id}`);
    }

    return (
        <div className='list-categories-client'>
            {map(categories, (category) => (
                <div
                    className='list-categories-client__category'
                    key={category.id}
                    onClick={() => goToCategory(category.id)}
                >
                    <Image src={category.image} alt={category.title} size='small' rounded />
                    <span>{category.title}</span>
                </div>
            ))}
        </div>
    );
}