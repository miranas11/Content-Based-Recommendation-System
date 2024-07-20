# Recommendation System

A generic content-based filtering recommendation system that can be used for various types of content, including movies, news articles, gadgets, and shopping items.

## Installation

To install the package, run:

```bash
npm install recommendation-system121
```

## Usage

Here's how you can use this recommendation system in an Express application.

### Basic Setup

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const {
    createUser,
    addTag,
    addItemToTag,
    getRecommendedTags,
} = require("my-recommendation-system");

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

app.post("/create-user", (req, res) => {
    const { userId } = req.body;
    createUser(req, res, userId);
});

app.post("/add-tag", (req, res) => {
    const { userId, tagName } = req.body;
    addTag(req, res, userId, tagName);
});

app.post("/add-items", (req, res) => {
    const { userId, tagName, newItems } = req.body;
    addItemToTag(req, res, userId, tagName, newItems);
});

app.get("/recommendations", (req, res) => {
    const { userId, tagName } = req.query;
    const recommendations = getRecommendedTags(req, res, userId, tagName);
    res.json(recommendations);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

## API

### `createUser(req, res, userId)`

Creates a user cookie if it doesn't exist.

**Parameters:**

-   `req`: The HTTP request object.
-   `res`: The HTTP response object.
-   `userId`: The unique user identifier.

### `addTag(req, res, userId, tagName)`

Adds a tag with 3 epochs to the user's cookie.

**Parameters:**

-   `req`: The HTTP request object.
-   `res`: The HTTP response object.
-   `userId`: The unique user identifier.
-   `tagName`: The tag name to be added.

### `addItemToTag(req, res, userId, tagName, newItems)`

Adds items to the first epoch of the specified tag. If a new week has started, it shifts the epochs.

**Parameters:**

-   `req`: The HTTP request object.
-   `res`: The HTTP response object.
-   `userId`: The unique user identifier.
-   `tagName`: The tag name to which the items will be added.
-   `newItems`: The new items to be added. Can be a single item or an array of items.

### `getRecommendedTags(req, res, userId, tagName)`

Retrieves recommended items based on the epochs, selecting 3 items from the first epoch, 2 from the second, and 1 from the third.

**Parameters:**

-   `req`: The HTTP request object.
-   `res`: The HTTP response object.
-   `userId`: The unique user identifier.
-   `tagName`: The tag name whose recommendations are to be retrieved.
