import Box from '@mui/material/Box';
import React from 'react';
import Switch from "@mui/material/Switch";

export default class UserList extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            list:[]
        }
        this.shadowState={}
    }

    componentDidMount() {
        fetch('http://apiback/api/administration/users',{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(
                {
                    token:localStorage.getItem('token'),
                })
        })
            .then((response)=>{return response.json()})
            .then((response)=>{this.setState({list:response},()=>{this.shadowState={...this.state}})})
    }
    changeRang(id){
        let index=this.state.list.findIndex(n => n.id === id);
        let user=this.state.list[index];
        let role=user.role;
        let newRang=0;
        if(role===1){
            this.shadowState.list[index].role=2;
             newRang=2;
        }
        else {
            this.shadowState.list[index].role=1;
             newRang=1;
        }
        this.setState(this.shadowState);
        fetch('http://apiback/api/administration/changerang',{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(
                {
                    token:localStorage.getItem('token'),
                    id:user.id,
                    rang:newRang
                })
        })
    }
    render(){
        console.log(this.state.list)
        return(<Box sx={{display:'flex',width:'100%',justifyContent:'flex-start',flexDirection:'column'}}>
                {this.state.list.map((i,j)=>{
                    return(
                        <Box sx={{padding:'5px', display:'flex',width:'100%'}} key={j}>
                            <Box sx={{display:'flex',width:'50%', flexWrap:'wrap'}}>{i.login}</Box>
                            <Box sx={{display:'flex',width:'50%', flexWrap:'nowrap'}}>
                            <Box>Р</Box>
                            <Switch onChange={()=>this.changeRang(i.id)} color="default" checked={i.role===2}/>
                            <Box>А</Box>
                            </Box>
                        </Box>)
                })}
            </Box>
        )}

}