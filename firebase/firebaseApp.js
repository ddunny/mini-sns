// import * as firebase from 'firebase'; // 용량이 커서  프로덕션으로 올릴 때 경고발생함
// import firebase from 'firebase'; // 용량이 커서  프로덕션으로 올릴 때 경고발생함

// import firebase from 'firebase/app'; // 용량이 커서  프로덕션으로 올릴 때 경고발생함

// 서비스를 추가로드
const firebase = require('firebase/app');

require('firebase/firestore');
require('firebase/auth'); // 인증을 사용하기 위해 필요함

/**
 * initializeApp
 * - 반드시 한번만 실행되도록 하는 것을 권장함.
 *   - 재호출이 발생하면 오류가 발생합니다.
 */

let app;



try {
    app = firebase.initializeApp(require('./firebaseConfig'));
}
catch (error) {
    app = firebase.app();
}

module.exports = app;