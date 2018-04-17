//기본 설정
var express = require('express');
var router = express.Router();
//추가 설정
var servStatic = require('serve-static');
var SSE = require('ssestream');
var fs = require('fs');
var readline = require('readline');
var DOMParser = require('xmldom').DOMParser;

//var FLAG_DLS_EVENT = true;
var VALUE_DLS_EVENT = 0;
var FLAG_CD_IS = false;
var INFO_DLS_EVENT;
var sseStream;
/* GET users listing. */

function sendSSE(){
	console.log('[TEST][SSE] Send Event Message');
	sseStream.write ({
			event: 'DLS',
			data: INFO_DLS_EVENT
	});
}
router.get('/', function(req, res, next) {
	console.log('[TEST][SSE] CD Connection');
	sseStream = new SSE(req);
	sseStream.pipe(res);
	FLAG_CD_IS = true;

	res.on('close', () => {
		sseStream.unpipe(res);
		console.log('[TEST][SSE]disconnect...');
		FLAG_CD_IS = false;
	});
});
router.post('/', function(req, res, next) {
	console.log('[TEST][PD][POST] INBANDEVENT_RUN');
	INFO_DLS_EVENT = req.body.event;
	if(VALUE_DLS_EVENT == 0) {
		if(FLAG_CD_IS) {
			sendSSE();	
		}
		VALUE_DLS_EVENT = INFO_DLS_EVENT.value;
	} else if(VALUE_DLS_EVENT != INFO_DLS_EVENT.value) {
		if(FLAG_CD_IS) {
			sendSSE();
		}
		VALUE_DLS_EVENT = INFO_DLS_EVENT.value;
	}
});
module.exports = router;
