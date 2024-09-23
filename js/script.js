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

const selectRegisterTypeElement = document.getElementById("register-type");

const btnDialogRegister = document.getElementById("btn-dialog-register");
btnDialogRegister.addEventListener("click", async () => {
    let register = await getObjectRegister(selectRegisterTypeElement.value);
    saveRegisterLocalStorage(register);
});


async function getObjectRegister(registerType) {
    let location = await getUserLocation();
    
    const ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": location,
        "id": 1, // Você pode usar um id dinâmico aqui
        "type": registerType
    };
    return ponto;
}

const btnDialogFechar = document.getElementById("dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

let registerslocalStorage = getRegisterLocalStorage("register");

function saveRegisterLocalStorage(register) {
    registerslocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registerslocalStorage));
}

function getRegisterLocalStorage(key) {
    let registers = localStorage.getItem(key);
    if (!registers) {
        return [];
    }
    return JSON.parse(registers);
}

async function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "lat": position.coords.latitude,
                "long": position.coords.longitude
            };
            resolve(userLocation);
        }, () => {
            reject({
                "lat": "N/A",
                "long": "N/A"
            });
        });
    });
}

function register() {
    dialogPonto.showModal();
}

function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}

function getCurrentTime() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date(); 
    let mes = date.getMonth() + 1;
    return String(date.getDate()).padStart(2, '0') + "/" + String(mes).padStart(2, '0') + "/" +  String(date.getFullYear());
}

function getWeekDay() {
    const date = new Date();
    const day = date.getDay();
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daynames[day];
}

updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getCurrentTime());
console.log(getCurrentDate());
console.log(getWeekDay());
