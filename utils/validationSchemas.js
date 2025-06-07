const yup = require("yup");

const NAME_VALIDATION_SCHEMA = yup.string().trim().min(2).max(20);
const TELNUMBER_VALIDATION_SCHEMA = yup
  .string()
  .trim()
  .length(13)
  .matches(/^\+380\d{9}$/, "Tel number must correspond +380112223344");
const BIRTHDAY_VALIDATION_SCHEMA = yup.date().max(new Date());

module.exports.CREATE_CONTACT_VALIDATION_SCHEMA = yup.object({
  name: NAME_VALIDATION_SCHEMA.required(),
  telNumber: TELNUMBER_VALIDATION_SCHEMA.required(),
  birthday: BIRTHDAY_VALIDATION_SCHEMA
});

module.exports.UPDATE_CONTACT_VALIDATION_SCHEMA = yup.object({
  name: NAME_VALIDATION_SCHEMA,
  telNumber: TELNUMBER_VALIDATION_SCHEMA,
  birthday: BIRTHDAY_VALIDATION_SCHEMA
});
