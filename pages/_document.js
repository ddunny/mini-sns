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
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
        </Head>
        <body>
          <div id="root">
            <Main />
            <NextScript /> 
            {/* NextScript: 동적로드를 위해서 필요하다 */}
          </div>
        </body>
      </html>
    );
  }
}