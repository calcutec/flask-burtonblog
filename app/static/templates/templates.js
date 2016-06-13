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
output += runtime.suppressValue((lineno = 17, colno = 45, runtime.callWrap(runtime.memberLookup(((lineno = 17, colno = 20, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</b><br>\n        ";
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
output += "\n        ";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments")) > 0) {
output += "\n            <a href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments")), env.opts.autoescape);
output += " comment";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments")) != 1) {
output += "s";
;
}
output += "\n            </a><br>\n        ";
;
}
output += "\n        ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n            <a href=\"#\" class=\"link-button gallery\">Gallery</a>\n        ";
;
}
output += "\n</span>\n";
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
output += "\n<span onclick=\"\" class=\"text-content\">\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname")) {
output += "\n        <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "</a>\n    ";
;
}
output += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n        <p><em>Last seen:</em></p>\n        <p><em>";
output += runtime.suppressValue((lineno = 27, colno = 47, runtime.callWrap(runtime.memberLookup(((lineno = 27, colno = 24, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MMM do YYYY"])), env.opts.autoescape);
output += "</em></p>\n    ";
;
}
output += "\n</span>";
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
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "upload") {
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
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n <input class=\"burger-check\" id=\"burger-check\" type=\"checkbox\"><label for=\"burger-check\" class=\"burger\"></label>\n                ";
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
output += "\n                        </select>\n                    </label>\n                ";
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
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "upload") {
output += "\n                <div id=\"title\"><i class=\"current fa fa-upload\"></i></div>\n            ";
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
if((lineno = 47, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
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
if(!(lineno = 55, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "home") {
output += "current";
;
}
output += "\"><a href=\"/home\"><i class=\"fa fa-home\"></i></a></li>\n        ";
;
}
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") != "photo") {
output += "<li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "current";
;
}
output += "\"><a href=\"/photos/latest\"><i class=\"fa fa-picture-o\"></i></a></li>";
;
}
output += "\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "current";
;
}
output += "\"><a href=\"/members/latest\"><i class=\"fa fa-users\"></i></a></li>\n        ";
if((lineno = 60, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "current";
;
}
output += "\"><a href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname"), env.opts.autoescape);
output += "/latest\"><i class=\"fa fa-briefcase\"></i></a></li>\n            <li class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "upload") {
output += "current";
;
}
output += "\"><a href=\"/photos/upload\"><i class=\"fa fa-upload\"></i></a></li>\n        ";
;
}
output += "\n        </ul>\n    </div>\n";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["main_entry.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<ul id=\"main-image\" class=\"item-list\">\n    <li>\n    <img data-id=\"";
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
output += "\" class=\"main-responsive-img\">\n    <span onclick=\"\" class=\"text-content\">\n        <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n        <b>";
output += runtime.suppressValue((lineno = 10, colno = 45, runtime.callWrap(runtime.memberLookup(((lineno = 10, colno = 20, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</b><br>\n        ";
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
output += "\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"body"), env.opts.autoescape);
output += "\n    </span>\n    <a class=\"detail-link\" data-id=\"";
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
output += "\" class=\"item-list\" id=\"main-image\">\n    <div class=\"profile-content\">\n        <div class=\"profile-details\">\n                <h3>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "</h3>\n                <h5 id=\"followers\">Followers: ";
output += runtime.suppressValue((lineno = 4, colno = 67, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"followers")),"count"), "post[\"followers\"][\"count\"]", context, [])), env.opts.autoescape);
output += "</h5>\n                <h5>Following: ";
output += runtime.suppressValue((lineno = 5, colno = 51, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"followed")),"count"), "post[\"followed\"][\"count\"]", context, [])), env.opts.autoescape);
output += "</h5>\n            ";
if((lineno = 6, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                <span id=\"followers-icon\">";
env.getTemplate("followers.html", false, "person.html", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "</span>\n            ";
})});
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
output += runtime.suppressValue((lineno = 19, colno = 67, runtime.callWrap(runtime.memberLookup(((lineno = 19, colno = 44, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MMM do YYYY"])), env.opts.autoescape);
output += "</em></h5>\n            ";
;
}
output += "\n            ";
if((lineno = 21, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n                    <a class=\"button button-primary\" id=\"update-info\" href=\"/members/update/\" >Update Info</a>\n                    <a class=\"button button-primary\" id=\"change-image\" href=\"/members/upload/\" >Change Image</a>\n                ";
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
output += "\" class=\"main-responsive-img\">\n        <span onclick=\"\" class=\"text-content\">\n            <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n                    <b>";
output += runtime.suppressValue((lineno = 10, colno = 57, runtime.callWrap(runtime.memberLookup(((lineno = 10, colno = 32, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
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
output += " likeme\"><i class=\"fa fa-smile-o fa-lg icon-white\"></i></a>\n                ";
;
}
else {
output += "\n                    <a class=\"vote\" data-voted=\"false\" style=\"color:#000;\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "/vote\" class=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += " likeme\"><i class=\"fa fa-meh-o fa-lg icon-white\"></i></a>\n                ";
;
}
output += "\n                    Like/Unlike <br>\n            ";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["home_page.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<img class=\"home-pic\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "static_url"), env.opts.autoescape);
output += "img/home_logo.svg\" alt=\"logo\">\n<div class=\"home-text\">\n    <h3>What is it?</h3>\n    <p >A website and app for sharing your very best photographic creations.</p>\n    <p>This Great Pic stores and displays a photo in its original aspect-ratio and in a resolution optimized for every screen size.</p>\n    <p>It also retains and gives automatic access to the photo file's <em>exif</em> data. This meta-data contains critical information on when, how (in terms of aperture, speed, light-settings, etc) and with what type of camera and lens the photo was taken.</p>\n</div>\n<div class=\"sitesection\">\n    <p class=\"expand-one\"><a class=\"link-button\" href=\"#\">More...</a></p>\n    <div class=\"content-one home-text well\">\n        A file chosen for upload must be an original version with exif data intact. This helps to:\n        <ul>\n            <li>1) Ensure that users submit photos they have taken themselves and presumably own.</li>\n            <li>2) Determine the best size for viewing the photo on either a desktop computer or mobile device.</li>\n            <li>3) Allow users to share info about the camera, lens, aperture, timing, light-setting, etc, used in capturing a given photo.</li>\n        </ul>\n    </div>\n</div>\n<div class=\"home-text\">\n<h3>How do I join?</h3>\n    <p>Click the arrow at the top right to go to the signup and login page. New users can join either by one-click login\n    connected to their Facebook or Google accounts, or by providing their email and a password and user name.</p><p>This Great Pic will never share your photos, email, comment's content or other user information with companies or other groups.</p>\n</div>\n<div class=\"home-text\">\n<h3>How does it work?</h3>\n<p>Pretty much like most social-media apps and sites: click appropriately-labeled buttons or icons to view, share, edit,\n    delete, or comment on photos.</p><p>Buttons for filtering content and navigating the site are accessed through the\n    menu on the top left of each page.</p>\n</div>\n<div class=\"home-text\">\n    <h3>Who runs this thing?</h3>\n    <p>I am a web-developer and amateur photographer who built and maintains this project in my freetime. Please contact me at\n    admin@thisgreatpic.com with any suggestions for improvements or if you run into any issues.</p>\n</div>";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comments.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"comments");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("comment", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n    <ul>";
env.getTemplate("comment.html", false, "comments.html", null, function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame, function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "</ul>\n";
})});
}
}
frame = frame.pop();
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comment.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<li class=\"comment-outline\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"comment"), env.opts.autoescape);
output += "</li>\n<li class=\"comment-photo\">\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"photo")) {
output += "\n        <img data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"photo"), env.opts.autoescape);
output += "?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n        alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"photo"), env.opts.autoescape);
output += "\">\n    ";
;
}
else {
output += "\n        <img src=\"https://aperturus.imgix.net/img/profile.jpg?usm=20&border=3%2CAAA&facepad=2.5&faceindex=1&fit=facearea&fm=png&mask=ellipse&h=120&w=120\"\n        alt=\"user photo\">\n    ";
;
}
output += "\n</li>\n<li class=\"comment-info\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"author")),"nickname"), env.opts.autoescape);
output += "</li>\n<li class=\"comment-date\"><b>";
output += runtime.suppressValue((lineno = 11, colno = 64, runtime.callWrap(runtime.memberLookup(((lineno = 11, colno = 37, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "comment")),"created_at")]))),"format"), "the return value of (momentjs)[\"format\"]", context, ["MMMM Do YYYY, h:mm:ss a"])), env.opts.autoescape);
output += "</b></li>\n";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["upload_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"inputs\"></div>\n<div id=\"exif\" class=\"exif\">\n    <table></table>\n</div>\n<div class=\"well\" id=\"inputs-target\"></div>\n";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["photo_text_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<form id=\"photo-text-form\" action=\"/photos/\" method=\"post\" enctype=\"form-data\" name=\"post\">\n    <input type=\"hidden\" name=\"csrf_token\"    value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\">\n    <div class=\"form-group\">\n        <label for=\"body\"></label>\n        <textarea id=\"body-text\" name=\"body\" placeholder=\"What makes this photo great?\"></textarea>\n        <div id=\"editable\"></div>\n        <span id=\"error_header\" class=\"help-inline\" style=\"color:red\"></span>\n    </div>\n\n    <div class=\"form-group\">\n        <label>What category best matches this photo?</label>\n        <select id=\"category\" name=\"category\">\n            <option value=\"architecture\">Architecture</option>\n            <option value=\"event\">Event</option>\n            <option value=\"family\">Family</option>\n            <option value=\"fantasy\">Fantasy</option>\n            <option value=\"fashion\">Fashion</option>\n            <option value=\"landscape\">Landscape</option>\n            <option value=\"macro\">Macro</option>\n            <option value=\"portrait\">Portrait</option>\n            <option value=\"sport\">Sport</option>\n            <option value=\"street\">Street</option>\n            <option value=\"travel\">Travel</option>\n            <option value=\"wildlife\">Wildlife</option>\n        </select>\n        <span id=\"error_post\" class=\"help-inline\"></span><br>\n    </div>\n\n    <div class=\"hide\">\n        <input id=\"photo\" name=\"photo\" type=\"text\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "form")),"photo"), env.opts.autoescape);
output += "\">\n    </div>\n    <input class=\"button-primary\" id=\"photo-submit\" type=\"submit\" value=\"Post Photo\">\n</form>";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["story_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"tabmenu\" class=\"photo-detail\">\n    <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n    <label for=\"tab1\">Story</label>\n\n    <input id=\"tab2\" type=\"radio\" name=\"tabs\">\n    <label for=\"tab2\">Comments</label>\n\n    <input id=\"tab3\" type=\"radio\" name=\"tabs\">\n    <label for=\"tab3\">Data</label>\n\n    <section id=\"content1\">\n        ";
if((lineno = 11, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, [])) && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname")) {
output += "\n            <section class=\"editable\">";
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"body")), env.opts.autoescape);
output += "</section>\n            <h6 id=\"comment-form-prompt\" style=\"color:grey\">(Higlight text to edit)</h6>\n            <button class=\"btn btn-info hide\" id=\"updatestory\" type=\"submit\">Submit</button>\n        ";
;
}
else {
output += "\n            <section>";
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"body")), env.opts.autoescape);
output += "</section>\n        ";
;
}
output += "\n    </section>\n\n    <section id=\"content2\">\n        ";
if((lineno = 21, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
output += "\n            ";
env.getTemplate("comment_form.html", false, "story_detail.html", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n        ";
})});
}
output += "\n        ";
env.getTemplate("comments.html", false, "story_detail.html", null, function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame, function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\n    </section>\n\n    <section id=\"content3\">\n        <table>\n            <tbody>\n                ";
frame = frame.push();
var t_11 = (lineno = 30, colno = 55, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "exifFields")),"iteritems"), "exifFields[\"iteritems\"]", context, []));
if(t_11) {var t_9;
if(runtime.isArray(t_11)) {
var t_10 = t_11.length;
for(t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9][0]
frame.set("key", t_11[t_9][0]);
var t_13 = t_11[t_9][1]
frame.set("value", t_11[t_9][1]);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n                    ";
if(!runtime.inOperator(t_12,["post_id","id"])) {
output += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") % 2 == 0) {
output += "\n                        <tr class=\"even\">\n                    ";
;
}
else {
output += "\n                        <tr class=\"odd\">\n                    ";
;
}
output += "\n                        <td>";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += "</td>\n                        <td>";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += "</td>\n                    </tr>\n                    ";
;
}
output += "\n                ";
;
}
} else {
t_9 = -1;
var t_10 = runtime.keys(t_11).length;
for(var t_14 in t_11) {
t_9++;
var t_15 = t_11[t_14];
frame.set("key", t_14);
frame.set("value", t_15);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n                    ";
if(!runtime.inOperator(t_14,["post_id","id"])) {
output += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") % 2 == 0) {
output += "\n                        <tr class=\"even\">\n                    ";
;
}
else {
output += "\n                        <tr class=\"odd\">\n                    ";
;
}
output += "\n                        <td>";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += "</td>\n                        <td>";
output += runtime.suppressValue(t_15, env.opts.autoescape);
output += "</td>\n                    </tr>\n                    ";
;
}
output += "\n                ";
;
}
}
}
frame = frame.pop();
output += "\n            </tbody>\n        </table>\n    </section>\n</div>";
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["votes.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["followers.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if((lineno = 0, colno = 23, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "g")),"user")),"is_following"), "g[\"user\"][\"is_following\"]", context, [runtime.contextOrFrameLookup(context, frame, "post")]))) {
output += "\n    <a class=\"link-button unfollow\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "/unfollow/\"><strong>Unfollow</strong></a>\n";
;
}
else {
output += "\n    <a class=\"link-button follow\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"nickname"), env.opts.autoescape);
output += "/follow/\"><strong>Follow</strong></a>\n";
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

