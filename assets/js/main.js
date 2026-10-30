(function () {
  "use strict";

  var C = window.CONTENT;
  if (!C) return;

  var STORAGE_KEY = "lang";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var t; // textos del idioma activo

  // ---------------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------------
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function todo(label) {
    return el("span", { class: "todo", text: t.ui.todo + (label ? ": " + label : "") });
  }

  function storageGet() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storageSet(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* sin almacenamiento */ }
  }

  function pickLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    var candidates = [fromUrl, storageGet(), C.defaultLang];
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i] && C.i18n[candidates[i]]) return candidates[i];
    }
    return Object.keys(C.i18n)[0];
  }

  // ---------------------------------------------------------------------------
  // Render por sección
  // ---------------------------------------------------------------------------
  var renderers = {
    about: function (root) {
      var ps = t.about.paragraphs;
      if (!ps.length) return root.appendChild(todo("about.paragraphs"));
      ps.forEach(function (p) { root.appendChild(el("p", { text: p })); });
    },

    interests: function (root) {
      var items = t.interests.items;
      if (!items.length) return root.appendChild(el("li", null, [todo("interests.items")]));
      items.forEach(function (it, i) {
        var key = "interests.items[" + i + "].";
        root.appendChild(el("li", { class: "card" }, [
          el("h3", { class: "card__title", text: it.title }),
          it.question
            ? el("p", { class: "card__question", text: it.question })
            : el("p", { class: "card__question" }, [todo(key + "question")]),
          el("p", { class: "card__connection" }, [
            el("span", { class: "card__label", text: t.interests.labels.connection }),
            it.connection ? document.createTextNode(it.connection) : todo(key + "connection")
          ])
        ]));
      });
    },

    projects: function (root) {
      var items = t.projects.items;
      var L = t.projects.labels;
      if (!items.length) return root.appendChild(todo("projects.items"));

      function field(dl, key, val, idx) {
        dl.appendChild(el("dt", { text: L[key] }));
        if (Array.isArray(val) && val.length && key !== "stack") {
          var list = el(key === "architecture" ? "ol" : "ul", { class: "project__list" });
          val.forEach(function (v) { list.appendChild(el("li", { text: v })); });
          dl.appendChild(el("dd", null, [list]));
        } else if (Array.isArray(val) && val.length) {
          var tags = el("ul", { class: "tags" });
          val.forEach(function (v) { tags.appendChild(el("li", { text: v })); });
          dl.appendChild(el("dd", null, [tags]));
        } else if (val) {
          dl.appendChild(el("dd", { text: val }));
        } else {
          dl.appendChild(el("dd", null, [todo("projects.items[" + idx + "]." + key)]));
        }
      }

      items.forEach(function (p, i) {
        var dl = el("dl");
        var keys = p.featured
          ? ["problem", "architecture", "decisions", "results", "stack", "status", "thesis"]
          : ["problem", "approach", "stack", "result"];
        // Un campo ausente se omite; un string vacío se muestra como TODO
        keys.forEach(function (key) { if (p[key] !== undefined) field(dl, key, p[key], i); });

        if (!p.featured) {
          dl.appendChild(el("dt", { text: L.link }));
          if (p.link) dl.appendChild(el("dd", null, [el("a", { href: p.link, text: p.link.replace(/^https?:\/\/(www\.)?/, "") })]));
          else if (p.link === null) dl.appendChild(el("dd", { class: "muted", text: L.noRepo }));
          else dl.appendChild(el("dd", null, [todo("projects.items[" + i + "].link")]));
        }

        // Desplegable: el destacado empieza abierto, el resto cerrado
        var details = el("details", { class: "project" + (p.featured ? " project--featured" : "") }, [
          el("summary", { class: "project__head" }, [
            el("h3", { class: "project__title", text: p.title }),
            p.period ? el("span", { class: "project__period", text: p.period }) : null
          ]),
          el("div", { class: "project__body" }, [
            p.restricted ? el("p", { class: "notice" }, [
              el("strong", { text: L.restricted + ". " }),
              document.createTextNode(p.restricted)
            ]) : null,
            dl
          ])
        ]);
        if (p.featured) details.open = true;
        root.appendChild(el("article", null, [details]));
      });

      var others = t.projects.others || [];
      if (others.length) {
        var list = el("ul", { class: "others" });
        others.forEach(function (o) {
          list.appendChild(el("li", null, [
            el("span", { class: "others__period", text: o.period }),
            o.link ? el("a", { href: o.link, text: o.title }) : el("span", { text: o.title })
          ]));
        });
        root.appendChild(el("div", { class: "others-wrap" }, [
          el("h3", { class: "subsection__title", text: L.othersTitle }),
          list
        ]));
      }
    },

    timeline: function (root) {
      var items = t.timeline.items;
      if (!items.length) return root.appendChild(el("li", { class: "timeline__item" }, [todo("timeline.items")]));
      items.forEach(function (it) {
        root.appendChild(el("li", { class: "timeline__item timeline__item--" + it.type }, [
          el("div", { class: "timeline__meta" }, [
            el("span", { class: "timeline__period", text: it.period }),
            el("span", { class: "timeline__type", text: t.timeline.types[it.type] })
          ]),
          el("div", { class: "timeline__title", text: it.title }),
          it.org ? el("div", { class: "timeline__org", text: it.org }) : null,
          it.detail ? el("p", { class: "timeline__detail", text: it.detail }) : null
        ]));
      });
    },

    contact: function (root) {
      var L = t.contact.labels;
      var links = [
        ["email", "mailto:" + C.links.email, C.links.email],
        ["cv", C.links.cv, "cv.pdf"],
        ["github", C.links.github],
        ["linkedin", C.links.linkedin],
        ["lattes", C.links.lattes],
        ["lattesPdf", C.links.lattesPdf, "lattes.pdf"],
        ["icpc", C.links.icpc],
        ["codeforces", C.links.codeforces]
      ];
      links.forEach(function (l) {
        var text = l[2] || l[1].replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
        root.appendChild(el("li", null, [
          el("span", { class: "label", text: L[l[0]] }),
          el("a", { href: l[1], text: text })
        ]));
      });
    }
  };

  // ---------------------------------------------------------------------------
  // Idioma
  // ---------------------------------------------------------------------------
  function setMeta(name, value, attr) {
    var node = document.querySelector("meta[" + (attr || "name") + '="' + name + '"]');
    if (node) node.setAttribute("content", value);
  }

  function apply(lang) {
    t = C.i18n[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    setMeta("description", t.meta.description);
    setMeta("og:title", t.meta.title, "property");
    setMeta("og:description", t.meta.description, "property");
    setMeta("og:locale", C.locales[lang], "property");

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      var val = get(t, key);
      node.textContent = "";
      if (val) node.textContent = val;
      else node.appendChild(todo(key));
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      var parts = node.getAttribute("data-i18n-attr").split(":");
      node.setAttribute(parts[0], get(t, parts[1]));
    });

    document.querySelectorAll("[data-render]").forEach(function (root) {
      root.textContent = "";
      renderers[root.getAttribute("data-render")](root);
    });

    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  function setLang(lang) {
    apply(lang);
    storageSet(lang);
    var url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  }

  function buildLangSwitch() {
    var wrap = document.querySelector(".lang-switch");
    Object.keys(C.languages).forEach(function (code) {
      if (!C.i18n[code]) return;
      // El nombre accesible incluye el texto visible ("PT") y el nombre completo del idioma
      var b = el("button", {
        type: "button",
        lang: code,
        "data-lang": code,
        "aria-label": C.languages[code] + " — " + C.languageNames[code],
        text: C.languages[code]
      });
      b.addEventListener("click", function () { setLang(code); });
      wrap.appendChild(b);
    });
  }

  // ---------------------------------------------------------------------------
  // Microinteracciones
  // ---------------------------------------------------------------------------
  function initHeaderShadow() {
    var header = document.querySelector(".site-header");
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".reveal").forEach(function (s) { io.observe(s); });
  }

  function initActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll(".site-nav a").forEach(function (a) { links[a.hash.slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = links[e.target.id];
        if (!a || !e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
        a.setAttribute("aria-current", "location");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  // Al imprimir se abren todos los proyectos; luego se restaura el estado
  function initPrint() {
    var closed = [];
    window.addEventListener("beforeprint", function () {
      closed = [].filter.call(document.querySelectorAll("details.project"), function (d) { return !d.open; });
      closed.forEach(function (d) { d.open = true; });
    });
    window.addEventListener("afterprint", function () {
      closed.forEach(function (d) { d.open = false; });
    });
  }

  // ---------------------------------------------------------------------------
  initPrint();
  buildLangSwitch();
  apply(pickLang());
  document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  initHeaderShadow();
  initReveal();
  initActiveNav();
})();
