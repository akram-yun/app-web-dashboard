import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import userServices from 'services/userServices';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SimpleTable = ({ updated, setUpdated }) => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [message, setMessage] = React.useState('');
    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await userServices.getAll();
            setUsers(data);
        };
        fetchData();
        setUpdated(false);
    }, [updated]);
    useEffect(() => {}, [open]);

    const deleteUser = (confirm, id) => {
        if (confirm) {
            userServices
                .remove(id)
                .then((res) => {
                    setSeverity('success');
                    setMessage(res.data.message);
                    setOpen(true);
                    setUpdated(true);
                })
                .catch((e) => {
                    if (e.response.status == 403) {
                        setSeverity('error');
                        setMessage(e.response.data.message);
                        setOpen(true);
                    } else {
                        // enqueueSnackbar('une erreur est survenue,verifier les donnés saisis', { variant: 'error' });
                    }
                });
        }
    };
    const updateuser = (newData, id) => {
        userServices
            .update(id, newData)
            .then((res) => {
                if (res.status === 200) {
                    setSeverity('success');
                    setMessage(res.data.message);
                    setOpen(true);
                    setUpdated(true);
                } else if (res.status === 203) {
                    setSeverity('error');
                    setMessage(res.data.message);
                    setOpen(true);
                }
            })
            .catch((e) => {
                if (e.response.status == 403) {
                    // enqueueSnackbar(e.response.data.message, { variant: 'error' });
                } else {
                    // enqueueSnackbar('une erreur est survenue,verifier les donnés saisis', { variant: 'error' });
                }
            });
    };
    return (
        <>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <MaterialTable
                columns={[
                    { field: 'id', hidden: true },
                    { title: 'Email', field: 'email' },
                    { title: 'Nom', field: 'nom' },
                    { title: 'Prenom', field: 'prenom' },
                    { title: 'Role', field: 'role', lookup: { 1: 'Admin', 2: 'Utilisateur' } }
                ]}
                data={users}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                updateuser(newData, newData.id);

                                reject();
                            }, 1000);
                        })
                }}
                actions={[
                    (rowData) => ({
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteUser(confirm('You want to delete ' + rowData.email), rowData.id)
                        // disabled: rowData.birthYear < 2000
                    })
                ]}
                options={{
                    exportButton: true,
                    actionsColumnIndex: -1
                }}
            />
        </>
    );
};

export default SimpleTable;
