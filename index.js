// index.js

process.stdin.setEncoding("utf8");
process.stdout.setEncoding("utf8");

// Import classes and functions from hotel.js
const {
  ManipulaQuartos,
  ManipulaReservas,
  isValidAndFuture,
  dateIso,
  dataProxReserva,
} = require("./hotel");

// Function to fill the object arrays with random data
function randomFill(manipulaQuartos, manipulaReservas, qtdAndares = 1) {
  if (manipulaQuartos && manipulaReservas) {
    // Fill ManipulaQuartos with random data
    for (let i = 0; i < qtdAndares; i++) {
      andar = i + 1;
      manipulaQuartos.addQuarto("solteiro", andar);
      manipulaQuartos.addQuarto("duplo", andar);
      manipulaQuartos.addQuarto("duplo", andar);
      manipulaQuartos.addQuarto("suite", andar);
      manipulaQuartos.addQuarto("suite", andar);
      manipulaQuartos.addQuarto("suite", andar);
      manipulaQuartos.addQuarto("suite", andar);
      manipulaQuartos.addQuarto("duplo", andar);
      manipulaQuartos.addQuarto("duplo", andar);
      manipulaQuartos.addQuarto("solteiro", andar);
    }

    // Fill ManipulaReservas with random data
    for (let i = 0; i < 300; i++) {
      const randomData = generateRandomData();
      manipulaReservas.criaUsuario(
        randomData.nomeCompleto,
        randomData.endereço,
        randomData.telefone,
        randomData.cpf
      );
    }

    for (let i = 0; i < 1000; i++) {
      const randomDateIn = getRandomFutureDate(new Date(), 7); // Random data in the next week
      const randomDateOut = getRandomFutureDate(randomDateIn, 35); // data in the future within 4 weeks
      const listaFlatQuartos = manipulaReservas.listarQuartosDisponiveis(
        randomDateIn,
        randomDateOut,
        manipulaQuartos.listaQuartos
      );
      if (listaFlatQuartos.length === 0) continue; // If no available quartos, skip this iteration
      let randomIndex = Math.floor(Math.random() * listaFlatQuartos.length);
      const randomQuarto = listaFlatQuartos[randomIndex].id;
      randomIndex = Math.floor(Math.random() * manipulaReservas.listaUsuarios.length);
      const randomHospede = manipulaReservas.listaUsuarios[randomIndex].id;
      manipulaReservas.criaReserva(randomDateIn, randomDateOut, randomQuarto, randomHospede);
    }

    return true;
  } else {
    console.error(
      "Invalid object arrays. Please provide ManipulaQuartos and ManipulaReservas objects."
    );

    return false;
  }
}

function getRandomFutureDate(startDate, maxDays) {
  const randomDays = Math.floor(Math.random() * maxDays); // Gera número de dias aleatórios
  const futureDate = new Date(startDate);
  futureDate.setDate(futureDate.getDate() + randomDays); // Adiciona dias aleatórios à data inicial
  return futureDate;
}

// Function to generate random data
function generateRandomData() {
  // Generate random data for ManipulaQuartos
  const nomes = [
    "Alice",
    "Bruno",
    "Camila",
    "Daniel",
    "Eduarda",
    "Felipe",
    "Gabriela",
    "Henrique",
    "Isabela",
    "João",
    "Laura",
    "Lucas",
    "Mariana",
    "Nicolas",
    "Olivia",
    "Pedro",
    "Rafaela",
    "Samuel",
    "Thaís",
    "Victor",
    "Ana",
    "Beatriz",
    "Carlos",
    "Diana",
    "Eduardo",
    "Fernanda",
    "Gustavo",
    "Helena",
    "Igor",
    "Juliana",
    "Leonardo",
    "Maria",
    "Miguel",
    "Natália",
    "Otávio",
    "Paula",
    "Rafael",
    "Sofia",
    "Thiago",
    "Valentina",
    "William",
    "Amanda",
    "Bernardo",
    "Clara",
    "David",
    "Emily",
    "Gabriel",
    "Heloísa",
    "Ian",
    "Júlia",
    "Luiz",
    "Melissa",
    "Noah",
    "Priscila",
    "Roberto",
    "Sophia",
    "Tomás",
    "Vitor",
  ];
  const sobrenomes = [
    "Almeida",
    "Andrade",
    "Azevedo",
    "Barbosa",
    "Brito",
    "Campos",
    "Cardoso",
    "Costa",
    "Dias",
    "Ferreira",
    "Fernandes",
    "Gomes",
    "Gonçalves",
    "Lima",
    "Machado",
    "Martins",
    "Melo",
    "Mendes",
    "Miranda",
    "Moraes",
    "Moreira",
    "Oliveira",
    "Pereira",
    "Pinto",
    "Queiroz",
    "Ramos",
    "Ribeiro",
    "Rodrigues",
    "Santos",
    "Silva",
    "Souza",
    "Teixeira",
    "Vieira",
    "Viana",
    "Xavier",
    "Alves",
    "Assis",
    "Carvalho",
    "Cavalcante",
    "Correa",
    "Freitas",
    "Garcia",
    "Lopes",
    "Marques",
    "Nogueira",
    "Pereira",
    "Reis",
    "Rosa",
    "Santos",
    "Silva",
    "Soares",
    "Torres",
  ];

  // Generate random data for Hospedes
  const randomNome =
    nomes[Math.floor(Math.random() * nomes.length)] +
    " " +
    sobrenomes[Math.floor(Math.random() * sobrenomes.length)] +
    " " +
    sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const randomEndereco =
    ["Rua ", "Avenida ", "Alameda "][Math.floor(Math.random() * 3)] +
    sobrenomes[Math.floor(Math.random() * sobrenomes.length)] +
    " de " +
    sobrenomes[Math.floor(Math.random() * sobrenomes.length)] +
    ", " +
    Math.floor(Math.random() * 998) +
    1;
  1;
  const randomCpf = Math.floor(Math.random() * 10000000000) + 1000000000; // Random CPF between 1000000000 and 10099999999
  const randomTelefone = Math.floor(Math.random() * 1000000000) + 100000000; // Random telefone between 100000000 and 999999999

  return {
    nomeCompleto: randomNome,
    endereço: randomEndereco,
    telefone: randomTelefone,
    cpf: randomCpf,
  };
}

/** INTERFACE GRAFICA (FRONT) */
//styles
const { mostraMenu, mostraLista, readline } = require("./frontend");

var lacoAndares = true;
while (lacoAndares) {
  var auxAndares = mostraMenu("Quantos pisos tem o hotel?", [
    "Contando com o térreo, quantos andares tem o hotel?",
  ]);
  if (auxAndares < 1 || isNaN(auxAndares)) {
    console.error("Digite um valor válido!");
    readline.question("Pressione Enter para continuar...", () => {
      // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
      readline.close();
    });
  } else lacoAndares = false;
}
const andares = auxAndares;
const gerQuartos = new ManipulaQuartos(andares);
const gerReservas = new ManipulaReservas();

var auxAutofill = mostraMenu("Deseja preencher com Modo Demonstração?", ["Sim", "Não"]);
if (auxAutofill !== 1 && auxAutofill !== 2) {
  console.error("Digite um valor válido!");
  readline.question("Pressione Enter para continuar...", () => {
    // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
    readline.close();
  });
} else if (auxAutofill === 1) {
  if (randomFill(gerQuartos, gerReservas, andares)) console.log("Dados preenchidos com sucesso!");
  else console.error("Erro ao preencher dados!");
  readline.question("Pressione Enter para continuar...", () => {
    // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
    readline.close();
  });
}

var loop1 = true;
while (loop1) {
  let menu1 = ["Fazer Reserva", "Registros do Sistema", "Modificar Registros", "Sair"];
  var opcaoEscolhida = mostraMenu("Menu Principal", menu1);

  switch (opcaoEscolhida) {
    case 1:
      let [solteiro, duplo, suite] = gerQuartos.contarQuartos();
      if (solteiro + duplo + suite == 0) {
        console.warn("Não é possível criar reservas sem quartos cadastrados!");
        readline.question("Pressione Enter para continuar...", () => {
          // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
          readline.close();
        });
      } else {
        var dataIniInput = "DD/MM/AAAA";
        var dataFinInput = "DD/MM/AAAA";
        let hoje = dataProxReserva(new Date());
        while (!isValidAndFuture(dataIniInput, hoje)) {
          dataIniInput = mostraMenu("Fazer Reserva", ["Qual a data de entrada? (DD/MM/AAAA)"]);
          if (!isValidAndFuture(dataIniInput, hoje)) {
            console.warn(
              "Data inválida! Favor insira data posterior a: \n" +
                hoje.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
            readline.question("Pressione Enter para continuar...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
        }

        let dataInicial = new Date(dateIso(dataIniInput) + "T17:00:00Z"); //17h UTC == 14h GMT-3 (checkin)
        while (!isValidAndFuture(dataFinInput, dataInicial)) {
          dataFinInput = mostraMenu("Fazer Reserva", ["Qual a data de saída? (DD/MM/AAAA)"]);
          if (!isValidAndFuture(dataFinInput, dataInicial)) {
            console.error(
              "Data inválida! Favor insira data posterior a: \n" +
                dataInicial.toDateString() +
                " e no formato DD/MM/AAAA.\n"
            );
            readline.question("Pressione Enter para continuar...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
        }
        let dataFinal = new Date(dateIso(dataFinInput) + "T15:00:00Z"); //15h UTC == 12h GMT-3 (checkout)

        let quartosDisponiveis = gerReservas.listarQuartosDisponiveis(
          dataInicial,
          dataFinal,
          gerQuartos.listaQuartos
        );

        if (quartosDisponiveis.length < 1) {
          console.error("Não há quartos disponíveis nessa data!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
        } else {
          let lacoReserva = true;
          let menuReserva = [
            "Quartos disponíveis",
            "Reservar quarto na data",
            "Voltar ao Menu Principal",
          ];
          while (lacoReserva) {
            var opcaoReserva = mostraMenu(
              "======Fazer Reserva====== (" + dataIniInput + " ~ " + dataFinInput + ")",
              menuReserva
            );

            switch (opcaoReserva) {
              case 1:
                if (
                  !mostraLista(
                    quartosDisponiveis,
                    0,
                    "===Quartos disponíveis=== (" + dataIniInput + " ~ " + dataFinInput + ")"
                  )
                ) {
                  console.error("Não foi possível exibir os quartos disponíveis!");
                }
                break;
              case 2:
                mostraMenu(
                  "======Fazer Reserva====== (" + dataIniInput + " ~ " + dataFinInput + ")",
                  ["Qual quarto será reservado?"],
                  false,
                  true
                );
                var quartoEscolhido = readline.questionInt("Digite o número do quarto: ");
                if (quartosDisponiveis.find((quarto) => quarto.id === quartoEscolhido)) {
                  let selectedQuarto = quartosDisponiveis.find(
                    (quarto) => quarto.id === quartoEscolhido
                  );
                  mostraMenu(
                    "======Fazer Reserva====== (" +
                      dataIniInput +
                      " ~ " +
                      dataFinInput +
                      ") Quarto:#" +
                      quartoEscolhido +
                      " (" +
                      selectedQuarto.tipo +
                      ")",
                    ["Favor informe os dados do hóspede"],
                    false,
                    true
                  );
                  var cpf = readline.questionInt("CPF: ");
                  if (gerReservas.listaUsuarios.find((usuario) => usuario.id === cpf))
                    console.info("Hóspede já cadastrado no sistema!");
                  else {
                    var nome = readline.question("Nome: ");
                    var endereco = readline.question("Endereço: ");
                    var telefone = readline.question("Telefone: ");
                    var sucesso = gerReservas.criaUsuario(nome, endereco, telefone, cpf);
                    if (sucesso) {
                      mostraMenu(
                        "======Fazer Reserva====== (" +
                          dataIniInput +
                          " ~ " +
                          dataFinInput +
                          ") Quarto:#" +
                          quartoEscolhido +
                          " (" +
                          selectedQuarto.tipo +
                          ")",
                        [
                          "Nome: " + nome,
                          "CPF: " + cpf,
                          "Endereço: " + endereco,
                          "telefone: " + telefone,
                        ],
                        false,
                        true
                      );
                      console.log("Hóspede cadastrado com sucesso!");
                    } else console.warn("CPF já cadastrado no sistema!");
                  }
                  if (gerReservas.criaReserva(dataInicial, dataFinal, quartoEscolhido, cpf)) {
                    console.log("Reserva realizada com sucesso!");
                    lacoReserva = false;
                  } else console.error("A reserva não foi efetuada!");
                } else console.warn("Quarto indisponível na data!");

                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
              case 3:
                lacoReserva = false;
                break;
              default:
                console.error("Opção inválida!");
                readline.question("Pressione Enter para continuar...", () => {
                  // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                  readline.close();
                });
                break;
            } //fim do switch
          } //fim do laço
        } //fim do else qd não há quartos disponíveis
      } //fim do else qd não tem quartos cadastrados
      break;
    case 2:
      let menuRegistros = [
        "Listar quartos",
        "Listar hóspedes",
        "Listar reservas",
        "Voltar ao Menu Principal",
      ];
      var opcaoRegistros = mostraMenu("Menu Registros", menuRegistros);

      switch (opcaoRegistros) {
        case 1:
          // console.log(" =Quartos cadastrados= ");
          // console.log(gerQuartos.listaQuartos);
          if (!mostraLista(gerQuartos.listaQuartos.flat())) {
            console.warn("Não foi possível exibir os registros de quartos!");
            readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
          break;
        case 2:
          // console.log(" =Hóspedes cadastrados= ");
          // console.log(gerReservas.listaUsuarios);
          if (!mostraLista(gerReservas.listaUsuarios)) {
            console.warn("Nenhum hóspede cadastrado!");
            readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
          break;
        case 3:
          // console.log(" =Reservas cadastradas= ");
          // console.log(gerReservas.listaReservas);
          if (!mostraLista(gerReservas.listaReservas)) {
            console.warn("Não foi possível exibir os registros de reservas!");
            readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
              // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
              readline.close();
            });
          }
          break;
        case 4:
          break;
        default:
          console.error("Opção inválida!");
          readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
            // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
            readline.close();
          });
      }
      break;
    case 3:
      let menuModidificar = [
        "Cadastrar novo quarto",
        "Registro de quarto",
        "Apagar reg de hóspede",
        "Apagar reg de reservas",
        "Valor das diárias",
        "Voltar ao Menu Principal",
      ];
      var opcaoAlteracao = mostraMenu("Modificar Registros", menuModidificar);
      switch (opcaoAlteracao) {
        case 1:
          var andar = mostraMenu("Cadastro de quatros", [
            "Qual o piso do quarto a ser cadastrado?",
          ]);
          if (andar > andares || andar < 1) {
            console.error("Andar inexistente!");
          } else {
            menuCadastraQuarto = ["Solteiro ", "Duplo ", "Suíte ", "CANCELAR OPERAÇÃO"];
            opcaoEscolhida = mostraMenu("Selecione o tipo do quarto", menuCadastraQuarto);

            switch (opcaoEscolhida) {
              case 1:
                console.log("Quarto solteiro cadastrado!");
                gerQuartos.addQuarto("solteiro", andar);
                break;
              case 2:
                console.log("Quarto duplo cadastrado!");
                gerQuartos.addQuarto("duplo", andar);
                break;
              case 3:
                console.log("Quarto suíte cadastrado!");
                gerQuartos.addQuarto("suite", andar);
                break;
              case 4:
                break;
              default:
                console.error("Opção inválida!");
            } //menu 'cadastro de quartos'
          } //else "andar inexistente"
          break; //fim do case '1': Cadastrar novo quarto
        case 2:
          let aux_quarto = parseInt(
            mostraMenu("Alterar registro de quarto", ["Qual o número do quarto a ser alterado?"])
          );
          if (gerQuartos.quartoExiste(aux_quarto)) {
            menuAlteraQuarto = ["Solteiro", "Duplo", "Suíte", "Desativado", "CANCELAR OPERAÇÃO"];
            opcaoEscolhida = mostraMenu(
              "Alterar registro do quarto #" + aux_quarto,
              menuAlteraQuarto
            );
            switch (opcaoEscolhida) {
              case 1:
                switch (
                  gerQuartos.alteraQuarto(aux_quarto, "solteiro", gerReservas.listaReservas)
                ) {
                  case 1:
                    console.log("Quarto #" + aux_quarto + " alterado para 'solteiro' com sucesso!");
                    break;
                  case 0:
                    console.error("Não foi possível alterar o quarto com reserva!");
                    break;
                  default:
                    console.error("Não foi possível alterar o quarto!");
                }
                break;
              case 2:
                switch (gerQuartos.alteraQuarto(aux_quarto, "duplo", gerReservas.listaReservas)) {
                  case 1:
                    console.log("Quarto #" + aux_quarto + " alterado para 'duplo' com sucesso! ");
                    break;
                  case 0:
                    console.error("Não foi possível alterar o quarto com reserva!");
                    break;
                  default:
                    console.error("Não foi possível alterar o quarto!");
                }
                break;
              case 3:
                if (gerQuartos.alteraQuarto(aux_quarto, "suite") == 1)
                  console.log("Quarto #" + aux_quarto + " alterado para 'suíte' com sucesso! ");
                else console.error("Não foi possível alterar o quarto!");
                break;
              case 4:
                switch (
                  gerQuartos.alteraQuarto(aux_quarto, "desativado", gerReservas.listaReservas)
                ) {
                  case 1:
                    console.log("Quarto #" + aux_quarto + " desativado com sucesso! ");
                    break;
                  case 0:
                    console.error("Não foi possível alterar o quarto com reserva!");
                    break;
                  default:
                    console.error("Não foi possível alterar o quarto!");
                }
                break;
              case 5:
                break;
              default:
                console.log("Opção inválida!");
            }
          } else console.error("Quarto não encontrado!");
          break;
        case 3:
          let aux_cpf = mostraMenu("Remover registro de hóspede", ["Qual o CPF do hóspede?"]);
          switch (gerReservas.removeUsuario(parseInt(aux_cpf))) {
            case 1:
              console.log("Cadastro removido com sucesso!");
              break;
            case 0:
              console.error("Não é possível remover cadastro de hóspede com Reserva!");
              break;
            case -1:
              console.error("CPF não cadastrado!");
              break;
            default:
              console.error("Não foi possível remover o cadastro do hóspede!");
          }
          break; //fim do case '3': Remover registro de hóspede
        case 4:
          let buscaReservas = [];
          let opcaoBuscaReservas = mostraMenu("Remover Reservas", [
            "Remover reserva por ID",
            "Filtrar por Quarto",
            "Filtrar por Hóspede",
            "CANCELAR",
          ]);
          switch (opcaoBuscaReservas) {
            case 1:
              let aux_id = parseInt(
                mostraMenu("Remover reserva por ID", ["Qual o ID da reserva?"])
              );
              switch (gerReservas.removeReserva(aux_id)) {
                case true:
                  console.log("Reserva removida com sucesso!");
                  break;
                case false:
                  console.error("ID de reserva não encontrado!");
                  break;
                default:
                  console.error("Não foi possível remover a reserva!");
              }
              break;
            case 2:
              let aux_quarto = parseInt(
                mostraMenu("Buscar reservas por quarto", ["Qual o número do quarto?"])
              );
              buscaReservas = gerReservas.buscaReservas(aux_quarto);
              if (buscaReservas.length < 1) {
                console.error("Não há reservas para esse quarto!");
                break;
              }
              let lacoReservasPorQuarto = true;
              while (lacoReservasPorQuarto) {
                let opcaoBuscaPorQuarto = mostraMenu(
                  `====Reservas filtradas===  por quarto (#${aux_quarto})`,
                  [
                    "Listar reservas filtradas",
                    "Remover reservas filtradas",
                    "Voltar ao Menu Principal",
                  ]
                );
                switch (opcaoBuscaPorQuarto) {
                  case 1:
                    mostraLista(buscaReservas, 0, "Reservas no quarto #" + aux_quarto);
                    break;
                  case 2:
                    let validation = readline.question(
                      `Você tem certeza que deseja excluir ${buscaReservas.length} reservas? `
                    );
                    if (
                      validation.toLowerCase() === "sim" ||
                      validation.toLowerCase() === "yes" ||
                      validation.toLowerCase() === "tenho" ||
                      validation.toLowerCase() === "s" ||
                      validation.toLowerCase() === "y" ||
                      validation == 1
                    ) {
                      for (let i = 0; i < buscaReservas.length; i++) {
                        if (gerReservas.removeReserva(buscaReservas[i].id))
                          console.log(`Reserva #${buscaReservas[i].id} removida com sucesso!`);
                        else
                          console.error(
                            `Não foi possível remover a reserva #${buscaReservas[i].id}!`
                          );
                      }
                      lacoReservasPorQuarto = false;
                    } else {
                      console.log("Operação cancelada!");
                      readline.question("Pressione Enter para continuar...", () => {
                        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                        readline.close();
                      });
                    }
                    break;
                  case 3:
                    lacoReservasPorQuarto = false;
                    break;
                  default:
                    console.error("Opção inválida!");
                    readline.question("Pressione Enter para continuar...", () => {
                      // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                      readline.close();
                    });
                }
              }

              break;
            case 3:
              let aux_cpf = parseInt(
                mostraMenu("Buscar reservas por hóspede", ["Qual o CPF do hóspede?"])
              );
              buscaReservas = gerReservas.buscaReservas(aux_cpf, true);
              if (buscaReservas.length < 1) {
                console.error("Não há reservas nesse CPF!");
                break;
              }

              let lacoReservasPorHospede = true;
              while (lacoReservasPorHospede) {
                let opcaoBuscaPorCPF = mostraMenu(
                  `====Reservas filtradas=== por hóspede (CPF:${aux_cpf})`,
                  [
                    "Listar reservas filtradas",
                    "Remover reservas filtradas",
                    "Voltar ao Menu Principal",
                  ]
                );
                switch (opcaoBuscaPorCPF) {
                  case 1:
                    mostraLista(buscaReservas, 0, "Reservas no CPF: " + aux_cpf);
                    break;
                  case 2:
                    let validation = readline.question(
                      `Você tem certeza que deseja excluir ${buscaReservas.length} reservas? `
                    );
                    if (
                      validation.toLowerCase() === "sim" ||
                      validation.toLowerCase() === "yes" ||
                      validation.toLowerCase() === "tenho" ||
                      validation.toLowerCase() === "s" ||
                      validation.toLowerCase() === "y" ||
                      validation == 1
                    ) {
                      for (let i = 0; i < buscaReservas.length; i++) {
                        if (gerReservas.removeReserva(buscaReservas[i].id))
                          console.log(`Reserva #${buscaReservas[i].id} removida com sucesso!`);
                        else
                          console.error(
                            `Não foi possível remover a reserva #${buscaReservas[i].id}!`
                          );
                      }
                      lacoReservasPorHospede = false;
                    } else {
                      console.log("Operação cancelada!");
                      readline.question("Pressione Enter para continuar...", () => {
                        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                        readline.close();
                      });
                    }
                    break;
                  case 3:
                    lacoReservasPorHospede = false;
                    break;
                  default:
                    console.error("Opção inválida!");
                    readline.question("Pressione Enter para continuar...", () => {
                      // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
                      readline.close();
                    });
                }
              }
              break;
            case 4:
              break;
            default:
              console.error("Opção inválida!");
          }
          break; //fim do case '4': Remover registro de reserva
        case 5:
          let aux_diariaSol = gerQuartos.diaSolteiro;
          while (aux_diariaSol == gerQuartos.diaSolteiro) {
            mostraMenu(
              "Alterar valor das diárias",
              ["Atual valor para quarto 'solteiro': " + gerQuartos.diaSolteiro],
              false,
              true
            );
            aux_diariaSol = readline.questionFloat("Digite o novo valor: ");
          }
          gerQuartos.diaSolteiro = aux_diariaSol;

          let aux_diariaDup = gerQuartos.diaDuplo;
          while (aux_diariaDup == gerQuartos.diaDuplo) {
            mostraMenu(
              "Alterar valor das diárias",
              [
                "NOVO valor para 'solteiro': " + gerQuartos.diaSolteiro,
                "Atual valor para 'duplo': " + gerQuartos.diaDuplo,
              ],
              false,
              true
            );
            aux_diariaDup = readline.questionFloat("Informe o novo valor: ");
          }
          gerQuartos.diaDuplo = aux_diariaDup;

          let aux_diariaSuite = gerQuartos.diaSuite;
          while (aux_diariaSuite == gerQuartos.diaSuite) {
            mostraMenu(
              "Alterar valor das diárias",
              [
                "NOVO valor para 'solteiro': " + gerQuartos.diaSolteiro,
                "NOVO valor para 'duplo': " + gerQuartos.diaDuplo,
                "Atual valor para 'suíte': " + gerQuartos.diaSuite,
              ],
              false,
              true
            );
            aux_diariaSuite = readline.questionFloat("Informe o novo valor: ");
          }
          gerQuartos.diaSuite = aux_diariaSuite;

          if (gerQuartos.atualizaDiarias()) {
            mostraMenu(
              "Alterar valor das diárias",
              [
                "NOVO valor para quarto 'solteiro': " + gerQuartos.diaSolteiro,
                "NOVO valor para quarto 'duplo': " + gerQuartos.diaDuplo,
                "NOVO valor para quarto 'suíte': " + gerQuartos.diaSuite,
              ],
              false,
              true
            );
            console.log("Valores de diária atualizados com sucesso!");
          } else console.error("Falha ao atualizar valores de diária!");
          break; //fim do case '5': Alterar valor das diarias
        case 6:
          break;
        default:
          console.error("Opção indisponível!");
      } //fim do switch =Modificar Registros=
      readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
      break;
    case 4:
      console.log("SAINDO...");
      loop1 = false;
      break;
    default:
      console.error("Opção indisponível!");
      readline.question("Pressione Enter para continuar...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
  } //fim do menu 'principal'
} //fim do while principal
