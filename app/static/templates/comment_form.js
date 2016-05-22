(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comment_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"comments\">\n    <form id=\"comment-form\" class=\"form-horizontal\" action=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "/comment\" method=\"post\"\n          enctype=\"multipart/form-data\" name=\"comment\">\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "form")),"csrf_token"), env.opts.autoescape);
output += "\n        <div class=\"form-group\">\n            <label for=\"comment\">Add your comment!:</label>\n            ";
output += runtime.suppressValue((lineno = 6, colno = 25, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "form")),"comment"), "form[\"comment\"]", context, [runtime.makeKeywordArgs({"class": "form-control","placeholder": "Comments.."})])), env.opts.autoescape);
output += "\n            ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "form")),"comment")),"errors");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("error", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                <span class=\"help-inline\" style=\"color:red\">[";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "]</span><br>\n            ";
;
}
}
frame = frame.pop();
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

