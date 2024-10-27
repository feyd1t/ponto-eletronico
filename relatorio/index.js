let currentPage = 1;
const recordsPerPage = 5;

// Simulação de login (qualquer usuário)
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cpf = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const cpfRegex = /^[0-9]{11}$/;
    if (cpfRegex.test(cpf) && password) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainSection').style.display = 'block';
    } else {
        document.getElementById('loginError').textContent = 'Por favor, insira um CPF e senha válidos';
    }
});

// Função para registrar ponto
const formPonto = document.getElementById('formPonto');
formPonto.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const justificativa = document.getElementById('justificativa').files[0];
    const observacao = document.getElementById('observacao').value;

    const hoje = new Date().toISOString().split('T')[0];
    if (data > hoje) {
        alert('Não é permitido registrar ponto em datas futuras!');
        return;
    }

    const registro = {
        data,
        hora,
        justificativa: justificativa ? justificativa.name : '',
        observacao
    };

    salvarRegistro(registro);
    formPonto.reset();
    carregarRegistros();
});

// Função de upload (simulação)
function uploadArquivo(file) {
    return new Promise((resolve) => {
        // Simulação de upload de arquivo
        setTimeout(() => {
            resolve(`Arquivo ${file.name} foi carregado.`);
        }, 1000);
    });
}

// Função para salvar registro no localStorage
function salvarRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));
}

// Função para carregar registros com paginação
function carregarRegistros() {
    const tbody = document.querySelector('#relatorio tbody');
    tbody.innerHTML = ''; // Limpar registros antigos
    
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const totalPages = Math.ceil(registros.length / recordsPerPage);

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const registrosPaginados = registros.slice(start, end);

    registrosPaginados.forEach((registro, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${registro.data}</td>
            <td>${registro.hora}</td>
            <td>${registro.justificativa || '-'}</td>
            <td>${registro.observacao || '-'}</td>
            <td>
                <button onclick="editarRegistro(${start + index})">Editar</button>
                <button onclick="excluirRegistro(${start + index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`;
}

// Funções de navegação (paginação)
function nextPage() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const totalPages = Math.ceil(registros.length / recordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        carregarRegistros();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        carregarRegistros();
    }
}

// Função de filtragem por período
function filtrarPeriodo(periodo) {
    // Implementação simples para filtragem de registros (exemplo)
    console.log(`Filtrando registros por: ${periodo}`);
}

// Função para editar um registro
function editarRegistro(index) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const registro = registros[index];
    alert(`Editar registro: ${JSON.stringify(registro)}`);
    // Aqui você pode implementar o código para editar o registro
}

// Função para excluir um registro
/*function excluirRegistro(index) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
    carregarRegistros();
}

// Carregar registros na primeira execução
carregarRegistros();*/
 