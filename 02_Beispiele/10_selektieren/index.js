/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

var $ausgabe;
function ausgeben( in_text ) {
  $ausgabe.text( in_text );
}

function gibObjekteAusCSVString( in_csv_string ) {
  console.log( "-> verarbeite CSV Datei..." );
  
  var alleTextZeilen = in_csv_string.split( /\r\n|\n/ ),
      schluesselNamen = alleTextZeilen[ 0 ].split( ',' ),
      i, j, werte, objekt,
      resultat = [];
  
  for ( i = 1; i < alleTextZeilen.length; i += 1 ) {
    werte = alleTextZeilen[ i ].split( ',' );
    
    if ( werte.length < schluesselNamen.length ) {
      console.log( "   - zu wenig Werte in Zeile " + i );
      
    } else {
      objekt = {};
      for ( j = 0; j < schluesselNamen.length; j += 1 ) {
        objekt[ schluesselNamen[ j ].split( '"' )[ 1 ] ] = werte[ j ].split( '"' )[ 1 ];
      }
      resultat.push( objekt );
      
      if ( werte.lenght > schluesselNamen.length ) {
        console.log( "   - zu viele Werte in Zeile " + i );
      }
    }
  }
  console.log( "<- CSV Datei in " + resultat.length + " Objekte gewandelt" );
  return resultat
}

var objekteArray;

function datenSindDa( in_daten ) {
  ausgeben( 'AJAX Abruf angekommen...' );
  var $erklaerung = $( '#erklaerung' ),
      $neue_zeile;
  
  objekteArray = gibObjekteAusCSVString( in_daten );
  $neue_zeile = $( '<p>Dabei wurden ' +
    objekteArray.length +
    ' Datenobjekte angelegt.</p>' );
  $erklaerung.append( $neue_zeile );
  ausgeben( 'CSV gewandelt...' );
  
  //console.log( "objekteArray:" + objekteArray );
  console.log( "objekteArray[ 0 ]:" + objekteArray[ 0 ] );
  console.log( "objekteArray[ 0 ]:" + objekteArray[ 0 ] );
  
  console.log( "objekteArray.length:" + objekteArray.length );
  var gefiltertArray = objekteArray.filter( function( e ) {
    return ( Number( e[ "Jahr" ] ) === 2012 );
  });
  console.log( "nach filter - gefiltertArray.length:" + gefiltertArray.length );
  
}

$( document ).ready( function() {
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  ausgeben( 'Starten...' );
  
  // Hole Datei mit den Daten in CSV Form
  ausgeben( 'CSV Datei laden und verarbeiten...' );
  $.get( "bevoelkerung_mini.csv", datenSindDa );
  
  // Hier ist Ende der Initialisierungsphase des Programms.
  // Wir warten, bis der Callback "verarbeiteDaten" aufgerufen wird...
} );
