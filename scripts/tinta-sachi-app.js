/* ==========================================================================
   TINTA-SACHI · Controlador de Interacciones, Visualizaciones y Accesibilidad
   ========================================================================== */

(function () {
  "use strict";

  const BASE = window.TINTA_ASSET_BASE || "./";
  const DATA = window.TINTA_SACHI_DATA;

  function assetUrl(relPath) {
    return BASE + relPath.replace(/^\.\//, "");
  }

  function fmtNum(n, dec = 2) {
    return Number(n).toFixed(dec).replace(".", ",");
  }

  /* ------------------------------------------------------------------------
     1. NAVEGACIÓN, BARRA DE PROGRESO Y MENÚ MÓVIL
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const progressBar = document.getElementById("inkProgressBar");
    const backToTop = document.getElementById("backToTopBtn");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const navLinks = Array.from(document.querySelectorAll(".nav-link, .mobile-drawer-links a"));
    const trackedSections = Array.from(document.querySelectorAll("main section[id]"));

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = mobileDrawer.classList.toggle("open");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
      });

      mobileDrawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileDrawer.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape" && mobileDrawer.classList.contains("open")) {
          mobileDrawer.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
          mobileBtn.focus();
        }
      });
    }

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      if (progressBar) progressBar.style.width = pct.toFixed(1) + "%";
      if (backToTop) backToTop.classList.toggle("visible", scrollTop > 520);

      let currentId = "";
      const offset = scrollTop + 160;
      for (const sec of trackedSections) {
        if (sec.offsetTop <= offset) {
          currentId = sec.id;
        }
      }
      if (currentId) {
        navLinks.forEach((lnk) => {
          const href = lnk.getAttribute("href") || "";
          lnk.classList.toggle("active", href === "#" + currentId);
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     2. ANIMACIONES DE REVELACIÓN VINCULADAS AL SCROLL
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     3. EXPLORADOR ESTRUCTURAL DE LA CAJA (FEFCO 0427 · 26 × 20 × 9 CM)
     ------------------------------------------------------------------------ */
  function initBoxExplorer() {
    const tabsContainer = document.getElementById("boxModeTabs");
    const viewport = document.getElementById("boxStageViewport");
    const imgEl = document.getElementById("boxStageImg");
    const badgeEl = document.getElementById("boxStageBadge");
    const titleEl = document.getElementById("boxStageTitle");
    const descEl = document.getElementById("boxStageDesc");
    const capEl = document.getElementById("boxStageCaption");
    const sealBtn = document.getElementById("unboxSealBtn");

    if (!tabsContainer || !DATA) return;

    let activeIdx = 0;

    function renderMode(idx) {
      activeIdx = idx;
      const m = DATA.boxModes[idx];
      Array.from(tabsContainer.children).forEach((btn, i) => {
        btn.classList.toggle("active", i === idx);
        btn.setAttribute("aria-selected", String(i === idx));
      });
      imgEl.src = assetUrl(m.img);
      imgEl.alt = m.title;
      badgeEl.textContent = m.badge;
      titleEl.textContent = m.title;
      descEl.textContent = m.desc;
      capEl.textContent = m.caption;
      viewport.classList.toggle("is-sealed", Boolean(m.sealed));

      if (sealBtn) {
        if (idx === 0) {
          sealBtn.style.display = "inline-flex";
          sealBtn.textContent = "Romper el sello 幸 y abrir caja";
        } else if (idx === 1) {
          sealBtn.style.display = "inline-flex";
          sealBtn.textContent = "Ver plano estructural FEFCO 0427 →";
        } else {
          sealBtn.style.display = "none";
        }
      }
    }

    tabsContainer.innerHTML = DATA.boxModes
      .map(
        (m, i) =>
          `<button type="button" role="tab" class="stage-tab ${i === 0 ? "active" : ""}" aria-selected="${i === 0}" data-idx="${i}">${m.tab}</button>`
      )
      .join("");

    tabsContainer.querySelectorAll(".stage-tab").forEach((btn) => {
      btn.addEventListener("click", () => renderMode(Number(btn.dataset.idx)));
    });

    if (sealBtn) {
      sealBtn.addEventListener("click", () => {
        if (activeIdx === 0) renderMode(1);
        else if (activeIdx === 1) renderMode(2);
      });
    }

    renderMode(0);
  }

  /* ------------------------------------------------------------------------
     4. LAS 4 DIMENSIONES INTERACTIVAS: LEE · ESCUCHA · COLECCIONA · REGALA
     ------------------------------------------------------------------------ */
  function initFourDimensions() {
    const dimTabs = document.querySelectorAll(".dim-tab");
    const dimPanels = document.querySelectorAll(".dim-panel");

    function activateDimension(dimId) {
      dimTabs.forEach((t) => {
        const isTarget = t.dataset.dim === dimId;
        t.classList.toggle("active", isTarget);
        t.setAttribute("aria-selected", String(isTarget));
      });
      dimPanels.forEach((p) => {
        p.classList.toggle("active", p.id === "panel-" + dimId);
      });
    }

    dimTabs.forEach((t) => {
      t.addEventListener("click", () => activateDimension(t.dataset.dim));
    });

    // Enlaces rápidos desde el Hero hacia cada pilar
    document.querySelectorAll("[data-goto-dim]").forEach((lnk) => {
      lnk.addEventListener("click", () => {
        activateDimension(lnk.dataset.gotoDim);
      });
    });

    // 4.1 LEE: Selector de ediciones
    const edContainer = document.getElementById("editionsSelector");
    if (edContainer && DATA) {
      function selectEdition(idx) {
        const ed = DATA.editions[idx];
        Array.from(edContainer.children).forEach((b, i) => b.classList.toggle("active", i === idx));
        document.getElementById("leeCategory").textContent = ed.category;
        document.getElementById("leeTitle").textContent = ed.title;
        document.getElementById("leeQuote").textContent = ed.quote;
        document.getElementById("leeSynopsis").textContent = ed.synopsis;
        document.getElementById("leeSpec").textContent = ed.physicalSpec;
        const leeImg = document.getElementById("leeArtwork");
        if (leeImg) {
          leeImg.src = assetUrl(ed.img);
          leeImg.alt = ed.title;
        }
        const leeCap = document.getElementById("leeArtworkCaption");
        if (leeCap) leeCap.textContent = ed.imgCaption;
      }

      edContainer.innerHTML = DATA.editions
        .map(
          (ed, i) => `
          <button type="button" class="edition-btn ${i === 0 ? "active" : ""}" data-idx="${i}">
            <span class="edition-badge">${ed.category}</span>
            <strong style="display:block;font-size:1rem;margin-bottom:4px;">${ed.title}</strong>
          </button>`
        )
        .join("");

      edContainer.querySelectorAll(".edition-btn").forEach((btn) => {
        btn.addEventListener("click", () => selectEdition(Number(btn.dataset.idx)));
      });
      selectEdition(0);
    }

    // 4.2 ESCUCHA: Canción original + Vinilo + Mini reproductor flotante
    const audio = document.getElementById("brandAudio");
    const vinyl = document.getElementById("vinylDisc");
    const eqBars = document.getElementById("eqBars");
    const playBtn = document.getElementById("customPlayBtn");
    const dock = document.getElementById("floatingAudioDock");
    const dockToggle = document.getElementById("dockToggleBtn");
    const jumpListenHero = document.getElementById("heroPlaySongBtn");

    if (audio) {
      audio.src = assetUrl("assets/Cancion_Oficial_TintaSachi.mp4");

      function syncAudioUI() {
        const playing = !audio.paused && !audio.ended;
        if (vinyl) vinyl.classList.toggle("is-playing", playing);
        if (eqBars) eqBars.classList.toggle("is-playing", playing);
        if (playBtn) {
          playBtn.textContent = playing ? "⏸ Pausar canción original" : "▶ Reproducir «En mi cajita cabe otro lugar»";
        }
        if (dock) dock.classList.toggle("visible", playing);
        if (dockToggle) dockToggle.textContent = playing ? "⏸" : "▶";
      }

      if (playBtn) {
        playBtn.addEventListener("click", () => {
          if (audio.paused) audio.play().catch(() => {});
          else audio.pause();
        });
      }

      if (dockToggle) {
        dockToggle.addEventListener("click", () => {
          if (audio.paused) audio.play().catch(() => {});
          else audio.pause();
        });
      }

      const dockClose = document.getElementById("dockCloseBtn");
      if (dockClose && dock) {
        dockClose.addEventListener("click", () => {
          dock.classList.remove("visible");
        });
      }

      if (jumpListenHero) {
        jumpListenHero.addEventListener("click", () => {
          activateDimension("escucha");
          const target = document.getElementById("dimensiones");
          if (target) target.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            if (audio.paused) audio.play().catch(() => {});
          }, 350);
        });
      }

      audio.addEventListener("play", syncAudioUI);
      audio.addEventListener("pause", syncAudioUI);
      audio.addEventListener("ended", syncAudioUI);
    }

    // 4.3 COLECCIONA: Piezas coleccionables
    const collCardsWrap = document.getElementById("collectibleCards");
    if (collCardsWrap && DATA) {
      function selectCollectible(idx) {
        const item = DATA.collectibles[idx];
        Array.from(collCardsWrap.children).forEach((c, i) => c.classList.toggle("active", i === idx));
        document.getElementById("collDetailTitle").textContent = item.name;
        document.getElementById("collDetailTag").textContent = item.tag;
        document.getElementById("collDetailDesc").textContent = item.detail;
        document.getElementById("collDetailEmotion").textContent = item.emotionLink;
      }

      collCardsWrap.innerHTML = DATA.collectibles
        .map(
          (c, i) => `
          <button type="button" class="coll-card ${i === 0 ? "active" : ""}" data-idx="${i}">
            <strong>${c.name}</strong>
            <small>${c.tag}</small>
          </button>`
        )
        .join("");

      collCardsWrap.querySelectorAll(".coll-card").forEach((btn) => {
        btn.addEventListener("click", () => selectCollectible(Number(btn.dataset.idx)));
      });
      selectCollectible(0);
    }

    // 4.4 REGALA: Personalizador de tarjeta y exportación PNG
    const giftTo = document.getElementById("giftToInput");
    const giftMsg = document.getElementById("giftMsgInput");
    const prevTo = document.getElementById("giftPreviewTo");
    const prevMsg = document.getElementById("giftPreviewMsg");
    const presetsWrap = document.getElementById("giftPresets");
    const downloadCardBtn = document.getElementById("downloadGiftCardBtn");

    function syncGiftPreview() {
      if (prevTo && giftTo) prevTo.textContent = giftTo.value.trim() || "Alguien especial";
      if (prevMsg && giftMsg) prevMsg.textContent = giftMsg.value.trim() || "Las historias también se viven.";
    }

    if (giftTo && giftMsg) {
      giftTo.addEventListener("input", syncGiftPreview);
      giftMsg.addEventListener("input", syncGiftPreview);
    }

    if (presetsWrap && DATA) {
      presetsWrap.innerHTML = DATA.giftPresets
        .map((p, i) => `<button type="button" class="preset-chip" data-idx="${i}">${p.label}</button>`)
        .join("");
      presetsWrap.querySelectorAll(".preset-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          const p = DATA.giftPresets[Number(chip.dataset.idx)];
          giftTo.value = p.to;
          giftMsg.value = p.msg;
          syncGiftPreview();
        });
      });
    }

    if (downloadCardBtn) {
      downloadCardBtn.addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        canvas.width = 960;
        canvas.height = 560;
        const ctx = canvas.getContext("2d");

        // Fondo papel cálido
        const grad = ctx.createLinearGradient(0, 0, 960, 560);
        grad.addColorStop(0, "#FFFDF9");
        grad.addColorStop(1, "#F2EAF9");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 960, 560);

        // Marco punteado editorial
        ctx.strokeStyle = "#1F1575";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(28, 28, 904, 504);
        ctx.setLineDash([]);

        // Encabezado
        ctx.fillStyle = "#E56020";
        ctx.font = "bold 16px 'Segoe UI', sans-serif";
        ctx.fillText("TINTA-SACHI · LAS HISTORIAS TAMBIÉN SE VIVEN", 68, 86);

        ctx.fillStyle = "#1F1575";
        ctx.font = "bold 36px Georgia, serif";
        const recipient = (giftTo && giftTo.value.trim()) || "Juliana";
        ctx.fillText("Para: " + recipient, 68, 146);

        // Cuerpo envuelto
        ctx.fillStyle = "#282147";
        ctx.font = "italic 23px Georgia, serif";
        const text = (giftMsg && giftMsg.value.trim()) || "Las historias también se viven.";
        const words = text.split(/\s+/);
        let line = "";
        let y = 212;
        for (const w of words) {
          const test = line + w + " ";
          if (ctx.measureText(test).width > 740 && line) {
            ctx.fillText(line.trim(), 68, y);
            line = w + " ";
            y += 38;
          } else {
            line = test;
          }
        }
        if (line) ctx.fillText(line.trim(), 68, y);

        // Sello lacre 幸
        ctx.beginPath();
        ctx.arc(845, 445, 48, 0, Math.PI * 2);
        ctx.fillStyle = "#E56020";
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 42px Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("幸", 845, 446);

        const link = document.createElement("a");
        link.download = "Dedicatoria_TintaSachi_" + recipient.replace(/\s+/g, "_") + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. RENDERIZADO DE EMPATÍA, CÓMIC Y CURVA EMOCIONAL INTERACTIVA
     ------------------------------------------------------------------------ */
  function initConsumerAndJourney() {
    if (!DATA) return;

    const empGrid = document.getElementById("empathyGrid");
    if (empGrid) {
      empGrid.innerHTML = DATA.empathyQuadrants
        .map(
          (q) => `
          <article class="empathy-card">
            <h4>${q.title}</h4>
            <p style="font-size:0.78rem;color:var(--naranja);font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">${q.subtitle}</p>
            <ul>${q.items.map((it) => `<li>${it}</li>`).join("")}</ul>
          </article>`
        )
        .join("");
    }

    const comicList = document.getElementById("comicPanelsList");
    if (comicList) {
      comicList.innerHTML = DATA.comicPanels
        .map(
          (v) => `
          <div class="vineta-item ${v.num >= 4 ? "is-after" : ""}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="color:var(--indigo);font-size:0.92rem;">Viñeta ${v.num} · ${v.title}</strong>
              <small style="color:var(--ink-muted);font-weight:600;">${v.stage}</small>
            </div>
            <span class="vineta-emotion">${v.emotion}</span>
            <p style="margin:6px 0 0;font-size:0.86rem;line-height:1.52;color:var(--ink-body);">${v.quote}</p>
          </div>`
        )
        .join("");
    }

    // Curva emocional interactiva en Customer Journey
    const journeySteps = [
      { step: "1. Rutina", sub: "nocturna", stage: "ANTES", y: 156, emo: "Agobio ansioso y fatiga de pantalla", detail: "Juliana termina parciales y entregas; el scroll en redes sociales no le devuelve descanso afectivo." },
      { step: "2. Pain Point", sub: "duda de gasto", stage: "ANTES", y: 170, emo: "Duda presupuestal ante compra", detail: "Punto crítico de dolor: teme gastar su presupuesto limitado en otro artículo superficial o costoso." },
      { step: "3. Hallazgo", sub: "en redes", stage: "ANTES", y: 116, emo: "Curiosidad cautelosa", detail: "Descubre un unboxing en @tinta_sachi con reseñas cercanas de estudiantes en Montería y precios claros." },
      { step: "4. Recepción", sub: "de la caja 幸", stage: "DURANTE", y: 72, emo: "Ilusión expectante", detail: "Recibe la caja rígida FEFCO 0427 en índigo (#1F1575) con el sello naranja 幸 intacto." },
      { step: "5. Peak Moment", sub: "unboxing + QR", stage: "DURANTE", y: 28, emo: "Sorpresa agradable (8,75) y Fascinación (8,13)", detail: "Momento cumbre: rompe el sello 幸, despliega el papel seda seigaiha y escucha «En mi cajita cabe otro lugar»." },
      { step: "6. Lectura", sub: "e inmersión", stage: "DURANTE", y: 54, emo: "Serenidad e Inspiración (8,50)", detail: "Lee su obra acompañada por el separador con borla y explora el pin esmaltado y las postales." },
      { step: "7. Comunidad", sub: "y regalo", stage: "DESPUÉS", y: 44, emo: "Orgullo (8,25) y Nostalgia (7,00)", detail: "Lleva el pin en su mochila, conserva su cápsula de recuerdo y recomienda Tinta-Sachi como obsequio." }
    ];

    const svgWrap = document.getElementById("journeyInteractiveSvg");
    const detailBox = document.getElementById("journeyPointDetail");
    if (svgWrap && detailBox) {
      const xs = [75, 200, 325, 450, 575, 700, 825];
      const pathD = xs
        .map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${journeySteps[i].y}`)
        .join(" ");

      const circles = journeySteps
        .map((st, i) => {
          const isPeak = i === 4;
          const isPain = i === 1;
          const fill = isPeak ? "#E56020" : isPain ? "#B8332A" : "#1F1575";
          const r = isPeak ? 10 : 7.5;
          return `
            <g class="journey-node" data-idx="${i}" tabindex="0" role="button" aria-label="${st.step} ${st.sub}: ${st.emo}" style="cursor:pointer;">
              <circle cx="${xs[i]}" cy="${st.y}" r="${r + 6}" fill="${fill}" opacity="0.16"></circle>
              <circle cx="${xs[i]}" cy="${st.y}" r="${r}" fill="${fill}" stroke="#FFFFFF" stroke-width="2.5"></circle>
              <text x="${xs[i]}" y="202" text-anchor="middle" font-size="11" font-weight="700" fill="#2E284D">
                <tspan x="${xs[i]}" dy="0">${st.step}</tspan>
                <tspan x="${xs[i]}" dy="14" font-weight="500" fill="#5C547D">${st.sub}</tspan>
              </text>
            </g>`;
        })
        .join("");

      svgWrap.innerHTML = `
        <svg viewBox="0 0 900 232" style="min-width:580px;width:100%;height:auto;" role="img" aria-label="Curva emocional interactiva del Customer Journey Tinta-Sachi">
          <defs>
            <linearGradient id="journeyAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#E56020" stop-opacity="0.24"/>
              <stop offset="100%" stop-color="#1F1575" stop-opacity="0.02"/>
            </linearGradient>
          </defs>
          <line x1="45" y1="40" x2="860" y2="40" stroke="#E5DFF3" stroke-dasharray="4 4"/>
          <line x1="45" y1="105" x2="860" y2="105" stroke="#E5DFF3" stroke-dasharray="4 4"/>
          <line x1="45" y1="170" x2="860" y2="170" stroke="#E5DFF3" stroke-dasharray="4 4"/>
          <text x="10" y="44" font-size="10.5" font-weight="700" fill="#187958">ALTO</text>
          <text x="10" y="109" font-size="10.5" font-weight="700" fill="#5C547D">MEDIO</text>
          <text x="10" y="174" font-size="10.5" font-weight="700" fill="#B8332A">BAJO</text>
          <path d="${pathD} L 825 182 L 75 182 Z" fill="url(#journeyAreaGrad)"/>
          <path d="${pathD}" fill="none" stroke="#1F1575" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${circles}
        </svg>`;

      function showJourneyStep(idx) {
        const s = journeySteps[idx];
        detailBox.innerHTML = `
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-bottom:6px;">
            <strong style="color:var(--indigo);">${s.step} · Etapa ${s.stage}</strong>
            <span style="font-size:0.82rem;font-weight:700;color:var(--naranja);">Emoción: ${s.emo}</span>
          </div>
          <p style="margin:0;font-size:0.92rem;color:var(--ink-body);">${s.detail}</p>`;
      }

      svgWrap.querySelectorAll(".journey-node").forEach((node) => {
        node.addEventListener("click", () => showJourneyStep(Number(node.dataset.idx)));
        node.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showJourneyStep(Number(node.dataset.idx));
          }
        });
      });
      showJourneyStep(4);
    }
  }

  /* ------------------------------------------------------------------------
     6. MATRIZ PREMO Y LOS 4 GRÁFICOS INTERACTIVOS VERIFICADOS
     ------------------------------------------------------------------------ */
  function initPremoAnalytics() {
    if (!DATA) return;

    let currentFilter = "all";
    let spotlightEval = 0; // 0 = todos, 1..4 = Evaluador 1..4

    const tbody = document.getElementById("premoMatrixBody");
    const tfoot = document.getElementById("premoMatrixFoot");
    const theadRow = document.getElementById("premoMatrixHeadRow");
    const evalBanner = document.getElementById("evaluatorProfileBanner");

    function renderPremoTable() {
      if (!tbody || !tfoot) return;

      if (theadRow) {
        theadRow.querySelectorAll("[data-ev-col]").forEach((th) => {
          th.classList.toggle("highlight-col", Number(th.dataset.evCol) === spotlightEval);
        });
      }

      const rows = DATA.premoEmotions.filter((row) => {
        if (currentFilter === "pos") return row.valence === "Positiva";
        if (currentFilter === "neg") return row.valence === "Negativa";
        return true;
      });

      tbody.innerHTML = rows
        .map((r) => {
          const isPos = r.valence === "Positiva";
          const cells = r.scores
            .map(
              (sc, i) =>
                `<td class="num-col ${spotlightEval === i + 1 ? "highlight-col" : ""}"><strong>${fmtNum(sc, 1)}</strong></td>`
            )
            .join("");

          return `
            <tr>
              <td><strong>${r.id}. ${r.name}</strong><br><small style="color:var(--ink-muted);">${r.def}</small></td>
              <td><span class="valence-badge ${isPos ? "valence-badge--pos" : "valence-badge--neg"}">${r.valence}</span></td>
              ${cells}
              <td class="num-col">${r.freq}/4 (${fmtNum(r.presPct, 0)}%)</td>
              <td class="num-col">${fmtNum(r.sum, 1)}</td>
              <td class="num-col"><strong>${fmtNum(r.avg, 2)}</strong></td>
              <td class="num-col">${fmtNum(r.totalShare, 2)}%</td>
            </tr>`;
        })
        .join("");

      tfoot.innerHTML = `
        <tr>
          <td colspan="2">Subtotal Emociones Positivas (1–7)</td>
          <td class="num-col ${spotlightEval === 1 ? "highlight-col" : ""}">7,86</td>
          <td class="num-col ${spotlightEval === 2 ? "highlight-col" : ""}">8,21</td>
          <td class="num-col ${spotlightEval === 3 ? "highlight-col" : ""}">8,57</td>
          <td class="num-col ${spotlightEval === 4 ? "highlight-col" : ""}">8,14</td>
          <td class="num-col">28/28 (100%)</td>
          <td class="num-col">229,5</td>
          <td class="num-col" style="color:var(--emerald);">8,20 / 10</td>
          <td class="num-col">95,03%</td>
        </tr>
        <tr>
          <td colspan="2">Subtotal Emociones Negativas (8–14)</td>
          <td class="num-col ${spotlightEval === 1 ? "highlight-col" : ""}">0,43</td>
          <td class="num-col ${spotlightEval === 2 ? "highlight-col" : ""}">0,57</td>
          <td class="num-col ${spotlightEval === 3 ? "highlight-col" : ""}">0,29</td>
          <td class="num-col ${spotlightEval === 4 ? "highlight-col" : ""}">0,43</td>
          <td class="num-col">7/28 (25%)</td>
          <td class="num-col">12,0</td>
          <td class="num-col" style="color:var(--crimson);">0,43 / 10</td>
          <td class="num-col">4,97%</td>
        </tr>
        <tr>
          <td colspan="2">Diferencial Afectivo Neto y Decisión</td>
          <td class="num-col ${spotlightEval === 1 ? "highlight-col" : ""}">+7,43</td>
          <td class="num-col ${spotlightEval === 2 ? "highlight-col" : ""}">+7,64</td>
          <td class="num-col ${spotlightEval === 3 ? "highlight-col" : ""}">+8,28</td>
          <td class="num-col ${spotlightEval === 4 ? "highlight-col" : ""}">+7,71</td>
          <td class="num-col">35 activas</td>
          <td class="num-col">241,5</td>
          <td class="num-col" style="color:var(--naranja);">+7,77 pts</td>
          <td class="num-col">MANTENER</td>
        </tr>`;

      if (evalBanner) {
        if (spotlightEval === 0) {
          evalBanner.innerHTML =
            "<strong>Vista consolidada de los 4 evaluadores:</strong> Promedio positivo general de <strong>8,20/10</strong> (rango estrecho entre 7,86 y 8,57) frente a <strong>0,43/10</strong> en emociones negativas. Selecciona un evaluador para inspeccionar su perfil diferenciado.";
        } else {
          const ev = DATA.evaluatorsSummary[spotlightEval - 1];
          evalBanner.innerHTML = `<strong>${ev.name}</strong> · Media positiva: <strong>${fmtNum(ev.posAvg)}/10</strong> · Media negativa: <strong>${fmtNum(ev.negAvg)}/10</strong> · Emociones pico: <em>${ev.peak}</em>. ${ev.note}`;
        }
      }
    }

    document.querySelectorAll("[data-premo-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-premo-filter]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.premoFilter;
        renderPremoTable();
      });
    });

    document.querySelectorAll("[data-eval-spot]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-eval-spot]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        spotlightEval = Number(btn.dataset.evalSpot);
        renderPremoTable();
      });
    });

    renderPremoTable();

    // GRÁFICO 1: Distribución General de las 14 Emociones (ordenado por intensidad)
    const chart1El = document.getElementById("chart1Container");
    if (chart1El) {
      const sorted = [...DATA.premoEmotions].sort((a, b) => b.avg - a.avg || a.id - b.id);
      chart1El.innerHTML = sorted
        .map((e) => {
          const pctW = Math.max(e.avg * 10, e.avg > 0 ? 4 : 0);
          let bg = "#B5AECA";
          if (e.valence === "Positiva") bg = e.avg >= 8.5 ? "#E56020" : "#1F1575";
          else if (e.avg > 0) bg = "#B8332A";

          return `
            <div class="hbar-row">
              <div class="hbar-label">${e.id}. ${e.name}</div>
              <div class="hbar-track" title="${e.name}: promedio ${fmtNum(e.avg)}/10 · presencia ${e.freq}/4">
                <div style="position:absolute;left:30%;top:0;bottom:0;border-left:1.5px dashed rgba(184,51,42,0.45);z-index:2;" aria-hidden="true"></div>
                <div style="position:absolute;left:70%;top:0;bottom:0;border-left:1.5px dashed rgba(24,121,88,0.55);z-index:2;" aria-hidden="true"></div>
                ${
                  e.avg > 0
                    ? `<div class="hbar-fill" style="width:${pctW}%;background:${bg};">${e.avg >= 1.5 ? fmtNum(e.avg) : ""}</div>`
                    : `<div style="padding-left:10px;line-height:26px;font-size:0.76rem;color:#6E668D;">0,00 (Ausente)</div>`
                }
              </div>
              <div class="hbar-meta">${fmtNum(e.avg)}/10 · ${e.freq}/4</div>
            </div>`;
        })
        .join("");
    }

    // GRÁFICO 2: Comparación de los 4 Evaluadores (SVG agrupado + tarjetas individuales)
    const chart2El = document.getElementById("chart2Container");
    if (chart2El) {
      const activeRows = DATA.premoEmotions.filter((e) => e.avg > 0).sort((a, b) => b.avg - a.avg);
      const colors = ["#1F1575", "#E56020", "#5A45D6", "#187958"];
      const gx0 = 48, gy0 = 24, gw = 820, gh = 250;
      const grpW = gw / activeRows.length;
      const bw = 13;

      const gridLines = [0, 2, 4, 6, 8, 10]
        .map((v) => {
          const y = gy0 + gh - (v / 10) * gh;
          return `
            <line x1="${gx0}" y1="${y}" x2="${gx0 + gw}" y2="${y}" stroke="#EAE4F5" stroke-width="1"/>
            <text x="${gx0 - 10}" y="${y + 4}" text-anchor="end" font-size="11" font-weight="600" fill="#5C547D">${v}</text>`;
        })
        .join("");

      const groupsSvg = activeRows
        .map((row, idx) => {
          const baseX = gx0 + idx * grpW + 10;
          const shortLbl = row.name.length > 12 ? row.name.slice(0, 11) + "." : row.name;
          const bars = row.scores
            .map((sc, eIdx) => {
              const bh = (sc / 10) * gh;
              const bx = baseX + eIdx * (bw + 2);
              const by = gy0 + gh - bh;
              return sc > 0
                ? `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3" fill="${colors[eIdx]}"><title>Evaluador ${eIdx + 1} · ${row.name}: ${fmtNum(sc, 1)}/10</title></rect>`
                : `<rect x="${bx}" y="${gy0 + gh - 2}" width="${bw}" height="2" fill="#CCC5DF"/>`;
            })
            .join("");

          return `
            <g>
              ${bars}
              <text x="${baseX + 28}" y="${gy0 + gh + 18}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2E284D">${shortLbl}</text>
            </g>`;
        })
        .join("");

      const evalCardsHtml = DATA.evaluatorsSummary
        .map(
          (ev, i) => `
          <div style="padding:14px 16px;border-radius:12px;background:var(--paper);border-left:4px solid ${colors[i]};">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;">
              <strong style="color:var(--ink-primary);">${ev.name}</strong>
              <span style="font-size:0.8rem;font-weight:700;color:var(--emerald);">+${fmtNum(ev.posAvg)} · -${fmtNum(ev.negAvg)}</span>
            </div>
            <div style="font-size:0.8rem;color:var(--naranja);font-weight:600;margin-bottom:4px;">Picos: ${ev.peak}</div>
            <p style="margin:0;font-size:0.82rem;line-height:1.5;color:var(--ink-muted);">${ev.note}</p>
          </div>`
        )
        .join("");

      chart2El.innerHTML = `
        <div class="svg-scroll-frame" style="margin-bottom:18px;">
          <svg viewBox="0 0 885 305" style="min-width:560px;width:100%;height:auto;" role="img" aria-label="Comparación de puntuaciones entre los cuatro evaluadores">
            ${gridLines}
            ${groupsSvg}
          </svg>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:12px;">
          ${evalCardsHtml}
        </div>`;
    }

    // GRÁFICO 3: Distribución Porcentual (Anillo SVG + Masa Afectiva Global)
    const chart3El = document.getElementById("chart3Container");
    if (chart3El) {
      const posRows = DATA.premoEmotions.filter((e) => e.valence === "Positiva").sort((a, b) => b.sum - a.sum);
      const sliceColors = ["#E56020", "#1F1575", "#34288F", "#5A45D6", "#187958", "#D9822B", "#7A6BA8"];
      const r = 74;
      const circ = 2 * Math.PI * r;
      let offsetAcc = 0;

      const arcs = posRows
        .map((p, i) => {
          const frac = p.sum / 229.5;
          const len = frac * circ;
          const dashOffset = -offsetAcc;
          offsetAcc += len;
          return `<circle cx="105" cy="105" r="${r}" fill="none" stroke="${sliceColors[i]}" stroke-width="30"
            stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${dashOffset.toFixed(2)}"
            transform="rotate(-90 105 105)"><title>${p.name}: ${fmtNum(p.posShare)}% (${fmtNum(p.sum, 1)} pts)</title></circle>`;
        })
        .join("");

      const legendList = posRows
        .map(
          (p, i) => `
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:var(--paper);font-size:0.84rem;">
            <span style="display:inline-flex;align-items:center;gap:8px;font-weight:600;min-width:0;">
              <span style="width:11px;height:11px;border-radius:3px;background:${sliceColors[i]};display:inline-block;flex-shrink:0;"></span>
              <span style="overflow:hidden;text-overflow:ellipsis;">${p.name} <small style="color:var(--ink-muted);">(${fmtNum(p.sum, 1)} pts)</small></span>
            </span>
            <strong style="color:var(--indigo);flex-shrink:0;">${fmtNum(p.posShare)}%</strong>
          </div>`
        )
        .join("");

      chart3El.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:26px;align-items:center;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:14px;min-width:0;">
            <svg viewBox="0 0 210 210" width="205" height="205" role="img" aria-label="Distribución porcentual de emociones positivas">
              ${arcs}
              <text x="105" y="100" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#1F1575">229,5</text>
              <text x="105" y="118" text-anchor="middle" font-size="11" font-weight="600" fill="#5C547D">pts positivos</text>
            </svg>
            <div style="width:100%;display:grid;gap:6px;">${legendList}</div>
          </div>
          <div style="min-width:0;">
            <h4 style="margin:0 0 10px;color:var(--indigo);font-size:1rem;">Participación sobre la masa emocional total (241,50 pts)</h4>
            <div style="height:36px;border-radius:10px;overflow:hidden;display:flex;margin-bottom:8px;">
              <div style="width:95.03%;background:var(--indigo);color:#fff;font-size:0.79rem;font-weight:700;display:flex;align-items:center;padding:0 10px;white-space:nowrap;overflow:hidden;">95,03% Positivas (229,5 pts)</div>
              <div style="width:4.97%;background:var(--crimson);" title="4,97% Negativas (12,0 pts)"></div>
            </div>
            <p style="font-size:0.82rem;color:var(--crimson);font-weight:600;margin:0 0 18px;">4,97% Negativas residuales (12,0 pts: Miedo 3,31% · Aburrimiento 1,24% · Tristeza 0,41%).</p>

            <h4 style="margin:0 0 10px;color:var(--indigo);font-size:1rem;">Distribución sobre frecuencias activas &gt; 0 (n = 35 selecciones)</h4>
            <div style="height:36px;border-radius:10px;overflow:hidden;display:flex;margin-bottom:10px;">
              <div style="width:80%;background:var(--naranja);color:#fff;font-size:0.79rem;font-weight:700;display:flex;align-items:center;padding:0 10px;white-space:nowrap;overflow:hidden;">80,00% Positivas (28/28)</div>
              <div style="width:20%;background:var(--crimson);color:#fff;font-size:0.76rem;font-weight:700;display:flex;align-items:center;justify-content:center;">20%</div>
            </div>
            <div style="padding:16px;border-radius:12px;background:#161042;color:#fff;font-size:0.86rem;line-height:1.56;">
              <strong style="color:#FFB48E;display:block;margin-bottom:4px;">Razón de intensidad positiva/negativa: 19,1 a 1</strong>
              Las seis emociones líderes convergen entre 8,13 y 8,75 sobre 10, reflejando equilibrio armónico entre apertura, narrativa, música y coleccionables.
            </div>
          </div>
        </div>`;
    }

    // GRÁFICO 4: Valoración Global por Dimensión y Regla de Decisión
    const chart4El = document.getElementById("chart4Container");
    if (chart4El) {
      const dims = [
        { name: "Empaque FEFCO 0427 y apertura del sello 幸", note: "Sorpresa agradable (8,75) · Deseo (8,50) · Fascinación (8,13)", val: 8.46, col: "#E56020" },
        { name: "Dimensión COLECCIONA (Pines, separador, stickers)", note: "Deseo (8,50) · Orgullo (8,25) · Satisfacción (8,25)", val: 8.33, col: "#5A45D6" },
        { name: "Dimensión LEE (Obra literaria o manga curado)", note: "Inspiración (8,50) · Satisfacción (8,25) · Fascinación (8,13)", val: 8.29, col: "#1F1575" },
        { name: "Dimensión ESCUCHA (Canción original vía código QR)", note: "Sorpresa agradable (8,75) · Inspiración (8,50) · Nostalgia (7,00)", val: 8.08, col: "#34288F" },
        { name: "Dimensión REGALA (Tarjeta dedicatoria con sello 幸)", note: "Orgullo (8,25) · Satisfacción (8,25) · Nostalgia (7,00)", val: 7.83, col: "#187958" }
      ];

      chart4El.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:26px;align-items:start;">
          <div style="min-width:0;">
            ${dims
              .map(
                (d) => `
                <div style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:0.86rem;font-weight:700;color:var(--ink-primary);">
                    <span>${d.name}</span>
                    <span style="color:var(--indigo);flex-shrink:0;">${fmtNum(d.val)} / 10</span>
                  </div>
                  <div style="font-size:0.76rem;color:var(--ink-muted);margin-bottom:5px;">${d.note}</div>
                  <div style="height:14px;background:#F1ECF9;border-radius:999px;overflow:hidden;">
                    <div style="width:${d.val * 10}%;height:100%;background:${d.col};border-radius:999px;"></div>
                  </div>
                </div>`
              )
              .join("")}
            <p style="font-size:0.78rem;color:var(--ink-muted);margin:8px 0 0;">*Indicador asociativo complementario calculado sobre medias PREMO vinculadas teóricamente a cada dimensión.</p>
          </div>
          <div style="display:grid;gap:12px;min-width:0;">
            <div style="padding:18px;border-radius:14px;background:var(--emerald-bg);border:1px solid rgba(24,121,88,0.28);">
              <strong style="color:var(--emerald);display:block;font-size:0.95rem;margin-bottom:4px;">☑ DECISIÓN ESTRATÉGICA: MANTENER CON REFINAMIENTOS MENORES</strong>
              <p style="margin:0;font-size:0.86rem;color:var(--ink-body);line-height:1.55;">
                Cumple con holgura los dos umbrales del protocolo: media positiva <strong>8,20/10 ≥ 7,0</strong> y media negativa <strong>0,43/10 ≤ 3,0</strong>, con un Índice Complementario de Afinidad Global de <strong>88,86/100</strong>.
              </p>
            </div>
            <div style="padding:18px;border-radius:14px;background:var(--paper);border:1px solid var(--border-light);">
              <strong style="color:var(--indigo);display:block;font-size:0.9rem;margin-bottom:6px;">Ajustes tácticos derivados del análisis PREMO:</strong>
              <ul style="margin:0;padding-left:18px;font-size:0.85rem;line-height:1.58;color:var(--ink-body);">
                <li><strong>Potenciar Nostalgia (7,00 → &gt;8,0):</strong> Incorporar tarjeta fechada de cápsula de memoria y citas icónicas coleccionables.</li>
                <li><strong>Mitigar Miedo leve (2,00 → &lt;1,0):</strong> Visibilizar desglose previo contenido-precio y cunas troqueladas protectoras en el empaque FEFCO 0427.</li>
              </ul>
            </div>
          </div>
        </div>`;
    }

    // Tabla de asociación Emociones ↔ Atributos
    const attrBody = document.getElementById("attributeMapBody");
    if (attrBody) {
      attrBody.innerHTML = DATA.attributeEmotionMap
        .map(
          (item) => `
          <tr>
            <td><strong>${item.component}</strong><br><small style="color:var(--ink-muted);">${item.specs}</small></td>
            <td><strong style="color:var(--naranja);">${item.emotions}</strong></td>
            <td>${item.rationale}</td>
          </tr>`
        )
        .join("");
    }
  }

  /* ------------------------------------------------------------------------
     7. SIMULADOR INTERACTIVO EN VIVO PREMO (EXPORTACIÓN CSV PARA DEMO)
     ------------------------------------------------------------------------ */
  function initLiveSimulator() {
    if (!DATA) return;
    const posWrap = document.getElementById("simPosList");
    const negWrap = document.getElementById("simNegList");
    const summaryBtn = document.getElementById("simSummaryBtn");
    const exportBtn = document.getElementById("simExportCsvBtn");
    const resetBtn = document.getElementById("simResetBtn");
    const outBox = document.getElementById("simResultOutput");
    if (!posWrap || !negWrap) return;

    const liveScores = {};

    function renderGroup(container, list) {
      container.innerHTML = list
        .map(
          (e) => `
          <div class="sim-emo-row" id="sim-row-${e.id}">
            <div>
              <strong style="font-size:0.88rem;color:var(--ink-primary);">${e.id}. ${e.name}</strong>
              <small style="display:block;color:var(--ink-muted);font-size:0.76rem;">${e.def}</small>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <input type="range" min="0" max="10" step="0.5" value="0" data-emo-id="${e.id}" aria-label="Intensidad de ${e.name} (0 a 10)" style="width:92px;accent-color:var(--naranja);" />
              <output id="sim-val-${e.id}" style="min-width:28px;text-align:right;font-weight:700;font-size:0.84rem;color:var(--indigo);">0</output>
            </div>
          </div>`
        )
        .join("");

      container.querySelectorAll("input[type='range']").forEach((inp) => {
        inp.addEventListener("input", () => {
          const id = Number(inp.dataset.emoId);
          const v = Number(inp.value);
          if (v > 0) liveScores[id] = v;
          else delete liveScores[id];
          document.getElementById("sim-val-" + id).textContent = fmtNum(v, v % 1 === 0 ? 0 : 1);
          document.getElementById("sim-row-" + id).classList.toggle("has-val", v > 0);
        });
      });
    }

    renderGroup(posWrap, DATA.premoEmotions.slice(0, 7));
    renderGroup(negWrap, DATA.premoEmotions.slice(7, 14));

    if (summaryBtn && outBox) {
      summaryBtn.addEventListener("click", () => {
        const posVals = DATA.premoEmotions.slice(0, 7).map((e) => liveScores[e.id] || 0);
        const negVals = DATA.premoEmotions.slice(7, 14).map((e) => liveScores[e.id] || 0);
        const posAvg = posVals.reduce((a, b) => a + b, 0) / 7;
        const negAvg = negVals.reduce((a, b) => a + b, 0) / 7;
        const decision = posAvg >= 7 && negAvg <= 3 ? "MANTENER" : posAvg > negAvg ? "AJUSTAR" : "REDISEÑAR";
        outBox.style.display = "block";
        outBox.innerHTML = `<strong>Resultado de simulación en vivo:</strong> Media positiva = <strong>${fmtNum(posAvg)}/10</strong> · Media negativa = <strong>${fmtNum(negAvg)}/10</strong> · Regla sugerida: <strong>${decision}</strong>.`;
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const evLabel = (document.getElementById("simEvalSelect") || {}).value || "Participante";
        let csv = "Evaluador,Numero,Emocion,Valencia,Intensidad_0_a_10\n";
        DATA.premoEmotions.forEach((e) => {
          csv += `"${evLabel}",${e.id},"${e.name}","${e.valence}",${liveScores[e.id] || 0}\n`;
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `Simulacion_PREMO_${evLabel.replace(/\s+/g, "_")}_TintaSachi.csv`;
        a.click();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        Object.keys(liveScores).forEach((k) => delete liveScores[k]);
        document.querySelectorAll("#simPosList input, #simNegList input").forEach((inp) => {
          inp.value = "0";
          inp.dispatchEvent(new Event("input"));
        });
        if (outBox) outBox.style.display = "none";
      });
    }
  }

  /* ------------------------------------------------------------------------
     8. PESTAÑAS DEL MARCO TEÓRICO Y REFERENCIAS APA 7
     ------------------------------------------------------------------------ */
  function initTheoryAndReferences() {
    document.querySelectorAll("[data-theory-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.theoryTab;
        document.querySelectorAll("[data-theory-tab]").forEach((b) => b.classList.toggle("active", b === btn));
        document.querySelectorAll("[data-theory-panel]").forEach((p) => {
          p.style.display = p.dataset.theoryPanel === target ? "block" : "none";
        });
      });
    });

    const refsContainer = document.getElementById("apaReferencesGrid");
    if (refsContainer && DATA) {
      refsContainer.innerHTML = DATA.references
        .map((ref) => {
          const linked = ref.replace(
            /(https:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
          );
          return `<div class="ref-item">${linked}</div>`;
        })
        .join("");
    }

    document.querySelectorAll("details.simulator-accordion").forEach((det) => {
      const hint = det.querySelector(".simulator-summary span:last-child");
      if (!hint) return;
      const closedTxt = hint.textContent;
      det.addEventListener("toggle", () => {
        hint.textContent = det.open ? "Ocultar sección ↑" : closedTxt;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScrollReveal();
    initBoxExplorer();
    initFourDimensions();
    initConsumerAndJourney();
    initPremoAnalytics();
    initLiveSimulator();
    initTheoryAndReferences();
  });
})();
