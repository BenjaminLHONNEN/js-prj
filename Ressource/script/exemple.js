/**
 * Created by probe on 12/01/2017.
 */
function exampleClick() {
    var allumetteExemple = document.getElementById("imgExample");
    var texteExample = document.getElementById("pExample");
    if(allumetteExemple.getAttribute("src")=="Ressource/img/allumette.png")
    {
        allumetteExemple.src = "Ressource/img/allumetteFeu.png";
        resetAnim(allumetteExemple);
        texteExample.innerHTML = "Sélectionnée"
    }
    else if (allumetteExemple.getAttribute("src")=="Ressource/img/allumetteFeu.png")
    {
        allumetteExemple.src = "Ressource/img/allumette.png";
        resetAnim(allumetteExemple);
        texteExample.innerHTML = "Non Sélectionnée"
    }
}