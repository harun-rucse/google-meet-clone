module.exports = (socket) => {
  try {
    socket.on('code', (data) => {
      socket.broadcast.emit('code', data);
    });
  } catch (error) {
    console.log(error.message);
  }
};
