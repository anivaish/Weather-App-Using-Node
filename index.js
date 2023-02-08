const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homefile = fs.readFileSync("index.html", "utf-8");
const replaceVal=(tempval,orgval)=>{
    let temper=tempval.replace("{%tempval%}",orgval.main.temp);
    temper=temper.replace("{%tempmin%}",orgval.main.temp_min);
    temper=temper.replace("{%tempmax%}",orgval.main.temp_max);
    temper=temper.replace("{%location%}",orgval.name);
    temper=temper.replace("{%country%}",orgval.sys.country);
    return temper;
}    
const server = http.createServer((req, res) => {
    if (req.url == "/") 
    {
        requests(`https://api.openweathermap.org/data/2.5/weather?q=jhansi&appid=1e6bf37320f4f10e27a2ac291f3cbb22&units=metric`)

        .on("data", (chunk)=>{
            const objdata=JSON.parse(chunk);
            const arrdata=[objdata];
            const realTimeData=arrdata.map((val)=>replaceVal(homefile,val)).join("");
            // console.log(realTimeData);
            res.write(realTimeData);
        })
        .on("end " ,(err)=>{
            if(err)
            return console.log("connection closed due to errors",err);
            console.log("end");
            res.end();
        });
    }
})
server.listen(8000,"127.0.0.1");
