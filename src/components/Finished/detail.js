import React, { Component } from 'react';
import {Row, Container, Col} from 'reactstrap';
import {requestData} from '../services/request.service';
import { List, Typography } from 'antd';
import 'antd/dist/antd.css';
import { API_URL } from '../../env';

class DetailFinished extends Component{
    constructor(props) {
        super(props);
        this.state = 
        {
          data: [{ 'solicitud': {'direccion': ""} }],
          ficha: {images:[]},
          valores:new Array,
          price: ""

        }
      }
    
      async componentDidMount()
      {
        let id = this.props.match.params.handle;
        let fetch = await requestData.getUsers('agendamientos/' + id)
        if(fetch){
            await this.setState( {
                data: fetch.data,
                ficha: fetch.data.ficha,
                price: fetch.data.solicitud.precio_referencial
            });
        }
        let obj = this.state.ficha
        let arr = []
        Object.entries(obj).map(([key, value]) => (
            arr.push({key,value})
        ));
        let ultimateArr = []
        arr.forEach(element => {
            if(element.key !== "images" ){
                ultimateArr.push(element)
            }  
        });
        await this.setState({
            valores: ultimateArr
        })

        
    }
    renderImg(){
        return this.state.ficha.images.map((item, index)=>{
            return <Col xl="4" lg="4" md="6" sm="6" xs="12" key={index}><img  src={API_URL + item.url} alt={index} /></Col>
        })
    }
    
    render(){
        return(
            <div className="first-section detalle-ficha" style={{paddingBottom: "65px"}}>
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3 style={{ margin: '16px 0' }}>Detalles</h3>
                            <h5>Dirección: <b>{this.state.data.solicitud ? this.state.data.solicitud.direccion : ""}</b></h5>
                            <h5>Precio referencial: <b>{ this.state.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} UF</b></h5>
                            <br/>
                            <List
                            size="small"
                            header={<div>Valores</div>}
                            bordered
                            dataSource={this.state.valores}
                            renderItem={item => <List.Item><p>{item.key}: <span>{item.value}</span> </p></List.Item>}
                            />
                            <br/>
                            <Row>{this.renderImg()}</Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}
export default DetailFinished