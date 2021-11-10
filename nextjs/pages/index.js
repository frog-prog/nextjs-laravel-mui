import {useRouter} from "next/router";
import MainConteiner from "../src/components/MainConteiner";
import React from "react";

export default function Index(props) {
  return (
      <MainConteiner setIsRouteChanging={props.setIsRouteChanging}
                     isRouteChanging={props.isRouteChanging}
                     section={'main'}
                     text={props.data}
                     cardData={0}
                     router={props.router}
                     matches={props.matches}
                     matches2={props.matches2}
                     secondLevelMatches={props.secondLevelMatches}
                     thirdLevelMatches={props.thirdLevelMatches}
      />
  );
}
export const getStaticProps = async (paths) => {
    const res= await fetch('http://apiback/api/main',
        {
            method: "GET",
            headers: {
                // update with your user-agent
                "User-Agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                Accept: "application/json; charset=UTF-8",
            },
        })
    let pageData=await res.json()
    let data=pageData;
    return {
        props: {
            data
        },
    };
};
