import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartAction";
import { ADD_ORDER } from "../actions/orderActions";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/productsAction";

const initialState = {
    items: {},
    totalAmount: 0,
    
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            if(state.items[addedProduct.id]) {
                // already have the item in the cart
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice, 
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
                    return {
                        ...state,
                        items: {...state.items, [addedProduct.id]: updatedCartItem},
                        totalAmount:state.totalAmount + productPrice
                    }
                    } else {
                        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice)
                        return {
                            ...state, items: {...state.items, [addedProduct.id]: newCartItem},
                            totalAmount:state.totalAmount + productPrice
                        };
                        
                    }
                    case REMOVE_FROM_CART:
                        const currentAntal = state.items[action.productId].quantity;
                        let updatedCartItems;

                        if(currentAntal > 1) {
                            // need to reduce it, not erase
                            const updatedCardItem = new CartItem(
                                state.items[action.productId].quantity - 1,
                                state.items[action.productId].productPrice,
                                state.items[action.productId].productTitle,
                                state.items[action.productId].sum - state.items[action.productId].productPrice);

                            updatedCartItems = {...state.items, [action.productId]: updatedCardItem};

                        } else {
                            updatedCartItems = {...state.items};
                            delete updatedCartItems[action.productId];
                        }
                        return {
                            ...state,
                            items: updatedCartItems,
                            totalAmount: state.totalAmount - state.items[action.productId].productPrice
                        }
                        case ADD_ORDER: // Tømmer kurven når en købsordrer bliver givet
                            return initialState;
                        case DELETE_PRODUCT:
                            if (!state.items[action.pid])
                            { return state }
                            const updatedItems = {...state.items};
                            const itemTotal = state.items[action.pid].sum;
                            delete updatedItems[action.pid]  
                            return {
                                ...state, 
                                items: updatedItems,
                                totalAmount: state.totalAmount - itemTotal
                            }
                    }

    return state;
}