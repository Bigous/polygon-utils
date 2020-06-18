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

function isInsideCircle(p: Point2D, radius: number, pt: Point2D): boolean {
	return Math.sqrt((p.x - pt.x) ** 2 + (p.y - pt.y) ** 2) <= radius;
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
	let m1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
	let m2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
	let a_v1_v2 = Math.acos((v1.x * v2.x + v1.y * v2.y) / (m1 + m2)); // angulo em radianos entre os 2 vetores
	let a_v1_o = Math.atan2(v1.x, v1.y); // angulo do vetor 1 em relação ao eixo x
	let a_pc1_o = a_v1_v2 / 2 + a_v1_o;

	// calcula o primeiro centro de circulo dentro do polígono
	let pc1 = {
		x: op.x - radius * Math.cos(a_pc1_o / 2),
		y: op.y - radius * Math.sin(a_pc1_o / 2)
	};

	// Se não estiver dentro, o polígono é pro outro lado
	if (isInsidePolygon(area, pc1)) {
		ret.push(pc1);
	} else {
		a_pc1_o += Math.PI;
		pc1 = {
			x: op.x - radius * Math.cos(a_pc1_o / 2),
			y: op.y - radius * Math.sin(a_pc1_o / 2)
		};
		// se está, segue o jogo
		if (isInsidePolygon(area, pc1)) {
			ret.push(pc1);
		} else {
			// se não está,
			// o polígono é muito pequeno. Pega o baricentro e testa de novo...
			pc1 = area.vertexes.reduce((pSum, pCurr) => {
				return { x: pSum.x + pCurr.x, y: pSum.y + pCurr.y };
			});

			if (isInsidePolygon(area, pc1)) {
				ret.push(pc1);
			} else {
				return ret;
			}
		}
	}

	let alreadyInTheList = (p: Point2D, list: Array<Point2D> = ret): boolean => {
		for(let pt of list) {
			if (isInsideCircle(p, radius, pt)) {
				return true;
			}
		}
		return false;
	};

	let getCircleNeighborsInsidePolygon = (pts: Array<Point2D>, startAngle: number = 0.0): Array<Point2D> => {
		let neigbors = Array<Point2D>();
		let arc = Math.PI / 3;
		for (let p of pts) {
			for (let i = 0; i < 6; i++) {
				let angle = startAngle + arc * i;
				let add = {
					x: p.x + radius * 2 * Math.cos(angle),
					y: p.y + radius * 2 * Math.sin(angle)
				};
				if (!alreadyInTheList(add, neigbors) && !alreadyInTheList(add, ret) && isInsidePolygon(area, add)) {
					neigbors.push(add);
				}
			}
		}
		return neigbors;
	};

	let neigbors = getCircleNeighborsInsidePolygon([pc1], a_pc1_o);
	while (neigbors.length > 0) {
		ret.push(...neigbors);
		neigbors = getCircleNeighborsInsidePolygon(neigbors, a_pc1_o);
	}

	return ret;
}



export function getOptimalCircles(area: Polygon2D, minRadius: number, maxRadius: number, superposition: boolean = false, overlapPolygon: boolean = false): Array<Point2D> {
	let ret = Array<Point2D>();

	return ret;
}