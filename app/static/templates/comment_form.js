(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comment_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"comments\">\n    <form id=\"comment-form\" action=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "/comment\" method=\"post\" enctype=\"multipart/form-data\" name=\"comment\">\n        <input type=\"hidden\" name=\"csrf_token\"    value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\">\n        <div class=\"form-group\">\n            <input class=\"form-control\" id=\"comment\" name=\"comment\" placeholder=\"Type comment here..\" type=\"text\" value=\"\">\n            <span id=\"error_comment\" class=\"help-inline\" style=\"color:red\"></span>\n            <button class=\"btn btn-info\" id=\"comment-form-submit\" type=\"submit\">Submit</button>\n        </div>\n    </form>\n</div>";
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

