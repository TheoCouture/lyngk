'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

Math.seedrandom("testlyngk");


LyngkTestCase.prototype.testStory1 = function (){
    var coordinates = new Lyngk.Coordinates('A',1);

    assertFalse(coordinates.isValid());
};

LyngkTestCase.prototype.testStory2 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals(43,coordinates.Is43Coordinates());
};

LyngkTestCase.prototype.testStory3 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals("B2",coordinates.InStringFormat());
};


LyngkTestCase.prototype.testStory4 = function (){
    var coordinates = new Lyngk.Coordinates('Z',2);

    assertEquals("invalid",coordinates.isCoordinatesValid());
};

LyngkTestCase.prototype.testStory5 = function () {
    var coordinates = new Lyngk.Coordinates('B', 2);

    assertEquals(coordinates.InStringFormat(), coordinates.Clone().InStringFormat());
};

LyngkTestCase.prototype.testStory6 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals("22",coordinates.hash());
};

LyngkTestCase.prototype.testStory7 = function (){
    var intersections = new Lyngk.Intersection();

    assertEquals(Lyngk.State.VACANT,intersections.getState());
};

LyngkTestCase.prototype.testStory8 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    intersections.putNewPiece(piecebleu);

    assertEquals(Lyngk.State.ONE_PIECE,intersections.getState());
    assertEquals(Lyngk.Color.BLUE,intersections.getColor());
};

LyngkTestCase.prototype.testStory9 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piecerouge = new Lyngk.Piece(Lyngk.Color.RED);
    intersections.putNewPiece(piecebleu);
    intersections.putNewPiece(piecerouge);

    assertEquals(Lyngk.State.STACK,intersections.getState());
    assertEquals(Lyngk.Color.RED,intersections.getColor());
};

LyngkTestCase.prototype.testStory10 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piecerouge = new Lyngk.Piece(Lyngk.Color.RED);
    var piecenoir = new Lyngk.Piece(Lyngk.Color.BLACK);
    var piecevert = new Lyngk.Piece(Lyngk.Color.GREEN);
    var pieceblanche = new Lyngk.Piece(Lyngk.Color.WHITE);
    intersections.putNewPiece(piecebleu);
    intersections.putNewPiece(piecerouge);
    intersections.putNewPiece(piecenoir);
    intersections.putNewPiece(piecevert);
    intersections.putNewPiece(pieceblanche);

    assertEquals(Lyngk.State.FULL_STACK,intersections.getState());
};

LyngkTestCase.prototype.testStory11 = function (){

    var colonne;
    var ligne;
    var coordinates;

    var MyEngine = new Lyngk.Engine();



    for (var i=0; i<9; i++){
        colonne = String.fromCharCode(65 + i);
        for (var j=0; j<9; j++)
        {
            ligne= (j+1).toString();
            coordinates = new Lyngk.Coordinates(colonne,ligne);
            if (coordinates.isCoordinatesValid() === "valid")
                assertEquals(Lyngk.State.ONE_PIECE,MyEngine.getIntersection(coordinates.hash()).getState());
        }
    }


};

LyngkTestCase.prototype.testStory12 = function (){

    var colonne;
    var ligne;
    var coordinates;

    var blue=0;
    var red=0;
    var ivory=0;
    var black=0;
    var green=0;
    var white=0;

    var MyEngine = new Lyngk.Engine();



    for (var i=0; i<9; i++){
        colonne = String.fromCharCode(65 + i);
        for (var j=0; j<9; j++)
        {
            ligne= (j+1).toString();
            coordinates = new Lyngk.Coordinates(colonne,ligne);
            if (coordinates.isCoordinatesValid() === "valid"){
                switch((MyEngine.getIntersection(coordinates.hash())).getColor())
                {
                    case Lyngk.Color.WHITE :
                        white++;
                        break;

                    case Lyngk.Color.BLUE :
                        blue++;
                        break;

                    case Lyngk.Color.RED :
                        red++;
                        break;

                    case Lyngk.Color.IVORY:
                        ivory++;
                        break;

                    case Lyngk.Color.GREEN :
                        green++;
                        break;

                    case Lyngk.Color.BLACK :
                        black++;
                        break;
                }
            }

        }
    }

    assertEquals(3,white);
    assertEquals(8,ivory);
    assertEquals(8,blue);
    assertEquals(8,red);
    assertEquals(8,black);
    assertEquals(8,green);

};

LyngkTestCase.prototype.testStory13 = function (){

    var colonne;
    var ligne;
    var coordinates;

    var MyEngine = new Lyngk.Engine();



    for (var i=0; i<9; i++){
        colonne = String.fromCharCode(65 + i);
        for (var j=0; j<9; j++)
        {
            ligne= (j+1).toString();
            coordinates = new Lyngk.Coordinates(colonne,ligne);
            if (coordinates.isCoordinatesValid() === "valid")
                assertEquals(1,MyEngine.getIntersection(coordinates.hash()).getHauteur());
        }
    }


};

LyngkTestCase.prototype.testStory14 = function (){

    var colonne;
    var ligne;
    var coordinates;

    var MyEngine = new Lyngk.Engine();



    for (var i=0; i<9; i++){
        colonne = String.fromCharCode(65 + i);
        for (var j=0; j<9; j++)
        {
            ligne= (j+1).toString();
            coordinates = new Lyngk.Coordinates(colonne,ligne);
            if (coordinates.isCoordinatesValid() === "valid")
                assertEquals(MyEngine.getIntersectionColor(coordinates.hash()),MyEngine.getIntersection(coordinates.hash()).getColor());
        }
    }

};

LyngkTestCase.prototype.testStory15 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',4);

    var colorA3 = MyEngine.getIntersectionColor(coordinates.hash());
    MyEngine.movePieces(coordinates,coordinates2);
    var colorB4 = MyEngine.getIntersectionColor(coordinates2.hash());


    assertEquals(colorA3,colorB4);
    assertEquals(Lyngk.State.VACANT,(MyEngine.getIntersection(coordinates.hash()).getState()));
};

LyngkTestCase.prototype.testStory16 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);

    MyEngine.movePieces(coordinates,coordinates2);
    var colorB3 = MyEngine.getIntersectionColor(coordinates2.hash());
    MyEngine.movePieces(coordinates2,coordinates3);
    var colorB2 = MyEngine.getIntersectionColor(coordinates3.hash());


    assertEquals(colorB3,colorB2);
    assertEquals(Lyngk.State.VACANT,(MyEngine.getIntersection(coordinates2.hash()).getState()));
};

LyngkTestCase.prototype.testStory17 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);

    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.movePieces(coordinates2,coordinates3);


    assertFalse(MyEngine.movePieces(coordinates3,coordinates2));
};

LyngkTestCase.prototype.testStory18 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);

    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.movePieces(coordinates2,coordinates3);


    assertFalse( MyEngine.isMovePossible(coordinates4,coordinates2));
};

LyngkTestCase.prototype.testStory19 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('I',7);
    var coordinates2 = new Lyngk.Coordinates('H',6);
    var coordinates3 = new Lyngk.Coordinates('H',5);
    var coordinates4 = new Lyngk.Coordinates('H',8);

    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.movePieces(coordinates2,coordinates3);


    assertFalse( MyEngine.isMovePossible(coordinates3,coordinates4));
};


LyngkTestCase.prototype.testStory20 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);
    var coordinates5 = new Lyngk.Coordinates('D',2);
    var coordinates6 = new Lyngk.Coordinates('E',2);

    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.movePieces(coordinates2,coordinates3);
    MyEngine.movePieces(coordinates3,coordinates4);
    MyEngine.movePieces(coordinates4,coordinates5);


    assertFalse( MyEngine.movePieces(coordinates5,coordinates6));
};

LyngkTestCase.prototype.testStory21 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);
    var coordinates5 = new Lyngk.Coordinates('D',2);

    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.movePieces(coordinates2,coordinates3);
    MyEngine.movePieces(coordinates3,coordinates4);


    assertFalse( MyEngine.movePieces(coordinates5,coordinates4));
};

LyngkTestCase.prototype.testStory22 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);
    var coordinates5 = new Lyngk.Coordinates('D',2);

    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.movePieces(coordinates2,coordinates3);
    MyEngine.movePieces(coordinates4,coordinates5);


assertFalse( MyEngine.movePieces(coordinates3,coordinates5));
};

LyngkTestCase.prototype.testStory23 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('C',5);
    var coordinates2 = new Lyngk.Coordinates('D',5);
    var coordinates3 = new Lyngk.Coordinates('E',5);
    var coordinates4 = new Lyngk.Coordinates('F',5);
    var coordinates5 = new Lyngk.Coordinates('G',5);

    assertTrue(MyEngine.movePieces(coordinates,coordinates2));
    assertTrue(MyEngine.movePieces(coordinates2,coordinates3));
    assertTrue(MyEngine.movePieces(coordinates3,coordinates4));
    assertTrue(MyEngine.movePieces(coordinates4,coordinates5));

};

LyngkTestCase.prototype.testStory24 = function (){

    var MyEngine = new Lyngk.Engine();

    assertEquals(1,MyEngine.getJoueur());

};

LyngkTestCase.prototype.testStory25 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',4);

    MyEngine.movePieces(coordinates,coordinates2);

    assertEquals(2,MyEngine.getJoueur())

};

LyngkTestCase.prototype.testStory26 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);

    MyEngine.setClaimcolor(Lyngk.Color.RED);
    MyEngine.movePieces(coordinates,coordinates2);
    MyEngine.setClaimcolor(Lyngk.Color.GREEN);

    assertEquals(Lyngk.Color.RED,MyEngine.getClaimcolor(1))
    assertEquals(Lyngk.Color.GREEN,MyEngine.getClaimcolor(2))

};



