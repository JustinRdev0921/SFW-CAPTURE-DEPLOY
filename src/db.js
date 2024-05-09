import {Connection} from 'tedious';

const config = {
    server: 'UIO-SRV-PASTAZA',
    authentication: {
        type: 'default',
        options: {
          userName: 'sa',
          password: 'Ecuacopia2024*',
        },
      },
      options: {
        port: 1433,
        database: 'SoftwareCaptura',
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