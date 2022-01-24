import React, {useState, useEffect, useCallback} from "react";
import { FlatList, Button, StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartActions from "../../store/actions/cartAction"
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as productsActions from "../../store/actions/productsAction"

import CostomHeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";


const ProductsOverview = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();


    const loadproducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false)
    },[dispatch])

    useEffect(() => {
      const willFocusSub = props.navigation.addListener("willFocus", () => {
          loadproducts()
      }) 

      return () => {
        willFocusSub.remove();
      }
    }, [loadproducts])

    useEffect(() => {     
        setIsLoading(true)   
        loadproducts().then(() => {
            setIsLoading(false)
        }) 
    }, [dispatch, loadproducts]); // Reloads every time the screen is reloaded - and only then

    const selectItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productID: id,
            productTitle: title
            });

    }

    if(error) {
        return (
            <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
                <Text> Der er sket en fejl i appen </Text>
                <Button title="Forsøg igen" onPress={loadproducts} />
            </View>
        )

    }

    if(isLoading) {
        return (
            <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
                <Text> Ingen produktor fundet </Text>
            </View>
        )
    }

    return (
        <FlatList 
        onRefresh={loadproducts}
        refreshing={isRefreshing}
        data={products} 
        renderItem={itemData => 
        <ProductItem 
        title={itemData.item.title} 
        price={itemData.item.price} 
        image={itemData.item.imageUrl}
        onViewDetail={() => {
            selectItemHandler(itemData.item.id, itemData.item.title )
        }}
           
        >
        <Button  color={"#E9EC13"} title= "View Details" onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title )
            }}/>
        <Button  color={"#13EC34"} title= "Add to cart" onPress={() => {
            dispatch(cartActions.addToCart(itemData.item))
        }}/>
        
        </ProductItem>    
        }/>
    )

}

ProductsOverview.navigationOptions = navData => {
    return {
    headerTitle: "All Products",
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
    headerRight: () => 
    <HeaderButtons 
    HeaderButtonComponent={CostomHeaderButton}>
    <Item 
    title="Cart" 
    iconName={"md-cart"} 
    onPress={() => {
        navData.navigation.navigate("Cart")
    }}
    />
    </HeaderButtons>
    }
}


const styles = StyleSheet.create ({
    title : {
        fontSize: 24
        
    }
})

export default ProductsOverview;