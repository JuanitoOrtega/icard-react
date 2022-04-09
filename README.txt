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