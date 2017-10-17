"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var actualstate;
    var color;

    var init = function ()
    {
        actualstate= Lyngk.State.VACANT
    };

    init();

    this.Get_State = function (){
        return actualstate;
    }

    this.Get_Color = function (){
        return color;
    };

    this.Put_New_Piece = function (c) {
        actualstate = Lyngk.State.ONE_PIECE;
        color = c.Get_Color();

    }
};
