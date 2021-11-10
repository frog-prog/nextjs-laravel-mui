import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import logo from '../../src/logoNew.svg'
import SideList from "./SideList";
import {Component} from 'react';
import CondConteiner from "./conditioners/CondConteiner";
import React from 'react';
import Tabs from './tabs'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import VideoCameraBackIcon from '@material-ui/icons/VideoCam';
import Badge from '@mui/material/Badge';
import { BallTriangle } from 'svg-loaders-react';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from "@material-ui/core/Box";
import CamConteiner from "./cameras/CamConteiner";
import BasketSideCard from "./basket/BasketSideCard";
import SideCard from "./SideCard";
import MainPageConteiner from "./main/MainPageConteiner";

export default class MainConteiner extends Component{
    constructor(props) {
        super(props);
        this.state={
            conditioners:{
                openFilter:'none',
                cards:this.props.cards,
                page:this.props.page,
                count:this.props.count,
                filterData:{
                    digits: {
                        minprice: 0,
                        maxprice: 0,
                        minpower: 0,
                        maxpower: 0,
                    },
                    inverter:false,
                    freezing:false,
                    heating:false,
                    winding:false,
                    drying:false,
                    Brands:[]
                },
                isFetching:false,
            },
            cameras:{
                openFilter:'none',
                cards:this.props.cards,
                page:this.props.page,
                count:this.props.count,
                filterData:{
                    digits:{
                        minprice:0,
                        maxprice:0,
                        minangle:0,
                        maxangle:0,
                        minfar:0,
                        maxfar:0,
                        minres:0,
                        maxres:0,
                    },
                    AHD:false,
                    TVI:false,
                    CVI:false,
                    CVBS:false,
                    PAL:false,
                    move_check:false,
                    water_protect:false,
                    low_temp:false,
                    AV:false,
                    remote_control:false,
                    wireless:false,
                    Brands:[]
                },
                isFetching:false,
            },
            drawer:false,
            cardData:this.props.cardData,
            CardDataFetching:false,
            basket:{
                conditioners:[],
                cameras:[]
            },
            basketOpen:false
        };

        this.shadowState={};
        this.addToBasket=this.addToBasket.bind(this)
        this.handleDrawer=this.handleDrawer.bind(this)
        this.openBasket=this.openBasket.bind(this)
        this.toggleFilters=this.toggleFilters.bind(this)
        this.setCardData=this.setCardData.bind(this);
        this.resetCardData=this.resetCardData.bind(this);
        this.checkCardData=this.checkCardData.bind(this)
        this.makeCardDataRequest=this.makeCardDataRequest.bind(this)
        this.makeRequest=this.makeRequest.bind(this)
        this.rendChild=this.rendChild.bind(this)
        this.PagFunc=this.PagFunc.bind(this)
        this.check=this.check.bind(this)
        this.handlePopState=this.handlePopState.bind(this)
        this.setFilterStateAndRequest=this.setFilterStateAndRequest.bind(this)
    }
    componentDidMount() {
        this.shadowState={...this.state};
        this.shadowState.conditioners={...this.state.conditioners}
        this.shadowState.conditioners={...this.state.conditioners}
        this.shadowState.conditioners.filterData={...this.state.conditioners.filterData}
        this.shadowState.conditioners.filterData.digits={...this.state.conditioners.filterData.digits}
        this.shadowState.cameras={...this.state.cameras}
        this.shadowState.cameras.filterData={...this.state.cameras.filterData}
        this.shadowState.cameras.filterData.digits={...this.state.cameras.filterData.digits}
        this.shadowState.basket={...this.state.basket}
        if(localStorage.getItem('conditioners')!==null&&localStorage.getItem('cameras')!==null){
            this.shadowState.basket.cameras=JSON.parse(localStorage.getItem('cameras'));
            this.shadowState.basket.conditioners=JSON.parse(localStorage.getItem('conditioners'));
        }
        else{
            localStorage.setItem('cameras',JSON.stringify([]));
            localStorage.setItem('conditioners',JSON.stringify([]));
        }
        document.querySelector('#__next').addEventListener('click',(event)=>{
            if(event.target.className==='pagination'){
                event.preventDefault();
            }
        })
        let historyObject={};
        historyObject.mainState=this.shadowState;
        historyObject.section=this.props.section;
        if(this.props.section!=='main') {
            if (this.shadowState.cardData !== 0) {
                this.setState(this.shadowState, () => {
                    history.replaceState(historyObject, '', 'http://localhost:3000/products/' + this.props.section + '/' + this.shadowState.cardData.id);
                })
            } else {
                this.setState(this.shadowState, () => {
                    history.replaceState(historyObject, '', 'http://localhost:3000/' + this.props.section + '/' + this.shadowState[this.props.section].page);
                })
            }
            this.shadowState[this.props.section].filterData.digits = this.props.initData.digits
        }
        else{
            this.setState(this.shadowState, () => {
                history.replaceState(historyObject, '', 'http://localhost:3000/');
            })
        }
        window.onpopstate=(e)=>{this.handlePopState(e)}
    }
    componentWillUnmount() {
        window.onpopstate=null
    }

    setFilterStateAndRequest(state){
        for(let key in state){
            if(key.startsWith('min')||key.startsWith('max')){
                this.shadowState[this.props.section].filterData.digits[key]=state[key]
            }
            else{
                this.shadowState[this.props.section].filterData[key]=state[key]
            }
        }
        this.setState(this.shadowState,()=>{
            this.makeRequest(1);
        })
    }
    handlePopState(e){
        e.preventDefault();
        if(e.state.section===this.props.section){
            let basket={...this.shadowState.basket};
            this.shadowState=e.state.mainState
            this.shadowState.basket=basket;
            this.setState(this.shadowState)
        }
        else{
            this.props.router.replace(e.target.location.href)
        }
    }
    addToBasket(card,section){
        let index=0;
        let basket=this.state.basket;
        let basPart=basket[section];
        index=basPart.findIndex(n => n.id === card.id);
        if(index>=0){
            basPart.splice( index, 1 );
            localStorage.setItem(section,JSON.stringify(basPart));
            basket[section]=basPart;
            this.setState({basket:basket})
            this.shadowState.basket=basket
        }
        else{
            basPart=basPart.concat(card);
            localStorage.setItem(section,JSON.stringify(basPart));
            basket[section]=basPart;
            this.setState({basket:basket})
            this.shadowState.basket=basket
        }
    }
    handleDrawer(){
        this.setState({drawer:!this.state.drawer})
        this.shadowState.drawer=!this.shadowState.drawer
    }
    openBasket(){
        this.setState({basketOpen:!this.state.basketOpen})
        this.shadowState.basketOpen=!this.shadowState.basketOpen
    }
    setCardData(object){
        this.shadowState.cardData=object;
        this.shadowState.CardDataFetching=false;
        let historyObject={};
        historyObject.mainState=this.shadowState;
        historyObject.section=this.props.section;
        this.setState(this.shadowState,()=>{
            history.pushState(historyObject,'','http://localhost:3000/products/'+object.section+'/'+object.id);
        })
    }
    resetCardData(){
        this.setState({cardData: 0})
        this.shadowState.cardData=0
    }
    checkCardData(){
        return !(this.state.cardData===0);
    }
    makeCardDataRequest(card,section){
        this.setState({CardDataFetching:true,cardData:1});
        fetch('http://apiback/api/products/'+section+'/'+card.id)
            .then((response)=>{return response.json()})
            .then((response)=>{
                this.setCardData(response);
            })
    }
    toggleFilters(){
        if (this.shadowState[this.props.section].openFilter==='none'){
            this.shadowState[this.props.section].openFilter='flex'
        }
        else{
            this.shadowState[this.props.section].openFilter='none'
        }
        this.setState(this.shadowState)
    }
    makeRequest(page){
        this.shadowState[this.props.section].isFetching=true;
        this.shadowState[this.props.section].cards=[];
        this.setState(this.shadowState);
        fetch('http://apiback/api/'+this.props.section,{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify([this.shadowState[this.props.section].filterData,page])
        })
            .then((response)=>{return response.json()})
            .then((response)=>{
                if(page===1) {
                    this.shadowState[this.props.section].isFetching=false;
                    this.shadowState[this.props.section].cards=response[1];
                    this.shadowState[this.props.section].count=response[0];
                    this.shadowState[this.props.section].page=page
                    let historyObject={};
                    historyObject.mainState=this.shadowState;
                    historyObject.section=this.props.section;
                    this.setState(this.shadowState ,()=>{
                        history.pushState(historyObject,'','http://localhost:3000/'+this.props.section+'/'+page)
                    });
                }
                else{
                    this.shadowState[this.props.section].isFetching=false;
                    this.shadowState[this.props.section].cards=response;
                    this.shadowState[this.props.section].page=page
                    let historyObject={};
                    historyObject.mainState=this.shadowState;
                    historyObject.section=this.props.section;
                    this.setState(this.shadowState,()=>{
                        history.pushState(historyObject,'','http://localhost:3000/'+this.props.section+'/'+page)
                    });
                }
            })
    }
    PagFunc(page){
        this.makeRequest(page)
    }
    check(card,section){
        return (this.state.basket[section].findIndex((n) => n.id === card.id) >= 0);
    }
    rendChild() {
            if (this.props.section === 'conditioners') {
                return <CondConteiner setIsRouteChanging={this.props.setIsRouteChanging}
                                      initData={this.props.initData}
                                      state={this.state.conditioners}
                                      basket={this.state.basket}
                                      filterData={this.state.conditioners.filterData}
                                      section={this.props.section}
                                      router={this.props.router}
                                      matches={this.props.matches}
                                      matches2={this.props.matches2}
                                      secondLevelMatches={this.props.secondLevelMatches}
                                      thirdLevelMatches={this.props.thirdLevelMatches}
                                      makeCardDataRequest={this.makeCardDataRequest}
                                      PagFunc={this.PagFunc}
                                      check={this.check}
                                      makeRequest={this.makeRequest}
                                      setCardData={this.setCardData}
                                      addToBasket={this.addToBasket}
                                      toggleFilters={this.toggleFilters}
                                      setFilterStateAndRequest={this.setFilterStateAndRequest}
                />
            }
            if (this.props.section === 'cameras') {
                return <CamConteiner setIsRouteChanging={this.props.setIsRouteChanging}
                                     initData={this.props.initData}
                                     filterData={this.state.cameras.filterData}
                                     state={this.state.cameras}
                                     basket={this.state.basket}
                                     section={this.props.section}
                                     router={this.props.router}
                                     matches={this.props.matches}
                                     matches2={this.props.matches2}
                                     secondLevelMatches={this.props.secondLevelMatches}
                                     thirdLevelMatches={this.props.thirdLevelMatches}
                                     makeCardDataRequest={this.makeCardDataRequest}
                                     PagFunc={this.PagFunc}
                                     check={this.check}
                                     makeRequest={this.makeRequest}
                                     setCardData={this.setCardData}
                                     toggleFilters={this.toggleFilters}
                                     addToBasket={this.addToBasket}
                                     setFilterStateAndRequest={this.setFilterStateAndRequest}
                />
            }
            if (this.props.section === 'main') {
                return <MainPageConteiner setIsRouteChanging={this.props.setIsRouteChanging}
                                            router={this.props.router}
                                            matches={this.props.matches}
                                            matches2={this.props.matches2}
                                            text={this.props.text}
                                            secondLevelMatches={this.props.secondLevelMatches}
                                            thirdLevelMatches={this.props.thirdLevelMatches}
                />
            }
            if (this.props.section === '404') {
                return '404'
            }
    }
    render() {
        return (
            <>
                <AppBar position={'static'}>
                    <ToolBar>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
                            <Box sx={{
                                maxWidth: '30%',
                                justifyContent: 'flex-start',
                                height: '48px',
                                position: 'relative',
                                display: 'flex'
                            }}>
                                <img src={logo.src} style={{width:'100%'}}/>
                            </Box>
                            <Box sx={{justifyContent: 'flex-end', width: '50%', position: 'relative', display: 'flex'}}>
                                <Box sx={{justifyContent: 'space-around', height: '100%',marginRight:'10px', flexDirection:'column', position: 'relative', display: 'flex'}}>
                                    <Button variant={"contained"} size={'small'} sx={{height:'50%'}} color={"secondary"} onClick={this.openBasket}>
                                    Корзина
                                    </Button>
                                    <Box sx={{justifyContent: 'space-between', width: '100%', position: 'relative', display: 'flex'}}>
                                        <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} color="secondary" badgeContent={this.state.basket.conditioners.length}>
                                        <AcUnitIcon sx={{height:'90%'}}/>
                                        </Badge>
                                        <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} color="secondary" badgeContent={this.state.basket.cameras.length}>
                                        <VideoCameraBackIcon sx={{height:'90%'}}/>
                                        </Badge>
                                    </Box>
                                </Box>
                                <Tabs initialState={this.props.section} handleDrawer={this.handleDrawer}/>
                            </Box>
                        </Box>
                    </ToolBar>
                </AppBar>
                <Container disableGutters maxWidth={false} sx={{width: '100%', maxWidth: '1024px', minHeight: '100vh', paddingBottom:3}}>
                    <div className={'indicator'}>
                        <BallTriangle stroke={'#000'}/>
                    </div>
                    <div className={'content'}>
                        {this.rendChild()}
                    </div>
                </Container>
                <SideList handleDrawer={this.handleDrawer} initialState={this.props.section} open={this.state.drawer}/>
                <BasketSideCard section={this.props.section}
                                open={this.state.basketOpen}
                                basket={this.state.basket}
                                openBasket={this.openBasket}
                                check={this.check}
                                addToBasket={this.addToBasket}
                                makeCardDataRequest={this.makeCardDataRequest}
                                setCardData={this.setCardData}/>
                <SideCard resetCardData={this.resetCardData}
                          section={this.state.cardData.section}
                          navSection={this.props.section}
                          shadowState={this.shadowState}
                          isFetching={this.state.CardDataFetching}
                          card={this.state.cardData}
                          check={this.check}
                          open={this.checkCardData()}
                          addToBasket={this.addToBasket}/>
            </>
        )
    }
}
