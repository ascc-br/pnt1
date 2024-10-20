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

var auxAutofill = mostraMenu("Deseja preencher automaticamente os dados?", ["Sim", "Não"]);
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
  /** Mapa de Menus:
   * 1. Fazer Reserva
   *  1.1 Quartos disponíveis na data
   *  1.2 Reservar quarto em data (usando CPF e cadastrando caso novo hóspede)
   *  1.3 Voltar ao Menu Principal
   * 2. Registros do Sistema
   *  2.1 Listar reservas por CPF
   *  2.2 Listar quartos cadastrados
   *  2.3 Listar hóspedes cadastrados
   *  2.4 Listar reservas cadastradas
   * 3. Alterar Registros
   *  3.1 Cadastrar novo quarto
   *   3.1.1 solteiro
   *   3.1.2 duplo
   *   3.1.3 suíte
   *  3.2 Alterar registro de quarto
   *   3.2.1 Solteiro
   *   3.2.2 duplo
   *   3.2.3 suíte
   *   3.2.4 DESATIVADO
   *  3.3 Deletar registro de hóspede
   *  3.4 Deletar registro de reserva
   * 4. Sair
   */
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
          }
          break;
        case 2:
          // console.log(" =Hóspedes cadastrados= ");
          // console.log(gerReservas.listaUsuarios);
          if (!mostraLista(gerReservas.listaUsuarios)) {
            console.warn("Nenhum hóspede cadastrado!");
          }
          break;
        case 3:
          // console.log(" =Reservas cadastradas= ");
          // console.log(gerReservas.listaReservas);
          if (!mostraLista(gerReservas.listaReservas)) {
            console.warn("Não foi possível exibir os registros de reservas!");
          }
          break;
        case 4:
          break;
        default:
          console.error("Opção inválida!");
      }
      readline.question("Pressione Enter para voltar ao Menu Principal...", () => {
        // Aguarda o usuario pressionar 'ENTER' para então limpar a tela
        readline.close();
      });
      break;
    case 3:
      let menuModidificar = [
        "Cadastrar novo quarto",
        "Registro de quarto",
        "Apagar reg de hóspede",
        "Apagar reg de reserva",
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
                if (gerQuartos.alteraQuarto(aux_quarto, "solteiro"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'solteiro' com sucesso!");
                break;
              case 2:
                if (gerQuartos.alteraQuarto(aux_quarto, "duplo"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'duplo' com sucesso! ");
                break;
              case 3:
                if (gerQuartos.alteraQuarto(aux_quarto, "suite"))
                  console.log("Quarto #" + aux_quarto + " alterado para 'suíte' com sucesso! ");
                break;
              case 4:
                if (gerQuartos.alteraQuarto(aux_quarto, "desativado"))
                  console.log("Quarto #" + aux_quarto + " desativado com sucesso! ");
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
          if (gerReservas.removeUsuario(aux_cpf)) console.log("Hóspede removido com sucesso!");
          else console.error("CPF não cadastrado!");
          break; //fim do case '3': Remover registro de hóspede
        case 4:
          let aux_id = mostraMenu("Remover registro de reserva", ["Qual o ID da reserva?"]);
          if (gerReservas.removeReserva(aux_id)) console.log("Reserva removida com sucesso!");
          else console.error("ID de reserva não cadastrado!");
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
