const scriptLink =
  "https://script.google.com/macros/s/AKfycbzoXXOLjL_b8GlC_HWBljEYYchVcFCN4kiAMBZmJRgAw28schDZJOacGWcbHgq5QMMz/exec";
const form = document.forms["contact-form"];

const popupMessage = document.querySelectorAll(".popupmessage")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userNameRegex = /[A-Z]+[\w ]*/;
  const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileNumberRegex = /^(\+91\d{10}|\+1\d{10}|\+\d{1,4}\d{7,10})$/;

  const email = document.getElementById("email").value;
  const number = document.getElementById("mobileNumber").value;
  const username = document.getElementById("username").value;
  if (!userNameRegex.test(username)) {
    popUp("👾 Give Appropriate UserName ", "red");
    return;
  }
  if (!emailIdRegex.test(email)) {
    popUp("👾 Give Appropriate Email ID ", "red");
    return;
  }
  if (!mobileNumberRegex.test(number)) {
    popUp("📱 Give Appropriate Mobile Number (India,USA,Africa) ", "red");
    return;
  }

  fetch(scriptLink, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        console.log("Success:", data);
        popUp("🎉 " + data.message + " 👏");
      } else {
        console.error("Error:", data);
        popUp("👾 Sorry, an error occurred: " + data.message, "red");
      }
    })
    .catch((error) => {
      popUp("👾 Sorry, an error occurred. Try Again Later", "red");
      console.log(error);
    });
});

function reload() {
  location.reload();
}
function popUp(message, color = "black") {
  const h3 = document.createElement("h3");
  popupMessage.innerText = message;
  popupMessage.style.display = "block";
  popupMessage.style.color = color;
  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
}

let popup = document.querySelector("#popup");
let popupemail = document.querySelector("#popupemailbutton");
let submit = document.querySelector("#submit");
let div = document.querySelector("#shadow");
let notNow = document.querySelector("#not-now-button");

notNow.addEventListener("click", function (e) {
  div.classList.toggle("light");
});
submit.addEventListener("click", function (e) {
  div.classList.toggle("light");
});

popupemail.addEventListener("click", function (e) {
  div.classList.toggle("light");
});

popup.addEventListener("click", function (e) {
  div.classList.toggle("light");
});
