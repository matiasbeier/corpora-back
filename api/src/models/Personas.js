const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('personas', {
    id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[aA-zZ\s]*$/,
      }
    },
	  surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[aA-zZ\s]*$/,
      }
    },
	  birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
	  job: {
      type: DataTypes.STRING,
      validate: {
        is: /^[aA-zZ\s]*$/,
      }
    },
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			}
    }
  });
};
