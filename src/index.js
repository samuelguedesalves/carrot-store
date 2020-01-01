const express = require('express');
const cors = require('cors');
const connection = require('./database/mysql_crud');

const api = express();

api.use(cors());
api.use(express.json());

const apiPort = 4567;

api.listen( apiPort , ()=>{
    console.log('API NO AR! na porta: '+ apiPort);
});



//-----------------ROTAS-------------------
//rota de login
api.post('/login', (req, res)=>{
    const email = req.body.user_email;
    const password = req.body.user_password;

    if(email != "" && password != ""){

        const query = 'call '+'autenticar_usuario("'+email+'","'+password+'");';
        connection.query(query, (err, result)=>{
            if (err) res.sendStatus(500);
            if(result[0][0].log == 'false'){
                res.send({log: false});
            }else{
                // const name = result[0][0].name;
                const name = 'samuel';
                res.send({log: true, name_user: name});
            }
        });
    }else{
        res.send({ log: false });
    }
});

//rota de cadastro
api.post('/new_user', (req, res)=>{
    const name = req.body.name_user;
    const email = req.body.email_user;
    const password = req.body.password_user;

    if (name && email && password){
        connection.query('call criar_novo_usuario("'+name+'","'+email+'","'+password+'");', (err, result) =>{
            if(err) res.sendStatus(500);
            if(result[0][0].create == 'true'){
                res.send({ create: true });
            }else{
                res.send({ create: false });
            }
        });
    }else{
        res.send({ insert: false });
    }
});

// rota de listagem de produtos
api.get('/product_list', (req, res)=>{
    connection.query('call listar_produtos()',(err, result)=>{
        if (err) res.sendStatus(500);
        res.send(result[0]);
    });
})