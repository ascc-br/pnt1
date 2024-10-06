// hotel.js
class Quarto {
  constructor(numero, tipo, diaria) {
    this.id = numero; // ID primaria
    this.tipo = tipo; // solteiro, duplo, suite
    this.diaria = diaria;
  }
}

class ManipulaQuartos {
  constructor(andares) {
    this.listaQuartos = []; // vetor de vetores com lista de quartos por andar

    for (let i = 0; i < andares; i++) {
      this.listaQuartos[i] = [];
    }
  }

  addQuarto(tipo, andar) {
    var diaria = 0;

    switch (tipo) {
      case "solteiro":
        diaria = 100;
        break;
      case "duplo":
        diaria = 150;
        break;
      case "suite":
        diaria = 200;
        break;
      default:
        return false;
    }

    const quarto = new Quarto(
      (andar - 1) * 100 + this.listaQuartos[andar - 1].length + 1,
      tipo,
      diaria
    );
    this.listaQuartos[andar - 1].push(quarto); // insere o quarto na lista de quartos

    return true;
  }

  contarQuartos() {
    var contagemSolteiro = 0;
    var contagemDuplo = 0;
    var contagemSuite = 0;

    this.listaQuartos.forEach((piso) => {
      piso.forEach((quarto) => {
        if (quarto.tipo === "solteiro") contagemSolteiro++;
        else if (quarto.tipo === "duplo") contagemDuplo++;
        else if (quarto.tipo === "suite") contagemSuite++;
      });
    });

    return [contagemSolteiro, contagemDuplo, contagemSuite]; // retorna vetor com as 3 contagens
  }
}

class Hospede {
  constructor(nome, endereco, telefone, cpf) {
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.cpf = cpf; // id primaria
  }
}

class Reserva {
  constructor(dataInicial, dataFinal, idQuarto, cpfHospede) {
    this.dataInicial = dataInicial;
    this.dataFinal = dataFinal;
    this.idQuarto = idQuarto; // id estrangeira
    this.idHospede = cpfHospede; // id estrangeira
    this.idReserva = this.idGenerator(dataInicial, idQuarto);
  }

  idGenerator(dataInicial, quarto) {
    let [dd, mm, aa] = dataInicial.toLocaleDateString().split("/");
    return aa + mm + dd + quarto.toString().padStart(4, "0");
  }
}

class ManipulaReservas {
  constructor() {
    this.listaUsuarios = [];
    this.listaReservas = [];
  }

  criaUsuario(nome, endereco, telefone, cpf) {
    if (this.listaUsuarios.find((usuario) => usuario.cpf === cpf)) return false;
    const usuario = new Hospede(nome, endereco, telefone, cpf);
    this.listaUsuarios.push(usuario);
    return true;
  }

  checaDisponibilidade(dataInicial, dataFinal, quarto) {
    return !this.listaReservas.some(
      (reserva) =>
        reserva.idQuarto === quarto &&
        ((reserva.dataInicial <= dataInicial && reserva.dataFinal >= dataInicial) ||
          (reserva.dataInicial <= dataFinal && reserva.dataFinal >= dataFinal))
    );
  }

  listarQuartosDisponiveis(dataInicial, dataFinal, listaDeQuartos) {
    return listaDeQuartos
      .flatMap((andar) => andar)
      .filter((quarto) => this.checaDisponibilidade(dataInicial, dataFinal, quarto.id));
  }

  criaReserva(dataInicial, dataFinal, quarto, hospede) {
    if (!this.checaDisponibilidade(dataInicial, dataFinal, quarto)) return false;
    const reserva = new Reserva(dataInicial, dataFinal, quarto, hospede);
    this.listaReservas.push(reserva);
    return true;
  }
}

function isValidAndFuture(stringData, today) {
  let dateParts = stringData.split("/");

  if (dateParts.length !== 3) return false;

  let [dia, mes, ano] = dateParts;
  let dateObj = new Date(`${ano}-${mes}-${dia}`);

  return !isNaN(dateObj.getTime()) && dateObj >= today;
}

function dateIso(date) {
  let [dia, mes, ano] = date.split("/");
  dia = dia.padStart(2, "0");
  mes = mes.padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function dataProxReserva(data) {
  let dia = data.getUTCHours() <= 15 ? data.getUTCDate() - 1 : data.getUTCDate(); //15h UTC == 12GMT-3 (checkout time)
  return new Date(Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), dia - 1, 23, 59, 59));
}

// Exporting the classes and functions to be used in index.js
module.exports = {
  Quarto,
  ManipulaQuartos,
  Hospede,
  Reserva,
  ManipulaReservas,
  isValidAndFuture,
  dateIso,
  dataProxReserva,
};
