import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
import ChooseRegion from './ChooseRegion';
import ChooseAge from './ChooseAge';
import HandicapRegionProvince from './handicapRegionProvince';
import PercentHandicap from './PercentHandicap';
import PercentBonneSante from './PercentBonneSante';
import HandicapMilieu from './HandicapMilieu';
import HandicapSexe from './HandicapSexe';
import HandicapSitMat from './HandicapSitMat';
import HandicapByEtud from './handicapByEtud';
import DashboardService from 'services/DashboardService';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [tauxHandicap, setTauxHandicap] = useState(null);
    const [nbrHandicap, setNbrHandicap] = useState('...');
    const [tauxBonneSante, setTauxBonneSante] = useState(null);
    const [nbrbonneSante, setNbrBonneSante] = useState('...');
    const [tauxHandicapMilieu, setTauxHandicapMilieu] = useState(null);
    const [tauxHandicapSexe, setTauxHandicapSexe] = useState(null);
    const [tauxHandicapEMat, setTauxHandicapEMat] = useState(null);
    const [handicapEtude, setHandicapEtude] = useState(null);
    const [handicapRegionProvince, setHandicapRegionProvince] = useState(null);

    const GetTauxHandicapAPI = async () => {
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
        const data = await DashboardService.getPercentHandicap({ Reg: p, Age: pAGE });
        setTauxHandicap(data.data.taux_handicap);
        setNbrHandicap(data.data.nbr_handicap);
    };
    const GetTauxBonneSanteAPI = async () => {
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
        const data = await DashboardService.getPercentBonneSante({ Reg: p, Age: pAGE });
        setTauxBonneSante(data.data.taux_Bonne_sante);
        setNbrBonneSante(data.data.nbr_Bonne_Sante);
    };
    const GetTauxHandicapMilieuAPI = async () => {
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
        const data = await DashboardService.getHandicapByMilieu({ Reg: p, Age: pAGE });
        setTauxHandicapMilieu(data.data);
    };
    const GetTauxHandicapRegionProvinceAPI = async () => {
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
        const data = await DashboardService.getHandicapByRegionProvince({ Reg: p, Age: pAGE });
        setHandicapRegionProvince(data.data);
    };
    const GetTauxHandicapSexeAPI = async () => {
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
        const data = await DashboardService.getHandicapBySexe({ Reg: p, Age: pAGE });
        setTauxHandicapSexe(data.data);
    };

    const GetTauxHandicapEMatAPI = async () => {
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
        const data = await DashboardService.getHandicapEMat({ Reg: p, Age: pAGE });
        setTauxHandicapEMat(data.data);
    };
    const GetHandicapByMilieuAPI = async () => {
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
        const data = await DashboardService.getHandicapByEtud({ Reg: p, Age: pAGE });
        setHandicapEtude(data.data);
    };
    useEffect(() => {
        selectedRegion && selectedAge && GetTauxHandicapAPI();
        selectedRegion && selectedAge && GetTauxBonneSanteAPI();
        selectedRegion && selectedAge && GetTauxHandicapMilieuAPI();
        selectedRegion && selectedAge && GetTauxHandicapSexeAPI();
        selectedRegion && selectedAge && GetHandicapByMilieuAPI();
        selectedRegion && selectedAge && GetTauxHandicapRegionProvinceAPI();
        selectedRegion && selectedAge && GetTauxHandicapEMatAPI();
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
                                <PercentHandicap isLoading={isLoading} tauxHandicap={tauxHandicap} nbrHandicap={nbrHandicap} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <PercentBonneSante isLoading={isLoading} tauxBonneSante={tauxBonneSante} nbrbonneSante={nbrbonneSante} />
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
                                <HandicapByEtud isLoading={isLoading} handicapEtude={handicapEtude} />
                            </Grid>
                            <Grid item xs={12}>
                                <HandicapRegionProvince isLoading={isLoading} handicapRegionProvince={handicapRegionProvince} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <HandicapMilieu isLoading={isLoading} tauxHandicapMilieu={tauxHandicapMilieu} />
                            </Grid>
                            <Grid item xs={12}>
                                <HandicapSexe isLoading={isLoading} tauxHandicapSexe={tauxHandicapSexe} />
                            </Grid>
                            <Grid item xs={12}>
                                <HandicapSitMat isLoading={isLoading} tauxHandicapEMat={tauxHandicapEMat} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
