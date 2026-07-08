<?php

$servidor = "localhost";
$usuario = "root";
$password = "root123";
$base_datos = "invitados_18";


$conexion = new mysqli(
    $servidor,
    $usuario,
    $password,
    $base_datos
);


if($conexion->connect_error){

    die("Error de conexión: " . $conexion->connect_error);

}


$conexion->set_charset("utf8");

?>