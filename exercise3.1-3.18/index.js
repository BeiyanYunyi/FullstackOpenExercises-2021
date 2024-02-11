import express from 'express';
const app = express();

import morgan from 'morgan';
import Phone from './phonebook.js';

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

app.get('/', (req, res) => {
  res.send('<h1>FkYou!</h1>');
});

app.get('/api/persons', (req, res) => {
  Phone.find({}).then((persons) => {
    console.log(persons);
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Phone.findById(req.params.id)
      .then((person) => {
        res.json(person);
      })
      .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => next(error));
});

app.post('/api/persons/', (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  if (!body.phone) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  const person = new Phone({
    name: body.name,
    phone: body.phone,
    date: new Date(),
  });
  person
      .save()
      .then((savedPhone) => {
        res.json(savedPhone);
      })
      .catch((error) => next(error));
});

app.get('/info', (req, res) => {
  Phone.find({})
      .then((persons) => {
        console.log(persons);
        const numberofpersons =
        persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
        res.send(`<p>电话簿里有${numberofpersons}人</p><p>${Date()}</p>`);
      })
      .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({error: 'malformatted id'});
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
