import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import theme from "../../theme";
import React from 'react';
import {BallTriangle} from 'svg-loaders-react';
import Pagination from "./Pagination";
import CamFilter from "./CamFilter";
import CamCard from "./CamCard";

export default function CamConteiner(props) {

    const buttonText=()=>{
        if(props.state.openFilter==='none'){
            return 'Открыть панель фильтров'
        }
        else{
            return 'Закрыть панель фильтров'
        }
    }
    React.useEffect(()=>{
        props.setIsRouteChanging(false);
        document.querySelector('.content').style.display='flex';
        document.querySelector('.indicator').style.display='none';
        document.querySelectorAll('.pagination-tab-cameras').forEach((i) => {
            i.addEventListener('click', (event) => {
                event.preventDefault();
            })
        })
    },[])
    let filter;
    if(props.state.filterData.digits.maxprice!==0 && props.state.filterData.digits.minprice!==0) {
        filter = (<>
            <Button onClick={props.toggleFilters} variant={'contained'}>{buttonText()}</Button>
            <div style={{display: props.state.openFilter, width: '90%', marginLeft: '5%', padding: '10px'}}>
                <CamFilter
                    setFilterStateAndRequest={props.setFilterStateAndRequest}
                    makeRequest={props.makeRequest}
                    initData={props.initData}
                    filterData={props.filterData}
                    state={props.state}
                    handleRange={props.handleRange}
                    handleSwitch={props.handleSwitch}
                    handleBrands={props.handleBrands}
                    matches={props.matches}
                    matches2={props.matches2}
                    router={props.router}
                    secondLevelMatches={props.secondLevelMatches}
                    thirdLevelMatches={props.thirdLevelMatches}
                    setIsRouteChanging={props.setIsRouteChanging}/>
            </div>
        </>)
    }
    else{
        filter= (<>
            <Button onClick={props.toggleFilters} variant={'contained'}>{buttonText()}</Button>
            <div style={{display: props.state.openFilter, width: '90%', marginLeft: '5%', padding: '10px'}}/>
        </>)
    }
    const cardRend=()=>{
        if(props.state.isFetching){
            return(<BallTriangle/>)
        }
        else{
            return (props.state.cards.map((item,key)=>{
                return(<CamCard key={key}
                                section={props.section}
                                makeCardDataRequest={props.makeCardDataRequest}
                                check={props.check}
                                setCardData={props.setCardData}
                                card={item}
                                addToBasket={props.addToBasket}/>)
            }))
        }
    }


    return(
        <Paper sx={{display:'flex',flexDirection:'column', width:'100%', marginTop: 3, paddingBottom: 3, background: theme.palette.secondary.light}}  elevation={2}>
            {filter}
            <Box sx={{display:'flex', justifyContent:'space-around',width:'100%',flexWrap:'wrap'}}>
                {cardRend()}
            </Box>
            <Box sx={{display:'flex', marginTop:'7px', justifyContent:'center',width:'100%',flexWrap:'wrap'}}>
                <Pagination count={props.state.count} PagFunc={props.PagFunc} page={props.state.page}/>
            </Box>
        </Paper>
    );
}