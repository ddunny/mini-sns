import React from 'react';
import firebase from 'firebase'; // 통으로 로드해서 강사님 워닝발생
import firebaseApp from '../firebase/firebaseApp';

export default () => {
    const [uid, setUid] = React.useState('');
    const getAnonymousUser = async () => {
        firebaseApp.auth().signInAnonymously();
    }
    React.useEffect(() => {
        firebaseApp.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token.
                let token = result.credential.accessToken;
            }
            let user = result.user;
            console.log('getRedirectResult', user);
        });
        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                let isAnonymous = user.isAnonymous;
                let uid = user.uid;
                // ...
                if (user.providerData.length) { // 익명 로그인인 경우에는 providerData 가 존재하지 않음
                    console.log('user', user);
                }
                else {
                    console.log('anonymous user', user);
                }
                setUid(user.uid);
            } else {
                // User is signed out.
                // ...
            }
            // ...
        });
        getAnonymousUser();
    }, []);
    const gooleLogin = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        // firebaseApp.auth().signInWithPopup(provider);
        firebaseApp.auth().signInWithRedirect(provider);
    }
    return (
        <>
            <h1>Auth</h1>
            <p>uid : {uid}</p>
            <div>
                <button onClick={gooleLogin}>Google Login</button>
            </div>
            <div>
                <button>Facebook Login</button>
            </div>
            <div>
                <button>Twitter Login</button>
            </div>
        </>
    )
}