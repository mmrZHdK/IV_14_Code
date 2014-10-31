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

$( document ).ready( function() {
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  $erklaerung = $( '#erklaerung' );
  ausgeben( 'Starten...' );
  
  var daten = [ { form: 'dreieck', farbe: 'lila' },
            { form: 'dreieck', farbe: 'orange' },
            { form: 'kreis', farbe: 'rot' },
            { form: 'kreis', farbe: 'blau' },
            { form: 'kreis', farbe: 'gelb' },
            { form: 'quadrat', farbe: 'rot' },
            { form: 'quadrat', farbe: 'blau' },
            { form: 'quadrat', farbe: 'gelb' },
            { form: 'quadrat', farbe: 'grün' },
            { form: 'quadrat', farbe: 'lila' }
          ];
  console.log( daten );
  // GRUPPIEREN
  
  var gruppe = [],
      resultatArray = [];
  
  // gehe durch Array der Datenobjekte und bilde Gruppen, wenn der
  // Wert für den gegebenen Schlüssel vom vorherigen abweicht
  for ( var index = 0; index < daten.length; index += 1 ) {
    // extrahiere das Element, das untersucht wird
    var element = daten[ index ];
    // hole den Wert für den entsprechenden Schlüssel
    var wert = element[ 'form' ];
    var wert = element.form;
    // gibt es noch kein Element in der aktuellen Gruppe?
    if ( gruppe.length == 0 ) {
      // das aktuelle Element zur Gruppe hinzufügen
      gruppe.push( element );
      
    // im Fall, das es ein Element gibt
    } else {
      // hole das erste Element aus der aktuellen Gruppe
      var erstesInGruppe = gruppe[ 0 ];
      // hole den Wert aus dem Element
      var ersterWert = erstesInGruppe[ 'form' ];
      // Wenn es einen anderen Wert als das aktuelle Element hat
      if ( wert !== ersterWert ) {
        // speichere die aktuelle Gruppe im gruppenArray
        resultatArray.push( gruppe );
        // erzeuge eine neue aktuelle Gruppe
        gruppe = [];
      }
      // fuege das aktuelle Element zu dieser Gruppe
      gruppe.push( element );
    }
  }
  // die letzte aktuelle Gruppe muss noch zum gruppenArray
  resultatArray.push( gruppe );
  // gruppierten Array zurück geben
  
  console.log( resultatArray );
} );
