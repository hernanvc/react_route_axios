import React, { Component } from 'react';
import {Row, Container, Col} from 'reactstrap';
import {requestData} from '../services/request.service'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table} from 'antd';
const { Column, ColumnGroup } = Table;

class Solicitudes extends Component{
    constructor(props) {
        super(props);
        this.state = 
        {
          data: [{ 'solicitud': {} }],
          loader: true
        }
      }
    
      async componentDidMount()
      {
        let token = localStorage.getItem('token')
        if(token){
            let user =  await JSON.parse(localStorage.getItem("user"));
            let fetch = await requestData.getUsers('agendamientos/')
            if(fetch){
                let data = []
                console.log(fetch.data, fetch)
                fetch.data.forEach(element => {
                    console.log(element)
                    if(element.user){
                        if(element.user.id === user._id){
                            data.push(element)
                        }
                    }
                });
                await this.setState( {
                    data: data,
                    loader: false
                });
            }
        }
        else{
            this.props.history.push("/lab/eazyroof_react/form/")
        }
    }

    render(){

        return(
            <div className="first-section" style={{paddingBottom: "65px"}}>
                <div className="">
                    <Container>
                        <Row>
                            <Col md={{ offset: 3, size: 6 }} lg={{ offset: 4, size: 4 }} sm={{ offset: 2, size: 8 }}>
                                <img src={require("../../assets/images/logo.png")} className="img-responsive" alt="logo"/>
                                <h6 className="text-center">FICHA TASADOR</h6>
                                <br/>
                                <br/>
                            </Col>
                            <Col md={{ size: 3 }} lg={{ size: 4 }} sm={{size: 2 }}>
                                <Link style={ {display: "block", width: "100%", lineHeight: "40px"} } to="/lab/eazyroof_react/form/complete" className="main-btn">Ver solicitudes completas</Link>
                                <br/>
                                <br/>
                            </Col>
                        </Row>
                        {this.state.loader ? <h3>Buscando Solicitudes...</h3> :
                        <Row>
                            <Col md={{ size:12 }}>
                                <Table dataSource={this.state.data} rowKey="id"> 
                                    <Column
                                    title="Nombre"
                                    dataIndex="nombre"
                                    key="nombre"
                                    />
                                    <Column
                                    title="Correo"
                                    dataIndex="solicitud.email"
                                    key="solicitud.email"
                                    />
                                    <Column
                                    title="Valor propiedad"
                                    dataIndex="solicitud.precio_referencial"
                                    key="solicitud.precio_referencial"
                                    />
                                    <Column
                                    title="Dirección"
                                    dataIndex="solicitud.direccion"
                                    key="solicitud.direccion"
                                    />
                                    <Column
                                    title="Estado"
                                    dataIndex="estado"
                                    key="estado"
                                    />
                                    <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record) => (
                                        <span>
                                            <Link className="main-btn" style={{display: "block", padding: "8px 10px", width: "100%", borderRadius: "6px"}} href="javascript:;" to={"/lab/eazyroof_react/form/solicitudes/" + record.id}  params={record.id}>Completar solicitud {record.lastName}</Link>

                                            <Link className="main-btn" style={{display: "block", padding: "8px 10px", width: "100%", borderRadius: "6px", marginTop: "20px"}} href="javascript:;" to={"/lab/eazyroof_react/form/ficha=" + record.id}  params={record.id}>Ver Ficha {record.lastName}</Link>
                                        </span>
                                    )}
                                    />
                                </Table>
                            </Col>
                        </Row> }
                    </Container>
                </div>
            </div>
        )
    }

}
export default Solicitudes