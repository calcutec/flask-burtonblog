(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["upload_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"inputs\"></div>\n<div class=\"well\" id=\"inputs-target\"></div>\n<div id=\"exif\" class=\"exif\">\n    <table></table>\n</div>";
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

