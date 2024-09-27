//testar se uma classe altera os valores da instancia de outra classe

class Fruta {
  constructor(nome, quantidade = 0) {
    this.nome = nome;
    this.qtd = quantidade;
  }
}

class CaixaDeFrutas {
  constructor() {
    this.listaDeFrutas = [];
  }

  adicionarFruta(fruta) {
    
    
    this.listaDeFrutas.push(fruta);
  }
}

class VendaDeFrutas {}



