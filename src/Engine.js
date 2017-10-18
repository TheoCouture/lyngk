"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var Plateau;

    var init = function(){
        Plateau = [];
        var colonne;
        var ligne;
        var coordinates;
        var piece;

        for (var i=0; i<9; i++){
            colonne = String.fromCharCode(65 + i);
            for (var j=0; j<9; j++)
            {
                ligne= (j+1).toString();
                coordinates = new Lyngk.Coordinates(colonne,ligne);
                if (coordinates.is_Coordinates_Valid() === "valid"){
                    var piece = new Lyngk.Piece(Lyngk.Color.WHITE);
                    Plateau[ coordinates.Hash()] = new Lyngk.Intersection();
                    Plateau[coordinates.Hash()].Put_New_Piece(piece);
                    console.log(Plateau[coordinates.Hash()].Get_State());
                }

            }
        }
    };

    this.Get_Intersection = function(c){
        return Plateau[c];
    };

    init();
};
