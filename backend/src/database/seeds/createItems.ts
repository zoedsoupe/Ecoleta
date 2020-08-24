import Knex from "knex";

//* fill the initial data to items's table on the database
export const seed = async (knex: Knex) => {
  await knex("items").insert([
    {
      title: "Lâmpadas",
      img: "https://storage.googleapis.com/ecoleta/lampadas.svg",
    },
    {
      title: "Pilhas e baterias",
      img: "https://storage.googleapis.com/ecoleta/baterias.svg",
    },
    {
      title: "Papéis e Papelão",
      img: "https://storage.googleapis.com/ecoleta/papeis-papelao.svg",
    },
    {
      title: "Resíduos Eletrônicos",
      img: "https://storage.googleapis.com/ecoleta/eletronicos.svg",
    },
    {
      title: "Resíduos orgânicos",
      img: "https://storage.googleapis.com/ecoleta/organicos.svg",
    },
    {
      title: "Óleo de Cozinha",
      img: "https://storage.googleapis.com/ecoleta/oleo.svg",
    },
  ]);
};
