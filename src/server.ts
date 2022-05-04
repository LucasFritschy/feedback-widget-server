import express from 'express'

const app = express()

app.get('/users', (req, res) => {
  res.send('beleza pura')
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})