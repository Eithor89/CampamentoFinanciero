// ==========================================
// AZOR FINANCIERO — Preguntas de la Expedicion
// ==========================================

const questions = [

    // SECCION 1: PROVISIONES DEL CAMPAMENTO (LIQUIDEZ)
    {
        id: "corriente",
        text: "¿Cuánto tienes en cuentas corrientes?",
        mountainText: "Tus provisiones básicas en el campamento base. ¡Lo que tienes a mano hoy mismo!",
        azorMessage: "¡Empezamos el inventario del campamento! Las cuentas corrientes son tus PROVISIONES INMEDIATAS. Es lo que tienes disponible en cualquier momento para el día a día de la expedición. ¿Cuántas provisiones tienes ahora mismo?",
        icon: "🥪",
        type: "currency",
        section: "cash",
        sectionTitle: "Provisiones",
        sectionIcon: "🏕️",
        category: "asset"
    },
    {
        id: "ahorro",
        text: "¿Cuánto tienes en cuentas de ahorro?",
        mountainText: "Tus barritas energéticas. Ese impulso de energía cuando más lo necesitas.",
        azorMessage: "Las cuentas de ahorro son tus barritas energéticas. No las comes a diario, pero si surge una tormenta inesperada en la ruta... ¡las agradecerás muchísimo! ¿Cuántas barritas energéticas tienes?",
        icon: "🍫",
        type: "currency",
        section: "cash",
        sectionTitle: "Provisiones",
        sectionIcon: "🏕️",
        category: "asset"
    },

    // SECCION 2: EQUIPAMIENTO DE ASCENSO (INVERSIONES)
    {
        id: "investments",
        text: "¿Cuánto valen tus inversiones? (bolsa, fondos, ETF, cripto...)",
        mountainText: "Tus bastones de trekking. ¡Con cada paso que das, te impulsan más arriba y más rápido!",
        azorMessage: "¡Un buen equipamiento es la clave para poder llegar a la cima, explorador! Las inversiones son tus bastones de trekking. Cada euro invertido te ayuda, empujándote hacia la cima. ¿Cuánto valen tus bastones?",
        icon: "🧗",
        type: "currency",
        section: "investments",
        sectionTitle: "Equipamiento",
        sectionIcon: "⛏️",
        category: "asset"
    },
    {
        id: "retirement",
        text: "¿Cuánto tienes en planes de pensiones, seguros de ahorro u otros productos similares?",
        mountainText: "Tu brújula y mapa para el tramo final. Esencial para no perderte cuando más lo necesites.",
        azorMessage: "Los planes de pensiones son tu BRÚJULA Y MAPA para la parte más alta de la montaña. No los necesitas hoy, pero cuando llegues al tramo final de la ruta... serán tu guía más valiosa. ¿Cuánto vale tu brújula?",
        icon: "🧭",
        type: "currency",
        section: "investments",
        sectionTitle: "Equipamiento",
        sectionIcon: "⛏️",
        category: "asset"
    },

    // SECCION 3: REFUGIOS Y VEHICULOS (BIENES)
    {
        id: "homeValue",
        text: "¿Cuánto valen tus inmuebles? (si no lo sabes, pon cuanto te costaron)",
        mountainText: "Tus refugios de montaña. Sólidos, seguros y capaces de ganar valor con el tiempo.",
        azorMessage: "Los inmuebles son refugios donde resguardarse: sólidos, resistentes. Un lugar donde tomar un descanso antes de continuar el ascenso. ¿Cuánto valen tus refugios?",
        icon: "🏠",
        type: "currency",
        section: "property",
        sectionTitle: "Refugios",
        sectionIcon: "🏔️",
        category: "asset"
    },
    {
        id: "carValue",
        text: "¿Cuánto valen tus vehículos aproximadamente? (Puedes usar el valor venal como referencia)",
        mountainText: "Tu vehículo todoterreno. Útil para llegar a la montaña, aunque se oxida con el tiempo.",
        azorMessage: "¡El todoterreno de la expedición! El coche es útil, pero tiene un defecto: pierde valor con cada kilómetro. ¿Cuánto vale aproximadamente?",
        icon: "🚗",
        type: "currency",
        section: "property",
        sectionTitle: "Vehiculos",
        sectionIcon: "🏔️",
        category: "asset"
    },
    {
        id: "loansToOthers",
        text: "¿Cuánto dinero te deben otras personas? (que creas que te van a devolver)",
        mountainText: "Provisiones prestadas a compañeros de ruta. Son tuyas, pero están en otras mochilas.",
        azorMessage: "A veces prestamos provisiones a compañeros de ruta, para ayudarles a continuar. Si has prestado una navaja, un mechero, o dinero a un amigo... Están temporalmente en la mochila de otra persona, pero siguen siendo tuyos. ¿Cuántas provisiones tuyas tienen otros compañeros?",
        icon: "🤝",
        type: "currency",
        section: "property",
        sectionTitle: "Prestados",
        sectionIcon: "🏔️",
        category: "asset"
    },

    // SECCION 4: EL PESO DE LA MOCHILA (DEUDAS)
    {
        id: "mortgage",
        text: "¿Cuánto capital queda pendiente de tu hipoteca?",
        mountainText: "Las piedras más grandes de tu mochila. Pesadas, pero las llevas para tener refugio propio.",
        azorMessage: "Ahora revisemos el peso de tu mochila... La hipoteca son las PIEDRAS MAS GRANDES de tu carga. Pesan mucho, sí, pero las llevas por una buena razon: construir tu refugio. ¿Cuántas piedras te quedan por cargar?",
        icon: "🪨",
        type: "currency",
        section: "debts",
        sectionTitle: "Peso",
        sectionIcon: "⚠️",
        category: "debt"
    },
    {
        id: "bankLoan",
        text: "¿Cuánto debes en préstamos personales o bancarios?",
        mountainText: "Equipamiento extra que pediste prestado. Hay que devolvérselo al proveedor con intereses!",
        azorMessage: "Una mochila nueva, unas botas de montaña... Los prestamos bancarios son EQUIPAMIENTO EXTRA que pediste prestado para avanzar mas rapido. Útil en su momento, pero hay que devolverlo a quien te lo dejó, y con intereses. ¿Cuánto debes en total?",
        icon: "🥾",
        type: "currency",
        section: "debts",
        sectionTitle: "Peso",
        sectionIcon: "⚠️",
        category: "debt"
    },
    {
        id: "carLoan",
        text: "¿Cuánto debes del préstamo de tus vehículos?",
        mountainText: "El peso del todoterreno que aún no has terminado de pagar.",
        azorMessage: "Si financiaste el todo-terreno, aun cargas con el PESO DE LA FINANCIACION. Es como llevar los recambios del coche en la mochila hasta terminar de pagarlo. ¿Cuántas piezas de recambio cargas?",
        icon: "⚙️",
        type: "currency",
        section: "debts",
        sectionTitle: "Peso",
        sectionIcon: "⚠️",
        category: "debt"
    },
    {
        id: "familyDebt",
        text: "¿Cuánto debes a familiares o amigos?",
        mountainText: "Provisiones que el equipo te prestó. No les falles a tus compañeros de ruta!",
        azorMessage: "A veces el equipo nos ayuda en los momentos más difíciles de la ruta. Si te prestaron dinero, son PROVISIONES DEL EQUIPO que debes devolver. Los buenos compañeros merecen que no les fallemos! ¿Cuánto equipo tienes que devolver?",
        icon: "👥",
        type: "currency",
        section: "debts",
        sectionTitle: "Peso",
        sectionIcon: "⚠️",
        category: "debt"
    },
    {
        id: "creditCardDebt",
        text: "¿Cuánto debes en tarjetas de crédito o préstamos al consumo? (aunque sean sin intereses)",
        mountainText: "Provisiones pedidas a crédito. No son tan pesadas como las piedras, pero se acumulan.",
        azorMessage: "A veces necesitamos provisiones de emergencia y las tienes que pedir en la tienda de suministros con la promesa de que volverás a pagarlas. Las tarjetas de crédito son SUMINISTROS DE EMERGENCIA a crédito. Muy útiles en apuros, pero si no pagas a final de mes, los intereses se acumulan sumando peso a tu mochila. ¿Cuánto debes actualmente?",
        icon: "🥫",
        type: "currency",
        section: "debts",
        sectionTitle: "Peso",
        sectionIcon: "⚠️",
        category: "debt"
    },

    // SECCION 5: RITMO DE ASCENSO (INGRESOS Y GASTOS)
    {
        id: "monthlyIncome",
        text: "¿Cuáles son tus ingresos mensuales netos? (después de impuestos)",
        mountainText: "Tu velocidad de ascenso. Lo que avanzas cada mes.",
        azorMessage: "¡Ya casi llegamos a la cumbre, explorador! Los ingresos mensuales son tu VELOCIDAD DE ASCENSO. Cuantos más ingresos, más rápido puedes avanzar hacia la cima. ¿Con cuánta fuerza avanzas cada mes?",
        icon: "🏃",
        type: "currency",
        section: "income",
        sectionTitle: "Ritmo",
        sectionIcon: "🧗",
        category: "income"
    },
    {
        id: "monthlyExpenses",
        text: "¿Cuáles son tus gastos mensuales totales aproximadamente?",
        mountainText: "El peso que cargamos cada mes. Cuanto menos peso innecesario, más rápido subimos.",
        azorMessage: "Última pregunta de la expedición! Cada noche de la ruta, al pararnos a dormir, el peso que llevamos nos arrastra pendiente abajo. Los gastos mensuales es lo que retrocedemos cada noche (y que al día siguiente tendremos que volver a ascender). Cuanto menos peso innecesario llevemos, más rapido y con menos esfuerzo llegaremos a la cumbre. ¿Cuánto desciendes cada mes?",
        icon: "🍂",
        type: "currency",
        section: "income",
        sectionTitle: "Ritmo",
        sectionIcon: "🧗",
        category: "income"
    }
];
