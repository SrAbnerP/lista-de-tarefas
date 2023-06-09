let inputNovaTarefa = document.querySelector("#inputNovaTarefa");
let btnAddTarefa = document.querySelector("#btnAddTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let janelaEdicao = document.querySelector("#janelaEdicao");
let janelaEdicaoFundo = document.querySelector("#janelaEdicaoFundo");
let janelaEdicaoBtnFechar = document.querySelector("#janelaEdicaoBtnFechar");
let btnAtualizarTarefa = document.querySelector("#btnAtualizarTarefa");
let IdTarefaEdicao = document.querySelector("#IdTarefaEdicao");
let inputTarefaNomeEdicao = document.querySelector("#inputTarefaNomeEdicao");

inputNovaTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    if (inputNovaTarefa.value == "") {
      alert("Não pode adicionar uma tarefa em branco!!");
    } else {
      let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarIdV2(),
      };
      adicionarTarefa(tarefa);
    }
  }
});

btnAddTarefa.addEventListener("click", (e) => {
  if (inputNovaTarefa.value == "") {
    alert("Não pode adicionar uma tarefa em branco!!");
  } else {
    let tarefa = {
      nome: inputNovaTarefa.value,
      id: gerarIdV2(),
    };
    adicionarTarefa(tarefa);
  }
});

janelaEdicaoBtnFechar.addEventListener("click", (e) => {
  alternarJanelaEdicao();
});

btnAtualizarTarefa.addEventListener("click", (e) => {
  e.preventDefault();
  let idTarefa = IdTarefaEdicao.innerHTML.replace("#", "");
  let tarefa = {
    nome: inputTarefaNomeEdicao.value,
    id: idTarefa,
  };

  let tarefaAtual = document.getElementById("" + idTarefa + "");

  if (tarefaAtual) {
    let li = criarTagLI(tarefa);
    listaTarefas.replaceChild(li, tarefaAtual);
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
});

function adicionarTarefa(tarefa) {
  let li = criarTagLI(tarefa);
  listaTarefas.appendChild(li);
  inputNovaTarefa.value = "";
  inputNovaTarefa.focus();
}

function criarTagLI(tarefa) {
  let li = document.createElement("li");
  li.id = tarefa.id;

  let span = document.createElement("span");
  span.classList.add("textoTarefa");
  span.innerHTML = tarefa.nome;

  let div = document.createElement("div");

  let btnEditar = document.createElement("button");
  btnEditar.classList.add("btnAcao");
  btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
  btnEditar.setAttribute("onclick", "editar(" + tarefa.id + ")");

  let btnExcluir = document.createElement("button");
  btnExcluir.classList.add("btnAcao");
  btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
  btnExcluir.setAttribute("onclick", "excluir(" + tarefa.id + ")");

  div.appendChild(btnEditar);
  div.appendChild(btnExcluir);

  li.appendChild(span);
  li.appendChild(div);

  return li;
}

function editar(idTarefa) {
  let li = document.getElementById("" + idTarefa + "");
  if (li) {
    IdTarefaEdicao.innerHTML = "#" + idTarefa;
    inputTarefaNomeEdicao.value = li.innerText;
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
}

function excluir(idTarefa) {
  let confirmacao = window.confirm("Tem certeza que deseja excluir?");
  if (confirmacao) {
    let li = document.getElementById("" + idTarefa + "");
    if (li) {
      listaTarefas.removeChild(li);
    } else {
      alert("Elemento HTML não encontrado!");
    }
  }
}

function alternarJanelaEdicao() {
  janelaEdicao.classList.toggle("abrir");
  janelaEdicaoFundo.classList.toggle("abrir");
}

function gerarId(params) {
  return Math.floor(Math.random() * 3000);
}

function gerarIdV2(params) {
  return gerarIdUnico();
}

function gerarIdUnico(params) {
  let itensDaLista = document.querySelector("#listaTarefas").children;
  let idsGerados = [];

  for (let i = 0; i < itensDaLista.length; i++) {
    idsGerados.push(itensDaLista[i].id);
  }

  let qtdIdsDisponiveis = 3;
  let contadorIds = 0;
  let id = gerarId();

  while (
    contadorIds <= qtdIdsDisponiveis &&
    idsGerados.indexOf(id.toString()) > -1
  ) {
    id = gerarId();
    contadorIds++;

    if (contadorIds > qtdIdsDisponiveis) {
      alert("Oops, atingiu o limite maximo de tarefas!!");
      throw new Error("atingiu o limite maximo de tarefas!!");
    }
  }

  return id;
}
