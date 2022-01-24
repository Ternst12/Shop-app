import Product from "../../models/products"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SET_PRODUCTS = "SET_PRODUCTS"

export const fetchProducts = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId

        try {
            const response = await fetch("https://shop-app-1609a-default-rtdb.europe-west1.firebasedatabase.app/products.json",
            {
                method: "GET"
            });

            if(!response.ok) {
                throw new Error("Something went wrong")
                
            }
    
            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,  // key is the id
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price 
                    )
                ); 
            }

            dispatch({
            type: SET_PRODUCTS, 
            products: loadedProducts, 
            userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
        }) 
        } catch (err) {

            throw err
        }   
    };
}


export const deleteProduct = productId => {

    return async (dispatch, getState) => {

        const token = getState().auth.token;

        const response = await fetch(
            `https://shop-app-1609a-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
            {
                method: "DELETE"
            }
        );

        if(!response.ok) {      
            throw new Error("Something went wrong with deleting. Idiot")
        }

        dispatch({type: DELETE_PRODUCT, pid: productId})
    }

    
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
    
    const token = getState().auth.token;
    const userId = getState().auth.userId

    const response = await fetch(`https://shop-app-1609a-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "applikation/json"
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price,
                ownerId: userId
            })
        });

        const resData = await response.json();


        dispatch ({
            type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price,
                ownerId: userId

        
        }
    })

    }
    
    
}

export const updateProduct = (id, title, description, imageUrl) => {
    
    return async (dispatch, getState) => {
    
    const token = getState().auth.token;

    const response = await fetch(
        `https://shop-app-1609a-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "applikation/json"
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                })
        });

        if(!response.ok) {      
            throw new Error("Something went wrong. Idiot")
        }

        dispatch({
            type: UPDATE_PRODUCT, 
            pid: id, 
            productData: {
                title: title,
                description: description,
                imageUrl: imageUrl,
            }
        });

    }
    
}