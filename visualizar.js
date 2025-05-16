document.addEventListener('DOMContentLoaded', () => {
  const os = JSON.parse(localStorage.getItem('osParaVisualizar'));
  if (!os) return;

  document.getElementById('osNumero').textContent = os.os || '';
  document.getElementById('nome').textContent = os.nome || '';
  document.getElementById('titulo').textContent = os.titulo || '';
  document.getElementById('descricao').textContent = os.descricao || '';
  document.getElementById('dataHora').textContent = os.dataHora || '';
  document.getElementById('telefone').textContent = os.telefone || '';
  document.getElementById('email').textContent = os.email || '';
  document.getElementById('tipoDemanda').textContent = os.tipoDemanda || '';
  document.getElementById('linkMidia').href = os.midia || '#';

  // Campos exclusivos de funcionários
  if (os.atendidoPor || os.prioridade || os.situacao || os.andamento || os.nota) {
    document.querySelectorAll('.somente-funcionario').forEach(el => el.style.display = 'block');
    document.getElementById('atendidoPor').textContent = os.atendidoPor || '';
    document.getElementById('prioridade').textContent = os.prioridade || '';
    document.getElementById('situacao').textContent = os.situacao || '';
    document.getElementById('andamento').textContent = os.andamento || '';
    document.getElementById('nota').textContent = os.nota || '';
  }

  // Histórico
  const listaHistorico = document.getElementById('listaHistorico');
  if (os.historico && Array.isArray(os.historico)) {
    listaHistorico.innerHTML = os.historico.map(item => `<li>${item}</li>`).join('');
  } else {
    listaHistorico.innerHTML = '<li>Sem histórico registrado.</li>';
  }
});

// Função para botão Voltar
function voltar() {
  window.location.href = 'home.html';
}
