export type IntroL10n = { title: string; body: string[] };
export type CategoryL10n = { name: string; blurb: string };
export type PathL10n = { name: string; blurb: string };

export const INTRO_L10N: Record<
  'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'id',
  IntroL10n
> = {
  zh: {
    title: '兄弟守则是什么',
    body: [
      '兄弟守则是兄弟之间那份不成文的约定，如今用明白的话说出来，好让年轻人不至于非吃过亏才学会。它不是用来抬杠取胜的规矩手册，而是一份为人的准则：让你成为兄弟靠得住的那个人。',
      '所谓兄弟，就是凌晨三点打电话你也会接——不问为什么。守则存在，是为了护住这份情谊：让忠诚诚实，让幽默厚道，让品格在本可以偷懒的时候依然立得住。',
      '这七十条讲忠诚、讲风度、讲兄弟情、讲僚机的艺术、讲日常举止，也讲那些真正考验一个人的人生节点。别把它们当成刻在石头上的戒律，而当成每一位走在你前面的兄弟，用代价换来的见识。',
      '守住这份守则，你就不只是周五晚上好玩的人。你会变得靠得住、肯付出、默默出色——一个配得上兄弟情谊的男人，一个别的兄弟也想成为的人。',
      '翻页吧。第一条在等你。',
    ],
  },
  hi: {
    title: 'ब्रोकॉड क्या है',
    body: [
      'ब्रोकॉड साथियों के बीच वह अनकहा समझौता है, जिसे यहाँ साफ़ शब्दों में लिख दिया गया है ताकि किसी जवान को इसे कठिन रास्ते से न सीखना पड़े। यह बहसों में जीतने की किताब नहीं; यह चाल-चलन की संहिता है — ऐसा इंसान बनने की, जिस पर यार भरोसा कर सकें।',
      'ब्रो वह है जिसके तीन बजे रात के फ़ोन पर तुम बिना सवाल उठाए उठ खड़े होते हो। संहिता उसी रिश्ते की रखवाली के लिए है: ताकि वफ़ादारी ईमानदार रहे, मज़ाक दयालु रहे, और चरित्र उस वक्त भी बचा रहे जब तीनों को ढीला छोड़ देना आसान हो।',
      'ये सत्तर अनुच्छेद वफ़ादारी, शान, भाईचारा, विंगमैन की कला, रोज़मर्रा का आचरण, और वे पड़ाव जो आदमी की परीक्षा लेते हैं — सब समेटते हैं। इन्हें पत्थर पर उकेरी आज्ञाएँ मत समझना; इन्हें हर उस ब्रो की कमाई हुई समझ मानना जो तुमसे पहले गुज़रा।',
      'संहिता पर चलो तो तुम सिर्फ़ शुक्रवार रात की मस्ती नहीं रह जाते। तुम भरोसेमंद, उदार और चुपचाप उत्तम बनते हो — मित्रता के योग्य पुरुष, वैसा ब्रो जैसा और ब्रो बनना चाहते हैं।',
      'पन्ना पलटो। अनुच्छेद 1 इंतज़ार कर रहा है।',
    ],
  },
  es: {
    title: 'Qué es el Bro Code',
    body: [
      'El Bro Code es el pacto no escrito entre colegas, puesto aquí en palabras claras para que ningún joven tenga que aprenderlo a las malas. No es un reglamento para ganar discusiones; es un código de conducta para ser alguien en quien tus colegas puedan contar.',
      'Un bro es cualquier hombre al que le contestarías el teléfono a las tres de la madrugada, sin hacer preguntas. El Código existe para proteger ese vínculo: para que la lealtad sea honesta, el humor sea amable y el carácter se mantenga cuando sería más fácil dejar resbalar las tres cosas.',
      'Estos setenta artículos cubren la lealtad, la clase, la hermandad, el arte del wingman, la conducta cotidiana y los hitos que ponen a prueba a un hombre. Léelos no como mandamientos grabados en piedra, sino como la sabiduría ganada a pulso de cada bro que vino antes que tú.',
      'Sigue el Código y dejas de ser solo un buen rato el viernes por la noche. Te vuelves fiable, generoso y discretamente excelente: un hombre digno de la amistad, el tipo de bro al que otros bros aspiran a ser.',
      'Pasa la página. El artículo 1 te espera.',
    ],
  },
  fr: {
    title: 'Ce qu’est le Bro Code',
    body: [
      'Le Bro Code est l’accord non écrit entre potes, posé ici en mots clairs pour qu’aucun jeune homme n’ait à l’apprendre à la dure. Ce n’est pas un règlement pour gagner les disputes ; c’est un code de conduite pour devenir quelqu’un sur qui tes potes peuvent compter.',
      'Un bro, c’est n’importe quel homme à qui tu répondrais au téléphone à trois heures du matin — sans poser de questions. Le Code existe pour protéger ce lien : pour que la loyauté reste honnête, l’humour reste bon, et le caractère tienne quand il serait plus facile de laisser glisser les trois.',
      'Ces soixante-dix articles couvrent la loyauté, la classe, la fraternité, l’art de l’ailier, la conduite de tous les jours, et les étapes qui mettent un homme à l’épreuve. Lis-les non comme des commandements gravés dans la pierre, mais comme la sagesse chèrement acquise de chaque bro qui t’a précédé.',
      'Suis le Code et tu deviens plus qu’un bon moment le vendredi soir. Tu deviens fiable, généreux, et discrètement excellent — un homme digne de l’amitié, le genre de bro que les autres bros veulent devenir.',
      'Tourne la page. L’article 1 t’attend.',
    ],
  },
  ar: {
    title: 'ما هو ميثاق الإخوة',
    body: [
      'ميثاق الإخوة هو الاتفاق غير المكتوب بين الرفاق، وقد صيغ هنا بكلام بيّن حتى لا يضطر شاب إلى تعلمه بالطريقة القاسية. ليس كتاب قواعد للفوز في الجدال؛ بل ميثاق سلوك لتصير رجلاً يعتمد عليه أصدقاؤه.',
      'الأخ هو أي رجل ترد على هاتفه في الثالثة فجراً — بلا أسئلة. الميثاق قائم لحماية تلك الرابطة: لتبقى الوفاء صادقاً، والفكاهة كريمة، والخلق ثابتاً حين يسهل التفريط في الثلاثة.',
      'هذه السبعون مادة تغطي الوفاء، والرقي، وأخوّة الرفاق، وفن الجناح، والسلوك اليومي، والمحطات التي تختبر الرجل. اقرأها لا كوصايا محفورة في حجر، بل كحكمة غالية دفع ثمنها كل أخ سبقك.',
      'اتبع الميثاق فلن تعود مجرد سهرة ممتعة ليلة الجمعة. تصير موثوقاً وكريماً ومتقناً في صمت — رجلاً جديراً بالصحبة، من ذلك النوع الذي يتطلع إليه الآخرون.',
      'اقلب الصفحة. المادة الأولى بانتظارك.',
    ],
  },
  bn: {
    title: 'ব্রো কোড কী',
    body: [
      'ব্রো কোড হলো বন্ধুদের মধ্যে সেই অলিখিত চুক্তি, যা এখানে সাদামাটা ভাষায় লেখা, যাতে কোনো তরুণকে কঠিন পথে শিখতে না হয়। এটি তর্কে জেতার নিয়মবই নয়; এটি আচরণের সংহিতা — এমন মানুষ হওয়ার, যার ওপর বন্ধুরা ভরসা রাখতে পারে।',
      'ব্রো হলেন তিনি, যাঁর ফোন তিনটেয় রাতে উঠলেও তুমি ধরবে — কোনো প্রশ্ন ছাড়াই। সংহিতা সেই বন্ধন রক্ষার জন্য: যাতে আনুগত্য সত থাকে, রসিকতা দয়ালু থাকে, আর চরিত্র সেই মুহূর্তেও টিকে থাকে যখন তিনটেই ছেড়ে দেওয়া সহজ।',
      'এই সত্তরটি অনুচ্ছেদ আনুগত্য, শালীনতা, ভাইচারা, উইংম্যানের শিল্প, দৈনন্দিন আচরণ, এবং যে মাইলফলকগুলো মানুষকে পরীক্ষা করে — সব ধরে। এগুলোকে পাথরে খোদাই করা আদেশ ভেবো না; ভেবো তোমার আগে আসা প্রতিটি ব্রোর কষ্টার্জিত জ্ঞান।',
      'সংহিতা মেনে চলো, তুমি শুধু শুক্রবার রাতের মজলিস থাকবে না। তুমি হবে নির্ভরযোগ্য, উদার ও নীরবে উৎকৃষ্ট — বন্ধুত্বের যোগ্য পুরুষ, যে ধরনের ব্রো অন্য ব্রোরা হতে চায়।',
      'পাতা উল্টাও। অনুচ্ছেদ ১ অপেক্ষা করছে।',
    ],
  },
  pt: {
    title: 'O que é o Bro Code',
    body: [
      'O Bro Code é o acordo não escrito entre amigos, posto aqui em palavras claras para que nenhum jovem precise aprendê-lo do jeito difícil. Não é um regulamento para ganhar discussão; é um código de conduta para ser alguém em quem seus amigos possam contar.',
      'Um bro é qualquer homem para quem você atenderia o telefone às três da manhã — sem perguntas. O Código existe para proteger esse vínculo: para manter a lealdade honesta, o humor bondoso e o caráter intacto quando seria mais fácil deixar os três escorregarem.',
      'Estes setenta artigos cobrem lealdade, classe, irmandade, a arte do wingman, a conduta do dia a dia e os marcos que testam um homem. Leia-os não como mandamentos gravados em pedra, mas como a sabedoria dura de cada bro que veio antes de você.',
      'Siga o Código e você deixa de ser só uma boa noite de sexta. Você se torna confiável, generoso e discretamente excelente — um homem digno da amizade, o tipo de bro que outros bros querem ser.',
      'Vire a página. O artigo 1 espera.',
    ],
  },
  ru: {
    title: 'Что такое Bro Code',
    body: [
      'Bro Code — это неписаный договор между своими, изложенный здесь простыми словами, чтобы молодому человеку не пришлось учить его на горьком опыте. Это не свод правил, чтобы побеждать в спорах; это кодекс поведения: стать тем, на кого друзья могут положиться.',
      'Бро — это любой, кому ты снимешь трубку в три часа ночи без лишних вопросов. Кодекс существует, чтобы беречь эту связь: чтобы верность оставалась честной, юмор — добрым, а характер — целым, когда проще дать всем трём поплыть.',
      'Эти семьдесят статей — о верности, о классе, о братстве, об искусстве быть крылом, о повседневном поведении и о вехах, которые проверяют мужчину. Читай их не как заповеди, высеченные в камне, а как дорого доставшуюся мудрость каждого бро, что шёл до тебя.',
      'Держись Кодекса — и ты уже не просто весёлый вечер в пятницу. Ты становишься надёжным, щедрым и тихо превосходным — человеком, достойным дружбы, таким бро, каким хотят стать другие.',
      'Переверни страницу. Статья 1 ждёт.',
    ],
  },
  id: {
    title: 'Apa Itu Bro Code',
    body: [
      'Bro Code adalah perjanjian tak tertulis di antara kawan, ditulis di sini dengan kata-kata gamblang agar tak ada pemuda yang harus mempelajarinya dengan cara yang pahit. Ini bukan buku peraturan untuk memenangkan debat; ini kode laku agar kau menjadi orang yang bisa diandalkan kawan-kawanmu.',
      'Seorang bro adalah siapa pun yang akan kau angkat teleponnya pukul tiga pagi — tanpa bertanya. Kode ada untuk menjaga ikatan itu: agar kesetiaan tetap jujur, humor tetap ramah, dan karakter tetap utuh ketika lebih mudah membiarkan ketiganya longgar.',
      'Tujuh puluh pasal ini mencakup kesetiaan, kelas, persaudaraan, seni menjadi wingman, laku sehari-hari, dan tonggak yang menguji seorang pria. Bacalah bukan sebagai perintah yang terukir di batu, melainkan sebagai hikmah mahal dari setiap bro yang berjalan sebelummu.',
      'Ikuti Kode, dan kau bukan lagi sekadar teman asyik di malam Jumat. Kau menjadi andal, dermawan, dan unggul dalam diam — pria yang layak atas persahabatan, jenis bro yang ingin ditiru bro lain.',
      'Balik halaman. Pasal 1 menanti.',
    ],
  },
};

export const CATEGORY_L10N: Record<
  'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'id',
  Record<string, CategoryL10n>
> = {
  zh: {
    loyalty: { name: '忠诚', blurb: '在要紧的时候站在兄弟身边。' },
    class: { name: '风度', blurb: '以沉静的尊严自处。' },
    broship: { name: '兄弟情', blurb: '把一班人拴在一起的情谊。' },
    wingman: { name: '僚机', blurb: '在场上为兄弟撑腰。' },
    conduct: { name: '举止', blurb: '兄弟在外头如何行事。' },
    milestones: { name: '人生节点', blurb: '为大事到场。' },
  },
  hi: {
    loyalty: { name: 'वफ़ादारी', blurb: 'जब बात बने, तब यारों के साथ खड़े रहना।' },
    class: { name: 'शान', blurb: 'चुपचाप इज़्ज़त के साथ चलना।' },
    broship: { name: 'भाईचारा', blurb: 'वो रिश्ते जो गिरोह को बाँधे रखते हैं।' },
    wingman: { name: 'विंगमैन', blurb: 'मैदान में ब्रो का साथ देना।' },
    conduct: { name: 'आचरण', blurb: 'दुनिया में ब्रो कैसे चलता है।' },
    milestones: { name: 'पड़ाव', blurb: 'बड़े मौकों पर हाज़िर होना।' },
  },
  es: {
    loyalty: { name: 'Lealtad', blurb: 'Estar con tus colegas cuando cuenta.' },
    class: { name: 'Clase', blurb: 'Llevarte con dignidad callada.' },
    broship: { name: 'Hermandad', blurb: 'Los lazos que sostienen a la cuadrilla.' },
    wingman: { name: 'El wingman', blurb: 'Respaldar a un bro en el terreno.' },
    conduct: { name: 'Conducta', blurb: 'Cómo se porta un bro en el mundo.' },
    milestones: { name: 'Hitos', blurb: 'Presentarse en los grandes momentos.' },
  },
  fr: {
    loyalty: { name: 'Loyauté', blurb: 'Être là pour tes potes quand ça compte.' },
    class: { name: 'Classe', blurb: 'Se tenir avec une dignité tranquille.' },
    broship: { name: 'Fraternité', blurb: 'Les liens qui tiennent la bande.' },
    wingman: { name: 'L’ailier', blurb: 'Couvrir un bro sur le terrain.' },
    conduct: { name: 'Conduite', blurb: 'Comment un bro se comporte dans le monde.' },
    milestones: { name: 'Étapes', blurb: 'Être présent aux grands moments.' },
  },
  ar: {
    loyalty: { name: 'الوفاء', blurb: 'الوقوف مع رفاقك حين يحين العد.' },
    class: { name: 'الرقي', blurb: 'أن تحمل نفسك بكرامة هادئة.' },
    broship: { name: 'الأخوّة', blurb: 'الروابط التي تمسك بالرفقة.' },
    wingman: { name: 'الجناح', blurb: 'سند أخيك في الميدان.' },
    conduct: { name: 'السلوك', blurb: 'كيف يتصرف الأخ في الناس.' },
    milestones: { name: 'المحطات', blurb: 'الحضور في اللحظات الكبيرة.' },
  },
  bn: {
    loyalty: { name: 'আনুগত্য', blurb: 'যখন দরকার, তখন বন্ধুর পাশে দাঁড়ানো।' },
    class: { name: 'শালীনতা', blurb: 'নীরব মর্যাদা নিয়ে নিজেকে বহন করা।' },
    broship: { name: 'ভাইচারা', blurb: 'যে বন্ধন দলকে ধরে রাখে।' },
    wingman: { name: 'উইংম্যান', blurb: 'মাঠে ব্রোর পাশে থাকা।' },
    conduct: { name: 'আচরণ', blurb: 'বাইরের জগতে ব্রো কেমন চলে।' },
    milestones: { name: 'মাইলফলক', blurb: 'বড় মুহূর্তে হাজির থাকা।' },
  },
  pt: {
    loyalty: { name: 'Lealdade', blurb: 'Ficar com os amigos quando importa.' },
    class: { name: 'Classe', blurb: 'Carregar-se com dignidade quieta.' },
    broship: { name: 'Irmandade', blurb: 'Os laços que seguram a turma.' },
    wingman: { name: 'O wingman', blurb: 'Apoiar um bro em campo.' },
    conduct: { name: 'Conduta', blurb: 'Como um bro se porta pelo mundo.' },
    milestones: { name: 'Marcos', blurb: 'Aparecer nos grandes momentos.' },
  },
  ru: {
    loyalty: { name: 'Верность', blurb: 'Стоять за своих, когда это важно.' },
    class: { name: 'Класс', blurb: 'Держаться с тихим достоинством.' },
    broship: { name: 'Братство', blurb: 'Связи, что держат компанию.' },
    wingman: { name: 'Крыло', blurb: 'Прикрывать бро в деле.' },
    conduct: { name: 'Поведение', blurb: 'Как бро ведёт себя в миру.' },
    milestones: { name: 'Вехи', blurb: 'Быть на больших моментах.' },
  },
  id: {
    loyalty: { name: 'Kesetiaan', blurb: 'Berdiri di samping kawan ketika itu penting.' },
    class: { name: 'Kelas', blurb: 'Membawa diri dengan martabat yang tenang.' },
    broship: { name: 'Persaudaraan', blurb: 'Ikatan yang menahan kru tetap utuh.' },
    wingman: { name: 'Sang wingman', blurb: 'Menopang bro di lapangan.' },
    conduct: { name: 'Laku', blurb: 'Bagaimana seorang bro bersikap di dunia.' },
    milestones: { name: 'Tonggak', blurb: 'Hadir untuk momen-momen besar.' },
  },
};

export const PATH_L10N: Record<
  'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'id',
  Record<string, PathL10n>
> = {
  zh: {
    foundations: { name: '根基', blurb: '从这里开始。每个年轻兄弟该先知道的核心条目。' },
    wingman: { name: '僚机之道', blurb: '如何在场上有风度地为兄弟撑腰。' },
    character: { name: '风度与品格', blurb: '活成兄弟们相信的那种人。' },
    loyalty: { name: '火线上的忠诚', blurb: '难的时候站在兄弟身边意味着什么。' },
    'showing-up': { name: '到场', blurb: '为那些定义友情的节点现身。' },
  },
  hi: {
    foundations: { name: 'नींव', blurb: 'यहीं से शुरू करो। हर जवान ब्रो को पहले ये मूल अनुच्छेद पता होने चाहिए।' },
    wingman: { name: 'विंगमैन का ढंग', blurb: 'मैदान में शान के साथ यार का साथ कैसे दो।' },
    character: { name: 'शान और चरित्र', blurb: 'वैसा चलो जैसा तुम्हारे यार तुम्हें मानते हैं।' },
    loyalty: { name: 'आँच में वफ़ादारी', blurb: 'जब कठिन हो, तब ब्रो के साथ खड़े रहने का मतलब।' },
    'showing-up': { name: 'हाज़िर होना', blurb: 'उन पड़ावों पर मौजूद रहना जो दोस्ती को गढ़ते हैं।' },
  },
  es: {
    foundations: { name: 'Los cimientos', blurb: 'Empieza aquí. Los artículos centrales que todo bro joven debe saber primero.' },
    wingman: { name: 'El modo wingman', blurb: 'Cómo respaldar a un colega en el terreno con clase.' },
    character: { name: 'Clase y carácter', blurb: 'Pórtate como el hombre que tus colegas creen que eres.' },
    loyalty: { name: 'Lealtad bajo fuego', blurb: 'Qué significa estar con un bro cuando cuesta.' },
    'showing-up': { name: 'Presentarse', blurb: 'Estar en los hitos que definen una amistad.' },
  },
  fr: {
    foundations: { name: 'Les fondations', blurb: 'Commence ici. Les articles essentiels que tout jeune bro devrait connaître d’abord.' },
    wingman: { name: 'La voie de l’ailier', blurb: 'Comment couvrir un pote sur le terrain avec classe.' },
    character: { name: 'Classe et caractère', blurb: 'Tiens-toi comme l’homme que tes potes croient que tu es.' },
    loyalty: { name: 'Loyauté sous le feu', blurb: 'Ce que ça veut dire de tenir pour un bro quand c’est dur.' },
    'showing-up': { name: 'Être là', blurb: 'Être présent aux étapes qui définissent une amitié.' },
  },
  ar: {
    foundations: { name: 'الأسس', blurb: 'ابدأ من هنا. المواد الجوهرية التي ينبغي لكل أخٍ شاب أن يعرفها أولاً.' },
    wingman: { name: 'طريق الجناح', blurb: 'كيف تسند صاحبك في الميدان برقي.' },
    character: { name: 'الرقي والخلق', blurb: 'احمل نفسك كما يراك رفاقك.' },
    loyalty: { name: 'وفاء تحت النار', blurb: 'معنى الوقوف مع أخيك حين يعسر الأمر.' },
    'showing-up': { name: 'الحضور', blurb: 'أن تكون حاضراً في المحطات التي تصوغ الصداقة.' },
  },
  bn: {
    foundations: { name: 'ভিত্তি', blurb: 'এখান থেকে শুরু করো। প্রতিটি তরুণ ব্রোর আগে জানা উচিত মূল অনুচ্ছেদগুলো।' },
    wingman: { name: 'উইংম্যানের পথ', blurb: 'মাঠে শালীনভাবে বন্ধুর পাশে কীভাবে থাকবে।' },
    character: { name: 'শালীনতা ও চরিত্র', blurb: 'বন্ধুরা যে মানুষ বলে তোমাকে মানে, সেভাবে চলো।' },
    loyalty: { name: 'আগুনে আনুগত্য', blurb: 'কঠিন সময়ে ব্রোর পাশে দাঁড়ানোর অর্থ কী।' },
    'showing-up': { name: 'হাজির থাকা', blurb: 'যে মাইলফলক বন্ধুত্ব গড়ে, সেখানে উপস্থিত থাকা।' },
  },
  pt: {
    foundations: { name: 'Os alicerces', blurb: 'Comece aqui. Os artigos centrais que todo bro jovem deve conhecer primeiro.' },
    wingman: { name: 'O jeito wingman', blurb: 'Como apoiar um amigo em campo com classe.' },
    character: { name: 'Classe e caráter', blurb: 'Porte-se como o homem que seus amigos acreditam que você é.' },
    loyalty: { name: 'Lealdade sob fogo', blurb: 'O que significa ficar com um bro quando é difícil.' },
    'showing-up': { name: 'Aparecer', blurb: 'Estar presente nos marcos que definem uma amizade.' },
  },
  ru: {
    foundations: { name: 'Основы', blurb: 'Начни здесь. Главные статьи, которые каждый молодой бро должен знать сначала.' },
    wingman: { name: 'Путь крыла', blurb: 'Как прикрывать друга в деле с классом.' },
    character: { name: 'Класс и характер', blurb: 'Держись так, каким тебя считают свои.' },
    loyalty: { name: 'Верность под огнём', blurb: 'Что значит стоять за бро, когда это тяжело.' },
    'showing-up': { name: 'Явиться', blurb: 'Быть на вехах, которые определяют дружбу.' },
  },
  id: {
    foundations: { name: 'Fondasi', blurb: 'Mulai di sini. Pasal inti yang harus diketahui setiap bro muda terlebih dahulu.' },
    wingman: { name: 'Jalan sang wingman', blurb: 'Cara menopang kawan di lapangan dengan kelas.' },
    character: { name: 'Kelas & karakter', blurb: 'Bawalah dirimu seperti pria yang dipercayai kawan-kawanmu.' },
    loyalty: { name: 'Kesetiaan di bawah tembak', blurb: 'Arti berdiri di samping bro ketika itu sulit.' },
    'showing-up': { name: 'Hadir', blurb: 'Ada untuk tonggak yang menandai sebuah persahabatan.' },
  },
};
