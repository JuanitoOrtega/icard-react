# Creamos nuestro proyecto react
npx create-react-app icard_react

# Lanzamos el servidor
npm start

# Dependencia para crear nuestro dashboard y el modo responsivo
# https://react.semantic-ui.com/
npm install semantic-ui-react semantic-ui-css

# Para trabajar con sass instalamos la dependencia
npm install sass

# Instalamos dependencia para el manejo de nuestras rutas
# https://v5.reactrouter.com/web/guides/quick-start
npm install react-router-dom@5

# Instalamos dependencia lodash para acceder a funciones y modulos
npm install lodash

# Instalamos librerías formik y yup para validación de formularios
npm install formik yup

# Instalamos un paquete para mostrar notificaciones
npm install react-toastify

# Instalamos paquete para controlar las categorías con las imágenes
npm install react-dropzone

# Para crear lógica
- Primero en la API
- Luego en el hook
- En el componente

# Añadir página de vista de productos
- En src/pages/Admin creamos el archivo ProductAdmin.js
-- Importamos HeaderPage
- Añadimos la página a nuestro sistema de rutas en el archivo routes.admin.jsx

# Para mostrar elementos de la API
-- Primero: en la carpeta api creamos product.jsx
-- Segundo: en la carpeta hooks creamos useProduct.jsx
-- Tercero: trabajamos en el archivo ProductsAdmin.jsx en pages/Admin
-- Cuarto: en la carpeta components/Admin creamos la carpeta Product/TableProductAdmin/TableProductAdmin.jsx
-- Quinto: volvemos al archivo ProductsAdmin.jsx e importamos TableProductAdmin.jsx
-- Secto: en TableProductAdmin.jsx le pasamos los props de Products

# Crear el formulario para crear productos
-- En components/Admin/Product/ creamos la carpeta AddEditProductForm y dentro creamos el archivo AddEditProductForm.jsx
-- En el archivo ProductsAdmin.jsx importamos ModalBasic
-- Creamos los estados (useState) para importarlos en ProductsAdmin.jsx
-- En ProductsAdmin.jsx importamos AddEditProductForm
-- Creamos el formulario para añadir/editar productos

# Para añadir selección de categorías al añadir un producto
-- En AddEditProductForm.jsx importamos el hook de useCategory y el useEffect

# Para subir imágenes
-- Importamos useDropzone
-- Creamos constante llamada onDrop
-- Usamos la función useDropzone asignandole un objeto {getRootProps, getInputProps}

# Para validar formulario
-- En AddEditProductForm.jsx importamos useFormik y yup
-- Creamos función formik, initialValues y newSchema

# Para crear la lógica para añadir nuevos productos
-- En el archivo api/product.jsx creamos la función addProductApi
-- En el hook useProduct importamos la función addProductApi, useAuth y creamos la función addProduct
-- En el archivo AddEditProductForm importamos el hook useProduct y lo introducimos a la función formik

# Para actualizar la lista de productos despues de crear uno nuevos
-- En AddEditProductForm nos traemos los props, onClose
-- Incluímos la función onClose() dentro de la función formik
-- En el archivo ProductsAdmin.jsx creamos: const [refetch, setRefetch] = useState(false);
-- Incluímos refetch dentro del array de useEffect
-- Creamos una función onRefetch que se ocupe de modificiar el estado e incluímos esta función en: <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
-- Nos vamos a AddEditProductForm y recuperamos el estado onRefetch y lo ejecutamos dentro de formik, antes de onClose();

# Para actualizar un producto
-- En el archivo ProductsAdmin.jsx creamos la función updateProduct pasandole como parámetro data o product y pasamos esta función al TableProductAdmin
-- En TableProductAdmin recuperamos en los props updateProduct y también se lo pasamos a los Actions
-- Importamos los props a la función Actions() y nos traemos product y updateProduct
-- Finalmente integramos la función updateProduct(product); a la función Actions()
-- En el archivo AddEditProductForm.jsx dentro de los props nos traemos product
-- Editamos: [previewImage, setPreviewImage] = useState(null);
-- A la función initialValues que está dentro de la función formik le incluímos el parámetro product: initialValues(product)
-- Donde se declara la función initialValues, incorporamos el parámetro data y modificamos el return: 
-- En AddEditProductForm.jsx creamos la función updateSchema

# Lógica para actualizar productos
-- Creamos la función updateProductApi(id, data, token) en el archivo api/product.jsx, con los parámetros id, data y token
-- En nuestro hook useProduct importamos updateProductApi, creamos la función updateProduct
-- Usamos las 2 funciones anteriores en nuestro formulario AddEditProductForm, usamos updateProduct en los props
-- Llamamos a la función updateProduct() en onSubmit que está dentro de la función formik

# Eliminar un producto
-- En el archivo ProductsAdmin.jsx creamos la función onDeleteProduct luego la importamos en <TableProductAdmin
-- En el archivo TableProductAdmin.jsx dentro de los props traemos a deleteProduct y se la pasamos a los Actions y la recuperamos en la función Actions

# Lógica para eliminar un producto
-- En el archivo api/product.jsx creamos la función deleteProductApi
-- Ahora nos vamos a nuestros hooks e importamos deleteProductApi dentro de useProduct.jsx
-- En useProduct.jsx creamos una función flecha y le asignamos la constante deleteProduct, luego retornamos esta función en return
-- Vamos a ProductsAdmin.jsx y dentro de los props recuperamos deleteProduct, luego ejecutamos esta función en onDeleteProduct, convirtiendo la función en asincrónica

## NUEVA APP TABLES
-- Dentro de pages/Admin creamos el archivo TablesAdmin.jsx
-- Nos vamos al routes.admin.jsx e importamos la ruta

# Creamos el fichero table.jsx dentro de la carpeta api
-- Creamos la función getTablesApi() para traernos todas las mesas

# Creamos nuestro hook
-- En la carpeta hooks creamos el archivo useTable.jsx, importamos useState, getTablesApi, useAuth
-- Creamos nuestro useTable(), dentro nos traemos todos nuestros useState:

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState(null);
    const { auth } = useAuth();

-- Creamos nuestra función para traernos todas las mesas, getTables()

# Volvemos a nuestro archivo pages/Admin/TablesAdmin.jsx
-- En TablesAdmin.jsx importamos nuestro hook useTable
-- También nos traemos de React el useEffect

import React, { useEffect } from 'react';
import { HeaderPage } from '../../components/Admin';
import { useTable } from '../../hooks';

export function TablesAdmin() {
    const { loading, tables, getTables } = useTable();

    useEffect(() => {
        getTables();
    }, []);

    console.log(tables);

    return (
        <>
            <HeaderPage title='Mesas' btnTitle='Crear mesa' />
        </>
    );
}

-- De semantic nos traemos el Loader

# Para imprimir la vista de mesas, creamos la carpeta Tables dentro de components/Admin
-- En components/Admin/Tables creamos el fichero TableTablesAdmin.jsx
-- Volvemos a TablesAdmin.jsx e importamos nuestro componente TableTablesAdmin
-- Dentro del loading nos traemos TableTablesAdmin:

    {loading ? (
        <Loader active inline="centered">
            Cargando mesas...
        </Loader>
    ) : (
        <TableTablesAdmin tables={tables} />
    )}

-- En el archivo TableTablesAdmin.jsx importamos los recursos de semantic y map de lodash
-- Recuperamos los props, tayendonos tables
-- Creamos la función Actions(props), dentro de los props recuperamos table

# Formulario para crear mesas
-- En el archivo TablesAdmin.jsx importamos useState y recuperamos todos nuestros useState

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

-- Creamos función openCloseModal para abrir y cerrar modal
-- Creamos función addTable para lanzar modal
-- Dentro de addTable ejecutamos openCloseModal
-- En el HeaderPage le pasamos la función addTable para lanzar el modal
-- Finalmente importamos el componente ModalBasic
-- Dentro del return recuperamos ModalBasic:

    <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
    />

# Crear formulario para añadir y editar mesas
-- Dentro de components/Admin/Table creamos la carpeta AddEditTableForm
-- En TablesAdmin importamos AddEditTableForm
-- En addTable, dentro de setContentModal recuperamlos AddEditTableForm
-- Nos vamos al formulario AddEditTableForm e importamos los recursos de semantic, useFormik y yup:

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

-- Recuperamos también los props con la función onClose
-- Creamos el formulario:
        
        <Form className='add-edit-table-form'>
            <Form.Input name='number' type='number' placeholder='Número de la mesa' />

            <Button primary fluid type='submit' content='Crear mesa' />
        </Form>

-- Creamos la función initialValues()

function initialValues() {
    return {
        number: ''
    };
}

-- Creamos la función validationSchema()

function validationSchema() {
    return {
        number: Yup.number().required(true)
    };
}

-- Creamos la constante formik para usar el useFormik y dentro de ésta llamamos a las funciones creadas anteriormente:

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            console.log('Enviando formulario');
            console.log(formValue);
        }
    });

-- Agregamos las validaciones al formulario:

        <Form className='add-edit-table-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                name='number'
                type='number'
                placeholder='Número de la mesa'
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.errors.number}
            />

            <Button primary fluid type='submit' content='Crear mesa' />
        </Form>

# Creamos la lógica para añadir nuevas mesas
-- En el archivo api/table.jsx creamos la función para añadir mesas addTableApi
-- Creamos el hook para añadir mesas, editamos el archivo useTable.jsx, importamos addTableApi
-- Creamos la función addTable y la retornamos.
-- Nos vamos al formulario AddEditTableForm.jsx e importamos nuestro hook useTable
-- Usamos nuestro useTable en la función AddEditTableForm y nos traemos addTable
-- En la función formik recuperamos addTable(formValue) y onClose para cerrar el modal después de crear una nueva mesa:

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            await addTable(formValue);
            onClose();
        }
    });

-- Para actualizar nuestra tabla cada vez que creemos una nueva mesa, nos vamos al archivo TablesAdmin.jsx
-- Integramos nuestro useState(false) con refetch y setRefetch
-- Cada vez que refetch se actualice, también se vuelva a actualizar la consulta a la base de datos, ejecutamos refetch en nuestro useEffect

    useEffect(() => {
        getTables();
    }, [refetch]);

-- Creamos la función para que actualice el estado de refetch

const onRefetch = () => setRefetch((prev) => !prev);

-- Ahora integramos onRefetch a AddEditTableForm

    const addTable = () => {
        setTitleModal('Agregar mesa');
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

-- Finalmente nuestro onRefetch lo recuperamos en los props de AddEditTableForm.jsx
-- Ejecutamos onRefetch antes de cerrar el modal

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            await addTable(formValue);
            onRefetch();
            onClose();
        }
    });

# Para actualizar una mesa
-- Nos vamos a TablesAdmin.jsx y creamos la función updateTable donde le pasamos data

    const updateTable = (data) => {
        setTitleModal('Actualizar mesa');
        setContentModal(
            <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} table={data} />
        );
        openCloseModal();
    }

-- La función updateTable se la mandamos por props a <TableTablesAdmin

    {loading ? (
        <Loader active inline="centered">
            Cargando mesas...
        </Loader>
    ) : (
        <TableTablesAdmin tables={tables} updateTable={updateTable} />
    )}

-- Recuperamos updateTable en los props de TableTablesAdmin.jsx
-- Mediante props se lo enviamos a los Actions

<Actions table={table} updateTable={updateTable} />

-- Se lo pasamos a la función Actions(props)

    <Button color='yellow' icon onClick={() => updateTable(table)}>
        <Icon name='edit' />
    </Button>

-- En TablesAdmin.jsx en <AddEditTableForm la tabla nos está llegando como table

    const updateTable = (data) => {
        setTitleModal('Actualizar mesa');
        setContentModal(
            <AddEditTableForm
                onClose={openCloseModal}
                onRefetch={onRefetch}
                table={data}
            />
        );
        openCloseModal();
    }

-- Llamamos a table dentro de los props de AddEditTableForm.jsx

export function AddEditTableForm(props) {
    const { onClose, onRefetch, table } = props;
    const { addTable } = useTable();
    ...

-- Al initialValues le pasamos table, así: 

    const formik = useFormik({
        initialValues: initialValues(table),
        ...

-- Nos vamos hasta donde se crea la función initialValues y le pasamos data:

function initialValues(data) {
    return {
        number: data?.number || ''
    };
}

-- Nos vamos al <Button y actualizamos el content de esta manera: content={table ? 'Actualizar mesa' : 'Crear mesa'}

-- Nos vamos a la función onSubmit y le añadimos un condicional para actualizar o crear una nueva mesa:

    onSubmit: async (formValue) => {
        if (table) console.log('Actualizando mesa');
        else await addTable(formValue);
        
        onRefetch();
        onClose();
    }

-- En el archivo api/table.jsx creamos la función updateTableApi
-- En nuestro hook useTable, importamos updateTableApi y creamos la función updateTable, la ejecutamos en return
-- Nos vamos a nuestro AddEditTableForm.jsx e importamos la función updateTable dentro de nuestro useTable:

const { addTable, updateTable } = useTable();

-- Nuevamente editamos nuestra función onSubmit para integrar updateTable:

    onSubmit: async (formValue) => {
        if (table) await updateTable(table.id, formValue);
        else await addTable(formValue);

        onRefetch();
        onClose();
    }

# Para eliminar una mesa
-- En el archivo TablesAdmin.jsx vamos a crear la función onDeleteTable para eliminar una mesa, le enviamos data para la información de la mesa:

    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar la mesa: ${data.number}?`);
        if (result) {
            console.log('Eliminado');
        }
    }

-- Le pasamos esta función a <TableTablesAdmin...

    <TableTablesAdmin
        tables={tables}
        updateTable={updateTable}
        deleteTable={onDeleteTable}
    />

-- De <TableTablesAdmin le pasamos deleteTable a los props de TableTablesAdmin.jsx
-- Tamien pasamos deleteTable a los Actions de TableTablesAdmin.jsx

<Actions table={table} updateTable={updateTable} deleteTable={deleteTable} />

-- Se lo pasamos finalmente a los props de la función Actions(props)

    <Button icon negative onClick={() => deleteTable(table)}>
        <Icon name='trash' />
    </Button>

-- Ahora creamos la lógica para eliminar una mesa
-- En la carpeta api, dentro del archivo table.jsx creamos la función deleteTableApi
-- Nos vamos a nuestro hook useTable.jsx e importamos deleteTableApi
-- Creamos la función deleteTable y la retornamos
-- Ejecutamos nuestro deleteTable en nuestro hook useTable dentro de TablesAdmin.jsx

    const { loading, tables, getTables, deleteTable } = useTable();

-- Ejecutamos deleteTable(data.id) dentro de la función onDeleteTable, ejecutamos también onRefetch para actualizar la lista después de eliminar una mesa:

    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar la mesa: ${data.number}?`);
        if (result) {
            await deleteTable(data.id);
            onRefetch();
        }
    }

##### Añadiendo vista de pedidos
-- En pages/Admin cambiamos de nombre HomeAdmin.jsx a OrdersAdmin.jsx
-- Renombramos también el nombre de la función a OrdersAdmin()
-- Actualizamos también nuestro archivo routes.admin.jsx
-- Editamos el archivo OrdersAdmin.jsx e importamos nuestro HeaderPage

        <>
            <HeaderPage title='Restaurante' />
        </>

-- Importamos nuestro useTable en OrdersAdmin
-- Recuperamos nuestro useTable con loading, tables, getTables
-- Importamos también nuestro useEffect para poder ejecutar la petición: useEffect(() => getTables(), []);
-- Nos importamos el Loader de semantic

# Para listar todas las mesas
-- Creamos un nuevo componente dentro de components/Admin llamado TablesListAdmin/TablesListAdmin.jsx, TablesListAdmin.scss y index.jsx
-- Importamos nuestro componente TablesListAdmin en OrdersAdmin.jsx
-- Recuperamos también TablesListAdmin dentro de nuestro loading con la función tables={tables}: <TablesListAdmin tables={tables} />
-- Volvemos a TablesListAdmin y recuperamos nuestros props trayendonos tables:

export function TablesListAdmin(props) {
    const { tables } = props;
    ...

-- Importamos los recursos de semantic
-- Importamos map de lodash
-- También importamos nuestra imagen svg, de esta manera: import { ReactComponent as ImgTable } from '../../../../assets/mesa.svg';
-- Editamos nuestro return:

        <div className='tables-list-admin'>
            {map(tables, (table) => (
                <h2>Mesa</h2>
            ))}
        </div>

-- Ahora creamos otro componente en components/Admin/Table llamado Table
-- Editamos TablesListAdmin.jsx e importamos TablesAdmin, lo recuperamos también dentro del map y le pasamos también el table: <TableAdmin key={table.number} table={table} />
-- Nos vamos a TableAdmin.jsx, recuperamos los props con table que viene desde TablesListAdmin dentro de <TableAdmin
-- Cortamos los recursos de semantic que se encuentran en TablesListAdmin y los pegamos en TableAdmin

import { Label, Button, Icon, Checkbox } from 'semantic-ui-react';

-- Hacemos lo mismo, cortamos y lo pegamos en TableAdmin

import { ReactComponent as ImgTable } from '../../../../assets/mesa.svg';

-- Dentro del return, creamos nuestro html para las mesas

        <div className='table-admin'>
            <ImgTable />
            <p>Mesa {table.number}</p>
        </div>

-- En TablesListAdmin.jsx importamos los recursos de semantic, e integramos <Button...

        <Button primary icon className='table-list-admin__reload' onClick={() => console.log('onRefetch')}>
            <Icon name='refresh' />
        </Button>

-- Vamos a añadir un toggle para añadir peticiones automáticas