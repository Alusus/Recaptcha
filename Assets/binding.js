let recaptchaOnloadResolve;
const recaptchaOnloadPromise = new Promise((resolve) => {
    recaptchaOnloadResolve = resolve
});

function recaptchaOnloadCallback() {
    recaptchaOnloadResolve();
}

function awaitRecaptchaOnloadCallback() {
    return recaptchaOnloadPromise;
}

function renderRecaptcha(arg) {
    const { id, sitekey } = JSON.parse(arg);
    return grecaptcha.render(id, { sitekey });
}

function getRecaptchaResponse(id) {
    return grecaptcha.getResponse(id);
}

function resetRecaptcha(id) {
    return grecaptcha.reset(id);
}

