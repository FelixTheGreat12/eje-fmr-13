const express = require('express')
const categoriasControllerApi = require('../controllers/categorias-controller-api')
const router = express.Router();

//La Ruta (end point) GET de todas las categorias
router.get('/',categoriasControllerApi.getTodasCategorias);

//La Ruta (end point) GET solo una categoria
router.get('/:id', categoriasControllerApi.getCategoriaById);

//La Ruta (end point) POST de una categoria
router.post('/', categoriasControllerApi.agregarCategoria);

//La Ruta (end point) ¨PUT de categoria
router.put('/:id', categoriasControllerApi.updateCategoria);

//La Ruta (end point) DELETE de una categoria
router.delete('/:id', categoriasControllerApi.deleteCategoriaById);

module.exports=router;