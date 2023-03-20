//Definimos las variables globales que usarem os a lo largo del programa.
const precioVuelo = 50.0; //Valor del voleto
const destino1 = "Matruin - Caracas"; //Destino
const horaSalidaMaturin = "3:30 pm"; //Horario de salida
const horaSalidaCaracas = "5:45 pm";
const numAsientos = 100; //Numero maximos de asientos
const numBoletos = parseInt(document.getElementById("ticketCountInput").value);
// Modificamos el array de asientos para que cada elemento sea un objeto con una propiedad 'numeroAsiento' y una propiedad 'reservado'

const tipoVueloSelecc = document.getElementById("flightTypeSelect");
const fechaSalida = document.getElementById("departureDateInput");
const fechaRegreso = document.getElementById("returnDateInput");


const asientoNumSelecc = document.getElementById("asientos-selects");

const numTickets = document.getElementById("ticketCountInput");
const nombre = document.getElementById("firstNameInput");
const apellido = document.getElementById("lastNameInput");
const idnum = document.getElementById("idNumberInput");
const botonComprar = document.getElementById("buyButton");
const recibo = document.getElementById("receiptDiv");
const fechaRetornoDiv = document.getElementById("returnDateDiv");

const asientos = [...Array(numAsientos)].map((elem, i) => {
  return {
    numeroAsiento: i + 1,
    reservado: false,
  };
});
 
  
function asignarAsientos() {

  const asientosSeleccionados = [];
  // Obtener los valores seleccionados en los selects de asientos
  const select = document.querySelectorAll("#asientos-selects select");
  
  for (let i = 0; i < select.length; i++) {
    asientosSeleccionados.push(select[i].value);
  }

  // Verificar que no se hayan seleccionado asientos duplicados
  const asientosUnicos = [...new Set(asientosSeleccionados)];
  if (asientosUnicos.length < numBoletos) {
    alert("No puedes seleccionar el mismo asiento para más de un boleto.");
    return null;
  }

  // Asignar los asientos a los boletos
  const boletosAsignados = [];
  for (let i = 0; i < numBoletos; i++) {
    boletosAsignados.push(asientosSeleccionados[i]);
  }

  // Mostrar los asientos asignados
  return asientosSeleccionados;
}

// Ejemplo de cómo obtener los asientos asignados

function generarSelectAsientos(numBoletos) {
  const container = document.getElementById("asientos-selects");
  container.innerHTML = "";
  for (let i = 0; i < numBoletos; i++) {
    const select = document.createElement("select");

    for (let j = 1; j <= 100; j++) {
      const option = document.createElement("option");
      option.value = `Asiento ${j}`;
      option.text = `Asiento ${j}`;
      select.appendChild(option);
    }
    container.appendChild(select);
  }
}





function imprimirRecibos(boletosAsignados, purchase) {
  for (let i = 0; i < boletosAsignados.length; i++) {
    // Crear el recibo de compra
    const receipt = `
      <p><strong>Destino:</strong> ${purchase.destino1}</p>
      <p><strong>Hora de Salida:</strong> ${purchase.horaSalidaMaturin}</p>
      <p><strong>Tipo de Vuelo:</strong> ${purchase.flightType}</p>
      <p><strong>Fecha de Ida:</strong> ${
        purchase.departureDate
          ? purchase.departureDate.toLocaleDateString()
          : "N/A"
      }</p>
      <p><strong>Fecha de Regreso:</strong> ${
        purchase.returnDate ? purchase.returnDate.toLocaleDateString() : "N/A"
      }</p>
      <p><strong>Cantidad de Boletos:</strong> ${purchase.ticketCount}</p>
      <p><strong>Asiento:</strong> ${boletosAsignados[i]}</p>
      <p><strong>Nombre del Comprador:</strong> ${purchase.firstName} ${
      purchase.lastName
    }</p>
      <p><strong>Número de Identidad:</strong> ${purchase.idNumber}</p>
      <p><strong>Precio Total:</strong> $${
        !isNaN(purchase.totalPrice) ? purchase.totalPrice.toFixed(2) : "N/A"
      }</p>
    `;

    // Crear un elemento div para el recibo y agregarlo al DOM
    const reciboDiv = document.createElement("div");
    reciboDiv.innerHTML = receipt;
    recibo.appendChild(reciboDiv);
  }
}

//Obtenemos los elementos del DOM con los que interactua el Usuario.
let seat=[];

numTickets.addEventListener("change", (e) => {
  generarSelectAsientos(e.target.value);
  
});

asientoNumSelecc.addEventListener("change",e=>{


  seat=asignarAsientos();

  console.log(seat);


});


// agregar evento change al elemento select
tipoVueloSelecc.addEventListener("change", () => {
  // mostrar u ocultar div dependiendo de la selección del usuario
  if (tipoVueloSelecc.value === "Ida y Vuelta") {
    fechaRetornoDiv.style.display = "block";
  } else {
    fechaRetornoDiv.style.display = "none";
  }
});

//validar la fecha.

fechaSalida.addEventListener("change", (e) => {
  validarFecha();
});
fechaRegreso.addEventListener("change", (e) => {
  validarFecha();
});

function validarFecha() {
  const departureDate = new Date(fechaSalida.value);
  const hoy = new Date();
  const timeDiff = departureDate.getTime() - hoy.getTime();
  const diffDays = timeDiff / (1000 * 3600 * 24);

  if (departureDate < hoy || diffDays < 1) {
    alert("La fecha de salida debe ser posterior a hoy.");
    return false;
  }

  return true;
}

// Función que valida si todos los campos están llenos
function validateForm() {

  if (
    !tipoVueloSelecc.value ||
    !numTickets.value ||
    !nombre.value ||
    !apellido.value ||
    !idnum.value
  ) {
    alert("Por favor llene todos los campos."); // Mostramos un mensaje de error si algún campo está vacío
    return false;
  }

  if (!asientoNumSelecc) {
    alert("Por favor seleccione un asiento."); // Mostramos un mensaje de error si no se ha seleccionado un asiento
    return false;
  }

  return true;
}







botonComprar.addEventListener("click", e=> {
  e.preventDefault();
  // Validar el formulario

    for (let i = 0; i < seat.length; i++) {
      
      

      console.log(seat[i]);
      generarReciboCompra(
        tipoVueloSelecc.value,
        fechaSalida.value,
        fechaRegreso.value,
        seat[i],
        numTickets.value,
        nombre.value,
        apellido.value,
        idnum.value
      );

    }
      

});


    function generarReciboCompra(tipoVuelo, fechaSalidaVal, fechaRegresoVal, asientoSeleccionado, numTicketsVal, nombreVal, apellidoVal, idnumVal) {
      
      if (!validateForm()) {
        return; // Salimos de la función si hay algún error
      }
      const recibo = document.createElement("div");
      recibo.classList.add("recibo");
    
      // Agregar el contenido del recibo
      const contenidoRecibo = `
        <h2>Recibo de compra</h2>
        <p><strong>Tipo de vuelo:</strong> ${tipoVuelo}</p>
        <p><strong>Fecha de salida:</strong> ${fechaSalidaVal}</p>
        <p><strong>Fecha de regreso:</strong> ${fechaRegresoVal}</p>
        <p><strong>Asiento seleccionado:</strong> ${asientoSeleccionado}</p>
        <p><strong>Número de tickets:</strong> ${numTicketsVal}</p>
        <p><strong>Nombre:</strong> ${nombreVal}</p>
        <p><strong>Apellido:</strong> ${apellidoVal}</p>
        <p><strong>ID:</strong> ${idnumVal}</p>
      `;

      recibo.innerHTML = contenidoRecibo;
    
      // Agregar el recibo al DOM
      const reciboContainer = document.getElementById("receiptDiv");
      reciboContainer.appendChild(recibo);
    }

 
  





