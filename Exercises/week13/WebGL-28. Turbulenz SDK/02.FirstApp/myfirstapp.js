TurbulenzEngine.onload = function onloadFn()
{
  var intervalID;
  var gd = TurbulenzEngine.createGraphicsDevice({});

  function update()
  {
    if (gd.beginFrame())
    {
      gd.clear([1.0, 1.0, 0.0, 1.0]);
      gd.endFrame();
    }
  }

  intervalID = TurbulenzEngine.setInterval(update, 1000/60);
};