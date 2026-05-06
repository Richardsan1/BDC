const { query } = require('../config/database');

const buscar = async (filtros) => {
  const { termo, especialidades, inclusivo, cidade, latitude, longitude, raio_km, avaliacao_min, preco_maximo, tipo, pagina, por_pagina, ordenar } = filtros;

  let sql = `
    SELECT p.id, p.nome, p.email, p.tipo, p.foto_url, p.cidade, p.latitude, p.longitude, p.avaliacao_media
    FROM searchservice.indice_profissionais p
    WHERE p.ativo = true
  `;

  const params = [];
  let paramCount = 1;

  if (termo) {
    sql += ` AND p.busca_ts @@ plainto_tsquery('portuguese', $${paramCount})`;
    params.push(termo);
    paramCount++;
  }

  if (especialidades.length > 0) {
    sql += ` AND p.especialidades && $${paramCount}`;
    params.push(especialidades);
    paramCount++;
  }

  if (inclusivo) {
    sql += ` AND p.inclusivo = true`;
  }

  if (cidade) {
    sql += ` AND p.cidade ILIKE $${paramCount}`;
    params.push(`%${cidade}%`);
    paramCount++;
  }

  if (latitude && longitude && raio_km) {
    sql += ` AND (6371 * acos(cos(radians($${paramCount})) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians($${paramCount + 1})) + sin(radians($${paramCount})) * sin(radians(p.latitude)))) <= $${paramCount + 2}`;
    params.push(latitude, longitude, raio_km);
    paramCount += 3;
  }

  if (avaliacao_min) {
    sql += ` AND p.avaliacao_media >= $${paramCount}`;
    params.push(avaliacao_min);
    paramCount++;
  }

  if (preco_maximo) {
    sql += ` AND p.preco_minimo <= $${paramCount}`;
    params.push(preco_maximo);
    paramCount++;
  }

  if (tipo) {
    sql += ` AND p.tipo = $${paramCount}`;
    params.push(tipo);
    paramCount++;
  }

  // Ordenação
  if (ordenar === 'avaliacao') {
    sql += ` ORDER BY p.avaliacao_media DESC`;
  } else if (ordenar === 'preco_asc') {
    sql += ` ORDER BY p.preco_minimo ASC`;
  } else if (ordenar === 'preco_desc') {
    sql += ` ORDER BY p.preco_minimo DESC`;
  } else if (ordenar === 'distancia' && latitude && longitude) {
    sql += ` ORDER BY (6371 * acos(cos(radians($${paramCount - 2})) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians($${paramCount - 1})) + sin(radians($${paramCount - 2})) * sin(radians(p.latitude)))) ASC`;
  } else {
    sql += ` ORDER BY p.busca_ts`;
  }

  const offset = (pagina - 1) * por_pagina;
  sql += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(por_pagina, offset);

  const result = await query(sql, params);

  // Contar total
  let countSql = `SELECT COUNT(*) FROM searchservice.indice_profissionais p WHERE p.ativo = true`;
  const countParams = [];
  let countParamCount = 1;

  if (termo) {
    countSql += ` AND p.busca_ts @@ plainto_tsquery('portuguese', $${countParamCount})`;
    countParams.push(termo);
    countParamCount++;
  }
  if (especialidades.length > 0) {
    countSql += ` AND p.especialidades && $${countParamCount}`;
    countParams.push(especialidades);
    countParamCount++;
  }
  if (inclusivo) {
    countSql += ` AND p.inclusivo = true`;
  }
  if (cidade) {
    countSql += ` AND p.cidade ILIKE $${countParamCount}`;
    countParams.push(`%${cidade}%`);
    countParamCount++;
  }

  const countResult = await query(countSql, countParams);
  const total = parseInt(countResult.rows[0].count);

  return {
    dados: result.rows,
    paginacao: {
      pagina,
      por_pagina,
      total,
      paginas_totais: Math.ceil(total / por_pagina),
    },
  };
};

const indexarProfissional = async (profissionalId) => {
  // Implementar reindexação
};

module.exports = { buscar, indexarProfissional };
