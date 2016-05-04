define(["jquery","backbone","views/contentMainView","views/profileMainView","views/archiveView","views/membersView","views/navView","views/headerView","views/contentThumbnailView","views/memberThumbnailView","views/detailView","views/appView","views/homeView","collections/memberCollection","collections/photoCollection"],function(e,t,i,n,o,l,c,r,a,s,m,h,u,g){return t.View.extend({el:"#thisgreatpic",initialize:function(e){if(e.photoCollection){this.photoCollection=e.photoCollection,this.memberCollection=new g;var t=this.getItemDict();t.entity=e.pageType;var l=this;this.memberCollection.fetch({success:function(){if("photo"==t.entity)h(new m({el:"#main-view",collection:l.photoCollection}),t);else if("home"==t.entity)h(new c({el:"#navbar"})),h(new r({el:"#header"})),h(new u({el:"#main-view"}),t);else if("photos"==t.entity)h(new c({el:"#navbar"})),h(new r({el:"#header"})),h(new i({el:"#main-view",collection:l.photoCollection}),t),h(new o({el:"#links",collection:l.photoCollection}));else if("members"==t.entity)h(new c({el:"#navbar"})),h(new r({el:"#header"})),h(new o({el:"#links",collection:l.memberCollection}),t);else if("member"==t.entity){var a=l.memberCollection.where({nickname:e.username})[0];h(new c({el:"#navbar"})),h(new r({el:"#header"})),h(new n({el:"#main-view",model:a}),t),h(new o({el:"#links",collection:l.photoCollection}))}},fail:function(e){console.log(e)}})}},events:{"click a.member-link":"memberLink","click a.detail-link":"detailLink","change #element":"filterOnSelect","click i.fa-picture-o":"iconLink","click i.fa-users":"iconLink","click i.fa-briefcase":"iconLink","click i.fa-home":"iconLink"},getItemDict:function(){return{route:null,collection:null,category:null,entity:null,nickname:null,authenticated:this.photoCollection.authenticated,count:null,postId:null,template:null,render:null}},filterOnSelect:function(i){i.preventDefault();var n=this.getItemDict();n.authenticated=this.memberCollection.authenticated,n.category=e("#element").val(),n.render=!0,n.usernickname=this.memberCollection.usernickname;var o=window.location.pathname.split("/");"photos"==o[1]?(n.collection=this.photoCollection,n.entity="photos",n.route="/photos/"+n.category+"/",t.history.navigate(n.route,{trigger:!1})):"members"==o[1]&&(o[2].match("all|latest")||""==o[2]?(n.collection=this.memberCollection,n.entity="members",n.route="/members/"+n.category+"/",t.history.navigate(n.route,{trigger:!1})):(n.collection=this.photoCollection,n.entity="member",n.nickname=o[2],n.target_user=this.memberCollection.where({nickname:n.nickname})[0],n.route="/members/"+n.nickname+"/"+n.category+"/",t.history.navigate(n.route,{trigger:!1}))),this.filter(n)},getCounts:function(e){var t=[];e.forEach(function(e){t.push(e.get("category"))});for(var i={},n=0;n<t.length;++n)i[t[n]]||(i[t[n]]=0),++i[t[n]];return i},iconLink:function(e){e.preventDefault();var i=this.getItemDict();if(i.authenticated=this.memberCollection.authenticated,i.category="latest",i.render="true",i.usernickname=this.memberCollection.usernickname,"fa-users"==e.currentTarget.classList[1])i.collection=this.memberCollection,i.entity="members",i.route="/members/"+i.category+"/",t.history.navigate(i.route,{trigger:!1});else if("fa-picture-o"==e.currentTarget.classList[1])i.collection=this.photoCollection,i.entity="photos",i.route="/photos/"+i.category+"/",t.history.navigate(i.route,{trigger:!1});else if("fa-briefcase"==e.currentTarget.classList[1])i.collection=this.photoCollection,i.entity="author",i.template="person.html",i.nickname=this.memberCollection.usernickname,i.usernickname=this.memberCollection.usernickname,i.target_user=this.memberCollection.where({nickname:i.usernickname})[0],i.route="/members/"+i.usernickname+"/",t.history.navigate(i.route,{trigger:!1});else if("fa-home"==e.currentTarget.classList[1])return i.collection=this.photoCollection,i.entity="home",i.template="home_page.html",i.route="/home/",t.history.navigate(i.route,{trigger:!1}),h(new r({id:"header"}),i),h(new c({id:"navbar"}),i),h(new u({id:"main-view"}),i),!0;this.filter(i)},memberLink:function(e){e.preventDefault();var i=this.getItemDict();i.authenticated=this.memberCollection.authenticated,i.entity="member",i.nickname=e.target.href.split("/")[4],i.usernickname=this.memberCollection.usernickname,i.target_user=this.memberCollection.where({nickname:i.nickname})[0],i.route="/members/"+i.nickname+"/",t.history.navigate(i.route,{trigger:!1}),i.collection=this.photoCollection.where({nickname:i.nickname}),i.counts=this.getCounts(i.collection),i.render=!0,this.render(i)},detailLink:function(e){e.preventDefault();var i=this.getItemDict();i.collection=this.photoCollection,i.authenticated=this.memberCollection.authenticated,i.entity="photo",i.postId=e.target.closest("a").dataset.id,i.route="/photos/"+i.postId+"/",i.usernickname=this.memberCollection.usernickname,t.history.navigate(i.route,{trigger:!1}),i.render=!0,h(new r({id:"header"}),i),h(new c({id:"navbar"}),i);var n=i.collection.get(i.postId);h(new m({id:"main-view",model:n}),i)},filter:function(e){"all"==e.category||"latest"==e.category?e.nickname?(e.collection=e.collection.where({nickname:e.nickname}),e.counts=this.getCounts(e.collection),"all"==e.category?e.collection=e.collection.splice(0,100):"latest"==e.category&&(e.collection=e.collection.splice(0,10)),this.render(e)):(e.counts=this.getCounts(e.collection),"all"==e.category?e.collection=e.collection.first(100):"latest"==e.category&&(e.collection=e.collection.first(10)),this.render(e)):(e.nickname&&e.category?(e.counts=this.getCounts(e.collection.where({nickname:e.nickname})),e.collection=e.collection.where({nickname:e.nickname,category:e.category})):e.category?(e.counts=this.getCounts(e.collection),e.collection=e.collection.where({category:e.category})):e.nickname&&(e.collection=e.collection.where({nickname:e.nickname}),e.counts=this.getCounts(e.collection)),this.render(e))},render:function(e){if(h(new r({id:"header"}),e),h(new c({id:"navbar"}),e),"members"!=e.entity){var t;"member"==e.entity||"author"==e.entity?(t=e.target_user,h(new n({id:"main-view",model:t}),e)):(t=e.collection[0],h(new i({id:"main-view",model:t}),e))}"photos"==e.entity?h(new o({id:"links",tagName:"ul",className:"img-list",collection:e.collection.splice(1)}),e):"member"==e.entity||"author"==e.entity?h(new o({id:"links",tagName:"ul",className:"img-list",collection:e.collection}),e):"members"==e.entity&&h(new l({id:"links",tagName:"ul",className:"img-list",collection:e.collection}),e)}})});