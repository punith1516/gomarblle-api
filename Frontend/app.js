const BACKEND_URL = "http://localhost:3000/api/reviews";

document.getElementById("fetch-reviews").addEventListener("click", async () => {
  const productUrl = document.getElementById("product-url").value;
  const reviewsDiv = document.getElementById("reviews");
  reviewsDiv.innerHTML = ""; // Clear previous reviews

  if (!productUrl) {
    alert("Please enter a product URL.");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}?page=${encodeURIComponent(productUrl)}`);
    const reviews = await response.json();

    if (reviews.error) {
      reviewsDiv.innerHTML = `<p style="color: red; text-align: center;">${reviews.error}</p>`;
      return;
    }

    if (reviews.length === 0) {
      reviewsDiv.innerHTML = `<p style="text-align: center;">No reviews found for the given URL.</p>`;
      return;
    }

    reviews.forEach((review) => {
      const reviewEl = document.createElement("div");
      reviewEl.className = "review-card";
      reviewEl.innerHTML = `
        <h3>${review.title}</h3>
        <p><strong>Rating:</strong> ${review.rating}</p>
        <p><strong>Reviewer:</strong> ${review.reviewer || "Anonymous"}</p>
        <p>${review.body || "No additional details provided."}</p>
      `;
      reviewsDiv.appendChild(reviewEl);
    });
  } catch (error) {
    reviewsDiv.innerHTML = `<p style="color: red; text-align: center;">Failed to fetch reviews. Please try again later.</p>`;
  }
});

