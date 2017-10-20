'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");


LyngkTestCase.prototype.testStory1 = function (){
    var coordinates = new Lyngk.Coordinates('A',1);

    assertFalse(coordinates.is_valid());
};

LyngkTestCase.prototype.testStory2 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals(43,coordinates.is_43_Coordinates());
};

LyngkTestCase.prototype.testStory3 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals("B2",coordinates.In_String_Format());
};


LyngkTestCase.prototype.testStory4 = function (){
    var coordinates = new Lyngk.Coordinates('Z',2);

    assertEquals("invalid",coordinates.is_Coordinates_Valid());
};

LyngkTestCase.prototype.testStory5 = function () {
    var coordinates = new Lyngk.Coordinates('B', 2);

    assertEquals(coordinates.In_String_Format(), coordinates.Clone().In_String_Format());
};

LyngkTestCase.prototype.testStory6 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals("22",coordinates.Hash());
};

LyngkTestCase.prototype.testStory7 = function (){
    var intersections = new Lyngk.Intersection();

    assertEquals(Lyngk.State.VACANT,intersections.Get_State());
};

LyngkTestCase.prototype.testStory8 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    intersections.Put_New_Piece(piecebleu);

    assertEquals(Lyngk.State.ONE_PIECE,intersections.Get_State());
    assertEquals(Lyngk.Color.BLUE,intersections.Get_Color());
};

LyngkTestCase.prototype.testStory9 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piecerouge = new Lyngk.Piece(Lyngk.Color.RED);
    intersections.Put_New_Piece(piecebleu);
    intersections.Put_New_Piece(piecerouge);

    assertEquals(Lyngk.State.STACK,intersections.Get_State());
    assertEquals(Lyngk.Color.RED,intersections.Get_Color());
};

LyngkTestCase.prototype.testStory10 = function (){

    var intersections = new Lyngk.Intersection();
    var piecebleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piecerouge = new Lyngk.Piece(Lyngk.Color.RED);
    var piecenoir = new Lyngk.Piece(Lyngk.Color.BLACK);
    var piecevert = new Lyngk.Piece(Lyngk.Color.GREEN);
    var pieceblanche = new Lyngk.Piece(Lyngk.Color.WHITE);
    intersections.Put_New_Piece(piecebleu);
    intersections.Put_New_Piece(piecerouge);
    intersections.Put_New_Piece(piecenoir);
    intersections.Put_New_Piece(piecevert);
    intersections.Put_New_Piece(pieceblanche);

    assertEquals(Lyngk.State.FULL_STACK,intersections.Get_State());
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
            if (coordinates.is_Coordinates_Valid() === "valid")
                assertEquals(Lyngk.State.ONE_PIECE,MyEngine.Get_Intersection(coordinates.Hash()).Get_State());
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
            if (coordinates.is_Coordinates_Valid() === "valid"){
                switch((MyEngine.Get_Intersection(coordinates.Hash())).Get_Color())
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
            if (coordinates.is_Coordinates_Valid() === "valid")
                assertEquals(1,MyEngine.Get_Intersection(coordinates.Hash()).Get_Hauteur());
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
            if (coordinates.is_Coordinates_Valid() === "valid")
                assertEquals(MyEngine.Get_Intersection_Color(coordinates.Hash()),MyEngine.Get_Intersection(coordinates.Hash()).Get_Color());
        }
    }

};



