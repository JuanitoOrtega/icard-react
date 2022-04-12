import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks";
import "./AddEditUserForm.scss";

export function AddEditUserForm(props) {
    const { onClose, onRefetch, user } = props;
    const { addUser, updateUser } = useUser();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? updateSchema() : validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (user) {
                    await updateUser(user.id, formValue);
                } else {
                    await addUser(formValue);
                }
                onRefetch();
                onClose();
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
        <Form.Input
            name="username"
            type="text"
            iconPosition="left"
            icon="user"
            placeholder="Nombre de usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.errors.username}
        />
        <Form.Input
            name="email"
            type="email"
            iconPosition='left'
            icon='at'
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
        />
        <Form.Input
            name="first_name"
            type="text"
            iconPosition='left'
            icon='address book'
            placeholder="Nombre"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.errors.first_name}
        />
        <Form.Input
            name="last_name"
            type="text"
            iconPosition='left'
            icon='address book outline'
            placeholder="Apellidos"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.errors.last_name}
        />
        <Form.Input
            name="password"
            type="password"
            iconPosition="left"
            icon="lock"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
        />

        <div className="add-edit-user-form__active">
            <Checkbox
                toggle
                label="Usuario activo"
                checked={formik.values.is_active}
                onChange={(_, data) => formik.setFieldValue("is_active", data.checked)}
            />
        </div>

        <div className="add-edit-user-form__staff">
            <Checkbox
                toggle
                checked={formik.values.is_staff}
                onChange={(_, data) =>
                    formik.setFieldValue("is_staff", data.checked)
                }
                label="Usuario administrador"
            />
        </div>
        <Button primary fluid type="submit" content={user ? "Actualizar usuario" : "Crear usuario"} />
        </Form>
    );
}

function initialValues(data) {
    return {
        username: data?.username || "",
        email: data?.email || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        password: "",
        is_active: data?.is_active || false,
        is_staff: data?.is_staff || false
    };
}

function validationSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string().required(true),
        is_active: Yup.bool(),
        is_staff: Yup.bool()
    };
}

function updateSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string(),
        is_active: Yup.bool(),
        is_staff: Yup.bool()
    };
}