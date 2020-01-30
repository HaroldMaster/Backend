const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json()); 
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
    let personaje = personajes.find(p=>p.id==req.params.id);
    if (!personaje) res.status(404).send('Personaje no encontrado')
    else res.send(personaje);
});
app.get('/api/personajes', (req,res)=>{
    res.send(personajes);
});
app.post('/api/personajes', (req,res)=>{ // da igual si es /api/personjes que /api/personajes/
    /*const {error} = validator(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message); // 400 bad request
        return;
    }*/
    //por motivos de aprenizaje la manera correcta de valuidar es la de arriva debido a que se debe hacer una funcion para validar todo, no una funcion en cada metodo, pero con fines de aprendizaje en este put se hara una validacion solo para este bloque post
    const schema = {
        nombre: Joi.string().min(4).required(),
        poder: Joi.string().min(4).required()
    };
    const validador = Joi.validate(req.body, schema);
    if(validador.error){
        res.status(400).send(validador.error.details[0].message); // 400 bad request
        return;
    }
    const personaje = {
        id: personajes.length +1,
        nombre: req.body.nombre,
        poder: req.body.poder
    };
    personajes.push(personaje);
    res.send(personaje);
});
app.put('/api/personajes/:id', (req,res)=>{
    //validamos si el personaje existe o no
    let personaje = personajes.find(p=>p.id==req.params.id);
    if (!personaje) res.status(404).send('Personaje no encontrado');
    //validamos que se haga una buena solicitud en el json llenando todos sus campos
    const {error} = validator(req.body);
    if(error){
        res.status(400).send(error.details[0].message); // 400 bad request
        return;
    }
    //realizamos el put
    personaje["nombre"]=req.body.nombre;
    personaje["poder"]= req.body.poder;
    res.send(personaje);

});
app.delete('/api/personajes/:id', (req, res)=>{
    let personaje= personajes.find(c=>c.id==req.params.id);
    if(!personaje) return res.status(404).send('No se encontró el personaje');
    let index= personajes.indexOf(personaje);
    let eliminado= personajes.splice(index,1);
    res.send(personaje);
});
function validator(personaje){
    const schema = {
        nombre: Joi.string().min(3).required(),
        poder: Joi.string().min(3).required()
    };
   return Joi.validate(personaje, schema);
};
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`escuchando en el puerto ${port}`));