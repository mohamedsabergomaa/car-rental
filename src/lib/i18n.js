// ---------------------------------------------------------------------------
// LEMOSINE — i18n
// Arabic is the default locale. To add English later:
//   1. Add an "en" dictionary below (same shape).
//   2. Flip DEFAULT_LOCALE or read it from settings — layout.js already sets
//      <html lang / dir> from the locale, so the whole site flips to LTR.
// ---------------------------------------------------------------------------

export const LOCALES = {
  ar: { dir: 'rtl', lang: 'ar', label: 'العربية' },
  en: { dir: 'ltr', lang: 'en', label: 'English' },
};

export const DEFAULT_LOCALE = 'ar';

const ar = {
  brand: 'LEMOSINE',
  brandTagline: 'تأجير السيارات الفاخرة',

  nav: {
    home: 'الرئيسية',
    cars: 'السيارات',
    about: 'من نحن',
    contact: 'تواصل معنا',
    bookNow: 'احجز الآن',
    admin: 'لوحة التحكم',
  },

  hero: {
    badge: 'تأجير سيارات فاخرة',
    title: 'قيادة تليق بك',
    subtitle: 'أسطول مختار بعناية من أرقى السيارات، مع خدمة تُوصَل بها السيارة إلى أي مكان تريده.',
    ctaPrimary: 'احجز سيارتك الآن',
    ctaSecondary: 'استكشف السيارات',
  },

  marquee: {
    items: ['رولز-رويس', 'بورشه', 'مرسيدس-بنز', 'فيراري', 'لامبورغيني', 'بي إم دبليو', 'أودي', 'تسلا'],
  },

  sections: {
    featuredTitle: 'سيارات مميزة',
    featuredSubtitle: 'أبرز سيارات أسطولنا الأكثر طلباً هذا الموسم',
    viewAll: 'عرض كل السيارات',
    whyTitle: 'لماذا ليموزين؟',
    whySubtitle: 'لأن التفاصيل الصغيرة هي ما يصنع تجربة استثنائية',
    introTitle: 'أكثر من مجرد تأجير سيارات',
    introText:
      'في ليموزين، نؤمن أن السيارة ليست وسيلة تنقّل فقط، بل انطباع أول يترك أثره. لذلك نختار كل سيارة في أسطولنا بعناية، ونعتمد على فريق يتعامل مع كل حجز كأنه حجز خاص به.',
    introCta: 'تعرّف علينا أكثر',
    testimonialsTitle: 'ماذا يقول عملاؤنا',
    testimonialsNote: 'نماذج تجريبية للعرض — تُستبدل بتقييمات العملاء الحقيقية',
    ctaTitle: 'جاهز لتجربة قيادة استثنائية؟',
    ctaText: 'تواصل معنا عبر واتساب وسنجهّز لك السيارة المناسبة في الوقت الذي يناسبك.',
    ctaButton: 'تواصل عبر واتساب',
  },

  why: [
    { title: 'أسطول مختار بعناية', text: 'سيارات حديثة، مصانة دورياً، وتُفحص قبل كل تسليم.' },
    { title: 'توصيل إلى أي مكان', text: 'نوصل السيارة إلى منزلك، الفندق، أو المطار.' },
    { title: 'أسعار شفافة', text: 'سعر يومي واضح دون رسوم مخفية أو مفاجآت.' },
    { title: 'دعم على مدار الساعة', text: 'فريقنا متواجد دائماً عبر واتساب للرد على استفساراتك.' },
  ],

  testimonials: [
    {
      quote: 'سيارة نظيفة، جاهزة في الوقت المحدد بالضبط، وتعامل راقٍ من أول رسالة حتى التسليم.',
      name: 'عبدالله م.',
      role: 'نموذج تجريبي',
    },
    {
      quote: 'حجزت سيارة لعرس أختي ووصلت مغلّفة بوردي هدية. تفاصيلهم مذهلة.',
      name: 'سارة ع.',
      role: 'نموذج تجريبي',
    },
    {
      quote: 'أفضل تجربة تأجير مررت بها. أسعار واضحة وصفر مفاجآت.',
      name: 'فيصل ن.',
      role: 'نموذج تجريبي',
    },
  ],

  footer: {
    aboutText: 'ليموزين — وجهتك الأولى لتأجير السيارات الفاخرة في المملكة.',
    linksTitle: 'روابط سريعة',
    contactTitle: 'تواصل معنا',
    followUs: 'تابعنا',
    rights: 'جميع الحقوق محفوظة',
    adminLink: 'لوحة التحكم',
  },

  cars: {
    pageTitle: 'أسطول السيارات',
    pageSubtitle: 'اختر سيارتك من مجموعة مختارة بعناية من أفخم السيارات',
    filterAll: 'الكل',
    perDay: 'ر.س / اليوم',
    priceOnRequest: 'السعر عند الطلب',
    viewDetails: 'عرض التفاصيل',
    bookWhatsapp: 'احجز عبر واتساب',
    featuredBadge: 'مميزة',
    empty: 'لا توجد سيارات في هذه الفئة حالياً',
    resultsCount: (n) => `${n} سيارة`,
    relatedTitle: 'سيارات مشابهة',
  },

  carDetails: {
    specsTitle: 'المواصفات',
    passengers: 'الركاب',
    transmission: 'ناقل الحركة',
    fuel: 'نوع الوقود',
    year: 'الموديل',
    category: 'الفئة',
    transmissionTypes: { auto: 'أوتوماتيك', manual: 'يدوي' },
    fuelTypes: { petrol: 'بنزين', hybrid: 'هايبرد', electric: 'كهربائي', diesel: 'ديزل' },
    bookingTitle: 'احجز هذه السيارة',
    bookingText: 'أرسل لنا رسالة عبر واتساب وسنؤكد التوفر والسعر خلال دقائق.',
    callUs: 'اتصل بنا',
  },

  categories: {
    luxury: 'فخامة',
    sedan: 'سيدان تنفيذية',
    sports: 'رياضية',
    exotic: 'خارقة',
    suv: 'دفع رباعي',
    electric: 'كهربائية',
  },

  about: {
    pageTitle: 'من نحن',
    pageSubtitle: 'قصة ليموزين وما يجعلنا مختلفين',
    introTitle: 'شغفنا هو السيارة، واهتمامنا هو أنت',
    introText1:
      'انطلقت ليموزين من فكرة بسيطة: تجربة تأجير سيارات فاخرة تليق بمناسباتك، بلا تعقيد وبلا انتظار. نختار سياراتنا من أرقى الماركات العالمية، ونحافظ عليها بأعلى معايير الصيانة والنظافة.',
    introText2:
      'سواء كنت تحتاج سيارة لعرس، اجتماع عمل، أو مجرد رحلة نهاية أسبوع تُعوّضك — فريقنا يرافقك من أول رسالة حتى تسليم السيارة، ويعود إليك بعد الرحلة للاطمئنان على تجربتك.',
    missionTitle: 'مهمتنا',
    missionText: 'أن نجعل تجربة قيادة سيارة فاخرة في متناول الجميع، بأسعار عادلة وخدمة شخصية لا تُنسى.',
    valuesTitle: 'قيمنا',
    values: [
      { title: 'التميّز', text: 'لا نسلّم سيارة إلا بحالة نظيفة ومفحوصة بالكامل.' },
      { title: 'الثقة', text: 'أسعار واضحة، تعاقد واضح، وبدون شروط مخفية.' },
      { title: 'الالتزام', text: 'الوقت المحدد وقت مقدّس — وصول متأخر يعني خصماً.' },
    ],
    reasonsTitle: 'لماذا يختارنا العملاء',
  },

  contact: {
    pageTitle: 'تواصل معنا',
    pageSubtitle: 'فريقنا جاهز للرد على استفساراتك على مدار الساعة',
    whatsapp: 'واتساب',
    phone: 'الهاتف',
    address: 'العنوان',
    addressPlaceholder: 'يُضاف عنوان الشركة من لوحة التحكم',
    socials: 'حساباتنا',
    formTitle: 'أرسل استفساراً سريعاً',
    formName: 'الاسم',
    formNamePlaceholder: 'اسمك الكريم',
    formMessage: 'رسالتك',
    formMessagePlaceholder: 'اكتب استفسارك هنا… (مثال: أرغب بحجز سيارة الفخامة يوم الخميس)',
    formSubmit: 'إرسال عبر واتساب',
    formNote: 'سيتم تحويلك إلى واتساب مع رسالتك جاهزة للإرسال.',
    mapsTitle: 'موقعنا على الخريطة',
    mapsPlaceholder: 'خريطة جوجل — يُضاف رابط التضمين من لوحة التحكم',
  },

  whatsapp: {
    general: 'مرحباً LEMOSINE، أرغب بالاستفسار عن تأجير سيارة.',
    car: (name) => `مرحباً LEMOSINE، أرغب بحجز سيارة ${name}، هل هي متوفرة؟`,
    contactForm: (name, msg) => `مرحباً LEMOSINE،\nالاسم: ${name}\n${msg}`,
  },

  notFound: {
    title: 'الصفحة غير موجودة',
    text: 'يبدو أنك وصلت إلى رابط غير صحيح أو صفحة تم نقلها.',
    back: 'العودة للرئيسية',
  },

  seo: {
    homeTitle: 'LEMOSINE | تأجير السيارات الفاخرة',
    homeDescription: 'ليموزين — تأجير سيارات فاخرة بأسطول مختار من رولز-رويس وفيراري وبورشه ومرسيدس. توصيل إلى أي مكان وحجز فوري عبر واتساب.',
    carsTitle: 'أسطول السيارات | LEMOSINE',
    carsDescription: 'تصفح أسطول ليموزين من السيارات الفاخرة والرياضية والكهربائية مع أسعار يومية واضحة.',
    aboutTitle: 'من نحن | LEMOSINE',
    aboutDescription: 'تعرّف على قصة ليموزين، مهمتنا، ولماذا يختارنا العملاء لتجربة قيادة استثنائية.',
    contactTitle: 'تواصل معنا | LEMOSINE',
    contactDescription: 'تواصل مع ليموزين عبر واتساب أو الهاتف لحجز سيارتك الفاخرة.',
  },
};

const dictionaries = { ar };

export function getDict(locale = DEFAULT_LOCALE) {
  return dictionaries[locale] || dictionaries[ar];
}

export function getLocaleMeta(locale = DEFAULT_LOCALE) {
  return LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
}
