
"use client";

import { useAutoTranslation } from '@/hooks/useAutoTranslation';

export default function AboutClientPage() {
  const { translatedText: pageTitle, isLoading: isLoadingPageTitle } = useAutoTranslation('about.title');
  const { translatedText: intro1, isLoading: isLoadingIntro1 } = useAutoTranslation('about.intro1');
  const { translatedText: intro2, isLoading: isLoadingIntro2 } = useAutoTranslation('about.intro2');
  const { translatedText: intro3, isLoading: isLoadingIntro3 } = useAutoTranslation('about.intro3');
  const { translatedText: outro, isLoading: isLoadingOutro } = useAutoTranslation('about.outro');
  
  const renderText = (text: string, isLoading: boolean, isHtml = false) => {
    if (isLoading) {
      if (isHtml) return <div className="space-y-2"><p className="h-5 bg-muted-foreground/20 rounded w-full animate-pulse"></p><p className="h-5 bg-muted-foreground/20 rounded w-3/4 animate-pulse"></p></div>;
      return <p className="h-5 bg-muted-foreground/20 rounded w-full animate-pulse"></p>;
    }
    if (isHtml) return <p dangerouslySetInnerHTML={{ __html: text }} />;
    return <p>{text}</p>;
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {isLoadingPageTitle ? <span className="h-12 w-1/2 mx-auto animate-pulse bg-primary/20 rounded"></span> : pageTitle}
        </h1>
      </header>
      
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
          {renderText(intro1, isLoadingIntro1, true)}
          {renderText(intro2, isLoadingIntro2)}
          {renderText(intro3, isLoadingIntro3)}
          {renderText(outro, isLoadingOutro)}
        </div>
      </div>
    </div>
  );
}
