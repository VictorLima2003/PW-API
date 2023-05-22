const express = require('express');

const app = express();

app.use(express.json());

let database_fake = []
let idsCreated = 0;

//CUSTOS
app.post('/spending/new', (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const value = req.body.value;

  idsCreated = idsCreated + 1

  const data = {
    id: idsCreated,
    title,
    subtitle,
    value,
    category: "spending"
  }

  database_fake.push(data);

  return res.json(data)
});

app.get('/spending/list', (req, res) => {
  const spending_list = [];

  for (let i = 0; i <= database_fake.length - 1; i++) {
    if (database_fake[i].category == 'spending') {
      spending_list.push(database_fake[i]);
    }
  }

  return res.json(spending_list);
});

//GANHOS
app.post('/earnings/new', (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const value = req.body.value;

  idsCreated = idsCreated + 1

  const data = {
    id: idsCreated,
    title,
    subtitle,
    value,
    category: "earnings"
  }

  database_fake.push(data);

  return res.json(data)
});

app.get('/earnings/list', (req, res) => {
  const earnings_list = [];

  for (let i = 0; i <= database_fake.length - 1; i++) {
    if (database_fake[i].category == 'earnings') {
      earnings_list.push(database_fake[i]);
    }
  }

  return res.json(earnings_list);
});

//GERAL
app.get('/list', (req, res) => {
  const data = database_fake;

  return res.json(data);
}) 

app.delete('/delete', (req, res) => {
  const id = req.query.id;

  var newArray = database_fake.filter(function(item) {
    return item.id !== id;
  });

  database_fake = newArray

  return res.json("Item deleted with succefull");
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const value = req.body.value;

  for(let i = 0; i <= database_fake.length - 1; i++) {
    if (database_fake[i].id == id) {
      database_fake[i].title = title;
      database_fake[i].subtitle = subtitle;
      database_fake[i].value = value;
    }
  }

  return res.json("Item updated with succefull");
});

app.listen(3333, () => {
  console.log("Server is running in port 3333");
});