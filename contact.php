<?php
// contact.php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /#contact");
    exit;
}

// Honeypot tegen bots
if (!empty($_POST["website"] ?? "")) {
    header("Location: /#contact");
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validatie
if ($name === "" || $email === "" || $message === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: /#contact?error=1");
    exit;
}

// Mail inhoud
$to = "tomkwanten2001@gmail.com"; 
$subject = "Portfolio contact: " . $name;

$body = "Naam: {$name}\n";
$body .= "Email: {$email}\n\n";
$body .= "Bericht:\n{$message}\n";

$headers = [];
$headers[] = "From: {$name} <{$email}>";
$headers[] = "Reply-To: {$email}";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$ok = mail($to, $subject, $body, implode("\r\n", $headers));

if ($ok) {
    header("Location: /#contact?sent=1");
} else {
    header("Location: /#contact?error=1");
}
exit;
