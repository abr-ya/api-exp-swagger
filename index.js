import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'KM Books Demo',
            version: '1.0.0',
        },
    },
    apis: ['index.js'],
};

const swaggerDocs = await swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);
app.use('/docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


const PORT = process.env.PORT || 5005;
const startServer = () => {
    console.log(`express start on ${PORT}`);
};

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
});

/**
 * @swagger
 * /api:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/api', (req, res) => {
    res.send([
        { id: 1, title: 'Harry Potter'},
        { id: 2, title: 'Война и Мир'},
    ]);
});

/**
 * @swagger
 * /api:
 *   post:
 *     description: Create a new book
 *     parameters:
 *     - name: title
 *       description: title of the book
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       201:
 *         description: Created
 * 
 */
app.post('/api', (req, res) => {
    res.status(201).send();
});


app.listen(PORT, '0.0.0.0', startServer);
