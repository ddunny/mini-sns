import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    /**
     * - only 서버사이드 렌더링할 때 사용
     * 
     */
  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </Head>
        <body>
          <div id="root">
              <header>
                  이 헤더는 모든 페이지에서 공통으로 표시됩니다.
                  <ul>
                      <li>Menu 1</li>
                      <li>Menu 2</li>
                      <li>Menu 3</li>
                      <li>로그인</li>
                      {/* 로그인 -> 로그아웃으로 보이기도 해야해.. 로그인은 페이지별로 바뀔 수 있는 여지가 있다. */}
                      {/* - 이경우에는 넣지 않는게 좋다 */}

                  </ul>
              </header>
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    );
  }
}