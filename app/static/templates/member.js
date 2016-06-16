(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["member.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo")) {
output += "\n        <img src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format\"\n        srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format 175w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=190&h=190&fit=crop&q=85&auto=format 190w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=220&h=220&fit=crop&q=85&auto=format 220w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=320&h=320&fit=crop&q=85&auto=format 320w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&h=640&fit=crop&q=85&auto=format 640w\"\n        sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n        class=\"responsive-img\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n";
;
}
else {
output += "\n         <img src=\"https://aperturus.imgix.net/img/profile.jpg?w=175&h=175&fit=crop&q=85&auto=format\"\n        srcset=\"https://aperturus.imgix.net/img/profile.jpg?w=175&h=175&fit=crop&q=85&auto=format 175w,\n        https://aperturus.imgix.net/img/profile.jpg?w=190&h=190&fit=crop&q=85&auto=format 190w,\n        https://aperturus.imgix.net/img/profile.jpg?w=220&h=220&fit=crop&q=85&auto=format 220w,\n        https://aperturus.imgix.net/img/profile.jpg?w=320&h=320&fit=crop&q=85&auto=format 320w,\n        https://aperturus.imgix.net/img/profile.jpg?w=640&h=640&fit=crop&q=85&auto=format 640w\"\n        sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n        class=\"responsive-img\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n";
;
}
output += "\n<span onclick=\"\" class=\"text-content\">\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname")) {
output += "\n        <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "</a>\n    ";
;
}
output += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n        <p><em>Last seen:</em></p>\n        <p><em>";
output += runtime.suppressValue((lineno = 27, colno = 47, runtime.callWrap(runtime.memberLookup(((lineno = 27, colno = 24, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MM/DD/YY"])), env.opts.autoescape);
output += "</em></p>\n    ";
;
}
output += "\n</span>";
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

