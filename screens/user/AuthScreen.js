import React, {useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Button, TextInput, Alert, ActivityIndicator } from "react-native"
import Colors from "../../constants/Colors";
import { LinearGradient} from "expo-linear-gradient"

import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/authAction"

const AuthScreen = props => {

    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [EmailIsValid, setEmailIsValid] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState(true)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        if(error) {
          Alert.alert("Der er sket en fejl. Tumpe", error, [{text:"Okay"}])  
        }
    }, [error]);

    const dispatch = useDispatch()

    const authHandler = useCallback(async () => {

        setError(null)
        setIsLoading(true)
        
        if(!EmailIsValid) {
            setEmailErrorMessage(false)
        } else {  
       
        try {
            if(isSignup){
                await dispatch(authActions.signup(
                    email, 
                    password
                    )) 
                
                } else {
                await dispatch(authActions.login(
                    email, 
                    password
                    ))  
                }
                setPassword("")
                setEmail("")
                props.navigation.navigate("Shop")
                } catch (err) {
                await setError(err.message)
                setIsLoading(false)
            }
     };
              
     
     
    }, [dispatch, error, EmailIsValid, emailValidation, email, password, isLoading]);


    const emailValidation = text => {

        if(text === 0)
        {
            setEmailIsValid(false)
            setEmailErrorMessage(false)
        } else {
            setEmailIsValid(true)
            setEmailErrorMessage(true)
        }
        setEmail(text);
    } 

    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <LinearGradient colors={["#2D00BA", "#F0038F"]} style={styles.gradient}> 
                <View style={styles.Authbox}>
                    <ScrollView style={styles.form}>
                    <View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>E-Mail</Text>
                            <TextInput 
                            value={email}
                            style={styles.input} 
                            onChangeText={emailValidation}
                            keyboardType="email-address"
                            returnKeyType="next"    
                            autoCapitalize="none"
                            required
                            />
                        </View>
                        {!emailErrorMessage && <Text> Den indtastet email adresse er ikke valid </Text>}

                        
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                            style={styles.input} 
                            value={password}
                            onChangeText={text => setPassword(text)}
                            keyboardType="default"
                            returnKeyType="next"    
                            autoCapitalize="none"
                            
                            
                            secureTextEntry
                            />
                        </View>

                    
                    </View>
                    {isLoading ? <ActivityIndicator size="large" color="red"/> :
                    <View style={styles.buttons}><Button style={{width: "100%"}} title={isSignup ? "Sign Up" : "Login"} color={Colors.primary} onPress={authHandler}/></View> }
                    <View style={styles.buttons}><Button 
                        title={`Switch to ${isSignup ? "Login" : "Sign Up"}`} 
                        color={Colors.accent} 
                        onPress={() => {
                            setIsSignup(prevState => !prevState);
                        }}/>
                    </View>
                    
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
};

AuthScreen.navigationOptions = {
    headerTitle: "Authentication"
}

const styles = StyleSheet.create({

    screen: {
        flex:1,
    },

    Authbox: {
        width: "90%",
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 15,
        backgroundColor: "white",
        margin: 20,
        padding: 10,
        
        
    },
    form: {
        margin: 20
    },
    formControl: {
        width: "100%"
    },
    label: { 
        fontFamily: "open-sans-bold",
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "grey",
        borderBottomWidth: 1

    },

    buttons: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 100,
        marginTop: 10

    },
    gradient: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default AuthScreen;