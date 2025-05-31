const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {format} = require('date-fns')
const app = express();

//{JSON} Placeholder
app.get("/", (req, res, next) => {
  res.status(200).send("app result111");
  res.end();
});

//CRUD
app.get("/contacts", (req, res, next) => {});
app.get("/contacts/1", (req, res, next) => {});
app.post("/contacts/1", (req, res, next) => {});
app.patch("/contacts/1", (req, res, next) => {});
app.delete("/contacts/1", (req, res, next) => {});
app.get("/users/101/contacts/256", (req, res, next) => {});

const contactsDB = [
  {
    id: 0,
    name: "Test",
    telNumber: "+380123456789",
    birthday: "2000-12-01",
    isFavourite: false,
  },
  {
    id: 1,
    name: "Test1",
    telNumber: "+380123456788",
    birthday: format(new Date(), "Y-MM-dd"),
    isFavourite: true,
  },
];

// Клас для доступу до масива
class ContactsDB {
  constructor(arr) {
    this.contacts = [...arr];
  }

  // Метод для додавання нового об'єкта в масив: додає id і isFavourite
  createContact(newContact) {
    this.contacts.push({ ...newContact, id: uuidv4(), isFavourite: false });
    return this.contacts[this.contacts.length - 1];
  }

  // Метод для отримання даних з масиву
  getContacts() {
    return [...this.contacts];
  }
}

// Інстанс класу для доступу до масиву з об'єктами
const contactsDbInstace = new ContactsDB(contactsDB);

// Створення екземпляру експресу
//const app = express();

// Middleware to parse json to js-object
app.use(express.json());

app.get("/", (req, res) => {
  res.send("app )))");
});

// CRUD
// Навішування обробника на метод GET на маршрут '/contacts'
app.get("/contacts", (req, res) => {
  const contacts = contactsDbInstace.getContacts();
  res.status(200).send(contacts);
});

// Навішування обробника на метод POST на маршрут '/contacts'
app.post("/contacts", (req, res) => {
  // В req.body приходе тіло запиту
  const createdContact = contactsDbInstace.createContact(req.body);
  res.status(201).send(createdContact);
});

module.exports = app;
