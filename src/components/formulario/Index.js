import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Regiones } from './partials/Comunas';
import {Calidad } from './partials/Calidad';
import {Proximidad } from './partials/Proximidad';
import {Orientacion } from './partials/Orientacion';
import {Comparacion } from './partials/Comparacion';
import {Consolidacion } from './partials/Consolidacion';
import {Fields} from './partials/data';
import {Row, Container, Col, Input} from 'reactstrap';
import {requestData} from '../services/request.service';
import { Upload, Icon, Modal } from 'antd';
import Swal from 'sweetalert2'

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
            direccion: "",
            n_depto: "",
            superficie_total: "",
            data: {'solicitud': {}},
            previewVisible: false,
            previewImage: '',
            fileList: [
            ],
        };
    }
    handleCancel = () => this.setState({ previewVisible: false });

    async componentDidMount(){
        console.log(this.props.match.params.handle)
        let id = this.props.match.params.handle;
        let fetch = await requestData.getDetail('agendamientos/' + id)
        if(fetch){
            let data = fetch.data
            await this.setState({
                data
            });
        }
        
        await this.setState({
            exogenos: Fields.formulario.exogenos,
            endogenos: Fields.formulario.endogenos,
            comunas: Regiones.regiones[14].comunas,
            calidad: Calidad,
            proximidad: Proximidad,
            orientacion: Orientacion,
            comparacion: Comparacion,
            consolidacion: Consolidacion,
            direccion: this.state.data.solicitud.direccion,
            superficie_total: this.state.data.solicitud.metros_cuadrados,
            departamento: this.state.data.solicitud.n_depto,
            agendamiento:  id
        }) 

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


    async submitForm(e){
        e.preventDefault()
        let number  = this.state.direccion.match(/\d+/)[0] 
        let calle = this.state.direccion.split(number)[0]
        let comuna = this.state.direccion.split(",")[1]
        await this.setState({
            calle: calle,
            comuna: comuna
        })
        if(this.state.fileList.length < 3){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Debes subir al menos 3 imagenes',
              })
              return false
        }
        let sendform = await requestData.sendForm("fichas/", this.state)
        if (sendform){
            let form = []
            for(var i = 0; i< this.state.fileList.length; i++){
                 form.push(this.state.fileList[i].originFileObj)
            }
            form.forEach( async function(element) {
                let json = {
                    files:element,
                    refId: "5ce6f5cfa483a31aff5113e4",
                    path: "/public/upload",
                    ref: "ficha",
                    field: "images"
                }
                await requestData.submitImg("/upload/", json , sendform.data._id)
                
            });
              
           
            if(sendform.status === 200){
                Swal.fire({
                    type: 'success',
                    title: '¡Formulario guardado!',
                    text: 'Has completado toda la información de esta ficha',
                })
                let cambio =await requestData.putRandom('agendamientos/' + this.props.match.params.handle)
                this.props.history.push({
                    pathname: "/lab/eazyroof_react/form/solicitudes",
                })
            }
            else{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'No hemos podido guardar la información. intentalo más tarde',
                  })
            }
        }
        
        // console.log(this.state.fileList)
        // let form = []
        // for(var i = 0; i< this.state.fileList.length; i++){
        //     console.log(this.state.fileList[i])
        //     form.push(this.state.fileList[i].originFileObj)
        // }
        // let json = {
        //     files:this.state.fileList[0].originFileObj,
        //     refId: "5ce6f5cfa483a31aff5113e4",
        //     path: "/public/upload",
        //     ref: "ficha",
        //     field: "images"
        // }
        // let img = await requestData.submitImg("/upload/", json )
        // console.log(img)


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
            <div className="first-section" style={{paddingBottom: "65px"}}>
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
                        <form onSubmitCapture={ (e)=> this.submitForm(e) }>
                            <Row>
                                <Col md="12">
                                    <div className="common-box__sub animated fadeInRightBig">
                                        <div className="form-group">
                                            <label>Dirección</label>
                                            <input type="text" className="form-control" disabled={true} name="direccion" value={this.state.direccion} placeholder="Dirección" onChange={ (e) => this.handleChange(e.target) }  />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="common-box__sub animated fadeInRightBig">
                                        <div className="form-group">
                                            <label> Superficie útil</label>
                                            <div className="input-group mb-2 mr-sm-2">
                                                <input type="text" name="superficie" placeholder="Superficie" className="form-control" value={ this.state.superficie } required onChange={ (e) => this.handleChange(e.target) }/>
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">m²</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Superficie total</label>
                                            <div className="input-group mb-2 mr-sm-2"> 
                                                <input type="text" className="form-control" required name="superficie_total" value={this.state.superficie_total}  placeholder="Superficie total" onChange={ (e) => this.handleChange(e.target) }  />
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">m²</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Terraza</label>
                                            <div className="input-group mb-2 mr-sm-2">
                                                <input type="text" className="form-control" required name="terraza" placeholder="Terraza" value={this.state.terraza} onChange={ (e) => this.handleChange(e.target) }  />
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
                                        <input type="text" className="form-control"  name="piso" placeholder="Piso" required onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                    <div className="form-group">
                                        <label>Torre</label>
                                        <input type="text" className="form-control" name="torre" placeholder="Torre"  required onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                    <div className="form-group">
                                        <label>Departamento</label>
                                        <input type="text" className="form-control"  name="departamento" required value={this.state.departamento} placeholder="Departamento" onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="form-group">
                                        <label>Estacionamiento</label>
                                        <input type="text" className="form-control"  name="estacionamiento" required placeholder="Estacionamiento" onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                    <div className="form-group">
                                        <label>Estacionamiento</label>
                                        <input type="text" className="form-control" name="estacionamiento_dos" required placeholder="Estacionamiento" onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                    <div className="form-group">
                                        <label>Bodega</label>
                                        <input type="text" className="form-control" name="bodega" required placeholder="Bodega" onChange={ (e) => this.handleChange(e.target) }  />
                                    </div>
                                    <div className="form-group">
                                        <label>Bodega</label>
                                        <input type="text" className="form-control" name="bodega_dos" required placeholder="Bodega" onChange={ (e) => this.handleChange(e.target) }  />
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
                                                    <select  className="custom-select form-control" required name={t.value}  onChange={(e) => this.handleSelect(e, t.value)} >
                                                        <option defaultValue value=""  >-</option>
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
                                                    <select className="form-control" name={t.value} required onChange={(e) => this.handleSelect(e, t.value)} >
                                                        <option defaultValue value=""  >-</option>
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
                                    <button type="submit" className="btn btn-primary main-btn form-btn first-btn"  >Continuar</button>
                                </div>
                            </Col>
                        </Row>
                    
                        </form>
                    </Container>
                </div>
            </div>
        )
    }

}
export default IndexForm