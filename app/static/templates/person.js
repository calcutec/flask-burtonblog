(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["person.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" class=\"item-list\" id=\"main-image\">\n    <div class=\"profile-content\">\n        <div class=\"profile-details\">\n                <h3>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "</h3>\n                <h5 id=\"followers\">Followers: ";
output += runtime.suppressValue((lineno = 4, colno = 67, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"followers")),"count"), "post[\"followers\"][\"count\"]", context, [])), env.opts.autoescape);
output += "</h5>\n                <h5>Following: ";
output += runtime.suppressValue((lineno = 5, colno = 51, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"followed")),"count"), "post[\"followed\"][\"count\"]", context, [])), env.opts.autoescape);
output += "</h5>\n            ";
if((lineno = 6, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                <span id=\"followers-icon\">";
env.getTemplate("followers.html", false, "person.html", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "</span>\n            ";
})});
}
output += "\n        </div>\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo")) {
output += "\n            <img class=\"profile-img\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n            alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n        ";
;
}
else {
output += "\n            <img class=\"profile-img\" src=\"https://aperturus.imgix.net/img/profile.jpg?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n            alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n        ";
;
}
output += "\n        <div>\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n                <h5>Last seen: <em>";
output += runtime.suppressValue((lineno = 19, colno = 67, runtime.callWrap(runtime.memberLookup(((lineno = 19, colno = 44, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MMM do YYYY"])), env.opts.autoescape);
output += "</em></h5>\n            ";
;
}
output += "\n            ";
if((lineno = 21, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                    <a class=\"button button-primary\" id=\"update-info\" href=\"/members/update/\" >Update Info</a>\n                    <a class=\"button button-primary\" id=\"change-image\" href=\"/members/upload/\" >Change Image</a>\n                ";
;
}
output += "\n            ";
;
}
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"about_me")) {
output += "\n                <h6>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"about_me"), env.opts.autoescape);
output += "</h6>\n            ";
;
}
output += "\n        </div>\n    </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

