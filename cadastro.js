document.addEventListener('DOMContentLoaded', () => {
  const numeroOS = document.getElementById('numeroOS');
  const dataHora = document.getElementById('dataHora');
  const osParaEditar = JSON.parse(localStorage.getItem('osParaEditar'));

  if (osParaEditar) {
    numeroOS.value = osParaEditar.os;
    document.getElementById('nome').value = osParaEditar.nome;
    document.getElementById('titulo').value = osParaEditar.titulo;
    document.getElementById('descricao').value = osParaEditar.descricao;
    dataHora.value = osParaEditar.dataHora;
    document.getElementById('telefone').value = osParaEditar.telefone;
    document.getElementById('email').value = osParaEditar.email;
    document.getElementById('prioridade').value = osParaEditar.prioridade;
    document.getElementById('responsavel').value = osParaEditar.responsavel;
  } else {
    numeroOS.value = Math.floor(Math.random() * 100000);
    dataHora.value = new Date().toLocaleString();
  }

  const form = document.getElementById('formCadastro');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const leitor = new FileReader();
    const midia = document.getElementById('midia').files[0];

    leitor.onload = () => {
      const os = {
        os: numeroOS.value,
        nome: document.getElementById('nome').value,
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        dataHora: dataHora.value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        prioridade: document.getElementById('prioridade').value,
        midia: leitor.result || '',
        responsavel: document.getElementById('responsavel').value,
        status: osParaEditar ? osParaEditar.status : 'Em atendimento'
      };

      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      const index = eventos.findIndex(e => e.os === os.os);

      if (index !== -1) {
        eventos[index] = os;
      } else {
        eventos.push(os);
      }

      localStorage.setItem('eventos', JSON.stringify(eventos));
      localStorage.removeItem('osParaEditar');
      alert('OS salva com sucesso!');
      window.location.href = 'home.html';
    };

    if (midia) leitor.readAsDataURL(midia);
    else leitor.onload();
  });
});