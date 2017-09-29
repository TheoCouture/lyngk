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
    }

    init(c,l);



    this.is_valid = function() {
        return (grid[colonne][ligne] == 1);
    }

    this.is_43_Coordinates = function() {
        var numb = 0
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (grid[i][j] == 1)
                {
                    numb++;
                }
            }
        }
        console.log(numb);
        return numb;
    }


};
