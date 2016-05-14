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

