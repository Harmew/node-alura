import NaoEncontrado from "../error/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await livros.findById(id);

      if (response !== null) res.status(200).json(response);
      else next(new NaoEncontrado("Livro não encontrado."));
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const response = await livro.save();
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (response !== null)
        res.status(200).json({ message: "Livro atualizado com sucesso" });
      else next(new NaoEncontrado("Livro não encontrado."));
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await livros.findByIdAndDelete(id);

      if (response !== null)
        res.status(200).json({ message: "Livro excluído com sucesso" });
      else next(new NaoEncontrado("Livro não encontrado."));
    } catch (err) {
      next(err);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (busca === null) res.status(200).json([]);
      const response = livros.find(busca);
      req.resultado = response;
      next();
    } catch (err) {
      next(err);
    }
  };
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  let busca = {};

  // JavaScript
  if (editora) busca.editora = new RegExp(editora, "i");

  // MongoDB
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) busca.autor = autor._id;
    else busca.autor = null;
  }

  return busca;
}

export default LivroController;
