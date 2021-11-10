import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import theme from "../../theme";
import React, {Component} from 'react';
import PictureSlider from "../PictureSlider";

export default class ProductCamCard extends Component{
    constructor(props) {
        super(props);
        this.state={
            card:this.props.card,
            basket:{
                conds:[],
                cams:[]
            }
        }
        // this.check=this.check.bind(this)
        // this.addToBasket=this.addToBasket.bind(this);
    }
    componentDidMount() {
        if(localStorage.getItem('conds')!==null&&localStorage.getItem('cams')!==null){
            this.setState({basket:{cams:JSON.parse(localStorage.getItem('cams'))}});
        }
        else{
            localStorage.setItem('cams',JSON.stringify([]));
        }
        let state=this.state;
        this.setState({cards:[]},()=>{this.setState({cards:state.cards})});
        history.replaceState({state},'','http://localhost:3000/products/camera/'+state.card[0].id)
    }
    componentDidUpdate() {
        document.querySelector('.content').style.display='flex';
        document.querySelector('.indicator').style.display='none';
            document.querySelectorAll('.pagination-tab-cameras').forEach((i) => {
                i.addEventListener('click', (event) => {
                    event.preventDefault();
                })
            })
        document.querySelectorAll('.pagination').forEach((i)=>{i.addEventListener('click',(event)=>{
            event.preventDefault();
        })
        })
    }
    render(){
        return(
            <Paper sx={{display:'flex',flexDirection:'column', width:'100%', marginTop: 3, paddingBottom: 3, background: theme.palette.secondary.light}}  elevation={2}>
                <PictureSlider images={this.props.card[1]} name={this.props.card[0].name}/>
            </Paper>
        );
    }


}