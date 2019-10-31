window.onload = function(){
    console.log("Reset");
    window.localStorage.setItem("Score", 5);
    window.localStorage.removeItem("score");
}