const express = require('express');
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.port || 3000;

//rutas personalizadas
const rutasCategoriasAPI = require('./src/routes/categorias-routes-api');
const app = express();
const rutasUsuariosApi = require('./src/routes/usuarios-routes-api')
const rutasAuthAPI = require('./src/routes/auth-routes-api')
//Vistas
app.set('view engine','hbs')
hbs.registerPartials(__dirname = 'view/partials', () => {});
//Midleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) =>{
    res.render('index')
})

app.get('/login',(req,res) =>{
    res.render('signin-one')
})
 
//me regresa en formato JSON los datos de categorias
app.use('/categorias/api', rutasCategoriasAPI);
app.use('/usuarios/api', rutasUsuariosApi)
app.use('/auth/api',rutasAuthAPI)

//me regeresa en formato HTML la vista
app.get('/categorias',(req,res) =>{
    res.render('advance-table')
})

app.get('*',(req,res) =>{
    res.render('404')
})

app.listen(port, ()=>{
    console.log('el servidor esta conrriendo en el puerto: ', port)
})