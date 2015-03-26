var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var uuid = require('node-uuid');
//var users = JSON.parse(fs.readFileSync(__dirname + '/profiles.js')).users;
//fs.writeFileSync(__dirname + '/profiles.js', JSON.stringify(db));
//MESSAGES FORMAT: map from messageID to Rumor object - messageStore.messageID = Rumor
var messageStore = JSON.parse(fs.readFileSync(__dirname + '/messages.js'));
//STATE FORMAT: myself: object - peers: list of object - LastSeen: map from PeerID to Count
														//Note: this is MY last seen, each peer should have their own.
var state = JSON.parse(fs.readFileSync(__dirname + '/state.js'));

var port = normalizePort(process.env.PORT || '3000');
console.log('index.js port: ' + port);
/*
//Initialize self
if(state.myself == null){
	state.myself = {
		ID: uuid.v4(),
		Originator: "Paperclip27",
		EndPoint: "http://localhost:" + port + "/",
		NextMessageNumber: 1
	}
}

//SAMPLE CODE -- move elsewhere once you figure out the lab.
var rumorsample =
    {"Rumor" : {"MessageID": "ABCD-1234-ABCD-1234-ABCD-1234:5",
                "Originator": "Phil",
                "Text": "Hello World!"
                },
     "EndPoint": "https://example.com/gossip/13244"
    };

var statesample = {};
var peersample = {"Originator": "Phil",
					"ID": "ABCD-1234-ABCD-1234-ABCD-1234",
					"Want": {}, //the most up-to-date want object for the peer. 
					"EndPoint": "https://example.com/gossip/13244"};

function update(state, message){
	//TODO: RETURN AN UPDATED STATE
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPeer(){
	var peers = state.Peers;
	if(peers.length != 0){
		var choice = getRandomInt(0, peers.length);
		return peers[choice];
	}
}

function prepareMsg(peer){
	var choice = getRandomInt(0, 1);
	if(choice == 0){ //Propogate rumor
		//TODO: Send the next rumor that the peer hasn't seen yet
	}
	else{ //Send Want
		var want = {"Want": state.LastSeen,
					"EndPoint": state.myself}
	}
}

function store(message){
	var messageID = message.Rumor.MessageID;
	var idParts = messageID.split(':');
	messageStore.messageID = message;
	state.LastSeen.idParts[0] = idParts[1];
}

//PROPOGATION ALGORITHM
function propogate(){
  var peer = getPeer(); //Randomly select a peer?
  //TODO: finish prepareMsg method above: currently won't return a rumor.
  var message = prepareMsg(peer); //MUST RANDOMLY CHOOSE EITHER A "RUMOR" OR "WANT" TO SEND TO PEER
  var url = peer.EndPoint;
  request.post(url, message);
}

//THIS IS THE WHILE(TRUE) LOOP FROM THE LAB
var interval = setInterval(propogate, 1000);

function keys(obj)
{
    var keys = [];

    for(var key in obj)
    {
        if(obj.hasOwnProperty(key))
        {
            keys.push(key);
        }
    }

    return keys;
}

function addWorkToQueue(input){
	var queue = [];
	var wantKeys = keys(input.Want);
	var lastSeenKeys = keys(state.LastSeen);
	console.log("Adding work to queue:");
	for(wantKey in wantKeys){
		if(lastSeenKeys.indexOf(wantKey) > -1){
			console.log("wanted key found: " + wantKey);
			var wantVal = input.Want.wantKey;
			var lsVal = state.LastSeen.wantKey;
			console.log("want val: " + wantVal + " lsval: " + lsVal);
			if(wantVal < lsVal){
				console.log("looping");
				for(var i = wantVal + 1; i <= lsVal; i++){
					var messageID = wantKey.concat(i);
					console.log("Work Item messageID: " + messageID);
					var workItem = {"message": messageStore.messageID,
									"endpoint": input.EndPoint};
					queue.push(workItem);
					console.log("rumor added to work queue");
				}
			}
		}
	}
	console.log("returning work queue");
	return queue;
}

var wantsample = 
    {"Want": {"ABCD-1234-ABCD-1234-ABCD-125A": 3,
              "ABCD-1234-ABCD-1234-ABCD-129B": 5,
              "ABCD-1234-ABCD-1234-ABCD-123C": 10
             } ,
     "EndPoint": "https://example.com/gossip/asff3"
    };

//WORK ITEM TEMPLATE:
//{"message": RUMOR,
// "endpoint": URL}
var work_queue = [];
*/
/* GET message create/display page */
router.get('/', function(req, res, next){
	res.render('index', { title: 'Adam Staples Gossip App',
                        messages: messageStore});
});


/* POST endpoint */
/*
router.post('/', function(req, res) {
    var input = JSON.parse(req.body);
    console.log("Rumor:");
    console.log(input.Rumor);
    console.log("Want:");
    console.log(input.Want)
    if (input.Rumor != null) {
    	console.log("Rumor received");
        store(input); //THIS NEEDS TO ADD RUMOR TO KNOWN RUMORS, AND UPDATE PEER'S LAST SEEN MESSAGE
    } else if ( input.Want != null ) {
    	console.log("Want received");
        work_queue = addWorkToQueue(input); //IT COULD PUT A LIST OF pairs of WantEndpoint and Rumor TO SEND TO A PEER
        for(work in work_queue){
            var message = work.message;
            var url = work.endpoint;
            request.post(url, message);
            //state needs to be global, so that it can be used in multiple locations.
            //TODO: UPDATE SAVES THE "LAST SEEN" FOR THE PEER THAT SENT THE WANT?
            state = update(state, message);
        }
        //resets queue for next request
        work_queue = [];
    }
});
*/
module.exports = router;
