import React from 'react';
import { useRouter } from 'next/router';
import firebaseApp from '../firebase/firebaseApp';
import { withAppContext } from '../contexts/AppContext';
import Nav from '../components/nav';
import Head from 'next/head';

const db = firebaseApp.firestore();

let Feed = (props) => {
    console.log(`Feed props: `, props);
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{props.data.displayName}님의 피드</title>
                <meta type="title" content={props.data.displayName + '님의 피드'} />
                <meta type="description" content={props.data.content} />
                <meta type="keyword" content="SNS, Social Media, 소셜 미디어" />
                <meta property="og:url" content={'https://domain.com' + '/feed/' + props.data.id} />
                <meta type="og:title" content={props.data.displayName + '님의 피드'} />
            </Head>
            <Nav />
            <div className="card">
                <div className="card-body">
                    {props.data.content}

                    <br />
                    <span>
                        <img src={props.data.avatar} style={{ height: '1.2em' }} />
                        {props.data.displayName}
                    </span>
                </div>
            </div>
        </>
    )
}

// 서버사이드 랜더링, SPA 라우팅에도 사용한다.
// 완전히 새로고침하면 터미널 콘솔에 찍히고, 아니면 프론트쪽 콘솔에 찍힌다.
// 최초 서버사이드렌더링 때에도 실행되고, 페이지들 이동해서 다닐 때에도 실행된다.
Feed.getInitialProps = async context => { // 초기화되는 시점에 prop를 만든다는 함수~
    console.table('context', context);
    const docRef = await db.collection('feeds')
        .doc(context.query.id)
        .get();
    const data = docRef.data();
    return {
        data,
    };
}
Feed = withAppContext(Feed);

export default Feed;