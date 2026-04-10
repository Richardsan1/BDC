const { somarNumerosPares } = require("./tarefa");

describe("somarNumerosPares", () => {
  test("deve somar apenas os números pares", () => {
    expect(somarNumerosPares([1, 2, 3, 4, 5, 6])).toBe(12);
  });

  test("deve retornar 0 quando não houver números pares", () => {
    expect(somarNumerosPares([1, 3, 5])).toBe(0);
  });

  test("deve lançar erro para entrada inválida", () => {
    expect(() => somarNumerosPares("texto")).toThrow(TypeError);
  });
});
