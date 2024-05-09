import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Маршрут для обработки данных формы от клиента
app.post('/submitFormData', async (req, res) => {
  // Получение данных формы из тела запроса
  const formData = req.body;
  console.log(formData);

  try {
    // Отправка данных в Google Forms через API
    const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfVS40lVG-YrjKAhcyq35T3N8tTsQZUyOZroy019tbgfMLHpQ/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form data to Google Forms');
    }

    console.log('Form data submitted to Google Forms successfully');
    res.status(200).send('Form data submitted successfully');
  } catch (error) {
    console.error('Error submitting form data to Google Forms:', error.message);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});