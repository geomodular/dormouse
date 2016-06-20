

function Timer(target) {
  const base = Timer.time;
  return () => Timer.time - base - target;
}

Timer.time = 0;
Timer.MAX_STEP = 0.06;
Timer.update = function(dt) {
  Timer.time += Math.min(dt, Timer.MAX_STEP);
}

export default Timer;
