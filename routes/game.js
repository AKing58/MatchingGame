const express = require('express');
let fs = require('fs');

const router = express.Router();

router.get('/', function (req, res) {
    let tiles = [];
    for(let i=0; i<24; i++){
        let singleTile ={
            id: i,
            isTarget: false
        }
        tiles.push(singleTile);
    }
    res.render('tile', {tile: tiles, tilesCSS: true});
});