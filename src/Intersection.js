"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var actualstate;
    var color;
    var numberofpiece;

    var init = function ()
    {
        actualstate= Lyngk.State.VACANT
        numberofpiece = 0;
    };

    init();

    this.Get_State = function (){
        return actualstate;
    }

    this.Get_Color = function (){
        return color;
    };

    this.Put_New_Piece = function (c) {

        color = c.Get_Color();
        if (numberofpiece == 0)
        {
            actualstate = Lyngk.State.ONE_PIECE;
        }else
        {
            actualstate = Lyngk.State.STACK;
        }
        numberofpiece++;

    }
};
