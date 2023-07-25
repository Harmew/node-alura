class ErroBase extends Error {
  constructor(statusCode = 500, message = "Erro interno do servidor") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  enviarResposta = (res) => {
    res
      .status(this.statusCode)
      .send({ message: this.message, status: this.statusCode });
  };
}

export default ErroBase;
