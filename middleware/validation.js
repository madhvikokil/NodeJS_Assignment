import Joi from 'joi';

class Validation {
   validateRegister = (req, res, next) => {
     const schemaTest = {
       name: Joi.string().min(5).max(100).required(),
       lastname: Joi.string().min(5).max(100).required(),
       email: Joi.string().min(5).max(100).required().email(),
       password: Joi.string().min(5).max(100).required(),
       isAdmin: Joi.boolean().required()
     };
     Joi.validate(req.body, schemaTest, (error, value) => {
       if (error) { return res.status(400).send(error.details[0].message); }
       next();
     });
   };

   validateLogin = (req, res, next) => {
     const schema = {
       email: Joi.string().min(5).max(100).required().email(),
       password: Joi.string().min(5).max(100).required()
     };
     Joi.validate(req.body, schema, (error, value) => {
       if (error) { return res.status(400).send(error.details[0].message); }
       next();
     });
   };
}
export default new Validation();
