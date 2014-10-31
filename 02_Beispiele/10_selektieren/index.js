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

function gruppieren( inArray, inSchluessel ) {
  // gehe durch Array der Datenobjekte und bilde Gruppen, wenn der
  // Wert für den gegebenen Schlüssel vom vorherigen abweicht
  var gruppenArray = [],
      gruppe = [],
      voriger_wert = null;
  
  for ( var index = 0; index < inArray.length; index += 1 ) {
    // extrahiere das Element, das untersucht wird
    var element = inArray[ index ];
    // hole den Wert für den entsprechenden Schlüssel
    var wert = element[ inSchluessel ];
    
    // gibt es noch kein Element in der aktuellen Gruppe?
    if ( gruppe.length < 1 ) {
      // das aktuelle Element zur Gruppe hinzufügen
      gruppe.push( element );
      
    // im Fall, das es ein Element gibt
    } else {
      // hole das erste Element aus der aktuellen Gruppe
      var erstesElement = gruppe[ 0 ];
      // hole den Wert aus dem Element
      var ersterWert = erstesElement[ inSchluessel ];
      // Wenn es einen anderen Wert als das aktuelle Element hat
      if ( ersterWert !== wert ) {
        // speichere die aktuelle Gruppe im gruppenArray
        gruppenArray.push( gruppe );
        // erzeuge eine neue aktuelle Gruppe
        gruppe = [];
        // fuege das aktuelle Element zu dieser Gruppe
        gruppe.push( element );
        
      } else {
        // das aktuelle Element zur Gruppe hinzufügen
        gruppe.push( element );
      }
    }
  }
  // die letzte aktuelle Gruppe muss noch zum gruppenArray
  gruppenArray.push( gruppe );
  return gruppenArray;
}

function gruppieren( inArray, inSchluessel ) {
  // gehe durch Array der Datenobjekte und bilde Gruppen, wenn der
  // Wert für den gegebenen Schlüssel vom vorherigen abweicht

    // extrahiere das Element, das untersucht wird

    // hole den Wert für den entsprechenden Schlüssel

    
    // gibt es noch kein Element in der aktuellen Gruppe?

    // das aktuelle Element zur Gruppe hinzufügen
      
    // im Fall, das es ein Element gibt

      // hole das erste Element aus der aktuellen Gruppe

      // hole den Wert aus dem Element

      // Wenn es einen anderen Wert als das aktuelle Element hat

          // speichere die aktuelle Gruppe im gruppenArray

        // erzeuge eine neue aktuelle Gruppe

        // fuege das aktuelle Element zu dieser Gruppe

        

          // das aktuelle Element zur Gruppe hinzufügen




  // die letzte aktuelle Gruppe muss noch zum gruppenArray

  // gruppierten Array zurück geben
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
    return ( Number( e[ "Jahr" ] ) === 2012 && e[ 'Stadtquartier (historisch) (Name)' ] === 'Rathaus' );
  });
  console.log( "nach filter - jahrArray.length:" + jahrArray.length );
  
  // Gruppiere die Objekte nach den Werten eines bestimmten Schlüssels
  // in diesem Fall Gruppen nach 'Kontinet BfS'
  var kontinentGruppenArray = gruppieren( jahrArray, 'Kontinet BfS' );
  console.log( kontinentGruppenArray );
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
