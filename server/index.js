const handler = require('serve-handler');
const http = require('http');
 
const server = http.createServer((req, res) => 
  handler(req, res, {
    public: 'build',
    rewrites: [
      { "source": "/*", "destination": "/index.html" }
    ]
  })
)

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});