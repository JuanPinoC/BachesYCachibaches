# BachesYCachibaches

Proyecto TECSUP -------------------------------------- DONE!!!

Seguridad:
	-	Se agregan los siguientes componentes:
			. En Formularios - Atributos - Rules - Rules.js
			. En Atributo.jsx se agrega metodo validate()
			. En los formulario se agregan los métodos: 
				# ValidatedFormHandler
				# ValidateAllFields
			. En el contenedor de comentarios, se modifica FormularioComentario.jsx

	*	Nota: No se mencionan los estilos ni modificaciones menores.

Access Control:
	-Se modificaron:
		. user.js: Se agrega el campo tipo.
		. userController.js: En la función login se agrega el campo tipo al token.
		. anuncio-access-control.js: Permisos para los anuncios.
		. user-access-control.js: Permisos para los usuarios.
		. anuncios.js: Se agrega el middleware anuncio-access-control.js y se implementa en las rutas.
		. users.js: Se agrega el middleware user-access-control.js y se implementa en las rutas.

