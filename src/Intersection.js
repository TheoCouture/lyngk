"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var actualstate;
    var numberofpiece;
    var color;
    var pile = [];

    var init = function () {
        actualstate = Lyngk.State.VACANT;
        numberofpiece = 0;
    };

    init();

    this.GetPile = function () {
        var returnedpile = pile;
        pile = [];
        actualstate = Lyngk.State.VACANT;

        return returnedpile;
    };

    this.GetState = function () {
        return actualstate;
    };

    this.GetColor = function () {
        return color;
    };

    this.GetColors = function () {
        var colors = [];
        var i;
        for (i = 0; i < pile.length; i++) {
            colors [i] = pile[i].GetColor();
        }

        return colors;
    };

    this.GetHauteur = function () {
        return pile.length;
    };

    this.PutNewPile = function (c) {
        //debugger;
        if ((c.length + pile.length) < 6) {
            var i;
            for (i = 0; i < c.length; i++) {
                this.PutNewPiece(c[i]);
            }
        }
    };

    this.PutNewPiece = function (c) {

        pile[pile.length] = c;
        color = c.GetColor();
        //console.log("color piece :" +  color);
        if (numberofpiece === 0) {
            actualstate = Lyngk.State.ONE_PIECE;
        }
        else {
            if (numberofpiece < 4) {
                actualstate = Lyngk.State.STACK;
            }
            else {
                actualstate = Lyngk.State.FULL_STACK;
            }
        }
        numberofpiece+=1;

    };

    this.GetNbPiece = function () {
        return numberofpiece;
    };
};
