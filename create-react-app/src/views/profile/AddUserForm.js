import {
    Button,
    Icon,
    FormControl,
    Grid,
    InputLabel,
    FormHelperText,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import { Span } from 'themes/typography';
import React, { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as Yup from 'yup';
import * as axios from 'axios';
import { Formik, useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import userServices from 'services/userServices';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthUser from '../../views/pages/authentication/auth-forms/AuthUser';

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px'
}));
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SimpleForm = ({ nom, prenom, email, role, roleId, id_user }) => {
    const theme = useTheme();
    const { logout } = AuthUser();
    // const { enqueueSnackbar } = useSnackbar();
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [message, setMessage] = React.useState('');
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required("L'email est requis"),
        Nom: Yup.string().required('Le nom est requis'),
        prenom: Yup.string().required('Le prénom est requis')
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        const fetchDatarole = async () => {
            const data = await userServices.getAllRole();
            data && data.map((item, i) => setRoles(data));
        };
        fetchDatarole();
    }, []);
    const initialValues = {
        email: email,
        Nom: nom,
        prenom: prenom
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        values.nom = values.Nom;
        values.role = roleId;
        // enqueueSnackbar('hi');
        userServices
            .update(id_user, values)
            .then((res) => {
                if (res.status === 200) {
                    setSeverity('success');
                    setMessage(res.data.message);
                    setOpen(true);
                } else if (res.status === 203) {
                    setSeverity('error');
                    setMessage(res.data.message);
                    setOpen(true);
                }
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    // enqueueSnackbar(e.response.data.message, { variant: 'error' });
                } else {
                    setSeverity('error');
                    setMessage('une erreur est survenue');
                    setOpen(true);
                }
            });
    };
    if (!email) {
        return false;
    } else
        return (
            <div>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <ValidatorForm onSubmit={handleSubmit}>
                            <Grid container spacing={6}>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 2, width: '80%' }}>
                                        <InputLabel htmlFor="outlined-adornment-email-login">Email Address </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email-login"
                                            type="email"
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            label="Email Address"
                                            inputProps={{}}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                        {errors.submit && (
                                            <Box sx={{ mt: 0.5 }}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Box>
                                        )}
                                    </FormControl>

                                    <FormControl fullWidth error={Boolean(touched.Nom && errors.Nom)} sx={{ mb: 2, width: '80%' }}>
                                        <InputLabel htmlFor="outlined-adornment-Nom-login">Nom</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-Nom-login"
                                            type="text"
                                            name="Nom"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.Nom}
                                            label="Nom"
                                            inputProps={{}}
                                        />
                                        {touched.Nom && errors.Nom && (
                                            <FormHelperText error id="standard-weight-helper-text-Nom-login">
                                                {errors.Nom}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl fullWidth error={Boolean(touched.prenom && errors.prenom)} sx={{ mb: 2, width: '80%' }}>
                                        <InputLabel htmlFor="outlined-adornment-prenom-login">Prenom</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-prenom-login"
                                            type="text"
                                            name="prenom"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.prenom}
                                            label="Prenom"
                                            inputProps={{}}
                                        />
                                        {touched.prenom && errors.prenom && (
                                            <FormHelperText error id="standard-weight-helper-text-prenom-login">
                                                {errors.prenom}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button color="primary" variant="contained" type="submit">
                                <svg
                                    class="icon icon-tabler icon-tabler-send"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke="#ffffff"
                                    fill="none"
                                >
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                    <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                                </svg>
                                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                            </Button>
                        </ValidatorForm>
                    )}
                </Formik>
            </div>
        );
};

export default SimpleForm;
