"use strict";

Lyngk.Coordinates = function (c, l) {
    var colonne;
    var ligne;
    var grid;

     var init = function (c , l)
    {

        colonne = c.charCodeAt(0);
        colonne = colonne-65;
        ligne = l-1;

        grid = [
        [0,0,1,0,0,0,0,0,0],
        [0,1,1,1,1,0,0,0,0],
        [1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,1],
        [0,0,0,0,1,1,1,1,0],
        [0,0,0,0,0,0,1,0,0]
        ];
    };

    init(c,l);



    this.is_valid = function() {
        return (grid[colonne][ligne] === 1);
    };

    this.is_43_Coordinates = function() {
        var numb = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (grid[i][j] === 1)
                {
                    numb++;
                }
            }
        }

        return numb;
    };


    this.In_String_Format = function() {

        return (String.fromCharCode(65 + colonne)+(ligne+1)).toString();
    };

    this.is_Coordinates_Valid = function( ) {

        if ((colonne >= 0 &&  colonne <= 8) && (ligne >= 0 &&  ligne <= 8) && this.is_valid())
        {
            return 'valid'
        }else
        {
            return 'invalid'
        }

    };

    this.Clone = function()  {

        return new Lyngk.Coordinates(String.fromCharCode(65 + colonne),(ligne+1).toString());

    };

    this.Hash = function()  {

        return (colonne+1)*10+ligne+1;

    };


};
