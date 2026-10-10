// DADOS LOCAIS DO APP
const planoLeitura = [
    "Gênesis 1 - 3", "Gênesis 4 - 6", "Mateus 1 - 2", "Salmos 1 - 5", "João 1 - 3"
];

// AO CARREGAR
document.addEventListener('DOMContentLoaded', () => {
    carregarAvisos();
    renderizarPlanoLeitura();
});

// ABRIR / FECHAR MODAIS DO TOPO
function abrirModalLogin() { fecharModais(); document.getElementById('modalLogin').style.display = 'flex'; }
function abrirModalCultos() { fecharModais(); document.getElementById('modalCultos').style.display = 'flex'; }
function abrirModalLive() { fecharModais(); document.getElementById('modalLive').style.display = 'flex'; }
function abrirModalPix() { fecharModais(); document.getElementById('modalPix').style.display = 'flex'; }
function abrirModalOracao() { fecharModais(); document.getElementById('modalOracao').style.display = 'flex'; }

function fecharModais() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
}

// ALTERNAR ENTRE LOGIN E CADASTRO
function alternarTabAuth(tab) {
    const isLogin = tab === 'login';
    document.getElementById('formLogin').style.display = isLogin ? 'block' : 'none';
    document.getElementById('formCad').style.display = isLogin ? 'none' : 'block';
    document.getElementById('tabBtnLogin').classList.toggle('active', isLogin);
    document.getElementById('tabBtnCad').classList.toggle('active', !isLogin);
}

// LOGINS E CADASTRO
function executarCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const email = document.getElementById('cadEmail').value;
    
    let membros = JSON.parse(localStorage.getItem('membros_adp') || '[]');
    membros.push({ nome, email });
    localStorage.setItem('membros_adp', JSON.stringify(membros));

    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    alternarTabAuth('login');
}

function executarLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    
    fecharModais();
    document.getElementById('site-publico').style.display = 'none';
    document.getElementById('area-membro').style.display = 'flex';
    document.getElementById('membroNome').innerText = email.split('@')[0];
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function logoutMembro() {
    document.getElementById('area-membro').style.display = 'none';
    document.getElementById('site-publico').style.display = 'block';
}

// NAVEGAÇÃO INTERNA DO MEMBRO
function navegarMembro(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.side-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// COPIAR CHAVE PIX
function copiarChavePix() {
    navigator.clipboard.writeText("99986973104").then(() => {
        alert("Chave PIX (CPF 999.869.731-04) copiada com sucesso!");
    });
}

// ENVIAR ORAÇÃO PÚBLICA
function enviarOracaoPublica(e) {
    e.preventDefault();
    const nome = document.getElementById('oracaoNome').value || "Anônimo";
    const texto = document.getElementById('oracaoTexto').value;
    const msg = encodeURIComponent(`*PEDIDO DE ORAÇÃO - ADP PENIEL*\n*Nome:* ${nome}\n*Pedido:* ${texto}`);
    
    window.open(`https://api.whatsapp.com/send?phone=5563999869731&text=${msg}`, '_blank');
    fecharModais();
}

// CARREGAR AVISOS
function carregarAvisos() {
    const mural = document.getElementById('muralPublico');
    const muralMembro = document.getElementById('muralMembro');
    const avisos = JSON.parse(localStorage.getItem('avisos_adp') || '[]');

    const html = avisos.length ? avisos.map(a => `
        <div class="aviso-item">
            <h4>${a.titulo}</h4>
            <p>${a.texto}</p>
        </div>
    `).join('') : '<div class="aviso-item"><p>Nenhum aviso no momento.</p></div>';

    if(mural) mural.innerHTML = html;
    if(muralMembro) muralMembro.innerHTML = html;
}

// PLANO DE LEITURA
function renderizarPlanoLeitura() {
    const container = document.getElementById('listaPlanoLeitura');
    const progresso = JSON.parse(localStorage.getItem('progresso_leitura_adp') || '{}');

    container.innerHTML = planoLeitura.map((cap, i) => `
        <label class="check-item">
            <input type="checkbox" ${progresso[i] ? 'checked' : ''} onchange="salvarLeitura(${i}, this.checked)">
            <span>${cap}</span>
        </label>
    `).join('');
}

function salvarLeitura(index, checado) {
    let progresso = JSON.parse(localStorage.getItem('progresso_leitura_adp') || '{}');
    progresso[index] = checado;
    localStorage.setItem('progresso_leitura_adp', JSON.stringify(progresso));
}