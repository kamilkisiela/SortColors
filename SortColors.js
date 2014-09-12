var SortColors = (function() {

    var colors = [];

    var regHex = /^\#?([a-z0-9]{3,6})$/i;

    // add a color into array
    function add(color) {
        rgbColor = makeRGB(color);
        if (rgbColor !== false)
        {
            colors.push({
                "value": color,
                "ratio": ratio(convert(rgbColor, 'rgb', 'hsv'))
            });
        }
    }

    // set color array
    function set(arr) {
        if(arr && arr.length)
        {
            for(var x = 0; x < arr.length; x++)
            {
                add(arr[x]);
            }
        }
    }
    
    function makeRGB(color) {
        var results = regHex.exec(color);

        if (results && results.length)
        {
            return convert(results[results.length-1], 'hex', 'rgb');
        }
        else
        {
            error('Not supported format: ' + color);
            return false;
        }
    }
    
    // convert rgb to hsv
    function rgb2hsv(rgb) {
        var rr, gg, bb,
                r = rgb[0] / 255,
                g = rgb[1] / 255,
                b = rgb[2] / 255,
                h, s,
                v = Math.max(r, g, b),
                diff = v - Math.min(r, g, b),
                diffc = function(c) {
                    return (v - c) / 6 / diff + 1 / 2;
                };

        if (diff === 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(r);
            gg = diffc(g);
            bb = diffc(b);

            if (r === v) {
                h = bb - gg;
            } else if (g === v) {
                h = (1 / 3) + rr - bb;
            } else if (b === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }

        h = Math.round(h * 360);
        s = Math.round(s * 100);
        v = Math.round(v * 100);

        return [h, s, v];
    }
    
    // convert hex to rgb
    function hex2rgb(hex) {

        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        
        return [r, g, b];
    }
    
    function convert(color, from, to) {
        if(from && to && color) {
            from    = from.toLowerCase();
            to      = to.toLowerCase();
            
            if(from == 'hex')
            {
                if(to == 'rgb')
                {
                    return hex2rgb(color);
                }
                else
                {
                    error('Not supported format');
                }
            }
            else if(from == 'rgb')
            {
                if(to == 'hsv')
                {
                    return rgb2hsv(color);
                }
                else
                {
                    error('Not supported format');
                }
            }
            
        }
        else
        {
            error('Invalid number of arguments');
        }
    }
    
    function ratio(hsv) {
        var ratio;
        var H = hsv[0];
        var S = hsv[1];
        var V = hsv[2];

        H /= 360;
        S /= 100;
        V /= 100;
        
        ratio = H + V;

        return ratio;
    }
    
    function sort() {
        if(colors)
        {
            colors.sort(function(a, b)
            {
                var keyA = a.ratio;
                var keyB = b.ratio;

                if (keyA < keyB)
                    return -1;
                if (keyA > keyB)
                    return 1;
                return 0;
            });
            
            return true;
        }
        else
        {
            log('Error: No colors');
            return false;
        }
    }
    
    function get() {
        if(sort())
        {
            var original = [];
            for(var x = 0; x < colors.length; x++)
            {
                original[x] = colors[x].value;
            }
            return original;
        }
        else
        {
            return false;
        }
    }
    
    function error(msg) {
        log('ERROR: '+msg);
    }

    function log(msg) {
        console.debug(msg);
    }

    // define the public API
    var API = {};
    API.add = add;
    API.set = set;
    API.get = get;

    return API;
}());