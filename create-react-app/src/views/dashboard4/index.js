import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
import ChooseRegion from './ChooseRegion';
import ChooseAge from './ChooseAge';
import PercentChomage from './PercentChomage';
import PercentSansActivite from './PercentSansActivite';
import ChomageMilieu from './ChomageMilieu';
import ChomageSexe from './ChomageSexe';
import ActSecteurByEtud from './ActSecteurByEtud';
import ChomageByEtude from './ChomageByEtude';
import AnalphabetismeEMat from './AnalphabetismeEMat';
import DashboardService from 'services/DashboardService';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [tauxChomage, setTauxChomage] = useState(null);
    const [nbrChomage, setNbrChomage] = useState('...');
    const [tauxSansActivite, setTauxSansActivite] = useState(null);
    const [nbrSansActivite, setNbrSansActivite] = useState('...');
    const [tauxChomageMilieu, setTauxChomageMilieu] = useState(null);
    const [tauxChomageSexe, setTauxChomageSexe] = useState(null);
    const [actSecteurEtude, setActSecteurEtude] = useState(null);
    const [ChomageByEtud, setChomageByEtud] = useState(null);
    const [tauxActiviteEMat, setTauxActiviteEMat] = useState(null);

    const GetTauxChomageAPI = async () => {
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
        const data = await DashboardService.getPercentChomage({ Reg: p, Age: pAGE });
        setTauxChomage(data.data.taux_chomage);
        setNbrChomage(data.data.nbr_chomage);
    };
    const GetTauxSansActiviteAPI = async () => {
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
        const data = await DashboardService.getPercentSansActivité({ Reg: p, Age: pAGE });
        setTauxSansActivite(data.data.taux_chomage);
        setNbrSansActivite(data.data.nbr_chomage);
    };
    const GetTauxChomageMilieuAPI = async () => {
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
        const data = await DashboardService.getChomageByMil({ Reg: p, Age: pAGE });
        setTauxChomageMilieu(data.data);
    };
    const GetTauxChomageSexeAPI = async () => {
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
        const data = await DashboardService.getChomageBySexe({ Reg: p, Age: pAGE });
        setTauxChomageSexe(data.data);
    };

    const GetActSecteurByEtudAPI = async () => {
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
        const data = await DashboardService.getActSecteurByEtud({ Reg: p, Age: pAGE });
        setActSecteurEtude(data.data);
    };
    const getChomageByEtudAPI = async () => {
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
        const data = await DashboardService.getChomagebyEtud({ Reg: p, Age: pAGE });
        setChomageByEtud(data.data);
    };
    const GetTauxActiviteEMatAPI = async () => {
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
        const data = await DashboardService.getChomageByEmat({ Reg: p, Age: pAGE });
        setTauxActiviteEMat(data.data);
    };
    useEffect(() => {
        selectedRegion && selectedAge && GetTauxChomageAPI();
        selectedRegion && selectedAge && GetTauxSansActiviteAPI();
        selectedRegion && selectedAge && GetTauxChomageMilieuAPI();
        selectedRegion && selectedAge && GetTauxChomageSexeAPI();
        selectedRegion && selectedAge && GetActSecteurByEtudAPI();
        selectedRegion && selectedAge && getChomageByEtudAPI();
        selectedRegion && selectedAge && GetTauxActiviteEMatAPI();
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
                                <PercentChomage isLoading={isLoading} tauxChomage={tauxChomage} nbrChomage={nbrChomage} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <PercentSansActivite
                                    isLoading={isLoading}
                                    tauxSansActivite={tauxSansActivite}
                                    nbrSansActivite={nbrSansActivite}
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
                                <ChomageByEtude isLoading={isLoading} ChomageByEtud={ChomageByEtud} />
                            </Grid>
                            <Grid item xs={12}>
                                <ActSecteurByEtud isLoading={isLoading} actSecteurEtude={actSecteurEtude} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <ChomageMilieu isLoading={isLoading} tauxChomageMilieu={tauxChomageMilieu} />
                            </Grid>
                            <Grid item xs={12}>
                                <ChomageSexe isLoading={isLoading} tauxChomageSexe={tauxChomageSexe} />
                            </Grid>
                            <Grid item xs={12}>
                                <AnalphabetismeEMat isLoading={isLoading} tauxActiviteEMat={tauxActiviteEMat} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
