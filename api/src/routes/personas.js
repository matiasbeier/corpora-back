const {Router} = require('express');
const router = Router();
const {getUser, createUser, deleteUser} = require('../controllers/Personas');


router.get('/', async (req, res) => {
	try {
        const userFound = await getUser(req.query);
        res.json(userFound);
	} catch (e) {
		res.status(500).send('Error al devolver usuario/s: ' + e);
	}
});

router.post('/', async (req, res) => {
	try {
			const userCreated = await createUser(req.body);
			if (!userCreated) {
				res.send('Problemas en el servidor no pudo ser creado');
			} else {
				res.send(userCreated);
			}
	} catch (e) {
		res.status(500).send('Error al crear un usuario: ' + e);
	}
});

router.put('/:id', async (req, res) => {
    try{
		console.log("entrando", id)
		const { id } = req.params;
        const { name,
			surname,
			birthDate,
			job,
			email } = req.body;
		if(name && surname && birthDate && email){
			console.log("cambio")
			const number = await Personas.update({
				name,
				surname,
				birthDate,
				job: job ? job : null,
				email	
			},
			{
				where: {
					id: id
				}
			})
			console.log(number)
			return number > 0 
				? res.send("datos actualizados")
				: res.send("no hay personas con ese id")
		}
        res.status(404).send('los campos name, surname, email y birthDate son obligatorios');
    } catch(e){
        res.send(e);
    }
})

router.delete('/:id', async (req,res) =>{
    const {id} = req.params;
    try{
        const user = await Personas.destroy({
            where: {
                id: id
            }
        })
        if(user) {
            res.send('eliminado exitosamente')
        } else {
            res.status(400).send('no hay ninguna persona con ese id')
        }
    }catch(e){
        res.send(e)
    }
})


module.exports = router;