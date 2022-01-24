import { createStackNavigator } from "react-navigation-stack";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createSwitchNavigator } from "react-navigation";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authAction"

import CartScreen from "../screens/shop/CartScreen";
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import OrdersScreen from "../screens/shop/OrdersScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/user/StartUpScreen";

import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";
import UserProductScreen from "../screens/user/UserProducts";
import EditProducts from "../screens/user/EditProducts";


const ProductsNavigator = createStackNavigator ({
    ProductsOverview: ProductsOverview,
    ProductDetail: ProductDetail,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
    }
}
);

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},
{ navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
    }
}
)


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProducts
},
{ navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
    }
}
)

const ShopNavigation = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},
{
    contentOptions : {
        activeTintColor: "gold"
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex: 1, paddingTop: 50}}>
                <SafeAreaView forceInset={{top: "always", horizontal: "never"}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title ="logout" color={Colors.accent} onPress={() => {
                        dispatch(authActions.logout());
                       // props.navigation.navigate("Auth") 
                    }}/>
                </SafeAreaView>
            </View>
        )
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {defaultNavigationOptions: {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
}})

const MainNavigator = createSwitchNavigator({
    Startup: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigation,


})

export default createAppContainer(MainNavigator);