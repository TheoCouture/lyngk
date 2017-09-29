'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");


LyngkTestCase.prototype.testStory1 = function (){
    var coordinates = new Lyngk.Coordinates('B',2);

    assertFalse(coordinates.is_valid());

    assertEquals(coordinates.is_43_Coordinates(),43);
}