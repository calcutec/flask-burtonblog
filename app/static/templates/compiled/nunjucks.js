(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["archive_entry.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<a class=\"gallery-image\" href=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&q=85&auto=format&sharp=10 640w\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" title=\"#";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n    <img src=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format&sharp=10\"\n    srcset=\"https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=175&h=175&fit=crop&q=85&auto=format&sharp=10 175w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=190&h=190&fit=crop&q=85&auto=format&sharp=10 190w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=220&h=220&fit=crop&q=85&auto=format&sharp=10 220w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=320&h=320&fit=crop&q=85&auto=format&sharp=10 320w,\n    https://aperturus.imgix.net/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "?w=640&h=640&fit=crop&q=85&auto=format&sharp=10 640w\"\n    sizes=\"(min-width: 40em) 30.5vw, (min-width: 60em) 22.75vw, 46vw\"\n    class=\"responsive-img\"\n    alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"photo"), env.opts.autoescape);
output += "\">\n</a>\n<span class=\"text-content\">\n    <span class=\"inner-span\">\n        <span class=\"details-well\">\n            <a class=\"link-button member-link\" href=\"/members/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "/\" rel=\"tag\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"author")),"nickname"), env.opts.autoescape);
output += "</a><br>\n\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")) {
output += "\n                <p><em>Last seen:";
output += runtime.suppressValue((lineno = 17, colno = 67, runtime.callWrap(runtime.memberLookup(((lineno = 17, colno = 42, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"last_seen")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</em></p>\n            ";
;
}
else {
output += "\n                <b>";
output += runtime.suppressValue((lineno = 19, colno = 53, runtime.callWrap(runtime.memberLookup(((lineno = 19, colno = 28, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "momentjs"), "momentjs", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"timestamp")]))),"calendar"), "the return value of (momentjs)[\"calendar\"]", context, [])), env.opts.autoescape);
output += "</b><br>\n            ";
;
}
output += "\n\n            ";
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
output += "\n            <a href=\"#\" class=\"link-button gallery\">Gallery</a>\n        </span>\n    </span>\n</span>\n<a class=\"detail-link\" href=\"/photos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\">\n<span data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"id"), env.opts.autoescape);
output += "\" class=\"rounded-icon\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"22\" height=\"22\" viewBox=\"0 0 22 22\">\n        <path d=\"M3.4 20.2L9 14.5 7.5 13l-5.7 5.6L1 14H0v7.5l.5.5H8v-1l-4.6-.8M18.7 1.9L13 7.6 14.4 9l5.7-5.7.5 4.7h1.2V.6l-.5-.5H14v1.2l4.7.6\">\n        </path>\n    </svg>\n</span>\n</a>\n";
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
output += "<div id=\"header\">\n    ";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"nickname"), env.opts.autoescape);
output += "'s Photos\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "login") {
output += "\n            Login/Signup\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "home") {
output += "\n            This Great Pic\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") == "upload") {
output += "\n            Upload Photo\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photo") {
output += "\n            Photo #";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"photo_id"), env.opts.autoescape);
output += "\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "\n            Photos\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "member") {
output += "\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"person")),"nickname"), env.opts.autoescape);
output += "'s Photos\n        ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "\n            Members\n        ";
;
}
else {
output += "\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"), env.opts.autoescape);
output += " - ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category"), env.opts.autoescape);
output += "\n        ";
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
output += "\n    ";
;
}
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


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["nav.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"navbar\">\n";
if(runtime.contextOrFrameLookup(context, frame, "assets")) {
output += "\n    <input class=\"burger-check\" id=\"burger-check\" type=\"checkbox\"><label for=\"burger-check\" class=\"burger\"></label>\n                ";
if(runtime.inOperator(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity"),["author","photos","member","members"]) && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"category") != "upload") {
output += "\n\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "author") {
output += "\n                        <div id=\"title\"><i class=\"current fa fa-briefcase\"></i></div>\n                    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "photos") {
output += "\n                        <div id=\"title\"><i class=\"current fa fa-picture-o\"></i></div>\n                    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "member") {
output += "\n                        <div id=\"title\"><i class=\"current fa fa-user\"></i></div>\n                    ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "assets")),"entity") == "members") {
output += "\n                        <div id=\"title\"><i class=\"current fa fa-users\"></i></div>\n                    ";
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
output += "\n                <div id=\"title\"><i class=\"current fa fa-picture-o\"></i><span id=\"subtitle\">#";
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
if((lineno = 48, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
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
if(!(lineno = 56, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
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
if((lineno = 61, colno = 41, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "current_user")),"is_authenticated"), "current_user[\"is_authenticated\"]", context, []))) {
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
output += "\n        </ul>\n    </div>\n";
;
}
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

