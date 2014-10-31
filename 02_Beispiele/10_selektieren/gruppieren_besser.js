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
            { form: 'quadrat', farbe: 'blau' },
            { form: 'kreis', farbe: 'rot' },
            { form: 'quadrat', farbe: 'grün' },
            { form: 'kreis', farbe: 'blau' },
            { form: 'kreis', farbe: 'gelb' },
            { form: 'quadrat', farbe: 'rot' },
            { form: 'quadrat', farbe: 'gelb' },
            { form: 'dreieck', farbe: 'orange' },
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
    
    // mache Variable zur Markierung, ob Element in einer Gruppe Platz fand
    var elementVersorgt = false;
    // gehe durch den resultatArray und schaue in die Gruppen
    for ( var index2 = 0; index2 < resultatArray.length; index2 += 1 ) {
      // hole jeweilige Gruppe aus resultatArray
      var gruppe = resultatArray[ index2 ];
      // hole das erste Element aus der aktuellen Gruppe
      var erstesInGruppe = gruppe[ 0 ];
      // hole den Wert aus dem Element
      var ersterWert = erstesInGruppe[ 'form' ];
      // Wenn es denselben Wert hat, wie das aktuelle Element
      if ( wert === ersterWert ) {
        gruppe.push( element );
        elementVersorgt = true;
      }
    }
    // wenn das Element nicht versorgt wurde
    if ( elementVersorgt === false ) {
      // mache neue Gruppe mit diesem Element
      var neueGruppe = [ element ];
      // und füge die Gruppe zum resultatArray hinzu
      resultatArray.push( neueGruppe );
    }
  }
  
  // gruppierten Array zurück geben
  console.log( resultatArray );
} );
