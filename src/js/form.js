const form = document.querySelector("form");
const formOpenTrigger = document.getElementById("open-form");
const formCloseTrigger = document.getElementById("close-form");

function closeForm() {
  form.classList.remove("visible");
  formOpenTrigger.focus();
}

formOpenTrigger.addEventListener("click", function(e) {
  form.classList.add("visible");
  document.getElementById("name").focus();
});

document.addEventListener("click", function(e) {
  if (e.target && e.target.id == "close-form") {
    closeForm();
  }
});

function handleSubmit(e) {
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: serialize(form)
  })
    .then(function() {
      form.innerHTML =
        '<p class="form-notice">Thanks! I\'ll respond as soon as I am able. Feel free to reach out on <a href="https://twitter.com/5t3ph">Twitter</a>.</p><button id="close-form" class="button button--cancel" type="button">Close Panel</button >';
    })
    .catch(error => alert("Oops! Can you please try again?"));
}

form.addEventListener("submit", function(e) {
  handleSubmit(e);
  e.preventDefault();
});
