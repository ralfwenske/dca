// Comprehensive translations for BTC DCA Calculator
const translations = {
    en: {
        // Page title
        pageTitle: "BTC DCA Calculator",
        
        // Main heading
        mainHeading: "BTC-DCA Investment Performance",
        
        // About DCA button
        aboutDCA: "About DCA",
        
        // Form labels
        startDate: "Start Date",
        endDate: "End Date",
        investmentAmount: "Investment Amount ($)",
        interval: "Interval (weeks)",
        
        // Results section
        totalInvested: "Total Invested ($)",
        returnOnInvestment: "Return on Investment",
        currentValue: "Current Value ($)",
        totalBtcAccumulated: "Total BTC Accumulated",
        
        // Footer text
        calculationBasedOn: "Calculation based on daily price data from",
        
        // Alert messages
        dataNotLoaded: "BTC-USD.csv data is not loaded.",
        
        // Dynamic text
        summaryText: "Had you bought ${amount} worth of BTC every ${interval} week${plural}<br>starting ${startMonth} ${startYear} for ~ ${months} month${monthsPlural}",
        resultsHeading: "You would have ended up in ${endMonth} ${endYear} with:",
        
        // Month names
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        
        // Language selector
        languageSelector: "Language",
        
        // Modal content (existing translations)
        modalTitle: "About Dollar-Cost Averaging (DCA) with Bitcoin",
        intro: "Dollar-Cost Averaging is a simple investment strategy where you invest a fixed amount of money at regular intervals, regardless of the price. It's like setting up a savings plan, but instead of putting money in a bank account, you're buying Bitcoin.",
        successKey: "A key to successful DCA is to only invest money you won't need for an extended period. As the chart demonstrates, Bitcoin's volatility can lead to short-term losses. 'Hodling' (holding on) means maintaining your investment strategy, as Bitcoin's long-term value tends to increase due to its limited supply of 21 million coins.",
        whyDCA: "Why DCA?",
        whyDCAPoints: [
            "It's automatic and requires no market timing",
            "It reduces the impact of price volatility",
            "It's perfect for regular savings",
            "It works with any amount you can afford"
        ],
        aboutBitcoin: "About Bitcoin",
        bitcoinDesc: "Bitcoin is a digital currency that operates without a central bank. Think of it as digital gold - it's scarce, can't be copied, and its value is determined by supply and demand.",
        whatShows: "What This Calculator Shows",
        whatShowsPoints: [
            "Started investing a fixed amount (like $100)",
            "Bought Bitcoin regularly (weekly, monthly, etc.)",
            "Held onto your investment"
        ],
        pastData: "The results show real historical data - what actually happened in the past, not predictions about the future.",
        whyPast: "Why Look at the Past?",
        pastDesc: "While past performance doesn't guarantee future results, looking at historical data helps us understand how Bitcoin's value has changed over time and how regular investing might have worked out.",
        importantNote: "Important Note",
        disclaimer: "This is an educational tool to understand the concept of DCA. It's not financial advice, and you should always do your own research before investing."
    },
    de: {
        pageTitle: "BTC DCA Rechner",
        mainHeading: "BTC-DCA Anlageperformance",
        aboutDCA: "Über DCA",
        startDate: "Startdatum",
        endDate: "Enddatum",
        investmentAmount: "Anlagebetrag (€)",
        interval: "Intervall (Wochen)",
        totalInvested: "Gesamt investiert (€)",
        returnOnInvestment: "Kapitalrendite",
        currentValue: "Aktueller Wert (€)",
        totalBtcAccumulated: "Gesamte BTC angesammelt",
        calculationBasedOn: "Berechnung basierend auf täglichen Preisdaten von",
        dataNotLoaded: "BTC-USD.csv Daten sind nicht geladen.",
        summaryText: "Hätten Sie ${amount} BTC alle ${interval} Woche${plural}<br>ab ${startMonth} ${startYear} für ~ ${months} Monat${monthsPlural} gekauft",
        resultsHeading: "Sie hätten in ${endMonth} ${endYear} geendet mit:",
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        languageSelector: "Sprache",
        modalTitle: "Über Dollar-Cost Averaging (DCA) mit Bitcoin",
        intro: "Dollar-Cost Averaging ist eine einfache Anlagestrategie, bei der Sie regelmäßig einen festen Betrag investieren, unabhängig vom Preis. Es ist wie ein Sparplan, aber statt Geld auf ein Bankkonto zu legen, kaufen Sie Bitcoin.",
        successKey: "Ein Schlüssel zum erfolgreichen DCA ist, nur Geld zu investieren, das Sie für einen längeren Zeitraum nicht benötigen. Wie das Diagramm zeigt, kann die Volatilität von Bitcoin zu kurzfristigen Verlusten führen. 'Hodling' (Festhalten) bedeutet, an Ihrer Anlagestrategie festzuhalten, da der langfristige Wert von Bitcoin aufgrund des begrenzten Angebots von 21 Millionen Coins tendenziell steigt.",
        whyDCA: "Warum DCA?",
        whyDCAPoints: [
            "Es ist automatisch und erfordert kein Market Timing",
            "Es reduziert die Auswirkungen von Preisschwankungen",
            "Es ist perfekt für regelmäßiges Sparen",
            "Es funktioniert mit jedem Betrag, den Sie sich leisten können"
        ],
        aboutBitcoin: "Über Bitcoin",
        bitcoinDesc: "Bitcoin ist eine digitale Währung, die ohne Zentralbank funktioniert. Denken Sie daran als digitales Gold - es ist knapp, kann nicht kopiert werden, und sein Wert wird durch Angebot und Nachfrage bestimmt.",
        whatShows: "Was dieser Rechner zeigt",
        whatShowsPoints: [
            "Beginn der Investition eines festen Betrags (z.B. 100€)",
            "Regelmäßiger Kauf von Bitcoin (wöchentlich, monatlich, etc.)",
            "Halten der Investition"
        ],
        pastData: "Die Ergebnisse zeigen echte historische Daten - was tatsächlich in der Vergangenheit passiert ist, keine Vorhersagen für die Zukunft.",
        whyPast: "Warum in die Vergangenheit schauen?",
        pastDesc: "Während vergangene Ergebnisse keine Garantie für die Zukunft sind, hilft uns der Blick auf historische Daten zu verstehen, wie sich der Wert von Bitcoin im Laufe der Zeit verändert hat und wie regelmäßiges Investieren funktioniert haben könnte.",
        importantNote: "Wichtiger Hinweis",
        disclaimer: "Dies ist ein Bildungsinstrument zum Verständnis des DCA-Konzepts. Es ist keine Finanzberatung, und Sie sollten immer eigene Recherchen durchführen, bevor Sie investieren."
    },
    es: {
        pageTitle: "Calculadora BTC DCA",
        mainHeading: "Rendimiento de Inversión BTC-DCA",
        aboutDCA: "Sobre DCA",
        startDate: "Fecha de Inicio",
        endDate: "Fecha de Fin",
        investmentAmount: "Cantidad de Inversión ($)",
        interval: "Intervalo (semanas)",
        totalInvested: "Total Invertido ($)",
        returnOnInvestment: "Retorno de Inversión",
        currentValue: "Valor Actual ($)",
        totalBtcAccumulated: "Total BTC Acumulado",
        calculationBasedOn: "Cálculo basado en datos de precios diarios de",
        dataNotLoaded: "Los datos BTC-USD.csv no están cargados.",
        summaryText: "Si hubieras comprado ${amount} de BTC cada ${interval} semana${plural}<br>comenzando ${startMonth} ${startYear} por ~ ${months} mes${monthsPlural}",
        resultsHeading: "Habrías terminado en ${endMonth} ${endYear} con:",
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        languageSelector: "Idioma",
        modalTitle: "Sobre Promedio de Costo en Dólares (DCA) con Bitcoin",
        intro: "El Promedio de Costo en Dólares es una estrategia de inversión simple donde inviertes una cantidad fija de dinero a intervalos regulares, sin importar el precio. Es como establecer un plan de ahorro, pero en lugar de poner dinero en una cuenta bancaria, estás comprando Bitcoin.",
        successKey: "Una clave para el DCA exitoso es invertir solo dinero que no necesitarás por un período prolongado. Como demuestra el gráfico, la volatilidad de Bitcoin puede llevar a pérdidas a corto plazo. 'Hodling' (mantener) significa mantener tu estrategia de inversión, ya que el valor a largo plazo de Bitcoin tiende a aumentar debido a su oferta limitada de 21 millones de monedas.",
        whyDCA: "¿Por qué DCA?",
        whyDCAPoints: [
            "Es automático y no requiere timing de mercado",
            "Reduce el impacto de la volatilidad de precios",
            "Es perfecto para ahorros regulares",
            "Funciona con cualquier cantidad que puedas permitirte"
        ],
        aboutBitcoin: "Sobre Bitcoin",
        bitcoinDesc: "Bitcoin es una moneda digital que opera sin un banco central. Piensa en ella como oro digital - es escasa, no se puede copiar, y su valor está determinado por la oferta y la demanda.",
        whatShows: "Lo que muestra esta calculadora",
        whatShowsPoints: [
            "Comenzó a invertir una cantidad fija (como $100)",
            "Compró Bitcoin regularmente (semanal, mensual, etc.)",
            "Mantuvo su inversión"
        ],
        pastData: "Los resultados muestran datos históricos reales - lo que realmente sucedió en el pasado, no predicciones sobre el futuro.",
        whyPast: "¿Por qué mirar el pasado?",
        pastDesc: "Aunque el rendimiento pasado no garantiza resultados futuros, mirar los datos históricos nos ayuda a entender cómo el valor de Bitcoin ha cambiado con el tiempo y cómo la inversión regular podría haber funcionado.",
        importantNote: "Nota importante",
        disclaimer: "Esta es una herramienta educativa para entender el concepto de DCA. No es asesoramiento financiero, y siempre debes hacer tu propia investigación antes de invertir."
    },
    fr: {
        pageTitle: "Calculateur BTC DCA",
        mainHeading: "Performance d'Investissement BTC-DCA",
        aboutDCA: "À propos de DCA",
        startDate: "Date de Début",
        endDate: "Date de Fin",
        investmentAmount: "Montant d'Investissement (€)",
        interval: "Intervalle (semaines)",
        totalInvested: "Total Investi (€)",
        returnOnInvestment: "Retour sur Investissement",
        currentValue: "Valeur Actuelle (€)",
        totalBtcAccumulated: "Total BTC Accumulé",
        calculationBasedOn: "Calcul basé sur les données de prix quotidiennes de",
        dataNotLoaded: "Les données BTC-USD.csv ne sont pas chargées.",
        summaryText: "Si vous aviez acheté ${amount} de BTC toutes les ${interval} semaine${plural}<br>en commençant ${startMonth} ${startYear} pendant ~ ${months} mois${monthsPlural}",
        resultsHeading: "Vous auriez fini en ${endMonth} ${endYear} avec:",
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        languageSelector: "Langue",
        modalTitle: "À propos de la Moyenne de Coût en Dollars (DCA) avec Bitcoin",
        intro: "La Moyenne de Coût en Dollars est une stratégie d'investissement simple où vous investissez un montant fixe d'argent à intervalles réguliers, quel que soit le prix. C'est comme établir un plan d'épargne, mais au lieu de mettre de l'argent dans un compte bancaire, vous achetez du Bitcoin.",
        successKey: "Une clé pour un DCA réussi est de n'investir que de l'argent dont vous n'aurez pas besoin pendant une période prolongée. Comme le démontre le graphique, la volatilité du Bitcoin peut entraîner des pertes à court terme. 'Hodling' (tenir bon) signifie maintenir votre stratégie d'investissement, car la valeur à long terme du Bitcoin tend à augmenter en raison de son offre limitée de 21 millions de pièces.",
        whyDCA: "Pourquoi DCA ?",
        whyDCAPoints: [
            "C'est automatique et ne nécessite aucun timing de marché",
            "Cela réduit l'impact de la volatilité des prix",
            "C'est parfait pour l'épargne régulière",
            "Cela fonctionne avec n'importe quel montant que vous pouvez vous permettre"
        ],
        aboutBitcoin: "À propos de Bitcoin",
        bitcoinDesc: "Bitcoin est une monnaie numérique qui fonctionne sans banque centrale. Considérez-la comme de l'or numérique - elle est rare, ne peut pas être copiée, et sa valeur est déterminée par l'offre et la demande.",
        whatShows: "Ce que montre cette calculatrice",
        whatShowsPoints: [
            "A commencé à investir un montant fixe (comme 100€)",
            "A acheté du Bitcoin régulièrement (hebdomadaire, mensuel, etc.)",
            "A conservé son investissement"
        ],
        pastData: "Les résultats montrent des données historiques réelles - ce qui s'est réellement passé dans le passé, pas des prédictions sur l'avenir.",
        whyPast: "Pourquoi regarder le passé ?",
        pastDesc: "Bien que les performances passées ne garantissent pas les résultats futurs, examiner les données historiques nous aide à comprendre comment la valeur du Bitcoin a changé au fil du temps et comment l'investissement régulier aurait pu fonctionner.",
        importantNote: "Note importante",
        disclaimer: "Ceci est un outil éducatif pour comprendre le concept de DCA. Ce n'est pas un conseil financier, et vous devriez toujours faire vos propres recherches avant d'investir."
    },
    it: {
        pageTitle: "Calcolatrice BTC DCA",
        mainHeading: "Performance di Investimento BTC-DCA",
        aboutDCA: "Sul DCA",
        startDate: "Data di Inizio",
        endDate: "Data di Fine",
        investmentAmount: "Importo di Investimento (€)",
        interval: "Intervallo (settimane)",
        totalInvested: "Totale Investito (€)",
        returnOnInvestment: "Ritorno sull'Investimento",
        currentValue: "Valore Attuale (€)",
        totalBtcAccumulated: "Totale BTC Accumulato",
        calculationBasedOn: "Calcolo basato sui dati dei prezzi giornalieri di",
        dataNotLoaded: "I dati BTC-USD.csv non sono caricati.",
        summaryText: "Se avessi comprato ${amount} di BTC ogni ${interval} settimana${plural}<br>iniziando ${startMonth} ${startYear} per ~ ${months} mese${monthsPlural}",
        resultsHeading: "Saresti finito in ${endMonth} ${endYear} con:",
        months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        languageSelector: "Lingua",
        modalTitle: "Sul Dollar-Cost Averaging (DCA) con Bitcoin",
        intro: "Il Dollar-Cost Averaging è una strategia di investimento semplice in cui investi una somma fissa di denaro a intervalli regolari, indipendentemente dal prezzo. È come stabilire un piano di risparmio, ma invece di mettere denaro in un conto bancario, stai acquistando Bitcoin.",
        successKey: "Una chiave per un DCA di successo è investire solo denaro di cui non avrai bisogno per un periodo prolungato. Come dimostra il grafico, la volatilità di Bitcoin può portare a perdite a breve termine. 'Hodling' (tenere duro) significa mantenere la tua strategia di investimento, poiché il valore a lungo termine di Bitcoin tende ad aumentare a causa della sua offerta limitata di 21 milioni di monete.",
        whyDCA: "Perché DCA?",
        whyDCAPoints: [
            "È automatico e non richiede timing di mercato",
            "Riduce l'impatto della volatilità dei prezzi",
            "È perfetto per il risparmio regolare",
            "Funziona con qualsiasi importo che puoi permetterti"
        ],
        aboutBitcoin: "Su Bitcoin",
        bitcoinDesc: "Bitcoin è una valuta digitale che opera senza una banca centrale. Pensala come oro digitale - è scarsa, non può essere copiata, e il suo valore è determinato dall'offerta e dalla domanda.",
        whatShows: "Cosa mostra questa calcolatrice",
        whatShowsPoints: [
            "Ha iniziato a investire una somma fissa (come 100€)",
            "Ha acquistato Bitcoin regolarmente (settimanalmente, mensilmente, ecc.)",
            "Ha mantenuto il suo investimento"
        ],
        pastData: "I risultati mostrano dati storici reali - quello che è realmente accaduto nel passato, non previsioni sul futuro.",
        whyPast: "Perché guardare al passato?",
        pastDesc: "Mentre le performance passate non garantiscono risultati futuri, guardare i dati storici ci aiuta a capire come il valore di Bitcoin è cambiato nel tempo e come l'investimento regolare avrebbe potuto funzionare.",
        importantNote: "Nota importante",
        disclaimer: "Questo è uno strumento educativo per comprendere il concetto di DCA. Non è un consiglio finanziario, e dovresti sempre fare le tue ricerche prima di investire."
    },
    pt: {
        pageTitle: "Calculadora BTC DCA",
        mainHeading: "Performance de Investimento BTC-DCA",
        aboutDCA: "Sobre DCA",
        startDate: "Data de Início",
        endDate: "Data de Fim",
        investmentAmount: "Valor do Investimento (R$)",
        interval: "Intervalo (semanas)",
        totalInvested: "Total Investido (R$)",
        returnOnInvestment: "Retorno do Investimento",
        currentValue: "Valor Atual (R$)",
        totalBtcAccumulated: "Total BTC Acumulado",
        calculationBasedOn: "Cálculo baseado em dados de preços diários de",
        dataNotLoaded: "Os dados BTC-USD.csv não estão carregados.",
        summaryText: "Se você tivesse comprado ${amount} de BTC a cada ${interval} semana${plural}<br>começando ${startMonth} ${startYear} por ~ ${months} mês${monthsPlural}",
        resultsHeading: "Você teria terminado em ${endMonth} ${endYear} com:",
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        languageSelector: "Idioma",
        modalTitle: "Sobre Média de Custo em Dólares (DCA) com Bitcoin",
        intro: "A Média de Custo em Dólares é uma estratégia de investimento simples onde você investe uma quantia fixa de dinheiro em intervalos regulares, independentemente do preço. É como estabelecer um plano de poupança, mas em vez de colocar dinheiro em uma conta bancária, você está comprando Bitcoin.",
        successKey: "Uma chave para o DCA bem-sucedido é investir apenas dinheiro que você não precisará por um período prolongado. Como demonstra o gráfico, a volatilidade do Bitcoin pode levar a perdas de curto prazo. 'Hodling' (manter firme) significa manter sua estratégia de investimento, pois o valor de longo prazo do Bitcoin tende a aumentar devido à sua oferta limitada de 21 milhões de moedas.",
        whyDCA: "Por que DCA?",
        whyDCAPoints: [
            "É automático e não requer timing de mercado",
            "Reduz o impacto da volatilidade de preços",
            "É perfeito para poupança regular",
            "Funciona com qualquer quantia que você pode pagar"
        ],
        aboutBitcoin: "Sobre Bitcoin",
        bitcoinDesc: "Bitcoin é uma moeda digital que opera sem um banco central. Pense nela como ouro digital - é escassa, não pode ser copiada, e seu valor é determinado pela oferta e demanda.",
        whatShows: "O que esta calculadora mostra",
        whatShowsPoints: [
            "Começou a investir uma quantia fixa (como R$100)",
            "Comprou Bitcoin regularmente (semanal, mensal, etc.)",
            "Manteve seu investimento"
        ],
        pastData: "Os resultados mostram dados históricos reais - o que realmente aconteceu no passado, não previsões sobre o futuro.",
        whyPast: "Por que olhar o passado?",
        pastDesc: "Embora o desempenho passado não garanta resultados futuros, olhar os dados históricos nos ajuda a entender como o valor do Bitcoin mudou ao longo do tempo e como o investimento regular poderia ter funcionado.",
        importantNote: "Nota importante",
        disclaimer: "Esta é uma ferramenta educacional para entender o conceito de DCA. Não é aconselhamento financeiro, e você deve sempre fazer sua própria pesquisa antes de investir."
    },
    nl: {
        pageTitle: "BTC DCA Calculator",
        mainHeading: "BTC-DCA Beleggingsprestatie",
        aboutDCA: "Over DCA",
        startDate: "Startdatum",
        endDate: "Einddatum",
        investmentAmount: "Beleggingsbedrag (€)",
        interval: "Interval (weken)",
        totalInvested: "Totaal Geïnvesteerd (€)",
        returnOnInvestment: "Rendement op Investering",
        currentValue: "Huidige Waarde (€)",
        totalBtcAccumulated: "Totaal BTC Geaccumuleerd",
        calculationBasedOn: "Berekening gebaseerd op dagelijkse prijsgegevens van",
        dataNotLoaded: "BTC-USD.csv gegevens zijn niet geladen.",
        summaryText: "Als je ${amount} BTC elke ${interval} week${plural}<br>had gekocht vanaf ${startMonth} ${startYear} voor ~ ${months} maand${monthsPlural}",
        resultsHeading: "Je zou zijn geëindigd in ${endMonth} ${endYear} met:",
        months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
        languageSelector: "Taal",
        modalTitle: "Over Dollar-Cost Averaging (DCA) met Bitcoin",
        intro: "Dollar-Cost Averaging is een eenvoudige beleggingsstrategie waarbij je regelmatig een vast bedrag investeert, ongeacht de prijs. Het is als het opzetten van een spaarplan, maar in plaats van geld op een bankrekening te zetten, koop je Bitcoin.",
        successKey: "Een sleutel tot succesvolle DCA is om alleen geld te investeren dat je voor een langere periode niet nodig hebt. Zoals het diagram laat zien, kan de volatiliteit van Bitcoin leiden tot kortetermijnverliezen. 'Hodling' (vasthouden) betekent je beleggingsstrategie volhouden, omdat de langetermijnwaarde van Bitcoin de neiging heeft te stijgen vanwege het beperkte aanbod van 21 miljoen munten.",
        whyDCA: "Waarom DCA?",
        whyDCAPoints: [
            "Het is automatisch en vereist geen markttiming",
            "Het vermindert de impact van prijsvolatiliteit",
            "Het is perfect voor regelmatig sparen",
            "Het werkt met elk bedrag dat je kunt veroorloven"
        ],
        aboutBitcoin: "Over Bitcoin",
        bitcoinDesc: "Bitcoin is een digitale valuta die werkt zonder centrale bank. Denk eraan als digitaal goud - het is schaars, kan niet worden gekopieerd, en zijn waarde wordt bepaald door vraag en aanbod.",
        whatShows: "Wat deze calculator laat zien",
        whatShowsPoints: [
            "Begon met het investeren van een vast bedrag (zoals €100)",
            "Kocht regelmatig Bitcoin (wekelijks, maandelijks, etc.)",
            "Hield de investering vast"
        ],
        pastData: "De resultaten tonen echte historische gegevens - wat er daadwerkelijk in het verleden is gebeurd, geen voorspellingen over de toekomst.",
        whyPast: "Waarom naar het verleden kijken?",
        pastDesc: "Hoewel prestaties uit het verleden geen garantie zijn voor toekomstige resultaten, helpt het kijken naar historische gegevens ons te begrijpen hoe de waarde van Bitcoin in de loop van de tijd is veranderd en hoe regelmatig beleggen zou kunnen hebben gewerkt.",
        importantNote: "Belangrijke opmerking",
        disclaimer: "Dit is een educatief hulpmiddel om het DCA-concept te begrijpen. Het is geen financieel advies, en je moet altijd je eigen onderzoek doen voordat je investeert."
    },
    ru: {
        pageTitle: "Калькулятор BTC DCA",
        mainHeading: "Результаты инвестиций BTC-DCA",
        aboutDCA: "О DCA",
        startDate: "Дата начала",
        endDate: "Дата окончания",
        investmentAmount: "Сумма инвестиций ($)",
        interval: "Интервал (недели)",
        totalInvested: "Всего инвестировано ($)",
        returnOnInvestment: "Доходность инвестиций",
        currentValue: "Текущая стоимость ($)",
        totalBtcAccumulated: "Всего накоплено BTC",
        calculationBasedOn: "Расчет основан на ежедневных данных о ценах с",
        dataNotLoaded: "Данные BTC-USD.csv не загружены.",
        summaryText: "Если бы вы покупали ${amount} BTC каждые ${interval} недел${plural}<br>начиная с ${startMonth} ${startYear} в течение ~ ${months} месяц${monthsPlural}",
        resultsHeading: "Вы бы закончили в ${endMonth} ${endYear} с:",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        languageSelector: "Язык",
        modalTitle: "О стратегии усреднения стоимости (DCA) с Bitcoin",
        intro: "Усреднение стоимости - это простая инвестиционная стратегия, при которой вы инвестируете фиксированную сумму денег через регулярные промежутки времени, независимо от цены. Это как создание плана сбережений, но вместо того, чтобы класть деньги на банковский счет, вы покупаете Bitcoin.",
        successKey: "Ключ к успешному DCA - инвестировать только те деньги, которые вам не понадобятся в течение длительного периода. Как показывает график, волатильность Bitcoin может привести к краткосрочным потерям. 'Ходлинг' (держать) означает придерживаться вашей инвестиционной стратегии, поскольку долгосрочная стоимость Bitcoin имеет тенденцию к росту из-за ограниченного предложения в 21 миллион монет.",
        whyDCA: "Почему DCA?",
        whyDCAPoints: [
            "Это автоматически и не требует выбора времени для входа в рынок",
            "Снижает влияние волатильности цен",
            "Идеально подходит для регулярных сбережений",
            "Работает с любой суммой, которую вы можете себе позволить"
        ],
        aboutBitcoin: "О Bitcoin",
        bitcoinDesc: "Bitcoin - это цифровая валюта, которая работает без центрального банка. Думайте о ней как о цифровом золоте - она редкая, не может быть скопирована, и ее стоимость определяется спросом и предложением.",
        whatShows: "Что показывает этот калькулятор",
        whatShowsPoints: [
            "Начал инвестировать фиксированную сумму (например, $100)",
            "Регулярно покупал Bitcoin (еженедельно, ежемесячно и т.д.)",
            "Держал инвестиции"
        ],
        pastData: "Результаты показывают реальные исторические данные - то, что действительно произошло в прошлом, а не прогнозы на будущее.",
        whyPast: "Зачем смотреть в прошлое?",
        pastDesc: "Хотя прошлые результаты не гарантируют будущих результатов, изучение исторических данных помогает нам понять, как стоимость Bitcoin изменилась с течением времени и как могли бы работать регулярные инвестиции.",
        importantNote: "Важное примечание",
        disclaimer: "Это образовательный инструмент для понимания концепции DCA. Это не финансовый совет, и вы всегда должны проводить собственное исследование перед инвестированием."
    },
    ja: {
        pageTitle: "BTC DCA計算機",
        mainHeading: "BTC-DCA投資パフォーマンス",
        aboutDCA: "DCAについて",
        startDate: "開始日",
        endDate: "終了日",
        investmentAmount: "投資額（$）",
        interval: "間隔（週）",
        totalInvested: "総投資額（$）",
        returnOnInvestment: "投資収益率",
        currentValue: "現在価値（$）",
        totalBtcAccumulated: "累積BTC総額",
        calculationBasedOn: "日次価格データに基づく計算（出典：",
        dataNotLoaded: "BTC-USD.csvデータが読み込まれていません。",
        summaryText: "${startMonth} ${startYear}から約${months}ヶ月間、${interval}週間ごとに${amount}のBTCを購入していた場合",
        resultsHeading: "${endMonth} ${endYear}時点での結果：",
        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        languageSelector: "言語",
        modalTitle: "ビットコインのドルコスト平均法（DCA）について",
        intro: "ドルコスト平均法は、価格に関係なく、定期的に一定額を投資するシンプルな投資戦略です。貯蓄計画を立てるようなものですが、銀行口座にお金を入れる代わりに、ビットコインを購入します。",
        successKey: "成功するDCAの鍵は、長期間必要としないお金のみを投資することです。グラフが示すように、ビットコインのボラティリティは短期的な損失につながる可能性があります。'ホドリング'（保持）とは、投資戦略を維持することを意味します。ビットコインの長期価値は、2100万枚の限定供給により上昇する傾向があります。",
        whyDCA: "なぜDCAなのか？",
        whyDCAPoints: [
            "自動的で市場のタイミングを必要としない",
            "価格変動の影響を軽減する",
            "定期的な貯蓄に最適",
            "手頃な金額で機能する"
        ],
        aboutBitcoin: "ビットコインについて",
        bitcoinDesc: "ビットコインは中央銀行なしで運営されるデジタル通貨です。デジタルゴールドとして考えてください - 希少で、コピーできず、その価値は需要と供給によって決定されます。",
        whatShows: "この計算機が示すもの",
        whatShowsPoints: [
            "一定額（例：$100）の投資を開始",
            "定期的にビットコインを購入（週次、月次など）",
            "投資を保持"
        ],
        pastData: "結果は実際の履歴データを示します - 過去に実際に起こったことであり、将来の予測ではありません。",
        whyPast: "なぜ過去を見るのか？",
        pastDesc: "過去の実績が将来の結果を保証するものではありませんが、履歴データを見ることで、ビットコインの価値が時間とともにどのように変化したか、そして定期的な投資がどのように機能した可能性があるかを理解するのに役立ちます。",
        importantNote: "重要な注意事項",
        disclaimer: "これはDCAの概念を理解するための教育ツールです。金融アドバイスではなく、投資前に必ず独自の調査を行う必要があります。"
    },
    zh: {
        pageTitle: "BTC DCA计算器",
        mainHeading: "BTC-DCA投资表现",
        aboutDCA: "关于DCA",
        startDate: "开始日期",
        endDate: "结束日期",
        investmentAmount: "投资金额（$）",
        interval: "间隔（周）",
        totalInvested: "总投资额（$）",
        returnOnInvestment: "投资回报率",
        currentValue: "当前价值（$）",
        totalBtcAccumulated: "累计BTC总量",
        calculationBasedOn: "基于每日价格数据的计算，数据来源：",
        dataNotLoaded: "BTC-USD.csv数据未加载。",
        summaryText: "如果您从${startMonth} ${startYear}开始，每${interval}周购买${amount}的BTC，持续约${months}个月",
        resultsHeading: "您在${endMonth} ${endYear}的结果：",
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        languageSelector: "语言",
        modalTitle: "关于比特币的美元成本平均法（DCA）",
        intro: "美元成本平均法是一种简单的投资策略，即无论价格如何，定期投资固定金额。这就像制定储蓄计划，但不是把钱存入银行账户，而是购买比特币。",
        successKey: "成功DCA的关键是只投资您在较长时间内不需要的钱。正如图表所示，比特币的波动性可能导致短期损失。'持有'（坚持）意味着维持您的投资策略，因为比特币的长期价值由于其2100万枚的有限供应而趋于上升。",
        whyDCA: "为什么选择DCA？",
        whyDCAPoints: [
            "它是自动的，不需要市场时机选择",
            "它减少了价格波动的影响",
            "它非常适合定期储蓄",
            "它适用于您能负担的任何金额"
        ],
        aboutBitcoin: "关于比特币",
        bitcoinDesc: "比特币是一种在没有中央银行的情况下运作的数字货币。将其视为数字黄金 - 它稀缺，无法复制，其价值由供需决定。",
        whatShows: "这个计算器显示什么",
        whatShowsPoints: [
            "开始投资固定金额（如$100）",
            "定期购买比特币（每周、每月等）",
            "持有投资"
        ],
        pastData: "结果显示真实的历史数据 - 过去实际发生的事情，而不是对未来的预测。",
        whyPast: "为什么要看过去？",
        pastDesc: "虽然过去的表现不能保证未来的结果，但查看历史数据有助于我们了解比特币的价值如何随时间变化，以及定期投资可能如何运作。",
        importantNote: "重要提示",
        disclaimer: "这是一个理解DCA概念的教育工具。它不是财务建议，在投资前您应该始终进行自己的研究。"
    }
};

// Helper function to get translation with interpolation
function getTranslation(key, lang = 'en', params = {}) {
    const translation = translations[lang]?.[key] || translations['en'][key];
    if (!translation) return key;
    
    if (typeof translation === 'string') {
        return translation.replace(/\${(\w+)}/g, (match, param) => {
            return params[param] !== undefined ? params[param] : match;
        });
    }
    
    return translation;
}

// Helper function to get month name
function getMonthName(monthIndex, lang = 'en') {
    const months = translations[lang]?.months || translations['en'].months;
    return months[monthIndex] || monthIndex;
} 