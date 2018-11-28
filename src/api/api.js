import axios from "axios";

// Descomente para usar a api de produção
const urlApi = {
    value: "https://reqres.in/api/"
};

const api = axios.create({
    baseURL: urlApi.value,
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' }
});

export { api }
export default urlApi