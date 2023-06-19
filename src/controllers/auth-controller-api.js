const { json } = require('body-parser')
const { miConexion } = require('../database/db')
const bcrypt = require('bcrypt')

const authAPI = {}

authAPI.logout = (requ,res,next)=>{
    try{
        
    }   catch(error) {

    }
}

authAPI.login = async(req,res,next)=>{
    try{
        const {usuario, clave, } = req.body
        if(usuario==undefined||clave==undefined){
            res.status(404).json({
                estado:1,
                mensaje:"Faltan parametros: usuario y/o clave"
            })
        }else{
            const conexion = await miConexion()
            const resultado = conexion.query("SELECT * FROM usuario WHERE usuario = ?",[usuario])
            if(resultado.length>0){
                //Si lo encontro vamos a comparar la clave
                //La clave esta encriptada 
                if(await bcrypt.compare(clave,resultado[0].clave)){
                    //Crear las variables de sesion 
                    req.session.usuario = usuario
                    req.session.id=resultado[0].id
                    res.status(201).json({
                        estado:1,
                        mensaje:"Acceso Correcto"
                    })
                }else{
                    res.status(403).json({
                        estado:0,
                        mensaje:"Usuario y/o clave incorrecta"
                    })
                }
            }
        }
    }   catch(error){

    }
}

//Exportar 
module.exports=authAPI