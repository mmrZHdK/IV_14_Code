/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

var $ausgabe;
function ausgeben( in_text ) {
  $ausgabe.text( in_text );
}

function Dat() {
  var self = this;
  
  self.init = function() {
    self.width = 400;
    self.height = 120;
    
    self.graphPaper = Raphael( 'output', self.width, self.height );
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
  
  self.neuerSatz = function( in_text ) {
    $neue_zeile = $( in_text );
    $( '#erklaerung p:last-child' ).append( $neue_zeile );
  };
  
  self.gruppiere = function( in_array, in_schluessel ) {
    var gruppen = [],
        werte = [],
        element, wertFuerSchluessel, gruppe;
        
    for ( var i = 0; i < in_array.length; i += 1 ) {
      element = in_array[ i ];
      wertFuerSchluessel = element[ in_schluessel ];
      
      if ( werte.indexOf( wertFuerSchluessel ) < 0 ) {
        werte.push( wertFuerSchluessel );
        gruppen.push( [] );
      }
      
      gruppe = gruppen[ werte.indexOf( wertFuerSchluessel ) ];
      gruppe.push( element );
    }
    return gruppen;
  };
  
  self.objekteFiltern = function( in_jahr ) {
    ausgeben( 'Objekte filtern' );
    // nur Objekte für 2012
    self.aktuelleObjekte = self.objekte.filter( function( e ) {
      return ( parseInt( e[ "Jahr" ] ) == in_jahr );
    });
    self.neuerSatz( '<span> Für das Jahr ' + in_jahr + ' sind ' +
      self.aktuelleObjekte.length +
      ' Datenobjekte vorhanden.</span>' );
    
    // daraus nur Objekte für Rathaus
    self.aktuelleRathausObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Stadtquartier (historisch) (Name)" ] == "Rathaus" );
    });
    self.neuerSatz( '<span> Für den Bezirk "Rathaus" sind im Jahr ' + in_jahr + ' ' +
      self.aktuelleRathausObjekte.length +
      ' Datenobjekte vorhanden.</span>' );
    
    // daraus gruppiere nach Kontinent
    self.kontinentGruppen = self.gruppiere( self.aktuelleRathausObjekte, "Kontinet BfS" );
    self.kontinentNamen = self.kontinentGruppen.map( function( e ) {
      return e[ 0 ][ "Kontinet BfS" ];
    } )
    console.log( "Kontinente: " + self.kontinentNamen.join( ', ' ) );
    
    // wandere durch jeden SubArray pro Kontinent
    self.kontinentAnzahlen = self.kontinentGruppen.map( function( e ) {
      return ( e.reduce( function( sum, e ) {
        return ( sum + parseInt( e[ "wirtschaftliche Bevölkerung" ] ) );
      }, 0 ) );
    } );
    console.log ( "self.kontinentAnzahlen: " + self.kontinentAnzahlen.join( "," ) );
  };
  
  self.zeichneGraph = function() {
    self.graphPaper.clear();
    
    var xStart = 80,
        yStart = 20,
        yAbstand = 20;
        
    // Zeichne die Namen in den Graph
    self.kontinentNamen.forEach( function( e, i ) {
      var beschriftung = self.graphPaper.text( xStart, yStart + i * yAbstand, e );
      beschriftung.attr( {
        'fill': '#000000',
        'font': "16px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        'text-anchor': 'end'
      } );
    } );

    // Zeichne proportionale Balken hinter die Namen
    var xStartBalken = 100,
        yStartBalken = 16,
        balkenHoehe = 10;
    var maxAnzahl = self.kontinentAnzahlen.reduce( function( aktuellesMaximum, e ) {
      if ( e > aktuellesMaximum ) {
        return e;
      } else {
        return aktuellesMaximum;
      }
    }, 0 );
    
    self.kontinentAnzahlen.forEach( function( e, i ) {
      var balkenBreite = e / maxAnzahl * 260;
      var balken = self.graphPaper.rect(
        xStartBalken,
        yStartBalken + i * yAbstand,
        balkenBreite,
        balkenHoehe
      );
      balken.attr( {
        // 'scale': 0.7,
        'stroke': '#444444',
        'stroke-width': 1,
        'fill': '#aaaaaa',
        'fill-opacity': 1.0
      } );
      
      var beschriftung = self.graphPaper.text(
        xStartBalken + balkenBreite + 10,
        yStart + i * yAbstand,
        e
      );
      beschriftung.attr( {
        'fill': '#000000',
        'font-size': 10,
        'font-family': "'Helvetica Neue', Helvetica, Arial, sans-serif",
        'text-anchor': 'start'
      } );

    } );

    // zeichne die Anzahlen hinter die Balken
  };
  
  self.generiereNavigation = function() {
    // Schleife durch alle Jahreszahlen und Navigationslink ausgeben
    $( '#output' ).append( '<br/>' );
    for ( var jahr = 1993; jahr < 2013; jahr += 1 ) {
      var link_tag = '<a href="javascript:window.mein_dat.selektiere(' + jahr + ');">' + jahr + '</a>';
      $( '#output' ).append( link_tag );
    }
  };
  
  self.selektiere = function( in_jahr ) {
    self.objekteFiltern( in_jahr );
    self.zeichneGraph();
  };
  
  self.datenSindDa = function( in_daten ) {
    ausgeben( 'AJAX Abruf angekommen...' );
    var $erklaerung = $( '#erklaerung' ),
        $neue_zeile;
    
    self.speichereObjekteAusCSVString( in_daten );
    $neue_zeile = $( '<p>Dabei wurden ' +
      self.objekte.length +
      ' Datenobjekte angelegt.</p>' );
    $erklaerung.append( $neue_zeile );
    
    self.objekteFiltern( 2012 );
    self.zeichneGraph();
    
    self.generiereNavigation();
    
    ausgeben( 'fertig!' );
  };

  self.init();
}



jQuery( function() {
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  ausgeben( 'Starten...' );
  
  window.mein_dat = new Dat();
  
  // Hole Datei mit den Daten in CSV Form
  ausgeben( 'CSV Datei laden und verarbeiten...' );
  $.get( "../bevoelkerung.csv", mein_dat.datenSindDa );
  
  // Hier ist Ende der Initialisierungsphase des Programms.
  // Wir warten, bis der Callback "verarbeiteDaten" aufgerufen wird...
} );







