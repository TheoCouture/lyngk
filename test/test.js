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
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals("invalid",coordinates.is_Coordinates_Valid("Z2"));
};

LyngkTestCase.prototype.testStory5 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertEquals(coordinates.In_String_Format(),coordinates.Clone().In_String_Format());
};