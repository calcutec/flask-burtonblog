(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comment.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<li class=\"comment-outline\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"comment"), env.opts.autoescape);
output += "</li>\n<li class=\"comment-photo\">\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"photo")) {
output += "\n        <img data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"photo"), env.opts.autoescape);
output += "?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"photo"), env.opts.autoescape);
output += "\">\n    ";
;
}
else {
output += "\n        <img src=\"https://aperturus.imgix.net/img/profile.jpg?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n        alt=\"user photo\">\n    ";
;
}
output += "\n</li>\n<li class=\"comment-info\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"nickname"), env.opts.autoescape);
output += "</li>\n<li class=\"comment-date\"><b>";
output += runtime.suppressValue((lineno = 11, colno = 64, runtime.callWrap(runtime.memberLookup(((lineno = 11, colno = 37, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"created_at")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MMMM Do YYYY, h:mm:ss a"])), env.opts.autoescape);
output += "</b></li>\n";
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

