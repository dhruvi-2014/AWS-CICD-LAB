const test=require('node:test');
const assert=require('node:assert/strict');
const http=require('node:http');
const app=require('./server');
test('health endpoint responds',async()=>{
  const server=app.listen(0,'127.0.0.1');
  await new Promise(r=>server.once('listening',r));
  const port=server.address().port;
  const result=await new Promise((resolve,reject)=>http.get(`http://127.0.0.1:${port}/health`,res=>{let body='';res.on('data',c=>body+=c);res.on('end',()=>resolve({status:res.statusCode,body}));}).on('error',reject));
  server.close(); assert.equal(result.status,200); assert.match(result.body,/coffee-supplier-app/);
});
