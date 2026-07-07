import fetchPosts from "./api.js";

const grid = document.querySelector("#blogs");

function renderPosts(posts) {
    grid.innerHTML = "";

    if (posts.length === 0) {
        grid.textContent = "No posts found.";
        return;
    }

    posts.forEach((post) => {
        const article = document.createElement("article");
        article.classList.add("post");

        const postId = document.createElement("h3");
        postId.textContent = post.id;
        article.appendChild(postId);

        const title = document.createElement("h2");
        title.textContent = post.title;
        article.appendChild(title);

        const body = document.createElement("p");
        body.textContent = post.body ?? "";
        article.appendChild(body);

        grid.appendChild(article);
    });
}

grid.textContent = "Loading posts…";

try {
    const posts = await fetchPosts();
    renderPosts(posts);
} catch (error) {
    console.error(error);
    grid.textContent = "Something went wrong while loading posts. Please try again later.";
}
