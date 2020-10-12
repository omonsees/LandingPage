document.addEventListener("DOMContentLoaded", (e) => {

    const button = document.querySelector(".scroll-to-top");

    window.addEventListener("scroll", event => {

        // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        //     button.style.display = "block";
        // } else {
        //     button.style.display = "none";

        // }
    })


    button.addEventListener("click", event => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })




})