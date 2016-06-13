(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["votes.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"votes") > 0) {
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"votes"), env.opts.autoescape);
output += " like";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"votes") != 1) {
output += "s";
;
}
output += "<br>";
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

