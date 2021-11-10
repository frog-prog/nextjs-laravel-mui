import MainConteiner from "../../../src/components/MainConteiner";
import React from "react";

export default function Page(props){
        return (
            <MainConteiner setIsRouteChanging={props.setIsRouteChanging}
                           isRouteChanging={props.isRouteChanging}
                           cards={props.response[1]}
                           page={props.response[3]}
                           count={props.response[2]}
                           cardData={props.response[0]}
                           initData={props.response[4]}
                           section={'cameras'}
                           router={props.router}
                           matches={props.matches}
                           matches2={props.matches2}
                           secondLevelMatches={props.secondLevelMatches}
                           thirdLevelMatches={props.thirdLevelMatches}
            />
        );
}
export const getStaticProps = async (paths) => {
    const res= await fetch('http://apiback/api/products/camera/' + paths.params.id,
        {
            method: "GET",
            headers: {
                // update with your user-agent
                "User-Agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                Accept: "application/json; charset=UTF-8",
            },
        })
    const response=await res.json();
            return {
                props: {
                    response
                },
            };
};
export const getStaticPaths = async () => {
    const response=await fetch('http://apiback/api/products/cameras/ids');
    const ids=await response.json();
    const paths = ids.map((item) => {
        return {params: { id: item.toString()}}
    });
    return {
        paths,
        fallback: false,
    };
};