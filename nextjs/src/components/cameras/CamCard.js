import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from "@material-ui/core/CardHeader";
import CamcardButton from "./CamcardButton";
import React, {Component} from 'react';
import Link from 'next/link';
import theme from "../../theme";

export default class CamCard extends Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.presence = this.presence.bind(this)
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
    render() {
        return(
            <Card  sx={{ minWidth: 240, marginTop: 3}}>
                <CardHeader title={this.props.card.Brand.name}/>
                <CardMedia>
                <Image
                    height="150"
                    width="240"
                    src={this.props.card.pic}
                    alt="green iguana"
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
                    <CamcardButton
                        addToBasket={this.props.addToBasket}
                        card={this.props.card}
                        section={'cameras'}
                        selected={this.props.check(this.props.card,'cameras')}
                    />
                    <Button onClick={()=>{
                        this.props.makeCardDataRequest(this.props.card,'cameras')
                    }}>
                            <a href={'http://localhost:3000/products/cameras/'+this.props.card.id} className={'pagination'}>
                                Подробнее
                            </a>
                    </Button>
                </CardActions>
            </Card>
        );
    }
}