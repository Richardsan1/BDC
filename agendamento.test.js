const { Agendamento, STATUS } = require("./agendamento");

const dadosValidos = () => ({
  id: "ag-001",
  clienteId: "cli-001",
  profissionalId: "pro-001",
  servico: "Corte de cabelo",
  dataHora: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48h no futuro
  valor: 80.0,
});

describe("Agendamento - construtor", () => {
  test("deve criar um agendamento válido com status pendente", () => {
    const ag = new Agendamento(dadosValidos());
    expect(ag.status).toBe(STATUS.PENDENTE);
    expect(ag.valor).toBe(80.0);
  });

  test("deve lançar erro se campos obrigatórios estiverem faltando", () => {
    expect(() => new Agendamento({ id: "ag-001" })).toThrow(
      "Todos os campos são obrigatórios para criar um agendamento."
    );
  });

  test("deve lançar erro se o valor for negativo", () => {
    expect(() => new Agendamento({ ...dadosValidos(), valor: -10 })).toThrow(
      "O valor deve ser um número positivo."
    );
  });

  test("deve lançar erro se a data for inválida", () => {
    expect(() => new Agendamento({ ...dadosValidos(), dataHora: new Date("invalida") })).toThrow(
      "A data e hora devem ser uma instância válida de Date."
    );
  });
});

describe("Agendamento - confirmar()", () => {
  test("deve mudar o status para confirmado quando pendente", () => {
    const ag = new Agendamento(dadosValidos());
    ag.confirmar();
    expect(ag.status).toBe(STATUS.CONFIRMADO);
  });

  test("deve lançar erro ao tentar confirmar um agendamento já confirmado", () => {
    const ag = new Agendamento(dadosValidos());
    ag.confirmar();
    expect(() => ag.confirmar()).toThrow(
      "Apenas agendamentos pendentes podem ser confirmados."
    );
  });
});

describe("Agendamento - cancelar()", () => {
  test("deve cancelar um agendamento com mais de 24h de antecedência", () => {
    const ag = new Agendamento(dadosValidos());
    ag.cancelar();
    expect(ag.status).toBe(STATUS.CANCELADO);
  });

  test("deve lançar erro ao cancelar com menos de 24h de antecedência", () => {
    const ag = new Agendamento({
      ...dadosValidos(),
      dataHora: new Date(Date.now() + 2 * 60 * 60 * 1000), // apenas 2h no futuro
    });
    expect(() => ag.cancelar()).toThrow(
      "O cancelamento deve ser feito com pelo menos 24 horas de antecedência."
    );
  });

  test("deve lançar erro ao tentar cancelar um agendamento já cancelado", () => {
    const ag = new Agendamento(dadosValidos());
    ag.cancelar();
    expect(() => ag.cancelar()).toThrow("O agendamento já está cancelado.");
  });
});

describe("Agendamento - concluir()", () => {
  test("deve mudar o status para concluído quando confirmado", () => {
    const ag = new Agendamento(dadosValidos());
    ag.confirmar();
    ag.concluir();
    expect(ag.status).toBe(STATUS.CONCLUIDO);
  });

  test("deve lançar erro ao tentar concluir um agendamento pendente", () => {
    const ag = new Agendamento(dadosValidos());
    expect(() => ag.concluir()).toThrow(
      "Apenas agendamentos confirmados podem ser concluídos."
    );
  });
});

describe("Agendamento - isValido()", () => {
  test("deve retornar true para um agendamento válido", () => {
    const ag = new Agendamento(dadosValidos());
    expect(ag.isValido()).toBe(true);
  });

  test("deve retornar false se o serviço estiver vazio após criação direta", () => {
    const ag = new Agendamento(dadosValidos());
    ag.servico = "";
    expect(ag.isValido()).toBe(false);
  });
});

describe("Agendamento - calcularValorTotal()", () => {
  test("deve retornar o valor correto com taxa de serviço", () => {
    const ag = new Agendamento(dadosValidos());
    expect(ag.calcularValorTotal(10)).toBe(90.0);
  });

  test("deve retornar o valor original quando taxa for zero", () => {
    const ag = new Agendamento(dadosValidos());
    expect(ag.calcularValorTotal(0)).toBe(80.0);
  });

  test("deve lançar erro se a taxa for negativa", () => {
    const ag = new Agendamento(dadosValidos());
    expect(() => ag.calcularValorTotal(-5)).toThrow(
      "A taxa de serviço deve ser um número não negativo."
    );
  });
});
