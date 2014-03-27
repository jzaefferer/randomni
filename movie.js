function rand(length) {
	return Math.floor( Math.random() * length );
}

var i, line, rect, horizontal, vertical, color,
	strength = 10,
	size = 50,
	rows = 12,
	colors = [ "red", "yellow", "blue", "white", "white", "white" ],
	width = stage.width + strength,
	height = stage.height,
	span = 3;

for ( i = 0; i < rows; i++ ) {
	line = new Rect( -strength, i * size - strength, width, strength );
	line.addTo( stage );
	line.fill( "black" );

	line = new Rect( i * size - strength, -strength, strength, height );
	line.addTo( stage );
	line.fill( "black" );

}

var fills = new Array( rows + 2 );
for ( i = 0; i < fills.length; i++) {
	fills[ i ] = new Array( rows + 2 );
}
var store = new Array( rows );
for ( i = 0; i < rows; i++ ) {
	store[ i ] = new Array( rows );
	for ( j = 0; j < rows; j++ ) {
		if ( rand(6) === 0 ) {
			continue;
		}
		horizontal = rand( span ) + 1;
		vertical = rand( span ) + 1;
		if ( horizontal >= span ) {
			vertical = 1;
		}
		if ( vertical >= span ) {
			horizontal = 1;
		}
		if ( fills[ i ][ j ] ) {
			continue;
		}
		color = colors[ rand( colors.length ) ];
		if ( horizontal > 1 && fills[ i ][ j + 1 ] ) {
			horizontal = 1;
		}
		if ( horizontal > 2 && fills[ i ][ j + 2 ] ) {
			horizontal = 2;
		}
		if ( vertical > 1 && fills[ i + 1 ][ j ] ) {
			vertical = 1;
		}
		if ( vertical > 2 && fills[ i + 2 ][ j ] ) {
			vertical = 2;
		}
		fills[ i ][ j ] = true;
		if (horizontal > 1 ) {
			fills[ i ][ j + 1 ] = true;
		}
		if (horizontal > 2 ) {
			fills[ i ][ j + 2 ] = true;
		}
		if (vertical > 1 ) {
			fills[ i + 1 ][ j ] = true;
		}
		if (vertical > 2 ) {
			fills[ i + 2 ][ j ] = true;
		}
		if ( vertical > 1 && horizontal > 1 ) {
			fills[ i + 1 ][ j + 1 ] = true;
		}
		store[ i ][ j ] = {
			color: color,
			horizontal: horizontal,
			vertical: vertical
		};
	}
}

for ( i = 0; i < store.length; i++ ) {
	for ( j = 0; j < store[ i ].length; j++ ) {
		var entry = store[ i ][ j ];
		if ( !entry ) {
			continue;
		}
		rect = new Rect( j * size, i * size, size * entry.horizontal - strength, size * entry.vertical - strength );
		rect.addTo( stage );
		rect.fill( entry.color );
	}
}
