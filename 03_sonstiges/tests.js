// verschiedene Tests in JavaScript

var werte = [ 7, 5, 12, 4 ];


for ( var i = 0; i < werte.length; i+=1 ) {
  console.log( werte[ i ] );
}



function aktion( wert ) {
  console.log( wert );
}

werte.forEach( aktion );




var hash = { 'Bern': 7, 'Basel': 5, 'Sion': 12, 'Luzern': 4 }
var irgendwas = hash[ 'Bern' ];

var schluessel = Object.keys( hash );
// [ 'Bern', 'Basel', 'Sion', 'Luzern' ]


// Summierung eines Array - herkömmlich
var summe = 0;
for ( var i = 0; i < werte.length; i += 1 ) {
  summe = summe + werte[ i ];
}
console.log( summe );


// Summierung eines Array - abstrahiert
var summe = werte.reduce( function( sum, wert ) {
  return sum + wert;
} );
console.log( summe );

