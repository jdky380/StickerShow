'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';

export default function HomePage() {
  const t = useTranslations('IndexPageText');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError(t('inputRequired') || '请输入要生成贴纸的文本');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || t('generateFailed') || '生成失败');
      }
    } catch (err) {
      setError(t('networkError') || '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('h1Text')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('descriptionBelowH1Text')}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{t('stickerGenerator') || '贴纸生成器'}</h2>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
                placeholder={t('inputPlaceholder') || '在此输入或粘贴文本...'}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
              />
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <button 
                onClick={handleGenerate}
                disabled={loading || !text.trim()}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? (t('generating') || '生成中...') : (t('generateButton') || '生成贴纸')}
              </button>
              
              {result && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">{t('result') || '生成结果'}</h3>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">{t('prompt') || '提示词'}: {result.text}</p>
                    {result.image_url && (
                      <img 
                        src={result.image_url} 
                        alt="Generated sticker"
                        className="mx-auto max-w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 