const { query } = require('../config/database');

const buscar = async (filtros) => {
  const { termo, especialista, especialidades, inclusivo, cidade, latitude, longitude, raio_km, avaliacao_min, preco_maximo, tipo, pagina, por_pagina, ordenar } = filtros;

  let sql = `
    SELECT p.id, p.nome, p.email, p.tipo, p.foto_url, p.cidade, p.latitude, p.longitude, p.avaliacao_media, p.especialidades, p.preco_minimo, p.inclusivo
    FROM searchservice.indice_profissionais p
    WHERE p.ativo = true
  `;

  const params = [];
  let paramCount = 1;

  // Busca por nome de especialista
  if (especialista) {
    sql += ` AND p.nome ILIKE $${paramCount}`;
    params.push(`%${especialista}%`);
    paramCount++;
  }

  // Busca por termo geral (full-text)
  if (termo) {
    sql += ` AND (p.busca_ts @@ plainto_tsquery('portuguese', $${paramCount}) OR p.nome ILIKE $${paramCount + 1})`;
    params.push(termo);
    params.push(`%${termo}%`);
    paramCount += 2;
  }

  if (especialidades.length > 0) {
    sql += ` AND (`;
    especialidades.forEach((esp, idx) => {
      if (idx > 0) sql += ` OR `;
      sql += `p.especialidades @> ARRAY[$${paramCount + idx}]`;
    });
    sql += `)`;
    especialidades.forEach(esp => params.push(esp));
    paramCount += especialidades.length;
  }

  if (inclusivo) {
    sql += ` AND p.inclusivo = true`;
  }

  if (cidade) {
    sql += ` AND p.cidade ILIKE $${paramCount}`;
    params.push(`%${cidade}%`);
    paramCount++;
  }

  // Guardar os índices de latitude e longitude para usar na ordenação
  let latIdx = null, lonIdx = null;
  if (latitude && longitude && raio_km) {
    latIdx = paramCount;
    lonIdx = paramCount + 1;
    sql += ` AND (6371 * acos(cos(radians($${latIdx})) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians($${lonIdx})) + sin(radians($${latIdx})) * sin(radians(p.latitude)))) <= $${paramCount + 2}`;
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
  } else if (ordenar === 'distancia' && latitude && longitude && latIdx !== null && lonIdx !== null) {
    sql += ` ORDER BY (6371 * acos(cos(radians($${latIdx})) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians($${lonIdx})) + sin(radians($${latIdx})) * sin(radians(p.latitude)))) ASC`;
  } else {
    sql += ` ORDER BY p.busca_ts`;
  }

  const offset = (pagina - 1) * por_pagina;
  sql += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(por_pagina, offset);

  const result = await query(sql, params);

  // Contar total com todos os filtros
  let countSql = `SELECT COUNT(*) FROM searchservice.indice_profissionais p WHERE p.ativo = true`;
  const countParams = [];
  let countParamCount = 1;

  if (especialista) {
    countSql += ` AND p.nome ILIKE $${countParamCount}`;
    countParams.push(`%${especialista}%`);
    countParamCount++;
  }

  if (termo) {
    countSql += ` AND (p.busca_ts @@ plainto_tsquery('portuguese', $${countParamCount}) OR p.nome ILIKE $${countParamCount + 1})`;
    countParams.push(termo);
    countParams.push(`%${termo}%`);
    countParamCount += 2;
  }
  if (especialidades.length > 0) {
    countSql += ` AND (`;
    especialidades.forEach((esp, idx) => {
      if (idx > 0) countSql += ` OR `;
      countSql += `p.especialidades @> ARRAY[$${countParamCount + idx}]`;
    });
    countSql += `)`;
    especialidades.forEach(esp => countParams.push(esp));
    countParamCount += especialidades.length;
  }
  if (inclusivo) {
    countSql += ` AND p.inclusivo = true`;
  }
  if (cidade) {
    countSql += ` AND p.cidade ILIKE $${countParamCount}`;
    countParams.push(`%${cidade}%`);
    countParamCount++;
  }
  if (latitude && longitude && raio_km) {
    countSql += ` AND (6371 * acos(cos(radians($${countParamCount})) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians($${countParamCount + 1})) + sin(radians($${countParamCount})) * sin(radians(p.latitude)))) <= $${countParamCount + 2}`;
    countParams.push(latitude, longitude, raio_km);
    countParamCount += 3;
  }
  if (avaliacao_min) {
    countSql += ` AND p.avaliacao_media >= $${countParamCount}`;
    countParams.push(avaliacao_min);
    countParamCount++;
  }
  if (preco_maximo) {
    countSql += ` AND p.preco_minimo <= $${countParamCount}`;
    countParams.push(preco_maximo);
    countParamCount++;
  }
  if (tipo) {
    countSql += ` AND p.tipo = $${countParamCount}`;
    countParams.push(tipo);
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
