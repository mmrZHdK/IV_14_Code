/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

var $ausgabe,
    $erklaerung;
function ausgeben( in_text ) {
  console.log( in_text );
  $ausgabe.text( in_text );
}
function erklaeren( in_text ) {
  console.log( in_text );
  var $neuer_text = $( '<p>' + in_text + '</p>' );
  $erklaerung.append( $neuer_text );
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

function gibWerteFuerSchluessel1( inArray, inSchluessel ) {
  // ermittle Array der vorhandenen Werte
  var resultat = [];
  
  for ( var index = 0; index < inArray.length; index += 1 ) {
    // extrahiere das Element, das untersucht wird
    var element = inArray[ index ];
    // hole den Wert für den entsprechenden Schlüssel
    var wert = element[ inSchluessel ];
    // ist der Wert schon im Array vorhandene Werte? Hole Index
    var indexInVorhandeneWerte = resultat.indexOf( wert );
    // wenn Index ungültig ist ( === -1 )
    if ( indexInVorhandeneWerte < 0 ) {
      // füge neuen Wert hinzu
      resultat.push( wert );
    }
  }
  console.log( "-- vorhandeneWerte:" + resultat );
  return resultat;
}

function gibWerteFuerSchluessel2( inArray, inSchluessel ) {
  // ermittle Array der vorhandenen Werte
  var resultat = [];
  
  inArray.forEach( function( element ) {
    // hole den Wert für den entsprechenden Schlüssel
    var wert = element[ inSchluessel ];
    // ist der Wert schon im Array vorhandene Werte? Index < 0?
    if ( resultat.indexOf( wert ) < 0 ) {
      // füge neuen Wert hinzu
      resultat.push( element[ inSchluessel ] );
    }
  } );
  console.log( "-- vorhandeneWerte:" + resultat );
  return resultat;
}


var objekteArray;

function datenSindDa( in_daten ) {
  ausgeben( 'AJAX Abruf angekommen...' );
  var $erklaerung = $( '#erklaerung' ),
      $neue_zeile;
  
  // Wandle die grosse Datei in einen Array von Objekten
  // die Objekte enthalten jeweils Schlüssel - Wert Paare
  objekteArray = gibObjekteAusCSVString( in_daten );
  $neue_zeile = $( '<p>Dabei wurden ' +
    objekteArray.length +
    ' Datenobjekte angelegt.</p>' );
  $erklaerung.append( $neue_zeile );
  ausgeben( 'CSV gewandelt...' );
  
  console.log( "objekteArray[ 0 ]:" + objekteArray[ 0 ] );
  
  // Filtere den grossen Array nach einem speziellen Wert
  // die Filterfunktion gibt TRUE oder FALSE, je nachdem
  // ob das Element übernommen werden soll oder nicht
  console.log( "objekteArray.length:" + objekteArray.length );
  var jahrArray = objekteArray.filter( function( e ) {
    return ( Number( e[ "Jahr" ] ) === 2012 );
  });
  console.log( "nach filter - jahrArray.length:" + jahrArray.length );
  
  // Prüfe vorhandene Werte für Schlüssel 'Kontinet BfS'
  var schluessel = 'Region BfS';
  var vorhandenArray = gibWerteFuerSchluessel2( jahrArray, schluessel );
  erklaeren( "Für den Schlüssel '" + schluessel + "'<br/>Gibt es folgende Werte: " + vorhandenArray );
}

$( document ).ready( function() {
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  $erklaerung = $( '#erklaerung' );
  ausgeben( 'Starten...' );
  
  // Hole Datei mit den Daten in CSV Form
  ausgeben( 'CSV Datei laden und verarbeiten...' );
  $.get( "bevoelkerung_mini.csv", datenSindDa );
  
  // Hier ist Ende der Initialisierungsphase des Programms.
  // Wir warten, bis der Callback "datenSindDa" aufgerufen wird...
} );
