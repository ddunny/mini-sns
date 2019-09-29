import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import FeedForm from '../components/FeedsForm';
import firebaseApp from '../firebase/firebaseApp';
import { withAppContext } from '../contexts/AppContext';
import Nav from '../components/nav';

const db = firebaseApp.firestore();

class Feeds extends React.Component {
  // state = { // constructor 안에서 하기 때문에 더이상 필요 없음
  //   list: [],
  // }
  constructor(props) { // react spec
    super(props); //!! 필수
    this.state = {
      list: props.list
    }
  }
  componentDidMount() { // 서버사이드 렌더링 영향을 받지 않는 곳
    // axios.get('/api/feeds').then(response => { 
    //   this.setState({ list: response.data });
    // });
    /**
     * onSnapshot
     * - firebase 사용하는 큰 이유
     */
    db.collection('feeds').onSnapshot(result => {
      const list = [];
      result.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ list });
    });
  }
  render() {
    return <>
      <Head>
        <title>피드 목록</title>
        <meta type="title" content="피드 목록" />
        <meta type="keyword" content="SNS, Social Media, 소셜 미디어" />
      </Head>
      <Nav />
      {this.props.context.user && (
        <div className="mb-4">
          <FeedForm />
        </div>
      )}
      <ul className="list-unstyled row">
        {this.state.list.map(item => {
          return (
            <li className="card col-3" key={item.id}>
              <div className="card-body">
                <p>
                  <Link href={'/feed?id=' + item.id}
                    as={'/feed/' + item.id}>
                    <a>{item.content}</a>
                  </Link>
                  <br />
                  <span>
                    <img src={item.avatar} style={{ height: '1.2em' }} />
                    {item.displayName}
                  </span>
                  <br />
                  <small>{item.created_at}</small>
                </p>
              </div>

            </li>
          )
        })}
      </ul>
    </>
  }
}

// only next.js
Feeds.getInitialProps = async () => { // constructor 보다 한단계 먼저 실행된다. // onSnapshot 을 쓰면 이거 없어도 된다. 
  const response = await axios.get('http://localhost:3000/api/feeds'); // http://localhost:3000 : 최종적으로 배포할 땐 이주소이면 안돼.. 별도로 호스트 변경한다고 한다.
  // const response = await axios.get('/api/feeds');
  return {
    list: response.data,
  }; // 리턴하는 것은 오브젝트여야 한다. 약속! // 함수의 생성자로 넘어가기 때문에
};

Feeds = withAppContext(Feeds);

export default Feeds;