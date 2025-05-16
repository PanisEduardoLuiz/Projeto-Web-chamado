document.addEventListener('DOMContentLoaded', () => {
  const tabelaChamados = document.getElementById('tabelaChamados');
  const btnBuscar = document.getElementById('btnBuscar');
  
  function carregarChamados(filtros = {}) {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    let chamadosFiltrados = eventos;
    
    if (filtros.os) {
      chamadosFiltrados = chamadosFiltrados.filter(e => 
        e.os.toLowerCase().includes(filtros.os.toLowerCase())
      );
    }
    
    if (filtros.responsavel) {
      chamadosFiltrados = chamadosFiltrados.filter(e => 
        e.responsavel === filtros.responsavel
      );
    }
    
    if (filtros.status) {
      chamadosFiltrados = chamadosFiltrados.filter(e => 
        e.status === filtros.status
      );
    }
    
    tabelaChamados.innerHTML = chamadosFiltrados.map(evento => `
      <tr>
        <td>${evento.os}</td>
        <td>${evento.titulo}</td>
        <td>${evento.responsavel}</td>
        <td>${evento.status}</td>
        <td>
          <button onclick="editarOS('${evento.os}')" class="btn-editar">Editar</button>
          <button onclick="finalizarOS('${evento.os}')" class="btn-finalizar">
            ${evento.status === 'Finalizado' ? 'Reabrir' : 'Finalizar'}
          </button>
        </td>
      </tr>
    `).join('');
  }
  
  window.editarOS = (os) => {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const evento = eventos.find(e => e.os === os);
    if (evento) {
      localStorage.setItem('osParaEditar', JSON.stringify(evento));
      window.location.href = 'cadastroOs.html';
    }
  };
  
  window.finalizarOS = (os) => {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const index = eventos.findIndex(e => e.os === os);
    if (index !== -1) {
      eventos[index].status = eventos[index].status === 'Finalizado' ? 'Em atendimento' : 'Finalizado';
      localStorage.setItem('eventos', JSON.stringify(eventos));
      carregarChamados();
    }
  };
  
  btnBuscar.addEventListener('click', () => {
    const filtros = {
      os: document.getElementById('filtroOS').value,
      responsavel: document.getElementById('filtroResponsavel').value,
      status: document.getElementById('filtroStatus').value
    };
    carregarChamados(filtros);
  });
  
  carregarChamados();
});