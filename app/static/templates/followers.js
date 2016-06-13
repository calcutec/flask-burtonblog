(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["followers.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if((lineno = 0, colno = 23, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "g")),"user")),"is_following"), "g[\"user\"][\"is_following\"]", context, [runtime.contextOrFrameLookup(context, frame, "post")]))) {
output += "\n    <a class=\"link-button unfollow\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "/unfollow/\"><strong>Unfollow</strong></a>\n";
;
}
else {
output += "\n    <a class=\"link-button follow\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "/follow/\"><strong>Follow</strong></a>\n";
;
}
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

