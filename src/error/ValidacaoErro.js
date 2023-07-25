import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ValidacaoErro extends RequisicaoIncorreta {
  constructor(err) {
    const errorMessages = Object.values(err.errors)
      .map((e) => e.message)
      .join(" - ");

    super(errorMessages);
  }
}

export default ValidacaoErro;
