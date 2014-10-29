/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/* global: jQuery, $ */

jQuery( function() {
  console.log( "jQuery Start" );
  var $ausgabe;
  
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  ausgeben( 'Starten...' );
  
  function ausgeben( in_text ) {
    $ausgabe.text( in_text );
  }
  
  // Schritt 1: Daten laden (lokal)
  $.get( "../bevoelkerung.csv", function( in_daten ) {
    console.log( "-- Daten sind da - length:" + in_daten.length );
    ausgeben( "Daten gelesen.." );
    
    // Hämmerchen, spalte an Zeilenumbrüchen
    var zeilen = in_daten.split( "\n", 5000 );
    console.log( "Wir haben " + zeilen.length + " Zeilen gefunden" );
    
    // Hämmerchen 2, spalten an Kommas / Feldtrennung
    // apply special treatment to the first line
    var propertyNames = zeilen[ 0 ].split( "," );
    var datencontainer = [];
    
    for ( var index = 1; index < zeilen.length - 1; index += 1 ) {
      // concentrate on elements
      var one_line = zeilen[ index ];
      var partsArray = one_line.split( "," );
      var object = {};
      
      for ( var index2 = 0; index2 < partsArray.length; index2 += 1 ) {
        var propertyName = propertyNames[ index2 ];
        propertyName = propertyName.split( '"' )[ 1 ];
        var value = partsArray[ index2 ];
        value = value.split( '"' )[ 1 ];
        object[ propertyName ] = value;
      }
      datencontainer.push( object );
    }
    // packe in JavaScript Objekte
    console.log( "-- Pushed " + datencontainer.length + " objects in our container" );
    // Mittagspause
  } );
} );



























