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


var schluesselArray = Object.keys( hash );
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



// ------------------------------------------------
// Lösung herkömmlich

var hash = { 'Bern': 7, 'Basel': 5, 'Sion': 12, 'Luzern': 4 }

var summe = 0;
var schluesselArray = Object.keys( hash );
for ( var i = 0; i < schluesselArray.length; i += 1 ) {
  var schluessel = schluesselArray[ i ];
  var wert = hash[ schluessel ];
  summe = summe + wert;
}
console.log( "Hash Summe - herkömmlich:" + summe );



























// ------------------------------------------------
// Lösung russian style

var hash = { 'Bern': 7, 'Basel': 5, 'Sion': 12, 'Luzern': 4 }

console.log( "Hash Summe - abstrahiert:" + Object.keys( hash ).map( function( e ) { return hash[ e ] } ).reduce( function( sum, e ) { return sum + e } ) );





























// ------------------------------------------------
// Lösung abstrahiert ausführlich

var hash = { 'Bern': 7, 'Basel': 5, 'Sion': 12, 'Luzern': 4 }

function summieren( sum, e ) { return sum + e }
function wertHolen( schluessel ) { return hash[ schluessel ] }

var schluesselArray = Object.keys( hash );

var summe = schluesselArray.map( wertHolen ).reduce( summieren );
console.log( "Hash Summe - herkömmlich:" + summe );




















