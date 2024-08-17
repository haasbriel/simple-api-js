import express from "express";
import books from "./books.js";
import library from "./rent-book.js";
import users from './users.js';
import { bookValidate, bookValidateUpdate, userValidate, userValidateUpdate } from "./validate.js";




const app = express();
app.use(express.json());



//solicitação get que retorna um usuário dado um id
app.get("/bib/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const user = users.find((item) => item.id === id );
    
    if(!user){
        res 
        .status(404)
        .send({message:'Não existe um usuário para este ID.'})
    } 
     res
     .status(200)
    .send({
        message: 'usuário encontrado com sucesso!',
        user
    })
})


//solicitação get que retorna um livro dado um id
app.get("/bib/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((item) => item.id === id );
    if(!book){
        res 
        .status(404)
        .send({message:'Não existe um livro para este ID.'})
    } 
     res
    .status(200)
    .send({
        message: 'livro encontrado com sucesso!',
        book
    })
})

//solicitação get que retorna TODOS os usuários
app.get("/", (req,res) =>{
    res.send(users);
})

////solicitação get que retorna TODOS os livros
app.get("/books", (req, res) => {
    res.send(books);
})

//alterar um usuário dado um id
app.put("/bib/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    const changeUser = req.body;

    if(!user){
       return res.status(400). res.send({message: "nenhum usuário encontrado com esse id"});
       
    }
    const { error } = userValidateUpdate.validate(changeUser);
    
    if(error){
        return res.status(400). res.send({message: "erro"});
       
    }
    const fields = Object.keys(changeUser);
    console.log(fields);

    for(let x of fields){
        user[x] = changeUser[x];
    }

    res.status(200).send(user);
})


//alterar um livro dado um id 
app.put("/bib/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((user) => user.id === id);
    const changeBook = req.body;

    if(!book){
       return res.status(400). res.send({message: "nenhum livro encontrado com esse id"});
       
    }
    const { error } = bookValidateUpdate.validate(changeBook);
    
    if(error){
        return res.status(400). res.send({message: "erro"});
       
    }
    const fields = Object.keys(changeBook);
    console.log(fields);

    for(let x of fields){
        book[x] = changeBook[x];
    }

    res.status(200).send(book);
})

//adiciona um usuário
app.post("/bib/user", (req, res) => {
    const user = req.body
    const { error } = userValidate.validate(user)
    
    if(error) {
        res.status(404).send({message: "Erro."})
    };

    res.status(200).send(user);
})

//adiciona um livro
app.post("/bib/book", (req,res) => {
    const book = req.body

    const {error} = bookValidate.validate(book);

    if(error){
        res.status(404).send({message: 'Erro'})
    }

    res.status(200).send(book);
})

//delete um usuário
app.delete("/bib/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const userIndice = users.findIndex((item) => 
        item.id === id
    );

    if(userIndice === -1){
    res.status(404).send({message: 'Não existe um usuário para o índice informado!'})
    }

     const userRemovido = users.splice(userIndice, 1);
        res.status(200).send({message: 'Usuário removido com sucesso!'})
});


//deleta um livro
app.delete("/bib/books/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const bookIndice = users.findIndex((item) => 
        item.id === id
    );

    if(bookIndice === -1){
    res.status(404).send({message: 'Não existe um livro para o índice informado!'})
    }

     const livroRemovido = users.splice(bookIndice, 1);
        res.status(200).send({message: 'Livro removido com sucesso!'})
});








app.listen(3000, () => console.log('EXECUTANDO!!!'))