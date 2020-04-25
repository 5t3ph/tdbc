const postList = document.querySelector(".tdbc-posts");

function createPostList(posts) {
  const items = posts.map((post) => {
    const { title, url, tags } = post;
    return `<li class="tdbc-card">
					<div class="tdbc-card__content tdbc-align-left">
						<a href="${url}" class="tdbc-h4">${title}</a>
						<span class="tdbc-ink-gray-text"><em>${tags}</em></span>
          </div>
        </div>
      </li>`;
  });
  const list = `<ul class="tdbc-card-wrapper" role="list">${items.join("")}</ul>`;
  postList.innerHTML = list + postList.innerHTML;
  postList.classList.add("loaded");
}

const postsApi = "/.netlify/functions/devto";
// const postsApi = "/js/postdata.json";

fetch(postsApi, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    createPostList(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
