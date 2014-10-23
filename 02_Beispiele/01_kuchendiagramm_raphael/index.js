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

function zeichneGraph( tortenSektorAnteil, tortenSumme ) {
  $( '#ausgabe' ).text( 'Graph startet...' );
    
  window.graphPapier = Raphael( 'graph', 300, 300 );
  
  // definiere Array mit Werten
  var tortenSektorFarbe = '#770077';
  
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

  // zeichne einen Sektor, Parameter: Mittelpunkt X/Y, Radius, Startwinkel, Endwinkel
  var sektorenWinkel, sektor;
  var startWinkel = -0.5 * Math.PI;
  sektorenWinkel = tortenSektorAnteil / tortenSumme * Math.PI * 2;
  sektor = zeichneSektor( xMittel, yMittel, radius,
                    startWinkel, startWinkel + sektorenWinkel );
  sektor.attr( {
    'fill': tortenSektorFarbe,
    'stroke': '#000000',
    'stroke-width': '1'
  } );
    
  $( '#ausgabe' ).text( 'fertig!' );
};

jQuery( function() {
  // Start des Programms
  $( '#ausgabe' ).text( 'Starten...' );
  console.log( "Starten..." );
  
  zeichneGraph( 10, 12 );
  console.log( "Fertig!" );
} );
