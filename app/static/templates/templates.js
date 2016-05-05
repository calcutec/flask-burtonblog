(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["archive_entry.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<a class=\"gallery-image\" href=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&q=85&auto=format 640w\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" title=\"#";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n    <img src=\"https://aperturus.imgix.net/";
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
output += "\">\n</a>\n<span onclick=\"\" class=\"text-content\">\n    <span class=\"inner-span\">\n        <span class=\"details-well\">\n            ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n                ";
if(!runtime.inOperator(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"),["member","author"])) {
output += "\n                    <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n                ";
;
}
output += "\n            ";
;
}
output += "\n            <b>";
output += runtime.suppressValue((lineno = 19, colno = 49, runtime.callWrap(runtime.memberLookup(((lineno = 19, colno = 24, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</b><br>\n\n\n            ";
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
output += "\n            ";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments")) > 0) {
output += "\n                <a href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n                        ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments")), env.opts.autoescape);
output += " comment";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments")) != 1) {
output += "s";
;
}
output += "\n                </a><br>\n            ";
;
}
output += "\n            ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n                <a href=\"#\" class=\"link-button gallery\">Gallery</a>\n            ";
;
}
output += "\n        </span>\n    </span>\n</span>\n";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n        <a class=\"detail-link\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n        <span class=\"rounded-icon\">\n            <svg version=\"1.1\" width=\"22\" height=\"22\" viewBox=\"0 0 22 22\">\n                <path d=\"M3.4 20.2L9 14.5 7.5 13l-5.7 5.6L1 14H0v7.5l.5.5H8v-1l-4.6-.8M18.7 1.9L13 7.6 14.4 9l5.7-5.7.5 4.7h1.2V.6l-.5-.5H14v1.2l4.7.6\">\n                </path>\n            </svg>\n        </span>\n        </a>\n";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["member.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo")) {
output += "\n        <img src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format\"\n        srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format 175w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=190&h=190&fit=crop&q=85&auto=format 190w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=220&h=220&fit=crop&q=85&auto=format 220w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=320&h=320&fit=crop&q=85&auto=format 320w,\n        https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&h=640&fit=crop&q=85&auto=format 640w\"\n        sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n        class=\"responsive-img\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n";
;
}
else {
output += "\n         <img src=\"https://aperturus.imgix.net/img/profile.jpg?w=175&h=175&fit=crop&q=85&auto=format\"\n        srcset=\"https://aperturus.imgix.net/img/profile.jpg?w=175&h=175&fit=crop&q=85&auto=format 175w,\n        https://aperturus.imgix.net/img/profile.jpg?w=190&h=190&fit=crop&q=85&auto=format 190w,\n        https://aperturus.imgix.net/img/profile.jpg?w=220&h=220&fit=crop&q=85&auto=format 220w,\n        https://aperturus.imgix.net/img/profile.jpg?w=320&h=320&fit=crop&q=85&auto=format 320w,\n        https://aperturus.imgix.net/img/profile.jpg?w=640&h=640&fit=crop&q=85&auto=format 640w\"\n        sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n        class=\"responsive-img\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n";
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
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n                <p><em>Last seen:</em></p>\n                <p><em>";
output += runtime.suppressValue((lineno = 29, colno = 57, runtime.callWrap(runtime.memberLookup(((lineno = 29, colno = 32, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</em></p>\n            ";
;
}
output += "\n        </span>\n    </span>\n</span>";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["header.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname"), env.opts.autoescape);
output += "'s Photos\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "login") {
output += "\n        Login/Signup\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "home") {
output += "\n        This Great Pic\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "upload") {
output += "\n        Upload Photo\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photo") {
output += "\n        Photo #";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"photo_id"), env.opts.autoescape);
output += "\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "\n        Photos\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "member") {
output += "\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"person")),"nickname"), env.opts.autoescape);
output += "'s Photos\n    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "\n        Members\n    ";
;
}
else {
output += "\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"), env.opts.autoescape);
output += " - ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category"), env.opts.autoescape);
output += "\n    ";
;
}
;
}
;
}
;
}
;
}
;
}
;
}
;
}
output += "\n";
;
}
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["nav.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += " <input class=\"burger-check\" id=\"burger-check\" type=\"checkbox\"><label for=\"burger-check\" class=\"burger\"></label>\n                ";
if(runtime.inOperator(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"),["author","photos","member","members"]) && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") != "upload") {
output += "\n\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "\n                        <div id=\"title\"><i class=\"current fa-briefcase fa\"></i></div>\n                    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "\n                        <div id=\"title\"><i class=\"current fa-picture-o fa\"></i></div>\n                    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "member") {
output += "\n                        <div id=\"title\"><i class=\"current fa-user fa\"></i></div>\n                    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "\n                        <div id=\"title\"><i class=\"current fa-users fa\"></i></div>\n                    ";
;
}
;
}
;
}
;
}
output += "\n                    <label id=\"element-label\" for=\"element\">\n                        <select name=\"element\" id=\"element\">\n                            <option value=\"latest\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "latest") {
output += "selected";
;
}
output += ">Latest</option>\n                            <option value=\"all\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "all") {
output += "selected";
;
}
output += ">All</option>\n                            <option class=\"select-dash\" disabled=\"disabled\">----------</option>\n                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "\n                                ";
frame = frame.push();
var t_3 = env.getFilter("dictsort").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category_counts"));
if(t_3) {var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0]
frame.set("key", t_3[t_1][0]);
var t_5 = t_3[t_1][1]
frame.set("value", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                                     <option value=";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == t_4) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += " (";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += ")</option>\n                                ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_6 in t_3) {
t_1++;
var t_7 = t_3[t_6];
frame.set("key", t_6);
frame.set("value", t_7);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                                     <option value=";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == t_6) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += " (";
output += runtime.suppressValue(t_7, env.opts.autoescape);
output += ")</option>\n                                ";
;
}
}
}
frame = frame.pop();
output += "\n            ";
output += "\n            ";
output += "\n            ";
output += "\n                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "member") {
output += "\n                                ";
frame = frame.push();
var t_10 = env.getFilter("dictsort").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category_counts"));
if(t_10) {var t_8;
if(runtime.isArray(t_10)) {
var t_9 = t_10.length;
for(t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8][0]
frame.set("key", t_10[t_8][0]);
var t_12 = t_10[t_8][1]
frame.set("value", t_10[t_8][1]);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                                     <option value=";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == t_11) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += " (";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += ")</option>\n                                ";
;
}
} else {
t_8 = -1;
var t_9 = runtime.keys(t_10).length;
for(var t_13 in t_10) {
t_8++;
var t_14 = t_10[t_13];
frame.set("key", t_13);
frame.set("value", t_14);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                                     <option value=";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == t_13) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += " (";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += ")</option>\n                                ";
;
}
}
}
frame = frame.pop();
output += "\n                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "\n                                ";
frame = frame.push();
var t_17 = env.getFilter("dictsort").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category_counts"));
if(t_17) {var t_15;
if(runtime.isArray(t_17)) {
var t_16 = t_17.length;
for(t_15=0; t_15 < t_17.length; t_15++) {
var t_18 = t_17[t_15][0]
frame.set("key", t_17[t_15][0]);
var t_19 = t_17[t_15][1]
frame.set("value", t_17[t_15][1]);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\n                                     <option value=";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == t_18) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += " (";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += ")</option>\n                                ";
;
}
} else {
t_15 = -1;
var t_16 = runtime.keys(t_17).length;
for(var t_20 in t_17) {
t_15++;
var t_21 = t_17[t_20];
frame.set("key", t_20);
frame.set("value", t_21);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\n                                     <option value=";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == t_20) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += " (";
output += runtime.suppressValue(t_21, env.opts.autoescape);
output += ")</option>\n                                ";
;
}
}
}
frame = frame.pop();
output += "\n                            ";
;
}
;
}
;
}
output += "\n                        </select>\n                    </label>\n            ";
;
}
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "request")),"endpoint") == "login") {
output += "\n                <div id=\"title\"><i class=\"current fa fa-sign-in\"></i></div>\n            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "home") {
output += "\n                <div id=\"title\"><i class=\"current fa fa-home\"></i></div>\n            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "upload") {
output += "\n                <div id=\"title\"><i class=\"current fa fa-upload\"></i><span id=\"subtitle\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category"), env.opts.autoescape);
output += "</span></div>\n            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photo") {
output += "\n                <div id=\"title\"><i class=\"current fa-picture-o fa\"></i><span id=\"subtitle\">#";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"photo_id"), env.opts.autoescape);
output += "</span></div>\n            ";
;
}
;
}
;
}
;
}
output += "\n    <span class=\"loginlogout\">\n        ";
if((lineno = 46, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n            <a href=\"/logout\"><i class=\"fa fa-sign-out\"></i></a>\n        ";
;
}
else {
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") != "login") {
output += "<a href=\"/login\"><i class=\"fa fa-sign-in fa-2x\"></i></a>";
;
}
output += "\n        ";
;
}
output += "\n    </span>\n    <div id=\"nav\" class=\"navigation\">\n        <ul>\n        ";
if(!(lineno = 54, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "home") {
output += "current";
;
}
output += "\"><a href=\"/home\"><i class=\"fa fa-home\"></i></a></li>\n        ";
;
}
output += "\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") != "upload") {
output += "current";
;
}
output += "\"><a href=\"/photos/latest\"><i class=\"fa fa-picture-o\"></i></a></li>\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "current";
;
}
output += "\"><a href=\"/members/latest\"><i class=\"fa fa-users\"></i></a></li>\n        ";
if((lineno = 59, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "current";
;
}
output += "\"><a href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname"), env.opts.autoescape);
output += "/latest\"><i class=\"fa fa-briefcase\"></i></a></li>\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "upload") {
output += "current";
;
}
output += "\"><a href=\"/photos/upload\"><i class=\"fa fa-upload\"></i></a></li>\n        ";
;
}
output += "\n        </ul>\n    </div>";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["person.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" class=\"img-list\" id=\"main-image\">\n    <div class=\"profile-content\">\n        <div class=\"profile-details\">\n                <h3>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "</h3>\n                <h5>Followers: ";
output += runtime.suppressValue((lineno = 4, colno = 52, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"followers")),"count"), "post[\"followers\"][\"count\"]", context, [])), env.opts.autoescape);
output += "</h5>\n                <h5>Following: ";
output += runtime.suppressValue((lineno = 5, colno = 51, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"followed")),"count"), "post[\"followed\"][\"count\"]", context, [])), env.opts.autoescape);
output += "</h5>\n            ";
if((lineno = 6, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                ";
if((lineno = 7, colno = 39, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "g")),"user")),"is_following"), "g[\"user\"][\"is_following\"]", context, [runtime.contextOrFrameLookup(context, frame, "post")]))) {
output += "\n                    <a class=\"link-button unfollow\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "/unfollow/\"><strong>Unfollow</strong></a>\n                ";
;
}
else {
output += "\n                    <a class=\"link-button follow\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "/follow/\"><strong>Follow</strong></a>\n                ";
;
}
output += "\n            ";
;
}
output += "\n        </div>\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo")) {
output += "\n            <img class=\"profile-img\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n            alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n        ";
;
}
else {
output += "\n            <img class=\"profile-img\" src=\"https://aperturus.imgix.net/img/profile.jpg?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n            alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n        ";
;
}
output += "\n        <div>\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n                <h5>Last seen: <em>";
output += runtime.suppressValue((lineno = 23, colno = 69, runtime.callWrap(runtime.memberLookup(((lineno = 23, colno = 44, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</em></h5>\n            ";
;
}
output += "\n            ";
if((lineno = 25, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                    <a class=\"button button-primary\" href=\"/members/update/\" >Update Info</a>\n                    <a class=\"button button-primary\" href=\"/members/upload/\" >Change Image</a>\n                ";
;
}
output += "\n            ";
;
}
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"about_me")) {
output += "\n                <h6>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"about_me"), env.opts.autoescape);
output += "</h6>\n            ";
;
}
output += "\n        </div>\n    </div>\n</div>";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["home_page.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<img class=\"home-pic\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "static_url"), env.opts.autoescape);
output += "img/home_logo.svg\" alt=\"logo\">\n<div class=\"home-text\">\n    <h3>What is it?</h3>\n    <p >This Great Pic is a website and app for sharing your very best photographic creations.</p>\n    <p>It has been designed to meet the requirements of serious photographers wishing to share and get feedback on their work and technique.\n    This Great Pic stores and displays a photo in its original aspect-ratio and in a resolution optimized for the device and screen on which it is being viewed.</p>\n    <p>It also retains and gives automatic access to the photo file's <em>exif</em> data. Most often stripped from a photo file by media servers to reduce its size,\n    this meta-data contains critical information on when, how (in terms of aperture, speed, light-settings, etc) and with what type of camera and lens the photo was taken.</p>\n</div>\n<div class=\"sitesection\">\n    <p class=\"expand-one\"><a class=\"link-button\" href=\"#\">More...</a></p>\n    <div class=\"content-one home-text well\">\n        A file chosen for upload must be an original version with exif data intact. This helps to:\n        <ul>\n            <li>1) Ensure that users submit photos they have taken themselves and presumably own.</li>\n            <li>2) Determine the best size for viewing the photo on either a desktop computer or mobile device.</li>\n            <li>3) Allow users to share info about the camera, lens, aperture, timing, light-setting, etc, used in capturing a given photo.</li>\n        </ul>\n    </div>\n</div>\n<div class=\"home-text\">\n<h3>How do I join?</h3>\n    <p>Click the arrow at the top right to go to the signup and login page. New users can join either by one-click login\n    connected to their Facebook or Google accounts, or by providing their email and a password and user name.</p><p>This Great Pic will never share your photos, email, comment's content or other user information with companies or other groups.</p>\n</div>\n<div class=\"home-text\">\n<h3>How does it work?</h3>\n<p>Pretty much like most social-media apps and sites: click appropriately-labeled buttons or icons to view, share, edit,\n    delete, or comment on photos.</p><p>Buttons for filtering content and navigating the site are accessed through the\n    menu on the top left of each page.</p>\n</div>\n<div class=\"home-text\">\n    <h3>Who runs this thing?</h3>\n    <p>I am a web-developer and amateur photographer who built and maintains this project in my freetime. Please contact me at\n    admin@thisgreatpic.com with any suggestions for improvements or if you run into any issues.</p>\n</div>";
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

