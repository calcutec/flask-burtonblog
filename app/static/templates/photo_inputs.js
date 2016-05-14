(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["photo_inputs.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<input id=\"file-input\" type=\"file\" name=\"file\">\n<input class=\"button button-primary hide\" id=\"photo-submit\" type=\"submit\" value=\"Upload\">\n<span id=\"progress-bar\"></span>";
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

