const confess = document.getElementById("confess");
const listen = document.getElementById("listen");
const description = document.getElementById("description");
const title = document.getElementById("title");
const write = document.getElementById("write");
const enter = document.getElementById("enter");


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