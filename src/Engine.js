"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};


Lyngk.Engine = function () {

    var Plateau;

    var joueur;

    var colorclaim;


    var init = function(){
        Plateau = [];
        colorclaim = [];

        joueur = 1;
        //Plateau = PutPiecesOnBoard(Plateau, ShufflePieces(GeneratePieces()));
        Plateau = PutPiecesOnBoard(Plateau, GeneratePieces());

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
            if (coordinates.isCoordinatesValid() === "valid") {
                console.log(coordinates.InStringFormat());
                console.log(Pieces[nbpulled].getColor());
                plateau[coordinates.hash()] = new Lyngk.Intersection();
                plateau[coordinates.hash()].putNewPiece(Pieces[nbpulled]);
                nbpulled+=1;
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

        for (position = Pieces.length - 1; position  >= 0; position-=1) {

            randomIndex = Math.floor(Math.random() * (position  + 1));
            itemAtIndex = Pieces[randomIndex];

            Pieces[randomIndex] = Pieces[position ];
            Pieces[position ] = itemAtIndex;
        }

        return Pieces;
    };


    this.getIntersection = function (c) {
        return Plateau[c];
    };

    this.getIntersectionColor = function (c) {
        return Plateau[c].getColor();
    };

    this.setClaimcolor = function (color){
        colorclaim[joueur] = color;
    };

    this.getClaimcolor = function (numjoueur){
        return colorclaim[numjoueur];
    };

    var areCoordinatesValid = function (a, b) {
        if (a.isCoordinatesValid() === "valid"){
            if (b.isCoordinatesValid() === "valid" && isOccupied(b)) {
                return true;
            }
        }
        return false;
    };

    var isOccupied = function (a) {
        return (Plateau[a.hash()].getState() !== Lyngk.State.VACANT);
    };

    var isFutureNumberofPieceValid = function (a,b){
        var nbpiecea = Plateau[a.hash()].getNbPiece();
        var nbpieceb = Plateau[b.hash()].getNbPiece();

        return ((nbpiecea + nbpieceb) < 6 ) && (nbpiecea >= nbpieceb);
    };

    var getDirection = function (a) {

        if (a !== 0) {
            return a / Math.abs(a);
        }
        return 0;
    };

    var isDirectionCorrect = function (DifColumn,DifLine){

        var correct = false;
        if ( isDirDiag(DifColumn,DifLine) || isDirCross(DifColumn,DifLine) ){
            correct = true;
        }
        return correct;
    };

    var isDirDiag = function (DiffColumn,DiffLine){
        return (DiffColumn === DiffLine);
    };

    var isDirCross = function (DiffCol,DiffLine) {

        return (isDirColumn(DiffCol,DiffLine) || isDirLine(DiffCol,DiffLine));
    };

    var isDirLine = function (DiffCol,DiffLine) {

        return (DiffLine !== 0 && DiffCol === 0 );
    };

    var isDirColumn = function (DiffCol,DiffLine) {

        return (DiffLine === 0 && DiffCol !== 0);
    };

    var isMoveCorrect = function (a,b){

        var difcolonne = b.getColonne() - a.getColonne();
        var difligne = b.getLigne() - a.getLigne();
        var correct = false;

        if (isDirectionCorrect(difcolonne,difligne) ) {

           difcolonne = getDirection (difcolonne);
           difligne = getDirection (difligne);

            correct = !isThereObstacle(a,b,difcolonne,difligne);

        }

        return correct;
    };

    var isSamePoint = function (ptA, ptB){
        return (ptA.InStringFormat() === ptB.InStringFormat());
    };

    var isThereObstacle = function (origPoint,destPoint,colDir,lineDir){
        var noobstacle = false;

        var i = origPoint.getColonne()+1 + colDir;
        var j = origPoint.getLigne()+1 + lineDir;
        var nwPt = new Lyngk.Coordinates(i,j);

        while (!noobstacle && !isSamePoint(nwPt,destPoint)) {
            if (isOccupied(nwPt))
            {
                noobstacle = true;
            }

            i += colDir;
            j += lineDir;

            nwPt = new Lyngk.Coordinates(i,j);
        }

        return noobstacle;
    };

    this.isMovePossible = function (a, b) {
        if (areCoordinatesValid(a,b) && isFutureNumberofPieceValid(a,b))
        {
                if (isMoveCorrect(a,b) && NotSameColorsTwice(a,b))
                {
                    return true;
                }
        }

        return false;

    };

    this.getJoueur = function () {
        return joueur;
    };


    this.movePieces = function (a, b) {

        if (this.isMovePossible(a, b)) {
            Plateau[b.hash()].putNewPile(Plateau[a.hash()].getPile());
            joueur = (joueur === 1 ) ? 2 : 1;
            return true;
        }
        else {
            return false;
        }
    };

    var NotSameColorsTwice = function (a, b) {
        var color = Plateau[a.hash()].getColors();
        color = color.concat(Plateau[b.hash()].getColors());
        var nbcolor = [0, 0, 0, 0, 0, 0];
        var i = 0;
        do {
            nbcolor[color[i]]+=1;
            if (nbcolor[color[i]] > 1 && color !== Lyngk.Color.WHITE)
            {
                return false;
            }
            i+=1;
        } while (i < color.length);

        return true;
    };

    init();

};