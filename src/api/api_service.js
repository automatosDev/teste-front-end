import {api} from './api';

const getUsers = () => {
    return api.get('users');
};

const postUser = (userName, userlastName, lastId) => {
    let newUser = {
        avatar: "http://www.fastrackerzkennel.com/wp-content/uploads/2014/03/male-placeholder-image.jpeg",
        first_name: userName,
        id: lastId + 1,
        last_name: userlastName
    }
    return api.post('users', newUser);
}

export const ApiService = {
    getUsers,
    postUser
};

export default ApiService