import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";


const ProductItem = props => {
    return (
        
        <View style={styles.product}>
            <TouchableOpacity style={styles.imageContainer} onPress={props.onViewDetail}> 
                <Image style={styles.image} source={{uri: props.image}}/>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                 <Text style={styles.title}> {props.title} </Text>
                 <Text style={styles.price}> {props.price.toFixed(2)} $ </Text>
            </View>
            <View style={styles.buttonContainer}>
                {props.children}
            </View>
        </View>



    )

}

const styles = StyleSheet.create ({
    product: {
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 15,
        backgroundColor: "white",
        height: 300,
        margin: 20,
        overflow: "hidden"
        
    },

    imageContainer: {
        width: "100%",
        height: "60%"
    },

    image : {
        width: "100%",
        height: "100%"
    },

    textContainer: {
        alignItems: "center",
        height: "20%",

    },  

    title : {

        fontSize: 18,
        marginVertical: 5,

    },

    price: {
        fontSize: 16,
        color: "green"

    },

    buttonContainer : {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "20%",
        paddingHorizontal: 20
    }

    })
    
export default ProductItem

