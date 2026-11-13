// ---------------------------------------------------------------------------
// LEMOSINE — seed data
// All content below is realistic SAMPLE data meant to be replaced:
//   • Car photos are open-license stock photography (Unsplash).
//   • Phone / WhatsApp numbers are placeholders — set the real ones from
//     the admin dashboard (/admin/settings).
//   • No real address or testimonials are invented.
// ---------------------------------------------------------------------------

export const seedSettings = {
  whatsappNumber: '966500000000', // placeholder — replace from /admin/settings
  phone: '+966 50 000 0000', // placeholder — replace from /admin/settings
  address: '',
  mapsEmbed: '',
  socials: {
    instagram: '',
    twitter: '',
    snapchat: '',
    tiktok: '',
  },
  heroTitle: 'قيادة تليق بك',
  heroSubtitle: 'أسطول مختار بعناية من أرقى السيارات، مع خدمة تُوصَل بها السيارة إلى أي مكان تريده.',
};

const car = (id, name, year, category, pricePerDay, passengers, fuel, images, featured, description) => ({
  id,
  name,
  year,
  category,
  pricePerDay,
  passengers,
  transmission: 'auto',
  fuel,
  images,
  featured,
  description,
});

export const seedCars = [
  car(
    'rolls-royce-ghost',
    'رولز-رويس غوست',
    2023,
    'luxury',
    4500,
    5,
    'petrol',
    ['/images/cars/ghost-1.jpg'],
    true,
    'قمة الفخامة والهدوء المطلق، مع مقاعد فيل كوست وسقف نجوم مضاء.',
  ),
  car(
    'mercedes-amg-gt',
    'مرسيدس AMG GT',
    2023,
    'sports',
    2200,
    2,
    'petrol',
    ['/images/cars/amg-gt-1.jpg', '/images/cars/amg-gt-2.jpg', '/images/cars/amg-gt-3.jpg'],
    true,
    'كوبيه رياضي بصوت مضرب يخطف الأنظار، أداء ألماني خالص مع فخامة مرسيدس.'
  ),
  car(
    'porsche-panamera',
    'بورشه باناميرا 4S',
    2022,
    'luxury',
    1800,
    4,
    'petrol',
    ['/images/cars/panamera-1.jpg', '/images/cars/panamera-2.jpg'],
    false,
    'سيدان رياضية تجمع بين راحة العائلة وروح بورشه في كل منعطف.'
  ),
  car(
    'ferrari-f8',
    'فيراري F8 تريبيوتو',
    2022,
    'exotic',
    5200,
    2,
    'petrol',
    ['/images/cars/ferrari-1.jpg', '/images/cars/ferrari-2.jpg', '/images/cars/ferrari-3.jpg'],
    true,
    'وحش إيطالي بسبعة سيلندرات وصوت لا يُنسى. مثالية للمناسبات الكبيرة ولقطات لا تُعوَّض.'
  ),
  car(
    'lamborghini-huracan',
    'لامبورغيني هوراكان EVO',
    2021,
    'exotic',
    4900,
    2,
    'petrol',
    ['/images/cars/huracan-1.jpg', '/images/cars/huracan-2.jpg', '/images/cars/huracan-3.jpg'],
    false,
    'تصميم فضائي وأداء يحطم الأرقام. السيارة التي تتحول بها أي يوم إلى ذكرى.'
  ),
  car(
    'bmw-m5',
    'بي إم دبليو M5 كومبيتيشن',
    2023,
    'sedan',
    1600,
    5,
    'petrol',
    ['/images/cars/bmw-m5-1.jpg', '/images/cars/bmw-m5-2.jpg'],
    false,
    'سيدان تنفيذية بروح صالة سباق. قوة 625 حصاناً مع خمس مقاعد مريحة.'
  ),
  car(
    'bmw-m4',
    'بي إم دبليو M4 كومبيتيشن',
    2023,
    'sports',
    1200,
    4,
    'petrol',
    ['/images/cars/bmw-m4-1.jpg'],
    false,
    'كوبيه رياضي متوازن، يمنحك متعة القيادة اليومية بأداء عالي.'
  ),
  car(
    'audi-rs7',
    'أودي RS7 سبورت باك',
    2022,
    'sedan',
    1500,
    5,
    'petrol',
    ['/images/cars/audi-rs7-1.jpg', '/images/cars/audi-rs7-2.jpg'],
    false,
    'أناقة ألمانية بضخامة خارقة، مع نظام كواترو للثبات في كل الطرق.'
  ),
  car(
    'audi-a8',
    'أودي A8L',
    2022,
    'luxury',
    1400,
    5,
    'petrol',
    ['/images/cars/audi-a8-1.jpg'],
    false,
    'سيدان فخامة بصوت هادئ ومقاعد تجعل الطريق الطويل قصيراً.'
  ),
  car(
    'tesla-model-s',
    'تسلا موديل S',
    2023,
    'electric',
    1300,
    5,
    'electric',
    ['/images/cars/tesla-1.jpg', '/images/cars/tesla-2.jpg'],
    false,
    'صامتة، سريعة، وصديقة للبيئة. تسارع يفوق كثيراً من السيارات الرياضية.'
  ),
  car(
    'ford-mustang',
    'فورد موستنج GT',
    2022,
    'sports',
    900,
    4,
    'petrol',
    ['/images/cars/mustang-1.jpg', '/images/cars/mustang-2.jpg'],
    false,
    'أيقونة أمريكية بصوت V8 أصيل. متعة قيادة خالصة بسعر ذكي.'
  ),
  car(
    'ford-expedition',
    'فورد إكسبديشن',
    2023,
    'suv',
    1100,
    7,
    'petrol',
    ['/images/cars/expedition-1.jpg'],
    false,
    'دفع رباعي ضخم وواسع، مثالي لرحلات العائلة والبر مع كامل الراحة.'
  ),
];
