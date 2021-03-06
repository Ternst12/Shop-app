import React, { useState, useEffect, useCallback, useReducer} from "react";
import { View, StyleSheet, Text, TextInput, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CostomHeaderButton from "../../components/HeaderButton";
import * as productActions from "../../store/actions/productsAction"
import Colors from "../../constants/Colors";

const FORM_UPDATE = "FORM_UPDATE"

const formReducer = (state, action) => {
    if(action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input] : action.isValid
        }
        let formIsValid = true;

        for(const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }

        return {
            formIsValid: formIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }; 
    }
    return state;
};

const EditProducts = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const prodId = props.navigation.getParam("productId")
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, 
        {inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: ""
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,

        }, 
        formIsValid: editedProduct ? true : false,
    });

    useEffect(() => {
        if(error) {
          Alert.alert("Der er sket en fejl. Tumpe", error, [{text:"Okay"}])  
        }
    }, [error]);
        
    const submitHandler = useCallback(async () => {

        if(!formState.formIsValid) {
            Alert.alert("Fejl i den angivet titel", "Venligst kig efter fejl i input feltet", [{text: "ilm"}])
            return;
        }

        setError(null)
        setIsLoading(true);

        try {
            if(editedProduct) { // if true we are editing  a product

               await dispatch(productActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl))
     
             } else { // False we are creating a new product
                await dispatch(productActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price))
             }
             props.navigation.goBack();
        } catch (err) {
            setError(err.message)
        }        
        setIsLoading(false)
        
    }, [dispatch, prodId, formState]);


    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

   const textChangeHandler = (inputIdentifier, text) => {
       let isValid = false;
       if(text.trim().length > 0){
        isValid = true;
       } 
       dispatchFormState({
           type: FORM_UPDATE, 
           value: text, 
           isValid: isValid,
           input: inputIdentifier
        });
   }

    if(isLoading){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                <ActivityIndicator size="large" color={Colors.primary} /> 
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
        style={{flex:1}}
        behavior="padding"
        keyboardVerticalOffset={100}
        >
        <ScrollView style={styles.form}>
            <View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                    style={styles.input} 
                    value={formState.inputValues.title}
                    onChangeText={textChangeHandler.bind(this, "title")}
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"    
                    
                    />
                </View>
                {!formState.inputValidities.title && <Text> Indtast en titel, tak </Text>}
            
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                    style={styles.input} 
                    value={formState.inputValues.imageUrl}
                    onChangeText={textChangeHandler.bind(this, "imageUrl")} 
                    returnKeyType="next" 
                    />
                </View>
        
                {editedProduct ? null : (
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                    style={styles.input}
                    value={formState.inputValues.price}
                    onChangeText={textChangeHandler.bind(this, "price")}  
                    keyboardType="decimal-pad" 
                    returnKeyType="next"
                    />
                </View>
                )}

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                    style={styles.input}
                    value={formState.inputValues.description}
                    onChangeText={textChangeHandler.bind(this, "description")} 
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="done"
                    multiline
                     />
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )

}

EditProducts.navigationOptions = navData => {

    const submitFn = navData.navigation.getParam("submit")

    return {
        headerTitle: navData.navigation.getParam("productId") ?
        "Edit Product"
        : "Add Product",
        headerRight: () => <HeaderButtons 
        HeaderButtonComponent={CostomHeaderButton}>
        <Item 
            title="Save" 
            iconName={"md-checkmark"} 
            onPress={submitFn}
        />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create ({

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

    }

})

export default EditProducts;