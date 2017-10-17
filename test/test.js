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

    assertEquals(0,intersections.get_State());
};