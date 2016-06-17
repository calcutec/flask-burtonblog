(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["photo_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<ul class=\"item-list\">\n    <li>\n        <img data-id=\"";
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
output += "\" class=\"main-responsive-img\">\n        <span class=\"text-content\">\n            <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n                    <b>";
output += runtime.suppressValue((lineno = 10, colno = 55, runtime.callWrap(runtime.memberLookup(((lineno = 10, colno = 32, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["M/D/YY"])), env.opts.autoescape);
output += "</b><br>\n            <span id=\"votes\">";
env.getTemplate("votes.html", false, "photo_detail.html", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "</span>\n            ";
if((lineno = 12, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                <a class=\"link-button red\" id=\"deletephoto\" href=\"#\">Delete</a>\n            ";
;
}
output += "\n            ";
if((lineno = 15, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname") != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                ";
if((lineno = 16, colno = 34, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"has_voted"), "post[\"has_voted\"]", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"id")]))) {
output += "\n                    <a class=\"unvote\" data-voted=\"true\" style=\"color:#eb6864;\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "/vote\" class=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += " likeme\"><i class=\"fa fa-smile-o fa-2x icon-white\"></i></a>\n                ";
;
}
else {
output += "\n                    <a class=\"vote\" data-voted=\"false\" style=\"color:#000;\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "/vote\" class=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += " likeme\"><i class=\"fa fa-meh-o fa-2x icon-white\"></i></a>\n                ";
;
}
output += "\n            ";
;
}
output += "\n        </span>\n    </li>\n</ul>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

