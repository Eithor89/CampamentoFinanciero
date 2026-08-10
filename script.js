// ==========================================
// AZOR FINANCIERO — Lógica de la Expedición
// ==========================================

// Elementos DOM
const welcomeScreen = document.getElementById("welcomeScreen");
const expeditionScreen = document.getElementById("expeditionScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const userNameInput = document.getElementById("userNameInput");

// Elementos Expedición
const questionForm = document.getElementById("questionForm");
const answerInput = document.getElementById("answerInput");
const questionTitle = document.getElementById("questionTitle");
const mountainContext = document.getElementById("mountainContext");
const azorMessage = document.getElementById("azorMessage");
const sectionBadge = document.getElementById("sectionBadge");
const sectionIcon = document.getElementById("sectionIcon");
const sectionTitleText = document.getElementById("sectionTitleText");
const questionIcon = document.getElementById("questionIcon");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const headerUsername = document.getElementById("headerUsername");
const sectionLabel = document.getElementById("sectionLabel");
const charIndicator = document.getElementById("charIndicator");

// Botones navegación
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const restartBtn = document.getElementById("restartBtn");
const exportJpegBtn = document.getElementById("exportJpegBtn");

// Estado de la aplicación
let userName = "Explorador";
let currentQuestionIndex = 0;
const answers = {};
let donutChart = null;

// ==========================================
// 1. INICIALIZACIÓN Y BIENVENIDA
// ==========================================

function createStars() {
    const container = document.getElementById('starsContainer');
    if(!container) return;
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.setProperty('--dur', `${Math.random() * 3 + 1}s`);
        star.style.setProperty('--del', `${Math.random() * 2}s`);
        container.appendChild(star);
    }
}
createStars();

function startExpedition() {
    const name = userNameInput.value.trim();
    if (name !== "") userName = name;
    
    headerUsername.innerText = userName;
    document.getElementById("resultUsername").innerText = userName;
    
    welcomeScreen.classList.remove("active");
    expeditionScreen.classList.add("active");
    
    showQuestion();
}

startButton.addEventListener("click", startExpedition);
userNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        startExpedition();
    }
});

// ==========================================
// 2. LÓGICA DEL CUESTIONARIO (EXPEDICIÓN)
// ==========================================

function updateMapProgress(index) {
    // Puntos clave en el mapa SVG:
    // Base: 150, 372
    // Bosque: 136, 285
    // Pradera: 136, 214
    // Pared: 145, 154
    // Cumbre: 150, 92
    
    const totalQ = questions.length;
    const p = index / (totalQ - 1);
    
    let x, y;
    if (p < 0.25) { // Base a Bosque
        const localP = p / 0.25;
        x = 150 + (136 - 150) * localP;
        y = 372 + (285 - 372) * localP;
    } else if (p < 0.5) { // Bosque a Pradera
        const localP = (p - 0.25) / 0.25;
        x = 136 + (136 - 136) * localP;
        y = 285 + (214 - 285) * localP;
    } else if (p < 0.75) { // Pradera a Pared
        const localP = (p - 0.5) / 0.25;
        x = 136 + (145 - 136) * localP;
        y = 214 + (154 - 214) * localP;
    } else { // Pared a Cumbre
        const localP = (p - 0.75) / 0.25;
        x = 145 + (150 - 145) * localP;
        y = 154 + (92 - 154) * localP;
    }
    
    // Curva ligera para suavizar
    const offsetX = Math.sin(p * Math.PI) * 10;
    
    if (charIndicator) {
        charIndicator.setAttribute("transform", `translate(${x - offsetX}, ${y})`);
    }
}

function updateCheckpoints(index) {
    const totalQ = questions.length;
    const p = index / (totalQ - 1);
    
    for (let i = 1; i <= 4; i++) {
        const cp = document.getElementById(`cp-${i}`);
        if(cp) {
            const circle = cp.querySelector('circle');
            if (p >= i * 0.25) {
                circle.setAttribute('fill', '#ffd700');
                circle.setAttribute('stroke', '#2c1a0e');
            } else {
                circle.setAttribute('fill', '#2d5016');
                circle.setAttribute('stroke', '#c9a227');
            }
        }
    }
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    
    // UI Updates
    questionTitle.innerText = q.text;
    mountainContext.innerText = q.mountainText;
    questionIcon.innerText = q.icon || "💰";
    
    sectionIcon.innerText = q.sectionIcon;
    sectionTitleText.innerText = q.sectionTitle;
    sectionLabel.innerText = q.sectionTitle.split(' ')[0]; // Primera palabra
    
    // Animaciones
    sectionBadge.style.animation = 'none';
    sectionBadge.offsetHeight; /* trigger reflow */
    sectionBadge.style.animation = null;
    
    const bubble = document.getElementById('azorBubble');
    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = null;
    
    // Texto de Azor con nombre personalizado
    let msg = q.azorMessage || "";
    msg = msg.replace(/explorador/gi, userName);
    azorMessage.innerHTML = msg;
    
    // Progreso
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
    
    // Valor input
    answerInput.value = answers[q.id] !== undefined ? answers[q.id] : "";
    
    // Botón atrás
    backButton.style.visibility = currentQuestionIndex === 0 ? "hidden" : "visible";
    
    // Botón siguiente / finalizar
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "¡Terminar Ascenso! 🏁";
    } else {
        nextButton.innerHTML = "Siguiente ►";
    }
    
    // Actualizar mapa
    updateMapProgress(currentQuestionIndex);
    updateCheckpoints(currentQuestionIndex);
    
}

function saveAnswer() {
    const q = questions[currentQuestionIndex];
    const val = parseFloat(answerInput.value) || 0;
    answers[q.id] = val;
    answerInput.blur();
}

questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveAnswer();
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        calculateAndShowResults();
    }
});

backButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        saveAnswer();
        currentQuestionIndex--;
        showQuestion();
    }
});


// ==========================================
// 3. CÁLCULO Y RESULTADOS (DASHBOARD)
// ==========================================

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
};

function calculateAndShowResults() {
    expeditionScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    // ==========================================
    // Cálculos Financieros
    // ==========================================
    
    // Activo Corriente (Liquidez)
    const activoCorriente = (answers["corriente"] || 0) + (answers["ahorro"] || 0);
    
    // Activo No Corriente (Inversiones y Bienes)
    const inversiones = (answers["investments"] || 0) + (answers["retirement"] || 0);
    const bienes = (answers["homeValue"] || 0) + (answers["carValue"] || 0) + (answers["loansToOthers"] || 0);
    const activoNoCorriente = inversiones + bienes;
    
    const activosTotales = activoCorriente + activoNoCorriente;
    
    // Pasivo Largo Plazo (Hipotecas, préstamos)
    const pasivoLargo = (answers["mortgage"] || 0) + (answers["bankLoan"] || 0) + (answers["carLoan"] || 0) + (answers["familyDebt"] || 0);
    
    // Pasivo Corto Plazo (Tarjetas)
    const pasivoCorto = (answers["creditCardDebt"] || 0);
    
    const pasivosTotales = pasivoLargo + pasivoCorto;
    
    // Patrimonio Neto
    const patrimonioNeto = activosTotales - pasivosTotales;
    
    // Ingresos y Gastos
    const ingresos = answers["monthlyIncome"] || 0;
    const gastos = answers["monthlyExpenses"] || 0;
    const ahorroMensual = ingresos - gastos;
    const tasaAhorro = ingresos > 0 ? (ahorroMensual / ingresos) * 100 : 0;

    // ==========================================
    // Actualizar UI del Dashboard
    // ==========================================
    
    
    // KPIs Principales
    document.getElementById("kpiPatrimonio").innerText = formatCurrency(patrimonioNeto);
    document.getElementById("kpiActivos").innerText = formatCurrency(activosTotales);
    document.getElementById("kpiPasivos").innerText = formatCurrency(pasivosTotales);
    
    const kpiAhorroElem = document.getElementById("kpiAhorro");
    kpiAhorroElem.innerText = `${tasaAhorro.toFixed(1)}%`;
    
    // Tendencias/Notas
    if (patrimonioNeto > 0) {
        document.getElementById("kpiPatrimonioTrend").innerHTML = `<span style="color:var(--success)">▲ +Positivo</span>`;
    } else {
        document.getElementById("kpiPatrimonioTrend").innerHTML = `<span style="color:var(--danger)">▼ -Negativo</span>`;
    }
    
    const kpiAhorroNote = document.getElementById("kpiAhorroNote");
    if (tasaAhorro >= 20) {
        kpiAhorroNote.innerHTML = "¡Excelente ritmo! 🚀";
        kpiAhorroElem.style.color = "var(--success-dark)";
    } else if (tasaAhorro > 0) {
        kpiAhorroNote.innerHTML = "Avanzando seguro 👍";
    } else {
        kpiAhorroNote.innerHTML = "Cuidado, perdiendo altura ⚠️";
        kpiAhorroElem.style.color = "var(--danger)";
    }
    
    // Resumen Bottom
    document.getElementById("bottomIngresos").innerText = formatCurrency(ingresos);
    document.getElementById("bottomGastos").innerText = formatCurrency(gastos);
    document.getElementById("bottomActivoCorriente").innerText = formatCurrency(activoCorriente);
    document.getElementById("bottomActivoNoCorriente").innerText = formatCurrency(activoNoCorriente);
    document.getElementById("bottomPasivoLargo").innerText = formatCurrency(pasivoLargo);
    document.getElementById("bottomPasivoCorto").innerText = formatCurrency(pasivoCorto);
    
    // Consejos Dinámicos
    const tipText = document.getElementById("azorTip");
    if (tipText) {
        if (activoCorriente < gastos * 3) {
            tipText.innerText = "No tienes barritas energéticas. Reserva suficientes para cubrir al menos 3 a 6 meses de provisiones.";
        } else if (pasivoCorto > 0) {
            tipText.innerText = "Esa deuda de tarjeta es como llevar rocas en la mochila bajo una tormenta. ¡Prioriza pagarla para avanzar más ligero!";
        } else if (tasaAhorro < 10 && tasaAhorro > 0) {
            tipText.innerText = "Vas por buen camino, pero tu ritmo es algo lento. Revisa si puedes aligerar peso mensual (gastos) para escalar más rápido.";
        } else if (patrimonioNeto < 0) {
            tipText.innerText = "Estás en la base del valle, pero la montaña se escala paso a paso. Enfócate en liquidar deudas (quitar peso) antes de invertir.";
        } else {
            tipText.innerText = `¡Impresionante mochila, ${userName}! Tienes un equilibrio excelente. Sigue con este ritmo constante y la cumbre será tuya.`;
        }
    }
    

    // ==========================================
    // Mapa de Milestones (Expedición)
    // ==========================================

const milestoneChecks = [
    {
        fulfilled: activoCorriente >= gastos * 3,
        left: 10,
        top: 76,
        transform: "scaleX(-1)"
    },
    {
        fulfilled: pasivoCorto < ingresos,
        left: 23,
        top: 54,
        transform: "scaleX(-1)"
    },
    {
        fulfilled: patrimonioNeto >= gastos * 12,
        left: 46,
        top: 47,
        transform: "scaleX(-1)"
    },
    {
        fulfilled: inversiones >= gastos * 120,
        left: 66,
        top: 29,
        transform: "scaleX(-1)"
    },
    {
        fulfilled: inversiones >= gastos * 300,
        left: 51,
        top: 8,
        transform: "scaleX(-1)"
    }
];

const mapCharacter = document.querySelector(".maploc-char");

let characterPosition = {
    left: 80,
    top: 82,
    transform: "scaleX(1)"
};

milestoneChecks.forEach(ms => {
    if (ms.fulfilled) {
        characterPosition.left = ms.left;
        characterPosition.top = ms.top;
        characterPosition.transform = ms.transform;
        console.log(ms.fulfilled)
    }
});

mapCharacter.style.left = characterPosition.left + "%";
mapCharacter.style.top = characterPosition.top + "%";
mapCharacter.style.transform = characterPosition.transform;

// Colocamos el personaje en esa posición
mapCharacter.style.left = characterPosition.left + "%";
mapCharacter.style.top = characterPosition.top + "%";
mapCharacter.style.transform = characterPosition.transform;

    // ==========================================
    // Gráfico de Dona (Chart.js)
    // ==========================================
    
    const donutCanvas = document.getElementById('donutChart');
    if (!donutCanvas) return;
    const ctx = donutCanvas.getContext('2d');
    
    // Preparar datos (solo activos para ver distribución de mochila positiva, o todo)
    // Vamos a mostrar la distribución de Activos (Inversiones, Efectivo, Vivienda, Vehículo, Otros)
    const valEfectivo = activoCorriente;
    const valInversiones = inversiones;
    const valVivienda = answers["homeValue"] || 0;
    const valVehiculo = answers["carValue"] || 0;
    const valOtros = answers["loansToOthers"] || 0;
    
    const totalPositivo = valEfectivo + valInversiones + valVivienda + valVehiculo + valOtros;
    
    const dataValues = [valInversiones, valEfectivo, valVivienda, valVehiculo, valOtros];
    const dataLabels = ['Inversiones', 'Efectivo', 'Vivienda', 'Vehículos', 'Otros'];
    const dataColors = ['#52b788', '#4cc9f0', '#f4a261', '#9b5de5', '#e76f51'];
    
    // Limpiar 0s para que no salgan en leyenda
    const fValues = [];
    const fLabels = [];
    const fColors = [];
    
    for(let i=0; i<dataValues.length; i++) {
        if(dataValues[i] > 0 || totalPositivo === 0) { // Si todo es 0, dejamos uno
            fValues.push(dataValues[i]);
            fLabels.push(dataLabels[i]);
            fColors.push(dataColors[i]);
        }
    }
    if(totalPositivo === 0) fValues[0] = 1; // dummy para mostrar algo
    
    if (donutChart) donutChart.destroy();
    
    donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: fLabels,
            datasets: [{
                data: fValues,
                backgroundColor: fColors,
                borderWidth: 3,
                borderColor: '#2c1a0e', // pixel border
                hoverOffset: 4
            }]
        },
        options: {
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    bodyFont: { family: "'VT323', monospace", size: 16 },
                    titleFont: { family: "'VT323', monospace", size: 18 },
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) label += ': ';
                            if (totalPositivo > 0) {
                                label += formatCurrency(context.raw);
                            } else {
                                label += "0 €";
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    
    // Generar Leyenda HTML
    const legendContainer = document.getElementById("donutLegend");
    if (legendContainer) {
        legendContainer.innerHTML = "";
        
        fLabels.forEach((label, i) => {
            const val = fValues[i];
            let pct = 0;
            if (totalPositivo > 0) {
                pct = ((val / totalPositivo) * 100).toFixed(0);
            }
            
            const html = `
                <div class="legend-item">
                    <div class="legend-dot" style="background-color: ${fColors[i]}"></div>
                    <div><strong>${label}</strong> <span style="font-size:0.85em; color:var(--text-muted)">${pct}% (${totalPositivo > 0 ? formatCurrency(val) : '0 €'})</span></div>
                </div>
            `;
            legendContainer.innerHTML += html;
        });
    }
    
    const donutComment = document.getElementById("donutComment");
    if (donutComment) {
        if (totalPositivo === 0) {
            donutComment.innerText = "Tu mochila está vacía. ¡Es hora de empezar a recolectar provisiones!";
        } else if (valVivienda > (totalPositivo * 0.7)) {
            donutComment.innerText = "Gran parte de tu mochila es un refugio (vivienda). ¡Recuerda llevar provisiones líquidas!";
        } else if (valInversiones > (totalPositivo * 0.4)) {
            donutComment.innerText = "¡Buen equilibrio! Llevas excelentes bastones (inversiones) para el ascenso.";
        } else {
            donutComment.innerText = "Mochila bien distribuida. ¡Listo para la ruta!";
        }
    }
}

// ==========================================
// 4. FUNCIONALIDADES EXTRA
// ==========================================

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    // Reset answers
    for (const key in answers) delete answers[key];
    
    resultScreen.classList.remove("active");
    welcomeScreen.classList.add("active");
});

exportJpegBtn.addEventListener("click", () => {
    const element = document.querySelector('.dashboard-main');
    if (!element) return;

    document.body.classList.add('is-exporting');

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0f1923'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `campamento_financiero_${userName.toLowerCase().replace(/\s+/g, '_')}.jpeg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
        document.body.classList.remove('is-exporting');
    }).catch(err => {
        console.error("JPEG export error:", err);
        document.body.classList.remove('is-exporting');
    });
});