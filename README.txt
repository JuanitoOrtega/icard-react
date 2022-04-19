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

# Obtendremos cuántos pedidos tiene una mesa
-- Creamos archivo orders.py en la carpeta api
-- Creamos la función getOrdersByTableApi para obtener los pedidos de una mesa:

import { BASE_API } from '../utils/constants';

export async function getOrdersByTableApi(id, status = '', ordering = '') {
    try {
        const tableFilter = `table=${id}`;
        const statusFilter = `status=${status}`;
        const closeFilter = 'close=False';

        const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

-- Nos vamos a utils/constants.jsx y creamos constante ORDER_STATUS

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    DELIVERED: 'DELIVERED'
}

-- Vamos a utilizar la función getOrdersByTableApi directamente en nuestro componente TableAdmin.jsx, así que la importamos
-- Importamos también la constante ORDER_STATUS
-- También nos traemos useState, useEffect
-- Ejecutamos useEffect:

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(
                table.id,
                ORDER_STATUS.PENDING
            );
            console.log(table.id);
            console.log(response);
        })();
    }, []);

-- Ahora vamos a mostrar las mesas que tienen pedidos pendientes
-- Vamos a crear un nuevo estado de orders con un array vacío en TableAdmin para ver los pedidos que tiene una mesa

    const [orders, setOrders] = useState([]);

-- Incluímos nuestro setOrders en nuestra useEffect

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(
                table.id,
                ORDER_STATUS.PENDING
            );
            setOrders(response);
        })();
    }, []);

-- Importamos size de lodash, lo que hace size es contar cuantos elementos tiene nuestro array
-- También importamos Label de semantic
-- Anadimos en nuestro return

    {size(orders) > 0 ? (
        <Label circular color='orange'>{size(orders)}</Label>
    ) : null}

-- Instalamos librería classnames
npm install classnames

-- Importamos classNames de classnames
-- Modificamos nuestro <ImgTable... para añadirle la clase pending de forma condicional, solo para las mesas que tengan pedidos pendientes

    <ImgTable
        className={classNames({
            pending: size(orders) > 0
        })}
    />

-- Para mostrar las mesas ocupadas
-- Creamos un nuevo estado para mostrar las mesas ocupadas

    const [tableBusy, setTableBusy] = useState(false);

-- Creamos un nuevo useEffect

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(
                table.id,
                ORDER_STATUS.DELIVERED
            );
            if (size(response) > 0) setTableBusy(response);
            else setTableBusy(false);
        })();
    }, []);

-- Incluimos nuestro estado tableBusy en <ImgTable

    <ImgTable
        className={classNames({
            pending: size(orders) > 0,
            busy: tableBusy
        })}
    />

-- Para cargar la información de cada mesa
-- En pages/Admin creamos archivo TableDetailsAdmin.jsx
-- Importamos TableDetailsAdmin en routes.admin.jsx
-- Importamos Link en TableAdmin.jsx
-- Modificamos nuestro return

    <Link className='table-admin' to={`/admin/table/${table.id}`}>
        {size(orders) > 0 ? (
            <Label circular color='orange'>{size(orders)}</Label>
        ) : null}

        <ImgTable
            className={classNames({
                pending: size(orders) > 0,
                busy: tableBusy
            })}
        />
        <p>Mesa {table.number}</p>
    </Link>

-- Reload de mesas
-- En TablesListAdmin importamos el estado useState
-- Usamos nuestro useState para controlar el reload de las mesas

const [reload, setReload] = useState(false);

-- Creamos el controlador del estado

const onReload = () => setReload((prev) => !prev);

-- Se lo pasamos al onClick de <Button

    <Button primary icon className='tables-list-admin__reload' onClick={onReload}>
        <Icon name='refresh' />
    </Button>

-- Ahora modificamos <TableAdmin... incluyendo reload={reload} />
-- Importamos reload a través de los props en TableAdmin.jsx
-- Añadimos también el estado reload a los useEffect
-- En TablesListAdmin pasamos onReload al onClick del <Button

-- Ahora vamos a crear un nuevo estado para el auto reload en TablesListAdmin

    const [autoReload, setAutoReload] = useState(false);

-- Inportamos useEffect, useEffect se va ejecutar cada vez que autoReload cambie

    useEffect(() => {
        if (autoReload) {
            const autoReloadAction = () => {
                onReload();
                setTimeout(() => {
                    autoReloadAction();
                }, 5000);
            }
            autoReloadAction();
        }
    } , [autoReload]);

-- Creamos función onCheckAutoReload 

    const onCheckAutoReload = (check) => {
        if (check) {
            setAutoReload(true);
        } else {
            window.location.reload();
        }
    }

-- Se la pasamos al <Checkbox

<Checkbox toggle checked={autoReload} label='Reload automático' onChange={(_, data) => onCheckAutoReload(data.checked)} />

# Para obtener los pedidos de una mesa
-- Vamos a crear un nuevo hook llamado useOrder.jsx
-- Importamos useState y getOrdersByTableApi
-- Creamos función useOrder y los estados:

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);

-- Creamos nuestro useOrder
-- Ahora nos vamos a TableDetailsAdmin e importamos aquí useOrder, también importaos useEffect

const { loading, orders, getOrdersByTable } = useOrder();

-- También importamos useParams
-- Creamos nuestro useEffect y le pasamos getOrdersByTable con el id

    useEffect(() => {
        getOrdersByTable(id);
    }, []);

-- Vamos a cargar un loading y para ello importamos Loader de semantic
-- También importamos HeaderPage de los componentes

-- Crearemos un nuevo componente en components/Admin/TableDetails llamado ListOrderAdmin
-- Mediante los props vamos a recibir los pedidos

    const { orders } = props;

-- Importamos map de lodash

    return (
        <div className='list-orders-admin'>
            {map(orders, (order) => (
                <h2 key={order.id}>Pedido...</h2>
            ))}
        </div>
    );

-- Importamos ListOrderAdmin en TableDetailsAdmin

import { ListOrderAdmin } from '../../components/Admin/TableDetails';
    ...
    ...
    ...

    return (
        <>
            <HeaderPage title={`Mesa ****`} />
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <ListOrderAdmin orders={orders} />
            )}
        </>
    );
-- Creamos un nuevo componente en components/Admin/TableDetails llamado OrderItemAdmin
-- En ListOrderAdmin importamos nuestro componente recien creado OrderItemAdmin
-- Tambien llamamos a OrderItemAdmin dentro del iterados map

    <OrderItemAdmin key={order.id} order={order} />

-- Importamos los recursos de semantic en OrderItemAdmin
-- Nos traemos order a través del los props
-- Editamos nuestro return

    const { order } = props;
    console.log(order);
    const { title, image } = order.product_data;

    return (
        <div className='order-item-admin'>
            <div className='order-item-admin__time'>{order.created_at}</div>

            <div className='order-item-admin__product'>
                <Image src={image} size='tiny' rounded />
                <p>{title}</p>
            </div>
        </div>
    );

-- Ahora vamos a diferenciar entre los pedidos entregados y pendientes
-- Importamos classNames y editamos nuestro return

    return (
        <div
            className={classNames('order-item-admin', {
                [order.status.toLowerCase()] : true
            })}
        >
        ...

-- Agrupamos los pedidos entregados y pendientes en la vista pedidos
-- Modificamos nuestro useEffect en TableDetailsAdmin

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, []);

# Para formatear la fecha
-- Instalamos librería moment
npm install moment

-- En OrderItemAdmin importamos moment
-- Editamos dentro del return

    <div className='order-item-admin__time'>
        <span>{moment(order.created_at).format('HH:mm')}</span> {' - '}
        <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
    </div>

-- Para textos en español importamos: import 'moment/locale/es';

# Para marcar un pedido como entregado
-- Nos vamos a api/order.jsx y creamos la función checkDeliveredOrderApi
-- Nos vamos al hook useOrder e importamos nuestra función checkDeliveredOrderApi
-- En nuestro hook useOrder creamos la función checkDeliveredOrder
-- Importamos nuestro hook useOrder en OrderItemAdmin

    const { checkDeliveredOrder } = useOrder();

    const onCheckDeliveredOrder = async () => {
        try {
            await checkDeliveredOrder(order.id);
        } catch (error) {
            console.log(error);
        }
    }

-- Importamos nuestra función onCheckDeliveredOrder en el onClick de nuestro <Button...
-- Para recargar la lista importamos useState en TableDetailsAdmin

    const [reloadOrders, setReloadOrders] = useState(false);
    
    ...

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, [reloadOrders]);

    // console.log(orders);

    const onReloadOrders = () => setReloadOrders((prev) => !prev);

    return (
        <>
            ...
                <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
            ...

-- En OrderItemAdmin hacemos las siguientes modificaciones

    ...
    const { order, onReloadOrders } = props;
    // console.log(order);
    ...
    const onCheckDeliveredOrder = async () => {
        try {
            await checkDeliveredOrder(order.id);
            onReloadOrders();
        } catch (error) {
            console.log(error);
        }
    }

-- En ListOrderAdmin hacemos las siguientes modificaciones

    const { orders, onReloadOrders } = props;

    return (
        <div className='list-orders-admin'>
            {map(orders, (order) => (
                <OrderItemAdmin key={order.id} order={order} onReloadOrders={onReloadOrders} />
            ))}
        </div>
    );

-- Para obtener el número de mesa
-- Nos vamos a api/table.jsx y creamos la función getTableApi(id)
-- Nos vamos al hook useTable e importamos getTableApi
-- Creamos nuestros estados:

    const [table, setTable] = useState(null);

-- Creamos la siguiente función

    const getTable = async (id) => {
        try {
            setLoading(true);
            const response = await getTableApi(id);
            setLoading(false);
            setTable(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

-- Retornamos table y getTable

    return {
        loading,
        error,
        tables,
        table,
        getTables,
        addTable,
        updateTable,
        deleteTable,
        getTable
    };

-- Importamos nuestro hook useTable en TableDetailsAdmin
-- Recuperamos nuestro hook en TableDetailsAdmin

const { table, getTable } = useTable();

-- Modificamos nuestro useEffect y creamos otro

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, [id, reloadOrders]);

    useEffect(() => getTable(id), [id]);

-- Modificamos nuestro return

    return (
        <>
            <HeaderPage title={`Mesa ${table?.number || ''}`} />
            ...

# Añadir pedidos por parte del usuario cajero
-- En TableDetailsAdmin importamos ModalBasic
-- Añadimos un btnTitle="" para crear un botón
-- Creamos un estado para controlar el modal

    const [showModal, setShowModal] = useState(false);

-- Creamos función openCloseModal

    const openCloseModal = () => setShowModal((prev) => !prev);

-- Modificamos el HeaderPage y Añadimos <ModalBasic

    <HeaderPage title={`Mesa ${table?.number || ''}`} btnTitle='Añadir pedido' btnClick={openCloseModal} />
    ...
    <ModalBasic show={showModal} onClose={openCloseModal} title='Generar pedido'>
        <p>Contenido del modal...</p>
    </ModalBasic>

-- Creamos un nuevo componente llamado AddOrderForm dentro de components/Admin/Order
-- Importamos recursos de semantic
-- Creamos nuestro form

    <Form className='add-order-form'>
        <Dropdown placeholder='Productos' fluid selection search />

        <div className='add-order-form__list'>
            {/* For de productos seleccionados... */}
        </div>

        <Button type='submit' content='Añadir pedido' primary fluid />
    </Form>

-- Llamamos a nuestro form desde TableDetailsAdmin, para lo cual importamos AddOrderForm
-- Para mostrar los productos en el Dropdown importamos el hook useProduct en AddOrderForm
-- Importamos también { useState, useEffect } de react
-- Usamos nuestro useProduct y nos traemos products y getProducts
-- Creamos nuestro useEffect

    useEffect(() => getProducts(), []);

-- Creamos una función especial para formatear los datos para el Dropdown

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }));
}

-- Creamos un estado para controlar esta función

    const [productsFormat, setProductsFormat] = useState([]);

# Dropdown
-- Necesitamos importar useState y useEffect
-- Se necesita dar un formato especial a los datos para trabajar con el Dropdown
-- Creamos una función especial para esto:

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }));
}

-- Creamos nuestro estado para controlarlo

    const [productsFormat, setProductsFormat] = useState([]);

-- Lo integramos al Dropdown de la siguiente forma

<Dropdown placeholder='Productos' fluid selection search options={productsFormat} value={null} />

-- Añadimos formik y yup para validar nuestro form

import { useFormik } from 'formik';
import * as Yup from 'yup';

-- Creamos initialValues con un array vacío para products

function initialValues() {
    return {
        products: []
    };
}

-- Creamos función validationSchema

function validationSchema() {
    return {
        products: Yup.array().required(true)
    };
}

-- Creamos la función formik

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            console.log('Creando pedidos');
            console.log(formValue);
        }
    });

-- Añadimos formik a nuestro form
-- Para añadir productos y se cree un array con todos los productos añadidos
-- Vamos a escoger todos los productos que tengamos en el estado de products y hacemos un expres operator

onChange={(_, data) => formik.setFieldValue('products', [...formik.values.products, data.value])}

...formik.values.products // Esto nos devuelve el array de productos que tenemos ya creado
data.value // nos añade el array como nuevo value

// Con esto estamos diciendo, que nos saque todos los valores que tengamos en el estado de products y que nos lo setee al nuevo valor data.value

# Listando los productos seleccionados
-- Creamos un nuevo estado para controlar los productos listados

    const [productsData, setProductsData] = useState([]);

-- Creamos una función llamada addProductList
-- Creamos un useEffect

    useEffect(() => addProductList(), [formik.values]);

-- Creamos una nueva función en api/product.jsx para obtener un producto por id, función llamada getProductByIdApi
-- Importamos la función en nuestro hook de product y creamos otra función llamada getProductById
-- Nos vamos a AddOrderForm e importamos nuestra función getProductById en nuestro hook useProduct

# Para crear la lógica que añadirá un pedido
-- Creamos una función para ello en el archivo api/order.jsx llamada addOrderToTableApi
-- Nos vamos a nuestro useOrder e importamos la función creada addOrderToTableApi y creamos la función addOrderToTable
-- Nos vamos a nuestro AddOrderForm e importamos nuestro hook useOrder

# Vamos a crear la opción de pedir la cuenta desde administración

# Creando la cuenta de la mesa
-- Vamos a crear el archivo api/payment.jsx, creamos aquí la función createPaymentApi
-- Creamos nuestro hook usePayment.jsx, aquí importamos createPaymentApi

# Asociar un pago a un pedido
-- Nos vamos a api/order.jsx y creamos la función addPaymentToOrderApi que asocie un pago a una orden
-- Nos vamos al hook useOrder e importamos la función addPaymentToOrderApi

# Instalamos librería para generar QR para cada mesa
npm i qrcode.react