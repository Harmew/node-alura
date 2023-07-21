import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find().then((autores) => res.status(200).json(autores));
  };

  static listarAutorPorId = (req, res) => {
    const { id } = req.params;
    autores
      .findById(id)
      .then((autor) => res.status(200).json(autor))
      .catch((err) =>
        res.status(400).json({
          message: {
            error: "Não foi possível encontrar o autor! Erro: " + err,
          },
        })
      );
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    autor
      .save()
      .then((autor) => res.status(201).json(autor))
      .catch((err) =>
        res.status(500).json({
          message: {
            error: "Não foi possível cadastrar o autor! Erro: " + err,
          },
        })
      );
  };

  static atualizarAutor = (req, res) => {
    const { id } = req.params;
    autores
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => res.status(200).json({ message: "Autor atualizado!" }))
      .catch((err) =>
        res.status(500).json({
          message: {
            error: "Não foi possível atualizar o autor! Erro: " + err,
          },
        })
      );
  };

  static excluirAutor = (req, res) => {
    const { id } = req.params;

    autores
      .findByIdAndDelete(id)
      .then(() =>
        res.status(200).json({
          message: { success: "Autor excluído com sucesso!" },
        })
      )
      .catch((err) =>
        res.status(500).json({
          message: { error: "Não foi possível excluir o autor! Erro: " + err },
        })
      );
  };
}

export default AutorController;
