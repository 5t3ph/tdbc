const form = document.querySelector("form");
const formOpenTrigger = document.getElementById("open-form");
const formCloseTrigger = document.getElementById("close-form");

formOpenTrigger.addEventListener("click", function(e) {
  form.classList.add("visible");
  document.getElementById("name").focus();
});

formCloseTrigger.addEventListener("click", function(e) {
  form.classList.remove("visible");
  formOpenTrigger.focus();
});

form.addEventListener("submit", function(e) {
  handleSubmit(e);
  e.preventDefault();
});

function handleSubmit(e) {
  const values = {
    name: document.getElementById("name").attr("value"),
    email: document.getElementById("email").attr("value"),
    message: document.getElementById("message").attr("value")
  };

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": "contact", values })
  })
    .then(() => alert("Success!"))
    .catch(error => alert(error));
}
