const express = require('express');
const app = express();
const personajes = [
    {id: 1, nombre:'Goku' , poder:'kamehameha'},
    {id: 2, nombre:'Broly' , poder:'Bola verde'},
    {id: 3, nombre:'Boo' , poder:'Bola rosada'}
]
app.get('/', (req,res)=>{
    res.send('hello world');
});
/*app.get('/api/personajes/:id', (req,res)=>{
    res.send(req.query);
});*/
app.get('/api/personajes/:id', (req,res)=>{
    let a = req.params.id;
    typeof a;
    let personaje = personajes.find(p=>p.id==req.params.id);
    if (!personaje) res.status(404).send('Personaje no encontrado')
    else res.send(personaje);
});
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`escuchando en el puerto ${port}`));