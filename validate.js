import Joi from "joi";


export const userValidate = Joi.object ({
    id: Joi.number().required(),
    nome: Joi.string().required(),
    email:Joi.string().email().required(),
    senha:Joi.string().required(),
}),
 userValidateUpdate = Joi.object ({
    nome: Joi.string().min(2),
    email: Joi.string().min(6),
    senha: Joi.string(),

 }),
 
 bookValidateUpdate = Joi.object ({
    title: Joi.string().min(2),
    isbn: Joi.number().min(5),
    edition: Joi.string(),
    author: Joi.string(),
 }),
 
 bookValidate = Joi.object ({
   title: Joi.string().min(2),
   isbn: Joi.number().min(5),
   edition: Joi.string(),
   author: Joi.string(),
});