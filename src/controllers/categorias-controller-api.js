//requerimos la conexion a la base de datos
const { request } = require('express');
const {miConexion} = require('../database/db')

//objeto para manejar el CRUD de categorias
const categoriasAPI = {};

//El objeto categoriasAPI = C, R (una o todas), U, D
//aqui es para regresar todas las categorias
// C = Post
// R = Get
// U = Put
// D = Delete

//Aqui vamos a eliminar una categoria
categoriasAPI.deleteCategoriaById = async ( req = request,res,next) =>{
    try {
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categoria WHERE id = ?', [id])
        if(resultado[0].affectedRows > 0){
            res.status(200).json({
                estado: 1,
                mensaje: 'Categoria eliminada'
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: 'Categoria no encontrada'
            })
        }
    } catch (error) {
        next(error)
    }
}

//Vamos a update una categoira
categoriasAPI.updateCategoria = async (req = request, res = request, next) => {
    try {
        const {descripcion, observaciones} =req.body;
        const {id} = req.params;
        if(id == undefined || descripcion == undefined || observaciones == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: 'solicitud incorrecta: Faltan paramentros'
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categoria SET descripcion = ?, observaciones = ? WHERE id = ?', [descripcion,observaciones,id])
            if(resultado[0].affectedRows >0){
                res.status(200).json({
                    estado: 1,
                    mensaje: 'Categoria actualizada',
                    descripcion: descripcion,
                    observaciones: observaciones
                })
            }else{
                res.status(404).json({
                    estado: 0,
                    mesaje: 'Categoria No actualizada'
                })
            }
           
        }
    } catch (error) {
        next(error)
    }
}

//Vamos a agregar una categoria
categoriasAPI.agregarCategoria = async (req = request, res = request, next) => {
    try {
        const {descripcion, observaciones} = req.body;
        //veerificar que la solicitud se realice correctamente
        //que nos mande los dos campos
        if(descripcion == undefined || observaciones == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: 'Solicitud incorrecta: Faltan paramentros'
            })
        } else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO categoria(descripcion, observaciones) VALUES (?,?)', [descripcion,observaciones])
            if(resultado[0].affectedRows >0){
                res.status(201).json({
                    estado: 1,
                    mensaje: 'Categoria creada',
                    categoria:{
                        id: resultado[0].insertId,
                        descripcion: descripcion,
                        observaciones: observaciones
                    }
                });
            }            
        }
    } catch (error) {
        next(error)
    }
}

//Aqui es para que nos regrese una categoria por su ID
categoriasAPI.getCategoriaById = async (req = request,res,next) =>{
    try {
        //recuperar el ID de la categoria
        const { id } = req.params;
        const conexion = await miConexion();
        const [resultado] = await conexion.query('SELECT * FROM categoria WHERE id = ?',[id]);
        if(resultado.length > 0){
            res.status(200).json({
                estado: 1,
                mensaje: 'Categoria encontrada',
                categoria: resultado[0]
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: 'Categoria no encontrada',
                categoria: []
            })
        }
    } catch (error) {
        next(error)
    }
}

//Aqui es para regresar todas las categorias
categoriasAPI.getTodasCategorias = async (req,res,next) =>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM categoria')
        if(rows.length == 0){
            res.status(404).json({
                estado:0,
                mensaje:'Registros no encontrados',
                categorias:rows
            });
        }else{
            res.status(200).json({
                estado:1,
                mensaje:'Registros encontrados',
                categorias:rows
            });
        }
        
    }catch(error){
        next(error)
    }
}

//exportar para poder usarlo en otro modulo
module.exports=categoriasAPI;