const Article = require("../models/Article");

exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const article = new Article({
      title,
      content,
      author: req.user.id
    });

    await article.save();

    res.json(article);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(article);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};