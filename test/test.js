'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

Math.seedrandom("testlyngk");


LyngkTestCase.prototype.testStory1 = function (){
    var coordinates = new Lyngk.Coordinates('A',1);

    assertFalse(coordinates.IsValid());
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

    assertEquals("invalid",coordinates.IsCoordinatesValid());
};

LyngkTestCase.prototype.testStory5 = function () {
    var coordinates = new Lyngk.Coordinates('B', 2);

    assertEquals(coordinates.InStringFormat(), coordinates.Clone().InStringFormat());
};

LyngkTestCase.prototype.testStory6 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals("22",coordinates.Hash());
};

LyngkTestCase.prototype.testStory7 = function (){
    var intersections = new Lyngk.Intersection();

    assertEquals(Lyngk.State.VACANT,intersections.GetState());
};

LyngkTestCase.prototype.testStory8 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    intersections.PutNewPiece(piecebleu);

    assertEquals(Lyngk.State.ONE_PIECE,intersections.GetState());
    assertEquals(Lyngk.Color.BLUE,intersections.GetColor());
};

LyngkTestCase.prototype.testStory9 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piecerouge = new Lyngk.Piece(Lyngk.Color.RED);
    intersections.PutNewPiece(piecebleu);
    intersections.PutNewPiece(piecerouge);

    assertEquals(Lyngk.State.STACK,intersections.GetState());
    assertEquals(Lyngk.Color.RED,intersections.GetColor());
};

LyngkTestCase.prototype.testStory10 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piecerouge = new Lyngk.Piece(Lyngk.Color.RED);
    var piecenoir = new Lyngk.Piece(Lyngk.Color.BLACK);
    var piecevert = new Lyngk.Piece(Lyngk.Color.GREEN);
    var pieceblanche = new Lyngk.Piece(Lyngk.Color.WHITE);
    intersections.PutNewPiece(piecebleu);
    intersections.PutNewPiece(piecerouge);
    intersections.PutNewPiece(piecenoir);
    intersections.PutNewPiece(piecevert);
    intersections.PutNewPiece(pieceblanche);

    assertEquals(Lyngk.State.FULL_STACK,intersections.GetState());
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
            if (coordinates.IsCoordinatesValid() === "valid")
                assertEquals(Lyngk.State.ONE_PIECE,MyEngine.GetIntersection(coordinates.Hash()).GetState());
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
            if (coordinates.IsCoordinatesValid() === "valid"){
                switch((MyEngine.GetIntersection(coordinates.Hash())).GetColor())
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
            if (coordinates.IsCoordinatesValid() === "valid")
                assertEquals(1,MyEngine.GetIntersection(coordinates.Hash()).GetHauteur());
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
            if (coordinates.IsCoordinatesValid() === "valid")
                assertEquals(MyEngine.GetIntersectionColor(coordinates.Hash()),MyEngine.GetIntersection(coordinates.Hash()).GetColor());
        }
    }

};

LyngkTestCase.prototype.testStory15 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',4);

    var colorA3 = MyEngine.GetIntersectionColor(coordinates.Hash());
    MyEngine.MovePieces(coordinates,coordinates2);
    var colorB4 = MyEngine.GetIntersectionColor(coordinates2.Hash());


    assertEquals(colorA3,colorB4);
    assertEquals(Lyngk.State.VACANT,(MyEngine.GetIntersection(coordinates.Hash()).GetState()));
};

LyngkTestCase.prototype.testStory16 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);

    MyEngine.MovePieces(coordinates,coordinates2);
    var colorB3 = MyEngine.GetIntersectionColor(coordinates2.Hash());
    MyEngine.MovePieces(coordinates2,coordinates3);
    var colorB2 = MyEngine.GetIntersectionColor(coordinates3.Hash());


    assertEquals(colorB3,colorB2);
    assertEquals(Lyngk.State.VACANT,(MyEngine.GetIntersection(coordinates2.Hash()).GetState()));
};

LyngkTestCase.prototype.testStory17 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);

    MyEngine.MovePieces(coordinates,coordinates2);
    MyEngine.MovePieces(coordinates2,coordinates3);


    assertFalse(MyEngine.MovePieces(coordinates3,coordinates2));
};

LyngkTestCase.prototype.testStory18 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);

    MyEngine.MovePieces(coordinates,coordinates2);
    MyEngine.MovePieces(coordinates2,coordinates3);


    assertFalse( MyEngine.IsMovePossible(coordinates4,coordinates2));
};

LyngkTestCase.prototype.testStory19 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('I',7);
    var coordinates2 = new Lyngk.Coordinates('H',6);
    var coordinates3 = new Lyngk.Coordinates('H',5);
    var coordinates4 = new Lyngk.Coordinates('H',8);

    MyEngine.MovePieces(coordinates,coordinates2);
    MyEngine.MovePieces(coordinates2,coordinates3);


    assertFalse( MyEngine.IsMovePossible(coordinates3,coordinates4));
};


LyngkTestCase.prototype.testStory20 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);
    var coordinates5 = new Lyngk.Coordinates('D',2);
    var coordinates6 = new Lyngk.Coordinates('E',2);

    MyEngine.MovePieces(coordinates,coordinates2);
    MyEngine.MovePieces(coordinates2,coordinates3);
    MyEngine.MovePieces(coordinates3,coordinates4);
    MyEngine.MovePieces(coordinates4,coordinates5);


    assertFalse( MyEngine.MovePieces(coordinates5,coordinates6));
};

LyngkTestCase.prototype.testStory21 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);
    var coordinates5 = new Lyngk.Coordinates('D',2);

    MyEngine.MovePieces(coordinates,coordinates2);
    MyEngine.MovePieces(coordinates2,coordinates3);
    MyEngine.MovePieces(coordinates3,coordinates4);


    assertFalse( MyEngine.MovePieces(coordinates5,coordinates4));
};

LyngkTestCase.prototype.testStory22 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',3);
    var coordinates3 = new Lyngk.Coordinates('B',2);
    var coordinates4 = new Lyngk.Coordinates('C',2);
    var coordinates5 = new Lyngk.Coordinates('D',2);

    MyEngine.MovePieces(coordinates,coordinates2);
    MyEngine.MovePieces(coordinates2,coordinates3);
    MyEngine.MovePieces(coordinates4,coordinates5);


assertFalse( MyEngine.MovePieces(coordinates3,coordinates5));
};

LyngkTestCase.prototype.testStory23 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('C',5);
    var coordinates2 = new Lyngk.Coordinates('D',5);
    var coordinates3 = new Lyngk.Coordinates('E',5);
    var coordinates4 = new Lyngk.Coordinates('F',5);
    var coordinates5 = new Lyngk.Coordinates('G',5);

    assertTrue(MyEngine.MovePieces(coordinates,coordinates2));
    assertTrue(MyEngine.MovePieces(coordinates2,coordinates3));
    assertTrue(MyEngine.MovePieces(coordinates3,coordinates4));
    assertTrue(MyEngine.MovePieces(coordinates4,coordinates5));

};

LyngkTestCase.prototype.testStory24 = function (){

    var MyEngine = new Lyngk.Engine();

    assertEquals(1,MyEngine.GetJoueur());

};

LyngkTestCase.prototype.testStory25 = function (){

    var MyEngine = new Lyngk.Engine();
    var coordinates = new Lyngk.Coordinates('A',3);
    var coordinates2 = new Lyngk.Coordinates('B',4);

    MyEngine.MovePieces(coordinates,coordinates2);

    assertEquals(2,MyEngine.GetJoueur())

};

