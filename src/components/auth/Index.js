import React, { Component } from 'react';
import {Row, Container, Col, Form, Input, FormGroup, Label} from 'reactstrap';
import {requestData} from '../services/request.service'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = 
        {
          email: "",
          password: "",
          error: []
        }
      }
    
      async componentDidMount()
      {

      }

      handleChange(e) {
        this.setState({
            [e.name]: e.value
        })
    }

    async handleSubmit(e){
        e.preventDefault()
        var valido = true;
        var error = '';
        var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.password === '') {
                valido = false;
                error += "Ingresa tu contraseña. \n"
        }
        if (this.state.email === '') {
            valido = false;
            error += "Ingresa tu correo. \n"
        }
        else{
            if (!regExpEmail.test(this.state.email)) {
                valido = false;
                error += 'El correo electrónico debe contener el formato correcto.\n';
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
                return false;
        }
        else{
            console.log("hola")
            let setuser = await requestData.sendData(this.state)
            if(setuser){
                console.log(setuser)
                this.props.history.push({
                    pathname: "/lab/eazyroof_react/form/solicitudes",
                })
                await this.setState({
                    password: "",
                    email: "",
                    error:[],
                    loader: false
                })
            }
            else{
                this.setState({
                    error: "Ha ocurrido un error",
                    loader: false
                })
            }
        }
    }
    render(){

        return(
            <section className="login">
                <Container>
                    <Row>
                        <Col xl={{ size: 4, offset:4 }} lg={{ size: 4, offset:4 }} md={{ size: 6, offset:3 }}>
                            <div className="cont-register">
                                <Form>
                                    <FormGroup className="text-center">
                                        <img src={require("../../assets/images/logo.png")} alt="logo"/>
                                        <p>Ingresa con tu correo electrónico y tu contraseña</p>
                                        <hr/>
                                    </FormGroup>
                                    { this.state.error.length >= 1 ? <p style={{ color: "#cc0000" }}> {this.state.error} </p> : null  }
                                    <FormGroup> 
                                        <Label>Email</Label>
                                        <Input name="email" type="email" placeholder="Correo eléctronico" value={ this.state.email } onChange={ (e)=> this.handleChange(e.target) }/>
                                    </FormGroup>
                                    {/*<FormGroup> 
                                        <Label>Username</Label>
                                        <Input name="username" type="text" placeholder="Correo eléctronico" value={ this.state.username } onChange={ (e)=> this.handleChange(e.target) }/>
                                    </FormGroup>*/}
                                    <FormGroup> 
                                        <Label>Contraseña</Label>
                                        <Input name="password" type="password" placeholder="Contraseña" value={ this.state.password } onChange={ (e)=> this.handleChange(e.target) }/>
                                    </FormGroup>
                                    <FormGroup>
                                        <button className="main-btn" onClick={ (e) => this.handleSubmit(e)}> <i className="fa fa-sign-in"></i> Ingresar</button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }

}
export default Login;