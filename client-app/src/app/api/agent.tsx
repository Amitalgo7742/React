import axios, { AxiosError, AxiosResponse } from 'axios';
import { SSL_OP_EPHEMERAL_RSA } from 'node:constants';
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';
const sleep=(delay:number)=>{
return new Promise((resolve)=>{
    setTimeout(resolve,delay);
})
}

axios.interceptors.response.use(async response=>{
    await sleep(1000);
    return response;
},(error:AxiosError)=>{
    const {data,status}=error.response!;
    switch(status)
    {
        case 400: toast.error('Bad Request');
        break;
        case 401: toast.error('Unathourized');
        break;
        case 404: toast.error('Not Found');
        break;
        case 500: toast.error('Something Went Wrong');
        break;

    }
    return Promise.reject(error);
}
)


const responseBody = (response: AxiosResponse) => response.data;
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody) 
};

const Activities = {
    list: (): Promise<Activity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: Activity) => requests.post('/activities', activity),
    update: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

export default {
    Activities
}