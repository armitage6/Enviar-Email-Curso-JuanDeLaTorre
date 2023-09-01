//Se ejecuta una vez todo el codigo html ha sido descargado

document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    //Seleccionar los elementos de la interfaz 

    const inputEmail = document.querySelector('#email'); //Cuando seleccione un elemento lo tengo que enviar a la consola
    const inputAsunto = document.querySelector('#asunto'); //Cuando seleccione un elemento lo tengo que enviar a la consola
    const inputMensaje = document.querySelector('#mensaje'); //Cuando seleccione un elemento lo tengo que enviar a la consola
    const formulario = document.querySelector('#formulario');
    const btnSumbit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner')




    //Evento especificos para la tarea que queremos hacer

    //Asignar eventos

    // inputEmail.addEventListener('blur', function (e) { //Cuando este evento ocurra se ejecuta la funcion, callback
    //     console.log(e.target.value) // El value es el valor que ingresamos 
    // });

    inputEmail.addEventListener('blur', validar) // LA funcion se manda a llamar cuando ocurra el evento

    inputAsunto.addEventListener('blur', validar);

    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        //Reiniciar el objeto
        resetFormulario();

    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario()

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove()
            }, 3000)

        }, 3000)
    }

    function validar(e) {
        //nextElementSibling, es elemento siguiente

        if (e.target.value.trim() === '') {
            mostrarAlerta(`El Cambo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' === !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es válido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement);


        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();

    }

    function mostrarAlerta(mesaje, referencia) {

        limpiarAlerta(referencia)

        // Generar alerta en HTML 
        const error = document.createElement('P');
        error.textContent = mesaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        //Inyecar el erro al formulario 

        //formulario.innertHTML = error.innerHTML, esto lo agrega pero boorra todo el contenido anterior

        referencia.appendChild(error); // Agrega un elemento a uno ya existente 
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600'); //busca el elemento que tenga la clase solo en ese div que seleccionamos con e.target.parentElement
        if (alerta) {
            alerta.remove()
        }
    }


    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //Expresion regular que va a buscar un patron en una adena de texto o ua serie de numeros

        const resultado = regex.test(email) //Metodo que se le pasa para ver que quiero validar con esta expresion regegular
        return resultado

    }


    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSumbit.classList.add('opacity-50');
            btnSumbit.disabled = true;
            return
        }

        btnSumbit.classList.remove('opacity-50');
        btnSumbit.disabled = false
    }



    function resetFormulario() {
        //Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';


        formulario.reset();
        comprobarEmail();
    }
});