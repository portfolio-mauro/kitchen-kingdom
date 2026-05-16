document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('mc-waitlist');
    if (!container) return;

    fetch('mailchimp-form.html')
        .then(function (r) { return r.text(); })
        .then(function (html) {
            container.innerHTML = html;

            var script = document.createElement('script');
            script.src = 'https://eocampaign1.com/form/35eee478-516c-11f1-b558-67defba4d3c4.js';
            script.setAttribute('data-form', '35eee478-516c-11f1-b558-67defba4d3c4');
            script.async = true;
            document.body.appendChild(script);
        });
});
