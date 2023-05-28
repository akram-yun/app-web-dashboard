// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AdduserForm from './AddUserForm';
import Users from './users';
import { Box } from '@mui/system';
import { useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //
const Admin = () => {
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        setUpdated(false);
    }, [updated]);
    return (
        <MainCard title="Gestion d'utilisateur">
            <Accordion id="accordion-style">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Ajouter utilisateur</AccordionSummary>
                <AccordionDetails>
                    <AdduserForm setUpdated={setUpdated} />
                </AccordionDetails>
            </Accordion>
            <Box sx={{ mt: 4 }}></Box>
            <Divider>Liste utilisateurs</Divider>
            <Box sx={{ mt: 4 }}></Box>
            <Users updated={updated} setUpdated={setUpdated} />
        </MainCard>
    );
};

export default Admin;
