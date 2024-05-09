import app from './app.js'
import connection from './db.js';

app.get("/",(req, res)=>{
    res.json({message: "API DESPLEGADA"})
})
app.listen(process.env.PORT)
//console.log('Server on port', 3000);
