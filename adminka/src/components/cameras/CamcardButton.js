import ToggleButton from "@mui/material/ToggleButton";
import DeleteIcon from '@mui/icons-material/Delete';
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
                          onClick={()=>props.addToDeleted(props.card,'cameras')}>
                <DeleteIcon/>
            </ToggleButton>
        );

}
