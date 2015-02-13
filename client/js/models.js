var Contact = function(){
    var _this = this;
    _this.chid = "";
    _this.cnport = "";
    _this.vrport = "";
    _this.title = "";
    _this.profile = {
        "firstname": "",
        "midname": "",
        "lastname": "",
        "country": "",
        "state": "",
        "city": "",
        "phones": {
            "home": "",
            "office": "",
            "mobile": ""
        },
        "email": "",
        "location": "",
        "gender": ""
    };
    _this.avatar = "";
    _this.presence = "";
  };

angular.module('comcenterModels',[]).value('Contact',Contact);

