import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import SideList from "./SideList";
import {Component} from 'react';
import CondConteiner from "./conditioners/CondConteiner";
import React from 'react';
import Tabs from './tabs'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { BallTriangle } from 'svg-loaders-react';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from "@mui/material/Box";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import CamConteiner from "./cameras/CamConteiner";
import startPreparing from "../startPreparing";
import MainPageConteiner from "./main/MainPageConteiner";
import AuthConteiner from "./main/AuthConteiner";
import SideCard from "./SideCard";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

export default class MainConteiner extends Component{
    constructor(props) {
        super(props);
        this.state={
            role:0,
            tokenChecking:true,
            authStatus:'ready',
            authErrors:[],
            section:'main',
            conditioners:{
                cards:[],
                page:1,
                count:0,
                brands:[],
                brandsUploaded: false,
                isFetching:true,
            },
            cameras:{
                cards:[],
                page:1,
                count:0,
                brands:[],
                brandsUploaded: false,
                isFetching:true,
            },
            main:{
                isFetching:true,
                text:'',
                files:[],
                uploadedFiles:[]
            },
            authorize:{
              password:'',
              login:''
            },
            deleted:{
              conditioners: [],
              cameras:[]
            },
            drawer:false,
            cardData:0,
            mode:0,
            info:'',
            cardSection:'',
            CardDataFetching:false,
        };
        this.shadowState={};
        this.handleDrawer=this.handleDrawer.bind(this);
        this.setCardData=this.setCardData.bind(this);
        this.resetCardData=this.resetCardData.bind(this);
        this.checkCardData=this.checkCardData.bind(this);
        this.makeCardDataRequest=this.makeCardDataRequest.bind(this);
        this.rendChild=this.rendChild.bind(this);
        this.PagFunc=this.PagFunc.bind(this);
        this.changeSection=this.changeSection.bind(this);
        this.addToDeleted=this.addToDeleted.bind(this);
        this.delButton=this.delButton.bind(this);
        this.check=this.check.bind(this);
        this.saveTextDataChange=this.saveTextDataChange.bind(this);
        this.delMarked=this.delMarked.bind(this);
        this.handleAuth=this.handleAuth.bind(this);
        this.authSend=this.authSend.bind(this);
        this.exitSend=this.exitSend.bind(this);
        this.handleFileEvent=this.handleFileEvent.bind(this);
        this.handleBrand=this.handleBrand.bind(this);
        this.changeSwitch=this.changeSwitch.bind(this);
        this.handleNumberChange=this.handleNumberChange.bind(this);
        this.addDeletedPic=this.addDeletedPic.bind(this);
        this.delFromFiles=this.delFromFiles.bind(this);
        this.fetchCardSaveOrChange=this.fetchCardSaveOrChange.bind(this);
        this.changeText=this.changeText.bind(this);
        this.sendFiles=this.sendFiles.bind(this);
    }
    componentDidMount() {
        this.shadowState={...this.state};
        this.shadowState.conditioners={...this.state.conditioners}
        this.shadowState.cameras={...this.state.cameras}
        this.shadowState.main={...this.state.main}
        this.shadowState.deleted={...this.state.deleted}
        this.shadowState.authorize={...this.state.authorize}
        startPreparing(this.shadowState).then((shadowState)=>{console.log(shadowState);this.setState(shadowState)})
    }
    resetCardData(){
        this.setState({cardData: 0,mode:0})
        this.shadowState.cardData=0;
        this.shadowState.mode=0;
        this.shadowState.cardSection='';
    }
    checkCardData(){
        return !(this.state.cardData===0);
    }
    makeCardDataRequest(card,section){
        this.shadowState.drawer=false;
        this.shadowState.cardData=1;
        this.shadowState.mode='edit';
        this.shadowState.cardSection=section;
        this.shadowState.CardDataFetching=true;
        this.setState(this.shadowState,()=>{
            fetch('http://apiback/api/products/'+section+'/'+card.id)
                .then((response)=>{return response.json()})
                .then((response)=>{
                    this.setCardData(response,section);
                })
        });
    }
    PagFunc(page){
        this.shadowState[this.state.section].isFetching=true;
        this.shadowState[this.state.section].cards=[];
        this.shadowState[this.state.section].page=page;
        this.setState(this.shadowState);
        fetch('http://apiback/api/'+this.state.section+'/'+page)
            .then((response)=>{return response.json()})
            .then((response)=>{
                this.shadowState[this.state.section].isFetching=false;
                this.shadowState[this.state.section].cards=response[0];
                this.setState(this.shadowState);
            })
    }
    authSend(method){
        this.setState({authErrors:[]},()=>{
            fetch('http://apiback/api/authentication/'+method,{
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify(this.state.authorize)
            }).then((response)=>{return response.json()})
                .then((response)=>{
                    if(response['error']===undefined){
                        this.shadowState.role=response['role']
                        localStorage.setItem('token',response['token']);
                        localStorage.setItem('role', response['role']);
                        this.shadowState.authErrors=[];
                    }
                    else{
                        this.shadowState.authErrors=response['error'];
                    }
                    this.setState(this.shadowState)
                })
        })
    }
    handleAuth(section,value){
        console.log('state',this.shadowState);
        this.shadowState.authorize[section]=value;
        this.setState(this.shadowState);
    }
    handleDrawer(){
        this.setState({drawer:!this.state.drawer})
        this.shadowState.drawer=!this.shadowState.drawer
    }
    check(card,section){
        return (this.state.deleted[section].findIndex((n) => n === card.id) >= 0);
    }
    addToDeleted(card,section){
        let index=0;
        let deleted=this.shadowState.deleted;
        let delPart=deleted[section];
        index=delPart.findIndex(n => n === card.id);
        if(index>=0){
            delPart.splice( index, 1 );
            deleted[section]=delPart;
            this.shadowState.deleted=deleted;
        }
        else{
            delPart=delPart.concat(card.id);
            deleted[section]=delPart;
            this.shadowState.deleted=deleted;
        }
        console.log(this.shadowState);
        this.setState(this.shadowState)
    }
    changeSection(section){
        if(section==='conditioners'||section==='cameras'){
            this.shadowState[section].isFetching=true;
            this.shadowState.section=section;
            this.shadowState.info='';
            this.shadowState[section].cards=[];
            this.shadowState[section].page=1;
            this.setState(this.shadowState);
            fetch('http://apiback/api/'+section+'/1')
                .then((response)=>{return response.json()})
                .then((response)=>{
                    if(!this.shadowState[section].brandsUploaded){
                        this.shadowState[section].brands=response[1].Brands;
                        this.shadowState[section].brandsUploaded=true
                    }
                    this.shadowState[section].isFetching=false;
                    this.shadowState[section].cards=response[0];
                    console.log(this.shadowState[section].cards);
                    this.setState(this.shadowState);
                })
        }
        if(section==='main'){
            this.shadowState[section].isFetching=true;
            this.shadowState.section=section;
            this.setState(this.shadowState);
            fetch('http://apiback/api/administration/getMainPageData',{
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify(
                    {
                        token:localStorage.getItem('token'),
                    })})
                .then((response)=>{return response.json()})
                .then((response)=>{
                    console.log(response)
                    this.shadowState[section].isFetching=false;
                    this.shadowState[section].text=response[1];
                    this.shadowState[section].uploadedFiles=response[0];
                    this.setState(this.shadowState);
                })
        }
         if(section==='auth'){
             this.shadowState.section=section;
             this.setState(this.shadowState);
         }
         if(this.state.drawer===true){
             this.handleDrawer();
         }
    }
    delFromFiles(index){
        if (this.state.section!=='main'){
            this.shadowState.cardData.files.splice(index,1);
        }
        this.shadowState.main.files.splice(index,1);
        this.setState(this.shadowState);
    }
    delMarked(){
        this.shadowState[this.state.section].isFetching=true;
        this.setState(this.shadowState);
        fetch('http://apiback/api/administration/deletecard',{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(
                {
                    token:localStorage.getItem('token'),
                    section:'cameras',
                    ids:this.state.deleted.cameras
                })
        }).then((response)=>{ return response.json()})
            .then((response)=>{
                this.shadowState.cameras.count=response[0];
                fetch('http://apiback/api/administration/deletecard',{
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    //make sure to serialize your JSON body
                    body: JSON.stringify(
                        {
                            token:localStorage.getItem('token'),
                            section:'conditioners',
                            ids:this.state.deleted.conditioners
                        })
                }).then((response)=>{ return response.json()})
                    .then((response)=>{
                        this.shadowState.cameras.count=response[0];
                        this.shadowState.deleted.cameras=[];
                        this.shadowState.deleted.conditioners=[];
                        this.setState(this.shadowState,()=>{this.changeSection(this.state.section)});
                    })
            })
    }
    delButton(){
        if(this.state.role===2&&(this.state.deleted.conditioners.length>0||this.state.deleted.cameras.length>0)&&this.state.drawer===false&&(this.state.section==='cameras'||this.state.section==='conditioners')){
            return (<Box sx={{justifyContent: 'space-around', height: '100%',marginRight:'10px', flexDirection:'column', position: 'relative', display: 'flex'}}>
                        <Button variant={"contained"} size={'small'}  color={"secondary"} onClick={this.delMarked}>
                            Удалить отмеченное
                        </Button>
                    </Box>)
        }
        else{
            if(this.state.role===2&&this.state.deleted.conditioners.length===0&&this.state.deleted.cameras.length===0&&this.state.drawer===false&&(this.state.section==='cameras'||this.state.section==='conditioners')){
                return (<Box sx={{justifyContent: 'space-around', height: '100%',marginRight:'10px', flexDirection:'column', position: 'relative', display: 'flex'}}>
                    <SpeedDial FabProps={{size:'medium'}} direction={'down'} ariaLabel="S" sx={{position: 'absolute',top:60}} icon={<SpeedDialIcon />}>
                        <SpeedDialAction FabProps={{onClick:()=>{
                                this.shadowState.mode='create';
                                this.shadowState.cardSection='cameras'
                                this.setState(this.shadowState,()=>{this.setCardData({},'cameras')})
                        }}} key={1} icon={<VideoCameraBackIcon/>} tooltipTitle={'Камеры'} title={'Камеры'}/>
                        <SpeedDialAction FabProps={{onClick:()=>{
                                this.shadowState.mode='create';
                                this.shadowState.cardSection='conditioners';
                                this.setState(this.shadowState,()=>{this.setCardData({},'conditioners')})
                        }}} key={2} icon={<AcUnitIcon/>} tooltipTitle={'Кондиционеры'} title={'Кондиционеры'}/>
                    </SpeedDial>
                </Box>)
            }
        }
    }
    fetchCardSaveOrChange(){
        let data={};
        let fields=[];
        let valid=true;
        if(this.state.cardSection==='cameras'){
            fields=['name','price','resolution','angle'];
        }
        if(this.state.cardSection==='conditioners'){
            fields=['name','price','power'];
        }
        fields.forEach((i)=>{
            if(this.state.mode==='edit'){
                console.log(this.state.cardData.newData[i])
                if(this.state.cardData.newData[i]===''||this.state.cardData.newData[i]==0){
                    this.shadowState.cardData.info='Заполните все поля';
                    this.setState(this.shadowState);
                    valid=false
                    return false;
                }
            }
            if(this.state.mode==='create'){
                console.log(this.state.cardData.data[i])
                if(this.state.cardData.data[i]===''||this.state.cardData.data[i]==0){
                    this.shadowState.cardData.info='Заполните все поля';
                    this.setState(this.shadowState);
                    valid=false
                    return false;
                }
            }

        })
        if(valid){
            var request=new FormData();
            if(this.state.mode==='edit'){
                data.prevData=this.state.cardData.prevData;
                data.newData=this.state.cardData.newData;
            }
            if(this.state.mode==='create'){
                data=this.state.cardData.data;
            }
            request.append('token',localStorage.getItem('token'));
            request.append('section',this.state.cardSection);
            request.append('data',JSON.stringify(data));
            this.state.cardData.files.forEach((i,j)=>{
                request.append('file'+j,i,i.name);
            })
            console.log(this.state.cardData.data);
            console.log(request.getAll('data'));
            fetch('http://apiback/api/administration/'+this.state.mode+'card', {
                method: 'POST',
                body: request
            }).then((response)=>{return response.json()})
                .then((response)=>{this.shadowState.cardData.info=response[0];
                    this.setState(this.shadowState)})
        }
    }
    setCardData(object,section){
        if(this.state.mode==='edit') {
            if (section === 'cameras'){
                this.shadowState.cardData = {
                    "prevData": {
                        "id": object.id,
                        "pics": object.pics,
                        "deletedPics": [],
                        "name": object.name
                    },
                    "newData": {
                        "cardData": {
                            "name": object.name,
                            "price": object.price,
                            "resolution": object.resolution,
                            "angle": object.angle,
                            "IK_far": object.IK_far,
                            "Brand": object.Brand,
                            "AHD": object.AHD,
                            "TVI": object.TVI,
                            "CVI": object.CVI,
                            "CVBS": object.CVBS,
                            "PAL": object.PAL,
                            "move_check": object.move_check,
                            "water_protect": object.water_protect,
                            "low_temp": object.low_temp,
                            "AV": object.AV,
                            "remote_control": object.remote_control,
                            "wireless": object.wireless,
                            "presence": object.presence
                        }
                    },
                    'info':'',
                    'files': []
                }
            }
            if (section === 'conditioners'){
                this.shadowState.cardData = {
                    "prevData": {
                        "id": object.id,
                        "pics": object.pics,
                        "deletedPics": [],
                        "name": object.name
                    },
                    "newData": {
                        "cardData": {
                            "name": object.name,
                            "price": object.price,
                            "power": object.power,
                            "drying": object.drying,
                            "freezing": object.freezing,
                            "heating": object.heating,
                            "inverter":object.inverter,
                            "winding":object.winding,
                            "Brand": object.Brand,
                            "presence": object.presence
                        }
                    },
                    'info':'',
                    'files': []
                }
            }
        }
        if(this.state.mode==='create'){
            if (section === 'conditioners') {
                this.shadowState.cardData = {
                    "data": {
                        "name": '',
                        "price": 0,
                        "power": 0,
                        "drying": false,
                        "freezing": false,
                        "heating": false,
                        "inverter":false,
                        "winding":false,
                        "Brand": 1,
                        "presence": false
                    },
                    'info':'',
                    'files': []
                }
            }
            if (section === 'cameras') {
                this.shadowState.cardData = {
                    "data": {
                        "name": '',
                        "price": 0,
                        "resolution": 0,
                        "angle": 0,
                        "IK_far": 0,
                        "Brand": 1,
                        "AHD": false,
                        "TVI": false,
                        "CVI": false,
                        "CVBS": false,
                        "PAL": false,
                        "move_check": false,
                        "water_protect": false,
                        "low_temp": false,
                        "AV": false,
                        "remote_control": false,
                        "wireless": false,
                        "presence": false
                    },
                    'info':'',
                    'files': []
                }
            }
        }
        this.shadowState.CardDataFetching = false;
        this.setState(this.shadowState)
    }
    exitSend(){
        this.setState({authStatus:'try'},()=>{
            fetch('http://apiback/api/authentication/logout',{
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({token:localStorage.getItem('token')})
            }).then(()=>{localStorage.setItem('token','');
                localStorage.setItem('role',0);
                this.shadowState.role=0;
                this.shadowState.authStatus='ready';
                this.setState(this.shadowState)})
        });
    }
    sendFiles(){
        let request=new FormData();
        this.state.main.files.forEach((i,j)=>{
            request.append('file'+j,i,i.name);
        })
        request.append('token',localStorage.getItem('token'));
        fetch('http://apiback/api/administration/addPicture', {
            method: 'POST',
            body: request
        }).then((response)=>{return response.json()})
            .then((response)=>{this.shadowState.info=response[0];
                this.shadowState.main.files=[];
                this.setState(this.shadowState,()=>{this.changeSection('main')})})
    }
    saveTextDataChange(){
        fetch('http://apiback/api/administration/editmainpage',{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(
                {
                    token:localStorage.getItem('token'),
                    text:this.state.main.text
                })
        }).then((response)=>{return response.json()})
            .then((response)=>{this.shadowState.info=response
            this.setState(this.shadowState)});
    }
    changeText(value){
        this.shadowState.main.text=value;
        this.setState(this.shadowState);
    }
    handleBrand(newSection){
        if(this.state.mode==='edit'){
            this.shadowState.cardData.newData.cardData.Brand=newSection;
        }
        else{
            this.shadowState.cardData.data.Brand=newSection;
        }
        this.setState(this.shadowState);
    }
    changeSwitch(field){
        if(this.state.mode==='edit'){
            this.shadowState.cardData.newData.cardData[field]=!this.shadowState.cardData.newData.cardData[field];
        }
        else{
            this.shadowState.cardData.data[field]=!this.shadowState.cardData.data[field];
        }
        this.setState(this.shadowState);
    }
    handleNumberChange(value,field){
        if(this.state.mode==='edit'){
            this.shadowState.cardData.newData.cardData[field]=value;
        }
        else{
            this.shadowState.cardData.data[field]=value;
        }
        this.setState(this.shadowState);
    }
    addDeletedPic(pic){
        let index=0;
        let deleted=this.shadowState.cardData.prevData.deletedPics;
        index=deleted.findIndex(n => n === pic);
        if(index>=0){
            deleted.splice( index, 1 );
            this.shadowState.cardData.prevData.deletedPics=deleted;
        }
        else{
            deleted=deleted.concat(pic);
            this.shadowState.cardData.prevData.deletedPics=deleted
        }
        this.setState(this.shadowState)
    }
    handleFileEvent(e){
        if(this.state.section!=='main'){
            this.shadowState.cardData.files.push(e.target.files[0]);
        }
        else{
            this.shadowState.main.files.push(e.target.files[0]);
        }
        e.target.value='';
        this.setState(this.shadowState);
    }
    rendChild() {
        if(this.state.tokenChecking){
            return <BallTriangle stroke={'#000'}/>
        }
        else {
            if (this.state.section === 'conditioners') {
                return <CondConteiner state={this.state}
                                      check={this.check}
                                      matches={this.props.matches}
                                      matches2={this.props.matches2}
                                      secondLevelMatches={this.props.secondLevelMatches}
                                      thirdLevelMatches={this.props.thirdLevelMatches}
                                      makeCardDataRequest={this.makeCardDataRequest}
                                      PagFunc={this.PagFunc}
                                      addToDeleted={this.addToDeleted}
                                      setCardData={this.setCardData}
                />
            }
            if (this.state.section === 'cameras') {
                return <CamConteiner state={this.state}
                                     check={this.check}
                                     matches={this.props.matches}
                                     matches2={this.props.matches2}
                                     secondLevelMatches={this.props.secondLevelMatches}
                                     thirdLevelMatches={this.props.thirdLevelMatches}
                                     makeCardDataRequest={this.makeCardDataRequest}
                                     PagFunc={this.PagFunc}
                                     addToDeleted={this.addToDeleted}
                                     setCardData={this.setCardData}
                />
            }
            if (this.state.section === 'main') {
                return <MainPageConteiner matches={this.props.matches}
                                          matches2={this.props.matches2}
                                          secondLevelMatches={this.props.secondLevelMatches}
                                          thirdLevelMatches={this.props.thirdLevelMatches}
                                          changeText={this.changeText}
                                          saveText={this.saveTextDataChange}
                                          handleFileEvent={this.handleFileEvent}
                                          delFromFiles={this.delFromFiles}
                                          sendFiles={this.sendFiles}
                                          files={this.state.main.files}
                                          isFetching={this.state.main.isFetching}
                                          uploadedFiles={this.state.main.uploadedFiles}
                                          text={this.state.main.text}
                                          info={this.state.info}
                />
            }
             if (this.state.section === 'auth') {
                 return <AuthConteiner  handleAuth={this.handleAuth}
                                        authSend={this.authSend}
                                        exitSend={this.exitSend}
                                        errors={this.state.authErrors}
                                        authStatus={this.state.authStatus}
                                        role={this.state.role}
                                        matches={this.props.matches}
                                        matches2={this.props.matches2}
                                        secondLevelMatches={this.props.secondLevelMatches}
                                        thirdLevelMatches={this.props.thirdLevelMatches}
                        />
             }
        }
    }
    render() {
        return (
            <>
                <AppBar position={'static'}>
                    <ToolBar>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
                            <Box sx={{justifyContent: 'flex-end', width: '100%', position: 'relative', display: 'flex'}}>
                                {this.delButton()}
                                <Tabs role={this.state.role} tokenCheck={this.state.tokenChecking} changeSection={this.changeSection} initialState={this.state.section} handleDrawer={this.handleDrawer}/>
                            </Box>
                        </Box>
                    </ToolBar>
                </AppBar>
                <Container disableGutters maxWidth={false} sx={{width: '100%',flexDirection:'row', justifyContent:'space-around', maxWidth: '1024px', minHeight: '100vh', paddingBottom:3}}>
                    <div className={'content'}>
                        {this.rendChild()}
                    </div>
                </Container>
                <SideList handleDrawer={this.handleDrawer} role={this.state.role} tokenCheck={this.state.tokenChecking} changeSection={this.changeSection} initialState={this.state.section} open={this.state.drawer}/>
                <SideCard resetCardData={this.resetCardData}
                          handleBrand={this.handleBrand}
                          changeSwitch={this.changeSwitch}
                          handleNumberChange={this.handleNumberChange}
                          addDeletedPic={this.addDeletedPic}
                          handleFileEvent={this.handleFileEvent}
                          delFromFiles={this.delFromFiles}
                          fetchCardSaveOrChange={this.fetchCardSaveOrChange}
                          shadowState={this.shadowState}
                          mode={this.state.mode}
                          section={this.state.cardSection}
                          camerasBrands={this.state.cameras.brands}
                          conditionersBrands={this.state.conditioners.brands}
                          isFetching={this.state.CardDataFetching}
                          card={this.state.cardData}
                          open={this.checkCardData()}
                />
            </>
        )
    }
}
