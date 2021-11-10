import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React, {Component} from 'react';
import PowerSlider from "./PowerSlider";
import Typography from "@material-ui/core/Typography";
import PriceSlider from "./PriceSlider";
import Box from "@material-ui/core/Box";
import SwitchPanels from "./SwitchPanels";

export default class CondFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minprice: this.props.filterData.digits.minprice,
            maxprice: this.props.filterData.digits.maxprice,
            minpower: this.props.filterData.digits.minpower,
            maxpower: this.props.filterData.digits.maxpower,
            inverter:this.props.filterData.inverter,
            freezing:this.props.filterData.freezing,
            heating:this.props.filterData.heating,
            winding:this.props.filterData.winding,
            drying:this.props.filterData.drying,
            Brands:this.props.filterData.Brands
        }
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleBrands = this.handleBrands.bind(this)
        this.handleRange = this.handleRange.bind(this)
    }

    handleSwitch(fieldName) {
        this.setState({[fieldName]: !this.state[fieldName]})
    }

    handleBrands(value) {
        let Brands = this.state.Brands;
        let index = Brands.indexOf(value);
        if (index >= 0) {
            Brands.splice(index, 1);
        } else {
            Brands.push(value);
        }
        this.setState({Brands: Brands});
    }

    handleRange(range, fieldName1, fieldName2) {
        this.setState({[fieldName1]: Number(range[0]), [fieldName2]: Number(range[1])})
    }
    render(){
            let sliderwidth;
            if (this.props.matches) {
                sliderwidth = {
                    display: 'flex',
                    minWidth: '180px',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    width: '48%'
                };
            } else {
                sliderwidth = {
                    display: 'flex',
                    minWidth: '180px',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    width: '100%'
                };
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
                                    initData={this.props.initData}/>
                            </Box>
                            <Box>
                                <Typography component="div" align={'center'} sx={{width: '100%'}} variant={'h7'}>Диапазон
                                    мощностей(от {this.state.minpower}кВт
                                    до {this.state.maxpower}кВт)</Typography>
                                <PowerSlider
                                    handleRange={this.handleRange}
                                    minpower={this.state.minpower}
                                    maxpower={this.state.maxpower}
                                    initData={this.props.initData}/>
                            </Box>
                        </Box>
                        <SwitchPanels inverter={this.state.inverter}
                                      freezing={this.state.freezing}
                                      heating={this.state.heating}
                                      winding={this.state.winding}
                                      drying={this.state.drying}
                                      handleBrands={this.handleBrands}
                                      handleSwitch={this.handleSwitch}
                                      addedBrands={this.state.Brands}
                                      Brands={this.props.initData.Brands}
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