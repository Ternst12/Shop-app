import React from "react";
import { Text, Image, StyleSheet, Button, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cartAction"


const ProductDetail = props => {

    const productId = props.navigation.getParam("productID");
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(
        prod => prod.id === productId)
        );

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <Button 
            color={Colors.primary} 
            title="Add to Cart" 
            onPress={() => {dispatch(cartActions.addToCart(selectedProduct))}}/>
            <Text style={styles.price}>{selectedProduct.price.toFixed(2)} $</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam("productTitle")
    }
}

const styles = StyleSheet.create ({
    image: {
        width: "100%",
        height: 300,
    },
    price: {
        fontSize: 20,
        color: "green",
        textAlign: "center",
        marginVertical: 20
        
    },

    description: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 15,
    },
   
})

export default ProductDetail;