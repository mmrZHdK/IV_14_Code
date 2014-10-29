/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

var $ausgabe;
function ausgeben( in_text ) {
  $ausgabe.text( in_text );
}

function Dat() {
  var self = this;
  
  self.init = function() {
    self.objekte = [];
  };
  
  self.speichereObjekteAusCSVString = function( in_csv_string ) {
    console.log( "-> verarbeite CSV Datei..." );
    
    var alleTextZeilen = in_csv_string.split( /\r\n|\n/ ),
        schluesselNamen = alleTextZeilen[ 0 ].split( ',' ),
        i, j, werte, objekt;
    
    for ( i = 1; i < alleTextZeilen.length; i += 1 ) {
      werte = alleTextZeilen[ i ].split( ',' );
      
      if ( werte.length < schluesselNamen.length ) {
        console.log( "   - zu wenig Werte in Zeile " + i );
        
      } else {
        objekt = {};
        for ( j = 0; j < schluesselNamen.length; j += 1 ) {
          objekt[ schluesselNamen[ j ].split( '"' )[ 1 ] ] = werte[ j ].split( '"' )[ 1 ];
        }
        self.objekte.push( objekt );
        
        if ( werte.lenght > schluesselNamen.length ) {
          console.log( "   - zu viele Werte in Zeile " + i );
        }
      }
    }
    console.log( "<- CSV Datei in " + self.objekte.length + " Objekte gewandelt" );
  };
  
  self.gruppiere( in_array, in_schluessel ) {
    // How to do it?
    var resultat = [];
    for ( var index = 0; index < in_array.length; index += 1 ) {
      var element = in_array[ index ];
      var wertFuerVergleich = element[ in_schluessel ];
      
      var treffer;
      for ( var index2 = 0; index2 < resultat.length; index2 += 1 ) {
        var subarray = resultat[ index2  ];
        var erstes_element = subarray[ 0 ];
        if ( wertFuerVergleich == erstes_element[ in_schluessel ] ) {
          subarray.push( element );
        } else  {
          resultat.push( [ element ] );
        }
      }
    }
  };
  
  self.datenSindDa = function( in_daten ) {
    ausgeben( 'AJAX Abruf angekommen...' );
    
    self.speichereObjekteAusCSVString( in_daten );
    var $neue_zeile = $( '<p>Dabei wurden ' +
      self.objekte.length +
      ' Datenobjekte angelegt.</p>' );
    $( '#erklaerung' ).append( $neue_zeile );
    
    // Filtering, reduce to number of objects we have to deal
    self.aktuelleObjekte = self.objekte.filter( function( e ) {
      return ( e[ "Jahr" ] == "2012" );
    });
    $neue_zeile = $( '<span> Für das Jahr 2012 wurden ' +
      self.aktuelleObjekte.length +
      ' Datenobjekte gefunden.</span>' );
    $( '#erklaerung p:last-child' ).append( $neue_zeile );
    
    self.rathausObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Stadtquartier (historisch) (Name)" ] == "Rathaus" );
    });
    $neue_zeile = $( '<span> Für Rathaus bleiben noch ' +
      self.rathausObjekte.length +
      ' Datenobjekte übrig.</span>' );
    $( '#erklaerung p:last-child' ).append( $neue_zeile );
    console.log( "self.rathausObjekte:" + self.rathausObjekte );
    
    self.kontinentGruppen = self.gruppiere( self.rathausObjekte, "Kontinet BfS");
    
    ausgeben( 'fertig!' );
  };

  self.init();
}

var mein_dat = new Dat();


jQuery( function() {
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  ausgeben( 'Starten...' );
  
  
  // Hole Datei mit den Daten in CSV Form
  ausgeben( 'CSV Datei laden und verarbeiten...' );
  $.get( "../bevoelkerung.csv", mein_dat.datenSindDa );
  
  // Hier ist Ende der Initialisierungsphase des Programms.
  // Wir warten, bis der Callback "verarbeiteDaten" aufgerufen wird...
} );
