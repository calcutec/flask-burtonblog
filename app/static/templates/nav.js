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

