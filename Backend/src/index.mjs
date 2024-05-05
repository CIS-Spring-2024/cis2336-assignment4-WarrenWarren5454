import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // fixes CORS exception

const app = express();
const PORT = process.env.PORT || 3000;

let order = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  

app.post("/order", (request, response) => {
    const items = request.body.items;
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    order = [];
    order.push(request.body.items);
    console.log(order);
    response.status(200).json({ total: total.toFixed(2) });
});


app.get("/order", (request, response) => {

    response.status(200).send(order);
})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
