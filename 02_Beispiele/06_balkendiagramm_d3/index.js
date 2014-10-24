function zeichneGraph( inWerte ) {
  
  // Hole aus dem komplexen Objekt einen Array der Schlüssel
  var schluesselArray = Object.keys( inWerte );
  
  sel = d3.select( '#graph' ).selectAll( 'div' );
  sel.data( schluesselArray )
    .enter().append( 'div' )
      .text( function( d ){
        return d + ': ' + inWerte[ d ];
      } )
      .classed( 'balken', true )
      .attr( {
        'style': function( d ) {
            return 'width: ' + inWerte[ d ] * 30 + 'px;';
        }
      } );
}


$( document ).ready( function() {
  // Start des Programms
  $( '#ausgabe' ).text( 'Starten...' );
  console.log( "Starten..." );
  
  var meineWerte = { 'Luzern': 3, 'Bern': 5, 'Basel': 12, 'Solothurn': 7, 'Chur': 2, 'Genf': 6, 'St. Gallen': 9 };
  zeichneGraph( meineWerte );
  
  console.log( "Fertig!" );
} );



/*
"tagname" ... "div"
".classname" ... ".balken"
"#idname" ... "#graph"

d3.select( '#graph' );
*/
