import React from 'react'
import App from 'next/app'
import AppContainer from '../components/AppContainer';
import firebaseApp from '../firebase/firebaseApp';

class MyApp extends App { // extends : 확장
    /**
     * 특수한 목적을 가지고 만들어진 클래스
     * - 실제적인 앱의 엔트리 포인트 (시작점의 역할을 합니다.)
     * - 프론트엔드쪽 동작
     * - 처음 접속될 때 한번만 실행된다.
     * - 익명 사용자 정보같은 건 이곳에서 불러오는게 적절하다.
     * - 서버사이드렌더링 처리 - _app.js에서도 제공합니다. 
     * - getInitialProps(appContext) 
     *   - appContext: _app.js 에서는 더 넓은 뜻을 가지고 있다고?
     */

    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.

    // static async getInitialProps(appContext) {
    //     /**
    //      * - 예전 자료를 가져다 쓰면 놉 
    //      *   - 내부 내용이 자잘하게 많이 ? 바뀌었다.
    //      * 
    //      */
    //     // calls page's `getInitialProps` and fills `appProps.pageProps`
    //     const appProps = await App.getInitialProps(appContext);

    //     return { ...appProps }
    // }
    state = {
        user: null,
    }

    render() {
        const { Component, pageProps } = this.props
        if (this.state.user) {
            return <div>
                <AppContainer>
                    <Component {...pageProps} />
                </AppContainer>
            </div>
        }
        else {
            return <>
                Loading user data...
            </>
        }

    }

    componentDidMount() { // 로그인 전, 후에 대한 처리를 여기서 진행합니다.
        firebaseApp.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token.
                var token = result.credential.accessToken;
            }
            var user = result.user;
            console.log('getRedirectResult', user);
        });
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                // ...
                if (user.providerData.length) {
                    console.log('user', user);
                }
                else {
                    console.log('anonymous user', user);
                    this.setState({ user });
                }
            } else {
                // User is signed out.
                // ...
            }
            // ...
        });
        firebaseApp.auth().signInAnonymously();
    }
}

export default MyApp