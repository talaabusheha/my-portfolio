/**
 * AI Service for Tala's Portfolio Assistant
 * Supports Gemini 2.5 Flash via REST API with an intelligent, polite local engine
 * and structured action triggers (Smooth Scroll, External Links, Resume Download).
 */

const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Tala Abusheha (تالة ابوشيحة), a professional Front-End Developer and Co-Mentor.
Your personality is extremely polite, warm, welcoming, intelligent, respectful, and articulate (لبق، ودود، ذوق، ومحترم جداً).

Knowledge Base about Tala Abusheha (تالة ابوشيحة):
- Name: Tala Abusheha (تالة ابوشيحة)
- Profession: Front-End Developer & Co-Mentor (مطورة واجهات أمامية وموجهة برمجية)
- Experience Level: +2 years of active development & mentoring experience.
- Key Achievements: +20 completed projects, +10 satisfied clients.
- Main Specialization: Modern Front-End Web Development with React.js, Vite, Tailwind CSS, JavaScript (ES6+), TypeScript, HTML5/CSS3, and RESTful APIs.

Work Experience:
1. Co-Mentor & Front-End Developer at TAQAT — CodeMap 3 Program (Sep 2026 - Present):
   - Co-Mentoring trainees, conducting code reviews, and guiding web development workflows.
   - Architected and developed a full-scale session-based Dynamic QR Attendance System with mentor dashboard and automated XLSX reporting.
2. Front-End Web Developer at Kafeeli Platform (Team Collaboration, 2026):
   - Collaborated in a cross-functional team (UI/UX, Frontend & Backend) to build a comprehensive orphan sponsorship platform.
   - Built the Guardian Dashboard using Axios and RESTful APIs.
3. Freelance & Independent Projects (2024 - Present):
   - Building responsive, fast, pixel-perfect web applications with clean code.

Featured Projects:
1. Kafeeli (Orphan Sponsorship Platform): Real-world web platform for transparent orphan sponsorship using React.js, Vite, Axios, and REST APIs. (Link: https://kafeeli-frontend.vercel.app/)
2. Smart Dynamic QR Attendance System: Real-world attendance tool for TAQAT with dynamic QR generation, Supabase, real-time analytics, and XLSX export. (Link: https://taqat-mentors.vercel.app/admin/dashboard)
3. Islamic Prayer Times & Schedules: Location-aware web app calculating accurate prayer times via REST APIs. (Link: https://prayer-times-api-lime.vercel.app/)
4. Task Flow & Productivity Hub (To-Do List): Real-time task manager with local storage persistence and priority filtering. (Link: https://talaabusheha.github.io/To-Do-List/)

Technical Arsenal (Skills):
- Core: React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3.
- Styling: Tailwind CSS, Bootstrap, UI Components, Responsive Design, CSS Animations.
- Tools & Ecosystem: Vite, Git & GitHub, Supabase, REST APIs & Axios, Antigravity IDE, Claude & Gemini AI.

Contact & Social Links:
- Email: talaabusheha@gmail.com
- WhatsApp: +970 594828270 (https://wa.me/970594828270)
- LinkedIn: https://www.linkedin.com/in/talaabusheha2832005/
- GitHub: https://github.com/talaabusheha
- Resume: https://drive.google.com

Conversational Guidelines & Tone:
1. Always be courteous, cheerful, and pleasant.
2. If the user thanks you, respond warmly.
3. If the user praises or compliments, respond with gratitude.
4. If asked pleasantries like "كيف حالك", reply warmly and pleasantly.
5. If the user asks general unrelated questions, decline very politely and steer back smoothly.
6. Reply in the user's language (Arabic / English).
`;

/**
 * Helper to determine smart interactive actions based on query and response
 */
function extractActionsAndFollowUps(query) {
  const q = query.toLowerCase();

  // Projects
  if (q.includes('project') || q.includes('مشاريع') || q.includes('مشروع') || q.includes('اعمال') || q.includes('أعمال') || q.includes('kafeeli') || q.includes('كفيلي')) {
    return {
      actions: [
        { type: 'scroll', target: '#projects', label: 'الانتقال لقسم المشاريع 🚀' },
        { type: 'link', target: 'https://kafeeli-frontend.vercel.app/', label: 'معاينة منصة كفيلي 🌟' },
      ],
      followUps: ['Tech stack?', 'How to contact?', 'Work experience?'],
    };
  }

  // Skills
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('مهارات') || q.includes('تقنيات') || q.includes('ادوات')) {
    return {
      actions: [
        { type: 'scroll', target: '#skills', label: 'مشاهدة الترسانة التقنية ⚡' },
        { type: 'scroll', target: '#projects', label: 'مشاريع بنيت بهاد الـ Stack 💻' },
      ],
      followUps: ['Show me featured projects', 'Work experience?', 'How to contact?'],
    };
  }

  // Contact / Hire
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('whatsapp') || q.includes('تواصل') || q.includes('توظيف') || q.includes('واتساب') || q.includes('ايميل')) {
    return {
      actions: [
        { type: 'link', target: 'https://wa.me/970594828270', label: 'محادثة عبر واتساب 💬' },
        { type: 'scroll', target: '#contact', label: 'الانتقال لنموذج التواصل 📬' },
      ],
      followUps: ['Download Resume (CV)', 'Projects?', 'Who is Tala?'],
    };
  }

  // Resume / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('سيرة') || q.includes('سي في')) {
    return {
      actions: [
        { type: 'link', target: 'https://drive.google.com', label: 'فتح وتحميل السيرة الذاتية (CV) 📄' },
        { type: 'scroll', target: '#experience', label: 'استعراض الخبرات بالصفحة 💼' },
      ],
      followUps: ['How to contact?', 'Tech stack?', 'Projects?'],
    };
  }

  // Experience
  if (q.includes('experience') || q.includes('خبرة') || q.includes('خبرات') || q.includes('taqat') || q.includes('طاقات')) {
    return {
      actions: [
        { type: 'scroll', target: '#experience', label: 'الانتقال لسيكشن الخبرات 💼' },
      ],
      followUps: ['Projects?', 'Tech stack?', 'How to contact?'],
    };
  }

  // About / Who is Tala
  if (q.includes('who is') || q.includes('من هي') || q.includes('مين تالة') || q.includes('about')) {
    return {
      actions: [
        { type: 'scroll', target: '#about', label: 'قراءة نبذة تالة 🌸' },
        { type: 'scroll', target: '#projects', label: 'استعراض المشاريع 🚀' },
      ],
      followUps: ['Tech stack?', 'Work experience?', 'How to contact?'],
    };
  }

  return {
    actions: [],
    followUps: ['Who is Tala?', 'Projects?', 'Tech stack?', 'How to contact?'],
  };
}

/**
 * Intelligent and polite local intent matching engine (Works without API key or offline)
 */
function getLocalFallbackResponse(userMessage) {
  const raw = userMessage.trim();
  const query = raw.toLowerCase();

  // 1. Resume / CV
  if (query.includes('cv') || query.includes('resume') || query.includes('سيرة') || query.includes('سي في')) {
    return `تفضّل! يمكنك استعراض وتحميل **السيرة الذاتية (Resume / CV)** الخاصة بتالة ابوشيحة مباشرة عبر الزر بالأسفل، أو التمرير لسيكشن الخبرات للاطلاع على مسيرتها بالتفصيل 📄✨`;
  }

  // 2. Thanks & Appreciation
  if (
    query.match(/^(شكرا|شكراً|شكرا لك|شكرا الك|يسلمو|تسلم|مشكور|الله يعطيك العافية|يعطيك العافيه|ممنون|تسلم ايدك|thank you|thanks|thx|appreciate it)/) ||
    query.includes('شكرا') ||
    query.includes('شكراً') ||
    query.includes('تسلم') ||
    query.includes('يسلمو') ||
    query.includes('يعطيك العافية') ||
    query.includes('يعطيك العافيه') ||
    query.includes('thank')
  ) {
    return `العفو! على الرحب والسعة، دائماً في الخدمة ✨ 
يسعدني جداً مساعدتك. إذا عندك أي سؤال تاني عن **تالة ابوشيحة**، مهاراتها، أو حابب تتواصل معها للعمل، أنا جاهز بأي وقت! 😊`;
  }

  // 3. Praise & Compliments
  if (
    query.includes('ما شاء الله') ||
    query.includes('ماشاءالله') ||
    query.includes('ماشاء الله') ||
    query.includes('شاطرة') ||
    query.includes('مبدعة') ||
    query.includes('مبدع') ||
    query.includes('ممتاز') ||
    query.includes('رائع') ||
    query.includes('كفو') ||
    query.includes('برافو') ||
    query.includes('فخورة') ||
    query.includes('great') ||
    query.includes('awesome') ||
    query.includes('impressive') ||
    query.includes('good job')
  ) {
    return `تسلم كلك ذوق! يسعدنا جداً هالكلام الطيب المشجع 🌟
**تالة ابوشيحة** دايماً حريصة على تقديم أفضل جودة برمجية، وبناء تجارب ويب سريعة وعصرية. شكراً لك! 🚀`;
  }

  // 4. How are you / Pleasantries
  if (
    query.includes('كيف حالك') || 
    query.includes('كيفك') || 
    query.includes('كيف الحال') || 
    query.includes('شلونك') || 
    query.includes('اخبارك') || 
    query.includes('أخبارك') || 
    query.includes('عامل ايه') || 
    query.includes('شو اخبارك') || 
    query.includes('عساك بخير') || 
    query.includes('how are you') || 
    query.includes('how r u') || 
    query.includes('how is it going') || 
    query.includes('how do you do')
  ) {
    return `أنا بأفضل حال والحمد لله! شكراً كتير لذوقك وسؤالك اللطيف 🌸 
تفضل، كيف بقدر أساعدك اليوم بخصوص **تالة ابوشيحة** أو مشاريعها؟`;
  }

  // 5. Greetings
  if (query.match(/^(hi|hello|hey|welcome|مرحبا|اهلا|أهلا|سلام|السلام عليكم|صباح الخير|مساء الخير|هلا|يا هلا)/)) {
    return `يا أهلاً وسهلاً بك! نوّرت بورتفوليو **تالة ابوشيحة** 👋✨
أنا مساعدها الذكي، ومستعد أجاوبك على أي سؤال بخصوص مهاراتها، مشاريعها، خبراتها في TAQAT و Kafeeli، أو كيفية التواصل معها. تفضل، كيف بقدر أساعدك؟`;
  }

  // 6. Goodbye / Farewell
  if (
    query.includes('مع السلامة') ||
    query.includes('مع السلاكة') ||
    query.includes('باي') ||
    query.includes('سلامات') ||
    query.includes('تصبح على خير') ||
    query.includes('goodbye') ||
    query.includes('bye') ||
    query.includes('see you')
  ) {
    return `مع ألف سلامة! تشرفت جداً بالحديث معك، وأتمنى لك يوماً سعيداً ومليئاً بالنجاح والتوفيق! ✨😊`;
  }

  // 7. Who are you / Bot Identity
  if (query.includes('who are you') || query.includes('من انت') || query.includes('مين انت') || query.includes('شو انت') || query.includes('عرف عن نفسك')) {
    return `أنا المساعد الذكي الخاص بالمطورة **تالة ابوشيحة** 🤖✨
مهمتي أساعدك في التعرف على تالة عن قرب، استعراض خبراتها ومشاريعها البرمجية، وتسهيل التواصل معها للفرص الوظيفية ومشاريع العمل الحر!`;
  }

  // 8. Who is Tala
  if (query.includes('who is') || query.includes('who') || query.includes('من هي') || query.includes('مين تالة') || query.includes('مين تالا') || query.includes('عرفني') || query.includes('about')) {
    return `**تالة ابوشيحة (Tala Abusheha)** هي مطورة واجهات أمامية شغوفة (Front-End Developer) وموجهة برمجية (Co-Mentor).
- تمتلك خبرة عملية لأكثر من سنتين في تطوير تطبيقات الويب الحديثة.
- متخصصة في **React.js, Vite, Tailwind CSS, و REST APIs**.
- أنجزت أكثر من 20 مشروعاً ناجحاً وشاركت بفرق برمجية واقعية مثل منصة **كفيلي (Kafeeli)** ونظام الحضور الذكي في **طاقات (TAQAT)**.`;
  }

  // 9. Skills & Tech Stack
  if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('مهارات') || query.includes('تقنيات') || query.includes('لغات') || query.includes('ادوات') || query.includes('فرونت') || query.includes('باك')) {
    if (query.includes('باك') || query.includes('backend')) {
      return `**تالة ابوشيحة** متخصصة في **تطوير الواجهات الأمامية (Front-End)**، وتركز باحترافية على بناء تجارب ويب سريعة ومتجاوبة باستخدام React و Vite و Tailwind CSS مع ربط الـ APIs و Supabase، وليست مطورة باك إند أساسية.`;
    }
    return `🚀 **الترسانة التقنية لتالة ابوشيحة:**
- **الواجهات واللغات:** React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3
- **التنسيق والتصميم:** Tailwind CSS, Bootstrap, Responsive Design, CSS Animations
- **الأدوات وقواعد البيانات:** Vite, Supabase, Axios, REST APIs, Git & GitHub, Antigravity IDE, AI Prompt Engineering (Gemini/Claude).`;
  }

  // 10. Experience & TAQAT
  if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('خبرة') || query.includes('خبرات') || query.includes('وظائف') || query.includes('شغل') || query.includes('taqat') || query.includes('طاقات')) {
    return `💼 **الخبرات المهنية لتالة:**
1. **Co-Mentor & Front-End Developer** في برنامج **TAQAT — CodeMap 3** (2026 - الحالي): توجيه المتدربين ومراجعة الأكواد، وبناء نظام حضور ذكي بـ QR Code مع Supabase.
2. **Front-End Developer** في منصة **Kafeeli** (2026): تطوير لوحة تحكم الأوصياء وربط الـ REST APIs مع فريق متكامل.
3. **مشاريع مستقلة وعمل حر (Freelance)** (2024 - الحالي): تحويل تصاميم UI/UX إلى تطبيقات ويب تفاعلية وسريعة.`;
  }

  // 11. Projects
  if (query.includes('project') || query.includes('portfolio') || query.includes('مشاريع') || query.includes('مشروع') || query.includes('اعمال') || query.includes('أعمال') || query.includes('kafeeli') || query.includes('كفيلي')) {
    return `🌟 **أبرز مشاريع تالة المميزة:**
1. **منصة كفيلي (Kafeeli):** منصة متكاملة لكفالة الأيتام بُنيت مع فريق عمل تقني باستخدام React و Axios.
2. **نظام الحضور الذكي بـ QR Code:** أداة متطورة لبرنامج TAQAT لتسجيل الحضور اللحظي ومنع التلاعب مع تصدير تقارير Excel.
3. **تطبيق مواقيت الصلاة (Prayer Times API):** تطبيق يعتمد على الموقع الجغرافي وحساب المواقيت بدقة عبر Web APIs.
4. **Task Flow (To-Do List):** تطبيق إدارة المهام مع حفظ البيانات والتصفية السريعة.`;
  }

  // 12. Contact / Hire
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('whatsapp') || query.includes('تواصل') || query.includes('توظيف') || query.includes('ايميل') || query.includes('واتساب') || query.includes('رقم')) {
    return `📬 **يسعد تالة دائماً التواصل والتعاون معك مباشرة:**
- **البريد الإلكتروني:** talaabusheha@gmail.com
- **واتساب:** +970 594828270
- **لينكد إن:** [LinkedIn Profile](https://www.linkedin.com/in/talaabusheha2832005/)
- **جيت هاب:** [GitHub Profile](https://github.com/talaabusheha)

تالة متاحة للفرص الوظيفية الجديدة ولمشاريع العمل الحر! ✨`;
  }

  // 13. Education / Mentoring
  if (query.includes('mentor') || query.includes('تدريب') || query.includes('تعليم') || query.includes('دراسة')) {
    return `تالة تعمل كـ **Co-Mentor** في برنامج **CodeMap 3** التابع لمؤسسة **TAQAT**، حيث تشرف على تدريب وتوجيه مطوري الواجهات الجدد، مراجعة الأكواد، وتقديم الدعم التقني في مشاريع الويب.`;
  }

  // Polite fallback for unrelated questions
  return `يا هلا فيك! والله ياريت بقدر أساعدك بهاد الموضوع بالتحديد 🌸، لكن أنا مساعد مخصص بالكامل للإجابة عن **تالة ابوشيحة** ومسيرتها في تطوير الواجهات الأمامية والبرمجة 💻.
إذا عندك أي استفسار عن مهارات تالة، مشاريعها، أو حابب تتعاون معها بمشروع، فأنا كلي آذان صاغية! 😊`;
}

/**
 * Main query function to get response from Gemini API or fallback
 * Returns { text, actions, followUps }
 */
export async function askTalaAI(userMessage, conversationHistory = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const { actions, followUps } = extractActionsAndFollowUps(userMessage);

  // If no API key provided, use the smart local matcher
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const text = getLocalFallbackResponse(userMessage);
    return { text, actions, followUps };
  }

  try {
    const formattedContents = [
      ...conversationHistory.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      getLocalFallbackResponse(userMessage);

    return { text: candidateText, actions, followUps };
  } catch (error) {
    console.warn('Falling back to local AI matcher:', error);
    const text = getLocalFallbackResponse(userMessage);
    return { text, actions, followUps };
  }
}
