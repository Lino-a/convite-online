// Desenvolvedor @_d.lino //

// ===========================    Identificações    =========================== //

const container_btn_confirmar_presenca = document.getElementById('container_btn_confirmar_presenca');
const btn_confirmar_presenca = document.getElementById('btn_confirmar_presenca');
const container_form = document.getElementById('container_form');

// ===========================         BTN          =========================== //

btn_confirmar_presenca.addEventListener('click', ()=>{
    container_form.style.display = 'flex';
    container_btn_confirmar_presenca.style.display = 'none';

    window.scrollTo({
        top: 1000, // Posição desejada em pixels //
        behavior: 'smooth'
    });
});

// =========================== Contagem Regressiva ============================ //

var countDownDate = new Date('March 02, 2024 10:00:00').getTime(); // Data do evento //

var x = setInterval(() => {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days + ' Dias';
    document.getElementById('hours').innerHTML = hours + ' Hr';
    document.getElementById('minutes').innerHTML = minutes + ' Min';
    document.getElementById('seconds').innerHTML = seconds + ' Seg';

    if (distance < 0) {
        clearInterval(x);
        document.getElementById('countdown').innerHTML = 'Parabéns!!!'; // Mensagem exibida quando a contagem chegar a zero //
    }
}, 1000);

// =========================== Enviar o formulário com AJAX =========================== //

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário //

    var nome = document.getElementById('nome').value;
    var parentesco = document.getElementById('parentesco').value;
    var cor = document.getElementById('cor').value;
    var comidas = document.getElementById('comidas').value;
    var bebidas = document.getElementById('bebidas').value;

    if (!nome || !parentesco || !cor || !comidas || !bebidas) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    this.submit(); // Se todos os campos estiverem preenchidos, permite o envio do formulário //
});

window.onload = function() {
    // Requisição AJAX para obter dados da tabela de pessoas
    fetch('/dados-pessoas')
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('corpoTabela');
        data.forEach(pessoas => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pessoas.nome}</td>
                <td>${pessoas.parentesco}</td>
                <td>${pessoas.cor}</td>
                <td>${pessoas.comidas}</td>
                <td>${pessoas.bebidas}</td>
            `;
            tbody.appendChild(tr);
        });
        
        window.scrollTo({
            top: 1000, // Posição desejada em pixels //
            behavior: 'smooth'
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });
};

// ===========================              MAPS            =========================== //

var map = L.map('mapid').setView([-22.905075584776075, -43.2217961322461], 13); // Latitude e Longitude: [-22.905075584776075, -43.2217961322461] //

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

L.marker([-22.905075584776075, -43.2217961322461]).addTo(map) // Latitude e Longitude: [-22.905075584776075, -43.2217961322461] //
    .bindPopup('Ponto de Encontro!').openPopup();

// Site com a documentação do mapa https://leafletjs.com/