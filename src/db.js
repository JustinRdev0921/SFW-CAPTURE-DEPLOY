import {Connection} from 'tedious';
import { PORT, USERNAME, PASSWORD, DATABASE, SERVER_BD } from "./config.js";

const config = {
    server: SERVER_BD,
    authentication: {
        type: 'default',
        options: {
          userName: USERNAME,
          password: PASSWORD,
        },
      },
      options: {
        port: PORT,
        database: DATABASE,
        encrypt: true,
        trustServerCertificate: true
      },

};

const connection = new Connection(config);

connection.connect();
connection.on('connect', (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("conectado a BD");
    }
})

export default connection;