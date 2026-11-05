(function (root) {
  const spikes = [];
  const blocks = [];
  const S = (x, n = 1, y = 0) => { for (let i = 0; i < n; i++) spikes.push({ x: x + i, y }); };
  const B = (x, y, w = 1, h = 1) => blocks.push({ x, y, w, h });

  S(14);
  S(21, 2);
  S(29);
  S(34);

  B(41, 0, 1, 1);
  B(46, 0, 2, 1);
  S(52);

  B(58, 0, 1, 1); S(59, 2);
  B(61, 0, 1, 2); S(62, 2);
  B(64, 0, 1, 1);

  S(72, 3);
  S(80, 2);
  S(86);

  B(93, 0, 8, 1);
  S(95, 1, 1);
  S(99, 1, 1);

  S(107, 2);
  B(114, 0, 2, 1); S(116, 2);
  B(118, 0, 2, 2); S(120, 2);
  B(122, 0, 2, 3);
  S(131, 3);

  S(140);
  S(145);
  S(150);

  B(156, 0, 1, 1);
  S(161, 2);
  B(168, 0, 5, 1); S(170, 1, 1);
  S(177, 3);
  S(185, 2);

  spikes.sort((a, b) => a.x - b.x);
  blocks.sort((a, b) => a.x - b.x);

  const level = { spikes, blocks, end: 195 };
  if (typeof module !== 'undefined' && module.exports) module.exports = level;
  else root.GDLevel = level;
})(typeof self !== 'undefined' ? self : this);
