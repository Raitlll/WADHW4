const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type','text/plain');
    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'posts';
            break
        case '/addnewpost':
            path += 'addnewpost';
            break
        case '/singlepost':
            path += 'singlepost';
            break
        default:
            path += '404';
            break
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    })
});
server.listen(3000, 'localhost', () => {
    console.log('I am listing for requests on port 3000');
    console.log('I am still listing for requests on port 3000');
});
