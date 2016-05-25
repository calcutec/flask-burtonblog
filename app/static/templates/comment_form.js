(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comment_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"comments\">\n    <form id=\"comment-form\" class=\"form-horizontal\" action=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "/comment\" method=\"post\"\n          enctype=\"multipart/form-data\" name=\"comment\">\n";
output += "\n        <div class=\"form-group\">\n            <label for=\"comment\">Add your comment!:</label>\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n            <span id=\"error_comment\" class=\"help-inline\" style=\"color:red\"></span>\n            <button class=\"btn btn-info\" id=\"login-form-submit\" type=\"submit\">Send</button>\n        </div>\n    </form>\n</div>";
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

