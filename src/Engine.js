"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};


Lyngk.Engine = function () {

    var Plateau;

    var joueur;


    var init = function(){
        Plateau = [];

        joueur = 1;
        Plateau = PutPiecesOnBoard(Plateau, ShufflePieces(GeneratePieces()));

    };

    var PutPiecesOnBoard = function (Plateau, Pieces) {
        var i = 0;
        var nbpulled = 0;

        for (i = 0; i < 9; i+=1) {
            nbpulled = PutPieceOnIntersection(i + 1, nbpulled, Pieces, Plateau);
        }

        return Plateau;
    };

    var PutPieceOnIntersection = function (column, nbpulled, Pieces, plateau) {

        var j;
        var coordinates;
        for (j = 0; j < 9; j+=1) {
            coordinates = new Lyngk.Coordinates(column, j + 1);
            if (coordinates.IsCoordinatesValid() === "valid") {
                plateau[coordinates.Hash()] = new Lyngk.Intersection();
                plateau[coordinates.Hash()].PutNewPiece(Pieces[nbpulled]);
                nbpulled++;
            }
        }

        return nbpulled;
    };

    var GeneratePieces = function () {
        var Pieces = [];
        var a;

        for (a = 0; a < 8; a += 1) {
            Pieces = CreateColorPieces(Pieces);
            if (a < 3) {
                Pieces = CreateWhitePieces(Pieces);
            }
        }

        return Pieces;
    };

    var CreateColorPieces = function (Pieces) {
        Pieces.push(new Lyngk.Piece(Lyngk.Color.IVORY));
        Pieces.push(new Lyngk.Piece(Lyngk.Color.RED));
        Pieces.push(new Lyngk.Piece(Lyngk.Color.GREEN));
        Pieces.push(new Lyngk.Piece(Lyngk.Color.BLUE));
        Pieces.push(new Lyngk.Piece(Lyngk.Color.BLACK));

        return Pieces;
    };

    var CreateWhitePieces = function (Pieces) {
        Pieces.push(new Lyngk.Piece(Lyngk.Color.WHITE));

        return Pieces;
    };

    var ShufflePieces = function (a) {
        var position,randomIndex,itemAtIndex;
        var Pieces = a;

        for (position = Pieces.length - 1; position  >= 0; position --) {

            randomIndex = Math.floor(Math.random() * (position  + 1));
            itemAtIndex = Pieces[randomIndex];

            Pieces[randomIndex] = Pieces[position ];
            Pieces[position ] = itemAtIndex;
        }

        return Pieces;
    };


    this.GetIntersection = function (c) {
        return Plateau[c];
    };

    this.GetIntersectionColor = function (c) {
        return Plateau[c].GetColor();
    };

    var AreCoordinatesValid = function (a, b) {
        if (a.IsCoordinatesValid() == "valid"){
            if (b.IsCoordinatesValid() == "valid" && IsOccupied(b)) {
                return true;
            }
        }
        return false;
    };

    var IsOccupied = function (a) {
        return (Plateau[a.Hash()].GetState() != Lyngk.State.VACANT);
    };

    var IsFutureNumberofPieceValid = function (a,b){
        var nbpiecea = Plateau[a.Hash()].GetNbPiece();
        var nbpieceb = Plateau[b.Hash()].GetNbPiece();

        return ((nbpiecea + nbpieceb) < 6 ) && (nbpiecea >= nbpieceb);
    };

    var getDirection = function (a) {

        if (a != 0) {
            return a / Math.abs(a);
        }
        return 0;
    };

    var isDirectionCorrect = function (DiffColumn,DiffLine){

        var correct = false;
        if ((DiffColumn == DiffLine) || (DiffLine == 0 && DiffColumn != 0 )){
            correct = true;
        }
        if (DiffLine != 0 && DiffColumn == 0 ){
            correct = true;
        }
        return correct;
    };

    var IsMoveCorrect = function (a,b){

        var difcolonne = b.GetColonne() - a.GetColonne();
        var difligne = b.GetLigne() - a.GetLigne();
        var correct = false;

        if (isDirectionCorrect(difcolonne,difligne) ) {

           difcolonne = getDirection (difcolonne);
           difligne = getDirection (difligne);

            correct = !IsThereObstacle(a,b,difcolonne,difligne);

        }

        return correct;
    };

    var IsSamePoint = function (ptA,ptB){
        return (ptA.toString() == ptB.toString());
    };

    var IsThereObstacle = function (origPoint,destPoint,colDir,lineDir){
        var noobstacle = true;

        var i = origPoint.GetColonne()+1 + colDir;
        var j = origPoint.GetLigne()+1 + lineDir;
        var nwPt = Plateau[new Lyngk.Coordinates(i,j).Hash()];

        while (noobstacle && IsSamePoint(nwPt,destPoint)) {
            if (IsOccupied(new Lyngk.Coordinates(i,j)))
            {
                noobstacle = false;
            }

            i += colDir;
            j += lineDir;
        }

        return noobstacle;
    };

    this.IsMovePossible = function (a, b) {
        if (AreCoordinatesValid(a,b) && IsFutureNumberofPieceValid(a,b))
        {
                if (IsMoveCorrect(a,b) && NotSameColorsTwice(a,b))
                {
                    return true;
                }
        }

        return false;

    };

    this.GetJoueur = function () {
        return joueur;
    };


    this.MovePieces = function (a, b) {

        if (this.IsMovePossible(a, b)) {
            Plateau[b.Hash()].PutNewPile(Plateau[a.Hash()].GetPile());
            joueur = (joueur == 1 ) ? 2 : 1;
            return true;
        }
        else {
            return false;
        }
    };

    var NotSameColorsTwice = function (a, b) {
        var color = Plateau[a.Hash()].GetColors();
        color = color.concat(Plateau[b.Hash()].GetColors());
        var nbcolor = [0, 0, 0, 0, 0, 0];
        var i = 0;
        do {
            nbcolor[color[i]]++;
            if (nbcolor[color[i]] > 1 && color != Lyngk.Color.WHITE)
            {
                return false;
            }
            i++;
        } while (i < color.length);

        return true;
    };

    init();

};