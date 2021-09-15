const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json(errors);
    }

    next(); //Sigue con el siguiente middleware/controlador (en el archivo de routas, los check)
}

module.exports = {
    validarCampos
}