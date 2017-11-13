"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var actualstate;
    var color;
    var numberofpiece;
    var pile = [];

    var init = function ()
    {
        actualstate= Lyngk.State.VACANT
        numberofpiece = 0;
    };

    init();

    this.Get_Pile = function (){
        var returnedpile = pile;
        pile = [];
        actualstate = Lyngk.State.VACANT;

        return returnedpile;
    };

    this.Get_State = function (){
        return actualstate;
    };

    this.Get_Color = function (){
        return pile[pile.length-1].Get_Color();
    };

    this.Get_Hauteur = function (){
        return pile.length;
    };

    this.Put_New_Pile = function (c){
        //debugger;
        if ( (c.length + pile.length) <6 )
        {
            for (var i = 0; i < c.length; i++)
            {
                this.Put_New_Piece(c[i]);
            }
        }
    };

    this.Put_New_Piece = function (c) {

        pile[pile.length]= c;
        color = c.Get_Color();
        //console.log("color piece :" +  color);
        if (numberofpiece === 0)
        {
            actualstate = Lyngk.State.ONE_PIECE;
        }
        else
        {
            if (numberofpiece < 4)
            {
                actualstate = Lyngk.State.STACK;
            }
            else
            {
                actualstate = Lyngk.State.FULL_STACK;
            }
        }
        numberofpiece++;

    };

    this.Get_Nb_Piece = function (){
        return pile.length;
    }
};
