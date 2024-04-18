const express = require('express');
const PayOs = require ('@payos/node');

const payos = new PayOs(
'ea7c55d4-eed9-4257-ad35-3b7f29628400',
'dc54e584-644d-4e4f-9a80-009b6f6c58ad',
'945879dc1660767d5ca5ec5a4a3a985c6f9e39515c4787164c5bc6d3858c6317'
);
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post("/create-payment-link", async(req,res)=>{
    const order = {
        amount: 10000,
        description: "Thanh toan Ebook",
        orderCode: 33,
        returnUrl:"http://localhost:3000/success.html",
        cancelUrl:"http://localhost:3000/cancel.html"
    };
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
});
app.post("/receice-hook", async(req, res) =>{
    console.log(req.body);
    res.json();
});
app.listen(3000, ()=> console.log('runing on port 3000'));