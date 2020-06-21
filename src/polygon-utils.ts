import { Polygon2D, Point2D, isInsidePolygon } from "./geometry";

function isInsideCircle(p: Point2D, radius: number, pt: Point2D): boolean {
	return Math.sqrt((p.x - pt.x) ** 2 + (p.y - pt.y) ** 2) <= radius;
}

function alreadyInTheList(p: Point2D, list: Array<Point2D>, radius: number): boolean {
	for (let pt of list) {
		if (isInsideCircle(p, radius, pt)) {
			return true;
		}
	}
	return false;
};

function getCircleNeighbors(origin: Point2D, radius: number, arc:number=Math.PI/3, startAngle:number = 0): Array<Point2D> {
	let neigbors = Array<Point2D>();
	let maxNeighbors = (Math.PI * 2) / arc;
	for (let i = 0; i < maxNeighbors; i++) {
		let angle = startAngle + arc * i;
		let add = {
			x: origin.x + radius * 2 * Math.cos(angle),
			y: origin.y + radius * 2 * Math.sin(angle)
		};
		neigbors.push(add);
	}
	return neigbors;
}

export function getCirclesInsidePolygon(polygon: Polygon2D, radius: number, arc:number=Math.PI/3) {
	let ret = Array<Point2D>();
	if(polygon.vertexes.length < 3) {
		return ret;
	}
	// pega o ponto inicial e seus adjacentes
	let op = polygon.vertexes[0];
	let p1 = polygon.vertexes[1];
	let p2 = polygon.vertexes[polygon.vertexes.length - 1];

	// pega os vetores de p1 e p2 considerando op como a origem do plano cartesiano.
	let v1 = { x: p1.x - op.x, y: p1.y - op.y };
	let v2 = { x: p2.x - op.x, y: p2.y - op.y };
	let vs = { x: v1.x + v2.x, y: v2.y + v2.y };

	// Vetor do primeiro ponto estará na soma do angulo dos 2 vetores, mas com o raio do curculo.

	let a_vs = Math.atan2(vs.y, vs.x);
	let a_v1 = Math.atan2(v1.y, v1.x);

	let pc1 = {
		x: op.x + radius * Math.cos(a_vs),
		y: op.x + radius * Math.sin(a_vs),
	};

	// Se não estiver dentro, o polígono menor que o raio do circulo
	if (isInsidePolygon(polygon, pc1)) {
		ret.push(pc1);
	} else {
		// se não está,
		// o polígono é muito pequeno. Pega o baricentro e testa de novo...
		pc1 = polygon.vertexes.reduce((pSum, pCurr) => {
			return { x: pSum.x + pCurr.x, y: pSum.y + pCurr.y };
		});

		if (isInsidePolygon(polygon, pc1)) {
			ret.push(pc1);
		} else {
			return ret;
		}
	}

	let neigbors = getCircleNeighbors(pc1, radius, arc, a_v1).filter(x => {
		return !alreadyInTheList(x, ret, radius) && isInsidePolygon(polygon, x);
	});
	while (neigbors.length > 0) {
		ret.push(...neigbors);
		let nextIteration : Array<Point2D> = [];
		for(let neighbor of neigbors) {
			nextIteration.push( ...getCircleNeighbors(neighbor, radius, arc, a_v1).filter(x => {
				return !alreadyInTheList(x, ret, radius) && !alreadyInTheList(x, nextIteration, radius) && isInsidePolygon(polygon, x);
			}));
		}
		neigbors = nextIteration;
	}

	return ret;
}

export function getParallelCirclesInsidePolygon(polygon: Polygon2D, radius: number): Array<Point2D> {
	return getCirclesInsidePolygon(polygon, radius, Math.PI / 2);
}

export function getBeeCirclesInsidePolygon(polygon: Polygon2D, radius: number): Array<Point2D> {
	return getCirclesInsidePolygon(polygon, radius, Math.PI / 3);
}

export function getOptimalCircles(area: Polygon2D, minRadius: number, maxRadius: number, superposition: boolean = false, overlapPolygon: boolean = false): Array<Point2D> {
	let ret = Array<Point2D>();

	return ret;
}