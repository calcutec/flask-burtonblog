(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["photo_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<ul class=\"img-list\">\n    <li>\n        <img data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" sizes=\"92.5vw\" src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=300&q=85&auto=format\"\n        srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=300&q=85&auto=format 300w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=600&q=85&auto=format 600w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=900&q=85&auto=format 900w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=1290&q=85&auto=format 1290w\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\" class=\"main-responsive-img\">\n        <span onclick=\"\" class=\"text-content\">\n            <span>\n                <div class=\"details-well\">\n                        <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n                            <b>";
output += runtime.suppressValue((lineno = 12, colno = 65, runtime.callWrap(runtime.memberLookup(((lineno = 12, colno = 40, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</b><br>\n                    ";
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
output += "\n                    ";
if((lineno = 14, colno = 53, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                        <a href=\"#\">Edit</a><br>\n                        <a class=\"link-button red\" href=\"#\">Delete</a>\n                    ";
;
}
output += "\n\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n                </div>\n            </span>\n        </span>\n    </li>\n</ul>\n<div>\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"body"), env.opts.autoescape);
output += "\n    <h4>Comments</h4>\n";
output += "\n</div>";
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

