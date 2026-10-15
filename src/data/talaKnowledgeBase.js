/**
 * Tala Abusheha - RAG Knowledge Base (Vector & Semantic Document Chunks)
 * 
 * Each chunk represents a discrete, authoritative unit of knowledge about
 * Tala's background, technical architecture, real-world projects, and career.
 */

export const TALA_KNOWLEDGE_CHUNKS = [
  // 1. Identity & Overview
  {
    id: 'bio-identity',
    category: 'bio',
    title: 'نبذة تعريفية شاملة عن تالة ابوشيحة',
    sourceLabel: 'السيرة المهنية والنبذة التعريفية',
    sourceUrl: '#about',
    keywords: [
      'من هي تالة', 'مين تالة', 'مين تالى', 'مين تالا', 'نبذة', 'معلومات', 'هوية', 'تالة ابوشيحة',
      'who is tala', 'about', 'bio', 'profile', 'developer', 'front-end'
    ],
    content: `
تالة ابوشيحة (Tala Abusheha) هي مطورة واجهات أمامية متخصصة (Front-End Developer) وموجهة برمجية (Co-Mentor) مقيمة في فلسطين وتعمل عن بُعد (Remote) مع شركات وفرق عمل حول العالم.
تمتلك أكثر من سنتين (+2) من الخبرة العملية المركزة في بناء تطبيقات الويب السريعة والحديثة، وأنجزت أكثر من 20 مشروعاً ناجحاً لأكثر من 10 عملاء وفرق عمل.
تتخصص تالة في منظومة React الحديثة، Vite، Tailwind CSS، ربط الـ APIs المعقدة، وهندسة تجربة المستخدم (UI/UX Engineering). وتتميز بكتابة كود نظيف (Clean Code) قابل للصيانة والتوسع مع مراعاة أعلى معايير سرعة الأداء وسهولة الوصول (Accessibility).
    `.trim(),
    highlights: ['+2 سنوات خبرة عملية', '+20 مشروع منجز', '+10 عملاء راضين', 'توجيه برمجي (Co-Mentoring)']
  },

  // 2. Featured Project: Kafeeli Platform
  {
    id: 'project-kafeeli',
    category: 'projects',
    title: 'دراسة حالة: منصة كفيلي لكفالة الأيتام (Kafeeli Platform)',
    sourceLabel: 'مشروع منصة كفيلي الحية',
    sourceUrl: 'https://kafeeli-frontend.vercel.app/',
    keywords: [
      'كفيلي', 'منصة كفيلي', 'ايتام', 'كفالة', 'kafeeli', 'orphan', 'guardian dashboard', 'لوحة الاوصياء',
      'axios', 'react', 'vite', 'tailwind', 'فريق', 'فريق عمل'
    ],
    content: `
منصة "كفيلي" (Kafeeli) هي منصة ويب إنتاجية حقيقية متكاملة تهدف إلى كفالة الأيتام وضمان الشفافية المالية والحالة بنسبة 100% بين الأوصياء والكفلاء.
- دور تالة في المشروع: عملت تالة كمطورة واجهات أمامية ضمن فريق تقني متعدد التخصصات (UI/UX Designers, Frontend & Backend Developers).
- الإنجاز الأساسي: قامت تالة بهندسة وبناء لوحة تحكم الأوصياء (Guardian Dashboard) بالكامل، وبرمجة نماذج إضافة وإدارة الأيتام، مع تكامل كامل وسلس مع خوادم الـ RESTful APIs بواسطة مكتبة Axios.
- التقنيات المستخدمة: React.js, Vite, Tailwind CSS, Axios, REST APIs.
- رابط المنصة الحية: https://kafeeli-frontend.vercel.app/
    `.trim(),
    highlights: ['لوحة تحكم الأوصياء', 'تكامل Axios REST API', 'عمل جماعي Cross-functional', 'إنتاج حقيقي Production']
  },

  // 3. Featured Project: Smart Dynamic QR Attendance System (TAQAT)
  {
    id: 'project-taqat-qr',
    category: 'projects',
    title: 'دراسة حالة: نظام الحضور الذكي بـ QR Code (برنامج طاقات)',
    sourceLabel: 'نظام الحضور الذكي - TAQAT CodeMap 3',
    sourceUrl: 'https://taqat-mentors.vercel.app/admin/dashboard',
    keywords: [
      'طاقات', 'حضور', 'نظام الحضور', 'كود مارب', 'taqat', 'qr', 'qr code', 'attendance', 'غياب',
      'supabase', 'xlsx', 'excel', 'احتيال', 'توليد كود', 'جلسة'
    ],
    content: `
نظام الحضور الذكي (Smart Dynamic QR Attendance System) هو أداة متقدمة ابتكرتها وطوّرتها تالة لحل مشكلة التسجيل الورقي ومنع تسجيل الحضور الوهمي أو عن بُعد لمتدربي برنامج TAQAT - CodeMap 3.
- الميزات الهندسية:
  1. توليد كود QR ديناميكي مرتبط بوقت زمني محدد للجلسة (Session-based Dynamic QR Generation).
  2. لوحة تحكم وإحصائيات فورية للمشرفين (Mentor Dashboard) لعرض نسب الحضور والتأخير لحظياً.
  3. نظام تصدير تلقائي لتقارير الحضور بملفات إكسل الرسمية (Automated XLSX Reporting).
  4. الربط المباشر مع قاعدة بيانات Supabase للمزامنة اللحظية (Real-time).
- التقنيات المستخدمة: React 19, Vite, Supabase, Tailwind CSS, Real-time state, XLSX library.
- رابط لوحة التحكم: https://taqat-mentors.vercel.app/admin/dashboard
    `.trim(),
    highlights: ['منع الحضور الوهمي', 'QR ديناميكي للجلسات', 'تصدير إكسل XLSX', 'ربط Supabase لحظي']
  },

  // 4. Featured Project: Islamic Prayer Times & Schedules
  {
    id: 'project-prayer-times',
    category: 'projects',
    title: 'مشروع تطبيق مواقيت الصلاة (Islamic Prayer Times API)',
    sourceLabel: 'تطبيق مواقيت الصلاة الحي',
    sourceUrl: 'https://prayer-times-api-lime.vercel.app/',
    keywords: [
      'صلاة', 'مواقيت', 'اذان', 'مواقيت الصلاة', 'prayer', 'prayer times', 'geolocation', 'موقع جغرافي',
      'api', 'web api', 'توقيت'
    ],
    content: `
تطبيق مواقيت الصلاة هو تطبيق ويب متطور يعتمد على الموقع الجغرافي للمستخدم (Browser Geolocation API) لحساب وعرض أوقات الصلاة اليومية بدقة بالغة.
- الميزات: تحويل وحساب فروق التوقيت والمناطق الزمنية تلقائياً، واجهة مستخدم نظيفة وبسيطة، واسترجاع البيانات عبر REST APIs موثوقة.
- التقنيات: HTML5, CSS3, JavaScript (ES6+), RESTful APIs.
- رابط التطبيق: https://prayer-times-api-lime.vercel.app/
    `.trim(),
    highlights: ['تحديد تلقائي للموقع Geolocation', 'واجهة خفيفة وسريعة', 'استهلاك REST API مباشر']
  },

  // 5. Featured Project: Task Flow Hub (To-Do List)
  {
    id: 'project-task-flow',
    category: 'projects',
    title: 'مشروع إدارة المهام اليومية (Task Flow Hub)',
    sourceLabel: 'تطبيق إدارة المهام الحي',
    sourceUrl: 'https://talaabusheha.github.io/To-Do-List/',
    keywords: [
      'مهام', 'تودو', 'قائمة مهام', 'انتاجية', 'todo', 'to-do', 'task', 'localstorage', 'تخزين محلي',
      'تصفية', 'فلترة'
    ],
    content: `
تطبيق Task Flow & Productivity Hub هو تطبيق لإدارة وتنظيم المهام اليومية مع التركيز على تجربة مستخدم سريعة وسلسة.
- الميزات: حفظ البيانات تلقائياً في التخزين المحلي للمتصفح (LocalStorage)، تصنيف وترتيب المهام حسب الأولوية وتاريخ الاستحقاق، وبحث وفلترة سريعة.
- التقنيات: JavaScript Vanilla, HTML5, Tailwind CSS, LocalStorage.
- رابط التطبيق: https://talaabusheha.github.io/To-Do-List/
    `.trim(),
    highlights: ['حفظ تلقائي LocalStorage', 'فرز وتصفية المهام', 'أنيميشن سلس بـ Tailwind']
  },

  // 6. Experience: Mentorship at TAQAT (CodeMap 3)
  {
    id: 'experience-mentorship',
    category: 'experience',
    title: 'خبرة التدريب والتوجيه: Co-Mentor في برنامج TAQAT - CodeMap 3',
    sourceLabel: 'سيكشن الخبرات والتوجيه البرمجي',
    sourceUrl: '#experience',
    keywords: [
      'تدريب', 'توجيه', 'منتور', 'مرشد', 'طاقات', 'كود مارب', 'codemap', 'taqat', 'mentor', 'mentorship',
      'code review', 'مراجعة اكواد', 'طلاب', 'متدربين'
    ],
    content: `
تشغل تالة منصب Co-Mentor في برنامج CodeMap 3 التابع لمؤسسة TAQAT منذ سبتمبر 2026 وحتى الآن.
- المسؤوليات الأساسية:
  1. تدريب وتوجيه المتدربين الجدد على أسس وتطبيقات تطوير الواجهات الأمامية الحديثة.
  2. إجراء مراجعات تفصيلية للأكواد البرمجية (Code Reviews) وتقديم الملاحظات لتحسين الأداء والأمان ونظافة الكود.
  3. مساعدة المتدربين في تجاوز الأخطاء البرمجية (Debugging) ومشاكل التجاوب والتكامل مع الـ APIs.
  4. تصميم وتطوير الأدوات الداخلية للبرنامج مثل نظام الحضور الذكي بـ QR Code.
    `.trim(),
    highlights: ['مراجعة أكواد المتدربين', 'جلسات توجيه تقنية', 'بناء أدوات داخلية لمؤسسة TAQAT']
  },

  // 7. Technical Skills: Core Frontend
  {
    id: 'skills-frontend-core',
    category: 'skills',
    title: 'الترسانة التقنية: الواجهات الأمامية الأساسية (React 19 & JS/TS)',
    sourceLabel: 'سيكشن المهارات التقنية',
    sourceUrl: '#skills',
    keywords: [
      'react', 'react 19', 'رياكت', 'javascript', 'typescript', 'جافا سكريبت', 'تايب سكريبت',
      'html', 'css', 'vite', 'فايت', 'spas', 'hooks', 'state management'
    ],
    content: `
تمتلك تالة إتقاناً عميقاً لمنظومة تطوير الواجهات الأمامية الأساسية:
- React.js (بما في ذلك React 19): بناء مكونات برمجية قابلة لإعادة الاستخدام (Reusable Components)، برمجة الخطافات المخصصة (Custom Hooks)، إدارة الحالة بفعالية، وتحسين عمليات إعادة الرندر (Render Optimization).
- Vite: إعداد وضبط بيئات التطوير السريعة وتوليد حزم الإنتاج بأعلى كفاءة وسرعة تحميل.
- JavaScript (ES6+): المفاهيم المتقدمة (Closures, Promises, Async/Await, ES Modules, Destructuring).
- TypeScript: كتابة كود مدعوم بالأنواع الصارمة للواجهات وتفادي أخطاء التشغيل (Type Safety).
- HTML5 & CSS3: الهيكلية الدلالية (Semantic Markup)، التوافقية العالية، وسهولة الوصول (Accessibility - a11y).
    `.trim(),
    highlights: ['React 19 & Custom Hooks', 'Vite Bundler', 'TypeScript & ES6+', 'Semantic HTML5']
  },

  // 8. Technical Skills: UI & Styling
  {
    id: 'skills-styling-ui',
    category: 'skills',
    title: 'الترسانة التقنية: هندسة الـ UI/UX و Tailwind CSS والتصميم المتجاوب',
    sourceLabel: 'سيكشن المهارات والتصميم',
    sourceUrl: '#skills',
    keywords: [
      'tailwind', 'tailwind css', 'تايلوند', 'تصميم', 'ui', 'ux', 'responsive', 'متجاوب',
      'dark mode', 'وضع ليلي', 'انيميشن', 'animation', 'bootstrap'
    ],
    content: `
تتميز تالة بقدرتها الفائقة على تحويل تصاميم Figma المعقدة إلى واجهات حية بكسل بـ بكسل (Pixel-Perfect):
- Tailwind CSS: إتقان شامل لأحدث إصدارات Tailwind، وبناء أنظمة تصميم موحدة (Design Tokens)، ودعم كامل وسلس للوضعين الفاتح والداكن (Light & Dark Modes).
- Responsive Design: توافق دقيق مع كافة أحجام الشاشات (الهواتف الذكية، الأجهزة اللوحية، الحواسيب المحمولة والشاشات العريضة).
- CSS Animations & Micro-interactions: إضافة حركات وتفاعلات بصرية ناعمة تعزز تجربة المستخدم دون التأثير على سرعة الموقع (GPU-accelerated transforms).
    `.trim(),
    highlights: ['Pixel-perfect UI', 'Dark & Light Mode', 'Mobile-first Responsive', 'Hardware-accelerated CSS']
  },

  // 9. Technical Skills: Backend Integration & APIs
  {
    id: 'skills-backend-api',
    category: 'skills',
    title: 'الترسانة التقنية: تكامل الـ APIs، Supabase وقواعد البيانات السحابية',
    sourceLabel: 'سيكشن المهارات والربط السحابي',
    sourceUrl: '#skills',
    keywords: [
      'api', 'apis', 'rest', 'restful', 'axios', 'supabase', 'سوبابيز', 'باك اند', 'backend',
      'قواعد بيانات', 'database', 'auth', 'مصادقة', 'realtime'
    ],
    content: `
على الرغم من تركيز تالة الأساسي على تطوير الواجهات الأمامية، إلا أنها تمتلك قدرة استثنائية على التكامل والربط مع الخدمات الخلفية:
- RESTful APIs: الربط المتقدم باستخدام Axios و Fetch API، معالجة حالات التحميل والأخطاء، وتنسيق تدفق البيانات.
- Supabase: إنشاء الجداول، تفعيل المصادقة (Auth)، إدارة قواعد البيانات السحابية، والاشتراك في التحديثات اللحظية (Real-time Subscriptions).
- Local Storage & Caching: حفظ وتخزين البيانات محلياً لتسريع تجربة الاستخدام عند انقطاع الاتصال.
    `.trim(),
    highlights: ['Axios RESTful Integration', 'Supabase Real-Time DB', 'Authentication & Error Handling']
  },

  // 10. Career Availability & Work Philosophy
  {
    id: 'career-availability',
    category: 'career',
    title: 'الإتاحة للعمل والتوظيف ونمط العمل عن بُعد',
    sourceLabel: 'معلومات الإتاحة والتوظيف',
    sourceUrl: '#contact',
    keywords: [
      'توظيف', 'متاحة', 'شغل', 'وظيفة', 'عمل حر', 'freelance', 'remote', 'عن بعد', 'فلسطين',
      'دوام', 'full-time', 'part-time', 'availability', 'hire'
    ],
    content: `
تالة متاحة حالياً وجاهزة لبدء التعاون في:
1. وظائف تطوير الواجهات الأمامية بدوام كامل أو جزئي (Full-Time / Part-Time Front-End Roles).
2. عقود ومشاريع العمل الحر (Freelance Contracts).
3. استشارات بناء الواجهات وتطوير تجربة المستخدم للشركات الناشئة.
- نمط العمل: تعمل تالة بكفاءة تامة عن بُعد (Remote Work) من فلسطين مع شركات ومؤسسات محلية ودولية عبر أدوات العمل الحديثة (Slack, GitHub, Zoom, Notion, Jira).
    `.trim(),
    highlights: ['متاحة للتوظيف الفوري', 'عمل عن بُعد حول العالم', 'عقود فريلانس ومشاريع مخصصة']
  },

  // 11. Pricing & Quotes
  {
    id: 'services-pricing',
    category: 'services',
    title: 'سياسة التسعير وتقدير تكلفة المشاريع والعمل الحر',
    sourceLabel: 'طلب عرض سعر واستشارة مجانية',
    sourceUrl: 'https://wa.me/970594828270',
    keywords: [
      'سعر', 'اسعار', 'تكلفة', 'كم يكلف', 'بكام', 'ميزانية', 'price', 'cost', 'quote', 'budget',
      'عرض سعر', 'تقدير'
    ],
    content: `
سياسة تالة في تسعير المشاريع تعتمد على مبدأ الشفافية والقيمة المضافة:
- المعايير المحددة للتكلفة:
  1. حجم ونطاق المشروع (عدد الواجهات والصفحات المطلوبة).
  2. التعقيد التقني (لوحات تحكم، ربط مع قواعد بيانات و APIs، بوابات دفع، إلخ).
  3. الموعد النهائي وجدول التسليم المطلوب.
- تقدم تالة تقديراً مجانياً وسريعاً لأي فكرة مشروع، مع الالتزام بتوفير أعلى جودة برمجية متوافقة مع الميزانية المحددة.
- للحصول على عرض سعر دقيق، يُفضل التواصل مباشرة عبر الواتساب لشرح تفاصيل المشروع ومميزاته.
    `.trim(),
    highlights: ['استشارة وعرض سعر مجاني', 'تسعير مرن حسب النطاق', 'التزام تام بمواعيد التسليم']
  },

  // 12. Contact Channels & Resume
  {
    id: 'contact-resume',
    category: 'contact',
    title: 'وسائل التواصل المباشرة وتحميل السيرة الذاتية (CV)',
    sourceLabel: 'وسائل التواصل والسيرة الذاتية',
    sourceUrl: 'https://wa.me/970594828270',
    keywords: [
      'تواصل', 'رقم', 'واتس', 'واتساب', 'ايميل', 'بريد', 'لينكد', 'linkedin', 'github', 'جيت هاب',
      'cv', 'resume', 'سيرة ذاتية', 'تحميل cv'
    ],
    content: `
قنوات التواصل الرسمية والمباشرة مع تالة ابوشيحة:
- الواتساب المباشر: +970 594828270 (رابط سريع: https://wa.me/970594828270)
- البريد الإلكتروني: talaabusheha@gmail.com
- حساب LinkedIn: https://www.linkedin.com/in/talaabusheha2832005/
- حساب GitHub: https://github.com/talaabusheha
- السيرة الذاتية المحدثة (Resume / CV): متاحة للعرض والتحميل بصيغة PDF مباشرة عبر الرابط المعتمد بالبورتفوليو.
    `.trim(),
    highlights: ['واتساب مباشر +970594828270', 'رد سريع عبر الإيميل', 'ملف CV جاهز للتحميل']
  }
];
