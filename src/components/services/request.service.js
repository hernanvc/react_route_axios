import { API_URL } from '../../env';

import axios from 'axios'
const queryString = require('query-string');

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
    sendForm(url, data, urlImg,params){
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8' }
        let http = axios.create({ baseURL: API_URL,  headers: headers	})
        let form = new URLSearchParams();
        console.log(data, data[0])
        form.append('agendamiento', data.agendamiento);
        form.append("accesibilidad", data.accesibilidad);
        form.append("barrio", data.barrio);
        form.append("bodega", data.bodega);
        form.append("bodega_dos", data.bodega_dos);
        form.append("centro_comercial", data.centro_comercial);
        form.append("ciclovia", data.ciclovia);
        form.append("colegios", data.colegios);
        form.append("comercio_menor", data.comercio_menor);
        form.append("conectividad", data.conectividad);
        form.append("derechos", data.derechos);
        form.append("direccion", data.direccion);
        form.append("equipamiento", data.equipamiento);
        form.append("equipamiento_del_conjunto", data.equipamiento_del_conjunto);
        form.append("estacionamiento", data.estacionamiento);
        form.append("estacionamiento_dos", data.estacionamiento_dos);
        form.append("farmacias", data.farmacias);
        form.append("instalaciones_antiguedad", data.instalaciones_antiguedad);
        form.append("instalaciones_calidad", data.instalaciones_calidad);
        form.append("instalaciones_conservacion", data.instalaciones_conservacion);
        form.append("localizacion", data.localizacion);
        form.append("metro", data.metro);
        form.append("metros_cuadrados", data.metros_cuadrados);
        form.append("departamento", data.departamento);
        form.append("obragruesa_antiguedad", data.obragruesa_antiguedad);
        form.append("obragruesa_calidad", data.obragruesa_calidad);
        form.append("obragruesa_conservacion", data.obragruesa_conservacion);
        form.append("obragruesa_tipologia", data.obragruesa_tipologia);
        form.append("obras_complementarias_calidad", data.obras_complementarias_calidad);
        form.append("obras_complementarias_conservacion", data.obras_complementarias_conservacion);
        form.append("orientacion_principal", data.orientacion_principal);
        form.append("orientacion_secundaria", data.orientacion_secundaria);
        form.append("osio", data.osio);
        form.append("parque", data.parque);
        form.append("piso", data.piso);
        form.append("plaza", data.plaza);
        form.append("prc", data.prc);
        form.append("servcios", data.servcios);
        form.append("superficie_total", data.superficie_total);
        form.append("superficie", data.superficie);
        form.append("supermercado", data.supermercado);
        form.append("servicios", data.servicios);
        form.append("terminaciones_antiguedad", data.terminaciones_antiguedad);
        form.append("terminaciones_calidad", data.terminaciones_calidad);
        form.append("terminaciones_conservacion", data.terminaciones_conservacion);
        form.append("terraza", data.terraza);
        form.append("torre", data.torre);
        form.append("usos", data.usos);
        form.append("vistas", data.vistas);
        form.append("comuna", data.comuna);
        form.append("calle", data.calle);

        const headersImg = {'Content-Type': `multipart/form-data; boundary=${params.files._boundary}`};

        let fd= new FormData()
    
        fd.append('files', params.files)
        fd.append('path', params.path)
        fd.append('ref', params.ref)
        fd.append('field', params.field)

        const promise1 = http.post(url, form);
        return promise1.then(function(resp) {
            let idimg = resp.data._id
            console.log(resp, idimg)
            fd.append('refId', idimg)
            const promise2 = axios.post(`${API_URL}${urlImg}`, fd,  {headers:headersImg})
            return promise2.then(function(respuesta) {
                console.log(respuesta)
                return respuesta
            }).catch(function(error) {
                console.log(error);
                return false    
            })
        }).catch(function(error) {
            console.log(error);
            return false    
        });
    }
    async sendData(credentials) {
        let url =  API_URL +'/auth/local';
        console.log(credentials, url, API_URL)
        const requestBody = {
          'identifier': credentials.email,
          'password': credentials.password,
        };
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: queryString.stringify(requestBody),
          url,
        };
        return axios(options)
        .then(res=>{
          localStorage.setItem('token', res.data.jwt)
          this.isAuthenticated = true
          localStorage.setItem('user', JSON.stringify(res.data.user) )
          this.user = res.data.user;
          return res
        })
        .catch(error => {
          console.log(error);
          return false })
    }
    submitImg(url, params) {
        const headers = {'Content-Type': `multipart/form-data; boundary=${params.files._boundary}`};

        let fd= new FormData()
      
        fd.append('files', params.files)
        fd.append('path', params.path)
        fd.append('refId', params.refId)
        fd.append('ref', params.ref)
        fd.append('field', params.field)
      
        axios.post(`${API_URL}${url}`, fd,  {headers:headers})
          .then(resp => {
            console.log(resp)
          });
    }
}

export const requestData = new RequestData();
