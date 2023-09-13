
const apiUrl = "https://fakestoreapi.com/products";
let page = 2;
let isLoading = false; 
const resultsContainer = document.getElementById("results");
const loadingIndicator = document.getElementById("loading");
function fetchPosts() {
  if (isLoading) return; 
  isLoading = true;

  fetch(`${apiUrl}?_page=${page}&_limit=5`)
    .then((response) => response.json())
    .then((data) => {
      renderPosts(data);
      page++;
      loadingIndicator.style.display = "none"; 
      isLoading = false; 
    });
}
function renderPosts(posts) {
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h2>${post.id}</h2>
      <p>${post.title}</p>
      <b>${post.price}</b>
      <img src=${post.image}></img>
    `;
    resultsContainer.appendChild(postElement);
  });
}

fetchPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    loadingIndicator.style.display = "block"; 
    fetchPosts(); 
  }
});
