import http from '../HttpCommons';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const getAll = async () => {
    const data = await http
        .get(`user/all`)
        .then((promise) => {
            return promise.data;
        })
        .catch((e) => {
            console.error(e);
        });
    return data;
};
const getAllRole = async () => {
    const data = await http
        .get(`/user/role`)
        .then((promise) => {
            return promise.data;
        })
        .catch((e) => {
            console.error(e);
        });
    return data;
};
const getUser = () => {
    const token = cookies.get('jwt');
    return http.post('/user', token);
};
const update = (id, data) => {
    return http.post(`/user/update/${id}`, data);
};
const remove = (id) => {
    return http.delete(`/user/delete/${id}`);
};
/////////////////
const get = (id) => {
    return http.get(`/tutorials/${id}`);
};
const addUser = (data) => {
    return http.post('/user/add', data);
};

const updatePass = (data) => {
    return http.put(`/user`, data);
};

const removeAll = () => {
    return http.delete(`/tutorials`);
};
const findByTitle = (title) => {
    return http.get(`/tutorials?title=${title}`);
};
const userServices = {
    getAll,
    get,
    addUser,
    update,
    updatePass,
    getAllRole,
    remove,
    getUser,
    removeAll,
    findByTitle
};
export default userServices;
