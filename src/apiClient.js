import axios from 'axios';

const baseURL = '';
const client = axios.create({baseURL});

export async function login(data) {
    console.log(client, data);
    return {
        data: null
    };
}

export async function register(data) {
    console.log(client, data);
    return {
        data: null
    };
}

export async function getReferrals(data) {
    console.log(client, data);
    return {
        data: null
    };
}