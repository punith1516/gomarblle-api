# GoMarble: AI Engineer Assignment

## Objective

Develop an API server capable of extracting reviews information from any given product page (e.g., Shopify, Amazon). The API should dynamically identify CSS elements of reviews and handle pagination to retrieve all reviews.

## Table of Contents
1. [Project Overview](#project-overview)
2. [API Development](#api-development)
3. [Functional Requirements](#functional-requirements)
4. [Technical Requirements](#technical-requirements)
5. [Usage Instructions](#usage-instructions)
6. [Deployment Instructions](#deployment-instructions)
7. [Frontend UI](#frontend-ui)
8. [Contribution](#contribution)
9. [License](#license)

---

## Project Overview

GoMarble is an API that can extract product review data from product pages dynamically by identifying the correct CSS selectors. The API handles pagination and ensures all reviews are fetched. The extraction of dynamic CSS selectors is facilitated by the integration of OpenAI's Large Language Models (LLMs), which allows the API to adapt to any product page's structure.

---

## API Development

### Endpoint Specification

- **Endpoint**: `/api/reviews?page={url}`
- **Method**: `GET`
- **Response Format**:
  
```json
{
  "reviews_count": 100,
  "reviews": [
    {
      "title": "Review Title",
      "body": "Review body text",
      "rating": 5,
      "reviewer": "Reviewer Name"
    },
    ...
  ]
}

git clone https://github.com/punith1516/gomarblle-api.git
cd gomarblle-api

npm install

OPENAI_API_KEY=your_openai_api_key_here

npm start

GET http://localhost:3000/api/reviews?page={product_page_url}

{
  "reviews_count": 50,
  "reviews": [
    {
      "title": "Amazing Product!",
      "body": "This product exceeded my expectations. Highly recommend.",
      "rating": 5,
      "reviewer": "John Doe"
    },
    {
      "title": "Not bad, but could be better.",
      "body": "The product is good, but there are some issues with packaging.",
      "rating": 3,
      "reviewer": "Jane Smith"
    }
  ]
}

frontend/
├── public/
│   ├── index.html
│   └── styles.css
└── app.js


---

### Explanation of Sections:

- **Objective**: Describes the goal of the project.
- **API Development**: Details the endpoint structure and expected response format.
- **Functional Requirements**: Lists the key features, such as dynamic CSS identification and pagination handling.
- **Technical Requirements**: Specifies the technologies used, including Playwright and LLM integration.
- **Usage Instructions**: Provides step-by-step guidance for cloning, setting up, and running the application locally.
- **Deployment Instructions**: Shows how to deploy the API to a platform like Heroku.
- **Frontend UI**: Brief description of the frontend folder and how it integrates with the API.
- **Contribution**: Encourages others to contribute to the project.
- **License**: States that the project is licensed under the MIT License.

You can place this `README.md` file in the root of your project directory.
