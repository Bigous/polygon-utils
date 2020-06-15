import { Polygon2D, Point2D, isInsidePolygon } from "./geometry";

export function getParallelCircles(area: Polygon2D, redius: number): Array<Point2D> {
	let ret = Array<Point2D>();
	let aWidth = area.boudingBox.maxX - area.boudingBox.minX;
	let aHeight = area.boudingBox.maxY - area.boudingBox.minY;
	let tilesX = aWidth / (redius * 2);
	let tilesY = aHeight / (redius * 2);

	for (let x = 0; x < tilesX; x++) {
		for (let y = 0; y < tilesY; y++) {
			let p: Point2D = {
				x: area.boudingBox.minX + redius * x * 2 + redius,
				y: area.boudingBox.minY + redius * y * 2 + redius
			};
			if (isInsidePolygon(area, p)) {
				ret.push(p);
			}
		}
	}

	return ret;
}

export function getBeeCircles(area: Polygon2D, radius: number): Array<Point2D> {
	let ret = Array<Point2D>();
	let aWidth = area.boudingBox.maxX - area.boudingBox.minX;
	let aHeight = area.boudingBox.maxY - area.boudingBox.minY;

	let line = 0;
	let x = 0;
	let y = 0;
	let newLine = () => {
		if ((line & 1) == 0) {
			x = radius;
			y = radius + line * radius * 2 * Math.sin(Math.PI / 3);
		} else {
			x = 0;
			y = radius + line * radius * 2 * Math.sin(Math.PI / 3);
		}
		line++;
	};
	newLine();
	while (y < aHeight) {
		while (x < aWidth) {
			let p: Point2D = {
				x: area.boudingBox.minX + x,
				y: area.boudingBox.minY + y
			};
			if (isInsidePolygon(area, p)) {
				ret.push(p)
			}
			x += radius * 2;
		}
		newLine();
	}

	return ret;
}

export function getFillCirclesFromEdge(area: Polygon2D, radius: number): Array<Point2D> {
	let ret = Array<Point2D>();
	// pega o ponto inicial e seus adjacentes
	let op = area.vertexes[0];
	let p1 = area.vertexes[1];
	let p2 = area.vertexes[area.vertexes.length - 1];

	// pega os vetores de p1 e p2 considerando op como a origem do plano cartesiano.
	let v1 = { x: p1.x - op.x, y: p1.y - op.y };
	let v2 = { x: p2.x - op.x, y: p2.y - op.y };

	// descobre o angulo entre os vetores
	let m1 = Math.sqrt(v1.x**2 + v1.y**2);
	let m2 = Math.sqrt(v2.x**2 + v2.y**2);
	let a_v1_v2 = Math.acos((v1.x * v2.x + v1.y * v2.y) / (m1 + m2)); // angulo em radianos entre os 2 vetores
	let a_v1_o  = Math.atan2(v1.x, v1.y); // angulo do vetor 1 em relação ao eixo x
	let a_pc1_o = a_v1_v2 / 2 + a_v1_o;

	// calcula o primeiro centro de circulo dentro do polígono
	let pc1 = {
		x: op.x - radius * Math.cos(a_pc1_o / 2),
		y: op.y - radius * Math.sin(a_pc1_o / 2)
	};

	if(isInsidePolygon(area, pc1)) {
		ret.push(pc1);
	}

	// TODO: #3 Now that we have the first point, we should go mapping the nearest circles with Bee pattern and see if it's inside the poligon and not inside a previous circle. When no neighbor fills the condition, we can say that it's safe to stop filling.

	return ret;
}



export function getOptimalCircles(area: Polygon2D, minRadius: number, maxRadius: number, superposition: boolean = false, overlapPolygon: boolean = false): Array<Point2D> {
	let ret = Array<Point2D>();

	return ret;
}