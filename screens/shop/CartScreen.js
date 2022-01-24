import React, {useState} from "react";
import {View, Text, FlatList, StyleSheet, Button, ActivityIndicator} from "react-native"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/CartItem"
import * as cartActions from "../../store/actions/cartAction"
import * as orderActions from "../../store/actions/orderActions"

const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false)

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedcartItem = [];
        for (const key in state.cart.items)
        {
            transformedcartItem.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedcartItem.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}> Total: <Text style={styles.amount}>$ {Math.round(cartTotalAmount.toFixed(2) * 100) / 100} </Text> </Text>
                {isLoading ? 
                    <ActivityIndicator size="small" color={Colors.primary} /> 
                    :
                    <Button 
                    color={Colors.accent} 
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler}
                    ></Button>
                }
            </View>
            <FlatList 
            data={cartItems} 
            keyExtractor={item => item.productId} 
            renderItem={itemData => <CartItem 
            quantity={itemData.item.quantity} 
            title={itemData.item.productTitle} 
            amount={itemData.item.sum}
            deletable={true}
            onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}/> // End-CartItem
            }/> 
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: "Din kurv"
}

const styles = StyleSheet.create ({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 6,
        backgroundColor: "white",
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 20

    },
    amount: {
        color: "green"

    }
})

export default CartScreen;