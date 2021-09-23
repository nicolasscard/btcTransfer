# btcTransfer
It is a challenge

Implementar una aplicación que "simule" el envío de BTCs.

Se debe contemplar.

    - El usuario debe poder ver su balance disponible en BTC con su equivalente en pesos (por ejemplo 1 BTC = 250000 ARS)
    - El usuario puede realizar un envīo a una dirección btc.
    - El usuario debe recibir feedback del éxito o no del envío.    
    - El usuario puede ver el historial de operaciones realizadas.
    - El usuario puede ver el detalle de la operación realizada.
    - El usuario debe ver actualizado su balance luego de cada operación.
    
Para el envío de BTC se deben contemplar los siguientes campos:

    - Dirección BTC (dirección de destino a donde se quieren enviar los BTCs)
    - Monto a enviar (en btc)
    - Comisión de la red (solo lectura) (a modos prácticos puede ser un un random entre 0.0001 y 0.0002) (este fee debe sumarse a la cantidad de btc a enviar).
    (Es decir, si quiero enviar 1 btc y el random del fee es 0.00012, necesito al menos 1 + 0.00012 para poder enviar 1 btc.)

El detalle de la operación debe incluir:
    
    - Fecha
    - Monto enviado.    
    - Dirección de destino
    - Estado de la operación (exitosa / no exitosa)
    - ID de la operación.

Entregables: 
    Compartir el código de la aplicación a traves de github o bitbucket.
    APK de la aplicación.

Items extras: Redux, test de unidad, uso de APIs de 3ros (precio de bitcoins, comision de red)
