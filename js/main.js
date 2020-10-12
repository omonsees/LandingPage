const fields = {};

document.addEventListener("DOMContentLoaded", event => {

    // "scroll-to-top" button
    const button = document.querySelector(".scroll-to-top");

    button.addEventListener("click", event => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    // email-form 
    form = document.querySelector(".contact-form");
    fields.name = document.querySelector("#name");
    fields.email = document.querySelector("#email");
    fields.subject = document.querySelector("#subject");
    fields.message = document.querySelector("#message");

    for (let field of Object.values(fields)) {
        field.addEventListener("focusout", event => {
            if (field.id === "email") {
                isValidEmail(field);
            } else {
                isNotEmpty(field);
            }
        })
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        //make sure fields are checked
        checkFields();

        // AJAX call
        // .then(success message)

    })
})


function checkFields() {
    for (let field of Object.values(fields)) {
        if (field.id === "email") {
            isValidEmail(field);
        } else {
            isNotEmpty(field);
        }
    }
}


/**
 * 
 * @param {HTMLInputElement} field 
 */
function isNotEmpty(field) {
    const value = field.value.trim();
    if (!value) {
        setInvalid(field);
        return false;
    }
    setValid(field);
    return true;
}

/**
 * 
 * @param {HTMLInputElement} field 
 */
function isValidEmail(field) {
    const email = field.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setValid(field);
        return true;
    }
    setInvalid(field);
    return false;
}

/**
 * 
 * @param {HTMLInputElement} field 
 */
function setInvalid(field) {
    field.classList.add("red-box-shadow");
    field.classList.remove("green-box-shadow");
}

/**
 * 
 * @param {HTMLInputElement} field 
 */
function setValid(field) {
    field.classList.add("green-box-shadow");
    field.classList.remove("red-box-shadow");
}