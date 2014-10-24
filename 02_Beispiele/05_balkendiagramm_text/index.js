/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

function zeichneBalken ( x, y, breite, beschriftung ) {
  
  // Definiere Vorgaben für Höhe
  var cBalkenHoehe = 20,
      cTextAbstand = 5,
      cTextGrundlinie = 12;
  
  var balken = window.graphPapier.rect( 0, 0, breite, cBalkenHoehe );
  balken.translate( x, y );
  
  var balkenBeschriftung = window.graphPapier.text( 0, 0, beschriftung );
  balkenBeschriftung.translate( x - cTextAbstand, y + cTextGrundlinie );
  balkenBeschriftung.attr( {
    'font-size': 12,
    'text-anchor': 'end'
  } );
  
  console.log( "balken:" + balken );
  return balken;
};

function zeichneGraph( inBalkenWerte ) {
  $( '#ausgabe' ).text( 'Graph startet...' );
    
  window.graphPapier = Raphael( 'graph', 300, 300 );
  
  // Definiere Koordinaten Startwerte
  var xStart = 80,
      yStart = 30,
      cBalkenAbstand = 30,
      cGraphBreite = 240;
  
  // Hole aus dem komplexen Objekt einen Array der Schlüssel
  var balkenSchlüssel = Object.keys( inBalkenWerte );
  
  // finde das Maximum der Werte, so dass die Balken das Diagramm
  // immer füllen
  var maxWert = balkenSchlüssel.reduce( function( max, e ) {
    return max > inBalkenWerte[ e ] ? max : inBalkenWerte[ e ];
  } );
  var skalierungsFaktor = cGraphBreite / maxWert;
  
  // zeichne einen Balken für jeden Wert im Array
  // nutze Higher Order Function FOREACH, um für jeden Wert etwas auszuführen
  balkenSchlüssel.forEach( function( e ) {
  
    // zeichne einen Balken, Parameter: Registrierpunkt X/Y, Brete
    var balkenFarbe = '#' + Math.random().toString(16).substring(2, 8);
    var balkenBreite = inBalkenWerte[ e ] * skalierungsFaktor;
    balken = zeichneBalken( xStart, yStart, balkenBreite, e );
    balken.attr( {
      'fill': balkenFarbe,
      'stroke': '#000000',
      'stroke-width': '1'
    } );
    
    yStart = yStart + cBalkenAbstand;
  } );
  
    
  $( '#ausgabe' ).text( 'fertig!' );
};

jQuery( function() {
  // Start des Programms
  $( '#ausgabe' ).text( 'Starten...' );
  console.log( "Starten..." );
  
  var meineWerte = { 'Luzern': 3, 'Bern': 5, 'Basel': 12, 'Solothurn': 7, 'Chur': 2, 'Genf': 6 };
  zeichneGraph( meineWerte );
  
  console.log( "Fertig!" );
} );
