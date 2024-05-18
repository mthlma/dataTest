const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Endpoint para salvar os dados
app.post('/save', (req, res) => {
  const data = req.body.data;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `data-${timestamp}.txt`;
  const filePath = path.join(__dirname, 'data', filename);
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      res.status(500).send('Erro ao salvar dados');
      return;
    }
    res.status(200).send('Dados salvos com sucesso');
  });
});

// Endpoint para listar os arquivos
app.get('/files', (req, res) => {
  const dataDir = path.join(__dirname, 'data');
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      res.status(500).send('Erro ao listar arquivos');
      return;
    }
    res.json(files);
  });
});

// Endpoint para servir o conteúdo de um arquivo específico
app.get('/data/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'data', filename);
  res.sendFile(filePath);
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
