const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    // const {q,nombre = 'No name', apikey, page = 1, limit} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    //EXPLICACIÓN DE ESTO EN REUNIÓN
    const [total, usuarios] = await Promise.all([ //colección de promesas
      Usuario.count( query ), //promesa
      Usuario.find( query) //promesa
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
  }

  const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol}); //todos los argumentos que recibamos en el body vamos a mandarlo al modelo de usuario

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
  }

  const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if( password ){
      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto); //config.js useFindAndModify

    res.json(usuario);
  }

  const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
  }

  const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //Físicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json(usuario);
  }

  

  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  };