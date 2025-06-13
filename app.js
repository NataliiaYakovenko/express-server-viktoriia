const express = require("express");
const { contactsController } = require("./controllers");
const { validate, errorHandler } = require("./middleware/index");

const app = express();

//{JSON} Placeholder
// app.get("/", (req, res, next) => {
//   res.status(200).send("app result111");
// });

// Створення екземпляру експресу
//const app = express();

// Middleware to parse json to js-object
app.use(express.json());

app.get(
  "/",
  (req, res, next) => {
    console.log("Handler 1");
    next();
  },

  (req, res) => {
    console.log("Handler 2");
    res.send("app )))");
  }
);

// CRUD

// Навішування обробника на метод GET на маршрут '/contacts'
// Отримували всіх
// GET http://localhost:5000/contacts?page=1&results=5
app.get("/contacts", contactsController.getContacts);

// Навішування обробника на метод POST на маршрут '/contacts'
// Створювали всіх

app.post(
  "/contacts",
  validate.validateContactOnCreate,
  contactsController.createContacts
);

// Отримували одного
app.get("/contacts/:id", contactsController.getContactById);

// Оновлення одного контакту
app.patch(
  "/contacts/:id",
  validate.validateContactOnUpdate,
  contactsController.updateContactById
);

// Видалення контакту
app.delete("/contacts/:id", contactsController.deleteContactById);

//GET localhost:5000/contacts/10?results=10&page=5
app.get("/contacts/:id", (req, res) => {
  const {
    params: { id },
    query: { results, page },
  } = req;

  console.log("req.params", req.params);
  console.log("req.query", req.query);

  res.status(200).send("OK");
});

//звернутися до всіх замовлень певного користувача
// http://localhost:5000/users/5/orders?isDone=true

app.get("/users/:id/orders", (req, res) => {
  const {
    params: { id },
    query: { isDone },
  } = req;
  console.log("id, isDone", id, isDone);

  res.status(200).send("OK");
});

app.use(errorHandler.validationErrorHandler, errorHandler.errorHandler);

module.exports = app;
