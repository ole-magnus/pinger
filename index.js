const Koa = require('koa');
const Router = require('koa-router');
const request = require('request-promise');
const app = new Koa();
const router = new Router();

const args = process.argv.slice(2);

// Determines URL of host. Default is 'localhost'
const neighborUrl = args.reduce((acc, curr) => {
  return curr.startsWith('neighbor') ? curr.split('=').pop() : acc 
}, 'http://localhost:3000');

router.get('/ask/neighbor', async (ctx, next) => {
  const response = await request.get(neighborUrl + '/ask');
  const newResponse = 'From neighbor: ' + response; 
  ctx.body = newResponse;  
});

router.get('/ask', (ctx, next) => {
  console.log("host");
  ctx.body = 'Host says hello';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
