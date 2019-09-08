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

function handleSubmit(e) {
  const values = {
    "form-name": "contact",
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(values)
  })
    .then(() => alert("Success!"))
    .catch(error => alert(error));
}

form.addEventListener("submit", function(e) {
  handleSubmit(e);
  e.preventDefault();
});
