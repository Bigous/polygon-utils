export interface Vector2D {
	x: number;
	y: number;
}

export interface Circle2D {
	center: Vector2D;
	radius: number;
}

export interface Box2D {
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
}

export interface shape {
	boudingBox: Box2D;
}

export interface Polygon2D extends shape {
	vertexes: Array<Vector2D>;
}

/**
 * Function to determine if a point is inside a box.
 * @param box Box to perform the test on.
 * @param point Point to verify against.
 * @returns true if the point is inside the box, false otherwise.
 */
export function isInsideBox(box: Box2D, point: Vector2D): boolean {
	return (box.minX <= point.x && box.minY <= point.y) && (box.maxX >= point.x && box.maxY >= point.y);
}

/**
 * Function to determine if a point is inside a polygon.
 * @param polygon Polygon to perform the test on.
 * @param point Point to verify against.
 * @returns true if the point is inside the polygon, false otherwise.
 * @description It uses creates an imaginary line from the point to the infinity right and counts the number of intersections it has with the polygon edges. If its an odd number, the point is inside the polygon.
 */
export function isInsidePolygon(polygon: Polygon2D, point: Vector2D): boolean {
	if (!isInsideBox(polygon.boudingBox, point))
		return false;

	let numIntersections = 0;
	let numPoints = polygon.vertexes.length;
	let p = point;

	for (let i = 0; i < numPoints; i++) {
		let cp = polygon.vertexes[i];
		if (cp.x == p.x && cp.y == p.y) {
			return true; // se o ponto for sobre um vertice, está no polígono por definição.
		}

		let i1 = (i < numPoints - 1) ? i + 1 : 0;
		let np = polygon.vertexes[i1];

		// Só considerar intersecções que cruzem a reta paralela ao eixo x que passem pelo ponto p
		if ((cp.y > p.y) && (np.y <= p.y) ||
			(np.y > p.y) && (cp.y <= p.y)) {
			// Calcula a intersecção da semi-reta paralela ao eixo X que passa pelo ponto p
			// com a aresta definida pelos pontos cp e np (2 vertices consecutivos do polígono)
			let a = cp.y - np.y;
			let minus_b = cp.x - np.x;
			let minus_c = cp.y * np.x - cp.x * np.y;
			let x = (minus_b * p.y + minus_c) / a;
			// Se a intersecção for ã direita, soma-se o número de intersecções.
			if (x >= p.x) {
				numIntersections++;
			}
		}
	}

	// Se o número de intersecções for impar, está dentro do polígono.
	return (numIntersections % 2) > 0;
}
