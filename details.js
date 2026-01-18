const API_KEY = "61790ec4b30862edcf008c304cfce00a";
const detailsDiv = document.getElementById("details");

const movieLinks = {
  575588: "https://example.com/conjuring-1080p",
  123456: "https://example.com/another-movie-1080p"
};

const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const id = params.get("id");

if (!id) {
  detailsDiv.innerHTML = "<p>No movie ID found</p>";
  throw new Error("No ID found");
}

fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-IN`)
  .then(res => res.json())
  .then(data => {

    let linkHTML = "";

    if (movieLinks[id]) {
      linkHTML = `
        <a class="link-btn" href="${movieLinks[id]}" target="_blank">
          Download 1080p
        </a>
      `;
    } else {
      linkHTML = "<p>1080p link not available</p>";
    }

    detailsDiv.innerHTML = `
      <div class="details-card">
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Poster">

        <h2>${type === "movie" ? data.title : data.name}</h2>
        <p>${data.overview}</p>

        <h3>Download Link</h3>
        ${linkHTML}
      </div>
    `;
  })
  .catch(err => {
    detailsDiv.innerHTML = "<p>Something went wrong, please try again.</p>";
    console.error(err);
  });