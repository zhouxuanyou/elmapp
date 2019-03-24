import axios from 'axios';

// const IP = 'http://47.107.97.161:8080/';
const IP = 'http://localhost:83/';

export let getshangjiainfo=()=>{
    return axios.get(IP+'api/seller')
};
export let getshangpinginfo=()=>{
    return axios.get(IP+'api/goods');
};