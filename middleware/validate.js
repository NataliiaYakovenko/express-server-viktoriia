const yup = require("yup");

const CREATE_CONTACT_VALIDATION_SCHEMA = yup.object({
  name: yup.string().trim().min(2).max(20).required(),
  telNumber: yup
    .string()
    .trim()
    .length(13)
    .matches(/^\+380\d{9}$/, "Tel number must correspond +380112223344"),
  birthday: yup.date().max(new Date()),
});

module.exports.validateContactOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    const validateContact = await CREATE_CONTACT_VALIDATION_SCHEMA.validate(body);
    req.body = validateContact;
    next();
  } catch (e) {
    res.status(422).send("Validation Error");
  }
};

module.exports.validateContactOnUpdate = (req, res, next) => {
  next();
};
