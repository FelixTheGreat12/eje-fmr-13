const { miConexion } = require("../database/db")
const bcrypt = require('bcrypt')
const usuariosAPI = {}

usuariosAPI.agregarUsuario = async(req,res,next)=>{
    try{
        const { usuario, clave, nombre } = req.body
        if(usuario==undefined || clave==undefined || nombre==undefined){
            res.status(404).json({
                estado:0,
                mensaje:"Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const claveEncriptada = await bcrypt.hash(clave,10)
            const conexion = await miConexion()
            const resultado = await conexion.query('INSERT INTO usuarios(usuario,clave,nombre) VALUES (?,?,?)',[usuario,claveEncriptada,nombre])
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1,
                    mensaje:"Usuario registrado con exito",
                    usuario:{
                        id : resultado[0].insertId,
                        usuario : usuario,
                        nombre : nombre
                    }
                })
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Error interno del servidor"
                })
            }
        }

    }catch(error){
        next(error)
    }

}
//CRUD  

module.exports=usuariosAPI