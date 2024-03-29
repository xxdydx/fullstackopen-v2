const router = require("express").Router();
const { User, Blog } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  });
  res.json(authors);
});

module.exports = router;
