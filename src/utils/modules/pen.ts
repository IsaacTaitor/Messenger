let ctx, flag = false,
	prevX = 0,
	currX = 0,
	prevY = 0,
	currY = 0,
	dotFlag = false,
	changeMode = false,
	canvas = null;


const x = 'black',
	y = 2;

function draw() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = x;
	ctx.lineWidth = y;
	ctx.stroke();
	ctx.closePath();
}

function findxy(res, e) {
	if ((res === 'down') && changeMode) {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;

		flag = true;
		dotFlag = true;
		if (dotFlag) {
			ctx.beginPath();
			ctx.fillStyle = x;
			ctx.fillRect(currX, currY, 2, 2);
			ctx.closePath();
			dotFlag = false;
		}
	}
	if (res === 'up' || res === 'out') {
		flag = false;
	}
	if (res === 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;
			draw();
		}
	}
}

const moveMouse = (e) => findxy('move', e);

const moveDown = (e) => findxy('down', e);

const moveUp = (e) => findxy('up', e);

const moveOut = (e) => findxy('out', e);


export function pen(newCanvas) {
	ctx = newCanvas.getContext('2d');
	canvas = newCanvas;
	canvas.addEventListener('mousemove', moveMouse, false);
	canvas.addEventListener('mousedown', moveDown, false);
	canvas.addEventListener('mouseup', moveUp, false);
	canvas.addEventListener('mouseout', moveOut, false);
}

export function changeModePen(newChangeMode) {
	changeMode = newChangeMode;
}

export function clearEventListener(canvas) {
	canvas.removeEventListener('mousemove', moveMouse, false);
	canvas.removeEventListener('mousedown', moveDown, false);
	canvas.removeEventListener('mouseup', moveUp, false);
	canvas.removeEventListener('mouseout', moveOut, false);
}