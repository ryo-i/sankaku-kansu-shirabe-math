import React, { useEffect, useContext } from "react";
import p5 from 'p5';
import { Context } from './Inner';


const Canvas = (props: any) => {
    let context = useContext(Context);
    console.log('context', context);

    useEffect(() => {
        new p5(props.sketch)
    }, [props.sketch])
    return (<></>)
}
export default Canvas