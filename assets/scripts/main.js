// Generated by CoffeeScript 1.7.1
(function() {
  var socket;

  socket = io.connect();

  socket.emit('ready');

  socket.on('connectionEvent', function(data) {
    return console.log(data.status);
  });

  $(document).ready(function() {
    var apex, blipping, ctx, ddy, draw, dx, dy, h, ppx, ppy, px, py, scanBarWidth, start_y, switched, w;
    ctx = ekg.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
    px = 0;
    ppx = px;
    dx = 1;
    start_y = h * 0.6;
    py = start_y;
    ppy = start_y;
    dy = 0;
    ddy = 0;
    apex = 0;
    switched = false;
    blipping = false;
    scanBarWidth = 20;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    socket.on("tweetEvent:" + topic, function(data) {
      console.log(data.text + ' - ' + data.handle);
      $('.tweet').text("" + data.text + " - " + data.handle);
      if (!blipping) {
        dy = -50;
        ddy = -5;
        blipping = true;
        return switched = false;
      }
    });
    draw = function() {
      px += dx;
      ctx.clearRect(px, 0, scanBarWidth, h);
      ctx.beginPath();
      ctx.moveTo(ppx, ppy);
      ctx.lineTo(px, py);
      ctx.stroke();
      ppx = px;
      ppy = py;
      if (ppx > w) {
        px = ppx = -dx;
      }
      py += dy;
      dy -= ddy;
      if (py > start_y && ddy !== 0 && blipping && !switched) {
        ddy = -ddy;
        switched = true;
      } else if (py < start_y && ddy !== 0 && switched) {
        ddy = 0;
        dy = 0;
        switched = false;
        blipping = false;
      }
      return requestAnimationFrame(draw);
    };
    return draw();
  });

}).call(this);
