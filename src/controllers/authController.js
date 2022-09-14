import bcrypt from 'bcrypt';
import mongo from '../db/db.js';
import { v4 as uuid } from 'uuid';
import { signUpSchema, signInSchema } from '../schemas/authSchema.js';

async function signUp(req,res) {

    const {name, email, password} = req.body;
    const isValid= signUpSchema.validate ({name, email, password});

    if (isValid.error) {
        return res.status(400).send("Preencha todos os campos corretamente!")
    }
    const encrypetPassword = bcrypt.hashSync (password, 10);
        try {
            mongo.collection('users').insertOne ({
                name,
                email,
                password: encrypetPassword
            })
            return res.status(201).send("Usuario criado com sucesso!")  
        } 
        catch (error){
            console.error (error);
            return res.status(500).send("Erro ao criar usuario no servidor")
        }
}

async function signIn(req,res) {

    const { email, password } = req.body;

    const isValid = signInSchema.validate({
        email, password
    });

    if (isValid.error) {
        return res.send(400);
      }

    try {
        const user = await mongo.collection('users').findOne({
          email,
        });

        const isValidPass = bcrypt.compareSync (password, user.password);

         if (!user || !isValidPass) {
            return res.status(401).send("Dados invalidos");
        }

        const token = uuid();
            mongo.collection('sessions').insertOne({
            userId: user._id,
            token,
        });
        return res.send (token);
    } 

    catch (error){
        console.log(error);
        return res.send (500)
    }
}

export { signUp, signIn };
