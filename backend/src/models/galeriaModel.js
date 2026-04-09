import mongoose from "mongoose";

const galeriaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true
    },

    imagemUrl: {
      type: String,
      required: true
    },

    descricao: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Galeria", galeriaSchema);
