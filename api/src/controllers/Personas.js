const {Personas} = require('../db');

const calcAge = (date) =>{
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getUser = async ({job}) =>{
    try{
        if(job){
            const users = await Personas.findAll({
                where: {
                    job
                }
            })
            return users.length 
                ? users.map(user =>{
                    return {
                        ...user.dataValues,
                        fullName: `${user.name} ${user.surname}`,
                        age: calcAge(user.birthDate)
                    }
                })
                : "no hay usuarios con ese trabajo"
        } else {
            const users = await Personas.findAll()
            return users.length 
                ? users.map(user =>{
                    return {
                        ...user.dataValues,
                        fullName: `${user.name} ${user.surname}`,
                        age: calcAge(user.birthDate)
                    }
                })
                : "no hay usuarios"
        }
    } catch(e){
        return e
    }
}


const createUser = async ({
	name,
	email,
    surname,
	birthDate,
	job
}) => {
	try {
		const [newUser, bool] = await Personas.findOrCreate({
			where: {email},
			defaults: {
                name,
                surname,
                birthDate,
                job
			},
		});
        return bool
            ? "usuario creado exitosamente"
            : bool
	} catch (e) {
		return  'Error al crear un usuario:' + e;
	}
};

/* const deleteUser = async (id) => {
	try {
		const eliminado = await Personas.destroy({where: {id}});
		return eliminado > 0
			? "Usuario eliminado correctamente"
			: "El usuario no existe";
	} catch (e) {
		return e;
	}
}; */

module.exports = {
    getUser,
    createUser,
    deleteUser
}