/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

function zeichneSektor ( x, y, rad, startW, endW ) {
  // stelle Pathstring für einen Sektor zusammen, erst zum Mittelpunkt der Kreises
  var pfadString = "M0,0 ";
  
  // dann Linie zur Kreislinie bei Startwinkel
  pfadString += "l" + ( Math.cos( startW ) * rad )
  pfadString += "," + ( Math.sin( startW ) * rad ) + " ";
  
  // Kreisbogen des Sektor (siehe http://www.w3.org/TR/SVG/paths.html#PathData Nummer 8.3.8)
  pfadString += "A" + rad + "," + rad;
  pfadString += "," + 0;
  // grosser oder kleiner Bogen (Winkel > 180 Grad --> grosser Bogen
  pfadString += "," + ( endW - startW < Math.PI ? 0 : 1 ) + "," + 1;
  pfadString += "," + ( Math.cos( endW ) * rad )
  pfadString += "," + ( Math.sin( endW ) * rad );
  pfadString += " ";
  
  // Pfad am Schluss schliessen
  pfadString += "Z";
  //console.log( "pfadString:" + pfadString );
  
  var sektor = window.graphPapier.path( pfadString );
  sektor.translate( x, y );
  console.log( "sektor:" + sektor );
  return sektor;
};

function zeichneGraph( inSektorWerte ) {
  $( '#ausgabe' ).text( 'Graph startet...' );
    
  window.graphPapier = Raphael( 'graph', 300, 300 );
  
  // Definiere Koordinaten Startwerte
  var xMittel = 150,
      yMittel = 150,
      radius = 120;
  
  // zeichne den ganzen Kreis in hellgrau
  var kreis;
  kreis = zeichneSektor( xMittel, yMittel, radius,
                    0, 2 * Math.PI );
  kreis.attr( {
    'fill': '#DDDDDD',
    'stroke': '#000000',
    'stroke-width': '1'
  } );
  
  // bilde die Summe der Werte in dem Array mit SektorWerten
  // nutze Higher Order Function REDUCE, um eine Summe zu bilden
  var sektorenSumme = inSektorWerte.reduce( function( sum, e ) {
    return sum + e;
  } );
  
  var startWinkel = -0.5 * Math.PI;
  
  // zeichne einen Sektor für jeden Wert im Array
  // nutze Higher Order Function FOREACH, um für jeden Wert etwas auszuführen
  inSektorWerte.forEach( function( e ) {
    // zeichne einen Sektor, Parameter: Mittelpunkt X/Y, Radius, Startwinkel, Endwinkel
    var sektorenWinkel, sektor;
    sektorenWinkel = e / sektorenSumme * Math.PI * 2;
    // berechne zufällige Farbe
    var tortenSektorFarbe = '#' + Math.random().toString(16).substring(2, 8);
    
    sektor = zeichneSektor( xMittel, yMittel, radius,
                      startWinkel, startWinkel + sektorenWinkel );
    sektor.attr( {
      'fill': tortenSektorFarbe,
      'stroke': '#000000',
      'stroke-width': '1'
    } );
    
    startWinkel = startWinkel + sektorenWinkel;
  } );
  
    
  $( '#ausgabe' ).text( 'fertig!' );
};

jQuery( function() {
  // Start des Programms
  $( '#ausgabe' ).text( 'Starten...' );
  console.log( "Starten..." );
  
  var meineSektoren = [ 3, 5, 12, 7, 2, 6 ];
  zeichneGraph( meineSektoren );
  
  console.log( "Fertig!" );
} );
