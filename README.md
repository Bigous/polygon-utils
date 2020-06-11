# Polygon geometry small library

The goal of this small library is to provide a set of useful and fast **cartesian** tools to work with polygons.

If you wanna go for hyperbolic coordinates like lat/long, you should use a conversion to a cartesian plane first, use this library and converts back to lat/long.

The useful [utm-latlng](https://www.npmjs.com/package/utm-latlng) library can be used to convert between lat/long and UTM coordinates (UTM is a cartesian plane representation of the earth).

The only gotcha is that you must use the same UTM zone for the calculus to work.

_Using the lat/long coordinates directly is possible (like long been X and lat been Y), but you must keep in mind that all the measurements will be hyperbolic and some freaky things can happen._

Example:

The distance between two points in lat/long coordinates in meters is not 

$\sqrt{\Delta x^2+\Delta y^2}$

it's $\approx$

$6371000 \times 2 \times atan2(\sqrt{ \sin^2{\frac{\Delta lat \times \frac{\pi}{180}}{2}} + \cos{lat_1 \times \frac{\pi}{180}}\times \cos{lat_2 \times \frac{\pi}{180}} \times \sin^2{\frac{\Delta lon \times \frac{\pi}{180}}{2}} } , \sqrt{1 - \sin^2{\frac{\Delta lat \times \frac{\pi}{180}}{2}} + \cos{lat_1 \times \frac{\pi}{180}}\times \cos{lat_2 \times \frac{\pi}{180}} \times \sin^2{\frac{\Delta lon \times \frac{\pi}{180}}{2}}})$ 

So... Have fun ;)

PS: If you need a more sofisticated and complete library, I'd recommend using [flatten-js](https://github.com/alexbol99/flatten-js). It's really nice and well documented. I've done this because I wanted it to be simple and fast for my pourposes (and for fun :) ). You can compare the [ray_soot](https://github.com/alexbol99/flatten-js/blob/7323efb9c8f931885e273aacaef15bfb532828da/src/algorithms/ray_shooting.js#L14) from flatten and [mine]() to understand what I mean.

License MIT

@author [Richard Natal - Bigous](https://bigous.dev)

<!-- 
Useful links:

http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.110.9927&rep=rep1&type=pdf

https://gis.stackexchange.com/questions/185889/arcmap-fill-polygon-with-points-highest-possible-number-bin-packing-problem

https://wiki.mcneel.com/developer/sdksamples/2dcirclepacking

https://tobias-schwinn.net/2010/02/15/circlepacking-within-curve-boundary/

-->