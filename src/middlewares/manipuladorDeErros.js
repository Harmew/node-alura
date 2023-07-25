import mongoose from "mongoose";
import ErroBase from "../error/ErroBase.js";
import RequisicaoIncorreta from "../error/RequisicaoIncorreta.js";
import ValidacaoErro from "../error/ValidacaoErro.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError)
    new RequisicaoIncorreta().enviarResposta(res);

  if (err instanceof mongoose.Error.ValidationError)
    new ValidacaoErro(err).enviarResposta(res);

  if (err instanceof ErroBase) err.enviarResposta(res);

  new ErroBase().enviarResposta(res);
}

export default manipuladorDeErros;
