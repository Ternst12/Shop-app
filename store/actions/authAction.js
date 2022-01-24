import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"
export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"

let timer;


export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type: AUTHENTICATE, userId: userId, token: token})
    }
}


export const signup = (email, password) => {
    return async dispatch => {
     const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu-BwFH-23Q3jFJN1UvOqFpFPtqQSFN7I",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true

            })
        });

        if(!response.ok) {
            const errorBesked = await response.json();
            console.log(errorBesked)
            errorID = errorBesked.error.message
            console.log("errorID = ", errorID)
            let message = "Login fejlede af ukendt årsag"
            if(errorID === "INVALID_EMAIL") {
                message = "Der er noget galt med den angivet emailadresse. Forsøg med en anden"
            } else if (errorID === "WEAK_PASSWORD : Password should be at least 6 characters") {
                message = "Det angivet password er for svagt. Passwordet skal bestå af mindst 6 tegn"
            } else if (errorID === "EMAIL_EXISTS") {
                message = "Der eksisterer allerede en bruger med den angivet emailadresse"
            }
            
            throw new Error(message)
        }

        const resData = await response.json();
        console.log("login oplysninger : ", resData)

        dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId})
        dispatch({type: AUTHENTICATE, userId: resData.localId, token: resData.idToken, expiryTime: parseInt(resData.expiresIn) * 1000})
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000) // resData.expiresIn string with seconds
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
};

export const login = (email, password) => {
    return async dispatch => {
     const response = await fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu-BwFH-23Q3jFJN1UvOqFpFPtqQSFN7I",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true

            })
        });

        if(!response.ok) {
            const errorBesked = await response.json();
            console.log(errorBesked)
            errorID = errorBesked.error.message
            console.log("errorID = ", errorID)
            let message = "Login fejlede af ukendt årsag"
            if(errorID === "INVALID_PASSWORD") {
                message = "Det indtastet password er ugyldigt";
            } else if (errorID === "EMAIL_NOT_FOUND") {
                message = "Den indtastet emailadresse blev ikke fundet"
            } else if (errorID === "USER_DISABLED") {
                message = "Brugeren er blevet midlertidligt spærret af administratoren"
            } 

            throw new Error(message);
        }

        const resData = await response.json();
        console.log("login oplysninger : ", resData)

        dispatch({type: LOGIN, token: resData.idToken, userId: resData.localId});
        dispatch({type: AUTHENTICATE, userId: resData.localId, token: resData.idToken, expiryTime: parseInt(resData.expiresIn) * 1000})
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000) // resData.expiresIn string with seconds
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    return {type: LOGOUT}
}

const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer); 
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
       timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime / 1000);
    };
    
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
};