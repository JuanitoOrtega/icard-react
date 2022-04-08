import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableUserAdmin, AddEditUserForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useUser } from "../../hooks";

export function UsersAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, users, getUsers, deleteUser } = useUser();

    useEffect(() => getUsers(), [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev); // Refetch para actualizar la tabla

    const addUser = () => {
        setTitleModal("Crear usuario");
        setContentModal(
            <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
    };

    // Función para actualizar usuario
    const updateUser = (data) => {
        setTitleModal("Actualizar usuario");
        setContentModal(
            <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} user={data} />
        );
        openCloseModal();
    };

    // Función para eliminar usuario
    const onDeleteUser = async (data) => {
        const result = window.confirm(`¿Está seguro que desea eliminar el usuario: ${data.username}?`);
        if (result) {
            try {
                await deleteUser(data.id);
                onRefetch();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <HeaderPage
                title="Usuarios"
                btnTitle="Crear usuario"
                btnClick={addUser}
            />
            {loading ? (
                <Loader active inline="centered">
                Cargando...
                </Loader>
            ) : (
                <TableUserAdmin users={users} updateUser={updateUser} onDeleteUser={onDeleteUser} />
            )}

            <ModalBasic
                show={showModal}
                onClose={openCloseModal}
                title={titleModal}
                children={contentModal}
            />
        </>
    );
}
