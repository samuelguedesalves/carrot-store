const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

// const Firebase = require('firebase/app');
// require('firebase/auth');
// require('firebase/firestore');

// var fireBaseConfig = {
//     apiKey: "AIzaSyD7dAgM8SRJjSLPBfPs2gzKZ-rzZK-NFJc",
//     authDomain: "carrot-9b7e4.firebaseapp.com",
//     databaseURL: "https://carrot-9b7e4.firebaseio.com",
//     projectId: "carrot-9b7e4",
//     storageBucket: "carrot-9b7e4.appspot.com",
//     messagingSenderId: "258673528765",
//     appId: "1:258673528765:web:d050cb19f94c3717f58cd4"
//     //measurementId: "G-J20H7759Z7"
// };

// Firebase.initializeApp(fireBaseConfig);

const api = express();

api.use(cors());
api.use(express.json());

const apiPort = 4567 || process.env.PORT;

api.listen( apiPort , ()=>{
    console.log('API is run in port: '+ apiPort);
});



//-----------------ROTAS-------------------
//rota de login
api.post('/login', (req, res)=>{
    const email = req.body.user_email;
    const password = req.body.user_password;

    if(email != "" && password != ""){
        
        /*
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
        */
        res.send({ log: true });
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
        
        async function verificEmail(email_test){
            var query = await axios.get('https://carrot-9b7e4.firebaseio.com/Carrot/Users.json')
                .then((response) => {
                    for(var i in response.data){
                        if(response.data[i].email == email_test){
                            console.log(response.data[i].email);
                            return false;
                        };  
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    return false;
                });
            if(query){
                return false;
            }else{
                return true;
            }
        }

        if(verificEmail(email) == true){
            axios.post('https://carrot-9b7e4.firebaseio.com/Carrot/Users.json', {
                    name: name,
                    email: email,
                    password: password,
                })
                .then((data) => {
                    res.send({ insert: true });
                })
                .catch((err) => {
                    res.send({ insert: false });
                });
        }else{
            console.log('aqui');
            res.send({ insert: false });
        }

    }else{
        res.send({ insert: false });
    }
});

// rota de listagem de produtos
api.get('/product_list', (req, res)=>{
    /*
    connection.query('call listar_produtos()',(err, result)=>{
        if (err) res.sendStatus(500);
        res.send(result[0]);
    });
    */
   res.send({products: [
       {
           product_name: 'banana',
           product_value: 2.5,
       }
   ]})
});

function countObject(obj){
    var count = 0;

    for(var k in obj){
        if(obj.hasOwnProperty(k)) count ++;
    };

    return count;
}

api.get('/', (req, res) => {
    axios.get('https://carrot-9b7e4.firebaseio.com/Carrot/Users.json')
            .then((response) => {
                
                var objectNumber = countObject(response.data);
                //console.log(response.data['-LxYjWNAppyq1qz1wmRH'] );
                
                for(var i in response.data){
                    //console.log(response.data[i]);
                    if(response.data[i]);
                    
                }

                res.send({ resposta });
            })
            .catch((err)=>{
                res.send({ insert: false });
            });
});