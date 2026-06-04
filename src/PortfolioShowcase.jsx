import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PortfolioShowcase = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب المشاريع
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/public/portfolio');
      const data = await response.json();
      console.log('البيانات المستلمة:', data);
      
      // معالجة البيانات حسب الصيغة المستلمة
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else if (data.success !== false && data.projects) {
        setProjects(data.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('خطأ في جلب المشاريع:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // استدعاء fetchProjects عند تحميل المكون
  useEffect(() => {
    fetchProjects();
  }, []);

  // دالة لتحويل التقنيات إلى مصفوفة
  const parseTech = (tech) => {
    if (!tech) return [];
    if (Array.isArray(tech)) return tech;
    if (typeof tech === 'string') {
      return tech.split(',').map(t => t.trim());
    }
    return [];
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">

        {/* عنوان السكشن */}
        <div className="portfolio-header">
          <h2 className="portfolio-title">
            {t('portfolio.section_title') || 'معرض أعمالي ومشاريعي'}
          </h2>
          <p className="portfolio-desc">
            {t('portfolio.section_desc') || 'أبرز الألعاب والأنظمة الذكية التي قمت بتطويرها وبرمجتها بأحدث التقنيات.'}
          </p>
        </div>

        {/* شبكة المشاريع الديناميكية */}
        <div className="portfolio-grid">
          {loading ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'center' }}>جاري تحميل المشاريع...</p>
          ) : projects.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'center' }}>لا توجد مشاريع معروضة حالياً، يمكنك إضافتها من لوحة التحكم.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="portfolio-card">
                <div>
                  {/* رأس الكارت: التصنيف والعنوان */}
                  <div className="portfolio-card-top">
                    <span className="portfolio-tag">
                      {project.tag}
                    </span>
                    <h3 className="portfolio-card-title">
                      {project.title}
                    </h3>
                  </div>

                  {/* وصف المشروع */}
                  <p className="portfolio-card-desc">
                    {project.desc}
                  </p>

                  {/* التقنيات المستعملة */}
                  <div className="portfolio-tech-list">
                    {parseTech(project.tech).map((tech, i) => (
                      <span key={i} className="portfolio-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* زر استكشف المشروع */}
                <a
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-btn"
                >
                  <span className="portfolio-btn-text">
                    {t('portfolio.view_project') || 'استكشف المشروع'} 🎮
                  </span>
                </a>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default PortfolioShowcase;
