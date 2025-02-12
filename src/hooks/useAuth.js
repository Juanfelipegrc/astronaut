import { useDispatch, useSelector } from "react-redux"
import { chenckingCredentials, login, logout, setDarkMode, setError } from "../store";
import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../firebase/providers";
import {doc, setDoc} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";
import { useEffect } from "react";



export const useAuth = () => {
    
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    
    


    const onRegisterEmailPassword = async(email, password, displayName) => {

        const res = await registerUserWithEmailPassword(email, displayName, password);

        if(!res.ok) {
            dispatch(setError(res.msg));
            return;
        };

        const user = {
            displayName,
            email,
            uid,
        }


        const userRef = doc(FirebaseDB, 'users', res.uid);

        await setDoc(userRef, {
            displayName,
            email,
            uid
        });

        localStorage.setItem('user', JSON.stringify(user));

        dispatch(login(user));

    }


    // ON LOGIN WITH EMAIL PASSWORD

    const onLoginEmailPassword = async(email, password) => {
        dispatch(chenckingCredentials());
        const res = await loginWithEmailPassword(email, password);

        const {uid, displayName} = res;

        if(!res.ok){
            dispatch(setError(res.msg));
            return;
        };

        const user = {
            email,
            displayName,
            uid,
        }

        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch(login(user));
    };



    const onSignInWithGoogle = async() => {
        dispatch(chenckingCredentials());
        const res = await signInWithGoogle();

        const {displayName, email, uid} = res;

        if(!res.ok) {
            dispatch(setError(res.msg));
            return;
        };

        const user = {
            displayName,
            email,
            uid,
        }

        const userRef = doc(FirebaseDB, 'users', uid);

        await setDoc(userRef, user);

        localStorage.setItem('user', JSON.stringify(user));

        dispatch(login(user));

    };


    // ON SET DARK MODE

    const onSetDarkMode = (toggle) => {
        dispatch(setDarkMode(toggle));
    };


    const onLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user')
    };




    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem('user')) || '';
        if(userLogged) {
          dispatch(login(userLogged));
        }
      }, [])


    return {
        ...authState,
        onSetDarkMode,
        onLoginEmailPassword,
        onRegisterEmailPassword,
        onSignInWithGoogle,
        onLogout
    }

}
