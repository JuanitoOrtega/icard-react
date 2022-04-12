import React, { useState, useEffect, useCallback } from 'react';
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { map } from 'lodash';
import { useCategory, useProduct } from '../../../../hooks';
import './AddEditProductForm.scss';

export function AddEditProductForm(props) {
    const { onClose, onRefetch, product } = props;
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(product ? product?.image : null);
    const { categories, getCategories } = useCategory();
    const { addProduct, updateProduct } = useProduct();

    // console.log(product);

    useEffect(() => getCategories(), []);
    useEffect(() => {
        setCategoriesFormat(formatDropdownData(categories));
    }, [categories]);

    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(product ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            if (product) {
                await updateProduct(product.id, formValue);
            } else {
                await addProduct(formValue);
            }
            onRefetch();
            onClose();
        }
    });

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        await formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    return (
        <Form className='add-edit-product-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                name='title'
                type='text'
                iconPosition='left'
                icon='box'
                placeholder='Nombre del producto'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />

            <Dropdown
                placeholder='Categoría'
                fluid
                selection
                search
                options={categoriesFormat}
                value={formik.values.category}
                error={formik.errors.category}
                onChange={(_, data) => formik.setFieldValue('category', data.value)}
            />
            
            <Form.Input
                type='number'
                name='price'
                iconPosition='left'
                icon='dollar'
                placeholder='Precio'
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.errors.price}
            />

            <Button fluid type='button' color={formik.errors.image && 'red'} {...getRootProps()}>
                {previewImage ? 'Cambiar imagen' : 'Subir imagen'}
            </Button>
            <input {...getInputProps()} />
            <Image src={previewImage} size='small' centered rounded />

            <div className="add-edit-product-form__active">
                <Checkbox
                    toggle
                    label="Producto activo"
                    checked={formik.values.active}
                    onChange={(_, data) => formik.setFieldValue('active', data.checked)}
                />
            </div>

            <Button
                primary
                fluid
                type='submit'
                content={product ? 'Actualizar producto' : 'Crear producto'}
            />
        </Form>
    );
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }));
}

// Validación
function initialValues(data) {
    return {
        title: data?.title || '',
        category: data?.category || '',
        price: data?.price || '',
        image: '',
        active: data?.active || false
    };
}

function newSchema() {
    return {
        title: Yup.string().required(true),
        category: Yup.number().required(true),
        price: Yup.number().required(true),
        image: Yup.string().required(true),
        active: Yup.boolean()
    };
}

function updateSchema() {
    return {
        title: Yup.string().required(true),
        category: Yup.number().required(true),
        price: Yup.number().required(true),
        image: Yup.string(),
        active: Yup.boolean().required(true)
    };
}