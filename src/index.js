const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const api = express();

api.use(cors());
api.use(express.json());

const apiPort = 4567 || process.env.PORT;

api.listen( apiPort , ()=>{
    console.log('API is run in port: '+ apiPort);
});



//-----------------ROUTERS-------------------

//login router
api.post('/login', (req, res)=>{
    const email = req.body.user_email;
    const password = req.body.user_password;

    if(email != "" && password != ""){
        axios.get('https://carrot-9b7e4.firebaseio.com/Carrot/Users.json')
            .then((response_database) => {
                for(var i in response_database.data){
                    if(response_database.data[i].email === email){
                        if(response_database.data[i].password === password){
                            res.send({log: true, username: response_database.data[i].name, userId: i });
                        }else{
                            res.send({ log: false });
                        }
                    }
                }

                res.send({ log: false });

            })
            .catch((error_database) =>{
                res.send({ log: false });
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
        
        axios.get('https://carrot-9b7e4.firebaseio.com/Carrot/Users.json')
            .then((response) => {
                for(var i in response.data){
                    console.log(response.data[i].email);
                    if(response.data[i].email == email){
                        res.send({ insert: false });
                    };  
                }

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

            })
            .catch((err)=>{
                res.send({ insert: false });
            });
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