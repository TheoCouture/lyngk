"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var actualstate;
    var color;
    var pile = [];

    var init = function () {
        actualstate = Lyngk.State.VACANT;
    };

    init();

    this.getPile = function () {
        var returnedpile = pile;
        pile = [];
        actualstate = Lyngk.State.VACANT;

        return returnedpile;
    };

    this.getState = function () {
        return actualstate;
    };

    this.getColor = function () {
        return color;
    };

    this.getColors = function () {
        var colors = [];
        var i;
        for (i = 0; i < pile.length; i+=1) {
            colors [i] = pile[i].getColor();
        }

        return colors;
    };

    this.getHauteur = function () {
        return pile.length;
    };

    this.putNewPile = function (c) {
        //debugger;
        if ((c.length + pile.length) < 6) {
            var i;
            for (i = 0; i < c.length; i+=1) {
                this.putNewPiece(c[i]);
            }
        }
    };

    this.removePile = function(){
        pile = [];
        actualstate = 0;
    };

    this.putNewPiece = function (c) {

        pile[pile.length] = c;
        color = c.getColor();
        //console.log("color piece :" +  color);

        actualstate=pile.length;
        if (pile.length > 1){
            actualstate=2;
            if (pile.length === 5){
                actualstate=3;
            }
        }

    };

    this.getNbPiece = function () {
        return pile.length;
    };
};
