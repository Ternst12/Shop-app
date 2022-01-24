import React, {useState} from "react";
import { View, Text, StyleSheet, Button,  } from "react-native";
import Colors from "../constants/Colors";
import CartItem from "./CartItem";


const OrderItem = props => {

    const [showDetail, setShowDetails] = useState(false)

    return (
        <View style={styles.OrderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{props.amount.toFixed(2)} $</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                color={Colors.accent} 
                title={showDetail ? "Hide Details" : "Show Details"}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}    
                />
                {showDetail && (
                    <View style={styles.details}>
                    {props.items.map(cartItem => <CartItem 
                        key={cartItem.productId}
                        quantity={cartItem.quantity} 
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                        deletable={false}
                    />) }
                </View>
                )}
            </View>
        </View>
    )

}

const styles = StyleSheet.create ({
    OrderItem: {
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
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        fontSize: 14,
        color: "green",
    },
    date: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: "grey"

    },
    buttonContainer: {
        alignItems: "center",
        marginVertical: 10,
    },

    details: {
        width: "100%"
    }




})

export default OrderItem;