const express = require("express");

const server = express();
server.use(express.json());

const projects = [
  {
    id: 1,
    title: "Novo Projeto",
    tasks: []
  },
  {
    id: 2,
    title: "Novo2 jeto2",
    tasks: ["oi", "dois"]
  }
];

server.use((req, res, next) => {
  sum = typeof sum == "undefined" ? 1 : sum + 1;
  console.log(`Foram realizadas: ${sum} requisições.`);

  next();
});

function checkExistId(req, res, next) {
  const index = projects.findIndex(project => project.id == req.params.id);
  if (index == -1) {
    return res.status(400).json({ error: "Deu ruim" });
  }
  return next();
}

function checkDuplicatedId(req, res, next) {
  const index = projects.findIndex(project => project.id == req.body.id);
  if (index != -1) {
    return res.status(400).json({ error: "Id Duplicado" });
  }
  return next();
}

server.post("/projects", checkDuplicatedId, (req, res) => {
  const project = req.body;

  projects.push(project);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkExistId, (req, res) => {
  const index = projects.findIndex(project => project.id == req.params.id);
  const { title } = req.body;
  projects[index].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkExistId, (req, res) => {
  const index = projects.findIndex(project => project.id == req.params.id);

  projects.splice(index, 1);
  return res.json(projects);
});

server.post("/projects/:id/tasks", checkExistId, (req, res) => {
  const index = projects.findIndex(project => project.id == req.params.id);
  const { tasks } = req.body;

  projects[index].tasks.push(tasks);

  return res.json(projects);
});

server.listen(3000);
