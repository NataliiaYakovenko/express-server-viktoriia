const createError = require("http-errors");
const { ContactDB } = require("../models");

module.exports.getContacts = (req, res) => {
  const { page = 1, results = 5 } = req.query;

  const contacts = ContactDB.getContacts(page, results);
  res.status(200).send(contacts);
};

module.exports.createContacts = (req, res) => {
  // В req.body приходе тіло запиту
  const createdContact = ContactDB.createContact(req.body);
  res.status(201).send(createdContact);
};

module.exports.getContactById = (req, res, next) => {
  const foundContact = ContactDB.getContactById(req.params.id);
  if (foundContact) {
    res.status(200).send(foundContact);
  } else {
    // res.status(404).send("Contact not founf");
    next(createError(404, "Contact Not Found"));
  }
};

module.exports.updateContactById = (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  const updateContact = ContactDB.updateContact(id, body);
  if (updateContact) {
    res.status(200).send(updateContact);
  } else {
    // res.status(404).send("Contact not founf");
    next(createError(404, "Contact Not Found"));
  }
};

module.exports.deleteContactById = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleteContact = ContactDB.deleteContact(id);
  if (deleteContact) {
    //res.status(200).send(deleteContact);
    res.status(204).send();
  } else {
    // res.status(404).send("Contact not founf");
    next(createError(404, "Contact Not Found"));
  }
};
