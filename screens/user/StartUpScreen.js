import React, {useEffect} from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authAction"

const StartUpScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if(!userData) {
                props.navigation.navigate("Auth"); // Goes to the Authscreen if no Token
                return
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData

            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId) { // Token is invalid if expiryDate is in the past or there is no token/userId
                props.navigation.navigate("Auth");
                return
            }


            const expirationTime = expirationDate.getTime() - new Date().getTime() 

            props.navigation.navigate("Shop");
            dispatch(authActions.authenticate(userId, token, expirationTime));

        };

        tryLogin();
    }, [dispatch])

    return(
        <View style={styles.screen}>
            <ActivityIndicator size="large" color="green" />
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    }
})

export default StartUpScreen;