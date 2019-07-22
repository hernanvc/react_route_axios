import React, { Component } from 'react';
import {Regiones } from './partials/Comunas';
import {Calidad } from './partials/Calidad';
import {Proximidad } from './partials/Proximidad';
import {Orientacion } from './partials/Orientacion';
import {Comparacion } from './partials/Comparacion';
import {Consolidacion } from './partials/Consolidacion';
import {Fields} from './partials/data';
import {Row, Container, Col} from 'reactstrap';
import {requestData} from '../services/request.service';
import 'antd/dist/antd.css';
import { Table} from 'antd';
const { Column, ColumnGroup } = Table;

class Ficha extends Component{
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
            datos_referencia:[],
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
            let datos_referencia = []
            datos_referencia = data.datos_de_referencia ? data.datos_de_referencia : []
            let final_array = []
            datos_referencia.forEach(element => {
                if(element.nombre !== "" && element.precio !== ""){
                    final_array.push(element)
                }
            });
            await this.setState({
                data,
                datos_referencia: final_array
            });
        }

        console.log(this.state.datos_referencia)
        
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
    renderProm(){
        let prom = 0
        let arrayLength = this.state.datos_referencia.length;
        this.state.datos_referencia.forEach(element => {
            let precioSinPuntos = element.precio.replace("UF", "")
            precioSinPuntos = precioSinPuntos.replace(/\./g, "")
            let PrecioFinal = parseInt(precioSinPuntos)
            //PrecioFinal = parseInt(PrecioFinal)

            prom = prom + PrecioFinal

        });
        let promedio = parseInt(prom / arrayLength)
        console.log(prom, arrayLength, promedio)
        promedio = promedio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return promedio
    }

    async deleteItem(e) {
        let arr = this.state.datos_referencia;
         if (e > -1) {
            arr.splice(e, 1);
        }
        await this.setState({
            datos_referencia: arr
        })
    }

    renderURLImg(esto){
        let url = esto.replace('url("', "")
        url = url.replace('")', "")
        return url
    }

    goProperty(record){
        let tipo = this.state.data.solicitud.tipo
        let base_dos = ""
        let base_nombre = record.nombre.toLowerCase().replace("/"," ");
        var arrayDeCadenas = base_nombre.split(" ");
        arrayDeCadenas.forEach(element => {
            element.replace("-","")
            if(element != ""){
                base_dos = base_dos+"-"+element.replace("-","")
            }
        })
        let base = "https://www.portalinmobiliario.com/venta/"+tipo+"/"+record.id+base_dos+"-uda"
        return base
    }

    render(){

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
                        <Row>
                            <Col lg="12">
                                <h3 style={{ margin: '16px 0' }}>Detalles</h3>
                                <h5>Dirección: <b>{this.state.data.solicitud ? this.state.data.solicitud.direccion : ""}</b></h5>
                                <br/>
                                <Table dataSource={this.state.datos_referencia} rowKey="id"> 
                                    <Column
                                        title="Imagen"
                                        key="imagen"
                                        render={(text, record, index) => (
                                            <span>
                                                <img style={{maxHeight: "120px"}} src={this.renderURLImg(record.imagen)} alt={index} />
                                            </span>
                                        )}
                                    />
                                    <Column
                                    title="Nombre"
                                    dataIndex="nombre"
                                    key="nombre"
                                    />
                                    <Column
                                    title="Precio"
                                    dataIndex="precio"
                                    key="precio"
                                    />
                                    <Column
                                    title="Superficie"
                                    dataIndex="superficie"
                                    key="superficie"
                                    />
                                    <Column
                                        title="Acción"
                                        key="action"
                                        render={(text, record, index) => (
                                            <span>
                                                <a href={this.goProperty(record) } className="main-btn" style={{ padding: "8px 10px", width: "100%", borderRadius: "6px", lineHeight: "24px", display: "block"}} target="_blank" > Ver </a>
                                                <button className="main-btn" style={{display: "block", padding: "8px 10px", width: "100%", borderRadius: "6px", lineHeight: "24px"}} onClick={(e)=>this.deleteItem(index) }> Eliminar </button>
                                            </span>
                                        )}
                                    />
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="text-right">
                                <h3>Total  {this.renderProm()} <sup>UF</sup> </h3>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

}
export default Ficha