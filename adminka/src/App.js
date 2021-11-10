import React from "react";
import MainConteiner from "./components/MainConteiner";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const matches=useMediaQuery('(min-width:884px)');
  const matches2 = useMediaQuery('(min-width:743px)');
  const secondLevelMatches = useMediaQuery('(min-width:410px)');
  const thirdLevelMatches = useMediaQuery('(min-width:884px)');
  return (
    <MainConteiner
        matches={matches}
        matches2={matches2}
        secondLevelMatches={secondLevelMatches}
        thirdLevelMatches={thirdLevelMatches}
    />
  );
}

export default App;
