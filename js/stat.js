'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 10;
var TEXT_1 = 'Ура вы победили!';
var TEXT_2 = 'Список результатов:';
var TEXT_FONT = '16px PT Mono';
var TEXT_HEIGHT = 16;
var TEXT_COLOR = '#000000';
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_COLOR = 'rgba(255, 0, 0, 1)';
var RADIUS = 15;

var renderCloud = function (ctx, x, y, color) {
  var i;
  ctx.beginPath();
  ctx.moveTo(x + RADIUS, y);
  for (i = 1; i <= 14; i++) {
    ctx.arc(x + RADIUS + CLOUD_WIDTH / 14 * (i - 1), y + RADIUS, RADIUS, (Math.PI / 180) * 180, 0);
  }
  for (i = 1; i <= 9; i++) {
    ctx.arc(x - RADIUS + CLOUD_WIDTH, y + RADIUS + CLOUD_HEIGHT / 9 * (i - 1), RADIUS, (Math.PI / 180) * 270, (Math.PI / 180) * 90);
  }
  for (i = 1; i <= 14; i++) {
    ctx.arc(x + CLOUD_WIDTH - RADIUS - CLOUD_WIDTH / 14 * (i - 1), y + CLOUD_HEIGHT - RADIUS, RADIUS, 0, (Math.PI / 180) * 180);
  }
  for (i = 1; i <= 9; i++) {
    ctx.arc(x + RADIUS, y - RADIUS + CLOUD_HEIGHT - CLOUD_HEIGHT / 9 * (i - 1), RADIUS, (Math.PI / 180) * 90, (Math.PI / 180) * 270);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.font = TEXT_FONT;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(TEXT_1, CLOUD_X + BAR_WIDTH, CLOUD_Y + RADIUS + TEXT_HEIGHT);
  ctx.fillText(TEXT_2, CLOUD_X + BAR_WIDTH, CLOUD_Y + RADIUS + TEXT_HEIGHT * 2);

  var maxTime = getMaxElement(times);
  var barColor;
  var xPoint;
  var yPointName;
  var barHeight;
  var yPointBar;
  var yPointTime;

  for (var i = 0; i < names.length; i++) {
    barColor = names[i] === 'Вы' ? BAR_COLOR : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    xPoint = CLOUD_X + BAR_WIDTH + i * (BAR_GAP + BAR_WIDTH);
    yPointName = CLOUD_Y + CLOUD_HEIGHT - RADIUS - TEXT_HEIGHT;
    barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    yPointBar = yPointName - GAP - barHeight;
    yPointTime = yPointBar - GAP;
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], xPoint, yPointName);
    ctx.fillStyle = barColor;
    ctx.fillRect(xPoint, yPointBar, BAR_WIDTH, barHeight);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), xPoint, yPointTime);
  }
};
