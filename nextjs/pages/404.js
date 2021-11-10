import React from 'react';
import {useRouter} from "next/router";
import MainConteiner from "../src/components/MainConteiner";

export default function _404() {
    return (
        <MainConteiner section={'404'}
                       cardData={0}/>
    );
}