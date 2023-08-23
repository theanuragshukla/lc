const express = require('express')
const app = express()
const port = 8000
const http = require('http').Server(app)


app.get("/", (_, res)=>{
    res.json({
        status:true, msg:"Alive!"
    })
    return
})


const server = http.listen(port, ()=>{
    console.log(`running on port ${port}`)
})
