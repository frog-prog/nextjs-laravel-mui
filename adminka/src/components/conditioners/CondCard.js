import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from "@mui/material/CardHeader";
import CondcardButton from "./CondcardButton";
import React, {Component} from 'react';
import theme from "../../theme";
import IconButton from "@mui/material/IconButton";

export default class CondCard extends Component{
    constructor(props) {
        super(props);
        this.presence=this.presence.bind(this)
        this.check=this.check.bind(this)
    }

    presence(){
        if(this.props.card.presence===true){
            return (<Typography variant="h6" color={'#2e7d32'}>
                Есть в наличии
            </Typography>)
        }
        else{
            return (<Typography variant="h6" color={'#d32f2f'}>
                Нет в наличии
            </Typography>)
        }
    }
    check(){
        return this.props.check(this.props.card,'conditioners')
    }
    render() {
        return(
            <Card  sx={{ minWidth: 240, marginTop: 3}}>
                <CardHeader title={this.props.card.Brand.name}/>
                <CardMedia>
                <img
                    src={this.props.card.pic}
                    alt={this.props.card.name}
                    style={{width:'300px',height:'200px'}}
                />
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {this.props.card.name}
                    </Typography>
                    {this.presence()}
                    <Typography variant="h6" color={theme.palette.secondary.dark}>
                        {this.props.card.price} руб.
                    </Typography>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                    <CondcardButton
                        addToDeleted={this.props.addToDeleted}
                        card={this.props.card}
                        selected={this.check()}
                    />
                    <IconButton onClick={()=>{
                        this.props.makeCardDataRequest(this.props.card,'conditioners')
                    }}>
                        <EditIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}