"use strict"

const form = document.querySelector(".contact-form");
const submitMessage = document.querySelector("#submit-message");
const loader = document.querySelector("#loader");
const fields = {};
let timeOut;

document.addEventListener("DOMContentLoaded", event => {

    const button = document.querySelector(".scroll-to-top");

    button.addEventListener("click", event => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })


    fields.name = document.querySelector("#name");
    fields.email = document.querySelector("#email");
    fields.subject = document.querySelector("#subject");
    fields.text = document.querySelector("#text");

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
        if (fieldsAreValid()) {
            sendMail();
        } else {
            showTempSubmitMessage("Did you forget a field?")
        }
    })
})

function toggleLoader() {
    loader.classList.toggle("hidden");
}

function sendMail() {
    toggleLoader();

    const message = {
        sender: fields.name.value,
        email: fields.email.value,
        subject: fields.subject.value,
        text: fields.text.value
    }

    fetch("https://omonsees.de:8443/mailservice/send", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        toggleLoader();
        if (response.ok) {
            resetForm();
            showTempSubmitMessage("Thanks for your message!");
        } else {
            resetForm();
            showTempSubmitMessage("Oops, server problems :(")
        }
    }).catch(error => {
        toggleLoader();
        resetForm();
        showTempSubmitMessage("Oops, server problems :(")
    })
}


function toggleSubmitMessage() {
    submitMessage.classList.toggle("hidden");
}

function showTempSubmitMessage(text) {
    clearTimeout(timeOut);
    submitMessage.innerText = text;
    toggleSubmitMessage();
    timeOut = setTimeout(() => {
        toggleSubmitMessage();
    }, 4000);

}

function resetForm() {
    for (let field of Object.values(fields)) {
        field.value = "";
        field.classList.remove("green-box-shadow");
        field.classList.remove("red-box-shadow");
    }
}

function fieldsAreValid() {
    let valid = true;
    for (let field of Object.values(fields)) {
        if (field.id === "email") {
            valid &= isValidEmail(field);
        } else {
            valid &= isNotEmpty(field);
        }
    }
    return !!valid;
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