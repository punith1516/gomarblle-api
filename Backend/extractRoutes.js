const express = require("express");
const router = express.Router();
const { extractReviews, enhanceReviewsWithLLM } = require("../extractor");

router.get("/reviews", async (req, res) => {
  const productUrl = req.query.page;

  if (!productUrl) {
    return res.status(400).json({ error: "Product URL is required." });
  }

  try {
    const reviews = await extractReviews(productUrl);
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found." });
    }

    const summary = await enhanceReviewsWithLLM(reviews);
    res.json({ reviews_count: reviews.length, reviews, summary });
  } catch (error) {
    console.error("Error extracting reviews:", error);
    res.status(500).json({ error: "Failed to extract reviews." });
  }
});

module.exports = router;
