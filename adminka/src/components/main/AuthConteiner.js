import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import theme from "../../theme";
import React, {Component} from 'react';
import UserList from "../UserList";
import {BallTriangle} from "svg-loaders-react";
import Typography from "@material-ui/core/Typography";

export default function AuthConteiner(props){
    const rendChild=()=>{
        if (props.authStatus==='try'){
            return(
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-around', flexDirection:'row'}}>
                    <BallTriangle/>
                </Box>
            )
        }
        if(props.authStatus==='ready'){
            if(props.role===0) {
                console.log(props.errors);
                return (
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
                        {props.errors.map((i,j) => {
                            return (<Typography key={j} sx={{
                                width: '100%',
                                color: 'error',
                                align: 'center',
                                marginTop: '10px'
                            }}>{i}</Typography>)
                        })}
                        <TextField
                            sx={{width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '15px'}}
                            required
                            id="outlined-login"
                            label="Логин"
                            onChange={(e) => {
                                props.handleAuth('login', e.target.value)
                            }}
                            value={props.login}
                        />
                        <TextField
                            sx={{width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '15px'}}
                            required
                            id="outlined-password"
                            label="Пароль"
                            onChange={(e) => {
                                props.handleAuth('password', e.target.value)
                            }}
                            type="password"
                            value={props.password}
                        />
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            <Button onClick={() => {
                                props.authSend('login')
                            }}>Войти</Button>
                            <Button onClick={() => {
                                props.authSend('registration')
                            }}>Зарегестрироваться</Button>
                        </Box>
                    </Box>
                )
            }
            if(props.role===1){
                return (
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            <Button onClick={props.exitSend}>Выйти</Button>
                        </Box>
                    </Box>
                )
            }
            if(props.role===2){
                return (
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            <Button onClick={props.exitSend}>Выйти</Button>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            <UserList/>
                        </Box>
                    </Box>
                )
            }
        }
    }
    return(
        <Paper sx={{display:'flex',flexDirection:'column', width:'100%', maxWidth:'400px', marginTop: 3, paddingBottom: 3, background: theme.palette.secondary.light}}  elevation={2}>
            <Box sx={{display:'flex', width:'100%'}}>
                {rendChild()}
            </Box>
        </Paper>
    )
}