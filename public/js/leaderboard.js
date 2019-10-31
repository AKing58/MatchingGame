window.onload = function(){
    console.log("HI " + window.localStorage.getItem("curName"));
    document.getElementById("curName").textContent = window.localStorage.getItem("curName");
    document.getElementById("curScore").textContent = window.localStorage.getItem("curScore");
    let container = document.getElementById("score-holder");
    for(let i=3; i<container.rows.length; i++){
        console.log(container.rows[i].cells[1].textContent);
        if(container.rows[i].cells[1].textContent == window.localStorage.getItem("curName")
            && container.rows[i].cells[2].textContent == window.localStorage.getItem("curScore")){
            document.getElementById("curRank").textContent = container.rows[i].cells[0].textContent;
            return;
        }
    }
    if(document.getElementById("curRank").textContent == ""){
        document.getElementById("curRank").textContent = "5+";
    }
}