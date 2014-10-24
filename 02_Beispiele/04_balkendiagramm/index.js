/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

function zeichneBalken ( x, y, breite ) {
  
  // Definiere Vorgaben für Höhe
  var cBalkenHoehe = 20;
  
  var balken = window.graphPapier.rect( 0, 0, breite, cBalkenHoehe );
  balken.translate( x, y );
  console.log( "balken:" + balken );
  return balken;
};

function zeichneGraph( inBalkenWerte ) {
  $( '#ausgabe' ).text( 'Graph startet...' );
    
  window.graphPapier = Raphael( 'graph', 300, 300 );
  
  // Definiere Koordinaten Startwerte
  var xStart = 30,
      yStart = 30,
      cBalkenAbstand = 30,
      cGraphBreite = 240;
  
  // finde das Maximum der Werte, so dass die Balken das Diagramm
  // immer füllen
  var maxWert = inBalkenWerte.reduce( function( max, e ) {
    return max > e ? max : e;
  } );
  var skalierungsFaktor = cGraphBreite / maxWert;
  
  // zeichne einen Balken für jeden Wert im Array
  // nutze Higher Order Function FOREACH, um für jeden Wert etwas auszuführen
  inBalkenWerte.forEach( function( e ) {
  
    // zeichne einen Balken, Parameter: Registrierpunkt X/Y, Brete
    var balkenFarbe = '#' + Math.random().toString(16).substring(2, 8);
    var balkenBreite = e * skalierungsFaktor;
    balken = zeichneBalken( xStart, yStart, balkenBreite );
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
  
  var meineWerte = [ 3, 5, 12, 7, 2, 6 ];
  zeichneGraph( meineWerte );
  
  console.log( "Fertig!" );
} );
