// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Grid, ListItemText, Typography } from '@mui/material';
import { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AdduserForm from './AddUserForm';
import Users from './users';
import { Box, style, textAlign } from '@mui/system';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';
import png from './../../assets/images/pfp1.png';
import AddUserForm from './AddUserForm';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import userServices from 'services/userServices';
// ==============================|| SAMPLE PAGE ||============================== //
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));
const mystyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    width: '50%'
};
const Admin = () => {
    const [updated, setUpdated] = useState(false);
    const [nom, setNom] = React.useState();
    const [prenom, setPrenom] = React.useState();
    const [email, setEmail] = React.useState();
    const [role, setRole] = React.useState();
    const [roleId, setRoleId] = React.useState();
    const [id_user, setId_User] = React.useState();

    const theme = useTheme();
    useEffect(() => {
        const fetchDataUser = async () => {
            const data = await userServices.getUser();
            setEmail(data.data.email);
            setNom(data.data.nom);
            setPrenom(data.data.prenom);
            setRoleId(data.data.role);
            setId_User(data.data.id);
            if (data.data.role == 1) {
                setRole('Admin');
            } else {
                setRole('Utilisateur');
            }
        };
        fetchDataUser();
        setUpdated(false);
    }, [updated]);
    return (
        <MainCard title="Profile d'utilisateur">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={6} sx={{ textAlignVertical: 'center', textAlign: 'center' }}>
                    <Grid container spacing={gridSpacing}>
                        <ListItemText style={mystyle}>
                            <img src={png} alt="photto" width={300} />
                            <Typography variant="h3" sx={{ color: 'black' }}>
                                {prenom} {nom}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'grey' }}>
                                {role}
                            </Typography>
                        </ListItemText>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={gridSpacing}>
                        <ListItemText>
                            <Typography variant="h2" sx={{ color: 'black' }}>
                                Information Personnelle
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'grey' }}>
                                {role}
                            </Typography>
                        </ListItemText>
                        <AddUserForm nom={nom} id_user={id_user} roleId={roleId} prenom={prenom} email={email} role={role} />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Admin;
