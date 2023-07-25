import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório!"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor(a) é obrigatório!"],
    autopopulate: true,
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória!"],
    enum: {
      values: ["Casa do código", "Alura", "TechHouse", "Google"],
      message: "A editora {VALUE} não é permitida",
    },
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve ser maior que 10 e menor que 5000",
    },
  },
});

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);
export default livros;
