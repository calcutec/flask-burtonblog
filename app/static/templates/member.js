(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["member.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo")) {
output += "\n    <a class=\"gallery-image\" href=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&q=85&auto=format&sharp=10 640w\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" title=\"#";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n        <img src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format&sharp=10\"\n        srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format&sharp=10 175w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=190&h=190&fit=crop&q=85&auto=format&sharp=10 190w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=220&h=220&fit=crop&q=85&auto=format&sharp=10 220w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=320&h=320&fit=crop&q=85&auto=format&sharp=10 320w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&h=640&fit=crop&q=85&auto=format&sharp=10 640w\"\n        sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n        class=\"responsive-img\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n    </a>\n";
;
}
else {
output += "\n    <a class=\"gallery-image\" href=\"https://aperturus.imgix.net/img/profile.jpg?w=640&q=85&auto=format&sharp=10 640w\" title=\"#";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n        <img src=\"https://aperturus.imgix.net/img/profile.jpg?w=175&h=175&fit=crop&q=85&auto=format&sharp=10\"\n        srcset=\"https://aperturus.imgix.net/img/profile.jpg?w=175&h=175&fit=crop&q=85&auto=format&sharp=10 175w,\n        https://aperturus.imgix.net/img/profile.jpg?w=190&h=190&fit=crop&q=85&auto=format&sharp=10 190w,\n        https://aperturus.imgix.net/img/profile.jpg?w=220&h=220&fit=crop&q=85&auto=format&sharp=10 220w,\n        https://aperturus.imgix.net/img/profile.jpg?w=320&h=320&fit=crop&q=85&auto=format&sharp=10 320w,\n        https://aperturus.imgix.net/img/profile.jpg?w=640&h=640&fit=crop&q=85&auto=format&sharp=10 640w\"\n        sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n        class=\"responsive-img\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n    </a>\n";
;
}
output += "\n<span onclick=\"\" class=\"text-content\">\n    <span>\n        <span class=\"details-well\">\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname")) {
output += "\n                <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "</a>\n            ";
;
}
output += "\n\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n                <p><em>Last seen: ";
output += runtime.suppressValue((lineno = 33, colno = 68, runtime.callWrap(runtime.memberLookup(((lineno = 33, colno = 43, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</em></p>\n            ";
;
}
output += "\n            ";
if((lineno = 35, colno = 39, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "g")),"user")),"is_authenticated"), "g[\"user\"][\"is_authenticated\"]", context, []))) {
output += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") != runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "g")),"user")),"nickname")) {
output += "\n                    ";
if((lineno = 37, colno = 43, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "g")),"user")),"is_following"), "g[\"user\"][\"is_following\"]", context, [runtime.contextOrFrameLookup(context, frame, "post")]))) {
output += "\n                        <a class=\"link-button unfollow\" href=\"";
output += runtime.suppressValue((lineno = 38, colno = 70, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["members",runtime.makeKeywordArgs({"category": "unfollow","nickname": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname")})])), env.opts.autoescape);
output += "\"><strong>Unfollow</strong></a>\n                    ";
;
}
else {
output += "\n                        <a class=\"link-button follow\" href=\"";
output += runtime.suppressValue((lineno = 40, colno = 68, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["members",runtime.makeKeywordArgs({"category": "follow","nickname": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname")})])), env.opts.autoescape);
output += "\"><strong>Follow</strong></a>\n                    ";
;
}
output += "\n                ";
;
}
output += "\n            ";
;
}
output += "\n        </span>\n    </span>\n</span>\n<a class=\"detail-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "\">\n    <span class=\"rounded-icon\">\n        <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\">\n            <path d=\"M3.4 20.2L9 14.5 7.5 13l-5.7 5.6L1 14H0v7.5l.5.5H8v-1l-4.6-.8M18.7 1.9L13 7.6 14.4 9l5.7-5.7.5 4.7h1.2V.6l-.5-.5H14v1.2l4.7.6\">\n            </path>\n        </svg>\n    </span>\n</a>";
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

