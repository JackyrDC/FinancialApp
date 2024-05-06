# App Financiera 
## Introduccion
Esta aplicación web ofrece una solución integral para el control personal de las finanzas, permitiendo a los usuarios gestionar sus ingresos y egresos de manera eficiente. Con una variedad de funciones, incluyendo gráficos intuitivos, categorización detallada, registros de transacciones recientes, historial completo y generación de reportes, la aplicación simplifica el acceso a información detallada. Estas herramientas están diseñadas para empoderar a los usuarios en la toma de decisiones financieras informadas y facilitar una gestión más efectiva de sus recursos económicos.

Documentación Completa:
[Documentación](https://docs.google.com/document/d/1mFygPrj6lSseUIzQixMrxu8dPdaocKc4Zx8dSZWR_JU/edit?hl=es "Documentación")

La aplicación está estructurada de la siguiente manera:

### Base de Datos:
Utilizamos Pocket Base (PB), una herramienta de base de datos simple que ofrece un manejo rápido de datos.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/main/imagenes/pb.png)

### Inicio de Sesión:
Hemos implementado un proceso de inicio de sesión amigable y sencillo, con una imagen dinámica. Utilizamos Auth2 para permitir el inicio de sesión con Google, así como el registro mediante correo electrónico y contraseña.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/Login.png)

### Navbar 
En este navbar se concentra toda la navegación disponible para el usuario dentro de la página web, así como también los botones para cerrar sesión y contactarnos. Este menú de navegación facilita el acceso a las diferentes secciones y funcionalidades de la aplicación, permitiendo una experiencia de usuario fluida y eficiente.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/navbar.png)

### Dashboard (Inicio):
Esta es nuestra página principal, muy intuitiva, que proporciona la información más relevante generada por el usuario. En ella, se presenta un formulario para ingresar cualquier tipo de transacción.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/inicio.png)

Tenemos una sección que muestra el total de ingresos, así como los principales egresos o las categorías con más egresos. También se muestra el número total de transacciones realizadas, tanto de ingresos como de egresos.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/total.png)

Justo debajo, hay un botón para *'añadir una nueva transacción'.* Al hacer clic aquí, se despliega un pop-up con un formulario que permite registrar la transacción. Se solicita seleccionar entre ingreso o egreso, luego introducir la cantidad de la transacción, seleccionar la categoría y agregar una descripción para llevar un control detallado.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/formulario.png)

Además, en la parte superior derecha, encontramos un gráfico dinámico que se actualiza automáticamente a medida que agregamos transacciones. Este gráfico muestra el balance por mes y al pasar el cursor sobre él, resalta y oculta el tipo de transacción. El color rojo indica egresos y el color verde ingresos, lo que proporciona una rápida visualización de la distribución de los flujos financieros.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/grafica.png)

En la parte inferior, se presenta un apartado de categorías y otro de Transacciones Recientes. El primero muestra las categorías más utilizadas o aquellas en las que se han realizado más transacciones, presentándolas en un ranking. Mientras tanto, el segundo nos ofrece una lista detallada de las transacciones más recientes, facilitando un análisis minucioso de cada una de ellas.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/ca-re.png)

Vídeo de apoyo:
[Dashboard](https://drive.google.com/file/d/1o3aHFZplxBGoe2FqO8M_xZzOYe5IDQ5Z/view?t=22 "Dashboard")

# Historial
Debajo del panel de control, encontramos el Historial, donde se presenta de manera completa toda la información de las transacciones realizadas. Estas transacciones se almacenan en una tabla ordenada de forma que sea fácil de entender.

El Historial cuenta con diversas herramientas de filtrado para facilitar la búsqueda y la organización de la información:

- Primeramente, se presenta un filtro por categorías que permite seleccionar solo las transacciones de una categoría específica.

- También permite filtrar por tipo de transacción (ingresos o egresos).

- Se brinda la posibilidad de combinar estos dos tipos de filtros, lo que permite filtrar por categoría con un tipo de transacción específico o filtrar todo en base a ambos criterios.

- Además, se incluye un buscador que facilita la búsqueda por texto, permitiendo buscar por la descripción o la categoría de la transacción, así como por número, que sería el monto de la transacción.

- Por último, se implementa un buscador por fecha, que también puede combinarse con los filtros de tipo de transacción y categorías, brindando una búsqueda aún más precisa y personalizada.

![](https://raw.githubusercontent.com/JackyrDC/FinancialApp/961e33ee12caafafa3244c4dc576bee4af7e5ee0/imagenes/filtros.png)

Vídeo de apoyo:
[Historial](http://https://drive.google.com/file/d/1o3aHFZplxBGoe2FqO8M_xZzOYe5IDQ5Z/view?t=2 "Historial")

# Reportes
En esta sección se almacena toda la información con gráficos y notas para que el usuario pueda realizar filtros por mes, año y días específicos. Además, se proporciona la capacidad de visualizar qué categoría ha tenido más ingresos por mes y por año, junto con un balance anual. Esta funcionalidad permite al usuario analizar de manera detallada su historial financiero y obtener insights valiosos sobre sus patrones de gasto y ingresos a lo largo del tiempo.
