import RequisicaoIncorreta from "../error/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      const response = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .limit(Number(limite))
        .skip((pagina - 1) * limite);
      res.status(200).json(response);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (err) {
    next(err);
  }
}

export default paginar;