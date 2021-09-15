const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        //Creando aplicación de express
        this.app = express();
        //Configuración del puerto
        this.port = process.env.PORT;
        //Definir URL
        this.usuariosPath = '/api/usuarios'


        //Conectar a Base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;