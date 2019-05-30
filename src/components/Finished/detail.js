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
          data: [{ 'solicitud': {} }],
          ficha: {images:[]},
          valores:new Array,

        }
      }
    
      async componentDidMount()
      {
        let id = this.props.match.params.handle;
        let fetch = await requestData.getUsers('agendamientos/' + id)
        if(fetch){
            await this.setState( {
                data: fetch.data,
                ficha: fetch.data.ficha
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
        console.log(this.state.ficha.images)
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