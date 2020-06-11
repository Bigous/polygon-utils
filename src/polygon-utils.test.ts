import { getMaxCircles, getOptimalCircles } from "./polygon-utils";
import { Polygon2D } from "./geometry";
import util from "util";

describe("getMaxCircles", () => {
	// losango
	let poly: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 },
			{ x: 1, y: 0 },
			{ x: 0, y: -1 },
			{ x: -1, y: 0 }
		],
		boudingBox: {
			minX: -1, minY: -1, maxX: 1, maxY: 1
		}
	};

	describe(`Giving polygon ${util.inspect(poly, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getMaxCircles(poly, 0.2);
			expect(verify).toHaveLength(13);
		});
	});
});

describe("getOptimalCircles", () => {
	// losango
	let poly: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 },
			{ x: 1, y: 0 },
			{ x: 0, y: -1 },
			{ x: -1, y: 0 }
		],
		boudingBox: {
			minX: -1, minY: -1, maxX: 1, maxY: 1
		}
	};

	describe(`Giving polygon ${util.inspect(poly, false, null, true)}`, () => {
		test(`Radius 0.2, superposition false, overlapPolygon false`, () => {
			let verify = getOptimalCircles(poly, 0.2, 0.2);
			expect(verify).toHaveLength(13);
		});
		test(`Radius 0.2, superposition true, overlapPolygon false`, () => {
			let verify = getOptimalCircles(poly, 0.2, 0.2, true);
			expect(verify).toHaveLength(13);
		});
		test(`Radius 0.2, superposition false, overlapPolygon true`, () => {
			let verify = getOptimalCircles(poly, 0.2, 0.2, false, true);
			expect(verify).toHaveLength(13);
		});
		test(`Radius 0.2, superposition true, overlapPolygon true`, () => {
			let verify = getOptimalCircles(poly, 0.2, 0.2, true, true);
			expect(verify).toHaveLength(13);
		});
	});
});
