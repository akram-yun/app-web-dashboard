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

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px'
}));
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SimpleForm = ({ setUpdated }) => {
    const theme = useTheme();
    // const { enqueueSnackbar } = useSnackbar();
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [message, setMessage] = React.useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required("L'email est requis"),
        password: Yup.string().max(20).required('Le mot de pass est requis'),
        Nom: Yup.string().required('Le nom est requis'),
        prenom: Yup.string().required('Le prénom est requis'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        role: Yup.string().required('Le role est requis')
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
        email: '',
        Nom: '',
        prenom: '',
        password: '',
        confirmPassword: '',
        role: ''
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        values.nom = values.Nom;
        // enqueueSnackbar('hi');
        userServices
            .addUser(values)
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
                if (e.response.status === 403) {
                    setStatus({ success: false });
                    setErrors({ submit: e.response.data.message });
                    // enqueueSnackbar(e.response.data.message, { variant: 'error' });
                    setSubmitting(false);
                } else {
                    setSeverity('success');
                    setMessage('une erreur est survenue');
                    setOpen(true);
                }
            });
    };
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
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-email-login">Email Address </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        label="Email Address "
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

                                <FormControl fullWidth error={Boolean(touched.Nom && errors.Nom)} sx={{ mb: 2 }}>
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
                                <FormControl fullWidth error={Boolean(touched.prenom && errors.prenom)} sx={{ mb: 2 }}>
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

                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="outlined-adornment-confirmPassword-login">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirmPassword-login"
                                        type={'Password'}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                        label="Confirm Password"
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
                                            {errors.confirmPassword}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role"
                                        onChange={handleChange}
                                        value={values.role}
                                        label="role"
                                    >
                                        {roles.map((item, i) => (
                                            <MenuItem value={item[1]}>{item[0]}</MenuItem>
                                        ))}
                                    </Select>
                                    {touched.role && errors.role && (
                                        <FormHelperText error id="standard-weight-helper-text-role-login">
                                            {errors.role}
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
