import axios from 'axios';

const baseURL = 'https://ygpa4r9phd.execute-api.us-east-1.amazonaws.com/PROD';
const S3_URL = 'https://referral-connect-resumes.s3.amazonaws.com/';

const UPLOAD_PATH = '/upload';
const REGISTER_PATH = '/register';
const GET_REFERRALS_PATH = '/askreferral';

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
    if (responseUpload.status !== 200) {
        return {
            data: 'Upload unsuccessful'
        }
    };

    let dataCopy = Object.assign({}, data);
    dataCopy['resume'] = S3_URL + fileName;
    delete dataCopy['status'];
    
    const response = await client.post(REGISTER_PATH, dataCopy);
    if (response.status !== 200) {
        return {
            data: 'Registration unsuccessful'
        }
    }
    return {
        data: null
    };
}

export async function login(data) {
    console.log(client, data);
    return {
        data: null
    };
}


export async function getReferrals(data) {
    console.log(data);
    const response = await client.post(GET_REFERRALS_PATH, data);
    console.log(response);

    if (response.status !== 200) {
        return {
            data: 'Registration unsuccessful'
        }
    }
    
    return {
        data: null
    };
}

export async function myReferrals() {
    return {
        data: [{
            company: 'Amazon',
            role: 'Applied Scientist',
            link: 'https://google.com',
            status: 'Queued'
        }]
    };
}

export async function giveReferrals() {
    return {
        data: [{
            name: 'Shivang Bharadwaj',
            role: 'Applied Scientist',
            link: 'https://google.com',
            score: '80'
        }]
    };
}