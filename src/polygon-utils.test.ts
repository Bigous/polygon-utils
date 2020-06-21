import { getParallelCirclesInsidePolygon, getBeeCirclesInsidePolygon } from "./polygon-utils";
import { Polygon2D } from "./geometry";
import util from "util";

describe("getParallelCirclesInsidePolygon", () => {
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

	describe(`Giving poly ${util.inspect(poly, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getParallelCirclesInsidePolygon(poly, 0.2);
			expect(verify).toHaveLength(16);
		});
		test(`Radius 0.5`, () => {
			let verify = getParallelCirclesInsidePolygon(poly, 0.5);
			expect(verify).toHaveLength(4);
		});
		test(`Radius 1.0`, () => {
			let verify = getParallelCirclesInsidePolygon(poly, 1.0);
			expect(verify).toHaveLength(1);
		});
	});

	// losango inverso
	let polyi: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 },
			{ x: -1, y: 0 },
			{ x: 0, y: -1 },
			{ x: 1, y: 0 },
		],
		boudingBox: {
			minX: -1, minY: -1, maxX: 1, maxY: 1
		}
	};

	describe(`Giving polyi ${util.inspect(polyi, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getParallelCirclesInsidePolygon(polyi, 0.2);
			expect(verify).toHaveLength(16);
		});
		test(`Radius 0.5`, () => {
			let verify = getParallelCirclesInsidePolygon(polyi, 0.5);
			expect(verify).toHaveLength(4);
		});
		test(`Radius 1.0`, () => {
			let verify = getParallelCirclesInsidePolygon(polyi, 1.0);
			expect(verify).toHaveLength(1);
		});
	});

	let polyPoint: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 },
			{ x: 0, y: 1 },
			{ x: 0, y: 1 },
			{ x: 0, y: 1 }
		],
		boudingBox: {
			minX: 0, minY: 1, maxX: 0, maxY: 1
		}
	};

	describe(`Giving polyPoint ${util.inspect(polyPoint, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getParallelCirclesInsidePolygon(polyPoint, 0.2);
			expect(verify).toHaveLength(0);
		});
	});

	// Octogono
	let polyO: Polygon2D = {
		vertexes: [
			{ x: 0.5, y: 1.0 },
			{ x: 1.0, y: 0.5 },
			{ x: 1.0, y: -0.5 },
			{ x: 0.5, y: -1.0 },
			{ x: -0.5, y: -1.0 },
			{ x: -1.0, y: -0.5 },
			{ x: -1.0, y: 0.5 },
			{ x: -0.5, y: 1.0 }
		],
		boudingBox: {
			minX: -1, minY: -1, maxX: 1, maxY: 1
		}
	};

	describe(`Giving polyO ${util.inspect(polyO, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getParallelCirclesInsidePolygon(polyO, 0.2);
			expect(verify).toHaveLength(24);
		});
		test(`Radius 0.5`, () => {
			let verify = getParallelCirclesInsidePolygon(polyO, 0.5);
			expect(verify).toHaveLength(4);
		});
		test(`Radius 1.0`, () => {
			let verify = getParallelCirclesInsidePolygon(poly, 1.0);
			expect(verify).toHaveLength(1);
		});
	});
});

describe("getBeeCirclesInsidePolygon", () => {
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

	describe(`Giving poly ${util.inspect(poly, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getBeeCirclesInsidePolygon(poly, 0.2);
			expect(verify).toHaveLength(14);
		});
		test(`Radius 0.5`, () => {
			let verify = getBeeCirclesInsidePolygon(poly, 0.5);
			expect(verify).toHaveLength(3);
		});
		test(`Radius 1.0`, () => {
			let verify = getBeeCirclesInsidePolygon(poly, 1.0);
			expect(verify).toHaveLength(1);
		});
	});

	// losango inverso
	let polyi: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 },
			{ x: -1, y: 0 },
			{ x: 0, y: -1 },
			{ x: 1, y: 0 },
		],
		boudingBox: {
			minX: -1, minY: -1, maxX: 1, maxY: 1
		}
	};

	describe(`Giving polyi ${util.inspect(polyi, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getBeeCirclesInsidePolygon(polyi, 0.2);
			expect(verify).toHaveLength(14);
		});
		test(`Radius 0.5`, () => {
			let verify = getBeeCirclesInsidePolygon(polyi, 0.5);
			expect(verify).toHaveLength(3);
		});
		test(`Radius 1.0`, () => {
			let verify = getBeeCirclesInsidePolygon(polyi, 1.0);
			expect(verify).toHaveLength(1);
		});
	});

	let polySame: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 },
			{ x: 0, y: 1 },
			{ x: 0, y: 1 },
			{ x: 0, y: 1 }
		],
		boudingBox: {
			minX: 0, minY: 1, maxX: 0, maxY: 1
		}
	};

	describe(`Giving polyPoint ${util.inspect(polySame, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getBeeCirclesInsidePolygon(polySame, 0.2);
			expect(verify).toHaveLength(0);
		});
	});

	let polyPoint: Polygon2D = {
		vertexes: [
			{ x: 0, y: 1 }
		],
		boudingBox: {
			minX: 0, minY: 1, maxX: 0, maxY: 1
		}
	};

	describe(`Giving polyPoint ${util.inspect(polyPoint, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getBeeCirclesInsidePolygon(polyPoint, 0.2);
			expect(verify).toHaveLength(0);
		});
	});

	// Octogono
	let polyO: Polygon2D = {
		vertexes: [
			{ x: 0.5, y: 1.0 },
			{ x: 1.0, y: 0.5 },
			{ x: 1.0, y: -0.5 },
			{ x: 0.5, y: -1.0 },
			{ x: -0.5, y: -1.0 },
			{ x: -1.0, y: -0.5 },
			{ x: -1.0, y: 0.5 },
			{ x: -0.5, y: 1.0}
		],
		boudingBox: {
			minX: -1, minY: -1, maxX: 1, maxY: 1
		}
	};

	describe(`Giving polygon ${util.inspect(polyO, false, null, true)}`, () => {
		test(`Radius 0.2`, () => {
			let verify = getBeeCirclesInsidePolygon(polyO, 0.2);
			expect(verify).toHaveLength(26);
		});
		test(`Radius 0.5`, () => {
			let verify = getBeeCirclesInsidePolygon(polyO, 0.5);
			expect(verify).toHaveLength(4);
		});
		test(`Radius 1.0`, () => {
			let verify = getBeeCirclesInsidePolygon(poly, 1.0);
			expect(verify).toHaveLength(1);
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
			// let verify = getOptimalCircles(poly, 0.2, 0.2);
			// expect(verify).toHaveLength(13);
		});
		test(`Radius 0.2, superposition true, overlapPolygon false`, () => {
			// let verify = getOptimalCircles(poly, 0.2, 0.2, true);
			// expect(verify).toHaveLength(13);
		});
		test(`Radius 0.2, superposition false, overlapPolygon true`, () => {
			// let verify = getOptimalCircles(poly, 0.2, 0.2, false, true);
			// expect(verify).toHaveLength(13);
		});
		test(`Radius 0.2, superposition true, overlapPolygon true`, () => {
			// let verify = getOptimalCircles(poly, 0.2, 0.2, true, true);
			// expect(verify).toHaveLength(13);
		});
	});
});


import * as utm from "utm";
import * as fs from "fs";

let polyFile = __dirname + "/Perimetro_da_Fazenda.polygon.test.json";

if(!fs.existsSync(polyFile)) {
	describe("Converting GeoJSON to polygon json", () =>{
		let json = fs.readFileSync(__dirname + "/Perimetro_da_Fazenda.test.geojson").toString();
		let fazenda: GeoJSON.FeatureCollection = JSON.parse(json);
		let coordinates = (<GeoJSON.Polygon>(fazenda.features[0].geometry)).coordinates[0];

		let boudingBox = {
			minX: Number.MAX_VALUE, minY: Number.MAX_VALUE, maxX: Number.MIN_VALUE, maxY: Number.MIN_VALUE
		};

		let vertexes = coordinates.map((x) => {
			let utmc = utm.fromLatLon(x[0], x[1]);
			boudingBox.minX = Math.min(boudingBox.minX, utmc.easting);
			boudingBox.minY = Math.min(boudingBox.minY, utmc.northing);
			boudingBox.maxX = Math.max(boudingBox.maxX, utmc.easting);
			boudingBox.maxY = Math.max(boudingBox.maxY, utmc.northing);
			return { x: utmc.easting, y: utmc.northing };
		});


		let poly = {
			vertexes: vertexes,
			boudingBox: boudingBox
		};

		test(`Polygon loaded`, () => {
			expect(poly.vertexes).toHaveLength(153);
		});

		test(`Polygon saved`, () => {
			fs.writeFileSync(polyFile, JSON.stringify(poly));
			expect(fs.existsSync(polyFile)).toBe(true);
		});
		
	});
}

describe("GeoJSON Fazenda", () => {
	let fazenda = null;

	describe(`Loading Fazenda`, () => {
		fazenda = JSON.parse(fs.readFileSync(polyFile).toString());
		expect(fazenda.vertexes).toHaveLength(153);
	});
});