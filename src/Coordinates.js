"use strict";

Lyngk.Coordinates = function (c, l) {
    var colonne;
    var ligne;
    var grid;
    var init = function (c, l) {

        if (c >= "A" && c <= "I") {
            colonne = c.charCodeAt(0);
            colonne = colonne - 65;
        }
        else
        {
            colonne = c-1;
        }
        ligne = l - 1;

        grid = [
            [0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0]
        ];
    };

    init(c, l);

    this.getColonne = function () {
        return colonne;
    };

    this.getLigne = function () {
        return ligne;
    };

    this.isValid = function () {
        return (grid[colonne][ligne] === 1);
    };

    var countCoordinatesOnColumn = function (column)
    {
        var NbOfCoordinates = 0;
        var line;
        for (line = 0; line < 9; line+=1) {
            NbOfCoordinates += (grid[column][line] === 1) ? 1 : 0;
        }

        return  NbOfCoordinates;
    };

    this.Is43Coordinates = function () {
        var numb = 0;
        var column;
        for (column = 0; column < 9; column+=1) {
            numb+= countCoordinatesOnColumn(column);
        }
        return numb;
    };




    this.toString = function () {

        return (String.fromCharCode(65 + colonne) + (ligne + 1));
    };

    this.isCoordinatesValid = function () {

        var IsValid = 'invalid';
        if (colonne >= 0 && colonne <= 8) {
            if ((ligne >= 0 && ligne <= 8) && this.isValid()) {
                IsValid = 'valid';
            }
        }
        return IsValid;
    };

    this.Clone = function () {

        return new Lyngk.Coordinates(colonne+1,ligne+1);

    };


    this.hash = function () {

        return (colonne + 1) * 10 + ligne + 1;

    };


};
