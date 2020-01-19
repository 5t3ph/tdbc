const form = document.querySelector("form");

function handleSubmit(e) {
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: serialize(form),
  })
    .then(function() {
      form.innerHTML =
        '<p class="tdbc-form-notice">Thanks! I\'ll respond as soon as I am able. Feel free to reach out on <a href="https://twitter.com/5t3ph">Twitter</a>.</p>';
    })
    .catch((error) => alert("Oops! Can you please try again?"));
}

form.addEventListener("submit", function(e) {
  handleSubmit(e);
  e.preventDefault();
});