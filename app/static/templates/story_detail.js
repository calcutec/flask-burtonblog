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
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.contextOrFrameLookup(context, frame, "form")), env.opts.autoescape);
output += "\n        ";
env.getTemplate("comments.html", false, "story_detail.html", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n    </section>\n\n    <section id=\"content3\">\n        <h3>Exif Data</h3>\n    </section>\n</div>";
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

