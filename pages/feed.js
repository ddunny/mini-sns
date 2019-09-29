import React from 'react';
import { useRouter } from 'next/router';
import firebaseApp from '../firebase/firebaseApp';

const db = firebaseApp.firestore();

const Feed = () => {
    const [doc, setDoc] = React.useState({});

    const router = useRouter();
    console.log('query', router.query);
    const id = router.query.id;
    React.useEffect(() => { // 서버사이드 렌더링에 반영되지 않는다!
        db.collection('feeds').doc(id).get().then(doc => {
            console.log('doc', doc.data());
            setDoc(doc.data());
        });
    }, [])
    return (
        <>
            {doc.content}
        </>
    )
}

Feed.getInitialProps = async context => {
    console.table('context', context);
    return {};
}

export default Feed;