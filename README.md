# New App - محادثة صوتية مع الذكاء الاصطناعي للمكفوفين

## وصف التطبيق

تطبيق **محادثة صوتية مع الذكاء الاصطناعي للمكفوفين** هو تطبيق يتيح للمستخدمين التفاعل مع الذكاء الاصطناعي من خلال الأوامر الصوتية، والحصول على استجابات صوتية احترافية ومتوافقة. تم تصميم التطبيق خصيصًا ليكون متوافقًا مع احتياجات المكفوفين وضعاف البصر، مع التركيز على تجربة صوتية سلسة ومتوافقة مع المعايير.

## رحلة المستخدم

### 1. بدء وإيقاف المحادثة

- عند فتح التطبيق، يظهر زر كبير في المنتصف لبدء المحادثة.
- يمكن للمستخدم الضغط على الزر لبدء المحادثة.
- بعد بدء المحادثة، يتغير الزر إلى "إيقاف المحادثة"، مما يتيح للمستخدم القدرة على إنهاء المحادثة في أي وقت.

### 2. التحدث إلى الذكاء الاصطناعي

- بعد الضغط على زر "بدء المحادثة"، يبدأ التطبيق بالاستماع إلى المستخدم.
- يقوم المستخدم بطرح سؤاله أو طلبه صوتيًا.
- يتم عرض إشارة صوتية أو بصرية تدل على أن التطبيق يستمع.

### 3. معالجة الاستجابة

- يقوم التطبيق بإرسال النص إلى الخادم لمعالجته باستخدام الذكاء الاصطناعي.
- يتم استخدام تقنية ChatGPT لمعالجة النص وتوليد استجابة احترافية ومتوافقة.
- يتم تحويل الاستجابة النصية إلى صوت باستخدام تقنية تحويل النص إلى كلام.

### 4. استلام الاستجابة

- يتم تشغيل الاستجابة الصوتية للمستخدم.
- بعد نهاية الاستجابة الصوتية، يستمر التطبيق بالاستماع مجددًا إذا كانت المحادثة نشطة.
- يمكن للمستخدم التفاعل مرة أخرى بطرح سؤال جديد مباشرة.

### 5. إيقاف المحادثة

- يمكن للمستخدم في أي وقت الضغط على زر "إيقاف المحادثة" لإنهاء المحادثة.
- عند إيقاف المحادثة، يتوقف التطبيق عن الاستماع وتتم إعادة تعيين الحالة.

### 6. الميزات الإضافية

- **دعم الأوامر الصوتية بالكامل**: يمكن للمستخدم التنقل في التطبيق باستخدام الأوامر الصوتية فقط.
- **تصميم بسيط وواضح**: تم تصميم الواجهة لتكون بسيطة وخالية من التعقيدات لتسهيل الاستخدام.
- **تحسين الوصولية**: جميع العناصر تحتوي على تسميات ARIA ويتم دعم برامج قراءة الشاشة.
- **استجابات احترافية ومتوافقة**: يضمن التطبيق أن تكون جميع الاستجابات من الذكاء الاصطناعي ذات جودة عالية ومتوافقة مع المعايير.

## المتطلبات التقنية

- **الميكروفون**: يحتاج التطبيق إلى الوصول إلى ميكروفون الجهاز للاستماع إلى المستخدم.
- **الصوت**: يحتاج التطبيق إلى القدرة على تشغيل الصوت لإعطاء الاستجابات.

## الخدمات الخارجية المستخدمة

- **واجهة برمجة تطبيقات تحويل الكلام إلى نص**: لتحويل خطاب المستخدم إلى نص.
- **OpenAI ChatGPT**: لمعالجة النص وتوليد استجابات احترافية ومتوافقة.
- **واجهة برمجة تطبيقات تحويل النص إلى كلام**: لتحويل الاستجابة النصية إلى صوت يتم تشغيله للمستخدم.

## المتغيرات البيئية المطلوبة (.env)

- `VITE_PUBLIC_APP_ID`: معرف التطبيق المستخدم في ZAPT.
- `SPEECH_TO_TEXT_API_KEY`: مفتاح API لخدمة تحويل الكلام إلى نص.
- `TEXT_TO_SPEECH_API_KEY`: مفتاح API لخدمة تحويل النص إلى كلام.

## ملاحظات إضافية

- التطبيق مصمم ليكون متجاوبًا ويعمل على مختلف الأجهزة.
- تم التركيز على الوصولية لضمان تجربة مستخدم سلسة للمكفوفين.
- يتم التأكد من أن جميع الاستجابات من الذكاء الاصطناعي احترافية ومتوافقة مع المعايير.
- **الجديد:** تمت إضافة زر "بدء المحادثة" و"إيقاف المحادثة" لمنح المستخدم تحكمًا أكبر في تجربة المحادثة مع الذكاء الاصطناعي.