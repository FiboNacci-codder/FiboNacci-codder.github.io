/*
 * Todo el contenido editable de la página.
 * - `links`: datos compartidos entre idiomas.
 * - `i18n.<lang>`: textos por idioma. Las listas vacías y los strings vacíos
 *   se muestran en la página como marcadores "TODO" hasta completarlos.
 */
window.CONTENT = {
  defaultLang: "en",
  languages: { es: "ES", en: "EN", pt: "PT" },
  languageNames: { es: "Español", en: "English", pt: "Português" },
  locales: { es: "es_PE", en: "en_US", pt: "pt_BR" },

  links: {
    email: "atauchimamani@gmail.com",
    github: "https://github.com/FiboNacci-codder",
    linkedin: "https://www.linkedin.com/in/jose-emilio-atauchi-mamani-128485297/",
    lattes: "http://lattes.cnpq.br/8640962660930319",
    lattesPdf: "lattes.pdf",
    cv: "/cv.pdf",
    icpc: "https://icpc.global/ICPCID/XAZWO9YBKGTM",
    codeforces: "https://codeforces.com/profile/FiboEm"
  },

  i18n: {
    en: {
      meta: {
        title: "Jose Emilio Atauchi Mamani",
        description: "Jose Emilio Atauchi Mamani — computer engineer from UNSAAC (Cusco, Peru) working on retrieval-augmented generation and the evaluation of LLM-based systems."
      },
      ui: {
        skip: "Skip to content",
        navLabel: "Sections",
        language: "Language",
        todo: "TODO",
        backToTop: "Back to top"
      },
      nav: {
        about: "About",
        interests: "Research",
        projects: "Projects",
        timeline: "Background",
        contact: "Contact"
      },
      hero: {
        name: "Jose Emilio Atauchi Mamani",
        tagline: "I work on getting language models to answer from real documents, and on measuring whether they do.",
        meta: "Cusco, Peru · Informatics and Systems Engineering, UNSAAC (2025)",
        ctaCv: "Download CV",
        ctaContact: "Contact"
      },
      about: {
        title: "About",
        paragraphs: [
          "I graduated in Informatics and Systems Engineering from the Universidad Nacional de San Antonio Abad del Cusco (UNSAAC) in 2025. Most of my grounding in algorithms comes from competitive programming: I competed in ICPC from 2022 to 2024, reaching the Latin American Regional Contest in 2023 and 2024, and earlier was a national finalist in the Peruvian Mathematics Olympiad (ONEM) for Cusco.",
          "Since February 2026 I have been a professional ICT intern at Electro Sur Este S.A.A., an electricity distributor in Cusco, where I designed and evaluated a retrieval-augmented generation (RAG) system that answers natural-language questions over 72 internal documents and runs entirely on open-weight models. The work, linked to my thesis, covers structured OCR, chunking strategies, hybrid dense and BM25 retrieval with reranking, and the evaluation of retrieval quality and hallucination across generator models. I want to study these questions formally: how document processing shapes retrieval quality, and how to evaluate LLM systems in a way that can be trusted."
        ]
      },
      // items: { title, question, connection } — un string vacío se muestra como TODO
      interests: {
        title: "Research interests",
        labels: { connection: "In my work" },
        items: [
          {
            title: "Document processing for RAG",
            question: "How do OCR, layout extraction and chunking choices for documents with tables, scanned pages and complex layouts change what a retriever can find?",
            connection: "In the company's RAG system I used structured OCR (TeleOCR) with cleaning by block type and compared nine chunking strategies; hierarchical-section chunking reached the best Recall@10 (0.959)."
          },
          {
            title: "Hybrid retrieval",
            question: "When does combining dense embeddings with BM25 retrieve better than either alone, and how much does a reranker add on top?",
            connection: "The system fuses dense (harrier-oss-v1-0.6b) and BM25 results with RRF and reranks them with a cross-encoder; retrieval is measured with Acc@k, Recall@10, MRR and nDCG on 170 manually verified questions."
          },
          {
            title: "Evaluating LLM systems",
            question: "How far can a single LLM judge be trusted to measure hallucination in RAG answers, including questions the documents cannot answer?",
            connection: "I compared ten generator LLMs using one LLM judge (gpt-oss-120b) for hallucination; Gemma 4 26B-A4B gave the best balance, hallucinating in 15.3% of answers and correctly rejecting 97.6% of unanswerable questions."
          }
        ]
      },
      // items destacados: { featured: true, title, period, restricted, problem, architecture: [], decisions: [], results: [], stack: [], status, thesis }
      // items normales:   { title, period, problem, approach, stack: [], result?, link }
      //   result: se omite si no hay dato; "" → TODO
      //   link: "" → TODO, null → "sin repositorio público"
      // others: { title, period, link? }
      projects: {
        title: "Projects",
        labels: {
          problem: "Problem",
          approach: "Approach",
          stack: "Stack",
          results: "Results",
          result: "Result",
          link: "Code",
          architecture: "Architecture",
          decisions: "Technical decisions",
          status: "Current status",
          thesis: "Relation to my thesis",
          restricted: "Not public",
          noRepo: "No public repository",
          othersTitle: "Other projects"
        },
        items: [
          {
            featured: true,
            title: "RAG system for internal documents — Electro Sur Este",
            period: "Feb 2026 – present",
            restricted: "The source code and the company's documents are internal and not public; this section describes the design and the evaluation results.",
            problem: "Looking things up in a company's internal documents takes time, and asking experienced staff does not scale when the same questions come back. The system answers natural-language questions over 72 internal documents of a Peruvian electricity distributor.",
            architecture: [
              "Ingestion: structured OCR with TeleOCR, cleaning by block type, hierarchical-section chunking.",
              "Indexing: dense (harrier-oss-v1-0.6b) and sparse BM25 vectors in Qdrant.",
              "Query: spelling correction and rewriting with Qwen3.5-4B.",
              "Retrieval: hybrid dense + BM25 search fused with RRF, then cross-encoder reranking (Qwen3-Reranker-8B).",
              "Generation: Gemma 4 26B-A4B, selected among ten open-weight generator models."
            ],
            decisions: [
              "Open-weight models only, so the documents never leave the company's servers.",
              "Nine chunking strategies compared before settling on hierarchical sections.",
              "Ten generator LLMs compared on hallucination, rejection of unanswerable questions and latency.",
              "Golden set of 170 manually verified questions; retrieval measured with Acc@k, Recall@10, MRR and nDCG.",
              "Hallucination scored by a single LLM judge (gpt-oss-120b)."
            ],
            results: [
              "Hierarchical-section chunking: best Recall@10 of the nine strategies (0.959).",
              "Gemma 4 26B-A4B: hallucination in 15.3% of answers, 97.6% correct rejection of unanswerable questions, 0.82 s per answer."
            ],
            stack: ["Python", "TeleOCR", "Qdrant", "vLLM", "Apptainer", "Qwen3.5", "Gemma 4", "gpt-oss-120b"],
            status: "Working on tool calling for the LLM.",
            thesis: "My undergraduate thesis work is linked to this system."
          },
          {
            title: "AstroBioHub — NASA Space Apps Challenge 2025",
            period: "2025",
            problem: "Make a corpus of 607 NASA space biology publications searchable and explorable.",
            approach: "Collected article metadata and full text from PubMed Central (NCBI Entrez and HTML parsing), extracted biomedical entities with BioBERT/SciBERT, and built semantic search with sentence embeddings and a knowledge graph. My role in the team was DevOps: deployment and infrastructure.",
            stack: ["Python", "Biopython", "BeautifulSoup", "pandas", "Transformers", "sentence-transformers"],
            result: "Second place at the Cusco venue; Global Nominee.",
            link: "https://github.com/FiboNacci-codder/Research-in-NLP"
          },
          {
            title: "Knapsack problem in CUDA",
            period: "2022 – 2023",
            problem: "The knapsack problem is NP-complete, and sequential solutions slow down quickly as instances grow.",
            approach: "Reimplemented a knapsack solution as a parallel algorithm on the GPU with CUDA and compared it with the sequential version; the parallel version improved performance.",
            stack: ["CUDA"],
            link: null
          },
          {
            title: "RSA and quantum decryption",
            period: "2024",
            problem: "RSA relies on the hardness of factoring, which quantum algorithms undermine. How does that attack work in practice?",
            approach: "Implemented RSA with small toy keys (8-bit primes) and used quantum phase estimation, simulated in Cirq, for decryption.",
            stack: ["Python", "Cirq", "NumPy"],
            link: "https://github.com/FiboNacci-codder/RSA_QC"
          },
          {
            title: "Sorting in x86 assembly vs. C",
            period: "2024",
            problem: "How much does a hand-written assembly implementation change execution time compared with a high-level one?",
            approach: "Implemented QuickSort in x86 assembly and in C, with benchmark scripts over input sizes from 1 to 10⁸ elements in ascending, descending and random order. Course project, with Jaime Antonio Rodriguez Phillco.",
            stack: ["x86 assembly", "C", "GCC", "Bash"],
            link: "https://github.com/FiboNacci-codder/TrabajoLE"
          }
        ],
        others: [
          { title: "Facial recognition model for anxiety indicators (research)", period: "2024" },
          { title: "Automated attendance with face recognition (FaceNet, OpenCV)", period: "2024", link: "https://github.com/FiboNacci-codder/AsistenciaAutomatica" },
          { title: "Gaussian elimination in assembly with AVX vs. a high-level language", period: "2024" },
          { title: "Impact of the Chancay megaport on tourism in Cusco (LSTM, ARIMA on MINCETUR data)", period: "2024 – present" },
          { title: "Machine learning classification of native potato varieties from Cusco", period: "2023 – 2024" }
        ]
      },
      // items: { period, type: work|education|competition|hackathon, title, org, detail }
      timeline: {
        title: "Education & experience",
        types: {
          work: "Work",
          education: "Education",
          competition: "Competitions",
          hackathon: "Hackathon"
        },
        items: [
          {
            period: "2026 – present",
            type: "work",
            title: "Professional ICT intern",
            org: "Electro Sur Este S.A.A., Cusco",
            detail: "RAG system over 72 internal documents, built on open-weight models."
          },
          {
            period: "2026",
            type: "competition",
            title: "Datathon SUNASS 2026 — Southern Macro-region",
            org: "",
            detail: "Data analysis for SEDACUSCO. Also: Cuscontest XXV."
          },
          {
            period: "2025",
            type: "hackathon",
            title: "NASA Space Apps Challenge",
            org: "",
            detail: "Second place at the Cusco venue and Global Nominee, with AstroBioHub."
          },
          {
            period: "2025",
            type: "competition",
            title: "IEEEXtreme 19.0 · Ibero-American University Mathematics Olympiad (OIMU)",
            org: "",
            detail: ""
          },
          {
            period: "2024 – 2025",
            type: "work",
            title: "IT intern",
            org: "Red de Comunicaciones, UNSAAC",
            detail: "Web development, network administration and IT management support."
          },
          {
            period: "2024",
            type: "competition",
            title: "ICPC Latin American Regional Contest — 42nd in the region",
            org: "",
            detail: "Also: IEEEXtreme 18.0, Training Camp Argentina (Rosario), Cuscontest XXI."
          },
          {
            period: "2023",
            type: "competition",
            title: "ICPC Latin American Regional Contest — 62nd in the region",
            org: "",
            detail: "Also: Cuscontest XIX and XX."
          },
          {
            period: "2022",
            type: "competition",
            title: "ICPC South America/South Finals",
            org: "",
            detail: ""
          },
          {
            period: "2020 – 2025",
            type: "education",
            title: "B.Eng. in Informatics and Systems Engineering",
            org: "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)",
            detail: "Advisor: Robert Wilbert Alzamora Paredes."
          },
          {
            period: "2019",
            type: "competition",
            title: "Peruvian National Mathematics Olympiad (ONEM)",
            org: "",
            detail: "National finalist (fourth round), representing Cusco."
          }
        ]
      },
      contact: {
        title: "Contact",
        intro: "Email is the best way to reach me.",
        labels: {
          email: "Email",
          cv: "CV (PDF)",
          github: "GitHub",
          linkedin: "LinkedIn",
          lattes: "Lattes",
          icpc: "ICPC",
          codeforces: "Codeforces",
          lattesPdf: "Lattes (PDF)"
        }
      }
    },

    es: {
      meta: {
        title: "Jose Emilio Atauchi Mamani",
        description: "Jose Emilio Atauchi Mamani — ingeniero informático de la UNSAAC (Cusco, Perú) que trabaja en generación aumentada por recuperación y en la evaluación de sistemas basados en LLMs."
      },
      ui: {
        skip: "Saltar al contenido",
        navLabel: "Secciones",
        language: "Idioma",
        todo: "TODO",
        backToTop: "Volver arriba"
      },
      nav: {
        about: "Sobre mí",
        interests: "Investigación",
        projects: "Proyectos",
        timeline: "Trayectoria",
        contact: "Contacto"
      },
      hero: {
        name: "Jose Emilio Atauchi Mamani",
        tagline: "Trabajo en que los modelos de lenguaje respondan a partir de documentos reales, y en medir si realmente lo hacen.",
        meta: "Cusco, Perú · Ingeniería Informática y de Sistemas, UNSAAC (2025)",
        ctaCv: "Descargar CV",
        ctaContact: "Contacto"
      },
      about: {
        title: "Sobre mí",
        paragraphs: [
          "Me gradué en Ingeniería Informática y de Sistemas en la Universidad Nacional de San Antonio Abad del Cusco (UNSAAC) en 2025. Buena parte de mi base en algoritmos viene de la programación competitiva: participé en ICPC entre 2022 y 2024, llegando al Regional Latinoamericano en 2023 y 2024, y antes fui finalista nacional de la Olimpiada Nacional de Matemáticas (ONEM) por Cusco.",
          "Desde febrero de 2026 soy practicante profesional de TIC en Electro Sur Este S.A.A., distribuidora eléctrica del Cusco, donde diseñé y evalué un sistema de generación aumentada por recuperación (RAG) que responde preguntas en lenguaje natural sobre 72 documentos internos y funciona íntegramente con modelos abiertos. El trabajo, vinculado a mi tesis, abarca OCR estructurado, estrategias de chunking, recuperación híbrida densa y BM25 con reranking, y la evaluación de la recuperación y de la alucinación de distintos modelos generadores. Quiero estudiar estas preguntas de forma rigurosa: cómo el procesamiento de documentos condiciona la calidad de la recuperación y cómo evaluar sistemas con LLMs de forma confiable."
        ]
      },
      interests: {
        title: "Intereses de investigación",
        labels: { connection: "En mi trabajo" },
        items: [
          {
            title: "Procesamiento de documentos para RAG",
            question: "¿Cómo cambian el OCR, la extracción de estructura y el chunking de documentos con tablas, páginas escaneadas y diseños complejos lo que un recuperador puede encontrar?",
            connection: "En el RAG de la empresa usé OCR estructurado (TeleOCR) con limpieza por tipo de bloque y comparé nueve estrategias de chunking; la segmentación por sección jerárquica obtuvo el mejor Recall@10 (0,959)."
          },
          {
            title: "Recuperación híbrida",
            question: "¿Cuándo combinar embeddings densos con BM25 recupera mejor que cada uno por separado, y cuánto aporta un reranker encima?",
            connection: "El sistema fusiona resultados densos (harrier-oss-v1-0.6b) y BM25 con RRF y los reordena con un cross-encoder; la recuperación se mide con Acc@k, Recall@10, MRR y nDCG sobre 170 preguntas verificadas manualmente."
          },
          {
            title: "Evaluación de sistemas con LLMs",
            question: "¿Hasta qué punto se puede confiar en un único LLM como juez para medir la alucinación en respuestas de RAG, incluidas las preguntas que los documentos no pueden responder?",
            connection: "Comparé diez LLMs generadores con un único juez (gpt-oss-120b) para la alucinación; Gemma 4 26B-A4B ofreció el mejor equilibrio: alucinó en el 15,3 % de las respuestas y rechazó correctamente el 97,6 % de las preguntas sin respuesta."
          }
        ]
      },
      projects: {
        title: "Proyectos",
        labels: {
          problem: "Problema",
          approach: "Enfoque",
          stack: "Stack",
          results: "Resultados",
          result: "Resultado",
          link: "Código",
          architecture: "Arquitectura",
          decisions: "Decisiones técnicas",
          status: "Estado actual",
          thesis: "Relación con mi tesis",
          restricted: "No público",
          noRepo: "Sin repositorio público",
          othersTitle: "Otros proyectos"
        },
        items: [
          {
            featured: true,
            title: "Sistema RAG para documentos internos — Electro Sur Este",
            period: "feb. 2026 – actualidad",
            restricted: "El código y los documentos de la empresa son internos y no son públicos; esta sección describe el diseño y los resultados de la evaluación.",
            problem: "Consultar los documentos internos de una empresa consume tiempo, y recurrir a personas con experiencia no escala cuando las mismas preguntas se repiten. El sistema responde preguntas en lenguaje natural sobre 72 documentos internos de una distribuidora eléctrica peruana.",
            architecture: [
              "Ingesta: OCR estructurado con TeleOCR, limpieza por tipo de bloque y segmentación por sección jerárquica.",
              "Indexación: vectores densos (harrier-oss-v1-0.6b) y dispersos BM25 en Qdrant.",
              "Consulta: corrección ortográfica y reformulación con Qwen3.5-4B.",
              "Recuperación: búsqueda híbrida densa + BM25 fusionada con RRF y reordenamiento con cross-encoder (Qwen3-Reranker-8B).",
              "Generación: Gemma 4 26B-A4B, elegido entre diez modelos generadores abiertos."
            ],
            decisions: [
              "Solo modelos abiertos, para que los documentos no salgan de los servidores de la empresa.",
              "Nueve estrategias de chunking comparadas antes de quedarse con la sección jerárquica.",
              "Diez LLMs generadores comparados por alucinación, rechazo de preguntas sin respuesta y latencia.",
              "Golden set de 170 preguntas verificadas manualmente; recuperación medida con Acc@k, Recall@10, MRR y nDCG.",
              "Alucinación calificada por un único LLM juez (gpt-oss-120b)."
            ],
            results: [
              "Segmentación por sección jerárquica: mejor Recall@10 de las nueve estrategias (0,959).",
              "Gemma 4 26B-A4B: alucinación en el 15,3 % de las respuestas, 97,6 % de rechazo correcto de preguntas sin respuesta y 0,82 s por respuesta."
            ],
            stack: ["Python", "TeleOCR", "Qdrant", "vLLM", "Apptainer", "Qwen3.5", "Gemma 4", "gpt-oss-120b"],
            status: "Trabajando en tool calling para el LLM.",
            thesis: "Mi trabajo de tesis de pregrado está vinculado a este sistema."
          },
          {
            title: "AstroBioHub — NASA Space Apps Challenge 2025",
            period: "2025",
            problem: "Hacer que un corpus de 607 publicaciones de biología espacial de la NASA se pueda buscar y explorar.",
            approach: "Recolección de metadatos y texto completo desde PubMed Central (NCBI Entrez y parsing de HTML), extracción de entidades biomédicas con BioBERT/SciBERT, y búsqueda semántica con sentence embeddings y un grafo de conocimiento. Mi rol en el equipo fue DevOps: despliegue e infraestructura.",
            stack: ["Python", "Biopython", "BeautifulSoup", "pandas", "Transformers", "sentence-transformers"],
            result: "Segundo puesto en la sede Cusco; Global Nominee.",
            link: "https://github.com/FiboNacci-codder/Research-in-NLP"
          },
          {
            title: "Problema de la mochila en CUDA",
            period: "2022 – 2023",
            problem: "El problema de la mochila es NP-completo y las soluciones secuenciales se vuelven lentas al crecer las instancias.",
            approach: "Reimplementación de una solución como algoritmo paralelo en GPU con CUDA y comparación con la versión secuencial; la versión paralela mejoró el rendimiento.",
            stack: ["CUDA"],
            link: null
          },
          {
            title: "RSA y descifrado cuántico",
            period: "2024",
            problem: "RSA depende de la dificultad de factorizar, algo que los algoritmos cuánticos socavan. ¿Cómo funciona ese ataque en la práctica?",
            approach: "Implementación de RSA con claves de juguete (primos de 8 bits) y uso de estimación de fase cuántica, simulada en Cirq, para el descifrado.",
            stack: ["Python", "Cirq", "NumPy"],
            link: "https://github.com/FiboNacci-codder/RSA_QC"
          },
          {
            title: "Ordenamiento en ensamblador x86 vs. C",
            period: "2024",
            problem: "¿Cuánto cambia el tiempo de ejecución una implementación escrita a mano en ensamblador frente a una de alto nivel?",
            approach: "QuickSort implementado en ensamblador x86 y en C, con scripts de benchmark para tamaños de 1 a 10⁸ elementos en orden ascendente, descendente y aleatorio. Proyecto de curso, junto con Jaime Antonio Rodriguez Phillco.",
            stack: ["Ensamblador x86", "C", "GCC", "Bash"],
            link: "https://github.com/FiboNacci-codder/TrabajoLE"
          }
        ],
        others: [
          { title: "Modelo de reconocimiento facial para indicadores de ansiedad (investigación)", period: "2024" },
          { title: "Asistencia automática con reconocimiento facial (FaceNet, OpenCV)", period: "2024", link: "https://github.com/FiboNacci-codder/AsistenciaAutomatica" },
          { title: "Eliminación gaussiana en ensamblador con AVX vs. lenguaje de alto nivel", period: "2024" },
          { title: "Impacto del megapuerto de Chancay en el turismo del Cusco (LSTM, ARIMA con datos de MINCETUR)", period: "2024 – actualidad" },
          { title: "Clasificación de variedades de papa nativa del Cusco con machine learning", period: "2023 – 2024" }
        ]
      },
      timeline: {
        title: "Formación y experiencia",
        types: {
          work: "Trabajo",
          education: "Formación",
          competition: "Concursos",
          hackathon: "Hackathon"
        },
        items: [
          {
            period: "2026 – actualidad",
            type: "work",
            title: "Practicante profesional de TIC",
            org: "Electro Sur Este S.A.A., Cusco",
            detail: "Sistema RAG sobre 72 documentos internos, con modelos abiertos."
          },
          {
            period: "2026",
            type: "competition",
            title: "Datathon SUNASS 2026 — Macrorregión Sur",
            org: "",
            detail: "Análisis de datos de SEDACUSCO. También: Cuscontest XXV."
          },
          {
            period: "2025",
            type: "hackathon",
            title: "NASA Space Apps Challenge",
            org: "",
            detail: "Segundo puesto en la sede Cusco y Global Nominee, con AstroBioHub."
          },
          {
            period: "2025",
            type: "competition",
            title: "IEEEXtreme 19.0 · Olimpiada Iberoamericana de Matemática Universitaria (OIMU)",
            org: "",
            detail: ""
          },
          {
            period: "2024 – 2025",
            type: "work",
            title: "Practicante de informática",
            org: "Red de Comunicaciones, UNSAAC",
            detail: "Desarrollo web, administración de redes y apoyo en la gestión de TI."
          },
          {
            period: "2024",
            type: "competition",
            title: "Regional Latinoamericano ICPC — puesto 42 de la región",
            org: "",
            detail: "También: IEEEXtreme 18.0, Training Camp Argentina (Rosario), Cuscontest XXI."
          },
          {
            period: "2023",
            type: "competition",
            title: "Regional Latinoamericano ICPC — puesto 62 de la región",
            org: "",
            detail: "También: Cuscontest XIX y XX."
          },
          {
            period: "2022",
            type: "competition",
            title: "ICPC South America/South Finals",
            org: "",
            detail: ""
          },
          {
            period: "2020 – 2025",
            type: "education",
            title: "Ingeniería Informática y de Sistemas",
            org: "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)",
            detail: "Asesor: Robert Wilbert Alzamora Paredes."
          },
          {
            period: "2019",
            type: "competition",
            title: "Olimpiada Nacional Escolar de Matemática (ONEM)",
            org: "",
            detail: "Finalista nacional (cuarta fase), representando a Cusco."
          }
        ]
      },
      contact: {
        title: "Contacto",
        intro: "La mejor forma de contactarme es por correo.",
        labels: {
          email: "Correo",
          cv: "CV (PDF)",
          github: "GitHub",
          linkedin: "LinkedIn",
          lattes: "Lattes",
          icpc: "ICPC",
          codeforces: "Codeforces",
          lattesPdf: "Lattes (PDF)"
        }
      }
    },

    // Português do Brasil, registro acadêmico.
    // Comentários "REVISAR" marcam frases com nuance que o autor deve confirmar.
    pt: {
      meta: {
        title: "Jose Emilio Atauchi Mamani",
        description: "Jose Emilio Atauchi Mamani — graduado em Engenharia Informática e de Sistemas pela UNSAAC (Cusco, Peru), atua com geração aumentada por recuperação e avaliação de sistemas baseados em LLMs."
      },
      ui: {
        skip: "Ir para o conteúdo",
        navLabel: "Seções",
        language: "Idioma",
        todo: "TODO",
        backToTop: "Voltar ao topo"
      },
      nav: {
        about: "Sobre",
        interests: "Pesquisa",
        projects: "Projetos",
        timeline: "Trajetória",
        contact: "Contato"
      },
      hero: {
        name: "Jose Emilio Atauchi Mamani",
        // REVISAR: "trabalho para que..." soa como objetivo, não como pesquisa já em curso.
        // Alternativa mais acadêmica: "Investigo como fazer modelos de linguagem responderem com base em documentos reais e como medir se de fato o fazem."
        tagline: "Trabalho para que modelos de linguagem respondam com base em documentos reais e para medir se de fato o fazem.",
        // REVISAR: nome do curso traduzido; no Lattes consta "Engenharia Informática".
        meta: "Cusco, Peru · Engenharia Informática e de Sistemas, UNSAAC (2025)",
        ctaCv: "Baixar CV",
        ctaContact: "Contato"
      },
      about: {
        title: "Sobre mim",
        paragraphs: [
          "Sou graduado em Engenharia Informática e de Sistemas pela Universidad Nacional de San Antonio Abad del Cusco (UNSAAC), com conclusão em 2025. Boa parte da minha base em algoritmos vem da programação competitiva: participei do ICPC de 2022 a 2024, chegando à Regional Latino-Americana em 2023 e 2024, e antes fui finalista nacional da Olimpíada Nacional Escolar de Matemática do Peru (ONEM), representando Cusco.",
          // REVISAR: "TCC" é o termo brasileiro para trabalho de conclusão de graduação; a "tesis" peruana para o título profissional
          // pode equivaler a uma monografia mais extensa. Se preferir, use "trabalho de conclusão de curso (tesis)".
          "Desde fevereiro de 2026 atuo como estagiário profissional de TIC na Electro Sur Este S.A.A., distribuidora de energia elétrica em Cusco, onde projetei e avaliei um sistema de geração aumentada por recuperação (RAG) que responde, em linguagem natural, a perguntas sobre 72 documentos internos e é executado inteiramente com modelos abertos. O trabalho, vinculado ao meu TCC, abrange OCR estruturado, estratégias de chunking, recuperação híbrida (densa e BM25) com reranking e a avaliação da recuperação e da alucinação de diferentes modelos geradores. Pretendo investigar essas questões de forma rigorosa: como o processamento de documentos condiciona a qualidade da recuperação e como avaliar de maneira confiável sistemas baseados em LLMs."
        ]
      },
      interests: {
        title: "Interesses de pesquisa",
        labels: { connection: "No meu trabalho" },
        items: [
          {
            title: "Processamento de documentos para RAG",
            question: "Como as escolhas de OCR, extração de layout e chunking em documentos com tabelas, páginas digitalizadas e layouts complexos alteram o que o sistema de recuperação consegue encontrar?",
            connection: "No RAG da empresa, usei OCR estruturado (TeleOCR) com limpeza por tipo de bloco e comparei nove estratégias de chunking; a segmentação por seção hierárquica obteve o melhor Recall@10 (0,959)."
          },
          {
            title: "Recuperação híbrida",
            question: "Em que condições a combinação de embeddings densos com BM25 supera cada método isoladamente, e qual é o ganho adicional de um reranker?",
            connection: "O sistema combina resultados densos (harrier-oss-v1-0.6b) e BM25 por RRF e os reordena com um cross-encoder; a recuperação é medida com Acc@k, Recall@10, MRR e nDCG em 170 perguntas verificadas manualmente."
          },
          {
            title: "Avaliação de sistemas com LLMs",
            question: "Até que ponto é possível confiar em um único LLM como avaliador para medir a alucinação em respostas de RAG, incluindo perguntas que os documentos não respondem?",
            connection: "Comparei dez LLMs geradores usando um único avaliador (gpt-oss-120b) para a alucinação; o Gemma 4 26B-A4B ofereceu o melhor equilíbrio: alucinou em 15,3% das respostas e rejeitou corretamente 97,6% das perguntas sem resposta."
          }
        ]
      },
      projects: {
        title: "Projetos",
        labels: {
          problem: "Problema",
          approach: "Abordagem",
          stack: "Tecnologias",
          results: "Resultados",
          result: "Resultado",
          link: "Código",
          architecture: "Arquitetura",
          decisions: "Decisões técnicas",
          status: "Estado atual",
          thesis: "Relação com o TCC",
          restricted: "Não público",
          noRepo: "Sem repositório público",
          othersTitle: "Outros projetos"
        },
        items: [
          {
            featured: true,
            title: "Sistema RAG para documentos internos — Electro Sur Este",
            period: "fev. 2026 – atual",
            restricted: "O código e os documentos da empresa são internos e não são públicos; esta seção descreve o projeto e os resultados da avaliação.",
            problem: "Consultar os documentos internos de uma empresa toma tempo, e recorrer a pessoas experientes não escala quando as mesmas perguntas se repetem. O sistema responde, em linguagem natural, a perguntas sobre 72 documentos internos de uma distribuidora de energia elétrica peruana.",
            architecture: [
              "Ingestão: OCR estruturado com TeleOCR, limpeza por tipo de bloco e segmentação por seção hierárquica.",
              "Indexação: vetores densos (harrier-oss-v1-0.6b) e esparsos BM25 no Qdrant.",
              "Consulta: correção ortográfica e reformulação com o Qwen3.5-4B.",
              "Recuperação: busca híbrida densa + BM25 combinada por RRF e reordenação com cross-encoder (Qwen3-Reranker-8B).",
              "Geração: Gemma 4 26B-A4B, escolhido entre dez modelos geradores abertos."
            ],
            decisions: [
              "Apenas modelos abertos, para que os documentos não saiam dos servidores da empresa.",
              "Nove estratégias de chunking comparadas antes da escolha da seção hierárquica.",
              "Dez LLMs geradores comparados quanto à alucinação, à rejeição de perguntas sem resposta e à latência.",
              "Golden set de 170 perguntas verificadas manualmente; recuperação medida com Acc@k, Recall@10, MRR e nDCG.",
              "Alucinação avaliada por um único LLM avaliador (gpt-oss-120b)."
            ],
            results: [
              "Segmentação por seção hierárquica: melhor Recall@10 entre as nove estratégias (0,959).",
              "Gemma 4 26B-A4B: alucinação em 15,3% das respostas, 97,6% de rejeição correta de perguntas sem resposta e 0,82 s por resposta."
            ],
            stack: ["Python", "TeleOCR", "Qdrant", "vLLM", "Apptainer", "Qwen3.5", "Gemma 4", "gpt-oss-120b"],
            status: "Trabalhando em tool calling para o LLM.",
            thesis: "Meu trabalho de conclusão de curso está vinculado a este sistema."
          },
          {
            title: "AstroBioHub — NASA Space Apps Challenge 2025",
            period: "2025",
            problem: "Tornar pesquisável e explorável um corpus de 607 publicações da NASA sobre biologia espacial.",
            approach: "Coleta de metadados e texto completo no PubMed Central (NCBI Entrez e parsing de HTML), extração de entidades biomédicas com BioBERT/SciBERT e busca semântica com sentence embeddings e um grafo de conhecimento. Minha função na equipe foi de DevOps: implantação e infraestrutura.",
            stack: ["Python", "Biopython", "BeautifulSoup", "pandas", "Transformers", "sentence-transformers"],
            result: "Segundo lugar na sede de Cusco; Global Nominee.",
            link: "https://github.com/FiboNacci-codder/Research-in-NLP"
          },
          {
            title: "Problema da mochila em CUDA",
            period: "2022 – 2023",
            problem: "O problema da mochila é NP-completo, e soluções sequenciais tornam-se lentas à medida que as instâncias crescem.",
            approach: "Reimplementação de uma solução como algoritmo paralelo em GPU com CUDA e comparação com a versão sequencial; a versão paralela apresentou melhor desempenho.",
            stack: ["CUDA"],
            link: null
          },
          {
            title: "RSA e decifração quântica",
            period: "2024",
            problem: "A segurança do RSA se apoia na dificuldade de fatorar inteiros, premissa que algoritmos quânticos colocam em xeque. Como esse ataque funciona na prática?",
            approach: "Implementação do RSA com chaves de tamanho reduzido (primos de 8 bits) e uso de estimativa de fase quântica, simulada no Cirq, para a decifração.",
            stack: ["Python", "Cirq", "NumPy"],
            link: "https://github.com/FiboNacci-codder/RSA_QC"
          },
          {
            title: "Ordenação em assembly x86 vs. C",
            period: "2024",
            problem: "Em que medida uma implementação escrita manualmente em assembly altera o tempo de execução em relação a uma implementação de alto nível?",
            approach: "QuickSort implementado em assembly x86 e em C, com scripts de benchmark para tamanhos de 1 a 10⁸ elementos em ordem crescente, decrescente e aleatória. Projeto de disciplina, em coautoria com Jaime Antonio Rodriguez Phillco.",
            stack: ["Assembly x86", "C", "GCC", "Bash"],
            link: "https://github.com/FiboNacci-codder/TrabajoLE"
          }
        ],
        others: [
          { title: "Modelo de reconhecimento facial para indicadores de ansiedade (pesquisa)", period: "2024" },
          { title: "Registro automático de presença com reconhecimento facial (FaceNet, OpenCV)", period: "2024", link: "https://github.com/FiboNacci-codder/AsistenciaAutomatica" },
          { title: "Eliminação gaussiana em assembly com AVX vs. linguagem de alto nível", period: "2024" },
          { title: "Impacto do megaporto de Chancay no turismo de Cusco (LSTM e ARIMA com dados do MINCETUR)", period: "2024 – atual" },
          { title: "Classificação de variedades nativas de batata de Cusco com aprendizado de máquina", period: "2023 – 2024" }
        ]
      },
      timeline: {
        title: "Formação e experiência",
        types: { work: "Trabalho", education: "Formação", competition: "Competições", hackathon: "Hackathon" },
        items: [
          { period: "2026 – atual", type: "work", title: "Estagiário profissional de TIC", org: "Electro Sur Este S.A.A., Cusco", detail: "Sistema RAG sobre 72 documentos internos, com modelos abertos." },
          { period: "2026", type: "competition", title: "Datathon SUNASS 2026 — Macrorregião Sul", org: "", detail: "Análise de dados da SEDACUSCO. Também: Cuscontest XXV." },
          { period: "2025", type: "hackathon", title: "NASA Space Apps Challenge", org: "", detail: "Segundo lugar na sede de Cusco e Global Nominee, com o AstroBioHub." },
          { period: "2025", type: "competition", title: "IEEEXtreme 19.0 · Olimpíada Ibero-Americana de Matemática Universitária (OIMU)", org: "", detail: "" },
          { period: "2024 – 2025", type: "work", title: "Estagiário de informática", org: "Red de Comunicaciones, UNSAAC", detail: "Desenvolvimento web, administração de redes e apoio à gestão de TI." },
          { period: "2024", type: "competition", title: "Regional Latino-Americana do ICPC — 42º lugar na região", org: "", detail: "Também: IEEEXtreme 18.0, Training Camp Argentina (Rosário), Cuscontest XXI." },
          { period: "2023", type: "competition", title: "Regional Latino-Americana do ICPC — 62º lugar na região", org: "", detail: "Também: Cuscontest XIX e XX." },
          { period: "2022", type: "competition", title: "ICPC South America/South Finals", org: "", detail: "" },
          // REVISAR: no Brasil "graduação" + "orientador" é o par usual; no Peru o termo é "asesor".
          { period: "2020 – 2025", type: "education", title: "Graduação em Engenharia Informática e de Sistemas", org: "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)", detail: "Orientador: Robert Wilbert Alzamora Paredes." },
          { period: "2019", type: "competition", title: "Olimpíada Nacional Escolar de Matemática do Peru (ONEM)", org: "", detail: "Finalista nacional (quarta fase), representando Cusco." }
        ]
      },
      contact: {
        title: "Contato",
        intro: "A melhor forma de contato é por e-mail.",
        labels: {
          email: "E-mail",
          cv: "CV (PDF)",
          github: "GitHub",
          linkedin: "LinkedIn",
          lattes: "Lattes",
          icpc: "ICPC",
          codeforces: "Codeforces",
          lattesPdf: "Lattes (PDF)"
        }
      }
    }
  }
};
