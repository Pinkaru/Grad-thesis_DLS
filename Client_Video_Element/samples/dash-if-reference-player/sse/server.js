var http = require('http');
var sys = require('sys');
var servStatic = require('serve-static');
var SSE = require('ssestream');
var flag = 0;

function start(){
  http.createServer(function(req, res) {
    //debugHeaders(req);

    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
      if (req.url == '/events') {
        setSSE(req, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    }
  }).listen(3000);
}

function setSSE(req, res) {
  const sseStream = new SSE(req);
  sseStream.pipe(res);
  flag = 1;

  res.on('close', () => {
    sseStream.unpipe(res);
    flag = 0;
    console.log('disconnect...' + req.ip);
  });
}

function sendSSE(e) {
  if(flag !== 0)
  seStream.write({
        event: 'DLS',
        data: e
      });
}
module.exports = sse_server;