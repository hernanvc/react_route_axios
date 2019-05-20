import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Regiones } from './partials/Comunas';
import {Calidad } from './partials/Calidad';
import {Proximidad } from './partials/Proximidad';
import {Orientacion } from './partials/Orientacion';
import {Comparacion } from './partials/Comparacion';
import {Consolidacion } from './partials/Consolidacion';
import {Fields} from './partials/data';
import {Row, Container, Col} from 'reactstrap';
import {requestData} from '../services/request.service';
import { Upload, Icon, Modal } from 'antd';

import { API_URL } from '../../env'

var NumberFormat = require('react-number-format');

class IndexForm extends Component{
    constructor(props) {
        super(props);
        this.state = 
        {
            exogenos:[],
            endogenos: [],
            field: [],
            comunas: [],
            calidad: [],
            proximidad: [],
            orientacion: [],
            comparacion: [],
            consolidacion: [],
            second: [],
            third: [],
            data: {'solicitud': {}},
            previewVisible: false,
            previewImage: '',
            fileList: [
              {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: require("../../assets/images/placeholder.png"),
              },
            ],

        };
    }
    handleCancel = () => this.setState({ previewVisible: false });

    async componentDidMount(){
        let id = this.props.match.params.handle;
        let fetch = await requestData.getDetail('agendamientos/' + id)
        if(fetch){
            let data = fetch.data
            await this.setState({
                data
            });
            console.log(this.state.data)
        }
        await this.setState({
            exogenos: Fields.formulario.exogenos,
            endogenos: Fields.formulario.endogenos,
            comunas: Regiones.regiones[14].comunas,
            calidad: Calidad,
            proximidad: Proximidad,
            orientacion: Orientacion,
            comparacion: Comparacion,
            consolidacion: Consolidacion
        })
        console.log( this.state.data )

    }

    renderComunas() {
        if(this.state.data.comuna ){
            return <option  value="0" > {this.state.data.comuna} </option>
        }
        else{
            return this.state.comunas.map((comunas) => (
                <option value={comunas} key={comunas}> {comunas} </option>
            ));
        }
    }

    renderCalidad() {
        return this.state.calidad.map((Calidad, index) => (
            <option value={Calidad} key={index}> {Calidad} </option>
        ));
    }
    renderProximidad() {
        return this.state.proximidad.map((Proximidad, index) => (
            <option value={Proximidad} key={index}> {Proximidad} </option>
        ));
    }
    renderOrientacion() {
        return this.state.orientacion.map((Orientacion, index) => (
            <option value={Orientacion} key={index}> {Orientacion} </option>
        ));
    }
    renderComparacion() {
        return this.state.comparacion.map((Comparacion, index) => (
            <option value={Comparacion} key={index}> {Comparacion} </option>
        ));
    }
    renderConsolidacion() {
        return this.state.consolidacion.map((Consolidacion, index) => (
            <option value={Consolidacion} key={index}> {Consolidacion} </option>
        ));
    }


    handleChange(e) {
        console.log(e.value)
        this.setState({
            [e.name]: e.value
        })
    }
    handleSelect(e, name) {
        console.log(e.target.value)
        this.setState({
            [name]: e.target.value
        })
    }

    handlePreview = file => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      };
    
    handleupdate = ({ fileList }) => this.setState({ fileList });


    submitForm(e){
        console.log("ya tu sabes mami ");
        console.log('====================================')
        console.log(this.state.data.solicitud.metros_cuadrados)
        console.log(this.state)
        console.log('====================================')

    }
    

    async validateForm(e){
        var valido = true;
        var error = '';
        var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state.page === 0){
            if (this.state.email === '') {
                valido = false;
                error += "Ingrese su correo. \n"
            }
            else{
                if (!regExpEmail.test(this.state.email)) {
                    valido = false;
                    error += 'El correo electrónico debe contener el formato correcto.\n';
                }
            }
            
        }
        if(this.state.page === 1){
            if (this.state.property_type === '') {
                valido = false;
                error += "Seleccione el tipo de propiedad. \n"
            }
            if (this.state.city === '') {
                valido = false;
                error += "Seleccione una comuna. \n"
            }
            if (this.state.address === '') {
                valido = false;
                error += "Ingrese una dirección. \n"
            }
        }
        if(this.state.page === 2){
            if (this.state.mts === 0) {
                valido = false;
                error += "Ingrese La cantidad de metros cuadrados. \n"
            }
            if (this.state.bedroom === 0) {
                valido = false;
                error += "Ingrese La cantidad de piezas. \n"
            }
        }
        if(this.state.page === 3){
            if (this.state.lease_value === 0) {
                valido = false;
                error += "Ingrese el valor de arriendo. \n"
            }
            if (this.state.price === 0) {
                valido = false;
                error += "Ingrese el valor del mercado. \n"
            }
            if (this.state.years_old === 0) {
                valido = false;
                error += "Ingrese la antigüedad de la propiedad. \n"
            }
        }
        if(this.state.page === 4){
            if (this.state.name === '') {
                valido = false;
                error += "Ingrese su nombre. \n"
            }
            if (this.state.last_name === '') {
                valido = false;
                error += "Ingrese su apellido. \n"
            }
            if (this.state.phone.length < 8) {
                valido = false;
                error += "Ingrese su número de teléfono. \n"
            }
            else{
            }
        }
        if(!valido ){
            var array = new Array()
            array = error.split("\n")
            array.splice( array.length-1)
            for(var i = 0; i < array.length; i++){
                this.setState({
                    error: array,
                })
            }
            this.handleAlert(error)
            return false;
        }
        else{
            return true
        }
    }

    async changeForm(e){
        let validar = await this.validateForm()
        if(validar ){
            this.setState({
                page: e 
            })
        }
        else{
            return
        }
        
    }


    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );

        return(
            <div className="first-section">
                <div className="animated fadeInRight">
                    <Container>
                        <Row>
                            <Col md={{ offset: 3, size: 6 }} lg={{ offset: 4, size: 4 }} sm={{ offset: 2, size: 8 }}>
                                <img src={require("../../assets/images/logo.png")} className="img-responsive" alt="logo"/>
                                <h6 className="text-center">FICHA TASADOR</h6>
                                <br/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <div className="common-box__sub animated fadeInRightBig">
                                    <h6 className="text-center">Nombre:{this.state.data.solicitud.nombre}</h6>
                                    <hr/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <div className="common-box__sub animated fadeInRightBig">
                                    <div className="form-group">
                                        <label>Dirección</label>
                                        <input type="text" className="form-control" name="direccion" value={this.state.data.solicitud.direccion} placeholder="Dirección" onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="common-box__sub animated fadeInRightBig">
                                    <div className="form-group">
                                        <label> Superficie útil</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                        <input type="text" className="form-control" name="superficie_util" placeholder="Superficie útil" onChange={ (e) => this.handleChange(e.target) }  />
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">m²</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Terraza</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <input type="text" className="form-control" name="terraza" placeholder="Terraza" onChange={ (e) => this.handleChange(e.target) }  />
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">m²</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Superficie total</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <input type="text" className="form-control" name="metros_cuadrados" value={this.state.data.solicitud.metros_cuadrados}  placeholder="Superficie total" onChange={ (e) => this.handleChange(e.target) }  />
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">m²</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="form-group">
                                    <label>Piso</label>
                                    <input type="text" className="form-control" name="piso" placeholder="Piso" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                                <div className="form-group">
                                    <label>Torre</label>
                                    <input type="text" className="form-control" name="torre" placeholder="Torre" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                                <div className="form-group">
                                    <label>Departamento</label>
                                    <input type="text" className="form-control"  name="n_depto" value={this.state.data.solicitud.n_depto} placeholder="Departamento" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="form-group">
                                    <label>Estacionamiento</label>
                                    <input type="text" className="form-control" name="estacionamiento_1" placeholder="Estacionamiento" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                                <div className="form-group">
                                    <label>Estacionamiento</label>
                                    <input type="text" className="form-control" name="estacionamiento_2" placeholder="Estacionamiento" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                                <div className="form-group">
                                    <label>Bodega</label>
                                    <input type="text" className="form-control" name="bodega_1" placeholder="Bodega" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                                <div className="form-group">
                                    <label>Bodega</label>
                                    <input type="text" className="form-control" name="bodega_2" placeholder="Bodega" onChange={ (e) => this.handleChange(e.target) }  />
                                </div>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md="6">
                                <div className="common-box__sub animated fadeInRightBig">

                                    {this.state.exogenos.map(f =>
                                        <div key={f.title}>
                                            <h6>{f.title}</h6>
                                            <hr />
                                            {f.fields.map(t => 
                                                <div key={t.name} className="form-group ">
                                                    <label>
                                                        {t.name}
                                                    </label>
                                                    <select  className="custom-select" name={t.name}  onChange={(e) => this.handleSelect(e, t.name)} >
                                                        <option  value="0" >-</option>
                                                        { t.type === "Comuna" ? this.renderComunas() : null }
                                                        { t.type === "Calidad" ? this.renderCalidad() : null }
                                                        { t.type === "Proximidad" ? this.renderProximidad() : null }
                                                        { t.type === "Orientacion" ? this.renderOrientacion() : null }
                                                        { t.type === "Comparación" ? this.renderComparacion() : null }
                                                        { t.type === "Consolidación" ? this.renderConsolidacion() : null }
                                                        
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="common-box__sub animated fadeInRightBig">

                                    {this.state.endogenos.map(f =>
                                        <div key={f.title}>
                                                <h6>{f.title}</h6>
                                                <hr />
                                            {f.fields.map(t => 
                                                <div key={t.name} className="form-group ">
                                                    <label>
                                                        {t.name}
                                                    </label>
                                                    <select  className="custom-select" name={t.name}   onChange={(e) => this.handleSelect(e, t.name)} >
                                                        <option  value="0" >-</option>
                                                        { t.type === "Comuna" ? this.renderComunas() : null }
                                                        { t.type === "Calidad" ? this.renderCalidad() : null }
                                                        { t.type === "Proximidad" ? this.renderProximidad() : null }
                                                        { t.type === "Orientacion" ? this.renderOrientacion() : null }
                                                        { t.type === "Comparación" ? this.renderComparacion() : null }
                                                        { t.type === "Consolidación" ? this.renderConsolidacion() : null }
                                                        
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                   
                                </div>
                            </Col>
                            <Col md="12">
                                <h6>Subida de imagenes</h6>
                                <hr/>
                            </Col>
                            <Col md="12" style={{ marginBottom: "100px" }}>
                                <div className="clearfix">
                                    <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleupdate}
                                    >
                                    {fileList.length >= 3 ? null : uploadButton}
                                    </Upload>
                                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="form-group text-center">
                                    <button type="button" className="btn btn-primary main-btn form-btn first-btn" onClick={(e) => this.submitForm(e) } >Continuar</button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

}
export default IndexForm