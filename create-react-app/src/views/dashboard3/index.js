import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
import ChooseRegion from './ChooseRegion';
import ChooseAge from './ChooseAge';
import PercentAnalphabetisme from './PercentAnalphabetisme';
import PercentEtSup from './percentEtSup';
import AnalphabetismeMilieu from './AnalphabetismeMilieu';
import AnalphabetismeSexe from './AnalphabetismeSexe';
import PopulationByEtud from './PopulationByEtud';
import AnalphabetismeRegionProvince from './AnalphabetismeRegionProvince';
import AnalphabetismeEMat from './AnalphabetismeEMat';
import DashboardService from 'services/DashboardService';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [tauxAnalphabetisme, setTauxAnalphabetisme] = useState(null);
    const [tauxEtudeSuperieur, setTauxEtudeSuperieur] = useState(null);
    const [nbrEtudeSuperieur, setNbrEtudeSuperieur] = useState('...');
    const [nbrAnalphabetisme, setNbrAnalphabetisme] = useState('...');
    const [tauxAnalphabetismeMilieu, setTauxAnalphabetismeMilieu] = useState(null);
    const [tauxAnalphabetismeSexe, setTauxAnalphabetismeSexe] = useState(null);
    const [populationEtude, setPopulationEtude] = useState(null);
    const [analphabetsimeRegionProvince, setAnalphabetsimeRegionProvince] = useState(null);
    const [tauxAnalphabetismeEMat, setTauxAnalphabetismeEMat] = useState(null);

    const GetTauxAnalphabetismeAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getPercentAnalphabetisme({ Reg: p, Age: pAGE });
        setTauxAnalphabetisme(data.data.taux_Analphabetisme);
        setNbrAnalphabetisme(data.data.nbr_Analphabetisme);
    };
    const GetTauxNivSupAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getPercentSup({ Reg: p, Age: pAGE });
        setTauxEtudeSuperieur(data.data.taux_niv_sup);
        setNbrEtudeSuperieur(data.data.nbr_niv_sup);
    };
    const GetTauxAnalphabetismeMilieuAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getAnalphabetismeByMilieu({ Reg: p, Age: pAGE });
        setTauxAnalphabetismeMilieu(data.data);
    };
    const GetTauxAnalphabetismeSexeAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getAnalphabetismeBySexe({ Reg: p, Age: pAGE });
        setTauxAnalphabetismeSexe(data.data);
    };

    const GetPopulationByMilieuAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getPopulationByEtud({ Reg: p, Age: pAGE });
        setPopulationEtude(data.data);
    };
    const getAnalphabetismeByRegionProvinceAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getAnalphabetismeByRegionProvince({ Reg: p, Age: pAGE });
        setAnalphabetsimeRegionProvince(data.data);
    };
    const GetTauxAnalphabetismeEMatAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });

        const pAGE = {};
        selectedAge &&
            selectedAge.map((item, i) => {
                pAGE[item.AGE] = i;
            });
        const data = await DashboardService.getAnalphabetimseEMat({ Reg: p, Age: pAGE });
        setTauxAnalphabetismeEMat(data.data);
    };
    useEffect(() => {
        selectedRegion && selectedAge && GetTauxAnalphabetismeAPI();
        selectedRegion && selectedAge && GetTauxNivSupAPI();
        selectedRegion && selectedAge && GetTauxAnalphabetismeMilieuAPI();
        selectedRegion && selectedAge && GetTauxAnalphabetismeSexeAPI();
        selectedRegion && selectedAge && GetPopulationByMilieuAPI();
        selectedRegion && selectedAge && getAnalphabetismeByRegionProvinceAPI();
        selectedRegion && selectedAge && GetTauxAnalphabetismeEMatAPI();
        setLoading(false);
    }, [selectedAge, selectedRegion]);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ChooseRegion isLoading={isLoading} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ChooseAge isLoading={isLoading} selectedAge={selectedAge} setSelectedAge={setSelectedAge} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <PercentAnalphabetisme
                                    isLoading={isLoading}
                                    tauxAnalphabetisme={tauxAnalphabetisme}
                                    nbrAnalphabetisme={nbrAnalphabetisme}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <PercentEtSup
                                    isLoading={isLoading}
                                    tauxEtudeSuperieur={tauxEtudeSuperieur}
                                    nbrEtudeSuperieur={nbrEtudeSuperieur}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <PopulationByEtud isLoading={isLoading} populationEtude={populationEtude} />
                            </Grid>
                            <Grid item xs={12}>
                                <AnalphabetismeRegionProvince
                                    isLoading={isLoading}
                                    analphabetsimeRegionProvince={analphabetsimeRegionProvince}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <AnalphabetismeMilieu isLoading={isLoading} tauxAnalphabetismeMilieu={tauxAnalphabetismeMilieu} />
                            </Grid>
                            <Grid item xs={12}>
                                <AnalphabetismeSexe isLoading={isLoading} tauxAnalphabetismeSexe={tauxAnalphabetismeSexe} />
                            </Grid>
                            <Grid item xs={12}>
                                <AnalphabetismeEMat isLoading={isLoading} tauxAnalphabetismeEMat={tauxAnalphabetismeEMat} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
