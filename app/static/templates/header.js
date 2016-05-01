(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["header.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"header\">\n    ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname"), env.opts.autoescape);
output += "'s Photos\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "login") {
output += "\n            Login/Signup\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "home") {
output += "\n            This Great Pic\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "upload") {
output += "\n            Upload Photo\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photo") {
output += "\n            Photo #";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"photo_id"), env.opts.autoescape);
output += "\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "\n            Photos\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "member") {
output += "\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"person")),"nickname"), env.opts.autoescape);
output += "'s Photos\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "\n            Members\n        ";
;
}
else {
output += "\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"), env.opts.autoescape);
output += " - ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category"), env.opts.autoescape);
output += "\n        ";
;
}
;
}
;
}
;
}
;
}
;
}
;
}
;
}
output += "\n    ";
;
}
output += "\n</div>";
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

