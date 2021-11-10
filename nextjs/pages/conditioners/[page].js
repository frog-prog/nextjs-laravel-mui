import MainConteiner from "../../src/components/MainConteiner";
import React from "react";

export default function Page(props){
        return (
            <MainConteiner setIsRouteChanging={props.setIsRouteChanging}
                           isRouteChanging={props.isRouteChanging}
                           cards={props.data[2][0]}
                           page={props.data[1]}
                           count={props.data[0]}
                           initData={props.data[2][1]}
                           cardData={0}
                           section={'conditioners'}
                           router={props.router}
                           matches={props.matches}
                           matches2={props.matches2}
                           secondLevelMatches={props.secondLevelMatches}
                           thirdLevelMatches={props.thirdLevelMatches}
            />
        );
}
export const getStaticProps = async (paths) => {
    const res= await fetch('http://apiback/api/conditioners/' + paths.params.page,
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
    let count = Object.keys(paths).length;
    let page = paths.params.page;
    console.log('PROPS FOR Conditioners/PAGE  ',' PAGE:  ',page,' COUNT:  ',count,' PAGEDATA:  ',pageData)
    let data=[count, page, pageData];
    return {
        props: {
            data
        },
    };
};
export const getStaticPaths = async () => {
    const response=await fetch('http://apiback/api/conditioners/count');
    const count=await response.json();
    let i;
    let arr=[];
    for (i=1; i<=count; i++){
        arr.push(i);
    }
    const paths = arr.map((item) => ({
        params: { page: item.toString()},
    }));
    return {
        paths,
        fallback: false,
    };
};