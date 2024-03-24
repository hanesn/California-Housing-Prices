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

})

server.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})