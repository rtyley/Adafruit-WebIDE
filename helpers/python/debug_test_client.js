var net = require('net');
var file_path = "/Users/jwcooper/dev/apps/OccEditor/helpers/python/temp/test.py";
var debug_client;
var HOST = '127.0.0.1',
    PORT = 5000,
    buffer = '';

function connect() {
  debug_client = new net.Socket();
  debug_client.connect(PORT, HOST, function() {
    client_connected = true;
    console.log('connected to python debugger: ' + HOST + ':' + PORT);
    console.log(file_path);

    debug_client.write('QUIT\n');
    debug_client.write('DEBUG\t' + file_path + '\n');
    //debug_client.write('ADD_BP\t' + file_path + '~13\n');
    //debug_client.write('RUN\n');
    //debug_client.write('QUIT\n');
    //debug_client.write('QUIT\n');
    //debug_client.write('DEBUG\t' + file_path + '\n');
    debug_client.write('NEXT\n');
    debug_client.write('NEXT\n');
    debug_client.write('NEXT\n');
    debug_client.write('NEXT\n');
    debug_client.write('QUIT\n');
    debug_client.write('DEBUG\t' + file_path + '\n');
    debug_client.write('NEXT\n');
    debug_client.write('NEXT\n');
    debug_client.write('NEXT\n');
    debug_client.write('NEXT\n');
    //debug_client.write('QUIT\n');
    //debug_client.write('DEBUG\t' + file_path + '\n');
    //debug_client.write('NEXT\n');
    //debug_client.write('NEXT\n');
    //debug_client.write('NEXT\n');
    //debug_client.write('NEXT\n');
    //debug_client.write('NEXT\n');
    //debug_client.write('NEXT\n');

  });

  // Add a 'data' event handler for the client socket
  // data is what the server sent to this socket
    debug_client.on('data', function(data) {
      buffer += data.toString();
      if (buffer.indexOf('\n')) {
        var temp_buff = buffer.split('\n');
        for (var i=0; i<temp_buff.length-1; i++) {
          console.log(JSON.parse(temp_buff[i]));
          //socket.emit('debug-file-response', JSON.parse(temp_buff[i]));
        }

        buffer = temp_buff.slice(temp_buff.length);
      }
    });

  debug_client.on('error', function(data) {
    console.log('ERROR: ' + data);
  });

  // Add a 'close' event handler for the client socket
  debug_client.on('close', function() {
      console.log('Connection closed');
      client_connected = false;
      debug_client = null;
      connect();
  });
}

connect();