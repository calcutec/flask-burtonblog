(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["404.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<h1>File Not Found</h1>\n<p>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "error"), env.opts.autoescape);
output += "</p>\n<p><a href=\"/home\">Back</a></p>\n";
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

