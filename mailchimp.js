document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('mc-waitlist');
    if (!container) return;

    fetch('mailchimp-form.html')
        .then(function (r) { return r.text(); })
        .then(function (html) {
            container.innerHTML = html;

            var script = document.createElement('script');
            script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
            script.onload = function () {
                (function ($) {
                    window.fnames = new Array();
                    window.ftypes = new Array();
                    fnames[0] = 'EMAIL'; ftypes[0] = 'email';
                    fnames[1] = 'FNAME'; ftypes[1] = 'text';
                }(jQuery));
                window.$mcj = jQuery.noConflict(true);
            };
            document.body.appendChild(script);
        });
});
