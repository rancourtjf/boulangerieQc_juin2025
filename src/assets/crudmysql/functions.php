<?php

function pre_r($array)
{
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}

function clean_scandir($dir)
{
    return array_values(array_diff(scandir($dir), array('.', '..')));
}

function clean_readdir($dir)
{
    $file = array();
    if ($handle = opendir($dir)) {
        while (false !== ($file = readdir($handle))) {
            if ($file != '.' && $file != '..') {
                $files[] = $file;
            }
        }
        closedir($handle);
    }
    return $files;
};
function parseJwt($jwt)
{
    $jwtParts = explode('.', $jwt);

    if (count($jwtParts) !== 3) {
        throw new UnexpectedValueException('Invalid JWT');
    }

    list($headerEncoded, $payloadEncoded, $signature) = $jwtParts;

    $header = json_decode(base64_decode($headerEncoded), true);
    $payload = json_decode(base64_decode($payloadEncoded), true);

    if (!$header || !$payload) {
        throw new UnexpectedValueException('Invalid JWT');
    }
    // Vérifier l'expiration
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        throw new UnexpectedValueException('Token expired');
    }

    return [
        'header' => $header,
        'payload' => $payload,
        'signature' => $signature
    ];
}

function base64UrlDecode($input)
{
    $remainder = strlen($input) % 4;
    if ($remainder) {
        $addlen = 4 - $remainder;
        $input .= str_repeat('=', $addlen);
    }
    return base64_decode(strtr($input, '-_', '+/'));
}
function validateJwt($jwt, $secretKey)
{
    // Diviser le JWT en ses trois parties
    $jwtParts = explode('.', $jwt);

    if (count($jwtParts) !== 3) {
        throw new UnexpectedValueException('Invalid JWT');
    }

    list($headerEncoded, $payloadEncoded, $signatureProvided) = $jwtParts;

    // Décoder l'en-tête et la charge utile
    $header = json_decode(base64UrlDecode($headerEncoded), true);
    $payload = json_decode(base64UrlDecode($payloadEncoded), true);

    if (!$header || !$payload) {
        throw new UnexpectedValueException('Invalid JWT');
    }

    // Vérifier la signature
    $signatureGenerated = hash_hmac('sha256', "$headerEncoded.$payloadEncoded", $secretKey, true);
    $signatureGeneratedEncoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signatureGenerated));

    if ($signatureGeneratedEncoded !== $signatureProvided) {
        throw new UnexpectedValueException('Invalid signature');
    }

    // Vérifier l'expiration
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        throw new UnexpectedValueException('Token expired');
    }

    return $payload;
}
