// Constants
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const STORAGE_KEY = 'btc_price_history';

// Chart instance
let performanceChart = null;

// DOM Elements
const dcaForm = document.getElementById('dcaForm');
const totalBtcElement = document.getElementById('totalBtc');
const currentValueElement = document.getElementById('currentValue');
const totalInvestedElement = document.getElementById('totalInvested');
const roiElement = document.getElementById('roi');
const calculateButton = document.getElementById('calculateBtn');

let csvPriceData = null; // Will hold parsed CSV data
let csvLoading = true;

// Modal functionality
const modal = document.getElementById('aboutModal');
const modalContent = document.getElementById('modalContent');
const aboutBtn = document.getElementById('aboutBtn');
const closeBtn = document.getElementById('closeModal');

// Language content
const translations = {
    en: {
        title: "About Dollar-Cost Averaging (DCA) with Bitcoin",
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
        title: "Über Dollar-Cost Averaging (DCA) mit Bitcoin",
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
        title: "Sobre Promedio de Costo en Dólares (DCA) con Bitcoin",
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
        title: "À propos de la Moyenne de Coût en Dollars (DCA) avec Bitcoin",
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
        title: "Sul Dollar-Cost Averaging (DCA) con Bitcoin",
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
        title: "Sobre Média de Custo em Dólares (DCA) com Bitcoin",
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
        title: "Over Dollar-Cost Averaging (DCA) met Bitcoin",
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
        title: "О стратегии усреднения стоимости (DCA) с Bitcoin",
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
        title: "ビットコインのドルコスト平均法（DCA）について",
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
        title: "关于比特币的美元成本平均法（DCA）",
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

// Add these variables at the top with other global variables
let firstDate = null;
let lastDate = null;

// Add a flag to distinguish user vs programmatic updates
let isProgrammaticUpdate = false;
let sliderCalcTimeout = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize modal elements
    const modal = document.getElementById('aboutModal');
    const modalContent = document.getElementById('modalContent');
    const aboutBtn = document.getElementById('aboutBtn');
    const closeBtn = document.getElementById('closeModal');
    
    // Language selector
    const langSelector = document.createElement('select');
    langSelector.className = 'ml-4 px-2 py-1 rounded border border-gray-300';
    langSelector.innerHTML = `
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="it">Italian</option>
        <option value="pt">Portuguese</option>
        <option value="nl">Dutch</option>
        <option value="ru">Russian</option>
        <option value="ja">Japanese</option>
        <option value="zh">Chinese</option>
    `;
    document.querySelector('.flex.justify-between.items-center.mb-4').appendChild(langSelector);

    // Function to update modal content based on language
    function updateModalContent(lang) {
        const content = translations[lang];
        const modalDiv = modalContent.querySelector('.space-y-4');
        modalDiv.innerHTML = `
            <p>${content.intro}</p>
            <p>${content.successKey}</p>
            
            <h4 class="font-semibold text-lg">${content.whyDCA}</h4>
            <ul class="list-disc pl-5 space-y-2">
                ${content.whyDCAPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>

            <h4 class="font-semibold text-lg">${content.aboutBitcoin}</h4>
            <p>${content.bitcoinDesc}</p>

            <h4 class="font-semibold text-lg">${content.whatShows}</h4>
            <p>${content.whatShowsPoints[0]}</p>
            <ul class="list-disc pl-5 space-y-2">
                ${content.whatShowsPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
            <p>${content.pastData}</p>

            <h4 class="font-semibold text-lg">${content.whyPast}</h4>
            <p>${content.pastDesc}</p>

            <h4 class="font-semibold text-lg">${content.importantNote}</h4>
            <p>${content.disclaimer}</p>
        `;
    }

    // Initialize with English
    updateModalContent('en');

    // Language change handler
    langSelector.addEventListener('change', (e) => {
        updateModalContent(e.target.value);
    });

    if (!modal || !modalContent || !aboutBtn || !closeBtn) {
        console.error('Some modal elements are missing!');
        return;
    }

    // Open modal with animation
    aboutBtn.onclick = function() {
        modal.classList.remove('hidden');
        // Trigger reflow
        modal.offsetHeight;
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        document.body.style.overflow = 'hidden';
    };

    // Close modal with animation
    function closeModal() {
        modal.classList.remove('opacity-100');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    closeBtn.onclick = closeModal;

    // Close modal when clicking outside
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    // Close modal with Escape key
    document.onkeydown = function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    };

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').max = today;
    // Set default start date to 1 year ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    document.getElementById('startDate').value = oneYearAgo.toISOString().split('T')[0];
    // Set default end date to lastDate if available
    const endDateInput = document.getElementById('endDate');
    if (lastDate) {
        endDateInput.value = lastDate;
    }
    // Add input listeners for all fields to triggerDebouncedCalculation
    document.getElementById('startDate').addEventListener('input', triggerDebouncedCalculation);
    document.getElementById('endDate').addEventListener('input', triggerDebouncedCalculation);
    document.getElementById('investmentAmount').addEventListener('input', triggerDebouncedCalculation);
    document.getElementById('interval').addEventListener('input', triggerDebouncedCalculation);
    
    // Initialize BTC price data from the included JavaScript file
    csvPriceData = getBtcPriceArray();
    csvLoading = false;
    
    // Store first and last dates
    if (csvPriceData && csvPriceData.length > 0) {
        firstDate = csvPriceData[0].date;
        lastDate = csvPriceData[csvPriceData.length - 1].date;
        
        // Set min date to earliest data point
        document.getElementById('startDate').min = firstDate;
        document.getElementById('startDate').max = lastDate;
        document.getElementById('endDate').min = firstDate;
        document.getElementById('endDate').max = lastDate;
        document.getElementById('endDate').value = lastDate;
        // Initialize the date range slider
        initDateRangeSlider(firstDate, lastDate, document.getElementById('startDate').value, document.getElementById('endDate').value);
        // Trigger initial calculation
        setTimeout(triggerDebouncedCalculation, 0);
    }
});

// Helper to check if form is ready
function isFormReady() {
    return (
        document.getElementById('startDate').value &&
        document.getElementById('endDate').value &&
        document.getElementById('investmentAmount').value &&
        document.getElementById('interval').value &&
        csvPriceData &&
        !csvLoading
    );
}

// Helper to format numbers with commas
function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Remove Calculate button logic and form submit handler
// Add debounce calculation for all input fields
function triggerDebouncedCalculation() {
    // Always allow calculation trigger, even after programmatic update
    if (sliderCalcTimeout) clearTimeout(sliderCalcTimeout);
    sliderCalcTimeout = setTimeout(() => {
        if (isFormReady()) {
            handleFormSubmit({ preventDefault: () => {} });
        }
    }, 1000);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    if (!csvPriceData || csvPriceData.length === 0) {
        alert('BTC-USD.csv data is not loaded.');
        return;
    }
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const interval = parseInt(document.getElementById('interval').value);
    setTimeout(() => {
        const results = calculateDCA(csvPriceData, startDate, endDate, investmentAmount, interval);
        updateResults(results);
        drawPerformanceChart(results, startDate, endDate);
    }, 100);
}

// Calculate DCA results
function calculateDCA(priceData, startDate, endDate, investmentAmount, interval) {
    const results = [];
    let totalBtc = 0;
    let totalInvested = 0;
    // Calculate investment dates
    const investmentDates = [];
    let currentDate = new Date(startDate);
    const last = new Date(endDate);
    while (currentDate <= last) {
        investmentDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + (interval * 7));
    }
    // Calculate results for each day in range
    priceData.forEach(({ date, price }) => {
        if (date < startDate || date > endDate) return;
        // Check if this is an investment day
        if (investmentDates.includes(date)) {
            const btcBought = investmentAmount / price;
            totalBtc += btcBought;
            totalInvested += investmentAmount;
        }
        const currentValue = totalBtc * price;
        const roi = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0;
        results.push({
            date,
            price,
            totalBtc,
            totalInvested,
            currentValue,
            roi
        });
    });
    return results;
}

// Update results in the UI (with commas for $ values)
function updateResults(results) {
    const latest = results[results.length - 1];
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const investmentAmount = document.getElementById('investmentAmount').value;
    const interval = document.getElementById('interval').value;

    // Calculate months difference (approximate)
    const months = Math.max(1, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24 * 30.44)));
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startMonth = monthNames[startDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endMonth = monthNames[endDate.getMonth()];
    const endYear = endDate.getFullYear();

    // Compose summary line
    const summaryText = `Had you bought $${formatNumberWithCommas(investmentAmount)} worth of BTC every ${interval} week${interval > 1 ? 's' : ''}<br>starting ${startMonth} ${startYear} for ~ ${months} month${months !== 1 ? 's' : ''}.`;
    document.getElementById('summary').innerHTML = summaryText;

    // Compose results heading
    const resultsHeading = document.getElementById('resultsHeading');
    if (resultsHeading) {
        resultsHeading.textContent = `You would have ended up in ${endMonth} ${endYear} with:`;
    }

    totalBtcElement.textContent = latest.totalBtc.toFixed(2);
    currentValueElement.textContent = `$${formatNumberWithCommas(Math.round(latest.currentValue))}`;
    totalInvestedElement.textContent = `$${formatNumberWithCommas(Math.round(latest.totalInvested))}`;
    roiElement.textContent = `${latest.roi.toFixed(2)}%`;
}

// Draw performance chart, only show data from startDate onward
function drawPerformanceChart(results, startDate, endDate) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    if (performanceChart) {
        performanceChart.destroy();
    }
    // Filter results for chart
    const filteredResults = results.filter(r => r.date >= startDate && r.date <= endDate);
    const labels = filteredResults.map(r => r.date);
    const currentValueData = filteredResults.map(r => r.currentValue);
    const investedData = filteredResults.map(r => r.totalInvested);
    const btcData = filteredResults.map(r => r.totalBtc);
    const btcPriceData = filteredResults.map(r => r.price);
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Portfolio Value ($)',
                    data: currentValueData,
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.1
                },
                {
                    label: 'Total Invested ($)',
                    data: investedData,
                    borderColor: 'rgb(156, 163, 175)',
                    borderDash: [5, 5],
                    tension: 0.1
                },
                {
                    label: 'BTC Accumulated',
                    data: btcData,
                    borderColor: 'rgb(16, 185, 129)',
                    tension: 0.1,
                    yAxisID: 'btc',
                    hidden: true
                },
                {
                    label: 'BTC Price ($)',
                    data: btcPriceData,
                    borderColor: 'orange',
                    borderWidth: 2,
                    tension: 0.1,
                    hidden: true,
                    pointRadius: 0,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    },
                    min: startDate,
                    max: endDate
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Value ($)'
                    }
                },
                btc: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'BTC'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 2) {
                                label += context.parsed.y.toFixed(8) + ' BTC';
                            } else if (context.datasetIndex === 3) {
                                label += '$' + context.parsed.y.toFixed(2);
                            } else {
                                label += '$' + context.parsed.y.toFixed(2);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// --- noUiSlider Date Range Slider Integration ---
let dateRangeSlider = null;

function dateToTimestamp(dateStr) {
    return new Date(dateStr).getTime();
}
function timestampToDate(ts) {
    const d = new Date(ts);
    return d.toISOString().split('T')[0];
}
function formatDateTooltip(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-CA'); // YYYY-MM-DD
}

function initDateRangeSlider(minDate, maxDate, startDate, endDate) {
    const sliderElem = document.getElementById('dateRangeSlider');
    if (!sliderElem) return;
    if (dateRangeSlider) {
        dateRangeSlider.destroy();
        dateRangeSlider = null;
    }
    noUiSlider.create(sliderElem, {
        start: [dateToTimestamp(startDate), dateToTimestamp(endDate)],
        connect: true,
        range: {
            min: dateToTimestamp(minDate),
            max: dateToTimestamp(maxDate)
        },
        step: 24 * 60 * 60 * 1000, // one day
        tooltips: [
            { to: formatDateTooltip, from: Number },
            { to: formatDateTooltip, from: Number }
        ],
        format: { to: Number, from: Number }
    });
    dateRangeSlider = sliderElem.noUiSlider;

    // Sync slider -> inputs (programmatic update)
    dateRangeSlider.on('update', function(values, handle) {
        isProgrammaticUpdate = true;
        const [startTs, endTs] = values.map(Number);
        if (handle === 0) {
            document.getElementById('startDate').value = timestampToDate(startTs);
        } else {
            document.getElementById('endDate').value = timestampToDate(endTs);
        }
        isProgrammaticUpdate = false;
    });
    // Sync slider on set (user finished sliding)
    dateRangeSlider.on('set', function(values) {
        isProgrammaticUpdate = true;
        const [startTs, endTs] = values.map(Number);
        document.getElementById('startDate').value = timestampToDate(startTs);
        document.getElementById('endDate').value = timestampToDate(endTs);
        isProgrammaticUpdate = false;
        triggerDebouncedCalculation();
    });
    // Sync inputs -> slider (user input only)
    document.getElementById('startDate').addEventListener('input', function() {
        if (isProgrammaticUpdate) return;
        const startVal = dateToTimestamp(this.value);
        const endVal = dateToTimestamp(document.getElementById('endDate').value);
        dateRangeSlider.set([startVal, endVal]);
    });
    document.getElementById('endDate').addEventListener('input', function() {
        if (isProgrammaticUpdate) return;
        const startVal = dateToTimestamp(document.getElementById('startDate').value);
        const endVal = dateToTimestamp(this.value);
        dateRangeSlider.set([startVal, endVal]);
    });
} 