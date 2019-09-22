const Koa = require('koa');
const cors = require('@koa/cors');
const next = require('next');
const Router = require('koa-router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const koaBody = require('koa-body');

const api = new Router({ prefix: '/api' });

const firebaseApp = require('./firebase/firebaseApp');
// console.log(firebaseApp);
const db = firebaseApp.firestore();
const moment = require('moment');

api.get('/', async context => {
    context.body = 'api';
});

api.get('/ping', async context => {
    context.body = 'pong';
});

api.get('/feeds', async context => {
    const result = await db.collection('feeds').get(); // 데이터 전체 가지고 오기 // result => list 형태로 온다
    const list = [];
    result.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
    });
    context.body = list;
});

api.post('/feeds', async context => {
    const content = context.request.body.content; // 리액트에서 넘겨받은 값
    const now = moment().format('YYYY-MM-DD HH:mm:ss'); // == new Date(); 비슷~~~
    const doc = await db.collection('feeds').add({ // doc 안에 json으로 변환하지 못하는 값들이 많다.
        content: content,
        created_at: now, // 작성시간
        updated_at: now, // 갱신시간
    });
    context.body = doc.id;
});

app
    .prepare()
    .then(() => {
        const server = new Koa();
        const router = new Router();

        router.get('*', async context => {
            await handle(context.req, context.res);
            context.respond = false;
        });

        server.use(async (context, next) => {
            context.res.statusCode = 404;
            await next();
        });

        // 미들웨어
        server.use(koaBody({ multipart: true }));
        server.use(
            cors({
                origin: '*',
                allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
                allowHeaders: ['Content-Type', 'Authorization'],
                exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
            }),
        );

        // API
        server.use(api.routes());
        server.use(router.routes());
        // server.use(handle);
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.log(ex);
        process.exit(1);
    });