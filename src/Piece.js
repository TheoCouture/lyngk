"use strict";

Lyngk.Piece = function (c) {

    var color;

    var init = function (c){
        color = c;
        console.log("color piece :" + c);

    };

    init(c);

    this.Get_Color = function (){
        return color;
    }
};
