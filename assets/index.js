confess = document.getElementById("confess");
listen = document.getElementById("listen");
description = document.getElementById("description");
title = document.getElementById("title");
write = document.getElementById("write")


console.log(confess);
confess.addEventListener("click", toConfess);
listen.addEventListener("click", toListen);

function toConfess() {
    confess.style.display = "none";
    description.style.display = "none";
    write.style.display = "flexbox";
    title.style.top -= 30;
}

function toListen() {

}