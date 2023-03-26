const express = require("express");
const { Pool } = require("pg");

const sessions = require("express-session");
const pgSession = require("connect-pg-simple")(sessions);

const app = express();

const { PORT } = require("./utils/config");

const { connectToDatabase } = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readingLists");
const { DATABASE_URL } = require("./utils/config");

app.use(express.json());

const pgPool = new Pool({
  connectionString: DATABASE_URL,
});

app.use(
  sessions({
    store: new pgSession({
      pool: pgPool,
      table: "sessions",
      createTableIfMissing: true,
    }),
    secret: "lmaoxd12334",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Session expires after 1 day of inactivity.
      expires: 1000 * 60 * 24,
    },
  })
);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
