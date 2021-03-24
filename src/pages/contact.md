---
title: "Contact Steph"
description: "Contact for speaking, writing, teaching, and consulting."
---

<p class="lead">Available for speaking, writing, teaching, and consulting.</p>

<form name="contact" action="/success" class="form" method="POST" netlify-honeypot="bot-field" data-netlify="true">
	<p hidden>
		<label>Don’t fill this out if you're human: <input name="bot-field" /></label>
	</p>
	<div class="form-group">
    <label for="first_name">First Name</label>
    <input type="text" id="first_name" name="first_name" class="form-field">
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="text" id="email" name="email" class="form-field">
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea type="text" id="message" name="message" class="form-field"></textarea>
  </div>
  <button class="button" type="submit">Submit</button>
</form>
