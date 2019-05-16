import { API_URL } from '../../env'

import axios from 'axios'

class RequestData
{
    getUsers(url) {
        let headers = {
          'Content-Type': 'application/json'
        }
        let http = axios.create({ baseURL: API_URL, headers: headers})
  
        return http.get(url).then( resp =>{
            return resp
        }).catch(error => {
            console.log(error);
            return false
        })
    }
    getDetail(url){
        let headers = {
            'Content-Type': 'application/json'
        }

        let http = axios.create({ baseURL: API_URL, headers: headers})

        return http.get(url).then( resp =>{
            return resp
        }).catch(error => {
            console.log(error);
            return false
        })
    }

}

export const requestData = new RequestData();
