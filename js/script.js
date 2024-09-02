
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
});
  


const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

btnRegistrarPonto.addEventListener("click", register);

diaSemana.textContent = getWeekDay(); 
dataAtual.textContent = getCurrentDate();

const dialogPonto = document.getElementById("dialog-ponto");

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = getCurrentDate();


const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = getCurrentTime();


const btnDialogFechar = document.getElementById("dialog-fechar");

btnDialogFechar.addEventListener("click",() => {
    dialogPonto.close();
})

function register(){
   dialogPonto.showModal();
    //dialog é o elemento dialogPonto
    // e o método que abre o dialog em estilo modal é o showDialog()
}



function updateContentHour(){
   horaAtual.textContent = getCurrentTime();
    
}
const date = new Date();

// Retorna a hora atual no formato hh:mm:ss
function getCurrentTime() {
    const date = new Date();
    return date.getHours().toString().padStart(2, '0') + ":" + 
           date.getMinutes().toString().padStart(2, '0') + ":" + 
           date.getSeconds().toString().padStart(2, '0');
}

// Retorna a data atual no padrão dd/mm/aaaa
function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

function getWeekDay(){
    const date = new Date()
    const day = date.getDay()
    const daynames = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira,", "Sexta-Feira", "Sábado"];
    return daynames [day];
    
}
updateContentHour();
setInterval(updateContentHour, 1000);

// Verifica e obtém o timestamp atual em milissegundos
var timeInMs = Date.now();
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

console.log("Hora atual:", getCurrentTime());
console.log("Data atual:", getCurrentDate());
console.log("Timestamp atual em ms:", timeInMs);
