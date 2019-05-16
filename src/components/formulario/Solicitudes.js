import React, { Component } from 'react';
import {Row, Container, Col} from 'reactstrap';
import {requestData} from '../services/request.service'
import { Table} from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
const { Column, ColumnGroup } = Table;

class Solicitudes extends Component{
    constructor(props) {
        super(props);
        this.state = 
        {
          data: [{ 'solicitud': {} }]
        }
      }
    
      async componentDidMount()
      {
        let fetch = await requestData.getUsers('agendamientos/')
        if(fetch){
          await this.setState( {
            data: fetch.data
          });
        }
      }

    render(){

        return(
            <div className="first-section">
                <div className="">
                    <Container>
                        <Row>
                            <Col md={{ offset: 3, size: 6 }} lg={{ offset: 4, size: 4 }} sm={{ offset: 2, size: 8 }}>
                                <img src={require("../../assets/images/logo.png")} className="img-responsive" alt="logo"/>
                                <h6 className="text-center">FICHA TASADOR</h6>
                                <br/>
                                <br/>
                            </Col>
                        </Row>
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
                                    title="Dirección"
                                    dataIndex="estado"
                                    key="estado"
                                    />
                                    <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record) => (
                                        <span>
                                            <Link className="main-btn" style={{display: "block", padding: "8px 10px", width: "100%", borderRadius: "6px"}} href="javascript:;" to={"/lab/eazyroof_react/form/solicitudes/" + record.id}  params={record.id}>Completar solicitud {record.lastName}</Link>
                                        </span>
                                    )}
                                    />
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

}
export default Solicitudes