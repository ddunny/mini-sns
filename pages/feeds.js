import React from 'react';
import FeedForm from '../components/FeedsForm';

class Feeds extends React.Component {
  render() {
    return <>
      <div>
        <FeedForm />
      </div>
      <ul>
        <li>
          <p>내용</p>
          <p><small>2019-09-22 15:50:00</small></p>
        </li>
      </ul>
    </>
  }
}

export default Feeds;