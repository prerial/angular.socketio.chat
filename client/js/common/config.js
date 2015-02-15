var Appl = {};

var blnTest = true;
var HEADER_HEIGHT = 48;
var FOOTER_HEIGHT = 26;

var RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.RTCPeerConnection;
var RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
var RTCIceCandidate = window.RTCIceCandidate;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.brURL = window.webkitURL || window.URL;
window.MediaStream = window.MediaStream || window.webkitMediaStream;

var isFirefox = !!navigator.mozGetUserMedia;
var isChrome = !!navigator.webkitGetUserMedia;

var audioConstraints = {
    'optional': [],
    'mandatory': {
        'OfferToReceiveAudio': true,
        'OfferToReceiveVideo': false
     }
};

var videoConstraints = {
    'optional': [],
    'mandatory': {
        'OfferToReceiveAudio': true,
        'OfferToReceiveVideo': true
     }
};

if (isChrome) {
    audioConstraints.optional = [{
        DtlsSrtpKeyAgreement: true
    }];
};

var iceServers = [];
if (isFirefox) {
    iceServers = [{
        url: 'stun:23.21.150.121'
    },{
        url: 'stun:stun.services.mozilla.com'
    }];
}

if (isChrome) {
    iceServers = [{
        url: 'stun:stun.l.google.com:19302'
    },{
        url: 'stun:stun.anyfirewall.com:3478'
    },{
        url: 'turn:turn.bistri.com:80',
        credential: 'homeo',
        username: 'homeo'
    },{
        url: 'turn:turn.anyfirewall.com:443?transport=tcp',
        credential: 'webrtc',
        username: 'webrtc'
    }];
};

iceServers = {
    iceServers: iceServers
};

var Prerial = {};

Prerial.Templates = {};
Prerial.Templates.ComCenterContent = 'client/partials/comcenter_content.html';


Prerial.Config = {};
Prerial.Config.Constrains = {};
Prerial.Config.Constrains.UserMedia = {
    video: {audio: true, video: true},
    audio: {audio: true, video: false}
};

Prerial.Config.Constrains.MediaConstraints = {
    video: {
        'optional': [],
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
         }
    },
    audio: {
        'optional': [],
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': false
        }
    }
};

var audioConstraints = {
};

var videoConstraints = {
};




Prerial.Config.Dialogs = {}
Prerial.Config.Dialogs.DeleteContact = '<li action="delete">Delete Contact</li><li action="cancel">Cancel</li>';
Prerial.Config.Dialogs.EditContacts = '<li action="add">Add Contact</li><li action="info">Contacts Info</li><li action="edit">Delete Contacts</li><li action="cancel">Cancel</li>';
Prerial.Config.Dialogs.EditGroupContacts = '<li action="addgroup">Add Group</li><li action="add">Add Contact</li><li action="info">Contacts Info</li><li action="edit">Delete Contacts</li><li action="cancel">Cancel</li>';
Prerial.Config.Dialogs.Edit = '<li action="edit"><form><textarea cols="25" rows="13" placeholder="let me grow and close the popup" id="editDialog1" name="editDialog"></textarea></form></li>';
Prerial.Config.Dialogs.Invite = null;

Prerial.Config.LoginData = [
    {user: "1", name:"John Doe",value:"john.doe@citi.com"},
    {user: "2", name:"Jane Doe",value:"jane.doe@citi.com"}
/*    ,
    {user: "3", name:"Jack Doe",value:"jack.doe@citi.com"},
    {user: "4", name:"Norman Spinrad",value:"norman.spinrad@citi.com"},
    {user: "5", name:"Alice Snyder",value:"alice.snyder@citi.com"},
    {user: "6", name:"Charles Snyder",value:"charles.snyder@citi.com"},
    {user: "7", name:"Jane Smith",value:"jane.smith@citi.com"}
*/
];

Prerial.Config.InitContactData = {
    "chid": "000",
    "cnport": "cn000",
    "vrport": "vr000",
    "title": "John Doe",
    "profile": {
        "firstname": "John",
        "midname": "",
        "lastname": "Doe",
        "country": "USA",
        "state": "CA",
        "city": "Santa Rosa",
        "phones": {
            "home": "(707) 123-4567",
            "office": "(718) 123-4567",
            "mobile": ""
        },
        "email": "john.doe@citi.com",
        "location": "1 Court Pl, NY",
        "gender": "male"
    },
    "avatar": "client/imgs/chat/avatar_m.gif",
    "presence": "offline"
};
Prerial.Config.TestChatList = {}
Prerial.Config.TestChatList['john.doe@citi.com'] =
{
    "chid": "001",
    "cnport": "cn001",
    "vrport": "vr001",
    "title": "John Doe",
    "profile": {
        "firstname": "John",
        "midname": "",
        "lastname": "Doe",
        "country": "USA",
        "state": "CA",
        "city": "Santa Rosa",
        "phones": {
            "home": "(707) 123-4567",
            "office": "(718) 123-4567",
            "mobile": ""
        },
        "email": "john.doe@citi.com",
        "location": "1 Court Pl, NY",
        "gender": "male"
    },
    "avatar": "client/imgs/chat/GregoryPeck.jpg",
    "presence": "offline"
};
Prerial.Config.TestChatList['jane.doe@citi.com'] =
{
    "chid": "002",
    "cnport": "cn002",
    "vrport": "vr002",
    "title": "Jane Doe",
    "location": "1 Court Pl, NY",
    "avatar": "client/imgs/chat/MarilynMonroe.jpg",
    "profile": {
        "firstname": "Jane",
        "midname": "",
        "lastname": "Doe",
        "country": "USA",
        "state": "CA",
        "city": "Santa Rosa",
        "phones": {
            "home": "(707) 123-4567",
            "office": "(718) 123-4567",
            "mobile": ""
        },
        "email": "jane.doe@citi.com",
        "location": "1 Court Pl, NY",
        "gender": "female"
    },
    "presence": "offline"
};
Prerial.Config.TestChatList['jack.doe@citi.com'] =
{
    "chid": "003",
    "cnport": "cn003",
    "vrport": "vr003",
    "title": "Jack Doe",
    "location": "1 Court Pl, NY",
    "avatar": "client/imgs/chat/PaulNewman.jpg",
    "profile": {
        "firstname": "Jack",
        "midname": "",
        "lastname": "Doe",
        "country": "USA",
        "state": "CA",
        "city": "Santa Rosa",
        "phones": {
            "home": "(707) 123-4567",
            "office": "(718) 123-4567",
            "mobile": ""
        },
        "email": "jack.doe@citi.com",
        "location": "1 Court Pl, NY",
        "gender": "male"
    },
    "presence": "offline"
};
Prerial.Config.TestChatList['norman.spinrad@citi.com'] =
  {
      "chid": "004",
      "cnport": "cn004",
      "vrport": "vr004",
      "title": "Norman Spinrad",
      "avatar": "client/imgs/chat/NormanSpinrad.jpg",
      "profile": {
          "firstname": "Norman",
          "midname": "",
          "lastname": "Spinrad",
          "country": "USA",
          "state": "CA",
          "city": "Santa Rosa",
          "phones": {
              "home": "(707) 123-4567",
              "office": "(718) 123-4567",
              "mobile": ""
          },
          "email": "norman.spinrad@citi.com",
          "location": "100 Citibank Dr, S. Antonio, TX",
          "gender": "male"
      },
      "presence": "offline"
  };
Prerial.Config.TestChatList['alice.snyder@citi.com'] =
  {
      "chid": "005",
      "cnport": "cn005",
      "vrport": "vr005",
      "title": "Alice Snyder",
      "avatar": "client/imgs/chat/avatar_f.gif",
      "profile": {
          "firstname": "Alice",
          "midname": "",
          "lastname": "Snyder",
          "country": "USA",
          "state": "CA",
          "city": "Santa Rosa",
          "phones": {
              "home": "(707) 123-4567",
              "office": "(718) 123-4567",
              "mobile": ""
          },
          "email": "alice.snyder@citi.com",
          "location": "1 Court Pl, NY",
          "gender": "female"
      },
      "presence": "offline"
  };
Prerial.Config.TestChatList['charles.snyder@citi.com'] =
  {
      "chid": "006",
      "cnport": "cn006",
      "vrport": "vr006",
      "title": "Charles Snyder",
      "avatar": "client/imgs/chat/avatar_m.gif",
      "profile": {
          "firstname": "Charles",
          "midname": "",
          "lastname": "Snyder",
          "country": "USA",
          "state": "CA",
          "city": "Santa Rosa",
          "phones": {
              "home": "(707) 123-4567",
              "office": "(718) 123-4567",
              "mobile": ""
          },
          "email": "charles.snyder@citi.com",
          "location": "10 Harborside PL, NJ",
          "gender": "male"
      },
      "presence": "offline"
  };

Prerial.Config.TestChatList['jane.smith@citi.com'] =
    {
        "chid": "007",
        "cnport": "cn007",
        "vrport": "vr007",
        "title": "Jane Smith",
        "avatar": "client/imgs/chat/AudreyHupburn.jpg",
        "profile": {
            "firstname": "Jane",
            "midname": "",
            "lastname": "Smith",
            "country": "USA",
            "state": "CA",
            "city": "Santa Rosa",
            "phones": {
                "home": "(707) 123-4567",
                "office": "(718) 123-4567",
                "mobile": ""
            },
            "email": "jane.smith@citi.com",
            "location": "100 Citibank Dr, S. Antonio, TX",
            "gender": "female"
        },
        "presence": "offline"
    };

Prerial.Config.User = {};

Prerial.Config.ChatSettingsTitles = [
    {title: 'Status', icon: ''},
    {title: 'My Profile', icon: ''},
    {title: 'Settings', icon: ''},
    {title: 'Add Contact', icon: ''},
    {title: 'Add Chat Group', icon: ''}
];
Prerial.Utils = {};
Prerial.Utils.setContactModel = function () {
    var md = Backbone.Model.extend();
    var model = new md;
    model.set(arguments[0])
    return model;
};
Prerial.Utils.stopPropagation = function (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
};

/******************** start Video *****************************/
/*
function WebSocket(_socket, limit) {
    var channel = _socket.channel;
    var dataRef = new window.Firebase('https://chat.firebaseIO.com/' + channel);
    dataRef.remove();
    dataRef.channel = channel;
    //   if (limit) {
    dataRef.limit(1);
    dataRef.onDisconnect().remove();
    //   }
    dataRef.on('child_added', function (data) {
        _socket.onmessage(data.val());
    });
    dataRef.send = function (data) {
        this.push(data);
    };
    if (_socket.isInitiator === true) {
        dataRef.onDisconnect().remove();
    }
    if (_socket.onopen) {
        setTimeout(_socket.onopen, 1);
    }
    console.debug("WebSocket", dataRef)
    return dataRef;
};
*/
function NodeWebSocket (req) {
  var _this = this;
  this.socket = new req.websocket();
  this.socket.on(req.evt, function (data) {
    req.onmessage(data)
  });
  this.doSend = function(data) {
    _this.send(data);
  };
  this.send = function(data) {
    _this.socket.emit(req.evt, data);
  };
  this.writable = true;
  return this;
};

/********************************* stop Video ************************/

function getToken() {
    return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
};


var App = {};
App.isiPad = /iPad/i.test(navigator.userAgent) || /iPhone OS 3_1_2/i.test(navigator.userAgent) || /iPhone OS 3_2_2/i.test(navigator.userAgent);
App.authenticated = true;
App.user = Prerial.Config.User;
App.video = {};
App.video.moderator = false;
App.video.started = false;
App.video.videoRoom = null;
App.audio = {};
App.audio.moderator = false;
App.audio.started = false;
App.audio.audioRoom = null;
App.chat = {};
App.chat.models = {};
App.chat.alerts = {};
App.chat.visible = false;
App.chat.conversations = {};
App.chat.conversations.active = null;
App.chat.conversations.display = {};
App.chat.conversations.connections = {};

