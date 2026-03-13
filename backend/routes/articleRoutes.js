const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const articleController = require("../controllers/articleController");

router.get("/", authMiddleware, articleController.getArticles);

router.post("/", authMiddleware, articleController.createArticle);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  articleController.updateArticle
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  articleController.deleteArticle
);

module.exports = router;