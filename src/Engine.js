"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var Plateau;

    var init = function(){
        Plateau = [];
        var Pieces = [];
        var colonne;
        var ligne;
        var coordinates;
        var index=0;

        for (var a=0; a<8; a++){
            Pieces.push(new Lyngk.Piece(Lyngk.Color.IVORY));
            Pieces.push(new Lyngk.Piece(Lyngk.Color.RED));
            Pieces.push(new Lyngk.Piece(Lyngk.Color.GREEN));
            Pieces.push(new Lyngk.Piece(Lyngk.Color.BLUE));
            Pieces.push(new Lyngk.Piece(Lyngk.Color.BLACK));
            if (a < 3)
                Pieces.push(new Lyngk.Piece(Lyngk.Color.WHITE));
        }

        //shuffle des pieces
        for (var b = Pieces.length-1; b >=0; b--) {

            var randomIndex = Math.floor(Math.random()*(b+1));
            var itemAtIndex = Pieces[randomIndex];

            Pieces[randomIndex] = Pieces[b];
            Pieces[b] = itemAtIndex;
        }



        for (var i=0; i<9; i++){
            colonne = String.fromCharCode(65 + i);
            for (var j=0; j<9; j++)
            {
                ligne= (j+1).toString();
                coordinates = new Lyngk.Coordinates(colonne,ligne);
                if (coordinates.is_Coordinates_Valid() === "valid"){
                    Plateau[ coordinates.Hash()] = new Lyngk.Intersection();
                    Plateau[coordinates.Hash()].Put_New_Piece(Pieces[index]);
                    index++;
                }

            }
        }
    };

    this.Get_Intersection = function(c){
        return Plateau[c];
    };



    init();
};
