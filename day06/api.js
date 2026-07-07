async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export default fetchPosts;
