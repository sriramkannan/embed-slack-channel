var express = require('express');
var router = express.Router();
var request = require('request');
var http= require('http');
var moment = require('moment');
var channel=process.env.channel;
var token=process.env.token;

/* GET home page. */
router.get('/', function(req, res, next) {
	getLatestChannelInfo(res);
  
});

router.post('/', function(req, res, next) {
	console.log(req.body.postMessage);

	
	var postMessageEncoded = encodeURIComponent(req.body.postMessage);
	request('https://slack.com/api/chat.postMessage?token='+token+'&channel='+channel+'&text='+postMessageEncoded+'&pretty=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(JSON.parse(body).messages); // Print the google web page.
        var ok = JSON.parse(body).ok;
        if(ok) {
        	getLatestChannelInfo(res);
        } else {
        	re.send('post failed');
        }
     }
	});
  
});

function getLatestChannelInfo(res) {
	request('http://slack.com/api/channels.history?token='+token+'&channel='+channel+'&oldest=200&pretty=1', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        //console.log(JSON.parse(body).messages); // Print the google web page.
	        var m = JSON.parse(body).messages;
	        if(m) {
	        	for(var i=0;i<m.length;i++) {
					var date = moment(m[i].ts * 1000).format("DD-MM-YYYY HH:mm:ss");
		        	m[i].dt=date;
		        }
	        	res.render('channel_embed', { title: 'Slack Channel', messages: m.reverse() });
	        } else {
	        	res.render('channel_embed', { title: 'Slack Channel', messages: ['Channel empty'] });
	        }
	        
	     }
	})
}

module.exports = router;