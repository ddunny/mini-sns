import React from 'react'
import App from 'next/app'

class MyApp extends App { // extends : 확장
    /**
     * 특수한 목적을 가지고 만들어진 클래스
     * - 실제적인 앱의 엔트리 포인트 (시작점의 역할을 합니다.)
     */

    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render() {
        const { Component, pageProps } = this.props
        return <div>
            <Component {...pageProps} />
        </div>
    }
}

export default MyApp