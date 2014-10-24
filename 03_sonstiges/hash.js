// forEach Funktion auch für Objekte
// inFunktion - die Funktion, die ausgeführt werden soll.
//   Sie bekommt die Parameter
//     schluessel
//     wert
//     index

Object.prototype.forEach = function( inFunktion ) {
  var me = this;
  var schluessel = Object.keys( me );
  schluessel.forEach( function( e, i ) {
    inFunktion( e, me[ e ], i );
  } );
}


var hash = { 'Bern': 2, 'Basel': 7, 'Sion': 12 };

hash.forEach( function( schluessel, wert, index ) {
  console.log( index + ". Schlüssel:" + schluessel + " Wert:" + wert );
} );
