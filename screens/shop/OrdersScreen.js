import React, {useEffect, useState} from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CostomHeaderButton from "../../components/HeaderButton";
import OrderItem from "../../components/OrderItem";
import * as ordersActions from "../../store/actions/orderActions"


const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        })
    }, [dispatch])

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><ActivityIndicator size="large" color="orange" /></View>
    }

    if(orders.length === 0) {
        return <View style={styles.screen}>
            <Text> Ingen produkter fundet - Gå igang med at bestille nogle </Text>
        </View>
    }

    return (
    <FlatList 
    data={orders} 
    key={item => item.id} 
    renderItem={itemData => <OrderItem 
    amount={itemData.item.totalAmount} 
    date={itemData.item.readableDate}
    items={itemData.item.items}
    />}

    />  
    )}

const styles = StyleSheet.create ({
    amount : {
        color: "green",
    },

    screen: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    }

})

OrdersScreen.navigationOptions = navData => {

    return  {
    headerTitle: "Dine bestillinger",
    headerLeft : () => <HeaderButtons 
    HeaderButtonComponent={CostomHeaderButton}>
    <Item 
    title="Menu" 
    iconName={"md-menu"} 
    onPress={() => {
        navData.navigation.toggleDrawer();
    }}
    />
    </HeaderButtons>
    }
}

export default OrdersScreen;