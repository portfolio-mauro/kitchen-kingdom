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
    var successEl = document.getElementById('eo-success-response');
    var errorEl = document.getElementById('eo-error-response');
    var submitBtn = document.getElementById('eo-embedded-subscribe');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var data = new FormData(form);
        submitBtn.disabled = true;
        submitBtn.value = 'Joining…';
        successEl.style.display = 'none';
        errorEl.style.display = 'none';

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(function (res) {
            if (res.ok || res.status === 200) {
                form.style.display = 'none';
                successEl.textContent = "You're on the list! We'll let you know when Kitchen Kingdom launches.";
                successEl.style.display = 'block';
            } else {
                return res.json().then(function (body) {
                    throw new Error((body && body.message) || 'Something went wrong. Please try again.');
                });
            }
        })
        .catch(function (err) {
            submitBtn.disabled = false;
            submitBtn.value = 'Join Waitlist';
            errorEl.textContent = err.message || 'Something went wrong. Please try again.';
            errorEl.style.display = 'block';
        });
    });
}
