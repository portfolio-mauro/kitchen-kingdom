document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('mc-waitlist');
    if (!container) return;

    fetch('mailchimp-form.html')
        .then(function (r) { return r.text(); })
        .then(function (html) {
            container.innerHTML = html;
            attachFormHandler();
        });
});

function attachFormHandler() {
    var form = document.getElementById('eo-subscribe-form');
    var iframe = document.querySelector('iframe[name="eo-hidden-iframe"]');
    var successEl = document.getElementById('eo-success-response');
    var submitBtn = document.getElementById('eo-embedded-subscribe');
    if (!form || !iframe) return;

    form.addEventListener('submit', function () {
        submitBtn.disabled = true;
        submitBtn.value = 'Joining…';

        iframe.addEventListener('load', function onLoad() {
            iframe.removeEventListener('load', onLoad);
            form.style.display = 'none';
            successEl.textContent = "You're on the list! We'll let you know when Kitchen Kingdom launches.";
            successEl.style.display = 'block';
        });
    });
}
