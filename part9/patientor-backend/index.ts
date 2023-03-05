import express from 'express'
import diagnoseRouter from '../patientor-backend/routes/diagnoseRouter'
import patientsRouter from '../patientor-backend/routes/patientsRouter'

const app = express()
app.use(express.json())
const cors = require('cors')

app.use(cors())


app.get('/ping', (_req, res) => {
    res.send('pong')
})
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server listening ON port ${PORT}`)
})

