<?php

include "conexion.php";


$nombre = $_POST["nombre"] ?? "";

$telefono = $_POST["telefono"] ?? "";

$asistencia = $_POST["asistencia"] ?? "";

$personas = $_POST["personas"] ?? 1;

$mensaje = $_POST["mensaje"] ?? "";



if($nombre == "" || $asistencia == ""){

    echo "ERROR";

    exit;

}



$sql = "INSERT INTO invitados
(nombre, telefono, asistencia, personas, mensaje)

VALUES (?, ?, ?, ?, ?)";



$stmt = $conexion->prepare($sql);



$stmt->bind_param(
    "sssis",
    $nombre,
    $telefono,
    $asistencia,
    $personas,
    $mensaje
);



if($stmt->execute()){

    echo "OK";

}else{

    echo "ERROR";

}



$stmt->close();

$conexion->close();


?>