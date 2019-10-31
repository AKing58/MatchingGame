function LoadLocalStorage(){
    window.localStorage.setItem("curName",document.getElementById("name").value);
    
    window.localStorage.setItem("curScore",document.getElementById("score").value);
}