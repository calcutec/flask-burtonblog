(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["story_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"tabmenu\" class=\"photo-detail\">\n    <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n    <label for=\"tab1\">Story</label>\n\n    <input id=\"tab2\" type=\"radio\" name=\"tabs\">\n    <label for=\"tab2\">Comments</label>\n\n    <input id=\"tab3\" type=\"radio\" name=\"tabs\">\n    <label for=\"tab3\">Data</label>\n\n    <section id=\"content1\">\n        <h3>What makes this great...</h3>\n        <section>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"body"), env.opts.autoescape);
output += "</section>\n    </section>\n\n    <section id=\"content2\">\n        ";
env.getTemplate("comment_form.html", false, "story_detail.html", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n        ";
env.getTemplate("comments.html", false, "story_detail.html", null, function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame, function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\n    </section>\n\n    <section id=\"content3\">\n        <table>\n            <tbody>\n                ";
frame = frame.push();
var t_11 = (lineno = 23, colno = 55, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "exifFields")),"iteritems"), "exifFields[\"iteritems\"]", context, []));
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
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

