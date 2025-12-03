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
El sistema permite la creación dinámica de grafos, los cuales, tal como define GeeksforGeeks (2024), son estructuras de datos no lineales formadas por nodos y aristas. La aplicación soporta grafos dirigidos, no dirigidos y ponderados, ejecutando los siguientes algoritmos:

* **Recorridos:** Búsqueda en Anchura BFS y Búsqueda en Profundidad DFS.
* **Rutas Más Cortas:** Dijkstra, Bellman Ford y Floyd Warshall.
* **Árboles de Expansión Mínima:** Prim y Kruskal.
* **Propiedades Estructurales:** Verificación de Grafo Bipartito, Detección de Árbol y Emparejamientos.

---

## 7. Explicación Big-O por Algoritmo
*Análisis de complejidad temporal y espacial basado en la implementación mediante Matriz de Adyacencia.*

| Algoritmo | Tiempo $O(f(n))$ | Espacio $O(g(n))$ | Explicación Breve y Sustento Teórico |
| :--- | :---: | :---: | :--- |
| **BFS / DFS** | $O(V^2)$ | $O(V)$ | "La complejidad temporal de las operaciones BFS y DFS", (GeeksforGeeks, 2024) varía según la estructura de datos; al utilizar una matriz de adyacencia, para cada nodo visitado se debe iterar sobre toda su fila de vértices vecinos, resultando en una complejidad cuadrática. |
| **Dijkstra** | $O(V^2)$ | $O(V)$ | Se implementó mediante búsqueda lineal. Según explica Programiz (2024), el algoritmo mantiene un conjunto de vértices visitados y en cada iteración busca el nodo con menor distancia, lo cual en nuestra implementación matricial conlleva un costo cuadrático inevitable. |
| **Floyd Warshall** | $O(V^3)$ | $O(V^2)$ | Este algoritmo es eficiente para grafos densos, ya que (CP-Algorithms, 2023) afirma que requiere tres bucles anidados para evaluar todas las combinaciones posibles de nodos intermedios. El espacio es cuadrático para almacenar la matriz $D$. |
| **Bellman Ford** | $O(V \cdot E)$ | $O(V)$ | Relaja todas las aristas del grafo repetidas veces. Como indica Brilliant (2024), este método es capaz de manejar pesos negativos, pero "su complejidad es mayor que Dijkstra" (Brilliant, 2024), ya que recorre la estructura completa $V-1$ veces. |
| **Prim** | $O(V^2)$ | $O(V)$ | De manera similar a Dijkstra, busca el vértice de menor peso de conexión en cada paso. Según Jenkins (2023), la implementación "naive" (sin colas de prioridad binarias) iterando sobre el arreglo de distancias mínimas es la más adecuada para grafos densos representados en matrices. |
| **Kruskal** | $O(E \log E)$ | $O(V + E)$ | "El algoritmo de Kruskal ordena todas las aristas por peso", (GeeksforGeeks, 2023) y utiliza una estructura de conjuntos disjuntos (Union-Find) para verificar ciclos, siendo el ordenamiento el paso dominante en el tiempo de ejecución. |

---

## 8. Análisis y Discusión

Durante el desarrollo de este laboratorio de grafos, se observó que la elección de la estructura de datos fundamental, en este caso la **Matriz de Adyacencia**, influye directamente en la complejidad temporal. Como señala freeCodeCamp (2024), "las listas de adyacencia son mejores para grafos dispersos", (freeCodeCamp, 2024) mientras que nuestra elección de matriz penaliza el rendimiento en recorridos simples elevando su costo a $O(V^2)$, aunque facilita la verificación de conexiones en $O(1)$.

La visualización gráfica mediante Canvas presentó un desafío técnico. Se optó por redibujar el grafo completo en cada ciclo, un enfoque que Mozilla Developer Network (2025) describe como el estándar para animaciones de alto rendimiento en la API de Canvas, permitiendo movimientos fluidos y retroalimentación visual inmediata.

---

## 9. Conclusiones

El proyecto cumplió satisfactoriamente con el objetivo de implementar y visualizar una biblioteca robusta de algoritmos. Técnicamente se concluye lo siguiente:

1.  **Valor Pedagógico:** La visualización interactiva supera al código estático. Según VisuAlgo (s.f.), "visualizar estructuras de datos y algoritmos" (VisuAlgo, s.f.) permite comprender conceptos abstractos como la relajación de aristas de forma intuitiva.
2.  **Modularización:** La separación de la lógica de dibujo (UI) de la lógica algorítmica fue esencial, alineándose con los principios de desarrollo modernos que sugieren que (Atlassian, 2024) una arquitectura desacoplada facilita la escalabilidad del software.
3.  **Validación Teórica:** Se reforzó el conocimiento sobre las limitaciones de tiempo. Validamos que, tal como advierte CP-Algorithms (2023), soluciones cúbicas como Floyd-Warshall no son viables para grafos masivos, limitando su uso práctico a conjuntos de datos controlados.

---

## 10. Bibliografía

* Atlassian. (2024). *Microservices Architecture*. Atlassian Agile Coach. Recuperado de https://www.atlassian.com/microservices/microservices-architecture
* Brilliant. (2024). *Bellman-Ford Algorithm*. Brilliant.org. Recuperado de https://brilliant.org/wiki/bellman-ford-algorithm/
* CP-Algorithms. (2023). *Floyd-Warshall Algorithm*. CP-Algorithms. Recuperado de https://cp-algorithms.com/graph/floyd-warshall.html
* freeCodeCamp. (2024). *Adjacency Matrix vs Adjacency List – Graph Data Structures Explained*. freeCodeCamp.org. Recuperado de https://www.freecodecamp.org/news/adjacency-matrix-vs-adjacency-list/
* GeeksforGeeks. (2023). *Kruskal’s Minimum Spanning Tree Algorithm*. GeeksforGeeks. Recuperado de https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/
* GeeksforGeeks. (2024). *Graph Data Structure And Algorithms*. GeeksforGeeks. Recuperado de https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/
* Jenkins, J. (2023). *Prim's Algorithm for Minimum Spanning Trees*. Baeldung on Computer Science. Recuperado de https://www.baeldung.com/cs/prims-algorithm
* Mozilla Developer Network. (2025). *Basic animations - Web APIs*. MDN Web Docs. Recuperado de https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
* Programiz. (2024). *Dijkstra's Algorithm*. Programiz. Recuperado de https://www.programiz.com/dsa/dijkstra-algorithm
* VisuAlgo. (s.f.). *Visualising Data Structures and Algorithms through Animation*. VisuAlgo.net. Recuperado de https://visualgo.net/en