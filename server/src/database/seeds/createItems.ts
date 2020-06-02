import Knex from "knex";

//* fill the initial data to items's table on the database
export const seed = async (knex: Knex) => {
  await knex("items").insert([
    { title: "Lâmpadas", img: "lampadas.svg" },
    { title: "Pilhas e baterias", img: "baterias.svg" },
    { title: "Papéis e Papelão", img: "papeis-papelão.svg" },
    { title: "Resíduos Eletrônicos", img: "eletronicos.svg" },
    { title: "Resíduos orgânicos", img: "organicos.svg" },
    { title: "Óleo de Cozinha", img: "oleo.svg" },
  ]);
};
