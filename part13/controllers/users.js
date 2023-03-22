const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  let where = {};

  if (req.query.read) {
    where.read_state = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },

      through: {
        attributes: ["id", "read_state"],
        where,
      },
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } });

  if (user) {
    user.username = req.body.username;

    try {
      await user.save();
      res.json(user);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;
