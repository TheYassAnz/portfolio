<?php

/**
 * Return true if the string is empty or contains only whitespace
 *
 * 
 * @author YSMA
 * @return bool
 */
function est_vide(string $text)
{
    return ctype_space($text) || empty($text);
}

/**
 * Show the value if it is defined
 *
 * 
 * @author YSMA
 */
function show_if_defined(mixed &$value)
{
    if (isset($value)) {
        echo $value;
    }
}

function convert_date_to_string($date)
{
    $monthList = array(
        "",
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    );
    $day = date("d", strtotime($date));
    $month = $monthList[intval(date("m", strtotime($date)))];
    $year = date("Y", strtotime($date));
    // Retourne la date en phrase
    return $day . ' ' . $month . ' ' . $year;
}
