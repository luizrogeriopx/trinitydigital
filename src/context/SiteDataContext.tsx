/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as staticData from "@/data/site";
import { toast } from "sonner";

interface SiteDataContextType {
  site: typeof staticData.site;
  indicadores: typeof staticData.indicadores;
  servicos: typeof staticData.servicos;
  diferenciais: typeof staticData.diferenciais;
  processo: typeof staticData.processo;
  projetos: typeof staticData.projetos;
  resultados: typeof staticData.resultados;
  depoimentos: typeof staticData.depoimentos;
  faqs: typeof staticData.faqs;
  posts: typeof staticData.posts;
  loading: boolean;
  user: any;
  updateSection: (key: string, value: any) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const parseDbData = (data: any[] | null) => {
  const contentMap: Record<string, any> = {};
  if (data && data.length > 0) {
    data.forEach((row) => {
      contentMap[row.key] = row.value;
    });
  }
  return contentMap;
};

export function SiteDataProvider({
  children,
  initialDbData = null,
}: {
  children: React.ReactNode;
  initialDbData?: any[] | null;
}) {
  const contentMap = parseDbData(initialDbData);

  const [site, setSite] = useState(() =>
    contentMap.site ? { ...staticData.site, ...contentMap.site } : staticData.site,
  );
  const [indicadores, setIndicadores] = useState(
    () => contentMap.indicadores || staticData.indicadores,
  );
  const [servicos, setServicos] = useState(() => contentMap.servicos || staticData.servicos);
  const [diferenciais, setDiferenciais] = useState(
    () => contentMap.diferenciais || staticData.diferenciais,
  );
  const [processo, setProcesso] = useState(() => contentMap.processo || staticData.processo);
  const [projetos, setProjetos] = useState(() => contentMap.projetos || staticData.projetos);
  const [resultados, setResultados] = useState(
    () => contentMap.resultados || staticData.resultados,
  );
  const [depoimentos, setDepoimentos] = useState(
    () => contentMap.depoimentos || staticData.depoimentos,
  );
  const [faqs, setFaqs] = useState(() => contentMap.faqs || staticData.faqs);
  const [posts, setPosts] = useState(() => contentMap.posts || staticData.posts);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Monitor Auth State
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // User inactivity timeout (15 minutes)
  useEffect(() => {
    if (!user) return;

    const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
    let timeoutId: any;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        await supabase.auth.signOut();
        toast.warning("Sessão encerrada por inatividade. Por segurança, faça login novamente.");
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [user]);

  const refreshData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) {
        console.warn(
          "Could not load from site_content table, using local defaults:",
          error.message,
        );
        return;
      }

      if (data && data.length > 0) {
        const freshMap = parseDbData(data);

        if (freshMap.site) setSite({ ...staticData.site, ...freshMap.site });
        if (freshMap.indicadores) setIndicadores(freshMap.indicadores);
        if (freshMap.servicos) setServicos(freshMap.servicos);
        if (freshMap.diferenciais) setDiferenciais(freshMap.diferenciais);
        if (freshMap.processo) setProcesso(freshMap.processo);
        if (freshMap.projetos) setProjetos(freshMap.projetos);
        if (freshMap.resultados) setResultados(freshMap.resultados);
        if (freshMap.depoimentos) setDepoimentos(freshMap.depoimentos);
        if (freshMap.faqs) setFaqs(freshMap.faqs);
        if (freshMap.posts) setPosts(freshMap.posts);
      }
    } catch (err) {
      console.error("Error refreshing site content:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (key: string, value: any): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

      if (error) {
        console.error(`Error updating section ${key}:`, error);
        toast.error(`Erro ao salvar seção ${key}: ${error.message}`);
        return false;
      }

      // Update state locally
      switch (key) {
        case "site":
          setSite(value);
          break;
        case "indicadores":
          setIndicadores(value);
          break;
        case "servicos":
          setServicos(value);
          break;
        case "diferenciais":
          setDiferenciais(value);
          break;
        case "processo":
          setProcesso(value);
          break;
        case "projetos":
          setProjetos(value);
          break;
        case "resultados":
          setResultados(value);
          break;
        case "depoimentos":
          setDepoimentos(value);
          break;
        case "faqs":
          setFaqs(value);
          break;
        case "posts":
          setPosts(value);
          break;
        default:
          break;
      }

      return true;
    } catch (err: any) {
      console.error(`Error updating section ${key}:`, err);
      toast.error(`Erro inesperado ao salvar: ${err.message || err}`);
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        site,
        indicadores,
        servicos,
        diferenciais,
        processo,
        projetos,
        resultados,
        depoimentos,
        faqs,
        posts,
        loading,
        user,
        updateSection,
        refreshData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
