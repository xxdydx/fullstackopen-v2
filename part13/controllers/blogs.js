const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor, authUser } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name", "username"],
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.post("/", authUser, tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.json(blog);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

router.put("/:id", authUser, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.likes = req.body.likes;
    try {
      await blog.save();
    } catch (error) {
      return res.status(400).json({ error });
    }
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", authUser, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.findByPk(req.params.id);

  if (blog && user.id.toString() != blog.userId.toString()) {
    return response.status(401).json({ error: `Unauthorized` });
  }
  if (blog) {
    try {
      await blog.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
  res.status(404).end;
});

module.exports = router;
