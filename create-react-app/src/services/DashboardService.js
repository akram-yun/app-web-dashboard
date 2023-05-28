import http from '../HttpCommons';
//Page1***************************************************
const getAll = async () => {
    const data = http
        .get(`/dash`)
        .then((promise) => {
            return promise.data;
        })
        .catch((e) => {
            console.error(e);
        });
    return data;
};
const getNbrByData = (data) => {
    return http.post('/dash', data);
};

const getAgeData = (data) => {
    return http.post('/funnelpopulation', data);
};
const getMapData = (data) => {
    return http.post('/mappopulation', data);
};

const getRegion = async () => {
    const data = http
        .get(`/region`)
        .then((promise) => {
            return promise.data;
        })
        .catch((e) => {
            console.error(e);
        });
    return data;
};
//page2***************************************************
const getAgeLabel = async () => {
    const data = http
        .get(`/agelabel`)
        .then((promise) => {
            return promise.data;
        })
        .catch((e) => {
            console.error(e);
        });
    return data;
};
const getPercentHandicap = (data) => {
    return http.post('/percenthandicap', data);
};
const getPercentBonneSante = (data) => {
    return http.post('/tauxbonnesante', data);
};
const getHandicapByMilieu = (data) => {
    return http.post('/handicapmilieu', data);
};
const getHandicapBySexe = (data) => {
    return http.post('/handicapsexe', data);
};
const getHandicapByRegionProvince = (data) => {
    return http.post('/handicapregionprovince', data);
};
const getHandicapByEtud = (data) => {
    return http.post('/handicapbyetude', data);
};
const getHandicapEMat = (data) => {
    return http.post('/handicapemat', data);
};
//page3********************
const getPercentAnalphabetisme = (data) => {
    return http.post('/percentanalphabetisme', data);
};
const getPercentSup = (data) => {
    return http.post('/taux/niv/sup', data);
};
const getPopulationByEtud = (data) => {
    return http.post('/populationbyetude', data);
};
const getAnalphabetismeByMilieu = (data) => {
    return http.post('/analphabetismemilieu', data);
};
const getAnalphabetismeBySexe = (data) => {
    return http.post('/analphabetismesexe', data);
};
const getAnalphabetismeByRegionProvince = (data) => {
    return http.post('/analphabetismeregionprovince', data);
};
const getAnalphabetimseEMat = (data) => {
    return http.post('/analphabetismeemat', data);
};
//page4******************************
const getPercentChomage = (data) => {
    return http.post('/percentchomage', data);
};
const getPercentSansActivité = (data) => {
    return http.post('/taux/activité/sansrep', data);
};
const getChomagebyEtud = (data) => {
    return http.post('/chomagebyregion', data);
};
const getActSecteurByEtud = (data) => {
    return http.post('/actsecteurbyetud', data);
};
const getChomageByMil = (data) => {
    return http.post('/chomagemilieu', data);
};
const getChomageBySexe = (data) => {
    return http.post('/chomagesexe', data);
};
const getChomageByEmat = (data) => {
    return http.post('activite/emat', data);
};
////////////////////////////////////////
const getRegionPopulation = async () => {
    const data = http
        .get(`/region-population`)
        .then((promise) => {
            return promise.data;
        })
        .catch((e) => {
            console.error(e);
        });
    return data;
};
const DashboardService = {
    getAll,
    getNbrByData,
    getRegion,
    getAgeData,
    getMapData,
    getAgeLabel,
    getPercentHandicap,
    getHandicapByMilieu,
    getHandicapBySexe,
    getHandicapByEtud,
    getPercentAnalphabetisme,
    getPopulationByEtud,
    getAnalphabetismeByMilieu,
    getAnalphabetismeBySexe,
    getHandicapByRegionProvince,
    getHandicapEMat,
    getAnalphabetismeByRegionProvince,
    getAnalphabetimseEMat,
    getPercentChomage,
    getChomagebyEtud,
    getActSecteurByEtud,
    getChomageByMil,
    getChomageBySexe,
    getRegionPopulation,
    getPercentBonneSante,
    getPercentSup,
    getPercentSansActivité,
    getChomageByEmat
};
export default DashboardService;
