import React from "react";
import { FlatList, StyleSheet, Button, Alert, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CostomHeaderButton from "../../components/HeaderButton";
import * as productsActions from "../../store/actions/productsAction"

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

    const selectProduct = (id) => {
        props.navigation.navigate("EditProduct", {productId: id});

    }

    const deleteHandler = (id) => {
        Alert.alert("Er du sikker", "Vil du virkelig slette productet? ",[
        {text: "No", style: "default"}, {text: "Yes", style: "destructive", onPress: () => {
            dispatch(productsActions.deleteProduct(id))
        } }
    ])
    };

    if(userProducts.length === 0) {
        return <View style={styles.screen}>
            <Text> Ingen produkter fundet - Gå igang med at oprette nogle </Text>
        </View>
    }



    return (
        <FlatList 
        data={userProducts}
        keyExtractor={item => item.id}  
        renderItem={itemData => <ProductItem
        image={itemData.item.imageUrl} 
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => {
            selectProduct(itemData.item.id)
        }}
        >
        <Button  color={"#E9EC13"} title= "Edit" onPress={() => {
             selectProduct(itemData.item.id)
            
            }}/>
        <Button  color={"red"} title= "Delete Product" onPress={() => {deleteHandler(itemData.item.id)}}/>
        </ProductItem>}  
        />
    )
}

UserProductScreen.navigationOptions = navData => {
   
    return {
    headerTitle: "Your Products",
    headerLeft : () => <HeaderButtons 
    HeaderButtonComponent={CostomHeaderButton}>
    <Item 
        title="Menu" 
        iconName={"md-menu"} 
        onPress={() => {
            navData.navigation.toggleDrawer();
        }}
    />
    </HeaderButtons> ,
    headerRight: () => <HeaderButtons 
    HeaderButtonComponent={CostomHeaderButton}>
    <Item 
        title="Add" 
        iconName={"md-create"} 
        onPress={() => {
            navData.navigation.navigate("EditProduct");
        }}
    />
    </HeaderButtons>





    }
    
}

const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

}) 

export default UserProductScreen