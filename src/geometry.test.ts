import { Box2D, Polygon2D, isInsidePolygon, isInsideBox } from "./geometry";
import util from "util";

describe("isInsideBox", () => {
	let box: Box2D = { minX: -1, minY: -1, maxX: 1, maxY: 1 };

	describe("Givin box " + util.inspect(box, false, null, true), () => {
		let points = [
			{ x: 0, y: 0 }, // meio do box
			{ x: -1, y: -1 }, // vertice do box
			{ x: 1, y: -1 }, // vertice do box
			{ x: -1, y: 1 }, // vertex do box
			{ x: 1, y: 1 }, // vertex do box
			{ x: 2, y: 0 }, // a direita do box
			{ x: -2, y: 0 }, // a esquerda do box
			{ x: 0, y: 2 }, // a cima do box
			{ x: 0, y: -2 }, // a esquerda do box
		];
		let shouldBe = [
			true,
			true,
			true,
			true,
			true,
			false,
			false,
			false,
			false,
		];

		for (let i = 0; i < points.length; i++) {
			let p = points[i];
			let s = shouldBe[i];
			test('P ' + util.inspect(p, false, null, true) + ' should be ' + util.inspect((s ? 'inside' : 'outside'), false, null, true) + ' the box.', () => {
				expect(isInsideBox(box, p)).toBe(s);
			});
		}
	});
});

describe('isInsidePolygon', () => {
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

	describe('Given polygon losango' + util.inspect(poly, false, null, true), () => {
		let points = [
			{ x: 0, y: 0 }, // meio do losango
			{ x: -1, y: -1 }, // dentro do box, mas fora do losango
			{ x: 0, y: 1 }, // vertice do losango
			{ x: 1, y: 0 }, // vertice do losango
			{ x: 0, y: -1 }, // vertice do losango
			{ x: -1, y: 0 }, // vertice do losango
			{ x: 1, y: 1 }, // extremidade do box, mas fora do losango
			{ x: 0.2, y: 0.2 }, // dentro do losango
			{ x: 0.8, y: 0.8 }, // fora do losango
		];

		let shouldBe = [
			true, // meio do losango
			false, // dentro do box, mas fora do losango
			true, // vertice do losango
			true, // vertice do losango
			true, // vertice do losango
			true, // vertice do losango
			false, // extremidade do box, mas fora do losango
			true, // dentro do losango
			false, // fora do losango
		];

		for (let i = 0; i < points.length; i++) {
			let p = points[i];
			let s = shouldBe[i];
			test('P ' + util.inspect(p, false, null, true) + ' should be ' + util.inspect((s ? 'inside' : 'outside'), false, null, true) + ' the polygon.', () => {
				expect(isInsidePolygon(poly, p)).toBe(s);
			});
		}
	});

});
