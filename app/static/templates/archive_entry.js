(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["archive_entry.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<a class=\"gallery-image\" onclick=\"return false\" href=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&q=85&auto=format 640w\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" title=\"#";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" onmouseover=\"this.title=''\">\n    <img src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format\"\n    srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format 175w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=190&h=190&fit=crop&q=85&auto=format 190w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=220&h=220&fit=crop&q=85&auto=format 220w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=320&h=320&fit=crop&q=85&auto=format 320w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&h=640&fit=crop&q=85&auto=format 640w\"\n    sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n    class=\"responsive-img\"\n    alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n</a>\n<span onclick=\"\" class=\"text-content\">\n        ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n            ";
if(!runtime.inOperator(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"),["member","author"])) {
output += "\n                <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n            ";
;
}
output += "\n        ";
;
}
output += "\n        <b>";
output += runtime.suppressValue((lineno = 17, colno = 43, runtime.callWrap(runtime.memberLookup(((lineno = 17, colno = 20, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["M/D/YY"])), env.opts.autoescape);
output += "</b><br>\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"votes") > 0) {
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"votes"), env.opts.autoescape);
output += " like";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"votes") != 1) {
output += "s";
;
}
;
}
output += "\n        ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n            <span class=\"gallery\">\n                <i class=\"fa fa-play-circle-o fa-2x\" aria-hidden=\"true\"></i>\n            </span>\n        ";
;
}
output += "\n</span>\n";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n        <a onclick=\"\" class=\"detail-link\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n            <span class=\"rounded-icon\">\n                <i class=\"fa fa-camera-retro fa-c2x\"></i>\n            </span>\n        </a>\n";
;
}
output += "\n";
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

