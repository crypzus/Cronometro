
//se declaran primero los elemento que necesitamos del dom 
const  cronometro = document.getElementById('cronometro');
const btnInicioPausa = document.getElementById('boton-inicio-pausa');
const  btnReiniciar = document.getElementById ('boton-reiniciar');
// variable para el cronometro
let [horas, minutos, segundos] = [0,0,0];
let intervaloTiempo;
let estadoCronometro = 'pausado';

//funccion para actualizar el cronometro
function actualizarCronometro() {
  segundos++;
  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;
    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }
  formatearCronometro();
};
  

  function formatearCronometro(){
    // se le da formaTo al conometro con la funcion formatearNumero para cuando sea unidad salga el cero adelante
    let segundoConFormatos = formatearNumero(segundos);
    let minutosConFormatos = formatearNumero(minutos);
    let horasConFormatos = formatearNumero(horas);

    //se aplica el formato del cronometro con las variables ya definidas
    cronometro.innerText = `${horasConFormatos}:${minutosConFormatos}:${segundoConFormatos}`;

};

//// Función para asignar el formato con cero adelante cuando sea necesario
function formatearNumero(unidadTiempo){ 
  return unidadTiempo < 10 ? '0' + unidadTiempo: unidadTiempo;
};

//funcion para iniciar  o pausar le cronometro
function inicioPausa(){
  
  if (estadoCronometro === 'pausado') {
    intervaloTiempo = setInterval(actualizarCronometro, 1000);

    btnInicioPausa.innerHTML = '<i class="bi bi-pause-circle"></i>';
    btnInicioPausa.classList.remove('iniciar');
    btnInicioPausa.classList.add('pausar');
    estadoCronometro = 'activo';
    
  }else{
    clearInterval(intervaloTiempo);
    btnInicioPausa.innerHTML = '<i class="bi bi-play-circle"></i>';
    btnInicioPausa.classList.remove('pausado');
    btnInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
};

//funcion para reiniciar el cronometro 
function reiniciar(){
  clearInterval(intervaloTiempo);
  [horas, minutos, segundos] =[0, 0, 0];
  cronometro.innerText = '00:00:00';
  formatearCronometro();
  btnInicioPausa.innerHTML = '<i class="bi bi-play-circle"></i>';
  btnInicioPausa.classList.remove('pausar');
  btnInicioPausa.classList.add('iniciar');

  estadoCronometro = 'pausado';
};


//evento listeners para los botones
btnInicioPausa.addEventListener('click', inicioPausa)
btnReiniciar.addEventListener('click', reiniciar)

//formatear el cronometro inicialmente
formatearCronometro();