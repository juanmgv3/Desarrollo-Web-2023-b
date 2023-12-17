const formulario = document.getElementById('formulario'); //acceder al formulario
const inputs = document.querySelectorAll('#formulario input'); //arreglo de todos los inputs, accede a todos los campos input de el #formulario => 


const expresiones = {//expresiones regulares
	usuario: /^([A-ZÁÉÍÓÚ][a-záéíóúüñ]+\s[A-ZÁÉÍÓÚ][a-záéíóúüñ]+)$/, // al menos dos palabras sin numeros
	password: /^(?=.*[%#$&!])[A-Za-z0-9%#$&!]{8,}$/,  // Al menos 8 caracteres entre ellos al menos un %#$&!
	correo:  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // no espacios debe llevar arroba
    domicilio: /^(?!\s*$).+/ , // no vacio
    ciudad: /^(?!\s*$).+/, // no vacio
    estado: /\b(Chiapas|Guanajuato|Jalisco|Querétaro|Veracruz)\b/, // 
    zip: /^\d{5}$/ //  solo digitos, al menos 5
}

const campos = { // Para poder saber que campo fue validado, antes de hacer submit
    usuario : false,
    correo: false,
    password: false,
    domicilio: false,
    ciudad: false,
    estado: false, 
    zip: false
}

const nombresDeCampos = Object.keys(campos); // ["usuario", "correo",..., "zip"]


const validarCampo = (expresion, input_value, input_name) => {
     // expresiones.usuario.test() => expresion.test()  
     // e.target.value => input_value 
     // grupo__usuario => grupo__${input_name} ; 
     // metodologia BEM
    if(expresion.test(input_value )){ //valida si  el string, input.value  tiene coincidencia con la expRegular
        
        // document.getElementById('grupo__usuario').classList.remove('formulario__grupo-incorrecto'); //por ID
        document.getElementById(`grupo__${input_name}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${input_name}`).classList.add('formulario__grupo-correcto'); //poner icono en verde
        // document.querySelector('#grupo__usuario i').classList.remove('fa-times-circle'); // por tag
        document.querySelector(`#grupo__${input_name} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${input_name} i`).classList.add('fa-check-circle');
        // document.querySelector('#grupo__usuario .formulario__input-error').classList.remove('formulario__input-error-activo'); //por clase
        document.querySelector(`#grupo__${input_name} .formulario__input-error`).classList.remove('formulario__input-error-activo');

        campos[input_name] = true; // campo validado

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo'); // Borrar mensaje, "Por favor rellenar el formulario correctamente", al actualizarse cualquier campo

   
    } else {

        document.getElementById(`grupo__${input_name}`).classList.add('formulario__grupo-incorrecto'); // poner label, input e icono en rojo
         document.getElementById(`grupo__${input_name}`).classList.remove('formulario__grupo-correcto');  
        document.querySelector(`#grupo__${input_name} i`).classList.add('fa-times-circle'); // poner tache
        document.querySelector(`#grupo__${input_name} i`).classList.remove('fa-check-circle'); // quitar palomita
        document.querySelector(`#grupo__${input_name} .formulario__input-error`).classList.add('formulario__input-error-activo'); // Poner mensaje de error en input (segun expresion regular)
        
        campos[input_name] = false; // campo noValidado
    }//else
}//validarCampo



const validarFormulario = (e) => {

    console.log(e.target); //e.target => <input type="text" class="formulario__input" name="usuario" id="usuario" placeholder="Nacho Vargas"> //Ocultar
    console.log("name = " + e.target.name  + " value = " + e.target.value + " test = " + expresiones.usuario.test(e.target.value))//Ocultar

	switch (e.target.name) {
		case "usuario":
        // validarCampo(expresiones.usuario, e.target, 'usuario');
         validarCampo(expresiones.usuario, e.target.value, e.target.name);
		break;
		
		case "correo":
            validarCampo(expresiones.correo, e.target.value, e.target.name);
		break;

		case "password":
            validarCampo(expresiones.password, e.target.value, e.target.name);
        break;

        case "domicilio":
            validarCampo(expresiones.domicilio, e.target.value, e.target.name);
        break;

        case "ciudad":
            validarCampo(expresiones.ciudad, e.target.value, e.target.name);
        break;

        case "estado":
            validarCampo(expresiones.estado, e.target.value, e.target.name);
        break;

        case "zip":
            validarCampo(expresiones.zip, e.target.value, e.target.name);
        break;
		
	}//switch
}//funcion validarFormulario



inputs.forEach((input) => { //Escuchar los eventos para cada input, <input type="text" class="formulario__input" name="usuario" id="usuario" placeholder="Nacho Vargas">
	input.addEventListener('keyup', validarFormulario); //El evento "keyup" se dispara cuando se suelta una tecla, dentro de cualquier <input>
	input.addEventListener('blur', validarFormulario); //El evento "blur" se dispara cuando se ha seleccionado otro elemento distinto al foco <input> actual

});//forEach keyup & blur events



formulario.addEventListener('submit', (e) => {
    
	e.preventDefault(); //para evitar que el formulario se envíe y se recargue la página y borre los campos

    console.log("Campos validados", campos);// Ver campos ya validados (true) o no (false)

    //verificar que todos los campos esten correctos
    if(campos.usuario && campos.correo && campos.password && campos.domicilio && campos.ciudad && campos.estado && campos.zip){
        formulario.reset(); //limmpia todos los campos, pero no los iconos

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');  //Borrar iconos 
        });//forEach

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo'); // Añade mensaje, "Formulario enviado Exitosamente"

        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');//Borra mensaje, "Formulario enviado exitosamente"  tras 3segs (timeout= 3)

            // Object.keys(campos) => convierte a arreglo ['usuario', 'correo',...,'zip'], poner campos a FALSE
            Object.keys(campos).forEach( (key) => {
                campos[key] = false;
            });

        }, 3000); //setTimeOut()

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo'); // Borra mensaje, "Por favor rellenar el formulario correctamente", todos los campos estan validados
       
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo'); // Añade mensaje, "Por favor rellenar el formulario correctamente", hay al menos un campo sin validar
       
        alert("Por favor rellenar el formulario correctamente" ); 
    
        nombresDeCampos.forEach((input_Names) => { //Pintar campos no validados  en rojo
             if( campos[input_Names ] == false){
                document.getElementById(`grupo__${input_Names}`).classList.add('formulario__grupo-incorrecto'); // poner label, input e icono en rojo
                document.getElementById(`grupo__${input_Names}`).classList.remove('formulario__grupo-correcto');  
                document.querySelector(`#grupo__${input_Names} i`).classList.add('fa-times-circle'); // poner tache
                document.querySelector(`#grupo__${input_Names} i`).classList.remove('fa-check-circle'); // quitar palomita
                document.querySelector(`#grupo__${input_Names} .formulario__input-error`).classList.add('formulario__input-error-activo');
                
            } 
            
        });
          

    }//else
     
});// submit event

/*BORRADOR
corregir Css
corregir expresiones regulares
corregir select
porque algunos campos se quedan en azul
poner en rojo los campos que no han sido validados 
------------------------------------------

const nombre = 'Juan'; const edad = 30;
console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años.`);
console.log('Hola, mi nombre es ' + nombre + ' y tengo ' + edad + ' años.');

const regex = /hello/;
const str = 'hello world';
const result = regex.test(str);
console.log(result); // Esto imprimirá true

// Ejemplos de validacion
// Usuario => María García  Andrés Torres  Carlos Rodríguez  Emilio Navarro   Pedro (no tiene segundo nombre)  juan Pérez (no inicia con mayúscula) Ana fernández (la segunda palabra no inicia con mayúscula) Érick Álvarez
// Correo => jane_doe@example.co  john123@example.org 1234@example.net
// Password => Abcdefg%123  1$HolaMundo! %Password$123  987654!abcdefg  Test%123#

//seTimeout()
setTimeout(function() {  //La funcion se ejecuta despues de un retraso
  console.log('¡Hola, mundo! Anonima');
}, 2000);

setTimeout( () => {
  console.log('¡Hola, mundo! Flecha');
}, 3000);

//Object.keys()
Object.keys(campos).forEach(function(key) {
  campos[key] = true;
});

//forEach
inputs.forEach((input) => {
    //El evento "keyup" se dispara cuando se suelta una tecla
	input.addEventListener('keyup', () => {
        console.log('Tecla Levantada');
    });
});
    
 
const validarFormulario = (e) => {
// e contiene información sobre el evento que ocurrió
// Los atributos "name" y "value" son comunes en elementos de formulario, como <input>
// e.target.name: Devuelve el valor del atributo "name" del elemento
// e.target.value: Devuelve el valor actual del elemento
// .test() para verificar si una expresión regular tiene una coincidencia en una cadena de texto. Retorna true si se encuentra una coincidencia y false si no se encuentra ninguna.
//classList es una propiedad de los elementos DOM en JavaScript que permite acceder y modificar las clases CSS de un elemento
// add(), remove(), contains() y replace()

    console.log("name = " + e.target.name  + " value = " + e.target.value + " test = " + expresiones.usuario.test(e.target.value))//Ocultar
    

	switch (e.target.name) {
		case "usuario":
            if(expresiones.usuario.test(e.target.value)){

                document.getElementById('grupo__usuario').classList.remove('formulario__grupo-incorrecto');
                document.getElementById('grupo__usuario').classList.add('formulario__grupo-correcto'); //poner icono en verde
                document.querySelector('#grupo__usuario i').classList.remove('fa-times-circle');
                document.querySelector('#grupo__usuario i').classList.add('fa-check-circle');
                document.querySelector('#grupo__usuario .formulario__input-error').classList.remove('formulario__input-error-activo');
               
            } else {

                document.getElementById('grupo__usuario').classList.add('formulario__grupo-incorrecto'); // poner label, input e icono en rojo
                document.getElementById('grupo__usuario').classList.remove('formulario__grupo-correcto');  
                document.querySelector('#grupo__usuario i').classList.add('fa-times-circle'); // poner tache
                document.querySelector('#grupo__usuario i').classList.remove('fa-check-circle'); // quitar palomita
                document.querySelector('#grupo__usuario .formulario__input-error').classList.add('formulario__input-error-activo'); // mensaje de error en input    
            }

		break;
		
		case "correo":
          
		break;
		
	}//switch
}//funcion validarFormulario


END BORRADOR
*/ 