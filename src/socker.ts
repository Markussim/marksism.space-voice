/*const io = require('socket.io')(3000);

io.on('connect', (socket: any) => {
  // either with send()
  socket.send('Hello!');

  // or with emit() and custom event names
  socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on('message', (data: any) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on('salutations', (elem1: any, elem2: any, elem3: any) => {
    console.log(elem1, elem2, elem3);
  });
});*/