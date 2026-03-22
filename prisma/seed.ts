import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

async function main() {
  console.log('Starting seed...\n');

  // ─── 1. Admin Users ───────────────────────────────────────────────────────────

  console.log('Seeding admin users...');

  const adminPassword = await bcrypt.hash('HeavenlyAdmin2025!', SALT_ROUNDS);
  const editorPassword = await bcrypt.hash('HeavenlyEditor2025!', SALT_ROUNDS);

  const superAdmin = await prisma.adminUser.upsert({
    where: { email: 'uvin@heavenlyevents.lk' },
    update: {},
    create: {
      email: 'uvin@heavenlyevents.lk',
      fullName: 'Uvin Vindula',
      role: 'SUPER_ADMIN',
      passwordHash: adminPassword,
      mustChangePassword: true,
      isActive: true,
    },
  });
  console.log(`  Created super admin: ${superAdmin.email}`);

  const officeAdmin = await prisma.adminUser.upsert({
    where: { email: 'admin@heavenlyevents.lk' },
    update: {},
    create: {
      email: 'admin@heavenlyevents.lk',
      fullName: 'Office Admin',
      role: 'ADMIN',
      passwordHash: adminPassword,
      mustChangePassword: true,
      isActive: true,
    },
  });
  console.log(`  Created admin: ${officeAdmin.email}`);

  const editor = await prisma.adminUser.upsert({
    where: { email: 'editor@heavenlyevents.lk' },
    update: {},
    create: {
      email: 'editor@heavenlyevents.lk',
      fullName: 'Events Editor',
      role: 'EDITOR',
      passwordHash: editorPassword,
      mustChangePassword: true,
      isActive: true,
    },
  });
  console.log(`  Created editor: ${editor.email}`);

  // ─── 2. Events ────────────────────────────────────────────────────────────────

  console.log('\nSeeding events...');

  // EVENT 1: Colombo Wedding Show
  const event1 = await prisma.event.upsert({
    where: { slug: 'colombo-wedding-show-2026' },
    update: {},
    create: {
      slug: 'colombo-wedding-show-2026',
      title: 'Colombo Wedding Show',
      shortDesc:
        'Sri Lanka\'s premier wedding exhibition bringing together the finest wedding professionals under one roof.',
      description: `The Colombo Wedding Show is Sri Lanka's most prestigious and anticipated bridal exhibition, bringing together the finest wedding professionals, designers, and service providers under one magnificent roof at the BMICH, Colombo. Whether you're newly engaged or deep into planning your dream wedding, this is the ultimate destination to discover everything you need for your special day.

Explore an extraordinary showcase of bridal fashion, breathtaking floral arrangements, world-class photography, stunning venues, exquisite jewellery, luxury honeymoon destinations, and so much more. Meet top industry experts face-to-face, compare services, enjoy exclusive show-only discounts, and get inspired by live demonstrations and fashion shows.

The Colombo Wedding Show is more than just an exhibition — it's an experience designed to make your wedding planning journey seamless, exciting, and truly unforgettable. Join thousands of couples who have found their perfect wedding partners at Sri Lanka's biggest wedding show.`,
      category: 'WEDDING_SHOW',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-07-18T09:00:00.000Z'),
      eventEndDate: new Date('2026-07-20T18:00:00.000Z'),
      venueName: 'BMICH',
      venueAddress: 'Bauddhaloka Mawatha',
      venueCity: 'Colombo',
      primaryColor: '#C9A84C',
      secondaryColor: '#1a56db',
      accentColor: '#F8F0E3',
      facebookUrl: 'https://www.facebook.com/thecolomboweddingshow',
      visitorFormSchema: [
        {
          id: 'weddingDate',
          label: 'Approximate Wedding Date',
          type: 'date',
          required: false,
          displayOrder: 1,
        },
        {
          id: 'partnerName',
          label: "Partner's Name",
          type: 'text',
          required: false,
          displayOrder: 2,
        },
      ],
      exhibitorFormSchema: [
        {
          id: 'businessCategory',
          label: 'Business Category',
          type: 'select',
          required: true,
          options: [
            'Bridal Fashion',
            'Photography',
            'Venues',
            'Floral',
            'Catering',
            'Jewellery',
            'Travel',
            'Beauty',
            'Entertainment',
            'Stationery',
            'Planning',
          ],
          displayOrder: 1,
        },
      ],
      metaTitle: 'Colombo Wedding Show | Sri Lanka\'s Premier Bridal Exhibition',
      metaDesc:
        'Discover Sri Lanka\'s biggest wedding exhibition at BMICH Colombo. Meet top wedding professionals, enjoy exclusive deals, and plan your dream wedding.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event1.title}`);

  // EVENT 2: Colombo Education Fair 2026
  const event2 = await prisma.event.upsert({
    where: { slug: 'colombo-education-fair-2026' },
    update: {},
    create: {
      slug: 'colombo-education-fair-2026',
      title: 'Colombo Education Fair 2026 - BMICH',
      shortDesc:
        'The largest education fair in Sri Lanka connecting students with leading local and international universities.',
      description: `The Colombo Education Fair 2026 is Sri Lanka's largest and most comprehensive education exhibition, held at the prestigious Bandaranaike Memorial International Conference Hall (BMICH). This landmark event connects thousands of students and parents with leading local and international universities, colleges, vocational training institutes, and scholarship providers.

Whether you're an O/L or A/L student exploring your options, a school leaver looking for the right degree programme, or a professional seeking postgraduate qualifications, the Colombo Education Fair offers unmatched access to information, guidance, and opportunities. Interact directly with university representatives, attend informative seminars, discover scholarship pathways, and get expert career counselling — all under one roof.

With hundreds of exhibitors and an expected footfall of over 50,000 visitors, this is the must-attend education event of the year. Your future starts here.`,
      category: 'EDUCATION_FAIR',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-08-15T09:00:00.000Z'),
      eventEndDate: new Date('2026-08-17T18:00:00.000Z'),
      venueName: 'BMICH',
      venueAddress: 'Bauddhaloka Mawatha',
      venueCity: 'Colombo',
      primaryColor: '#D32F2F',
      secondaryColor: '#1A237E',
      accentColor: '#FFD600',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100090823338701',
      visitorFormSchema: [
        {
          id: 'currentGrade',
          label: 'Current Grade / Level',
          type: 'select',
          required: true,
          options: [
            'O/L Student',
            'A/L Student',
            'School Leaver',
            'Undergraduate',
            'Graduate',
            'Working Professional',
          ],
          displayOrder: 1,
        },
        {
          id: 'subjectStream',
          label: 'Subject Stream',
          type: 'select',
          required: false,
          options: [
            'Science',
            'Mathematics',
            'Commerce',
            'Arts',
            'Technology',
            'Other',
          ],
          displayOrder: 2,
        },
        {
          id: 'interestedField',
          label: 'Interested Field of Study',
          type: 'text',
          required: false,
          displayOrder: 3,
        },
      ],
      metaTitle: 'Colombo Education Fair 2026 | Largest Education Exhibition in Sri Lanka',
      metaDesc:
        'Explore top universities, scholarships, and career opportunities at the Colombo Education Fair 2026 at BMICH. Free entry for all students.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event2.title}`);

  // EVENT 3: Kedella Home & Construction Show
  const event3 = await prisma.event.upsert({
    where: { slug: 'kedella-home-construction-show-2026' },
    update: {},
    create: {
      slug: 'kedella-home-construction-show-2026',
      title: 'Kedella Home & Construction Show',
      shortDesc:
        'Sri Lanka\'s leading home, construction, and interior design exhibition showcasing the latest innovations.',
      description: `The Kedella Home & Construction Show is Sri Lanka's premier exhibition dedicated to the home building, construction, and interior design industries. This highly anticipated event brings together architects, builders, interior designers, suppliers, and homeowners to explore the latest products, technologies, and trends transforming the way we build and design our living spaces.

From cutting-edge construction materials and smart home technologies to stunning furniture, kitchen solutions, landscaping ideas, and energy-efficient building systems — the Kedella show covers every aspect of creating your dream home. Whether you're building a new home, renovating, or simply looking for design inspiration, this exhibition offers everything you need in one place.

With live demonstrations, expert talks, exclusive show discounts, and hundreds of exhibitors from across Sri Lanka and beyond, the Kedella Home & Construction Show is the definitive event for anyone passionate about homes and construction.`,
      category: 'TRADE_EXPO',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-09-05T09:00:00.000Z'),
      eventEndDate: new Date('2026-09-07T18:00:00.000Z'),
      venueName: 'TBA',
      venueAddress: 'To be announced',
      venueCity: 'Colombo',
      primaryColor: '#5D4037',
      secondaryColor: '#FF6F00',
      accentColor: '#F5F5DC',
      facebookUrl: 'https://www.facebook.com/kedellahomeandconstructionshow/',
      metaTitle: 'Kedella Home & Construction Show | Build Your Dream Home',
      metaDesc:
        'Discover the latest in home building, construction, and interior design at the Kedella Home & Construction Show.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event3.title}`);

  // EVENT 4: Galle Education Fair
  const event4 = await prisma.event.upsert({
    where: { slug: 'galle-education-fair' },
    update: {},
    create: {
      slug: 'galle-education-fair',
      title: 'Galle Education Fair',
      shortDesc:
        'Bringing world-class education opportunities to the southern region of Sri Lanka.',
      description: `The Galle Education Fair is the southern region's premier education exhibition, designed to bring world-class education opportunities closer to students and families in the south of Sri Lanka. Organised by Heavenly Events, this fair features leading local and international universities, colleges, vocational institutes, and scholarship providers all under one roof.

Students from Galle, Matara, Hambantota, and surrounding areas can explore a wide range of academic pathways including undergraduate and postgraduate programmes, professional certifications, vocational training, and overseas study options. Meet university representatives, attend career guidance seminars, and discover financial aid and scholarship opportunities — all for free.

The Galle Education Fair is committed to making quality education accessible to every student in the southern province, empowering the next generation to achieve their academic and career goals.`,
      category: 'EDUCATION_FAIR',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-08-29T09:00:00.000Z'),
      eventEndDate: new Date('2026-08-30T18:00:00.000Z'),
      venueName: 'TBA Galle',
      venueAddress: 'To be announced',
      venueCity: 'Galle',
      primaryColor: '#D32F2F',
      secondaryColor: '#1A237E',
      accentColor: '#FFD600',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100090911696494',
      metaTitle: 'Galle Education Fair | Education Opportunities in Southern Sri Lanka',
      metaDesc:
        'Explore top universities, scholarships, and career paths at the Galle Education Fair. Free entry for all students in the southern province.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event4.title}`);

  // EVENT 5: Furniture & Interior Expo
  const event5 = await prisma.event.upsert({
    where: { slug: 'colombo-furniture-interior-expo' },
    update: {},
    create: {
      slug: 'colombo-furniture-interior-expo',
      title: 'Furniture & Interior Expo',
      shortDesc:
        'Sri Lanka\'s biggest furniture and interior design exhibition featuring the finest local and international brands.',
      description: `The Furniture & Interior Expo is Sri Lanka's biggest and most prestigious exhibition dedicated exclusively to furniture, interior design, and home decor. This grand event showcases an incredible collection of furniture, lighting, soft furnishings, home accessories, and design solutions from the finest local manufacturers and international brands.

Whether you're furnishing a new home, redesigning your living spaces, or seeking inspiration for commercial interiors, this expo offers an unparalleled selection of products and ideas. From contemporary and minimalist designs to classic and luxury aesthetics, every style and budget is catered for.

Visitors can enjoy live room setups, interior design consultations, exclusive expo pricing, and the chance to meet top designers and craftspeople. If you're passionate about beautiful living spaces, the Furniture & Interior Expo is an event you cannot miss.`,
      category: 'TRADE_EXPO',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-10-10T09:00:00.000Z'),
      eventEndDate: new Date('2026-10-12T18:00:00.000Z'),
      venueName: 'TBA',
      venueAddress: 'To be announced',
      venueCity: 'Colombo',
      primaryColor: '#6D4C41',
      secondaryColor: '#8B0000',
      accentColor: '#F5DEB3',
      facebookUrl: 'https://www.facebook.com/furnitureandinteriorexpo/',
      metaTitle: 'Furniture & Interior Expo | Sri Lanka\'s Biggest Furniture Exhibition',
      metaDesc:
        'Discover stunning furniture, interior design ideas, and home decor at the Furniture & Interior Expo. Exclusive deals and top brands.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event5.title}`);

  // EVENT 6: Health Expo
  const event6 = await prisma.event.upsert({
    where: { slug: 'health-expo-sri-lanka-2026' },
    update: {},
    create: {
      slug: 'health-expo-sri-lanka-2026',
      title: 'Health Expo',
      shortDesc:
        'Sri Lanka\'s premier health and wellness exhibition promoting a healthier nation.',
      description: `Health Expo is the nation's foremost health, wellness, and medical exhibition, bringing together leading hospitals, clinics, pharmaceutical companies, wellness brands, fitness providers, and health technology innovators. This landmark event is dedicated to promoting a healthier Sri Lanka by connecting the public with the latest advances in healthcare, preventive medicine, and holistic wellness.

Visitors can access free health screenings, consult with medical professionals, attend health awareness seminars, explore the latest medical technologies, and discover natural and alternative wellness solutions. From nutrition and mental health to fitness, dental care, and chronic disease management — every aspect of health and well-being is covered.

Whether you're a health-conscious individual, a medical professional, or a wellness brand looking to reach thousands of engaged visitors, Health Expo is the event that brings health to the forefront.`,
      category: 'HEALTH_EXPO',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-11-07T09:00:00.000Z'),
      eventEndDate: new Date('2026-11-09T18:00:00.000Z'),
      venueName: 'TBA',
      venueAddress: 'To be announced',
      venueCity: 'Colombo',
      primaryColor: '#0D47A1',
      secondaryColor: '#C62828',
      accentColor: '#E8F5E9',
      facebookUrl: 'https://www.facebook.com/healthexposl/',
      metaTitle: 'Health Expo | Premier Health & Wellness Exhibition',
      metaDesc:
        'Explore the latest in healthcare, wellness, and medical innovation at Health Expo. Free health screenings and expert consultations.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event6.title}`);

  // EVENT 7: EDU FAIR KURUNEGALA
  const event7 = await prisma.event.upsert({
    where: { slug: 'edu-fair-kurunegala' },
    update: {},
    create: {
      slug: 'edu-fair-kurunegala',
      title: 'EDU FAIR KURUNEGALA',
      shortDesc:
        'Bringing top education opportunities to the North Western Province of Sri Lanka.',
      description: `EDU FAIR KURUNEGALA is the North Western Province's largest education exhibition, organised by Heavenly Events to bring leading universities, colleges, and educational institutions directly to the students and families of Kurunegala and the surrounding areas. This event is part of our mission to make quality education guidance accessible across all regions of Sri Lanka.

Students can explore a diverse range of academic programmes, meet university representatives, attend career guidance workshops, and learn about scholarship and financial aid opportunities. Whether you're an O/L or A/L student, a school leaver, or a working professional looking to upskill, EDU FAIR KURUNEGALA has something for everyone.

Join us for a day of discovery, inspiration, and opportunity. Your educational journey starts at EDU FAIR KURUNEGALA.`,
      category: 'EDUCATION_FAIR',
      status: 'PUBLISHED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2026-09-19T09:00:00.000Z'),
      eventEndDate: new Date('2026-09-20T18:00:00.000Z'),
      venueName: 'TBA',
      venueAddress: 'To be announced',
      venueCity: 'Kurunegala',
      primaryColor: '#D32F2F',
      secondaryColor: '#1565C0',
      accentColor: '#FFC107',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61573118125792',
      metaTitle: 'EDU FAIR KURUNEGALA | Education Exhibition in North Western Province',
      metaDesc:
        'Discover top universities, scholarships, and career guidance at EDU FAIR KURUNEGALA. Free entry for all students.',
      publishedAt: new Date(),
    },
  });
  console.log(`  Created event: ${event7.title}`);

  // EVENT 8: Solar Energy Expo (COMPLETED)
  const event8 = await prisma.event.upsert({
    where: { slug: 'solar-energy-expo-sri-lanka' },
    update: {},
    create: {
      slug: 'solar-energy-expo-sri-lanka',
      title: 'Solar Energy Expo',
      shortDesc:
        'Sri Lanka\'s first dedicated solar and renewable energy exhibition driving the nation towards a sustainable future.',
      description: `The Solar Energy Expo was the nation's first and most comprehensive exhibition dedicated exclusively to solar energy and renewable power solutions. This pioneering event brought together leading solar panel manufacturers, inverter suppliers, battery storage providers, EPC contractors, government agencies, and sustainability advocates to showcase the latest technologies driving Sri Lanka's green energy revolution.

Visitors explored cutting-edge solar technologies, learned about government incentives and net metering programmes, compared solutions from top providers, and connected with certified installers for residential, commercial, and industrial solar projects. The expo also featured expert panels, technical workshops, and live product demonstrations.

As Sri Lanka accelerates its transition to renewable energy, the Solar Energy Expo played a vital role in educating the public and industry stakeholders about the immense potential of solar power in the island nation.`,
      category: 'TRADE_EXPO',
      status: 'COMPLETED',
      isPublic: true,
      isClientEvent: false,
      eventDate: new Date('2025-11-15T09:00:00.000Z'),
      eventEndDate: new Date('2025-11-17T18:00:00.000Z'),
      venueName: 'TBA',
      venueAddress: 'To be announced',
      venueCity: 'Colombo',
      primaryColor: '#1565C0',
      secondaryColor: '#2E7D32',
      accentColor: '#FF8F00',
      facebookUrl: 'https://www.facebook.com/solarenergyexpolk/',
      metaTitle: 'Solar Energy Expo | Renewable Energy Exhibition',
      metaDesc:
        'Explore solar energy solutions, renewable power technologies, and green innovations at the Solar Energy Expo.',
      publishedAt: new Date('2025-10-01T00:00:00.000Z'),
    },
  });
  console.log(`  Created event: ${event8.title}`);

  // ─── 3. Blog Posts ────────────────────────────────────────────────────────────

  console.log('\nSeeding blog posts...');

  const blog1 = await prisma.blogPost.upsert({
    where: { slug: 'colombo-education-fair-2024-bmich' },
    update: {},
    create: {
      title: 'Colombo Education Fair 2024 at BMICH',
      slug: 'colombo-education-fair-2024-bmich',
      excerpt:
        'A look back at the highly successful Colombo Education Fair 2024 held at the BMICH, which connected thousands of students with top educational institutions.',
      content: `The Colombo Education Fair 2024, held at the prestigious Bandaranaike Memorial International Conference Hall (BMICH), was a resounding success that exceeded all expectations. Organised by Heavenly Events, this landmark education exhibition brought together over 200 leading local and international universities, colleges, and vocational training institutes under one roof.

Over three action-packed days, more than 50,000 students, parents, and education enthusiasts visited the fair to explore academic opportunities, attend career guidance seminars, and interact directly with university representatives. The event featured dedicated zones for undergraduate programmes, postgraduate studies, overseas education, vocational training, and scholarship opportunities.

Key highlights of the fair included live Q&A sessions with admissions officers, interactive career assessment workshops, and scholarship award ceremonies. Students from across Sri Lanka travelled to Colombo to take advantage of this unparalleled opportunity to shape their academic futures.

The overwhelming response from both exhibitors and visitors reaffirms the Colombo Education Fair's position as Sri Lanka's largest and most impactful education exhibition. We extend our heartfelt gratitude to all participating institutions, sponsors, and the thousands of students who made this event a tremendous success.

Stay tuned for the Colombo Education Fair 2026 — bigger, better, and more exciting than ever!`,
      category: 'Event Recap',
      tags: 'education,fair,BMICH,colombo,2024,universities',
      author: 'Heavenly Events',
      status: 'PUBLISHED',
      metaTitle: 'Colombo Education Fair 2024 at BMICH | Event Recap',
      metaDesc:
        'Relive the highlights of the Colombo Education Fair 2024 at BMICH — Sri Lanka\'s largest education exhibition connecting students with top universities.',
      publishedAt: new Date('2024-09-15T10:00:00.000Z'),
    },
  });
  console.log(`  Created blog post: ${blog1.title}`);

  const blog2 = await prisma.blogPost.upsert({
    where: { slug: 'icsg-2024-recap' },
    update: {},
    create: {
      title: 'Reflecting on the Triumph of ICSG 2024',
      slug: 'icsg-2024-recap',
      excerpt:
        'A comprehensive recap of the International Career and Study Guide (ICSG) 2024 event and its impact on Sri Lankan students.',
      content: `The International Career and Study Guide (ICSG) 2024 was a defining moment in Sri Lanka's education events calendar. Organised with precision and passion by Heavenly Events, ICSG 2024 provided a world-class platform for students to explore international education pathways and career opportunities.

The event featured representatives from renowned universities across the UK, Australia, Canada, New Zealand, Malaysia, and beyond. Students had the unique opportunity to learn about admission requirements, visa processes, living costs, and career prospects in various countries — all from verified and authorised representatives.

One of the standout features of ICSG 2024 was the dedicated scholarship pavilion, where students could apply for exclusive scholarships offered by participating institutions. The career guidance zone, staffed by certified career counsellors, helped students identify their strengths and align them with suitable academic programmes.

With thousands of visitors across multiple days, ICSG 2024 proved once again that there is an enormous appetite among Sri Lankan students for quality international education guidance. The positive feedback from both exhibitors and visitors has been overwhelming, with many institutions already confirming their participation in future editions.

We are incredibly proud of what ICSG 2024 achieved and look forward to continuing our mission of connecting Sri Lankan students with the best educational opportunities the world has to offer.`,
      category: 'Event Recap',
      tags: 'ICSG,international,education,careers,2024,study-abroad',
      author: 'Heavenly Events',
      status: 'PUBLISHED',
      metaTitle: 'ICSG 2024 Recap | International Career and Study Guide',
      metaDesc:
        'Reflecting on the success of ICSG 2024 — connecting Sri Lankan students with top international universities and career opportunities.',
      publishedAt: new Date('2024-07-20T10:00:00.000Z'),
    },
  });
  console.log(`  Created blog post: ${blog2.title}`);

  const blog3 = await prisma.blogPost.upsert({
    where: { slug: 'kedella-home-construction-show-2023' },
    update: {},
    create: {
      title: 'Kedella Home & Construction Show 2023 Recap',
      slug: 'kedella-home-construction-show-2023',
      excerpt:
        'Highlights and key moments from the Kedella Home & Construction Show 2023 — Sri Lanka\'s premier home building exhibition.',
      content: `The Kedella Home & Construction Show 2023 was a spectacular showcase of innovation, craftsmanship, and design in Sri Lanka's home building and construction industry. Held over three days, the event attracted thousands of homeowners, architects, builders, and design enthusiasts eager to explore the latest products and trends.

The exhibition floor was alive with stunning displays from over 150 exhibitors, ranging from leading construction material suppliers and smart home technology providers to premium furniture brands and landscaping specialists. Visitors were treated to live demonstrations of cutting-edge building techniques, interactive design consultations, and exclusive show-only pricing on a wide range of products.

A highlight of the event was the "Dream Home" pavilion, which featured fully furnished model rooms designed by some of Sri Lanka's top interior designers. This immersive experience allowed visitors to visualise how different products and design concepts could transform their own living spaces.

The expert seminar series was another crowd favourite, covering topics such as sustainable building practices, cost-effective construction methods, smart home integration, and the latest trends in interior design. Industry leaders and architects shared valuable insights that empowered attendees to make informed decisions about their building and renovation projects.

The Kedella Home & Construction Show 2023 reinforced its reputation as the must-attend event for anyone in the home building and construction space. We thank all exhibitors, sponsors, and visitors for making it an unforgettable experience, and we look forward to the 2026 edition.`,
      category: 'Event Recap',
      tags: 'kedella,home,construction,2023,interior-design,building',
      author: 'Heavenly Events',
      status: 'PUBLISHED',
      metaTitle: 'Kedella Home & Construction Show 2023 Recap',
      metaDesc:
        'Relive the highlights of the Kedella Home & Construction Show 2023 — Sri Lanka\'s leading home building and construction exhibition.',
      publishedAt: new Date('2023-10-10T10:00:00.000Z'),
    },
  });
  console.log(`  Created blog post: ${blog3.title}`);

  // ─── 4. Site Settings ─────────────────────────────────────────────────────────

  console.log('\nSeeding site settings...');

  const siteSettings = [
    { key: 'siteName', value: 'Heavenly Events' },
    { key: 'tagline', value: 'Sri Lanka\'s Premier Event Management Company' },
    { key: 'phone1', value: '+94 77 123 4567' },
    { key: 'phone2', value: '+94 11 234 5678' },
    { key: 'email', value: 'info@heavenlyevents.lk' },
    { key: 'address', value: 'Colombo, Sri Lanka' },
    { key: 'facebookUrl', value: 'https://www.facebook.com/heavenlyeventslk' },
    { key: 'whatsappNumber', value: '+94771234567' },
    { key: 'gtmId', value: '' },
    { key: 'ga4Id', value: '' },
    { key: 'metaPixelId', value: '' },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: {
        key: setting.key,
        value: setting.value,
      },
    });
    console.log(`  Set ${setting.key}: ${setting.value || '(empty)'}`);
  }

  console.log('\nSeed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
