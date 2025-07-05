const botao = document.getElementById('carregarConselhos');
const lista = document.getElementById('listaConselhos');
const loader = document.getElementById('loader');

const TOTAL_CONSELHOS = 6;

botao.addEventListener('click', async () => {
  lista.innerHTML = '';         // Limpa a lista anterior
  loader.classList.remove('hidden'); // Mostra "Carregando..."

  const conselhos = new Set();

  while (conselhos.size < TOTAL_CONSELHOS) {
    try {
      const resposta = await fetch('https://api.adviceslip.com/advice', {
        cache: 'no-cache' // Evita conselhos repetidos pela API
      });

      const data = await resposta.json();
      const conselhoTexto = data.slip.advice;

      if (!conselhos.has(conselhoTexto)) {
        conselhos.add(conselhoTexto);

        const li = document.createElement('li');
        // li.textContent = conselhoTexto;
        li.innerHTML = `💬 ${conselhoTexto}`;
        lista.appendChild(li);
      }

    } catch (erro) {
      console.error('Erro ao buscar conselho:', erro);
      const liErro = document.createElement('li');
      liErro.textContent = '❌ Não foi possível carregar um conselho.';
      liErro.style.color = 'red';
      lista.appendChild(liErro);
    }
  }

  loader.classList.add('hidden'); // Esconde "Carregando..."
});
