const puppeteer = require("puppeteer");
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// Function to extract reviews using Puppeteer
async function extractReviews(productUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(productUrl, { waitUntil: "networkidle2" });

  const reviews = await page.evaluate(() => {
    const reviewElements = document.querySelectorAll("[data-testid='review']"); // Adjust selector dynamically
    const extractedReviews = [];

    reviewElements.forEach((review) => {
      const title = review.querySelector("[data-testid='review-title']")?.innerText || "No title";
      const body = review.querySelector("[data-testid='review-body']")?.innerText || "No body";
      const rating = review.querySelector("[data-testid='review-rating']")?.innerText || "No rating";
      const reviewer = review.querySelector("[data-testid='reviewer-name']")?.innerText || "Anonymous";

      extractedReviews.push({ title, body, rating, reviewer });
    });

    return extractedReviews;
  });

  await browser.close();
  return reviews;
}

// Function to enhance reviews using LLM
async function enhanceReviewsWithLLM(reviews) {
  const reviewsText = reviews.map((r) => `${r.title}: ${r.body}`).join("\n");
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize the following reviews:\n${reviewsText}`,
    max_tokens: 150,
  });

  return response.data.choices[0].text.trim();
}

module.exports = { extractReviews, enhanceReviewsWithLLM };
