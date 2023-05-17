const http = require( "http" );

const server = http.createServer( requestListener );

server.listen( 3000 );
function requestListener( req, res ) {
  

  res.end('hello from node')
}

const myserver = http.createServer( requestListener );
myserver.listen( 3001 );

let count = 0;
function requestListener( req, res ) {
  count++;

  res.end(`${count}`)
}

// console.log( server );


