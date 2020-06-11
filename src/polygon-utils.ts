import { Polygon2D, Vector2D, isInsidePolygon } from "./geometry";

export function getMaxPumps(area: Polygon2D, redius: number): Array<Vector2D> {
	let ret = Array<Vector2D>();
	let aWidth = area.boudingBox.maxX - area.boudingBox.minX;
	let aHeight = area.boudingBox.maxY - area.boudingBox.minY;
	let tilesX = aWidth / (redius * 2);
	let tilesY = aHeight / (redius * 2);

	for (let x = 0; x < tilesX; x++) {
		for (let y = 0; y < tilesY; y++) {
			let p: Vector2D = {
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

export function getOptimalPumps(area: Polygon2D, minRadius: number, maxRadius: number, superposition: boolean = false, overlapPolygon: boolean = false): Array<Vector2D> {
	let ret = Array<Vector2D>();

	return ret;
}