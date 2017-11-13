"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var Plateau;

    var joueur;

    var init = function(){
        Plateau = [];
        var Pieces = [];
        var colonne;
        var ligne;
        var coordinates;
        var index=0;
        joueur = 1;

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

    this.Get_Intersection_Color = function(c){
        return Plateau[c].Get_Color();
    };

    this.Is_Move_Possible = function (a,b){

        var possible=false;
        var nbpiecea = Plateau[a.Hash()].Get_Nb_Piece();
        var nbpieceb =Plateau[b.Hash()].Get_Nb_Piece();

        if ((a.is_Coordinates_Valid() == "valid") && (b.is_Coordinates_Valid() == "valid") && (Plateau[b.Hash()].Get_State() != Lyngk.State.VACANT) && ((nbpiecea + nbpieceb) <6 ) && (nbpiecea >= nbpieceb))
        {
            var difcolonne = b.get_colonne()-a.get_colonne();
            var difligne = b.get_ligne()-a.get_ligne();


            if ( (difcolonne == difligne) || (difligne == 0 && difcolonne!= 0 ) || (difligne != 0 && difcolonne == 0 )) {

                if (difcolonne > 0)
                    difcolonne = 1;
                if (difcolonne < 0)
                    difcolonne = -1;
                if (difligne > 0)
                    difligne = 1;
                if (difligne < 0)
                    difligne = -1;

                var i = a.get_colonne() + difcolonne;
                var j = a.get_ligne() + difligne;

                possible = true;
                while (possible && (i != b.get_colonne() || j != b.get_ligne())) {
                    if (Plateau[new Lyngk.Coordinates(String.fromCharCode(65+i), j + 1).Hash()].Get_State() != Lyngk.VACANT)
                        possible = false;

                    i += difcolonne;
                    j += difligne;
                }

            }
        }
        return (possible);
    };

    this.Get_Joueur = function () {
        return joueur;
    }


    this.Move_Pieces = function (a,b){

        if (this.Is_Move_Possible(a,b) && !(this.Not_Same_Colors_Twice(a,b)))
        {
            Plateau[b.Hash()].Put_New_Pile(Plateau[a.Hash()].Get_Pile());

            return true;
        }
        else
        {
            return false;
        }
    };

    this.Not_Same_Colors_Twice =  function (a,b){


        var color = [];
        color = Plateau[a.Hash()].Get_Colors();
        color = color.concat(Plateau[b.Hash()].Get_Colors());
        var nbcolor = [];
        nbcolor = [0,0,0,0,0,0];
        var doublecolor = false;
        var i = 0;
        do{
           nbcolor[color[i]]++;
           if (nbcolor[color[i]] > 1 && color != Lyngk.Color.WHITE)
               doublecolor = true;
           i++
        }while((i < color.length) && (doublecolor == false))

        return doublecolor;
    };



    init();
};
