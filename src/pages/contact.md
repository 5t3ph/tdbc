---
title: "Contact Steph"
description: "Contact for speaking, writing, teaching, and consulting."
---

> **Available for** speaking, writing, teaching, and consulting.

<form name="contact" action="/contact/" class="form" method="POST" netlify-honeypot="bot-field" data-netlify="true">
	<p hidden>
		<label>Don’t fill this out if you're human: <input name="bot-field" /></label>
	</p>
	<label class="form__field"><span class="form__label">First Name</span>
		<input id="name" name="name" type="text" class="form__input" required />
	</label>
	<label class="form__field"><span class="form__label">Email</span>
		<input
			id="email"
			name="email"
			type="text"
			class="form__input"
			required
		/>
	</label>
	<label class="form__field"><span class="form__label">Message</span>
		<textarea id="message" name="message" class="form__input form__input--textarea" required></textarea>
	</label>
	<button class="button" type="submit">Send</button>
</form>
