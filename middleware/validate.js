const {
  CREATE_CONTACT_VALIDATION_SCHEMA,
  UPDATE_CONTACT_VALIDATION_SCHEMA
} = require("../utils/validationSchemas");

module.exports.validateContactOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    const validateContact = await CREATE_CONTACT_VALIDATION_SCHEMA.validate(
      body
    );
    req.body = validateContact;
    next();
  } catch (e) {
    res.status(422).send("Validation Error");
  }
};

module.exports.validateContactOnUpdate = async (req, res, next) => {
  const { body } = req;
  try {
    const validateContact = await UPDATE_CONTACT_VALIDATION_SCHEMA.validate(
      body
    );
    req.body = validateContact;
  } catch (e) {
    res.status(422).send("Validation Error");
  }
  next();
};
