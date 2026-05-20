const searchService = require('../services/searchService');

const buscar = async (req, res, next) => {
  try {
    const { termo, especialista, especialidades, inclusivo, cidade, latitude, longitude, raio_km, avaliacao_min, preco_maximo, tipo, pagina = 1, por_pagina = 20, ordenar = 'relevancia' } = req.query;

    const resultados = await searchService.buscar({
      termo,
      especialista,
      especialidades: especialidades ? especialidades.split(',').map(e => e.trim()).filter(Boolean) : [],
      inclusivo: inclusivo === 'true',
      cidade,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      raio_km: raio_km ? parseFloat(raio_km) : 10,
      avaliacao_min: avaliacao_min ? parseFloat(avaliacao_min) : 0,
      preco_maximo: preco_maximo ? parseFloat(preco_maximo) : null,
      tipo,
      pagina: parseInt(pagina),
      por_pagina: Math.min(parseInt(por_pagina), 48),
      ordenar,
    });

    res.json(resultados);
  } catch (err) {
    next(err);
  }
};

const indexar = async (req, res, next) => {
  try {
    const { profissionalId } = req.body;
    await searchService.indexarProfissional(profissionalId);
    res.json({ mensagem: 'Profissional indexado' });
  } catch (err) {
    next(err);
  }
};

module.exports = { buscar, indexar };
