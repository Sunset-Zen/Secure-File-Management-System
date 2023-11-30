const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//handle.use(cors(corsOptions));

const httpsOptions = {
    key: fs.readFileSync('./PKI/client-key.pem'),
    cert: fs.readFileSync('./PKI/client-cert.pem')
};

app.prepare().then(()=>{
    createServer(httpsOptions, async(req, res)=>{
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
    }).listen(port, (err)=>{
        if(err) throw err;
        console.log('next ready - url https://localhost:' + port);
    })
})