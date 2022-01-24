import React, {useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigation from "./ShopNavigation";

const NavigationContainer = props => {
    const navRaf = useRef();
    const isAuth = useSelector(state => !!state.auth.token) 

    useEffect(() => {
        if(!isAuth){
            navRaf.current.dispatch(
                NavigationActions.navigate({routeName: "Auth"})
                );
        }
    }, [isAuth]);

    return <ShopNavigation ref={navRaf}/>
}

export default NavigationContainer;