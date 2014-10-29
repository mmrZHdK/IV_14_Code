/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

var $ausgabe;
function ausgeben( in_text ) {
  $ausgabe.text( in_text );
}

function Dat() {
  var self = this;
  
  self.init = function() {
    self.graphPaper = Raphael( 'output', 800, 720 );
    
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
    $( '#erklaerung' ).append( '<p></p>' );
    
    // nur Objekte für 2012
    self.jahrObjekte = self.objekte.filter( function( e ) {
      return ( e[ "Jahr" ] == in_jahr );
    } );
    self.neuerSatz( '<span> Für das Jahr ' + in_jahr + ' sind ' +
      self.jahrObjekte.length +
      ' Datenobjekte vorhanden.</span>' );
    
    // daraus gruppiere nach Stadtbezirken
    self.bezirkGruppen = self.gruppiere( self.jahrObjekte, "Stadtquartier (historisch) (Name)" );
    self.bezirkNamen = self.bezirkGruppen.map( function( e ) {
      return e[ 0 ][ "Stadtquartier (historisch) (Name)" ];
    } );
    
    self.neuerSatz( '<span> Daraus ergeben sich Einwohner für folgende ' +
      self.bezirkNamen.length +
      ' Stadtquartiere: ' +
      self.bezirkNamen.join( ", " ) +
      '.</span>' );
    
    // und untergruppiere nach Kontinenten
    self.bezirkKontinentGruppen = self.bezirkGruppen.map( function( e ) {
      return self.gruppiere( e, "Kontinet BfS" );
    } );
    
    // daraus summiere die Anzahl der Personen (je Bezirk/Kontinent Subarray)
    self.bezirkKontinentAnzahlen = self.bezirkKontinentGruppen.map( function ( e ) {
      // e ist Bezirk
      return e.map( function( e2 ) {
        // e2 ist Kontinent
        return ( e2.reduce( function( sum, e3 ) {
          // e3 ist Objekt
          return ( sum + parseInt( e3[ "wirtschaftliche Bevölkerung" ] ) );
        }, 0 ) );
      } );
    } );
    self.neuerSatz( '<span> Dort wohnen jeweils folgende Anzahlen an Personen: ' +
      self.bezirkKontinentAnzahlen.map( function ( e ) {
        return e.reduce( function( sum, e2 ) {
          return sum + e2;
        }, 0 );
      } ).join( ", ") +
      '.</span>' );
  };
  
  self.zeichneGraph = function() {
    self.graphPaper.clear();
    
    var xStart = 180,
        yStart = 20,
        yAbstand = 20;
    
    // zeichne die Namen links in die Fläche
    self.bezirkNamen.forEach( function( e, i ) {
      var beschriftung = self.graphPaper.text( xStart, yStart + i * yAbstand, e );
      beschriftung.attr( {
        'fill': '#000000',
        'font': "16px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        'text-anchor': 'end'
      } );
    } );
    
    // zeichne die Balken rechts von den Namen
    var xStartBalken = 190,
        yStartBalken = 16,
        balkenHoehe = 10,
        maxBalkenBreite = 360;
    var maxAnzahl = self.bezirkKontinentAnzahlen.reduce( function( max, e ) {
      var summe = e.reduce( function( sum, e2 ) {
        return ( sum + e2 );
      }, 0 );
      return summe <= e ? e : summe;
    }, 0 );
    
    self.bezirkKontinentAnzahlen.forEach( function( e, i ) {
      var alleAnzahlen = 0,
          alleBalkenBreite = 0;
      
      e.forEach( function( e2, i2 ) {
        alleAnzahlen += e2;
        var balkenBreite = e2 / maxAnzahl * maxBalkenBreite;
        alleBalkenBreite += balkenBreite;
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
      } );
/*
      var beschriftung = self.graphPaper.text(
        xStartBalken + alleBalkenBreite + 10,
        yStart + i * yAbstand,
        e
      );
      beschriftung.attr( {
        'fill': '#000000',
        'font-size': 10,
        'font-family': "'Helvetica Neue', Helvetica, Arial, sans-serif",
        'text-anchor': 'start'
      } );
*/
    } );
  };
  
  self.generiereSelektoren = function() {
    $( '#output' ).append( '<br/>' );
    for ( var jahr = 1993; jahr < 2013; jahr += 1 ) {
      var $jahr_link = $( '<a href="javascript:window.mein_dat.selektiere(' +
                          jahr + ');">' + jahr + '</a>' );
      $( '#output' ).append( $jahr_link );
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
    self.generiereSelektoren();
    
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
