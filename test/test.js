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