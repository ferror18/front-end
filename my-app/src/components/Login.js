import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loginUser, createUser } from '../actions/userActions';
import { formStyles } from "../styles/formStyles";
import { useHistory, NavLink } from "react-router-dom";

const LoginForm = props => {
    const history = useHistory()
    const [login, setLogin] = useState({
        username: '',
        password: '',
    })
    const { StyledForm,
        StyledError,
        Tittle,
        StyledInputs
     } = formStyles

    const onChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        props.loginUser(login);
        console.log(props, '<------ THIS ARE MY PROPS AL---->');
    }
    useEffect(()=>{
        console.log(props, '<----THIS ARE THE PROPS UE---->');
        if(props.id !== null && props.error === false){
            history.push("/dashboard")
        }
    }, [props])
    return (
        <StyledForm onChange={onChange} onSubmit={onSubmit} className='loginForm'>
        <Tittle>Login</Tittle>
    {props.error ? (<StyledError>{
        props.error.status === 500
        ? 'User not registered'
        : 'Wrong Password'
        }</StyledError>): <div/>}
        <label>Username: </label>
        <StyledInputs required type='text' name='username' value={login.username}/>
        <label>Password: </label>
        <StyledInputs required type='password' name='password' value={login.password}/>
        <StyledInputs style={{margin: '1rem 0'}} type='submit' value='Log In'/>
            <br/>
            <NavLink to="/signup"><StyledInputs type='button' style={{margin: ' 0'}} value='Register'/></NavLink>
            <br/>
            <NavLink to="/"><StyledInputs type='button' style={{margin: ' 0'}} value='Home'/></NavLink>
        </StyledForm>
    )
}

const mapStateToProps = state => {
    console.log('BRELI', state);
    return {
        id: state.user.userid,
        isFetching: state.user.isFetching,
        username: state.user.name,
        error: state.user.error,
    };
};

export default connect(
    mapStateToProps,
    { loginUser, createUser }
)(LoginForm)