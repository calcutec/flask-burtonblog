define(["backbone","models/photoModel"],function(e,t){return e.Collection.extend({url:"/photos/",model:t,parse:function(e){return this.authenticated=e.authenticated,this.usernickname=e.usernickname,e.collection},comparator:function(e){return-e.get("timestamp")}})});