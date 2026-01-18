// TMDB API KEY
const API_KEY = "61790ec4b30862edcf008c304cfce00a";

// Get details container
const detailsDiv = document.getElementById("details");

// Read URL parameters
const params = new URLSearchParams(window.location.search);
const type = params.get("type"); // movie or tv
const id = params.get("id");     // TMDB ID

// Fetch details from TMDB
fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-IN`)
  .then(response => response.json())
  .then(data => {

    // Find custom link for this movie/webseries
    const custom = customData.find(
      item => item.id == id && item.type === type
    );

    // Prepare 1080p link button
    let linkHTML = "";
    if (custom && custom.link1080p) {
      linkHTML = `
        <a class="link-btn" href="${custom.link1080p}" target="_blank">
          Watch / Download 1080p
        </a>
      `;
    } else {
      linkHTML = `<p>1080p link not available</p>`;
    }

    // Show details on page
    detailsDiv.innerHTML = `
      <div class="details-card">
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Poster">

        <h2>${type === "movie" ? data.title : data.name}</h2>

        <p><b>Rating:</b> ⭐ ${data.vote_average}</p>

        <p>${data.overview}</p>

        <h3>1080p Link</h3>
        ${linkHTML}
      </div>
    `;
  })
  .catch(error => {
    detailsDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
    console.error(error);
  });