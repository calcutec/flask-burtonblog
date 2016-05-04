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

