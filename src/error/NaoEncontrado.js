import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(message = "Página não encontrada") {
    super(404, message);
  }
}

export default NaoEncontrado;
