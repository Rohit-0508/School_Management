const express= require('express');
const bodyParser= require('body-parser');
const schoolRoutes= require('./routes/schoolRoutes');
const schoolModel= require('./models/schoolModel');
const config = require('./config/config');

const app= express();
const port= config.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/schools', schoolRoutes);

app.get('/',(req,res)=>{
    res.json({message:'hey'});
})

schoolModel.createTable().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err=>{
    console.error('Failed to initialize the database', err.message);
})