document.addEventListener('DOMContentLoaded', () => {
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  const tabela = document.getElementById('tabelaChamados');
  const filtroOS = document.getElementById('filtroOS');
  const filtroResponsavel = document.getElementById('filtroResponsavel');
  const filtroStatus = document.getElementById('filtroStatus');
  const btnBuscar = document.getElementById('btnBuscar');

  function renderTabela(lista) {
    tabela.innerHTML = '';
    lista.forEach((e, i) => {
      const statusColor = e.status === 'Finalizado' ? 'style="color: green; font-weight: bold;"' : '';
      
      // Define os botões conforme o status e flag de reabertura
      let acoes = '';
      if (e.status === 'Em atendimento') {
        acoes = `
          <button onclick="editar(${i})">Editar</button>
          <button onclick="finalizar(${i})">Finalizar</button>
        `;
      } else if (e.status === 'Finalizado' && e.reaberto) {
        // Caso já tenha sido reaberto uma vez, pode editar, mas não reabrir de novo
        acoes = `
          <button onclick="editar(${i})">Editar</button>
        `;
      } else if (e.status === 'Finalizado') {
        // Nunca reaberto, botão para reabrir
        acoes = `
          <button onclick="reabrir(${i})">Reabrir</button>
        `;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${e.os}</td>
        <td>${e.titulo}</td>
        <td>${e.responsavel}</td>
        <td ${statusColor}>${e.status}</td>
        <td>${acoes}</td>
      `;
      tabela.appendChild(tr);
    });
  }

  function aplicarFiltros() {
    const os = filtroOS.value.trim();
    const responsavel = filtroResponsavel.value;
    const status = filtroStatus.value;

    const filtrados = eventos.filter(e => {
      return (
        (!os || e.os.includes(os)) &&
        (!responsavel || e.responsavel === responsavel) &&
        (!status || e.status === status)
      );
    });

    renderTabela(filtrados);
  }

  window.editar = (index) => {
    const os = eventos[index];
    if (os.status === 'Finalizado' && !os.reaberto) {
      alert('Este chamado está finalizado e não pode ser editado. Reabra para editar.');
      return;
    }
    localStorage.setItem('osParaEditar', JSON.stringify(os));
    window.location.href = 'cadastroOs.html';
  };

  window.finalizar = (index) => {
    if (!confirm('Deseja finalizar esta OS?')) return;
    eventos[index].status = 'Finalizado';
    localStorage.setItem('eventos', JSON.stringify(eventos));
    aplicarFiltros();
  };

  window.reabrir = (index) => {
    if (!confirm('Deseja reabrir este chamado para edição? Após reaberto, só poderá ser editado uma vez.')) return;
    eventos[index].status = 'Em atendimento';
    eventos[index].reaberto = true; // marca que já foi reaberto uma vez
    localStorage.setItem('eventos', JSON.stringify(eventos));
    aplicarFiltros();
  };

  btnBuscar.addEventListener('click', aplicarFiltros);

  renderTabela(eventos);
});
