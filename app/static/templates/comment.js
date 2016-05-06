(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comment.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<li><b>";
output += runtime.suppressValue((lineno = 0, colno = 43, runtime.callWrap(runtime.memberLookup(((lineno = 0, colno = 16, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"created_at")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MMMM Do YYYY, h:mm:ss a"])), env.opts.autoescape);
output += "</b></li>\n<li>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"nickname"), env.opts.autoescape);
output += " commented:</li>\n<li>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"body"), env.opts.autoescape);
output += "</li>";
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

