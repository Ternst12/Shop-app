import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";



const CartItem = props => {
    return (
    <View style={styles.cartItem}>
        <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity} </Text> 
            <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.itemData}>
            <Text style={styles.amount}>{props.amount.toFixed(2)}$</Text>
           {props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                <Ionicons name={"md-trash"} size={25} color="red"/>
            </TouchableOpacity>)}
        </View>
    </View>

    )
}

const styles = StyleSheet.create({
    cartItem : {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20

    },
    itemData: {
        flexDirection: "row",
        alignItems: "center"

    },
    quantity: {
        fontFamily: "open-sans",
        color: "grey",
        fontSize: 18

    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 20

    },
    amount: {
        fontFamily: "open-sans",
        color: "green",
        fontSize: 18
    }, 
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;