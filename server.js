const express=require('express');
const path=require('path');
const http=require('http');
const app=express()
const server=http.createServer(app);
const {spawn}=require('child_process');
const port=80;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'public','root.html'));
})
app.post('/submit',(req,res)=>{
    const {
        Longitude,
        Latitude,
        Housing_median_age,
        Total_rooms,
        Total_bedrooms,
        Population,
        Households,
        Median_income,
        Ocean_proximity
    }=req.body;

    pythonProcess=spawn('python',['predict.py',Longitude,Latitude,Housing_median_age,Total_rooms,Total_bedrooms,Population,Households,Median_income,Ocean_proximity]);

    pythonProcess.stdout.on('data', (data) => {
        const predictedValue = data.toString().trim();
        // console.log('Predicted value:', predictedValue);
        res.status(200).json({predictedValue});
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error from Python script:', data.toString());
        res.status(500).send('An error occurred during prediction.');
    });
})

server.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})