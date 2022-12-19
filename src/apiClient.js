import axios from 'axios';

const baseURL = 'https://ygpa4r9phd.execute-api.us-east-1.amazonaws.com/PROD';
const S3_URL = 'https://referral-connect-resumes.s3.amazonaws.com/';

const UPLOAD_PATH = '/upload';
const REGISTER_PATH = '/register';
const GET_REFERRALS_PATH = '/askreferral';
const GIVE_REFERRALS_PATH = '/givereferral';
const MY_REFERRALS_PATH = '/my-referral';
const LOGIN_PATH = '/login';

const client = axios.create({baseURL});

export async function register(data) {
    const { resume } = data;
    const body = await resume.arrayBuffer();
    const fileName = (Math.random() + 1).toString(36).substring(2) + '.pdf';
    const args = {
        headers: {
            'Content-Type': resume.type,
            'key': fileName
        }
    };
    const responseUpload = await client.put(UPLOAD_PATH, body, args);
    console.log(responseUpload);

    let dataCopy = Object.assign({}, data);
    dataCopy['resume'] = S3_URL + fileName;
    delete dataCopy['error'];
    delete dataCopy['info'];
    delete dataCopy['status'];
    
    return await client.post(REGISTER_PATH, dataCopy);
}

export async function login(data) {
    return await client.post(LOGIN_PATH, data);
}

export async function getReferrals(data, headers) {
    return await client.post(GET_REFERRALS_PATH, data, {headers});
}

export async function myReferrals(headers) {
    return await client.get(MY_REFERRALS_PATH, {headers});
}

export async function giveReferrals(headers) {
    return await client.get(GIVE_REFERRALS_PATH, {headers});
}

export async function giveReferral(data, headers) {
    return await client.post(GIVE_REFERRALS_PATH, data, {headers});
}