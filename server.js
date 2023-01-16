const express = require("express");
const app = express();
const database = require("./database");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.render("index.ejs", {
    numberOfItterations: 50
  });
});

app.get("/notes", async (req, res) => {
  const notes = await database.getNotes();
  res.render("notes.ejs", { note: notes });
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await database.getNote(id);
  res.render("note.ejs", { note });
});

app.get("/createNote", (req, res) => {
  res.render("createNote.ejs");
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await database.createNote(title, contents);
  res.redirect("/notes");
});

app.post("/notes/:id/delete", async (req, res) => {
  const id = req.params.id;
  await database.deleteNote(id);
  res.redirect("/notes");
});

app.use(express.static("public"));
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

