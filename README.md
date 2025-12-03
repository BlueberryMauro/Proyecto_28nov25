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
| **Mauro Lomeli Muñoz** | Project Manager & Lead Frontend | Estructura base del proyecto, diseño de interfaz (UI/UX), sistema de animaciones en Canvas, gestión de ramas y solución de conflictos (Merge), integración de sonidos y estilos. |
| **Luis Fernando Silva Briones** | Core Backend & I/O Logic | Implementación de lógica de lectura/escritura de archivos (`.txt`), desarrollo del motor de dibujo en Canvas, manejo de eventos de scroll y optimización de interacción visual. |
| **Juan Emmanuel Suarez Garcia** | Algorithm Developer (Structure) | Desarrollo de algoritmos de verificación (Árbol, Bipartito), implementación de recorridos (DFS) y lógica de emparejamientos (Matching). Coloración dinámica de nodos. |
| **Julio Davila Acevedo** | Algorithm Developer (Optimization) | Implementación de algoritmos de rutas cortas (Floyd-Warshall, Bellman-Ford) y Árboles de Expansión Mínima (Prim, Kruskal). Desarrollo de tooltips informativos. |
| **Erick Leonardo Chavez Ponce** | Frontend Support & Logic Integration | Integración lógica para algoritmos bipartitos, funcionalidad de selección de nodos iniciales, ajustes de diseño responsivo en la vista principal y depuración de frontend. |

---

## 3. Metodología Usada
Para la gestión del proyecto se utilizó una metodología ágil adaptada:
* **Marco de trabajo:** Kanban.
* **Herramienta de Seguimiento:** Trello.
* **Control de Versiones:** Git & GitHub (Manejo de ramas por funcionalidad `feature/*` y Pull Requests).

---

## 4. Capturas del Tablero
*Evidencia de la organización y asignación de tareas mediante metodología Kanban.*

![Tablero Kanban Trello](https://placehold.co/800x400/png?text=Captura+del+Tablero+Trello+(Kanban))

---

## 5. Capturas/Links del Repositorio
*Evidencia del flujo de trabajo y control de versiones.*

![Historial de Commits](https://placehold.co/800x400/png?text=Captura+de+GitHub+Commits)

---

## 6. Algoritmos Implementados
[cite_start]El sistema permite la creación dinámica de grafos (dirigidos, no dirigidos, ponderados) y la ejecución de los siguientes algoritmos [cite: 48-83]:

* **Recorridos:** BFS (Anchura) y DFS (Profundidad).
* **Rutas Más Cortas:** Dijkstra, Bellman-Ford, Floyd-Warshall.
* **Árboles de Expansión Mínima (MST):** Prim y Kruskal.
* **Propiedades Estructurales:** Verificación de Grafo Bipartito, Detección de Árbol, Emparejamientos (Matching).

---

## 7. Explicación Big-O por Algoritmo
*Análisis de complejidad temporal y espacial basado en la implementación mediante Matriz de Adyacencia ($V$ = Vértices, $E$ = Aristas).*

| Algoritmo | Tiempo $O(f(n))$ | Espacio $O(g(n))$ | Explicación Breve |
| :--- | :---: | :---: | :--- |
| **BFS / DFS** | $O(V^2)$ | $O(V)$ | Al utilizar una matriz de adyacencia, para cada nodo visitado se debe iterar sobre toda su fila (V columnas) para encontrar vecinos, resultando en una complejidad cuadrática. |
| **Dijkstra** | $O(V^2)$ | $O(V)$ | Se implementó sin cola de prioridad optimizada. En cada iteración se busca linealmente el nodo con menor distancia no visitado ($V$) y se actualizan sus vecinos ($V$), resultando en $V \times V$. |
| **Floyd-Warshall** | $O(V^3)$ | $O(V^2)$ | Requiere tres bucles anidados para evaluar todas las combinaciones posibles de nodos intermedios ($k$) entre cada par de origen ($i$) y destino ($j$). El espacio es cuadrático para la matriz de distancias. |
| **Bellman-Ford** | $O(V \cdot E)$ | $O(V)$ | Relaja todas las aristas del grafo $V-1$ veces. En nuestra implementación matricial, esto implica recorrer la matriz completa repetidamente, siendo efectivo para detectar ciclos negativos. |
| **Prim** | $O(V^2)$ | $O(V)$ | Similar a Dijkstra, busca el vértice de menor peso de conexión en cada paso iterando sobre el arreglo de distancias mínimas, adecuado para grafos densos. |
| **Kruskal** | $O(E \log E)$ | $O(V + E)$ | Ordena las aristas por peso ($E \log E$) y utiliza una estructura de conjuntos disjuntos (Union-Find) para verificar ciclos al agregar aristas al MST. |

---

## 8. Análisis y Discusión

Durante el desarrollo de este laboratorio de grafos, se observó que la elección de la estructura de datos fundamental, en este caso la **Matriz de Adyacencia**, influye directamente en la complejidad temporal de los algoritmos. Si bien la matriz facilita la implementación y verificación de conexiones ($O(1)$) en grafos densos, penaliza el rendimiento en recorridos simples como BFS o DFS, elevándolos a $O(V^2)$ en comparación con $O(V+E)$ de las listas de adyacencia.

La visualización gráfica mediante HTML5 Canvas presentó un desafío técnico significativo: la sincronización entre el estado lógico del algoritmo (ej. nodos visitados, aristas del MST) y su representación visual. Se optó por un sistema de renderizado que redibuja el grafo completo en cada frame, permitiendo animaciones fluidas y retroalimentación visual inmediata (como el coloreado de grafos bipartitos o el trazado de rutas críticas).

---

## 9. Conclusiones

El proyecto cumplió satisfactoriamente con el objetivo de implementar y visualizar una biblioteca robusta de algoritmos de grafos. A través de la metodología Kanban y el uso de Git, el equipo logró coordinar la integración de módulos complejos desarrollados en paralelo, como la lectura de archivos y la lógica de los algoritmos.

Técnicamente, se concluye que:
1.  La visualización interactiva es una herramienta pedagógica superior al código estático, permitiendo comprender comportamientos como la relajación de aristas en Bellman-Ford.
2.  La modularización del código (separación de lógica de dibujo y lógica algorítmica) fue esencial para escalar el proyecto de 3 a más de 9 algoritmos funcionales.
3.  Se reforzó el conocimiento sobre las limitaciones de tiempo y espacio de cada algoritmo, validando teóricamente por qué algoritmos como Floyd-Warshall no son viables para grafos masivos ($V > 1000$) debido a su crecimiento cúbico.

---

## 10. Bibliografía

1.  Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2.  Universidad Autónoma de Aguascalientes. (2025). *Documento de Requerimientos: Proyecto Estructuras Avanzadas*. Departamento de Ciencias de la Computación.
3.  Mozilla Developer Network (MDN). (2025). *Canvas API & JavaScript Data Structures*. Recuperado de developer.mozilla.org.