function somarNumerosPares(numeros) {
  if (!Array.isArray(numeros)) {
    throw new TypeError("A entrada deve ser um array de números.");
  }

  return numeros
    .filter((numero) => typeof numero === "number" && numero % 2 === 0)
    .reduce((acumulador, numero) => acumulador + numero, 0);
}

module.exports = {
  somarNumerosPares,
};
