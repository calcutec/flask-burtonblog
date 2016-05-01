(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["comments.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"all_comments");
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
output += "\n    <p>";
if(runtime.memberLookup((t_4),"created_at")) {
output += "<small>On ";
output += runtime.suppressValue((lineno = 1, colno = 68, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_4),"created_at")),"strftime"), "comment[\"created_at\"][\"strftime\"]", context, ["%H:%M %Y-%m-%d"])), env.opts.autoescape);
output += ", </small>";
;
}
output += "\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"author")),"nickname"), env.opts.autoescape);
output += " commented:</p>\n    <p>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"body"), env.opts.autoescape);
output += "</p>\n";
;
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

