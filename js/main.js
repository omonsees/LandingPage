"use strict"

const form = document.querySelector(".contact-form");
const submitMessage = document.querySelector("#submit-message");
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
        if (fieldsAreValid()) {
            sendMail().then(() => {
                clearFields();
                showTempSubmitMessage("Thanks for your message!");
            }).catch(() => {
                clearFields();
                showTempSubmitMessage("Oops, server problems :(")
            })
        } else {
            showTempSubmitMessage("Did you miss a field?")
        }
    })
})



async function sendMail() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
    const object = await response.json();
}

function showTempSubmitMessage(text) {
    clearTimeout(timeOut);
    submitMessage.innerText = text;
    submitMessage.style.visibility = "visible";
    timeOut = setTimeout(() => {
        submitMessage.style.visibility = "hidden";
    }, 4000);

}

function clearFields() {
    for (let field of Object.values(fields)) {
        field.value = "";
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