const express = require('express');
let db = require('../util/db');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('menu');
});
router.post('/', function (req, res) {
    res.redirect('/');
});

router.post('/game', function (req, res) {
    let tiles = [];
    for(let i=0; i<25; i++){
        let singleTile ={id: i}
        tiles.push(singleTile);
    }
    res.render('tile', {tile: tiles, tilesCSS: true, gamestartJS: true});
});

router.post('/leaderboards', function (req, res) {
    GetLeaderboard(function(scores){
        res.render('leaderboards', {entry: scores, leaderboardJS: true});
    });
});

router.get('/leaderboards', function (req, res) {
    GetLeaderboard(function(scores){
        res.render('leaderboards', {entry: scores, leaderboardJS: true});
    });
});

function GetLeaderboard(callback){
    let entries = [];
    db.execute('SELECT * FROM Leaderboard', function(err,results,fields){
        for(let i=0; i<results.length;i++){
            let curEntry = {
                name: results[i].name,
                score: results[i].score
            }
            entries.push(curEntry);
        }
        entries.sort(function(a,b){return parseInt(b.score) - parseInt(a.score)});
        for(let i=0; i<entries.length; i++){
            entries[i].rank = i+1;
        }
        entries.length = 5;
        callback(entries);
    });
}

router.post('/finishGame', function (req, res) {
    res.render('addScore', {summaryJS:true, addScoreJS:true});
});

router.post('/addScore', function (req, res) {
    db.execute("INSERT INTO Leaderboard (name, score) VALUES ('"
    + req.body.name + "', '" 
    + req.body.score + "')");
    res.redirect('/leaderboards');
});

module.exports = router;