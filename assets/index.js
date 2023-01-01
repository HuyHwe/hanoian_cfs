confess = document.getElementById("confess");
listen = document.getElementById("listen");
description = document.getElementById("description");
title = document.getElementById("title");
write = document.getElementById("write");
enter = document.getElementById("enter");


confess.addEventListener("click", toConfess);
listen.addEventListener("click", toListen);

function toConfess() {
    write.style.display = "block";
    confess.style.display = "none";
    description.style.display = "none";
    enter.style.display = "block"
    title.style.top -= 30;
}

function toListen() {

}