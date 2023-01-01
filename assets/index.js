confess = document.getElementById("confess");
listen = document.getElementById("listen");
description = document.getElementById("description");
title = document.getElementById("title");
console.log(confess);
confess.addEventListener("click", toConfess);
listen.addEventListener("click", toListen);

function toConfess() {
    listen.style.display = "none"
    description.style.display = "none"
    title.style.top -= 30;
}

function toListen() {

}