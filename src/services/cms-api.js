import axios from 'axios';

export function weatherinfo(param){
    return axios.get(url, param)
}
