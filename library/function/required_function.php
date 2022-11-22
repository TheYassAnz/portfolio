<?php

// Fonction qui retourne vrai si la valeur est vide ou contient seulement des espaces.
// Sinon retourne faux
function est_vide($text){
    // retourne vrai si la chaine est vide où ne contient que des espaces. 
    if(ctype_space($text) || empty($text)){
        return true;
    }else{
        return false;
    }
}

// Fonction qui affiche la valeur si la valeur est défini
function show_if_defined(&$value){
    if(isset($value)){
        echo $value;
    }
}