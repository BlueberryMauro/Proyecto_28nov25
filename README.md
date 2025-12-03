# Estructuras Avanzadas Computacionales
### Universidad Autónoma de Aguascalientes

[![Ver Proyecto Web](https://img.shields.io/badge/_Ver_Proyecto_Web-blueberrymauro.github.io-blue?style=for-the-badge&logo=github&color=3F5EFB)](https://blueberrymauro.github.io/Proyecto_28nov25/)

---

## 1. Portada
| Detalles | Información |
| :--- | :--- |
| **Materia** | Estructuras Avanzadas Computacionales|
| **Semestre** | $3^{\circ}$ (Agosto - Diciembre)|
| **Proyecto** | Final (Evaluación Parcial)|
| **Fecha de Entrega** | 2 de diciembre de 2025|

---

## 2. Integrantes y Roles

A continuación se detallan las responsabilidades asumidas por cada integrante, basadas en el historial de contribuciones y la división técnica del trabajo:

| Nombre del Estudiante | Rol Principal | Tareas y Contribuciones Principales |
| :--- | :--- | :--- |
| **Mauro Lomeli Muñoz** | Gestor de Proyecto y Líder de Interfaz | Estructura base del proyecto, diseño de interfaz y experiencia de usuario, sistema de animaciones en Canvas, gestión de ramas y solución de conflictos de fusión de código, integración de sonidos y estilos. |
| **Luis Fernando Silva Briones** | Lógica Central y Entrada Salida | Implementación de lógica de lectura y escritura de archivos de texto, desarrollo del motor de dibujo en Canvas, manejo de eventos de desplazamiento vertical y optimización de interacción visual. |
| **Juan Emmanuel Suarez Garcia** | Desarrollador de Algoritmos Estructurales | Desarrollo de algoritmos de verificación de Árbol y Bipartito, implementación de recorridos de profundidad y lógica de emparejamientos, coloración dinámica de nodos. |
| **Julio Davila Acevedo** | Desarrollador de Algoritmos de Optimización | Implementación de algoritmos de rutas cortas como Floyd Warshall y Bellman Ford y Árboles de Expansión Mínima como Prim y Kruskal, desarrollo de mensajes informativos emergentes. |
| **Erick Leonardo Chavez Ponce** | Soporte de Interfaz e Integración Lógica | Integración lógica para algoritmos bipartitos, funcionalidad de selección de nodos iniciales, ajustes de diseño adaptable a dispositivos en la vista principal y depuración de la interfaz visual. |

---

## 3. Metodología Usada
Para la gestión del proyecto se utilizó una metodología ágil adaptada:
* **Marco de trabajo:** Kanban.
* **Herramienta de Seguimiento:** Trello.
* **Control de Versiones:** Git y GitHub con manejo de ramas por funcionalidad y solicitudes de cambios.

---

## 4. Capturas del Tablero
*Evidencia de la organización y asignación de tareas mediante metodología Kanban.*

![Tablero Kanban Trello](https://placehold.co/800x400/png?text=Captura+del+Tablero+Trello+Kanban)

---

## 5. Capturas y Enlaces del Repositorio
*Evidencia del flujo de trabajo y control de versiones.*

![Historial de Cambios](https://placehold.co/800x400/png?text=Captura+de+GitHub+Historial+de+Cambios)

---

## 6. Algoritmos Implementados
El sistema permite la creación dinámica de grafos dirigidos, no dirigidos y ponderados, así como la ejecución de los siguientes algoritmos:

* **Recorridos:** Búsqueda en Anchura BFS y Búsqueda en Profundidad DFS.
* **Rutas Más Cortas:** Dijkstra, Bellman Ford y Floyd Warshall.
* **Árboles de Expansión Mínima:** Prim y Kruskal.
* **Propiedades Estructurales:** Verificación de Grafo Bipartito, Detección de Árbol y Emparejamientos.

---

## 7. Explicación Big-O por Algoritmo
*Análisis de complejidad temporal y espacial basado en la implementación mediante Matriz de Adyacencia.*

| Algoritmo | Tiempo $O(f(n))$ | Espacio $O(g(n))$ | Explicación Breve |
| :--- | :---: | :---: | :--- |
| **BFS / DFS** | $O(V^2)$ | $O(V)$ | Al utilizar una matriz de adyacencia, para cada nodo visitado se debe iterar sobre toda su fila de vértices vecinos para encontrar conexiones, resultando en una complejidad cuadrática. |
| **Dijkstra** | $O(V^2)$ | $O(V)$ | Se implementó mediante búsqueda lineal. En cada iteración se busca el nodo con menor distancia no visitado entre todos los vértices y se actualizan sus vecinos, lo que conlleva un costo cuadrático. |
| **Floyd Warshall** | $O(V^3)$ | $O(V^2)$ | Requiere tres bucles anidados para evaluar todas las combinaciones posibles de nodos intermedios entre cada par de origen y destino. El espacio es cuadrático para almacenar la matriz de distancias. |
| **Bellman Ford** | $O(V \cdot E)$ | $O(V)$ | Relaja todas las aristas del grafo repetidas veces según el número de vértices menos uno. En nuestra implementación matricial, esto implica recorrer la estructura completa repetidamente para detectar ciclos negativos. |
| **Prim** | $O(V^2)$ | $O(V)$ | De manera similar a Dijkstra, busca el vértice de menor peso de conexión en cada paso iterando sobre el arreglo de distancias mínimas, siendo este enfoque adecuado para grafos densos. |
| **Kruskal** | $O(E \log E)$ | $O(V + E)$ | Ordena las aristas por peso y utiliza una estructura de conjuntos disjuntos para verificar ciclos al agregar aristas al Árbol de Expansión Mínima. |

---

## 8. Análisis y Discusión

Durante el desarrollo de este laboratorio de grafos, se observó que la elección de la estructura de datos fundamental, en este caso la **Matriz de Adyacencia**, influye directamente en la complejidad temporal de los algoritmos. Si bien la matriz facilita la implementación y verificación directa de conexiones en grafos densos, penaliza el rendimiento en recorridos simples elevando su costo en comparación con las listas de adyacencia.

La visualización gráfica mediante el elemento Canvas de HTML5 presentó un desafío técnico significativo referente a la sincronización entre el estado lógico del algoritmo, como los nodos visitados o aristas resultantes, y su representación visual. Se optó por un sistema de renderizado que redibuja el grafo completo en cada ciclo de animación, permitiendo movimientos fluidos y retroalimentación visual inmediata como el coloreado de grafos bipartitos o el trazado de rutas críticas.

---

## 9. Conclusiones

El proyecto cumplió satisfactoriamente con el objetivo de implementar y visualizar una biblioteca robusta de algoritmos de grafos. A través de la metodología Kanban y el uso de Git, el equipo logró coordinar la integración de módulos complejos desarrollados en paralelo, como la lectura de archivos y la lógica interna de los algoritmos.

Técnicamente se concluye lo siguiente:
1.  La visualización interactiva es una herramienta pedagógica superior al código estático, permitiendo comprender comportamientos complejos como la relajación de aristas.
2.  La modularización del código separando la lógica de dibujo de la lógica algorítmica fue esencial para escalar el proyecto de pocos integrantes a una suite completa de algoritmos.
3.  Se reforzó el conocimiento sobre las limitaciones de tiempo y espacio de cada algoritmo, validando teóricamente por qué ciertas soluciones no son viables para grafos masivos debido a su crecimiento exponencial o cúbico.

---

## 10. Bibliografía

1.  Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2.  Universidad Autónoma de Aguascalientes. (2025). *Documento de Requerimientos: Proyecto Estructuras Avanzadas*. Departamento de Ciencias de la Computación.
3.  Mozilla Developer Network. (2025). *Canvas API & JavaScript Data Structures*. Recuperado de developer.mozilla.org.