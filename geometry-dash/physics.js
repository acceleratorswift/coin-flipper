(function (root) {
  const SPEED = 8.5;   // units per second
  const GRAVITY = 65;  // units per second squared
  const JUMP = 17.5;   // initial jump speed, units per second

  function newPlayer() {
    return { x: 0, y: 0, vy: 0, onGround: true, dead: false, won: false };
  }

  // The cube occupies [x, x+1] by [y, y+1]. Spikes use a smaller hitbox than their art.
  function step(p, held, level, dt) {
    if (p.dead || p.won) return;
    if (p.onGround && held) { p.vy = JUMP; p.onGround = false; }

    const prevY = p.y;
    p.x += SPEED * dt;
    p.vy -= GRAVITY * dt;
    p.y += p.vy * dt;
    p.onGround = false;

    if (p.y <= 0) { p.y = 0; p.vy = 0; p.onGround = true; }

    for (const b of level.blocks) {
      if (b.x > p.x + 1) break;
      if (b.x + b.w < p.x) continue;
      if (p.x < b.x + b.w && p.x + 1 > b.x && p.y < b.y + b.h && p.y + 1 > b.y) {
        if (prevY >= b.y + b.h - 0.02 && p.vy <= 0) {
          p.y = b.y + b.h; p.vy = 0; p.onGround = true;
        } else {
          p.dead = true; return;
        }
      }
    }

    const l = p.x + 0.1, r = p.x + 0.9, bt = p.y + 0.1, tp = p.y + 0.9;
    for (const s of level.spikes) {
      if (s.x > p.x + 1) break;
      if (s.x + 1 < p.x) continue;
      if (l < s.x + 0.7 && r > s.x + 0.3 && bt < s.y + 0.45 && tp > s.y) {
        p.dead = true; return;
      }
    }

    if (p.x >= level.end) p.won = true;
  }

  const api = { SPEED, GRAVITY, JUMP, newPlayer, step };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GDPhysics = api;
})(typeof self !== 'undefined' ? self : this);
