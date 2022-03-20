module.exports = (app) => {
  app.get("/", (erq, res) => {
    res.render("index", { title: "Pencil Backend Assignment " });
  });
};
