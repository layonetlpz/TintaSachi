/* ==========================================================================
   TINTA-SACHI · Almacén Central de Contenidos y Datos Verificados
   ========================================================================== */

window.TINTA_SACHI_DATA = {
  brand: {
    name: "TINTA-SACHI",
    tagline: "Las historias también se viven",
    dimensionsBox: "26 × 20 × 9 cm",
    fefco: "FEFCO 0427",
    colorIndigo: "#1F1575",
    colorOrange: "#E56020",
    songTitle: "En mi cajita cabe otro lugar"
  },

  boxModes: [
    {
      id: "exterior",
      tab: "1. Caja Sellada",
      badge: "ESTRUCTURA EXTERIOR · FEFCO 0427",
      title: "Empaque rígido autoarmable en índigo nocturno",
      desc: "Construida en cartón microcorrugado flauta E (1,5 mm) de 26 × 20 × 9 cm con laminado mate en índigo profundo (#1F1575) y acentos en naranja tinta (#E56020). El sello superior con el kanji 幸 protege la apertura e introduce una pausa deliberada antes de revelar el universo interior.",
      img: "assets/Caja_TintaSachi_Render.png",
      caption: "Render conceptual de diseño del empaque Tinta-Sachi (26 × 20 × 9 cm, estándar FEFCO 0427).",
      sealed: true
    },
    {
      id: "apertura",
      tab: "2. Ritual de Apertura",
      badge: "CAPA SENSORIAL · PAPEL SEDA SEIGAIHA",
      title: "Despliegue táctil y umbral narrativo",
      desc: "Al romper el sello 幸, el interior de la tapa despliega ilustraciones de nubes orientales y destellos cálidos mientras el papel seda crema (20 g/m²) estampado resguarda las piezas. Esta transición desacelera el ritmo cotidiano y prepara el momento cumbre (Peak Moment) de la experiencia.",
      img: "assets/Caja_TintaSachi_Render.png",
      caption: "Representación digital de la capa interna de revelación con papel seda ilustrado.",
      sealed: false
    },
    {
      id: "plano",
      tab: "3. Plano Estructural FEFCO 0427",
      badge: "INGENIERÍA DE EMPAQUE · TROQUEL Y CUNAS",
      title: "Distribución modular interna y protección de piezas",
      desc: "El plano estructural define las cotas exactas de tapa y base (26 × 20 cm), lomo y laterales abatibles (9 cm de altura), junto con la zonificación interior: Cuna A para el ejemplar literario o manga (hasta 21 × 15 × 3 cm), Cuna B para pin esmaltado y llavero, y sobre dedicado para la tarjeta QR musical y dedicatoria.",
      img: "planos_y_renders/Plano_Tecnico_Caja_TintaSachi.png",
      caption: "Plano técnico estructural (dieline FEFCO 0427) y matriz de materiales documentados.",
      sealed: false
    },
    {
      id: "ecosistema",
      tab: "4. Ecosistema Visual",
      badge: "IDENTIDAD Y EXTENSIÓN DE MARCA",
      title: "Coherencia gráfica desde la caja hasta la vida diaria",
      desc: "El sistema visual une tipografía editorial serif, ondas japonesas seigaiha, el arco Torii y el kanji 幸 de felicidad en todas las piezas interiores y sus extensiones cotidianas, manteniendo reconocimiento inmediato y sentido de pertenencia.",
      img: "assets/Ficha_Branding_TintaSachi.png",
      caption: "Tablero maestro del sistema de identidad visual y construcción gráfica de Tinta-Sachi.",
      sealed: false
    }
  ],

  editions: [
    {
      id: "shonen",
      category: "MANGA & ANIME",
      title: "Edición Shōnen: Espíritu de Travesía",
      quote: "«No importa cuán agitada corra la ciudad afuera: al abrir estas páginas empieza tu propia tripulación.»",
      synopsis: "Concebida para quienes buscan valentía, energía vital y camaradería tras semanas académicas intensas. Articula un tomo manga curado (referente One Piece) con separador de borla naranja tinta, pin metálico de arco Torii, postal nocturna y acceso QR a la canción oficial.",
      physicalSpec: "Tomo manga edición curada + separador en cartulina 350 g laminada mate con borla naranja (#E56020).",
      img: "assets/Poster_Ilustrado_TintaSachi.jpeg",
      imgCaption: "Ilustración promocional de la experiencia narrativa Tinta-Sachi."
    },
    {
      id: "fantasia",
      category: "FANTASÍA EDITORIAL",
      title: "Edición Nocturna: Cartas bajo la Lluvia",
      quote: "«Las mejores historias se habitan cuando apagas la prisa de la pantalla y enciendes tu propio refugio.»",
      synopsis: "Inspirada en universos de magia clásica y mundos encantados (referente Harry Potter). Integra novela juvenil ilustrada, separador con ondas seigaiha, set de stickers de flor de cerezo y nubes en vinilo mate, postal de colección y acompañamiento sonoro.",
      physicalSpec: "Obra de narrativa fantástica + separador editorial 350 g + cápsula de memoria fechada.",
      img: "assets/Pieza_Instagram_TintaSachi.png",
      imgCaption: "Pieza visual de atmósfera nocturna e inmersión literaria Tinta-Sachi."
    },
    {
      id: "cosmos",
      category: "CIENCIA FICCIÓN",
      title: "Edición Órbita: Estrellas de Papel",
      quote: "«Incluso en la habitación más silenciosa cabe una galaxia entera esperando ser descubierta.»",
      synopsis: "Pensada para lectores curiosos atraídos por el asombro científico y los viajes espaciales (referente Project Hail Mary). Reúne edición literaria seleccionada, pin esmaltado de estrella de cuatro puntas, libreta de notas estelares y tarjeta QR musical.",
      physicalSpec: "Novela de ciencia ficción + separador magnético/borla + postal astronómica numerada.",
      img: "assets/Juliana_Unboxing_Cutout.png",
      imgCaption: "Representación conceptual del momento de apertura en escritorio."
    }
  ],

  collectibles: [
    {
      id: "pin",
      name: "Pin Metálico Esmaltado (幸 / Torii)",
      tag: "Aleación dorada · 3 cm",
      detail: "Pieza coleccionable en relieve metálico con esmalte horneado en tonos índigo (#1F1575) y naranja tinta (#E56020). Funciona como insignia cotidiana en mochilas o chaquetas universitarias, activando orgullo de pertenencia y reconocimiento entre pares.",
      emotionLink: "Asociado principalmente con Deseo (8,50/10) y Orgullo (8,25/10)."
    },
    {
      id: "separador",
      name: "Separador Seigaiha con Borla",
      tag: "Cartulina 350 g + Hilo naranja",
      detail: "Impreso por ambas caras con acabado suave al tacto, ilustraciones originales de nubes orientales y borla textil naranja tinta. Acompaña el ritmo de lectura diaria y conserva viva la experiencia entre capítulos.",
      emotionLink: "Asociado con Satisfacción (8,25/10) y Fascinación (8,13/10)."
    },
    {
      id: "stickers",
      name: "Set de Stickers & Postales de Arte",
      tag: "Vinilo mate + Papel algodón",
      detail: "Cuatro adhesivos troquelados resistentes al agua (kanji 幸, arco Torii, libro abierto y gato lector) junto con dos postales ilustradas para personalizar portátiles, cuadernos o rincones de estudio.",
      emotionLink: "Asociado con Sorpresa agradable (8,75/10) e Inspiración (8,50/10)."
    },
    {
      id: "merch",
      name: "Línea Extendida de Merchandising",
      tag: "Libretas · Tote Bag · Hoodie · Vaso",
      detail: "Catálogo complementario diseñado bajo la misma identidad visual para llevar el universo narrativo fuera de casa: tote bag en lona cruda, buzo índigo bordado, libreta anillada y vaso térmico ilustrado.",
      emotionLink: "Refuerza identidad cultural y recordación post-experiencia."
    }
  ],

  giftPresets: [
    {
      label: "Pausa tras exámenes",
      to: "Juliana",
      msg: "Después de tantos desvelos y entregas, mereces cerrar las pestañas del celular y perderte en un universo hecho a tu ritmo. Las historias también se viven."
    },
    {
      label: "Cumpleaños especial",
      to: "Camila",
      msg: "Quise regalarte algo más duradero que un detalle cualquiera: una historia para leer con calma, una canción y pequeños tesoros que te acompañen siempre."
    },
    {
      label: "Autorregalo de refugio",
      to: "Para mí",
      msg: "Un recordatorio tangible de que mi bienestar y mis mundos favoritos también tienen un espacio sagrado al terminar el día."
    }
  ],

  empathyQuadrants: [
    {
      title: "1. Piensa y siente",
      subtitle: "Miedos íntimos y aspiraciones",
      items: [
        "Agotamiento físico y emocional silencioso por la exigencia universitaria, aunque se obliga a continuar.",
        "Episodios de inseguridad sobre su imagen personal y temor a no rendir lo suficiente.",
        "Sensibilidad nostálgica hacia fechas familiares (Navidad, Año Nuevo) y apego afectivo a su mascota.",
        "Anhelo de graduarse con excelencia, lograr independencia financiera y viajar a Japón o Corea del Sur.",
        "Deseo de habitar momentos de calma genuina lejos de la mala atención y la prisa diaria."
      ]
    },
    {
      title: "2. Ve",
      subtitle: "Entorno cotidiano y referentes",
      items: [
        "Multitudes aceleradas en el transporte público, calles y pasillos del campus en Montería.",
        "Horas continuas de contenido en TikTok, Instagram y WhatsApp sobre moda, reseñas y tendencias.",
        "Sagas de anime y ficción: One Piece, Harry Potter, Project Hail Mary, Avengers y cine de suspenso.",
        "Reseñas literarias en Letterboxd/redes y reflexiones culturales como las de Yokoi Kenji.",
        "Aprecio marcado por paletas cromáticas cuidadas, ilustración japonesa y diseño editorial."
      ]
    },
    {
      title: "3. Escucha",
      subtitle: "Voces e influencias cercanas",
      items: [
        "Opiniones determinantes de amigas cercanas y familiares antes de realizar una compra.",
        "Conversaciones constantes sobre parciales, calificaciones y comparaciones académicas.",
        "Música pop anglo (Taylor Swift, Olivia Rodrigo, Sabrina Carpenter, The Weeknd) y vallenato (Kaleth Morales).",
        "Pódcast introspectivos y emocionales (Farid Dieck, MIKA, Online Mami) buscando perspectiva.",
        "Debates sobre incertidumbre laboral, avance de la inteligencia artificial y costo de vida."
      ]
    },
    {
      title: "4. Dice y hace",
      subtitle: "Conducta pública vs. mundo privado",
      items: [
        "En público proyecta seguridad y extroversión; en privado procesa ansiedad y sobrecarga.",
        "Comparte salidas mensuales sencillas (pizza o mote de queso) con su círculo de amigos.",
        "Realiza compras en línea (Shein, Temu) cuidando un presupuesto estudiantil ajustado.",
        "Personaliza sus atuendos y útiles, intentando sostener hábitos de organización personal.",
        "Expresa su entusiasmo por conocer la cultura asiática y coleccionar objetos con identidad."
      ]
    },
    {
      title: "5. Dolores (Pains)",
      subtitle: "Bloqueos y frustraciones reales",
      items: [
        "Sensación de dar todo su esfuerzo diario y sentir que aún no alcanza todas las metas.",
        "Escasez de tiempo libre reparador combinada con presupuesto limitado ($15.000–$60.000 COP ref.).",
        "Fatiga tras el ocio pasivo en pantallas (scroll interminable) que no produce descanso afectivo.",
        "Incertidumbre frente al desempeño profesional futuro.",
        "Decepción ante productos o regalos genéricos vendidos sin narrativa ni cuidado estético."
      ]
    },
    {
      title: "6. Ganancias (Gains)",
      subtitle: "Lo que anhela sentir y lograr",
      items: [
        "Convertir su habitación nocturna en un refugio íntimo y estético de desconexión real.",
        "Poseer ediciones y coleccionables que expresen su identidad lectora y gusto cultural.",
        "Compartir detalles memorables y con significado genuino con personas especiales.",
        "Alcanzar autonomía económica, bienestar emocional y graduación profesional.",
        "Experimentar ilusión, serenidad y pertenencia sin exceder su capacidad de gasto."
      ]
    }
  ],

  comicPanels: [
    { num: 1, stage: "Antes", title: "Contexto de saturación", emotion: "Agobio ansioso", quote: "«Qué agotador todo… Tráfico, notificaciones, las calificaciones, mi futuro…»" },
    { num: 2, stage: "Antes", title: "El problema silencioso", emotion: "Vacío y desconexión emocional", quote: "«A ver si en redes me animo un poco… pero nada me hace sentir realmente bien.»" },
    { num: 3, stage: "Antes", title: "Intentos fallidos", emotion: "Frustración y hastío afectivo", quote: "«Intenté ver una serie, escuchar música, jugar un rato… pero sigo con la misma sensación.»" },
    { num: 4, stage: "Quiebre", title: "Descubrimiento del sello 幸", emotion: "Sorpresa agradable e ilusión", quote: "«¿Una caja con manga y anime? ¡Sí!»" },
    { num: 5, stage: "Experiencia", title: "Inmersión multisensorial", emotion: "Fascinación y júbilo afectivo", quote: "«¡Por fin algo que conecta conmigo y me hace sentir viva en mi historia!»" },
    { num: 6, stage: "Transformación", title: "Refugio conquistado", emotion: "Serenidad y plenitud reconfortante", quote: "«Con Tinta-Sachi cada historia es un refugio… y disfruto mis pequeños momentos ♡»" }
  ],

  premoEmotions: [
    { id: 1, name: "Deseo", valence: "Positiva", def: "Querer poseer, abrir o usar el producto", scores: [7.5, 9.0, 8.5, 9.0], freq: 4, presPct: 100.0, sum: 34.0, avg: 8.50, posShare: 14.81, totalShare: 14.08 },
    { id: 2, name: "Satisfacción", valence: "Positiva", def: "Sentirse complacido con el detalle curado", scores: [7.0, 8.0, 9.0, 9.0], freq: 4, presPct: 100.0, sum: 33.0, avg: 8.25, posShare: 14.38, totalShare: 13.66 },
    { id: 3, name: "Fascinación", valence: "Positiva", def: "Absorción e inmersión en el universo", scores: [8.0, 8.0, 8.5, 8.0], freq: 4, presPct: 100.0, sum: 32.5, avg: 8.13, posShare: 14.16, totalShare: 13.46 },
    { id: 4, name: "Sorpresa agradable", valence: "Positiva", def: "Hallazgo positivo inesperado al abrir", scores: [7.5, 9.0, 10.0, 8.5], freq: 4, presPct: 100.0, sum: 35.0, avg: 8.75, posShare: 15.25, totalShare: 14.49 },
    { id: 5, name: "Orgullo", valence: "Positiva", def: "Sentirse identificado y especial con la marca", scores: [9.0, 8.0, 8.0, 8.0], freq: 4, presPct: 100.0, sum: 33.0, avg: 8.25, posShare: 14.38, totalShare: 13.66 },
    { id: 6, name: "Inspiración", valence: "Positiva", def: "Estímulo creativo y motivación elevada", scores: [9.0, 8.5, 9.0, 7.5], freq: 4, presPct: 100.0, sum: 34.0, avg: 8.50, posShare: 14.81, totalShare: 14.08 },
    { id: 7, name: "Nostalgia", valence: "Positiva", def: "Afecto cálido y evocación de memoria personal", scores: [7.0, 7.0, 7.0, 7.0], freq: 4, presPct: 100.0, sum: 28.0, avg: 7.00, posShare: 12.20, totalShare: 11.59 },
    { id: 8, name: "Asco", valence: "Negativa", def: "Rechazo estético o sensorial", scores: [0.0, 0.0, 0.0, 0.0], freq: 0, presPct: 0.0, sum: 0.0, avg: 0.00, posShare: 0.0, totalShare: 0.00 },
    { id: 9, name: "Aburrimiento", valence: "Negativa", def: "Desconexión o falta de dinamismo puntual", scores: [0.0, 1.0, 0.0, 2.0], freq: 2, presPct: 50.0, sum: 3.0, avg: 0.75, posShare: 0.0, totalShare: 1.24 },
    { id: 10, name: "Tristeza", valence: "Negativa", def: "Sensibilidad melancólica leve", scores: [1.0, 0.0, 0.0, 0.0], freq: 1, presPct: 25.0, sum: 1.0, avg: 0.25, posShare: 0.0, totalShare: 0.41 },
    { id: 11, name: "Frustración", valence: "Negativa", def: "Bloqueo o dificultad de interacción", scores: [0.0, 0.0, 0.0, 0.0], freq: 0, presPct: 0.0, sum: 0.0, avg: 0.00, posShare: 0.0, totalShare: 0.00 },
    { id: 12, name: "Miedo", valence: "Negativa", def: "Cautela percibida ante precio o fragilidad", scores: [2.0, 3.0, 2.0, 1.0], freq: 4, presPct: 100.0, sum: 8.0, avg: 2.00, posShare: 0.0, totalShare: 3.31 },
    { id: 13, name: "Vergüenza", valence: "Negativa", def: "Incomodidad social al exhibir la marca", scores: [0.0, 0.0, 0.0, 0.0], freq: 0, presPct: 0.0, sum: 0.0, avg: 0.00, posShare: 0.0, totalShare: 0.00 },
    { id: 14, name: "Indignación", valence: "Negativa", def: "Sensación de injusticia en relación valor-precio", scores: [0.0, 0.0, 0.0, 0.0], freq: 0, presPct: 0.0, sum: 0.0, avg: 0.00, posShare: 0.0, totalShare: 0.00 }
  ],

  evaluatorsSummary: [
    { id: 1, name: "Evaluador 1", posAvg: 7.86, negAvg: 0.43, net: 7.43, peak: "Orgullo (9,0) · Inspiración (9,0)", note: "Destaca la conexión simbólica e identitaria con la marca; registra sensibilidad emotiva leve en Tristeza (1,0) y Miedo moderado (2,0)." },
    { id: 2, name: "Evaluador 2", posAvg: 8.21, negAvg: 0.57, net: 7.64, peak: "Deseo (9,0) · Sorpresa agradable (9,0)", note: "Fuerte atracción visceral inicial e intención de posesión; presenta el valor más visible en Miedo (3,0, vinculado a expectativa presupuestal)." },
    { id: 3, name: "Evaluador 3", posAvg: 8.57, negAvg: 0.29, net: 8.28, peak: "Sorpresa agradable (10,0) · Satisfacción (9,0)", note: "Recepción global más alta y menor fricción negativa; entusiasmo sobresaliente ante el ritual de revelación y la canción original." },
    { id: 4, name: "Evaluador 4", posAvg: 8.14, negAvg: 0.43, net: 7.71, peak: "Deseo (9,0) · Satisfacción (9,0)", note: "Elevada complacencia con el conjunto curado y mínimo temor (Miedo 1,0), señalando oportunidad menor de ritmo en Aburrimiento (2,0)." }
  ],

  attributeEmotionMap: [
    { component: "Presentación exterior de la caja (FEFCO 0427)", specs: "26 × 20 × 9 cm · Laminado mate índigo #1F1575", emotions: "Deseo (8,50) · Orgullo (8,25)", rationale: "El contraste sobrio entre el fondo nocturno y el sello naranja proyecta carácter editorial auténtico frente a empaques improvisados." },
    { component: "Expectativa y ritual de apertura", specs: "Sello 幸 + Papel seda ilustrado (20 g/m²)", emotions: "Sorpresa agradable (8,75) · Fascinación (8,13)", rationale: "Ocultar parcialmente las piezas tras una capa táctil ceremonial amplifica el asombro positivo en el momento de descubrir el interior." },
    { component: "Dimensión LEE (Experiencia literaria)", specs: "Libro o tomo manga + Separador 350 g con borla", emotions: "Inspiración (8,50) · Fascinación (8,13)", rationale: "Actúa como núcleo narrativo que desconecta al lector del flujo ansioso de notificaciones y restituye la concentración placentera." },
    { component: "Dimensión ESCUCHA (Integración musical)", specs: "Tarjeta QR · «En mi cajita cabe otro lugar»", emotions: "Sorpresa agradable (8,75) · Inspiración (8,50) · Nostalgia (7,00)", rationale: "Añade una atmósfera auditiva inesperada en un producto impreso, envolviendo la lectura en una melodía creada para el universo de marca." },
    { component: "Dimensión COLECCIONA (Objetos tangibles)", specs: "Pin esmaltado 幸/Torii, stickers vinilo y postales", emotions: "Deseo (8,50) · Satisfacción (8,25) · Orgullo (8,25)", rationale: "Materializa el relato en insignias físicas durables que el estudiante puede conservar en su escritorio o llevar al campus." },
    { component: "Dimensión REGALA (Vínculo interpersonal)", specs: "Tarjeta dedicatoria personalizable con sello 幸", emotions: "Orgullo (8,25) · Satisfacción (8,25) · Nostalgia (7,00)", rationale: "Convierte la caja en un gesto afectivo listo para obsequiar sin envoltorios adicionales, fortaleciendo lazos de pertenencia." },
    { component: "Integración multisensorial y precio percibido", specs: "Sinergia vista + tacto + oído vs. presupuesto", emotions: "Satisfacción (8,25) · Miedo leve (2,00)", rationale: "La riqueza de estímulos consolida el agrado global sin generar Frustración (0,00), aunque su apariencia premium despierta cautela leve respecto al precio." },
    { component: "Identidad visual y gráfica oriental-editorial", specs: "Índigo #1F1575 · Naranja #E56020 · Ondas seigaiha", emotions: "Orgullo (8,25) · Fascinación (8,13) · Asco nulo (0,00)", rationale: "La armonía cromática y tipográfica evita saturación visual y valida la sensibilidad estética del público universitario." }
  ],

  references: [
    "Brakus, J. J., Schmitt, B. H., & Zarantonello, L. (2009). Brand experience: What is it? How is it measured? Does it affect loyalty? Journal of Marketing, 73(3), 52–68. https://doi.org/10.1509/jmkg.73.3.052",
    "Büker, T., Schmitt, T., Miehling, J., & Wartzack, S. (2023). Exploring the importance of a usable and emotional product design from the user's perspective. Ergonomics, 66(5), 580–591. https://doi.org/10.1080/00140139.2022.2101694",
    "Demir, E., Desmet, P. M. A., & Hekkert, P. (2009). Appraisal patterns of emotions in human-product interaction. International Journal of Design, 3(2), 41–51.",
    "Desmet, P. M. A. (2003a). A multilayered model of product emotions. The Design Journal, 6(2), 4–13. https://doi.org/10.2752/146069203789355480",
    "Desmet, P. M. A. (2003b). Measuring emotions: The development and application of an instrument to measure emotional responses to products. En Funology: From usability to enjoyment (pp. 111–123). Kluwer Academic Publishers.",
    "Desmet, P. M. A. (2012). Faces of product pleasure: 25 positive emotions in human-product interactions. International Journal of Design, 6(2), 1–29.",
    "Desmet, P. (2018). Measuring emotion: Development and application of an instrument to measure emotional responses to products. En Funology 2: From usability to enjoyment (pp. 391–404). Springer. https://doi.org/10.1007/978-3-319-68213-6_25",
    "Desmet, P. M. A., & Hekkert, P. (2007). Framework of product experience. International Journal of Design, 1(1), 57–66.",
    "Desmet, P. M. A., Hekkert, P., & Jacobs, J. J. (2000). When a car makes you smile: Development and application of an instrument to measure product emotions. Advances in Consumer Research, 27, 111–117.",
    "Fokkinga, S., & Desmet, P. (2012). Darker shades of joy: The role of negative emotion in rich product experiences. Design Issues, 28(4), 42–56. https://doi.org/10.1162/DESI_a_00174",
    "Gobé, M. (2001). Emotional branding: The new paradigm for connecting brands to people. Allworth Press.",
    "Hassenzahl, M. (2010). Experience design: Technology for all the right reasons. Morgan & Claypool Publishers. https://doi.org/10.2200/S00261ED1V01Y201003HCI008",
    "Hassenzahl, M., & Tractinsky, N. (2006). User experience — A research agenda. Behaviour & Information Technology, 25(2), 91–97. https://doi.org/10.1080/01449290500330331",
    "Jordan, P. W. (2000). Designing pleasurable products: An introduction to the new human factors. Taylor & Francis.",
    "Juárez-Varón, D., Mengual-Recuerda, A., Capatina, A., & Núñez Cansado, M. (2023). Footwear consumer behavior: The influence of stimuli on emotions and decision making. Journal of Business Research, 164, 114016. https://doi.org/10.1016/j.jbusres.2023.114016",
    "Khuong, M. N., & Tram, V. N. B. (2015). The effects of emotional marketing on consumer product perception, brand awareness and purchase decision. Journal of Economics, Business and Management, 3(5), 524–530. https://doi.org/10.7763/JOEBM.2015.V3.240",
    "Kim, Y.-K., & Sullivan, P. F. (2019). Emotional branding speaks to consumers' heart: The case of fashion brands. Fashion and Textiles, 6, Article 2. https://doi.org/10.1186/s40691-018-0164-y",
    "Laurans, G., & Desmet, P. M. A. (2017). Developing 14 animated characters for non-verbal self-report of categorical emotions. Journal of Design Research, 15(3–4), 214–233. https://doi.org/10.1504/JDR.2017.089903",
    "Morrison, S., & Crane, F. G. (2007). Building the service brand by creating and managing an emotional brand experience. Journal of Brand Management, 14(5), 410–421. https://doi.org/10.1057/palgrave.bm.2550080",
    "Norman, D. A. (2004). Emotional design: Why we love (or hate) everyday things. Basic Books.",
    "Santos, M. (2024). Role of emotional branding in consumer decision making in Brazil. International Journal of Marketing Strategies, 6(3), 1–10. https://doi.org/10.47672/ijms.2135",
    "Silvennoinen, J., Kujala, T., & Haapakoski, M. (2026). Differentiating visual usability from aesthetics in visual experience. International Journal of Human–Computer Interaction, 1–21. https://doi.org/10.1080/10447318.2026.2639826",
    "Thomson, M., MacInnis, D. J., & Park, C. W. (2005). The ties that bind: Measuring the strength of consumers' emotional attachments to brands. Journal of Consumer Psychology, 15(1), 77–91. https://doi.org/10.1207/s15327663jcp1501_10",
    "Tractinsky, N., Katz, A. S., & Ikar, D. (2000). What is beautiful is usable. Interacting with Computers, 13(2), 127–145. https://doi.org/10.1016/S0953-5438(00)00031-X",
    "van Remmen, J. S., Horber, D., Händel, J., Miehling, J., & Wartzack, S. (2024). The balance between a usable and emotional product design. Proceedings of the Design Society, 4, 2463–2472. https://doi.org/10.1017/pds.2024.249",
    "Xiao, S., Yu, L. Y., Meng, Y., Raisamo, R., & Ziat, M. (2025). Effects of multisensory packaging on taste perception, emotional responses, and willingness to pay for chocolate. Scientific Reports, 15, Article 39085. https://doi.org/10.1038/s41598-025-24077-6"
  ]
};
