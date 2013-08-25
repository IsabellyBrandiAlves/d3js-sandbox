/*
---------------------------------------------------------- 
                   custom svg paths
----------------------------------------------------------
*/
function Symbols() {

	function Shield() {
	    var state = {
	        l1: 6,
	        l2: 12
	    }
	    function draw() {
	    	var l1 = state.l1;
	    	var l2 = state.l2;
	        var x = l1;
	        var y = l1;
	        var path = "M "+x+" "+y;
	        x += l2;
	        path += " L "+x+" "+y;
	        y += l2;
	        path += " L "+x+" "+y;
	        x -= l1;
	        y += l1;
	        path += " L "+x+" "+y;
	        x -= l1;
	        y -= l1;
	        path += " L "+x+" "+y;
	        return path + " z";
	    }
	    draw.l1 = function(l) {
	        if(l == undefined) {
	            return state.l1;
	        }
	        state.l1 = l;
	    }
	    draw.l2 = function(l) {
	        if(l == undefined) {
	            return l1;
	        }
	        sate.l1 = l;
	    }
	    return draw;
	}

	function Sword() {
	    var state = {
	        l1: 5,
	        l2: 10
	    }
	    function draw() {
	        var l1 = state.l1;
	    	var l2 = state.l2;
	        var x = l1 + l1;
	        var y = l1  + l1;
	        var path = "M "+x+" "+y;
	        x += l1;
	        y -= l1;
	        path += " L "+x+" "+y;
	        x += l1;
	        y += l1;
	        path += " L "+x+" "+y;
	        x -= l1 / 2;
	        y += l2;
	        path += " L "+x+" "+y;
	        x += l1;
	        path += " L "+x+" "+y;
	        y += l1;
	        path += " L "+x+" "+y;
	        x -= l1;
	        path += " L "+x+" "+y;
	        y += l1;
	        path += " L "+x+" "+y;
	        x -= l1;
	        path += " L "+x+" "+y;
	        y -= l1;
	        path += " L "+x+" "+y;
	        x -= l1;
	        path += " L "+x+" "+y;
	        y -= l1;
	        path += " L "+x+" "+y;
	        x += l1;
	        path += " L "+x+" "+y;
	        return path + " z";
	    }
	    draw.l1 = function(l) {
	        if(l == undefined) {
	            return state.l1;
	        }
	        state.l1 = l;
	    }
	    draw.l2 = function(l) {
	        if(l == undefined) {
	            return l1;
	        }
	        sate.l1 = l;
	    }
	    return draw;
	}

	function Cross() {
	    var state = {
	        l1: 5,
	        l2: 8
	    }
	    function draw() {
	    	var l1 = state.l1;
	    	var l2 = state.l2;
	        var x = l1 + l2;
	        var y = l1;
	        var path = "M "+x+" "+y;
	        x += l1;
	        path += " L "+x+" "+y;
	        y += l2;
	        path += " L "+x+" "+y;
	        x += l2;
	        path += " L "+x+" "+y;
	        y += l1;
	        path += " L "+x+" "+y;
	        x -= l2;
	        path += " L "+x+" "+y;
	        y += l2;
	        path += " L "+x+" "+y;
	        x -= l1;
	        path += " L "+x+" "+y;
	        y -= l2;
	        path += " L "+x+" "+y;
	        x -= l2;
	        path += " L "+x+" "+y;
	        y -= l1;
	        path += " L "+x+" "+y;
	        x += l2;
	        path += " L "+x+" "+y;
	        return path + " z";
	    }
	    draw.l1 = function(l) {
	        if(l == undefined) {
	            return state.l1;
	        }
	        state.l1 = l;
	    }
	    draw.l2 = function(l) {
	        if(l == undefined) {
	            return l1;
	        }
	        sate.l1 = l;
	    }
	    return draw;
	}

	function Wand() {
	    var state = {
	        l1: 5,
	        l2: 18
	    }
	    function draw() {
	    	var l1 = state.l1;
	    	var l2 = state.l2;
	        var x = l1;
	        var y = l1;
	        var path = "M "+x+" "+y;
	        x += l1;
	        path += " L "+x+" "+y;
	        y += l2;
	        path += " L "+x+" "+y;
	        x -= l1;
	        path += " L "+x+" "+y;
	        return path + " z";
	    }
	    draw.l1 = function(l) {
	        if(l == undefined) {
	            return state.l1;
	        }
	        state.l1 = l;
	    }
	    draw.l2 = function(l) {
	        if(l == undefined) {
	            return l1;
	        }
	        sate.l1 = l;
	    }
	    return draw;
	}

	return {
		Shield: Shield,
		Sword:  Sword,
		Cross:  Cross,
		Wand:   Wand
	}

}

/*
---------------------------------------------------------- 
                   the board
----------------------------------------------------------
*/
function Board(size) {
	var radius = 16;
	var xspace = 27;
	var yspace = 25;

	function Point(x, y) {
	    var point = { x:x, y:y, svg:{}};
	    var svgX = x * xspace;
	    if(y % 2 != 0) {
	        svgX += xspace /2;
	    }
	    var svgY = y * yspace;
	    point.svg.x = svgX;
	    point.svg.y = svgY;
	    return point;
	}

	function distance(p1,p2) {
	    var x = p1.x;
	    var y = p1.y;
	    var x2 = p2.x;
	    var y2 = p2.y;
	    var yd = Math.abs(y - y2);
	    if(yd % 2 == 1) {
	        if(y % 2 == 1) {
	            x2 -= 0.5;
	        } else {
	            x2 += 0.5;
	        }
	    }

	    var dx2 = Math.pow(x-x2, 2);
	    var dy2 = Math.pow(y-y2, 2);
	    return Math.sqrt(dx2 + dy2);
	}

	function Cells() {
		var cells = [];
		var max = Math.floor(size / yspace);
		var middle = Math.floor(max / 2) - 1;
		var center = Point(middle, middle);

		for(var j = 0; j <= max ;j++) {
		    for(var i = 0; i <= max; i++) {
		        var p = Point(i,j);
		        if(distance(p,center) < 11) {
		            cells.push(p);
		        }
		    }
		}
		return cells;
	}

	function Svg() {
		return d3.select(".horizon")
	                .append("svg")
	                    .attr("width", size)
	                    .attr("height", size)
	                .append("g");
	}

	function Layer(svg, cssClass) {
	    return svg.append("g").attr("class", cssClass);
	}

	function drawHexagon(layer, data) {
		var hexagon = d3.hexbin().radius(radius).hexagon();
	    layer.selectAll(".hexagon").data(data).enter()
        	.append("path")
		        .attr("class", "hexagon")
		        .attr("d", hexagon)
		        .attr("transform", function(d) { return "translate(" + d.svg.x + "," + d.svg.y + ")"; });
	}


	var svg = Svg();
	var layers = {
		ground:      Layer(svg, "ground"),
		friends:     Layer(svg, "friends"),
		friendIcons: Layer(svg, "friendIcons"),
		foes:        Layer(svg, "foes")
	};

	return {
		cells: Cells(),
		layers: layers,
		drawCells: drawHexagon
	}
}

/*
---------------------------------------------------------- 
                   the noob guild
----------------------------------------------------------
*/
function Guild(symbols, board) {

	function Player(symbol, dx, dy) {
		var player = {
			symbol: symbol(),
			svg: {dx: dx, dy: dy},
			position: null
		}
		var position = null;

		while(true) {
		    var i = Math.random() * board.cells.length;
		    var cell = board.cells[Math.floor(i)];
		    if(cell.player == undefined || cell.player == null) {
		    	cell.player = player;
		    	player.position = cell;
		    	break;
		    }
		}

		return player;
	}

	var artheon = Player(symbols.Shield(), -12, -14);
	var omegazell = Player(symbols.Sword(), -15, -18);
	var sparadrap = Player(symbols.Cross(), -15, -15);
	var gaea = Player(symbols.Wand(), -7, -14);

	function list() {
		return [artheon,omegazell,sparadrap,gaea];
	}

	function draw() {
		var players = list();
		var positions = [];
		for(i in players) {
			positions.push(players[i].position);
		}
		board.drawCells(board.layers.friends, positions);

		board.layers.friendIcons.selectAll(".icon").data(players).enter()
        	.append("path")
		        .attr("class", "icon")
		        .attr("d", function(d) { return d.symbol; })
		        .attr("transform", function(d) {
		        	var tx = d.position.svg.x + d.svg.dx;
		        	var ty = d.position.svg.y + d.svg.dy;
		        	return "translate(" + tx + "," + ty + ")";
		    	});
	}

	return {
		artheon:   artheon,
		omegazell: omegazell,
		sparadrap: sparadrap,
		gaea:      gaea,

		players:   list,
		draw:      draw
	}
}

/*
---------------------------------------------------------- 
                   the game
----------------------------------------------------------
*/

var symbols = Symbols();
var board = Board(625);
var guild = Guild(symbols, board);

board.drawCells(board.layers.ground, board.cells);
guild.draw();

var data = board.cells;

var nFoes = 4;
var foes = [];
var n = 0;
while(n < nFoes) {
    var i = Math.random() * data.length;
    i = Math.floor(i);
    foes.push(data[i]);
    n++;
}

board.drawCells(board.layers.foes, foes);



