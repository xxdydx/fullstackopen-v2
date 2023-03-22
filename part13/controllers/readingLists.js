const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");
const sequelize = require("sequelize");

const { tokenExtractor } = require("../utils/middleware");

router.post("/", async (req, res) => {
  try {
    const ListItem = await ReadingList.create(req.body);
    return res.json(ListItem);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const item = await ReadingList.findByPk(req.params.id);
  if (!item) {
    return res.status(404).json({ error: "not found" });
  }
  if (!user) {
    return res.status(400).json({ error: "not logged in" });
  }
  if (user.id !== item.userId) {
    return res.status(401).json({ error: `Unauthorized` });
  }

  item.readState = req.body.readState;

  try {
    await item.save();
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
