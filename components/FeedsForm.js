import React from 'react';
import axios from 'axios';

export default () => {
  const [content, setContent] = React.useState('');
  const submit = () => {
    // const params = {};
    axios.post('/api/feeds', {
      content, // == params
    })
      .then(() => {
        alert('완료되었습니다.'+ content);
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
      });
    // axios.post('/api/feeds') 에 값을 보냅니다.
  }
  return (
    <>
      <input type="text" />
      <button
        value={content}
        onClick={submit}
        onChange={event => setContent(event.target.value)}>전송</button>
    </>
  )
};