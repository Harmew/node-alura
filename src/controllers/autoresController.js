import NaoEncontrado from "../error/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const response = autores.find();
      req.resultado = response;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await autores.findById(id);

      if (!response) res.status(404).json({ message: "Autor não encontrado." });
      else res.status(200).json(response);
    } catch (err) {
      next(new NaoEncontrado("Autor não encontrado."));
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const response = await autor.save();

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (response !== null)
        res.status(200).json({ message: "Autor atualizado com sucesso" });
      else next(new NaoEncontrado("Autor não encontrado."));
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await autores.findByIdAndDelete(id);

      if (response !== null)
        res.status(200).json({ message: "Autor removido com sucesso" });
      else next(new NaoEncontrado("Autor não encontrado."));

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
