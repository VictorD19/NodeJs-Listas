const express = require('express')
const routes = express.Router()
const userController = require('../controller/v1/userController')

routes.get('/',userController.fatorial)
routes.patch('/updateList',userController.exercicio1)
routes.get('/getDates/:month',userController.exercicio2)
routes.post('/setData',userController.exercicio3)
routes.put('/updateData/:id',userController.exercicio4)
routes.get('/filter',userController.exercicio5)
routes.post('/create',userController.exercicio6)
routes.delete('/delete/:id',userController.exercicio7)
routes.get('/user-details/:id',userController.exercicio9)
routes.get('/convert-string',userController.switchStringCase)

module.exports = routes