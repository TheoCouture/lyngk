"use strict";

Lyngk.Piece = function (c) {

    var color;

    var init = function (c) {
        color = c;
    };

    init(c);

    this.getColor = function () {

        return color;
    };
};
