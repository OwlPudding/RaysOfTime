const DEBUG = false;

const height = 600;
const width = height;
const half = width / 2;
const t = 15;
const th = t / 2;

let hr, min, sec;
let hrSlider;
let minSlider;
let secSlider;

let prevMin;

function darkDefault() {
	fill(100, 100, 100);
}
function midDefault() {
	fill(75, 75, 75);
}
function lightDefault() {
	fill(150, 150, 150);
}
function amDark() {
	fill(0, 115, 196);
}
function amMid() {
	fill(0, 150, 255);
}
function amLight() {
	fill(79, 183, 255);
}
function pmDark() {
	fill(0, 43, 186);
}
function pmMid() {
	fill(10, 67, 255);
}
function pmLight() {
	fill(69, 112, 255);
}
function progressEmpty() {
	fill(100, 100, 100);
}
function progressFill() {
	// fill(0, 255, 100);
	// fill(`rgba(103, 219, 149, 0.7)`);
	fill(189, 189, 155);
}
function setup() {
	createCanvas(width, height);
	angleMode(DEGREES);
	prevMin = minute();
	console.log(prevMin);

	if (DEBUG) {
		hrSlider  = createSlider(0, 24, 11);
		minSlider = createSlider(0, 60, 20);
		secSlider = createSlider(0, 60, 15);
	}
}
function distance(xA, yA, xB, yB) {
  return Math.pow(
    ((xB - xA) * (xB - xA)) + ((yB - yA) * (yB - yA)),
    0.5
  );
}
function midpoint(xA, yA, xB, yB) {
  return [
    (xA + xB) / 2,
    (yA + yB) / 2,
  ];
}
function bottomTriangles() {
	if (DEBUG) {
		hr = hrSlider.value() === 0 ? 24 : hrSlider.value();
	} else {
		hr = hour() === 0 ? 24 : hour();
	}
  const llMid = midpoint(t, half + th, half, height - t);
  const lrMid = midpoint(half, height - t, width - t, half + th);

  /*** LEFT ***/
  const l1 = midpoint(t, half + th, llMid[0], llMid[1]);
  hr >= 24 ? pmDark() : darkDefault();
  triangle(half, half + th, t, half + th, l1[0], l1[1]);
  hr >= 22 ? pmLight() : lightDefault();
  triangle(half, half + th, l1[0], l1[1], llMid[0], llMid[1]);

  hr >= 23 ? pmMid() : midDefault();
  const a = midpoint(t, half + th, l1[0], l1[1]);
  const b = midpoint(l1[0], l1[1], llMid[0], llMid[1]);
  triangle(half, half + th, a[0], a[1], b[0], b[1]);

  const l2 = midpoint(llMid[0], llMid[1], half, height - t);
  hr >= 21 ? pmDark() : darkDefault();
  triangle(half, half + th, llMid[0], llMid[1], l2[0], l2[1]);
  hr >= 19 ? pmLight() : lightDefault();
  triangle(half, half + th, l2[0], l2[1], half, height - t);

  hr >= 20 ? pmMid() : midDefault();
  const aa = midpoint(llMid[0], llMid[1], l2[0], l2[1]);
  const aa1 = midpoint(aa[0], aa[1], l2[0], l2[1]);
  const bb = midpoint(l2[0], l2[1], half, height - t);
  const bb1 = midpoint(l2[0], l2[1], bb[0], bb[1]);
  triangle(half, half + th, aa1[0], aa1[1], bb1[0], bb1[1]);

  /*** RIGHT ***/
  const l3 = midpoint(half, height - t, lrMid[0], lrMid[1]);
  hr >= 18 ? pmDark() : darkDefault();
  triangle(half, half + th, half, height - t, l3[0], l3[1]);
  hr >= 16 ? pmLight() : lightDefault();
  triangle(half, half + th, l3[0], l3[1], lrMid[0], lrMid[1]);

  hr >= 17 ? pmMid() : midDefault();
  const aaa = midpoint(half, height - t, l3[0], l3[1]);
  const bbb = midpoint(l3[0], l3[1], lrMid[0], lrMid[1]);
  triangle(half, half + th, aaa[0], aaa[1], bbb[0], bbb[1]);

  const l4 = midpoint(lrMid[0], lrMid[1], width - t, half + th);
  hr >= 15 ? pmDark() : darkDefault();
  triangle(half, half + th, lrMid[0], lrMid[1], l4[0], l4[1]);
  hr >= 13 ? pmLight() : lightDefault();
  triangle(half, half + th, l4[0], l4[1], width - t, half + th);

  hr >= 14 ? pmMid() : midDefault();
  const aaaa = midpoint(lrMid[0], lrMid[1], l4[0], l4[1]);
  const aaaa1 = midpoint(aaaa[0], aaaa[1], l4[0], l4[1]);
  const bbbb = midpoint(l4[0], l4[1], width - t, half + th);
  const bbbb1 = midpoint(l4[0], l4[1], bbbb[0], bbbb[1]);
  triangle(half, half + th, aaaa1[0], aaaa1[1], bbbb1[0], bbbb1[1]);
}
function topTriangles() {
	if (DEBUG) {
		hr  = hrSlider.value() === 0 ? 24 : hrSlider.value();
	} else {
		hr = hour() === 0 ? 24 : hour();
	}

  /*** LEFT ***/
  const ulMid = midpoint(t, half - th, half, t);
  const urMid = midpoint(half, t, width - t, half - th);

  const u1 = midpoint(t, half - th, ulMid[0], ulMid[1]);
  hr >= 1 ? amDark() : darkDefault();
  triangle(half, half - th, t, half - th, u1[0], u1[1]);
  hr >= 3 ? amLight() : lightDefault()
  triangle(half, half - th, u1[0], u1[1], ulMid[0], ulMid[1]);

  hr >= 2 ? amMid() : midDefault();
  const a = midpoint(t, half - th, u1[0], u1[1]);
  const a1 = midpoint(a[0], a[1], u1[0], u1[1]);
  const b = midpoint(u1[0], u1[1], ulMid[0], ulMid[1]);
  const b1 = midpoint(u1[0], u1[1], b[0], b[1]);
  triangle(half, half - th, a1[0], a1[1], b1[0], b1[1]);

  const u2 = midpoint(ulMid[0], ulMid[1], half, t);
  hr >= 4 ? amDark() : darkDefault();
  triangle(half, half - th, ulMid[0], ulMid[1], u2[0], u2[1]);
  hr >= 6 ? amLight() : lightDefault();
  triangle(half, half - th, u2[0], u2[1], half, t);

  hr >= 5 ? amMid() : midDefault();
  const aa = midpoint(ulMid[0], ulMid[1], u2[0], u2[1]);
  const bb = midpoint(u2[0], u2[1], half, t);
  triangle(half, half - th, aa[0], aa[1], bb[0], bb[1]);

  /*** RIGHT ***/
  const u3 = midpoint(half, t, urMid[0], urMid[1]);
  hr >= 7 ? amDark() : darkDefault();
  triangle(half, half - th, half, t, u3[0], u3[1]);
  hr >= 9 ? amLight() : lightDefault();
  triangle(half, half - th, u3[0], u3[1], urMid[0], urMid[1]);

  hr >= 8 ? amMid() : midDefault();
  const aaa = midpoint(half, t, u3[0], u3[1]);
  const aaa1 = midpoint(aaa[0], aaa[1], u3[0], u3[1]);
  const bbb = midpoint(u3[0], u3[1], urMid[0], urMid[1]);
  const bbb1 = midpoint(u3[0], u3[1], bbb[0], bbb[1]);
  triangle(half, half - th, aaa1[0], aaa1[1], bbb1[0], bbb1[1]);

  const u4 = midpoint(urMid[0], urMid[1], width - t, half - th);
  hr >= 10 ? amDark() : darkDefault();
  triangle(half, half - th, urMid[0], urMid[1], u4[0], u4[1]);
  hr >= 12 ? amLight() : lightDefault();
  triangle(half, half - th, u4[0], u4[1], width - t, half - th);

  hr >= 11 ? amMid() : midDefault();
  const aaaa = midpoint(urMid[0], urMid[1], u4[0], u4[1]);
  const bbbb = midpoint(u4[0], u4[1], width - t, half - th);
  triangle(half, half - th, aaaa[0], aaaa[1], bbbb[0], bbbb[1]);
}
function progressBars() {
	if (DEBUG) {
		hr  = hrSlider.value();
		min = minSlider.value();
		sec = secSlider.value();
	} else {
		hr = hour();
		min = minute();
		sec = second();
	}
  
	const isPM = hr >= 12;
	push();
	strokeWeight(0);

  // TOP RIGHT
  const trLength = distance(half, t, width - t, half - th);
  push();
  rotate(44.25);
  translate(226, -504.5);
  
  if (!isPM) {
		progressEmpty();
  	rect(0, half - (th / 2), trLength, th);
    progressFill();
    rect(0, half - (th / 2),
      min <= 20 ? map(min, 0, 20, 0, trLength) : trLength,
    th);
  }
  pop();

  // TOP LEFT
  const tlLength = distance(t, half - th, half, t);
  push();
  rotate(-44.25);
  translate(-209, -86);
  if (!isPM) {
		progressEmpty();
  	rect(t, half - (th / 2), distance(t, half - th, half, t), th);
    progressFill();
    rect(t, half - (th / 2),
      min >= 41 ? map(min, 41, 60, tlLength / 20, tlLength) : 0,
    th);
  }
  pop();

  // BOTTOM LEFT
  const blLength = distance(t, half + th, half, height - t);
  push();
  rotate(44.25);
  translate(210, -84);
  if (isPM) {
    progressFill();
    rect(t, half - (th / 2), blLength, th);
    progressEmpty();
    rect(t, half - (th / 2),
      min >= 41 ? map(min, 41, 60, blLength - (blLength / 20), 0) : blLength,
    th);
	}
  pop();

  // BOTTOM RIGHT
  const brLength = distance(t, half - th, half, t);
  push();
  rotate(-44.25);
  translate(-208, 334.5);
  if (isPM) {
    progressFill();
    rect(t, half - (th / 2), brLength, th);
		progressEmpty();
		const check = min >= 21 ? (
			min > 40 ? 0 : map(min, 21, 40, brLength, 0)
		) : brLength;
    rect(t, half - (th / 2), check, th);
	}
  pop();

  // SECONDS
	const verLength = distance(half, t, half, height - t);
  progressFill();
  rect(half - (2.5 / 2), t, 2.5, distance(half, t, half, height - t));
  progressEmpty();
  rect(half - (2.5 / 2), t, 2.5,
    map(sec, 0, 60, verLength, 0)
	);

  // MIDDLE
  const midLength = distance(t, half - th, width - t, half - th)
  if (isPM) {
    progressEmpty();
    rect(t, half - (th / 2), midLength, th);
    progressFill();
    rect(t, half - (th / 2),
      min <= 20 ? map(min, 0, 20, 0, midLength) : midLength,
    th);
  } else {
    progressFill();
    rect(t, half - (th / 2), midLength, th);
		progressEmpty();
		const check = min >= 21 ? (
			min > 40 ? 0 : map(min, 21, 40, midLength, 0)
		) : midLength;
    rect(t, half - (th / 2), check, th);
	}
	pop();
}
function timeText() {
	if (DEBUG) {
		fill(255, 255, 255);
		text(hrSlider.value(), 10, 30);
		text(minSlider.value(), 10, 60);
		text(secSlider.value(), 10, 90);
	} else {
		const currMin = minute();
		if (currMin !== prevMin) {
			console.log(currMin);
			prevMin = currMin;
		}
	}
}
function draw() {
	background(122);

	timeText();

  topTriangles();

  bottomTriangles();

  progressBars();
}