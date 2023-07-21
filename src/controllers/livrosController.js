import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("autor")
      .then((livros) => res.status(200).json(livros));
  };

  static listarLivroPorId = (req, res) => {
    const { id } = req.params;
    livros
      .findById(id)
      .populate("autor", "-_id nome")
      .then((livro) => res.status(200).json(livro))
      .catch((err) =>
        res.status(400).json({
          message: {
            error: "Não foi possível encontrar o livro! Erro: " + err,
          },
        })
      );
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    livro
      .save()
      .then((livro) => res.status(201).json(livro))
      .catch((err) =>
        res.status(500).json({
          message: {
            error: "Não foi possível cadastrar o livro! Erro: " + err,
          },
        })
      );
  };

  static atualizarLivro = (req, res) => {
    const { id } = req.params;
    livros
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => res.status(200).json({ message: "Livro atualizado!" }))
      .catch((err) =>
        res.status(500).json({
          message: {
            error: "Não foi possível atualizar o livro! Erro: " + err,
          },
        })
      );
  };

  static excluirLivro = (req, res) => {
    const { id } = req.params;

    livros
      .findByIdAndDelete(id)
      .then(() =>
        res.status(200).json({
          message: { success: "Livro excluído com sucesso!" },
        })
      )
      .catch((err) =>
        res.status(500).json({
          message: { error: "Não foi possível excluir o livro! Erro: " + err },
        })
      );
  };

  static listarLivrosPorEditora = (req, res) => {
    const { editora } = req.query;

    livros
      .find({ editora: editora })
      .then((livros) => res.status(200).json(livros))
      .catch((err) =>
        res.status(400).json({
          message: {
            error: "Não foi possível encontrar o livro! Erro: " + err,
          },
        })
      );
  };
}

export default LivroController;
