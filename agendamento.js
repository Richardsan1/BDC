const STATUS = {
  PENDENTE: "pendente",
  CONFIRMADO: "confirmado",
  CANCELADO: "cancelado",
  CONCLUIDO: "concluido",
};

class Agendamento {
  constructor({ id, clienteId, profissionalId, servico, dataHora, valor }) {
    if (!id || !clienteId || !profissionalId || !servico || !dataHora || valor == null) {
      throw new Error("Todos os campos são obrigatórios para criar um agendamento.");
    }
    if (typeof valor !== "number" || valor <= 0) {
      throw new Error("O valor deve ser um número positivo.");
    }
    if (!(dataHora instanceof Date) || isNaN(dataHora.getTime())) {
      throw new Error("A data e hora devem ser uma instância válida de Date.");
    }

    this.id = id;
    this.clienteId = clienteId;
    this.profissionalId = profissionalId;
    this.servico = servico;
    this.dataHora = dataHora;
    this.valor = valor;
    this.status = STATUS.PENDENTE;
  }

  confirmar() {
    if (this.status !== STATUS.PENDENTE) {
      throw new Error("Apenas agendamentos pendentes podem ser confirmados.");
    }
    this.status = STATUS.CONFIRMADO;
  }

  cancelar(dataAtual = new Date()) {
    if (this.status === STATUS.CANCELADO) {
      throw new Error("O agendamento já está cancelado.");
    }
    if (this.status === STATUS.CONCLUIDO) {
      throw new Error("Agendamentos concluídos não podem ser cancelados.");
    }
    const diferencaMs = this.dataHora.getTime() - dataAtual.getTime();
    const diferencaHoras = diferencaMs / (1000 * 60 * 60);
    if (diferencaHoras < 24) {
      throw new Error("O cancelamento deve ser feito com pelo menos 24 horas de antecedência.");
    }
    this.status = STATUS.CANCELADO;
  }

  concluir() {
    if (this.status !== STATUS.CONFIRMADO) {
      throw new Error("Apenas agendamentos confirmados podem ser concluídos.");
    }
    this.status = STATUS.CONCLUIDO;
  }

  isValido() {
    return (
      typeof this.id === "string" &&
      typeof this.clienteId === "string" &&
      typeof this.profissionalId === "string" &&
      typeof this.servico === "string" &&
      this.servico.trim().length > 0 &&
      this.dataHora instanceof Date &&
      !isNaN(this.dataHora.getTime()) &&
      typeof this.valor === "number" &&
      this.valor > 0
    );
  }

  calcularValorTotal(taxaServico = 0) {
    if (typeof taxaServico !== "number" || taxaServico < 0) {
      throw new Error("A taxa de serviço deve ser um número não negativo.");
    }
    return this.valor + taxaServico;
  }
}

module.exports = { Agendamento, STATUS };
