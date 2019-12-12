let ctx, flag = false,
	prevX = 0,
	currX = 0,
	prevY = 0,
	currY = 0,
	dotFlag = false,
	canvas = null;

const x = 'black',
	y = 2;

function draw(): void {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = x;
	ctx.lineWidth = y;
	ctx.stroke();
	ctx.closePath();
}

function findxy(res, e): void {
	if (res === 'down') {
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

const moveMouse = (e): void => findxy('move', e);

const moveDown = (e): void => findxy('down', e);

const moveUp = (e): void => findxy('up', e);

const moveOut = (e): void => findxy('out', e);


export function pen(newCanvas): void {
	ctx = newCanvas.getContext('2d');
	canvas = newCanvas;
	canvas.addEventListener('mousemove', moveMouse, false);
	canvas.addEventListener('mousedown', moveDown, false);
	canvas.addEventListener('mouseup', moveUp, false);
	canvas.addEventListener('mouseout', moveOut, false);
}

export function clearEventListenerPen(canvas): void {
	canvas.removeEventListener('mousemove', moveMouse, false);
	canvas.removeEventListener('mousedown', moveDown, false);
	canvas.removeEventListener('mouseup', moveUp, false);
	canvas.removeEventListener('mouseout', moveOut, false);
}