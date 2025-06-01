const { ContactDB } = require("../models");

module.exports.getContacts = (req, res) => {
  const contacts = ContactDB.getContacts();
  res.status(200).send(contacts);
};

module.exports.createContacts = (req, res) => {
  // В req.body приходе тіло запиту
  const createdContact = ContactDB.createContact(req.body);
  res.status(201).send(createdContact);
};

module.exports.getContactById = (req, res) => {
  const foundContact = ContactDB.getContactById(req.params.id);
  if (foundContact) {
    res.status(200).send(foundContact);
  } else {
    res.status(404).send("Contact not founf");
  }
};

module.exports.updateContactById = (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const updateContact = ContactDB.updateContact(id, body);
  if (updateContact) {
    res.status(200).send(updateContact);
  } else {
    res.status(404).send("Contact not founf");
  }
};

module.exports.deleteContactById = (req, res) => {
  const {
    params: { id },
  } = req;
  const deleteContact = ContactDB.deleteContact(id);
  if (deleteContact) {
    res.status(200).send(deleteContact);
  } else {
    res.status(404).send("Contact not founf");
  }
};
