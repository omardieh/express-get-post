const express = require("express");
const hbs = require("hbs");
const port = 3000;

const app = express();
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.render("index");
// });

// const users = [
//   { name: "Bob", _id: 1 },
//   { name: "Sarah", _id: 2 },
// ];

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.get("/users/:userID", (req, res) => {
//   //   const userID = req.params.userID;
//   const { userID } = req.params;
//   const foundUser = users.find((user) => user._id === Number(userID));
//   res.send(foundUser);
// });

// app.get("/users/:username/books/:bookId", (req, res) => {
//   res.send(req.params);
// });

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    age: 28,
    city: "New York",
  },
  {
    id: 2,
    name: "Alice Smith",
    username: "alice.smith",
    email: "alice.smith@example.com",
    age: 24,
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Bob Johnson",
    username: "bob.j",
    email: "bob.j@example.com",
    age: 32,
    city: "Chicago",
  },
  {
    id: 4,
    name: "Eva Wilson",
    username: "eva_wilson",
    email: "eva.wilson@example.com",
    age: 22,
    city: "Houston",
  },
  {
    id: 5,
    name: "Michael Brown",
    username: "mike.brown",
    email: "michael.b@example.com",
    age: 30,
    city: "Miami",
  },
  {
    id: 6,
    name: "Sarah Clark",
    username: "sarah.c",
    email: "sarah.c@example.com",
    age: 26,
    city: "San Francisco",
  },
  {
    id: 7,
    name: "Daniel Lee",
    username: "dlee87",
    email: "daniel.lee@example.com",
    age: 29,
    city: "Seattle",
  },
  {
    id: 8,
    name: "Emily White",
    username: "em_white",
    email: "emily.white@example.com",
    age: 27,
    city: "Boston",
  },
  {
    id: 9,
    name: "Ryan Miller",
    username: "ryan_m",
    email: "ryan.m@example.com",
    age: 31,
    city: "Denver",
  },
  {
    id: 10,
    name: "Olivia Davis",
    username: "olivia.d",
    email: "olivia.d@example.com",
    age: 25,
    city: "Phoenix",
  },
];

// app.get("/users", (req, res) => {
//   // /:something => req.param
//   // /something?limit=5 => req.query
//   //   const limit = req.query.limit;
//   //   const sort = req.query.sort;
//   const { limit, sort } = req.query;
//   if (sort) {
//     res.send(users.sort((a, b) => a.age - b.age));
//     return;
//   }
//   res.send(users.slice(0, limit));
// });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  console.log(req.method);
  console.log(req.query);
  res.render("index");
});

// https://www.facebook.com/zuck/?locale=de_DE
// https://www.airbnb.com/rooms/40460144?adults=1&category_tag=Tag%3A789&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1007468457&search_mode=flex_destinations_search&check_in=2023-10-23&check_out=2023-10-30&source_impression_id=p3_1693824588_9lzrCujHZpEsjO9e&previous_page_section_name=1000&federated_search_id=1e902bc5-27e3-4ff2-97be-02707e34dce8
// req.param
// req.query

// app.get("/user-data", (req, res) => {
//   console.log(req.query);
// });

// app.post("/user-data", (req, res) => {
//   console.log(req.body);
// });

app.get("/get-user-info", (req, res) => {
  res.render("user-form");
});

app.get("/display-user-info", (req, res) => {
  const { name, age, superhero } = req.query;
  console.log(name, age, superhero);
  res.send(req.query);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log(req.body);
});

function isAuthenticated(req, res, next) {
  const { secret } = req.query;
  if (Number(secret) !== 123) {
    res.status(401).send("not authenticated");
    return;
  }
  next();
}

function allowResponseToUser(req, res) {
  res.status(200).send("welcome to the private page");
}
app.get("/private", isAuthenticated, allowResponseToUser);

const handleNonExistingRoute = (req, res) => {
  res.status(404).send("Page not found");
};

app.use(handleNonExistingRoute);

app.listen(port, (error) => {
  error ? console.error(error) : console.log("connected to port : ", port);
});
