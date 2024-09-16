 // Elementos da interface
 const diaSemana = document.getElementById("dia-semana");
 const dataAtual = document.getElementById("data-atual");
 const horaAtual = document.getElementById("hora-atual");
 const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
 const dialogPonto = document.getElementById("dialog-ponto");
 const dialogData = document.getElementById("dialog-data");
 const dialogHora = document.getElementById("dialog-hora");
 const selectRegisterType = document.getElementById("register-type");
 const mensagemElement = document.getElementById("mensagem");

 // Inicializa conteúdo de data e hora
 diaSemana.textContent = getWeekDay();
 dataAtual.textContent = getCurrentDate();
 updateContentHour();
 setInterval(updateContentHour, 1000);

 // Função para abrir o modal de registro de ponto
 btnRegistrarPonto.addEventListener("click", register);

 // Função para confirmar o registro do ponto
 const btnDialogRegister = document.getElementById("btn-dialog-register");
 btnDialogRegister.addEventListener("click", () => {
     let register = getObjectRegister(selectRegisterType.value);
     saveRegisterLocalStorage(register);
     localStorage.setItem("lastRegisterType", selectRegisterType.value);
     showStatusMessage(register.type);
     dialogPonto.close();
 });

 // Fecha o modal
 const btnDialogFechar = document.getElementById("dialog-fechar");
 btnDialogFechar.addEventListener("click", () => {
     dialogPonto.close();
 });

 // Função que cria o objeto de registro de ponto
 function getObjectRegister(registerType) {
     return {
         date: getCurrentDate(),
         time: getCurrentTime(),
         location: getUserLocation(),
         id: 1,
         type: registerType
     };
 }

 // Salva o registro de ponto no localStorage
 function saveRegisterLocalStorage(register) {
     let registers = getRegisterLocalStorage("register");
     registers.push(register);
     localStorage.setItem("register", JSON.stringify(registers));
 }

 // Recupera registros de ponto do localStorage
 function getRegisterLocalStorage(key) {
     let registers = localStorage.getItem(key);
     return registers ? JSON.parse(registers) : [];
 }

 // Atualiza a hora atual no display
 function updateContentHour() {
     horaAtual.textContent = getCurrentTime();
 }

 // Retorna a hora atual (hora:minuto:segundo)
 function getCurrentTime() {
     const date = new Date();
     return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
 }

 // Retorna a data atual no formato dd/mm/aaaa
 function getCurrentDate() {
     const date = new Date();
     return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(2, '0');
 }

 // Retorna o dia da semana
 function getWeekDay() {
     const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
     return daynames[new Date().getDay()];
 }

 // Simula o registro de ponto e exibe status de sucesso ou falha
 function showStatusMessage(type) {
     const sucesso = Math.random() > 0.5; // Simulação de sucesso ou falha
     mensagemElement.innerText = sucesso 
         ? `Registro de ${type} efetuado com sucesso!` 
         : `Falha ao registrar ${type}. Tente novamente.`;

     mensagemElement.className = sucesso ? "mensagem-sucesso visivel" : "mensagem-falha visivel";

     // Remove a mensagem após 3 segundos
     setTimeout(() => {
         mensagemElement.classList.remove('visivel');
     }, 3000);
 }

 // Abre o modal de registro de ponto e preenche com data/hora atuais
 function register() {
     dialogData.textContent = getCurrentDate();
     dialogHora.textContent = getCurrentTime();
     dialogPonto.showModal();
 }

 // Função para obter a localização do usuário (de forma assíncrona)
 function getUserLocation() {
     return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition((position) => {
             resolve({
                 lat: position.coords.latitude,
                 long: position.coords.longitude
             });
         }, (error) => {
             reject("Localização não disponível");
         });
     });
 }
 console.log