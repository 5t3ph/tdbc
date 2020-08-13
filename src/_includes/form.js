function serialize(e) {
  if (e && "FORM" === e.nodeName) {
    var t,
      n,
      o = [];
    for (t = e.elements.length - 1; t >= 0; t -= 1)
      if ("" !== e.elements[t].name)
        switch (e.elements[t].nodeName) {
          case "INPUT":
            switch (e.elements[t].type) {
              case "text":
              case "hidden":
              case "button":
              case "reset":
              case "submit":
                o.push(e.elements[t].name + "=" + encodeURIComponent(e.elements[t].value));
                break;
            }
            break;
          case "TEXTAREA":
            o.push(e.elements[t].name + "=" + encodeURIComponent(e.elements[t].value));
            break;
          case "BUTTON":
            switch (e.elements[t].type) {
              case "reset":
              case "submit":
              case "button":
                o.push(e.elements[t].name + "=" + encodeURIComponent(e.elements[t].value));
            }
        }
    return o.join("&");
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  fetch("/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: serialize(form),
  })
    .then(function () {
      form.innerHTML =
        '<p class="tdbc-form-notice">Thanks! I\'ll respond as soon as I am able. Feel free to reach out on <a href="https://twitter.com/5t3ph">Twitter</a>.</p>';
    })
    .catch(() =>
      alert("Internet trolls attacked and something errored out! Can you please try again?")
    ),
    e.preventDefault();
});
