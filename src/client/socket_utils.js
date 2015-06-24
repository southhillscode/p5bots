define(function (require) {
    var socket = io.connect('http://localhost:8000');
    var utils =  {

      boardInit: function(port, type) {
        // Board should always immediately fire
        socket.emit('board object', {
          board: type,
          port: port
        });
      },

      pinInit: function(num, direction){
        return function emitPin(){
          socket.emit('pin object', {
            pin: num,
            direction: direction
          });
        }
      },

      socket: socket,

      socketGen: function(kind, direction, pin, arg) {
        return function action(){
          socket.emit('action', {
            action: kind + direction.charAt(0).toUpperCase() + direction.substring(1),
            pin: pin,
            arg: arg
          });
        }
      }

    };

    return utils;
});