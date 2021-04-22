### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW
> Integrantes:
> * 👩 Paula Andrea Guevara Sánchez.
> * 👨 Daniel Felipe Rincón Muñoz.

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

---
### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.
---
### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.
---
❓  **Preguntas**

* ¿Qué es un Azure Function?
  > Azure Function es una solución para ejecutar fácilmente pequeños fragmentos de código o “funciones” en la nube, que nos presenta una multitud de nuevos triggers para poder       ejecutarlo.
* ¿Qué es serverless?
  > La computación sin servidor (o serverless para abreviar) es un modelo de ejecución en el que el proveedor en la nube (AWS, Azure o Google Cloud) es responsable de ejecutar       un fragmento de código mediante la asignación dinámica de los recursos. Y cobrando solo por la cantidad de recursos utilizados para ejecutar el código.
* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?
  > Integration Runtime (IR) es la infraestructura informática utilizada por Azure Data Factory para proporcionar las siguientes capacidades de integración de datos en               * diferentes entornos de red:
    * Flujo de datos : ejecute un flujo de datos en un entorno informático administrado de Azure.
    * Movimiento de datos : copie datos entre almacenes de datos en la red pública y almacenes de datos en la red privada (local o red privada virtual). Brinda soporte para           conectores integrados, conversión de formato, mapeo de columnas y transferencia de datos escalable y de alto rendimiento.
    * Despacho de actividades : envíe y supervise las actividades de transformación que se ejecutan en una variedad de servicios informáticos como Azure Databricks, Azure             HDInsight, Azure Machine Learning, Azure SQL Database, SQL Server y más.
    * Ejecución de paquetes SSIS : ejecute de forma nativa paquetes de SQL Server Integration Services (SSIS) en un entorno informático administrado de Azure.
  > Al momento de seleccionar Runtime al momento de crear el Function App, admite la conexión con almacenes de datos y servicios de proceso con puntos de conexión de acceso         público. Al habilitar Virtual Network administrado y Azure Integration Runtime se admite la conexión a almacenes de datos mediante el servicio de Private Link en el entorno     de red privada.
* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?
  > Esto se debe a que la Function App se basa en Azure Storage para operaciones como la gestión de disparadores y el registro de ejecuciones de funciones.
* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.
  
  > La versión Premium, utiliza el mismo sistema de facturación que las de pago por consumo, con cinco diferencias esenciales
     * No tiene enfriamiento. Es decir, la función no se «apaga» nunca, y por ello está disponible de manera inmediata en cualquier momento aunque no haya sido lanzada en              bastante      tiempo.
     * Tiene un rendimiento superior.
     * Se puede conectar a redes virtuales.
     * No tiene límite temporal de ejecución, aunque por defecto está configurado a 30 minutos.
     * Es más caro.
    
  Por último el App Plan, es igual que si fuera a montar un Web App o cualquier otro tipo de App Service, siendo la gran diferencia con las dos opciones anteriores el que su       escalado está limitado al tamaño máximo establecido para el tipo de App Plan. Es decir, 10, 20 o 100 instancias si estoy utilizando un Plan del tipo Isolated con un             Application Service Enviroment (ASE).
  
* ¿Por qué la memoization falla o no funciona de forma correcta?
  > La función recursiva funciona hasta cierto punto, aproximadamente 13000, a partir de ahí ocurre un error de Stack Overflow, ya que el número de llamadas recursivas excede la     capacidad del Call Stack.
* ¿Cómo funciona el sistema de facturación de las Function App?

  > La facturación del plan Premium se basa en la cantidad de segundos centrales y la memoria asignada a las instancias. Esta facturación difiere del plan de Consumo, que se         factura por ejecución y memoria consumida. No hay cargo de ejecución con el plan Premium. Se debe asignar al menos una instancia en todo momento por plan. Esta facturación       da como resultado un costo mensual mínimo por plan activo, independientemente de si la función está activa o inactiva.
* Informe
  > Como se puede ver, en la siguientes imagenes, se puede concluir que la aplicación escalo sola por si misma, debido a que el tiempo de ejecución es casi el mismo para las dos     instancias. 
  > NEWMAN Función iterativa 
  > ![](https://github.com/PaulaSanchez810/ARSW_LAB9/blob/master/images/img/1.png)
  > NEWMAN Función Recursiva 
  > ![](https://github.com/PaulaSanchez810/ARSW_LAB9/blob/master/images/img/2.png)
  > Nueva Function
  > ![](https://github.com/PaulaSanchez810/ARSW_LAB9/blob/master/images/img/3.png)
