import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(messase = "Um ou mais dados fornecidos estão incorretos.") {
    super(400, messase);
  }
}

export default RequisicaoIncorreta;
