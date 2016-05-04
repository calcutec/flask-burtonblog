(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["main_entry.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<ul id=\"main-image\" class=\"img-list\">\n    <li>\n    <img data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" sizes=\"92.5vw\" src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=300&q=85&auto=format\"\n    srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=300&q=85&auto=format 300w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=600&q=85&auto=format 600w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=900&q=85&auto=format 900w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=1290&q=85&auto=format 1290w\"\n    alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\" class=\"main-responsive-img\">\n    <span onclick=\"\" class=\"text-content\">\n        <span>\n            <span class=\"details-well\">\n                <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n                <b>";
output += runtime.suppressValue((lineno = 12, colno = 53, runtime.callWrap(runtime.memberLookup(((lineno = 12, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</b><br>\n                ";
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
output += "\n                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"body"), env.opts.autoescape);
output += "\n            </span>\n        </span>\n    </span>\n    <a class=\"detail-link\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n        <span class=\"main rounded-icon\">\n            <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\">\n                <path d=\"M3.4 20.2L9 14.5 7.5 13l-5.7 5.6L1 14H0v7.5l.5.5H8v-1l-4.6-.8M18.7 1.9L13 7.6 14.4 9l5.7-5.7.5 4.7h1.2V.6l-.5-.5H14v1.2l4.7.6\">\n                </path>\n            </svg>\n        </span>\n    </a>\n    </li>\n</ul>";
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

