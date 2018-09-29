
export function getRules(inputName, inputType)  {
	
	if (inputType === "select"){
			return{
				evaluable: false,
				pattern: ""
			}
	} else if (inputName === "nombres" || inputName === "nombre" || inputName === "apellido" || inputName === "apellidos"){
		console.log("rule - nombres");

		return {
			evaluable : true,
			//Only letters and spaces
			pattern : "^[a-zA-Z\s]{3,30}$"
		};
	} else if (inputName === "email"){
		console.log("rule - email");
		return {
			evaluable : true,
			//https://www.regextester.com/97767
			pattern : "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){10,60}$"
		};
	} else if (inputName === "contrasenia"||inputName === "newpass"){
		console.log("rule - password");
		return {
			evaluable : true,
			//Minimum 10 and maximum 128 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
			pattern : "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,128}$"
		};
	} else if (inputName === "direccion"){
		console.log("rule - direccion");
		return {
			evaluable : true,
			//Numbers, letters, spaces and hyphen
			pattern : "^[0-9A-Za-z\s\-]{3,30}$"
		};
	} else if (inputName === "celular" || inputName === "telefono"){
		console.log("rule - celular");
		return {
			evaluable : true,
			//Only numbers
			pattern : "^[0-9]{6,15}$"
		};
	} else if (inputName === "titulo"){
		console.log("rule - titulo");
		return {
			evaluable : true,
			//Numbers, letters, spaces and hyphen
			pattern : "^[0-9A-Za-z\s\-]{5,40}$"
		};
	} else if (inputName === "descripcion"){
		console.log("rule - descripcion");
		return {
			evaluable : false,
			//Numbers, letters, spaces and hyphen
			pattern : "^[0-9A-Za-z\s\-]{0,250}$"
		};
	} else if (inputName === "precio"){
		console.log("rule - precio");
		return {
			evaluable : true,
			//Only numbers
			pattern : "^[0-9]{1,7}$"
		};
	}
	
	}
