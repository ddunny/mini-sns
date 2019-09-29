import React from 'react'
import App from 'next/app'

class MyApp extends App { // extends : 확장
    /**
     * 특수한 목적을 가지고 만들어진 클래스
     * - 실제적인 앱의 엔트리 포인트 (시작점의 역할을 합니다.)
     * - 프론트엔드쪽 동작
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
            <header>
                이 헤더는 모든 페이지에서 공통으로 표시됩니다.
                  <ul>
                    <li>Menu 1</li>
                    <li>Menu 2</li>
                    <li>Menu 3</li>
                    <li>로그인</li>
                    {/* 로그인 -> 로그아웃으로 보이기도 해야해.. 로그인은 페이지별로 바뀔 수 있는 여지가 있다. */}

                </ul>
            </header>
            <Component {...pageProps} />
        </div>
    }

    componentDidMount() { // 로그인 전, 후에 대한 처리를 여기서 진행합니다.

    }
}

export default MyApp