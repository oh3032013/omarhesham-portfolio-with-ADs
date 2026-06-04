import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * مكون SEO قابل لإعادة الاستخدام لكل صفحة
 * يدعم العنوان والوصف و Open Graph و Twitter Cards
 */
const SEOHead = ({ 
  title = 'OmarXGaming | عالم الألعاب والإثارة اللامتناهية 🎮',
  description = 'محفظة أعمال صانع المحتوى واليوتيوبر الأسطوري OmarXGaming. استكشف أحدث الفيديوهات، الإحصائيات، وأدوات الجيمينج الاحترافية.',
  canonical = '/',
  ogType = 'website',
  ogImage = '/src/assets/logo.jpg',
  lang = 'ar'
}) => {
  const siteUrl = 'https://omarxgaming.com';
  const fullUrl = `${siteUrl}${canonical}`;
  const fullImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_AR' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
};

export default SEOHead;
