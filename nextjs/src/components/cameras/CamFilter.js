import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React, {Component} from 'react';
import ResSlider from "./ResSlider";
import FarSlider from "./FarSlider";
import AngleSlider from "./AngleSlider";
import Typography from "@material-ui/core/Typography";
import PriceSlider from "./PriceSlider";
import Box from "@material-ui/core/Box";
import SwitchPanels from "./SwitchPanels";

export default class CamFilter extends Component{
    constructor(props) {
        super(props);
        this.state={
            minprice:this.props.filterData.digits.minprice,
            maxprice:this.props.filterData.digits.maxprice,
            minangle:this.props.filterData.digits.minangle,
            maxangle:this.props.filterData.digits.maxangle,
            minfar:this.props.filterData.digits.minfar,
            maxfar:this.props.filterData.digits.maxfar,
            minres:this.props.filterData.digits.minres,
            maxres:this.props.filterData.digits.maxres,
            AHD:this.props.filterData.AHD,
            TVI:this.props.filterData.TVI,
            CVI:this.props.filterData.CVI,
            CVBS:this.props.filterData.CVBS,
            PAL:this.props.filterData.PAL,
            move_check:this.props.filterData.move_check,
            water_protect:this.props.filterData.water_protect,
            low_temp:this.props.filterData.low_temp,
            AV:this.props.filterData.AV,
            remote_control:this.props.filterData.remote_control,
            wireless:this.props.filterData.wireless,
            Brands:this.props.filterData.Brands
        }
        this.handleSwitch=this.handleSwitch.bind(this)
        this.handleBrands=this.handleBrands.bind(this)
        this.handleRange=this.handleRange.bind(this)
    }
    handleSwitch(fieldName){
        this.setState({[fieldName]:!this.state[fieldName]})
    }
    handleBrands(value){
        let Brands=this.state.Brands;
        let index=Brands.indexOf(value);
        if(index>=0){
            Brands.splice( index, 1 );
        }
        else{
            Brands.push(value);
        }
        this.setState({Brands:Brands});
    }
    handleRange(range,fieldName1,fieldName2){
        this.setState({[fieldName1]:Number(range[0]),[fieldName2]:Number(range[1])})
    }
    
    render(){
        let sliderwidth;
        if (this.props.matches){
            sliderwidth={display:'flex', minWidth:'180px', flexDirection:'column',justifyContent:'space-around',flexWrap:'wrap',width:'48%'};
        }
        else{
            sliderwidth={display:'flex', minWidth:'180px', flexDirection:'column', justifyContent:'space-around',flexWrap:'wrap',width:'100%'};
        }
    return (
        <Paper elevation={2} sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{
                padding: '20px',
                display: 'flex',
                maxWidth: '1024px',
                minWidth: '196px',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                flexWrap: 'wrap'
            }}>
                <Box sx={sliderwidth}>
                    <Box>
                        <Typography component="div" align={'center'} sx={{width: '100%'}} variant={'h7'}>Диапазон
                            цен(от {this.state.minprice}р
                            до {this.state.maxprice}р)</Typography>
                        <PriceSlider
                            handleRange={this.handleRange}
                            minprice={this.state.minprice}
                            maxprice={this.state.maxprice}
                            initData={this.props.initData}
                        />
                    </Box>
                    <Box>
                        <Typography component="div" align={'center'} sx={{width: '100%'}} variant={'h7'}>Диапазон
                            разрешений(от {Number(this.state.minres)}МгП
                            до {Number(this.state.maxres)}МгП)</Typography>
                        <ResSlider
                            handleRange={this.handleRange}
                            minres={this.state.minres}
                            maxres={this.state.maxres}
                            initData={this.props.initData}
                        />
                    </Box>
                    <Box>
                        <Typography component="div" align={'center'} sx={{width: '100%'}} variant={'h7'}>Диапазон углов
                            обзора(от {this.state.minangle}°
                            до {this.state.maxangle}°)</Typography>
                        <AngleSlider
                            handleRange={this.handleRange}
                            minangle={this.state.minangle}
                            maxangle={this.state.maxangle}
                            initData={this.props.initData}
                        />
                    </Box>
                    <Box>
                        <Typography component="div" align={'center'} sx={{width: '100%'}} variant={'h7'}>Диапазон
                            дальностей ИК-подсветки(от {this.state.minfar}м
                            до {this.state.maxfar}м)</Typography>
                        <FarSlider
                            handleRange={this.handleRange}
                            minfar={this.state.minfar}
                            maxfar={this.state.maxfar}
                            initData={this.props.initData}
                        />
                    </Box>
                </Box>
                <SwitchPanels AHD={this.state.AHD}
                              TVI={this.state.TVI}
                              CVI={this.state.CVI}
                              CVBS={this.state.CVBS}
                              PAL={this.state.PAL}
                              Brands={this.props.initData.Brands}
                              addedBrands={this.state.Brands}
                              move_check={this.state.move_check}
                              water_protect={this.state.water_protect}
                              low_temp={this.state.low_temp}
                              AV={this.state.AV}
                              remote_control={this.state.remote_control}
                              wireless={this.state.wireless}
                              handleSwitch={this.handleSwitch}
                              handleBrands={this.handleBrands}
                              matches={this.props.matches}
                              matches2={this.props.matches2}
                              secondLevelMatches={this.props.secondLevelMatches}
                              thirdLevelMatches={this.props.thirdLevelMatches}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                marginBottom: '7px',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: "100%"
            }}><Button onClick={() => {
                this.props.setFilterStateAndRequest(this.state)
            }} variant={'contained'}>Отфильтровать</Button></Box>
        </Paper>
    );
}
}