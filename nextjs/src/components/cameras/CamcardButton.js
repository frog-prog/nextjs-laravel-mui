import ToggleButton from "@material-ui/core/ToggleButton";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import theme from "../../theme";

export default function CamcardButton(props){
        return(
            <ToggleButton value={'1'}
                          selected={props.selected}
                          color={'primary'}
                          sx={{
                              color:theme.palette.secondary.dark,
                              backgroundColor:theme.palette.primary.light
                          }}
                          onClick={()=>props.addToBasket(props.card,props.section)}>
                <AddShoppingCartIcon/>
            </ToggleButton>
        );

}
