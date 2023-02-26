import express from 'express';


import { bmiCalculator } from './bmiCalculator';
import { calculateExercise } from './calculateExercise';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Full Stack');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({error: "malformatted params"});
  }
  const bmi = bmiCalculator(Number(height), Number(weight));
  res.send(bmi);
});

app.post('/exercise', (req, res) => {
  const {dailyEx, target} = req.body
  if (!dailyEx || !target) {
    res.status(400).send({error: 'missing parameters'})
  }
  for (var i = 0; i < dailyEx.length; i++) {
    if (isNaN(Number(dailyEx[i]))) {
      res.status(400).send({error:'malformatted parameters' }) 
    }
  }
  const result = calculateExercise(dailyEx, Number(target))
  res.send(result)

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});