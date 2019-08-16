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
import ReactExport from "react-export-excel";


const { Column, ColumnGroup } = Table;


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];
var propiedades_excel = [];

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
            type: "",
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
        let id = this.props.match.params.handle;
        let fetch = await requestData.getDetail('agendamientos?id=' +id)
        if(fetch){
            console.log(fetch.data, "fetch")
            let data = fetch.data[0]
            let datos_referencia = []
            datos_referencia = data.datos_de_referencia ? data.datos_de_referencia[data.datos_de_referencia.length - 1] : []
            await this.setState({
                data,
                datos_referencia: datos_referencia,
                type: fetch.data[0].solicitud.tipo
            });
        }
        await this.setState({
            direccion: this.state.data.solicitud ? this.state.data.solicitud.direccion : "",
        }) 

    }
    
    renderProm(){
<<<<<<< HEAD

        propiedades_excel = [];
        console.log('====================================')
        console.log(this.state.datos_referencia)
        console.log('====================================')
=======
>>>>>>> 070f0021fcdc17251bceeed265e5926d8c4f4a62
        let prom = 0
        let arrayLength = this.state.datos_referencia.length;
        let count = 0;
        let precio_metros_depurar = 0;
        let precio_diefinitivo =  "";
        console.log(this.state.datos_referencia)
        this.state.datos_referencia.forEach(element => {
            console.log(element, "este es el item")
            let precioSinPuntos = element[0].replace("UF", "")
            precioSinPuntos = precioSinPuntos.replace(/\./g, "")
            let PrecioFinal = parseInt(precioSinPuntos)
            let metro_sin_depurar = element[1].replace("Superficie:", "").replace("m²", "")
            console.log(metro_sin_depurar);
            let arrray_metro = metro_sin_depurar.split("/")
            //PrecioFinal = parseInt(PrecioFinal)
            let metro = 0;
          
            if (arrray_metro.length <2){
                metro = arrray_metro[0].replace(".", "").replace(",", ".")
            }else{
                console.log(arrray_metro[1]);
                console.log(arrray_metro[0])
                console.log(this.state.data.solicitud.tipo)
                if (this.state.data.solicitud.tipo == "departamento"){
                    let total = parseFloat(Math.round(arrray_metro[1].trim().replace(".", "").replace(",", ".")));
                    let construido = parseFloat(Math.round(arrray_metro[0].trim().replace(".", "").replace(",", ".")));
                    let terrasa = total - construido;
                    let terrasa_monto = terrasa / 2;
                    let metros = construido + terrasa_monto;
                    let metro_propiedad = parseFloat(Math.round(PrecioFinal / metros));
                    precio_metros_depurar = precio_metros_depurar + metro_propiedad
                    count += 1
                    console.log('====================================')
                    console.log(total)
                    console.log('====================================')
                    console.log('====================================')
                    console.log(construido)
                    console.log('====================================')
                    var excel = {
                        preciouf: precioSinPuntos,
                        construido: construido,
                        terrasa: terrasa,
                        nombre: element[2]
                    };
                    propiedades_excel.push(excel);
                }else{
                    let total = parseFloat(Math.round(arrray_metro[1].trim().replace(".", "").replace(",", ".")));
                    let construido = parseFloat(Math.round(arrray_metro[0].trim().replace(".", "").replace(",", ".")));
                    let terrasa = total ;
                    let precio_counstruido = construido * 30
                    let precio_terreno = precioSinPuntos - precio_counstruido
                    let precio_metro_terreno = precio_terreno / terrasa
                    precio_metros_depurar = precio_metros_depurar + precio_metro_terreno
                    count += 1
                    console.log('================precio_counstruido====================')
                    console.log(precio_counstruido)
                    console.log(precio_terreno)
                    console.log(precio_metro_terreno)
                    console.log('====================================')
                    var excel = {
                        preciouf: precioSinPuntos,
                        construido: construido,
                        total: total,
                        nombre: element[2]
                    };
                    propiedades_excel.push(excel);
                }
                
                
            }

            if (this.state.data.solicitud.tipo == "departamento") {
                let factores = [1.2, 1.05, 1, 0.9, 0.8]
                let pricio_metro_medio = precio_metros_depurar / count;
                let terrasa_metros = this.state.data.solicitud.terraza / 2;
                let pricio_final = pricio_metro_medio * parseFloat(Math.round(this.state.data.solicitud.metros_cuadrados));
                let pricio_final_d = (pricio_final * factores[this.state.data.solicitud.antiguedad]) * 0.95;
                console.log('==================precio final==================')
                console.log(pricio_final)
                console.log(pricio_final_d)

                console.log('====================================')
                // prom = prom + PrecioFinal
                pricio_final_d = parseInt(pricio_final_d).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                console.log('====================================')
                precio_diefinitivo = pricio_final_d;
                console.log(pricio_final_d)
                return pricio_final_d
            }else{
                let factores = [1.2, 1.05, 1, 0.9, 0.8]
                let pricio_metro_medio = precio_metros_depurar / count
                let pricio_final = (pricio_metro_medio * parseFloat(Math.round(this.state.data.solicitud.terraza)) + (30 * parseFloat(Math.round(this.state.data.solicitud.metros_cuadrados))));
                let pricio_final_d = (pricio_final * factores[this.state.data.solicitud.antiguedad]) * 0.97;
                precio_diefinitivo = pricio_final_d;
                console.log('====================================')
                // prom = prom + PrecioFinal
                pricio_final_d = parseInt(pricio_final_d).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                console.log('====================================')
                precio_diefinitivo = pricio_final_d;
                console.log(pricio_final_d)
                return pricio_final_d
            }
            

        });
        let promedio = parseInt(prom / arrayLength)
        promedio = promedio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return precio_diefinitivo
    }


    miportal(){

    }

    async deleteItem(e) {
        let arr = this.state.datos_referencia;
         if (e > -1) {
            arr.splice(e, 1);
        }
        await this.setState({
            datos_referencia: arr
        })
        let params = {
            "datos_de_referencia": arr
        }
        let updateJson = await requestData.update('agendamientos/' + this.state.data.id, params)
        console.log(updateJson, this.state.data)
    }

    renderURLImg(esto){
        let url = esto.replace('url("', "")
        url = url.replace('")', "")
        return url
    }

    goProperty(record){
        let base_dos = ""
        let base_nombre = record[2].toLowerCase().replace("/"," ");
        var arrayDeCadenas = base_nombre.split(" ");
        arrayDeCadenas.forEach(element => {
            element.replace("-","")
            if(element != ""){
                base_dos = base_dos+"-"+element.replace("-","")
            }
        })
        let base = "https://www.portalinmobiliario.com/venta/"+this.state.type+"/"+record[3]+base_dos+"-uda"
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
                                    <h6 className="text-center">Nombre:{this.state.data.solicitud ? this.state.data.solicitud.nombre : ""}</h6>
                                    <hr/>
                                </div>
                            </Col>
                            
                            {this.state.data.solicitud.tipo != 'casa' ?
                            
                            <ExcelFile element={<button>Descargar Excel</button>}>
                                <ExcelSheet data={propiedades_excel} name="Employees">
                                    <ExcelColumn label="Precio" value="preciouf" />
                                    <ExcelColumn label="Metros construido" value="construido" />
                                    <ExcelColumn label="Terrasa" value="terrasa" />
                                    <ExcelColumn label="Nombre" value="nombre" />
                                       
                                </ExcelSheet>
                               
                            </ExcelFile>
                            :
                                <ExcelFile element={<button>Descargar Excel</button>}>
                                    <ExcelSheet data={propiedades_excel} name="Employees">
                                        <ExcelColumn label="Precio" value="preciouf" />
                                        <ExcelColumn label="Metros construido" value="construido" />
                                        <ExcelColumn label="Total" value="total" />
                                        <ExcelColumn label="Nombre" value="nombre" />

                                    </ExcelSheet>

                                </ExcelFile>
                            }
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
                                                <img style={{maxHeight: "120px"}} src={this.renderURLImg(record[4])} alt={index} />
                                            </span>
                                        )}
                                    />
                                    <Column
                                    title="Nombre"
                                    dataIndex="nombre"
                                    key="nombre"
                                    render={(text, record, index) => (
                                        <span>
                                            {record[3]}
                                        </span>
                                    )}
                                    />
                                    <Column
                                    title="Precio"
                                    dataIndex="precio"
                                    key="precio"
                                    render={(text, record, index) => (
                                        <span>
                                            {record[0]}
                                        </span>
                                    )}
                                    />
                                    <Column
                                    title="Superficie"
                                    dataIndex="superficie"
                                    key="superficie"
                                    render={(text, record, index) => (
                                        <span>
                                            {record[1]}
                                        </span>
                                    )}
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