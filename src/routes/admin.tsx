/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteData } from "@/context/SiteDataContext";
import { toast } from "sonner";
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  LogOut,
  Lock,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  Eye,
  ExternalLink,
  RefreshCw,
  Globe,
  Users,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Sparkles,
  Code2,
  ListOrdered,
  Star,
  MessageSquare,
  AlertCircle,
  ChevronDown,
  User,
  Shield,
  Key,
  EyeOff,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw notFound();
    }
  },
  component: AdminPage,
});

// Helper component for Lead details modal
interface Lead {
  id: string;
  nome: string;
  empresa: string | null;
  whatsapp: string;
  email: string | null;
  servico: string | null;
  orcamento: string | null;
  mensagem: string | null;
  origem: string | null;
  status: "novo" | "contato_realizado" | "proposta_enviada" | "negociacao" | "fechado" | "perdido";
  created_at: string;
}

function AdminPage() {
  const {
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
    updateSection,
    refreshData: refreshSiteData,
    user,
  } = useSiteData();

  const navigate = useNavigate();

  // Admin View State
  const [activeTab, setActiveTab] = useState<"leads" | "content">("leads");
  const [activeSubTab, setActiveSubTab] = useState<string>("geral");

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>("Todos");

  // General Site Form fields
  const [siteNome, setSiteNome] = useState(site.nome);
  const [siteSlogan, setSiteSlogan] = useState(site.slogan);
  const [siteDescricao, setSiteDescricao] = useState(site.descricao);
  const [siteEmail, setSiteEmail] = useState(site.email);
  const [siteWhatsapp, setSiteWhatsapp] = useState(site.whatsapp);
  const [siteWhatsappExibicao, setSiteWhatsappExibicao] = useState(site.whatsappExibicao);
  const [siteCidade, setSiteCidade] = useState(site.cidade);
  const [siteEstado, setSiteEstado] = useState(site.estado);
  const [siteUrl, setSiteUrl] = useState(site.url);
  const [siteInstagram, setSiteInstagram] = useState(site.redes?.instagram || "");
  const [siteFacebook, setSiteFacebook] = useState(site.redes?.facebook || "");
  const [siteLinkedin, setSiteLinkedin] = useState(site.redes?.linkedin || "");

  // Analytics
  const [gaId, setGaId] = useState(site.analytics?.googleAnalyticsId || "");
  const [gtmId, setGtmId] = useState(site.analytics?.googleTagManagerId || "");
  const [pixelId, setPixelId] = useState(site.analytics?.metaPixelId || "");
  const [adsId, setAdsId] = useState(site.analytics?.googleAdsConversionId || "");
  const [verificationId, setVerificationId] = useState(
    site.analytics?.searchConsoleVerification || "",
  );

  // Indicadores Form fields
  const [localIndicadores, setLocalIndicadores] = useState(indicadores);

  // Depoimentos Form fields
  const [localDepoimentos, setLocalDepoimentos] = useState(depoimentos);

  // Faqs Form fields
  const [localFaqs, setLocalFaqs] = useState(faqs);

  // Diferenciais Form fields
  const [localDiferenciais, setLocalDiferenciais] = useState(diferenciais);

  // Processo Form fields
  const [localProcesso, setLocalProcesso] = useState(processo);

  // Resultados Form fields
  const [localResultados, setLocalResultados] = useState(resultados);

  // Projetos Form fields
  const [localProjetos, setLocalProjetos] = useState(projetos);

  // States to track image upload progress
  const [uploadingProjIndex, setUploadingProjIndex] = useState<number | null>(null);
  const [uploadingPostIndex, setUploadingPostIndex] = useState<number | null>(null);

  const handleUploadProjImagem = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }

    try {
      setUploadingProjIndex(index);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `projetos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      const copy = [...localProjetos];
      copy[index].imagem = publicUrl;
      setLocalProjetos(copy);
      toast.success("Imagem do projeto enviada com sucesso!");
    } catch (err: any) {
      console.error("Erro ao fazer upload da imagem do projeto:", err);
      toast.error(`Erro ao enviar imagem: ${err.message || "Erro desconhecido"}`);
    } finally {
      setUploadingProjIndex(null);
    }
  };

  const handleUploadPostImagem = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }

    try {
      setUploadingPostIndex(index);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      const copy = [...localPosts];
      copy[index].imagem = publicUrl;
      setLocalPosts(copy);
      toast.success("Imagem de capa do blog enviada com sucesso!");
    } catch (err: any) {
      console.error("Erro ao fazer upload da imagem de capa:", err);
      toast.error(`Erro ao enviar imagem: ${err.message || "Erro desconhecido"}`);
    } finally {
      setUploadingPostIndex(null);
    }
  };

  // Servicos Form fields
  const [localServicos, setLocalServicos] = useState(servicos);

  // Blog Posts Form fields
  const [localPosts, setLocalPosts] = useState(posts);

  // Sync state with Context site data when it loads
  useEffect(() => {
    setSiteNome(site.nome);
    setSiteSlogan(site.slogan);
    setSiteDescricao(site.descricao);
    setSiteEmail(site.email);
    setSiteWhatsapp(site.whatsapp);
    setSiteWhatsappExibicao(site.whatsappExibicao);
    setSiteCidade(site.cidade);
    setSiteEstado(site.estado);
    setSiteUrl(site.url);
    setSiteInstagram(site.redes?.instagram || "");
    setSiteFacebook(site.redes?.facebook || "");
    setSiteLinkedin(site.redes?.linkedin || "");
    setGaId(site.analytics?.googleAnalyticsId || "");
    setGtmId(site.analytics?.googleTagManagerId || "");
    setPixelId(site.analytics?.metaPixelId || "");
    setAdsId(site.analytics?.googleAdsConversionId || "");
    setVerificationId(site.analytics?.searchConsoleVerification || "");
  }, [site]);

  useEffect(() => {
    setLocalIndicadores(indicadores);
  }, [indicadores]);

  useEffect(() => {
    setLocalDepoimentos(depoimentos);
  }, [depoimentos]);

  useEffect(() => {
    setLocalFaqs(faqs);
  }, [faqs]);

  useEffect(() => {
    setLocalDiferenciais(diferenciais);
  }, [diferenciais]);

  useEffect(() => {
    setLocalProcesso(processo);
  }, [processo]);

  useEffect(() => {
    setLocalResultados(resultados);
  }, [resultados]);

  useEffect(() => {
    setLocalProjetos(projetos);
  }, [projetos]);

  useEffect(() => {
    setLocalServicos(servicos);
  }, [servicos]);

  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  // Fetch leads when authenticated and tab is active
  useEffect(() => {
    if (user && activeTab === "leads") {
      fetchLeads();
    }
  }, [user, activeTab]);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Erro ao carregar leads: " + error.message);
      } else {
        setLeads((data as Lead[]) ?? []);
      }
    } catch (e: any) {
      toast.error("Erro inesperado ao buscar leads");
    } finally {
      setLeadsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", leadId);

      if (error) {
        toast.error("Falha ao atualizar status: " + error.message);
      } else {
        toast.success("Status atualizado!");
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e: any) {
      toast.error("Erro ao processar alteração de status");
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta solicitação permanentemente?")) return;
    try {
      const { error } = await supabase.from("leads").delete().eq("id", leadId);
      if (error) {
        toast.error("Falha ao excluir lead: " + error.message);
      } else {
        toast.success("Solicitação excluída!");
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (e: any) {
      toast.error("Erro ao deletar lead");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada!");
    navigate({ to: "/login" });
  };

  // Content Save Handlers
  const saveGeral = async () => {
    const value = {
      nome: siteNome,
      slogan: siteSlogan,
      descricao: siteDescricao,
      email: siteEmail,
      whatsapp: siteWhatsapp,
      whatsappExibicao: siteWhatsappExibicao,
      cidade: siteCidade,
      estado: siteEstado,
      pais: "BR",
      url: siteUrl,
      redes: {
        instagram: siteInstagram,
        facebook: siteFacebook,
        linkedin: siteLinkedin,
      },
      analytics: {
        googleAnalyticsId: gaId,
        googleTagManagerId: gtmId,
        metaPixelId: pixelId,
        googleAdsConversionId: adsId,
        searchConsoleVerification: verificationId,
      },
    };

    const ok = await updateSection("site", value);
    if (ok) toast.success("Configurações gerais salvas com sucesso!");
  };

  const saveIndicadores = async () => {
    const ok = await updateSection("indicadores", localIndicadores);
    if (ok) toast.success("Indicadores do Hero salvos!");
  };

  const saveDiferenciais = async () => {
    const ok = await updateSection("diferenciais", localDiferenciais);
    if (ok) toast.success("Diferenciais salvos!");
  };

  const saveProcesso = async () => {
    const ok = await updateSection("processo", localProcesso);
    if (ok) toast.success("Etapas do processo salvas!");
  };

  const saveResultados = async () => {
    const ok = await updateSection("resultados", localResultados);
    if (ok) toast.success("Resultados salvos!");
  };

  const saveDepoimentos = async () => {
    const ok = await updateSection("depoimentos", localDepoimentos);
    if (ok) toast.success("Depoimentos de clientes salvos!");
  };

  const saveFaqs = async () => {
    const ok = await updateSection("faqs", localFaqs);
    if (ok) toast.success("Perguntas frequentes salvas!");
  };

  const saveProjetos = async () => {
    const ok = await updateSection("projetos", localProjetos);
    if (ok) toast.success("Projetos do portfólio salvos!");
  };

  const saveServicos = async () => {
    const ok = await updateSection("servicos", localServicos);
    if (ok) toast.success("Serviços atualizados!");
  };

  const savePosts = async () => {
    const ok = await updateSection("posts", localPosts);
    if (ok) toast.success("Posts do blog salvos!");
  };

  // Helper arrays for lead filters and lists
  const statusLabels: Record<Lead["status"], string> = {
    novo: "Novo",
    contato_realizado: "Contato Realizado",
    proposta_enviada: "Proposta Enviada",
    negociacao: "Em Negociação",
    fechado: "Fechado",
    perdido: "Perdido",
  };

  const statusColors: Record<Lead["status"], string> = {
    novo: "bg-blue-100 text-blue-800 border-blue-200",
    contato_realizado: "bg-purple-100 text-purple-800 border-purple-200",
    proposta_enviada: "bg-orange-100 text-orange-800 border-orange-200",
    negociacao: "bg-yellow-100 text-yellow-800 border-yellow-200",
    fechado: "bg-green-100 text-green-800 border-green-200",
    perdido: "bg-red-100 text-red-800 border-red-200",
  };

  // Filtered Leads
  const filteredLeads = leads.filter(
    (l) => leadFilterStatus === "Todos" || l.status === leadFilterStatus,
  );

  return (
    <div className="min-h-screen bg-[color-mix(in_oklab,var(--color-secondary)_25%,var(--color-background))] pt-10 pb-16">
      <div className="container-site">
        {/* Header Dashboard */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <Shield className="size-6 text-brand" /> Painel de Controle
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie solicitações de orçamento e edite qualquer conteúdo do site
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border flex items-center gap-1.5">
              <User className="size-3.5" /> {user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full gap-2 border-destructive/25 text-destructive hover:bg-destructive/5"
            >
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex rounded-xl bg-secondary/80 border p-1 max-w-sm">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "leads"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="size-4" /> Orçamentos ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "content"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings className="size-4" /> Conteúdo do Site
          </button>
        </div>

        {/* Content Section: Leads */}
        {activeTab === "leads" && (
          <div className="mt-8 space-y-6 animate-fade-up">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="surface-card p-5">
                <span className="text-xs font-semibold text-muted-foreground block">
                  Novos Leads
                </span>
                <span className="text-2xl font-bold text-blue-600 mt-1 block">
                  {leads.filter((l) => l.status === "novo").length}
                </span>
              </div>
              <div className="surface-card p-5">
                <span className="text-xs font-semibold text-muted-foreground block">
                  Em Negociação
                </span>
                <span className="text-2xl font-bold text-yellow-600 mt-1 block">
                  {
                    leads.filter(
                      (l) => l.status === "negociacao" || l.status === "proposta_enviada",
                    ).length
                  }
                </span>
              </div>
              <div className="surface-card p-5">
                <span className="text-xs font-semibold text-muted-foreground block">Fechados</span>
                <span className="text-2xl font-bold text-green-600 mt-1 block">
                  {leads.filter((l) => l.status === "fechado").length}
                </span>
              </div>
              <div className="surface-card p-5">
                <span className="text-xs font-semibold text-muted-foreground block">Total</span>
                <span className="text-2xl font-bold text-foreground mt-1 block">
                  {leads.length}
                </span>
              </div>
            </div>

            {/* Leads Table Card */}
            <div className="surface-card overflow-hidden">
              <div className="p-5 border-b border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-base text-foreground">Lista de Solicitações</h3>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Filtrar:</span>
                  {[
                    "Todos",
                    "novo",
                    "contato_realizado",
                    "proposta_enviada",
                    "negociacao",
                    "fechado",
                    "perdido",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => setLeadFilterStatus(status)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        leadFilterStatus === status
                          ? "bg-brand border-brand text-primary-foreground"
                          : "bg-background text-muted-foreground hover:border-brand/40"
                      }`}
                    >
                      {status === "Todos" ? "Todos" : statusLabels[status as Lead["status"]]}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchLeads}
                    disabled={leadsLoading}
                    className="p-2 rounded-full size-8"
                  >
                    <RefreshCw className={`size-3.5 ${leadsLoading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-secondary/40 border-b text-muted-foreground font-semibold">
                      <th className="p-4">Data</th>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Contato</th>
                      <th className="p-4">Serviço</th>
                      <th className="p-4">Orçamento</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          {leadsLoading
                            ? "Buscando solicitações..."
                            : "Nenhuma solicitação encontrada."}
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-secondary/15 transition-colors">
                          <td className="p-4 font-medium">
                            {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="p-4">
                            <span className="block font-semibold text-foreground">{lead.nome}</span>
                            {lead.empresa && (
                              <span className="block text-xs text-muted-foreground">
                                {lead.empresa}
                              </span>
                            )}
                          </td>
                          <td className="p-4 space-y-1">
                            <a
                              href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-brand hover:underline font-medium block"
                            >
                              {lead.whatsapp}
                            </a>
                            {lead.email && (
                              <span className="block text-xs text-muted-foreground">
                                {lead.email}
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-medium">{lead.servico ?? "Não especificado"}</td>
                          <td className="p-4 text-muted-foreground">{lead.orcamento ?? "N/A"}</td>
                          <td className="p-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-semibold ${statusColors[lead.status]}`}
                            >
                              {statusLabels[lead.status]}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedLead(lead)}
                              className="px-2 h-8 rounded-full"
                              title="Visualizar Detalhes"
                            >
                              <Eye className="size-3.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteLead(lead.id)}
                              className="px-2 h-8 rounded-full border-destructive/20 text-destructive hover:bg-destructive/5"
                              title="Excluir"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Section: Website Content Editor */}
        {activeTab === "content" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] items-start animate-fade-up">
            {/* Sub-navigation Sidebar */}
            <aside className="space-y-1 flex flex-row lg:flex-col overflow-x-auto pb-2 lg:pb-0 gap-1 lg:gap-0 select-none">
              {[
                { id: "geral", label: "Configuração Geral", icon: Globe },
                { id: "indicadores", label: "Indicadores (Hero)", icon: Users },
                { id: "servicos", label: "Serviços", icon: Briefcase },
                { id: "diferenciais", label: "Diferenciais", icon: Sparkles },
                { id: "processo", label: "Processo", icon: ListOrdered },
                { id: "portfolio", label: "Portfólio", icon: Code2 },
                { id: "resultados", label: "Resultados", icon: CheckCircle2 },
                { id: "depoimentos", label: "Depoimentos", icon: Star },
                { id: "faq", label: "Perguntas (FAQ)", icon: HelpCircle },
                { id: "blog", label: "Blog", icon: MessageSquare },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setActiveSubTab(subTab.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 text-xs font-semibold rounded-xl text-left border border-transparent shrink-0 transition-colors ${
                    activeSubTab === subTab.id
                      ? "bg-brand text-primary-foreground font-bold shadow-sm"
                      : "bg-background lg:bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <subTab.icon className="size-4 shrink-0" /> {subTab.label}
                </button>
              ))}
            </aside>

            {/* Forms Container */}
            <div className="space-y-6">
              {/* Form 1: Geral */}
              {activeSubTab === "geral" && (
                <div className="surface-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">Configurações Gerais</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Mude os dados institucionais, redes sociais e chaves de rastreamento do site.
                    </p>
                  </div>
                  <hr className="border-border" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="g-nome">Nome da Agência</Label>
                      <Input
                        id="g-nome"
                        value={siteNome}
                        onChange={(e) => setSiteNome(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-slogan">Slogan Principal (Hero)</Label>
                      <Input
                        id="g-slogan"
                        value={siteSlogan}
                        onChange={(e) => setSiteSlogan(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="g-desc">Descrição / Metadescription</Label>
                      <Textarea
                        id="g-desc"
                        rows={3}
                        value={siteDescricao}
                        onChange={(e) => setSiteDescricao(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="g-email">E-mail de Contato</Label>
                      <Input
                        id="g-email"
                        type="email"
                        value={siteEmail}
                        onChange={(e) => setSiteEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-url">URL do site</Label>
                      <Input
                        id="g-url"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="g-phone">WhatsApp (Apenas Números com DDD)</Label>
                      <Input
                        id="g-phone"
                        value={siteWhatsapp}
                        onChange={(e) => setSiteWhatsapp(e.target.value)}
                        placeholder="Ex: 5562996897483"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-phone-ex">WhatsApp Exibição</Label>
                      <Input
                        id="g-phone-ex"
                        value={siteWhatsappExibicao}
                        onChange={(e) => setSiteWhatsappExibicao(e.target.value)}
                        placeholder="Ex: (62) 99689-7483"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="g-cidade">Cidade</Label>
                      <Input
                        id="g-cidade"
                        value={siteCidade}
                        onChange={(e) => setSiteCidade(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-estado">Estado (UF)</Label>
                      <Input
                        id="g-estado"
                        value={siteEstado}
                        onChange={(e) => setSiteEstado(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <h4 className="font-semibold text-sm">Redes Sociais</h4>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-ig">Instagram URL</Label>
                      <Input
                        id="g-ig"
                        value={siteInstagram}
                        onChange={(e) => setSiteInstagram(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-fb">Facebook URL</Label>
                      <Input
                        id="g-fb"
                        value={siteFacebook}
                        onChange={(e) => setSiteFacebook(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="g-li">LinkedIn URL</Label>
                      <Input
                        id="g-li"
                        value={siteLinkedin}
                        onChange={(e) => setSiteLinkedin(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <h4 className="font-semibold text-sm">Rastreamento & SEO</h4>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-ga">Google Analytics (ID)</Label>
                      <Input
                        id="g-ga"
                        value={gaId}
                        onChange={(e) => setGaId(e.target.value)}
                        placeholder="Ex: G-XXXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-gtm">Google Tag Manager (ID)</Label>
                      <Input
                        id="g-gtm"
                        value={gtmId}
                        onChange={(e) => setGtmId(e.target.value)}
                        placeholder="Ex: GTM-XXXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-pixel">Meta Pixel (ID)</Label>
                      <Input
                        id="g-pixel"
                        value={pixelId}
                        onChange={(e) => setPixelId(e.target.value)}
                        placeholder="Ex: 1234567890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="g-ads">Google Ads Conversion ID</Label>
                      <Input
                        id="g-ads"
                        value={adsId}
                        onChange={(e) => setAdsId(e.target.value)}
                        placeholder="Ex: AW-XXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="g-ver">Google Search Console Verification ID</Label>
                      <Input
                        id="g-ver"
                        value={verificationId}
                        onChange={(e) => setVerificationId(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveGeral} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Configurações
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 2: Indicadores */}
              {activeSubTab === "indicadores" && (
                <div className="surface-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">Indicadores do Hero</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Altere as 4 estatísticas exibidas logo abaixo da seção principal (Hero) na
                      página inicial.
                    </p>
                  </div>
                  <hr className="border-border" />

                  <div className="grid gap-6 sm:grid-cols-2">
                    {localIndicadores.map((ind, index) => (
                      <div key={index} className="border p-4 rounded-xl space-y-3 bg-secondary/20">
                        <span className="text-xs font-bold text-muted-foreground">
                          Indicador #{index + 1}
                        </span>
                        <div className="space-y-2">
                          <Label>Valor / Número</Label>
                          <Input
                            value={ind.valor}
                            onChange={(e) => {
                              const copy = [...localIndicadores];
                              copy[index].valor = e.target.value;
                              setLocalIndicadores(copy);
                            }}
                            placeholder="Ex: 180+"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição</Label>
                          <Input
                            value={ind.label}
                            onChange={(e) => {
                              const copy = [...localIndicadores];
                              copy[index].label = e.target.value;
                              setLocalIndicadores(copy);
                            }}
                            placeholder="Ex: Sites desenvolvidos"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveIndicadores} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Indicadores
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 3: Diferenciais */}
              {activeSubTab === "diferenciais" && (
                <div className="surface-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Por que escolher a Trinity (Diferenciais)
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Gerencie os diferenciais competitivos da agência destacados na página inicial
                      e sobre.
                    </p>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-4">
                    {localDiferenciais.map((dif, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-xl grid gap-4 sm:grid-cols-3 bg-secondary/10"
                      >
                        <div className="space-y-2">
                          <Label className="font-semibold text-xs text-muted-foreground block">
                            Ícone (Nome Lucide)
                          </Label>
                          <Input
                            value={dif.icone}
                            onChange={(e) => {
                              const copy = [...localDiferenciais];
                              copy[index].icone = e.target.value;
                              setLocalDiferenciais(copy);
                            }}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label className="font-semibold text-xs text-muted-foreground block">
                            Título
                          </Label>
                          <Input
                            value={dif.titulo}
                            onChange={(e) => {
                              const copy = [...localDiferenciais];
                              copy[index].titulo = e.target.value;
                              setLocalDiferenciais(copy);
                            }}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-3">
                          <Label className="font-semibold text-xs text-muted-foreground block">
                            Texto de descrição
                          </Label>
                          <Textarea
                            rows={2}
                            value={dif.texto}
                            onChange={(e) => {
                              const copy = [...localDiferenciais];
                              copy[index].texto = e.target.value;
                              setLocalDiferenciais(copy);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveDiferenciais} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Diferenciais
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 4: Processo */}
              {activeSubTab === "processo" && (
                <div className="surface-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">Nosso Processo de Trabalho</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Edite as etapas de briefing, desenvolvimento, testes e publicação do projeto.
                    </p>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-4">
                    {localProcesso.map((proc, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-xl grid gap-4 sm:grid-cols-[80px_1fr] bg-secondary/10"
                      >
                        <div className="space-y-2">
                          <Label className="font-semibold text-xs text-muted-foreground block">
                            Etapa
                          </Label>
                          <Input
                            value={proc.numero}
                            onChange={(e) => {
                              const copy = [...localProcesso];
                              copy[index].numero = e.target.value;
                              setLocalProcesso(copy);
                            }}
                            className="text-center font-bold text-brand"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold text-xs text-muted-foreground block">
                            Título da etapa
                          </Label>
                          <Input
                            value={proc.titulo}
                            onChange={(e) => {
                              const copy = [...localProcesso];
                              copy[index].titulo = e.target.value;
                              setLocalProcesso(copy);
                            }}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label className="font-semibold text-xs text-muted-foreground block">
                            O que é feito nesta etapa
                          </Label>
                          <Textarea
                            rows={2}
                            value={proc.texto}
                            onChange={(e) => {
                              const copy = [...localProcesso];
                              copy[index].texto = e.target.value;
                              setLocalProcesso(copy);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveProcesso} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Etapas do Processo
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 5: Resultados */}
              {activeSubTab === "resultados" && (
                <div className="surface-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">Resultados da Agência (Stats)</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Gerencie os números marcantes da agência destacados na seção de resultados
                      (ex: +312% crescimento de acessos).
                    </p>
                  </div>
                  <hr className="border-border" />

                  <div className="grid gap-6 sm:grid-cols-2">
                    {localResultados.map((res, index) => (
                      <div key={index} className="border p-4 rounded-xl space-y-3 bg-secondary/10">
                        <span className="text-xs font-bold text-muted-foreground block">
                          Resultado #{index + 1}
                        </span>
                        <div className="grid gap-2 grid-cols-2">
                          <div className="space-y-2">
                            <Label>Número / Indicador</Label>
                            <Input
                              value={res.valor}
                              onChange={(e) => {
                                const copy = [...localResultados];
                                copy[index].valor = e.target.value;
                                setResultados(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Título / Label</Label>
                            <Input
                              value={res.label}
                              onChange={(e) => {
                                const copy = [...localResultados];
                                copy[index].label = e.target.value;
                                setResultados(copy);
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição Detalhada</Label>
                          <Textarea
                            rows={2}
                            value={res.texto}
                            onChange={(e) => {
                              const copy = [...localResultados];
                              copy[index].texto = e.target.value;
                              setResultados(copy);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveResultados} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Resultados
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 6: Depoimentos */}
              {activeSubTab === "depoimentos" && (
                <div className="surface-card p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">Depoimentos dos Clientes</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Gerencie os depoimentos que dão prova social ao trabalho da Trinity Digital.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setLocalDepoimentos([
                          ...localDepoimentos,
                          {
                            nome: "Novo Cliente",
                            empresa: "Nome da Empresa",
                            texto: "Depoimento do cliente aqui...",
                            estrelas: 5,
                            iniciais: "NC",
                          },
                        ]);
                      }}
                      className="rounded-full gap-1.5"
                    >
                      <Plus className="size-4" /> Adicionar
                    </Button>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-6">
                    {localDepoimentos.map((dep, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-xl space-y-3 bg-secondary/15 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLocalDepoimentos(localDepoimentos.filter((_, idx) => idx !== index));
                          }}
                          className="absolute top-3 right-3 text-destructive hover:text-red-700 bg-background/80 border p-1.5 rounded-lg shadow-sm"
                          title="Remover Depoimento"
                        >
                          <Trash2 className="size-4" />
                        </button>

                        <div className="grid gap-3 sm:grid-cols-4">
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Iniciais (Avatar)
                            </Label>
                            <Input
                              value={dep.iniciais}
                              onChange={(e) => {
                                const copy = [...localDepoimentos];
                                copy[index].iniciais = e.target.value;
                                setLocalDepoimentos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Nome do Cliente
                            </Label>
                            <Input
                              value={dep.nome}
                              onChange={(e) => {
                                const copy = [...localDepoimentos];
                                copy[index].nome = e.target.value;
                                setLocalDepoimentos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Avaliação (1-5 estrelas)
                            </Label>
                            <select
                              value={dep.estrelas}
                              onChange={(e) => {
                                const copy = [...localDepoimentos];
                                copy[index].estrelas = parseInt(e.target.value) || 5;
                                setLocalDepoimentos(copy);
                              }}
                              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none"
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n} estrelas
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1 sm:col-span-4">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Empresa / Cargo
                            </Label>
                            <Input
                              value={dep.empresa}
                              onChange={(e) => {
                                const copy = [...localDepoimentos];
                                copy[index].empresa = e.target.value;
                                setLocalDepoimentos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-1 sm:col-span-4">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Depoimento
                            </Label>
                            <Textarea
                              rows={3}
                              value={dep.texto}
                              onChange={(e) => {
                                const copy = [...localDepoimentos];
                                copy[index].texto = e.target.value;
                                setLocalDepoimentos(copy);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveDepoimentos} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Depoimentos
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 7: FAQ */}
              {activeSubTab === "faq" && (
                <div className="surface-card p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">Perguntas Frequentes (FAQ)</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Gerencie as dúvidas comuns respondidas na seção FAQ.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setLocalFaqs([
                          ...localFaqs,
                          {
                            pergunta: "Nova pergunta?",
                            resposta: "Resposta para a pergunta aqui...",
                          },
                        ]);
                      }}
                      className="rounded-full gap-1.5"
                    >
                      <Plus className="size-4" /> Adicionar
                    </Button>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-5">
                    {localFaqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-xl space-y-3 bg-secondary/15 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLocalFaqs(localFaqs.filter((_, idx) => idx !== index));
                          }}
                          className="absolute top-3 right-3 text-destructive hover:text-red-700 bg-background/80 border p-1.5 rounded-lg shadow-sm"
                          title="Remover Pergunta"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <div className="space-y-2 pr-8">
                          <Label className="text-xs font-semibold text-muted-foreground block">
                            Pergunta
                          </Label>
                          <Input
                            value={faq.pergunta}
                            onChange={(e) => {
                              const copy = [...localFaqs];
                              copy[index].pergunta = e.target.value;
                              setLocalFaqs(copy);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-muted-foreground block">
                            Resposta
                          </Label>
                          <Textarea
                            rows={3}
                            value={faq.resposta}
                            onChange={(e) => {
                              const copy = [...localFaqs];
                              copy[index].resposta = e.target.value;
                              setLocalFaqs(copy);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveFaqs} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar FAQs
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 8: Portfólio */}
              {activeSubTab === "portfolio" && (
                <div className="surface-card p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">Projetos do Portfólio</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Gerencie os projetos apresentados na grade de portfólio.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setLocalProjetos([
                          ...localProjetos,
                          {
                            slug: "novo-projeto-" + Date.now(),
                            nome: "Novo Projeto",
                            categoria: "Sites",
                            descricao: "Descrição do projeto.",
                            tecnologias: ["React", "TypeScript"],
                            imagem: "/images/portfolio-1.jpg",
                          },
                        ]);
                      }}
                      className="rounded-full gap-1.5"
                    >
                      <Plus className="size-4" /> Adicionar
                    </Button>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-6">
                    {localProjetos.map((proj, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-xl space-y-3 bg-secondary/15 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLocalProjetos(localProjetos.filter((_, idx) => idx !== index));
                          }}
                          className="absolute top-3 right-3 text-destructive hover:text-red-700 bg-background/80 border p-1.5 rounded-lg shadow-sm"
                          title="Remover Projeto"
                        >
                          <Trash2 className="size-4" />
                        </button>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Nome do Projeto
                            </Label>
                            <Input
                              value={proj.nome}
                              onChange={(e) => {
                                const copy = [...localProjetos];
                                copy[index].nome = e.target.value;
                                // Automatically update slug if it was a default slug
                                if (copy[index].slug.startsWith("novo-projeto")) {
                                  copy[index].slug = e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-");
                                }
                                setLocalProjetos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Slug URL
                            </Label>
                            <Input
                              value={proj.slug}
                              onChange={(e) => {
                                const copy = [...localProjetos];
                                copy[index].slug = e.target.value;
                                setLocalProjetos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Categoria
                            </Label>
                            <select
                              value={proj.categoria}
                              onChange={(e) => {
                                const copy = [...localProjetos];
                                copy[index].categoria = e.target.value as any;
                                setLocalProjetos(copy);
                              }}
                              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none"
                            >
                              {["Sites", "Lojas", "Landing Pages", "Sistemas", "CRM"].map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2 sm:col-span-3">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Descrição Curta
                            </Label>
                            <Input
                              value={proj.descricao}
                              onChange={(e) => {
                                const copy = [...localProjetos];
                                copy[index].descricao = e.target.value;
                                setLocalProjetos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Tecnologias (Separadas por vírgula)
                            </Label>
                            <Input
                              value={proj.tecnologias.join(", ")}
                              onChange={(e) => {
                                const copy = [...localProjetos];
                                copy[index].tecnologias = e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                setLocalProjetos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-3">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Imagem do Projeto (Upload)
                            </Label>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center border p-3 rounded-lg bg-background">
                              {proj.imagem ? (
                                <div className="relative group size-16 rounded-lg overflow-hidden border border-border bg-secondary shrink-0">
                                  <img
                                    src={proj.imagem}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const copy = [...localProjetos];
                                      copy[index].imagem = "";
                                      setLocalProjetos(copy);
                                    }}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-medium cursor-pointer"
                                  >
                                    Remover
                                  </button>
                                </div>
                              ) : (
                                <div className="size-16 rounded-lg border border-dashed border-border bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                                  <Upload className="size-4" />
                                </div>
                              )}
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id={`upload-proj-${index}`}
                                    className="hidden"
                                    onChange={(e) => handleUploadProjImagem(e, index)}
                                    disabled={uploadingProjIndex === index}
                                  />
                                  <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full cursor-pointer h-8 text-xs"
                                    disabled={uploadingProjIndex === index}
                                  >
                                    <label
                                      htmlFor={`upload-proj-${index}`}
                                      className="flex items-center gap-1.5 cursor-pointer"
                                    >
                                      {uploadingProjIndex === index ? (
                                        <Loader2 className="size-3.5 animate-spin" />
                                      ) : (
                                        <Upload className="size-3.5" />
                                      )}
                                      {uploadingProjIndex === index
                                        ? "Enviando..."
                                        : "Escolher Imagem"}
                                    </label>
                                  </Button>
                                  {proj.imagem && (
                                    <span className="text-[10px] text-muted-foreground truncate max-w-xs">
                                      {proj.imagem.split("/").pop()}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-muted-foreground">
                                  Formatos suportados: PNG, JPG ou WEBP de até 5MB. A imagem será
                                  salva no Supabase Storage.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 sm:col-span-3">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Link do Projeto / URL Ativo (Opcional)
                            </Label>
                            <Input
                              value={proj.link || ""}
                              onChange={(e) => {
                                const copy = [...localProjetos];
                                copy[index].link = e.target.value || undefined;
                                setLocalProjetos(copy);
                              }}
                              placeholder="Se vazio, o botão irá redirecionar para o WhatsApp de contato"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveProjetos} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Projetos
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 9: Serviços */}
              {activeSubTab === "servicos" && (
                <div className="surface-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">Serviços Oferecidos</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Gerencie os serviços, descrições detalhadas e itens inclusos em cada tipo de
                      entrega.
                    </p>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-8">
                    {localServicos.map((serv, index) => (
                      <div key={index} className="border p-5 rounded-xl space-y-4 bg-secondary/15">
                        <span className="text-xs font-bold text-brand uppercase tracking-wider block">
                          Serviço: {serv.nome}
                        </span>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Nome do Serviço
                            </Label>
                            <Input
                              value={serv.nome}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].nome = e.target.value;
                                setLocalServicos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Ícone (Nome Lucide)
                            </Label>
                            <Input
                              value={serv.icone}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].icone = e.target.value;
                                setLocalServicos(copy);
                              }}
                              placeholder="Ex: Globe, PenLine, ShoppingCart, Rocket, Workflow"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Resumo Comercial (Card inicial)
                            </Label>
                            <Input
                              value={serv.resumo}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].resumo = e.target.value;
                                setLocalServicos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Texto de Introdução (Página de Detalhes)
                            </Label>
                            <Textarea
                              rows={2}
                              value={serv.intro}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].intro = e.target.value;
                                setLocalServicos(copy);
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Mensagem Customizada de WhatsApp
                            </Label>
                            <Input
                              value={serv.mensagemWhatsapp}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].mensagemWhatsapp = e.target.value;
                                setLocalServicos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              SEO Title
                            </Label>
                            <Input
                              value={serv.titleSeo}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].titleSeo = e.target.value;
                                setLocalServicos(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              SEO Description
                            </Label>
                            <Input
                              value={serv.descricaoSeo}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].descricaoSeo = e.target.value;
                                setLocalServicos(copy);
                              }}
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Benefícios rápidos (Separados por vírgula)
                            </Label>
                            <Input
                              value={serv.beneficios.join(", ")}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].beneficios = e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                setLocalServicos(copy);
                              }}
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Indicado para (Separados por vírgula)
                            </Label>
                            <Input
                              value={serv.paraQuem.join(", ")}
                              onChange={(e) => {
                                const copy = [...localServicos];
                                copy[index].paraQuem = e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                setLocalServicos(copy);
                              }}
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <div className="flex justify-between items-center">
                              <Label className="text-xs font-semibold text-muted-foreground">
                                Itens inclusos na entrega
                              </Label>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const copy = [...localServicos];
                                  copy[index].entregas.push({
                                    titulo: "Novo Item",
                                    texto: "Descrição do item entregue.",
                                  });
                                  setLocalServicos(copy);
                                }}
                                className="h-8 rounded-full text-xs gap-1"
                              >
                                <Plus className="size-3" /> Inclusão
                              </Button>
                            </div>
                            <div className="space-y-3 mt-2">
                              {serv.entregas.map((ent, entIdx) => (
                                <div
                                  key={entIdx}
                                  className="border p-3 rounded-lg bg-background relative grid gap-2 sm:grid-cols-[1.5fr_2fr] items-start"
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const copy = [...localServicos];
                                      copy[index].entregas = copy[index].entregas.filter(
                                        (_, idx) => idx !== entIdx,
                                      );
                                      setLocalServicos(copy);
                                    }}
                                    className="absolute -top-1.5 -right-1.5 text-destructive hover:text-red-700 bg-background border rounded-full p-1"
                                  >
                                    <Trash2 className="size-3" />
                                  </button>
                                  <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground">
                                      Item
                                    </Label>
                                    <Input
                                      value={ent.titulo}
                                      onChange={(e) => {
                                        const copy = [...localServicos];
                                        copy[index].entregas[entIdx].titulo = e.target.value;
                                        setLocalServicos(copy);
                                      }}
                                      className="h-8 text-xs font-semibold"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground">
                                      Detalhe
                                    </Label>
                                    <Input
                                      value={ent.texto}
                                      onChange={(e) => {
                                        const copy = [...localServicos];
                                        copy[index].entregas[entIdx].texto = e.target.value;
                                        setLocalServicos(copy);
                                      }}
                                      className="h-8 text-xs"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={saveServicos} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Serviços
                    </Button>
                  </div>
                </div>
              )}

              {/* Form 10: Blog */}
              {activeSubTab === "blog" && (
                <div className="surface-card p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">Posts do Blog</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Gerencie os artigos publicados no blog institucional.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setLocalPosts([
                          ...localPosts,
                          {
                            slug: "novo-artigo-" + Date.now(),
                            titulo: "Novo Artigo do Blog",
                            resumo: "Resumo comercial rápido para o card inicial.",
                            categoria: "Geral",
                            tags: ["novidade"],
                            autor: "Equipe Trinity Digital",
                            data: new Date().toISOString().split("T")[0],
                            leitura: "5 min",
                            imagem: "/images/blog-1.jpg",
                            conteudo: [
                              { tipo: "p", texto: "Conteúdo inicial do post do blog aqui..." },
                            ],
                          },
                        ]);
                      }}
                      className="rounded-full gap-1.5"
                    >
                      <Plus className="size-4" /> Criar Artigo
                    </Button>
                  </div>
                  <hr className="border-border" />

                  <div className="space-y-6">
                    {localPosts.map((post, index) => (
                      <div
                        key={index}
                        className="border p-5 rounded-xl space-y-4 bg-secondary/15 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLocalPosts(localPosts.filter((_, idx) => idx !== index));
                          }}
                          className="absolute top-3 right-3 text-destructive hover:text-red-700 bg-background/80 border p-1.5 rounded-lg shadow-sm"
                          title="Remover Artigo"
                        >
                          <Trash2 className="size-4" />
                        </button>

                        <span className="text-xs font-bold text-brand uppercase tracking-wider block">
                          Artigo: {post.titulo}
                        </span>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Título do Artigo
                            </Label>
                            <Input
                              value={post.titulo}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].titulo = e.target.value;
                                if (copy[index].slug.startsWith("novo-artigo")) {
                                  copy[index].slug = e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-");
                                }
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Slug URL
                            </Label>
                            <Input
                              value={post.slug}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].slug = e.target.value;
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-3">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Resumo Comercial (Card)
                            </Label>
                            <Input
                              value={post.resumo}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].resumo = e.target.value;
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Categoria
                            </Label>
                            <Input
                              value={post.categoria}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].categoria = e.target.value;
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Autor
                            </Label>
                            <Input
                              value={post.autor}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].autor = e.target.value;
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Data de Publicação
                            </Label>
                            <Input
                              type="date"
                              value={post.data}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].data = e.target.value;
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Tempo de Leitura
                            </Label>
                            <Input
                              value={post.leitura}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].leitura = e.target.value;
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Tags (Separadas por vírgula)
                            </Label>
                            <Input
                              value={post.tags.join(", ")}
                              onChange={(e) => {
                                const copy = [...localPosts];
                                copy[index].tags = e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                setLocalPosts(copy);
                              }}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-3">
                            <Label className="text-xs font-semibold text-muted-foreground block">
                              Imagem de Capa (Upload)
                            </Label>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center border p-3 rounded-lg bg-background">
                              {post.imagem ? (
                                <div className="relative group size-16 rounded-lg overflow-hidden border border-border bg-secondary shrink-0">
                                  <img
                                    src={post.imagem}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const copy = [...localPosts];
                                      copy[index].imagem = "";
                                      setLocalPosts(copy);
                                    }}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-medium cursor-pointer"
                                  >
                                    Remover
                                  </button>
                                </div>
                              ) : (
                                <div className="size-16 rounded-lg border border-dashed border-border bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                                  <Upload className="size-4" />
                                </div>
                              )}
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id={`upload-post-${index}`}
                                    className="hidden"
                                    onChange={(e) => handleUploadPostImagem(e, index)}
                                    disabled={uploadingPostIndex === index}
                                  />
                                  <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full cursor-pointer h-8 text-xs"
                                    disabled={uploadingPostIndex === index}
                                  >
                                    <label
                                      htmlFor={`upload-post-${index}`}
                                      className="flex items-center gap-1.5 cursor-pointer"
                                    >
                                      {uploadingPostIndex === index ? (
                                        <Loader2 className="size-3.5 animate-spin" />
                                      ) : (
                                        <Upload className="size-3.5" />
                                      )}
                                      {uploadingPostIndex === index
                                        ? "Enviando..."
                                        : "Escolher Imagem"}
                                    </label>
                                  </Button>
                                  {post.imagem && (
                                    <span className="text-[10px] text-muted-foreground truncate max-w-xs">
                                      {post.imagem.split("/").pop()}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-muted-foreground">
                                  Formatos suportados: PNG, JPG ou WEBP de até 5MB. A imagem será
                                  salva no Supabase Storage.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Post Content Blocks Editor */}
                          <div className="space-y-2 sm:col-span-3 pt-2">
                            <div className="flex justify-between items-center border-b pb-1.5">
                              <Label className="text-xs font-bold text-muted-foreground">
                                Blocos de Conteúdo do Artigo
                              </Label>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const copy = [...localPosts];
                                    copy[index].conteudo.push({
                                      tipo: "p",
                                      texto: "Novo parágrafo...",
                                    });
                                    setLocalPosts(copy);
                                  }}
                                  className="h-7 text-[10px] rounded-full gap-0.5 px-2"
                                >
                                  <Plus className="size-3" /> P
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const copy = [...localPosts];
                                    copy[index].conteudo.push({
                                      tipo: "h2",
                                      texto: "Novo Subtítulo (H2)...",
                                    });
                                    setLocalPosts(copy);
                                  }}
                                  className="h-7 text-[10px] rounded-full gap-0.5 px-2"
                                >
                                  <Plus className="size-3" /> H2
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const copy = [...localPosts];
                                    copy[index].conteudo.push({
                                      tipo: "ul",
                                      itens: ["Item da lista..."],
                                    });
                                    setLocalPosts(copy);
                                  }}
                                  className="h-7 text-[10px] rounded-full gap-0.5 px-2"
                                >
                                  <Plus className="size-3" /> Lista
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-3 pt-2">
                              {post.conteudo.map((bloco, blocoIdx) => (
                                <div
                                  key={blocoIdx}
                                  className="border p-3 rounded-lg bg-background relative grid gap-2 items-start"
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const copy = [...localPosts];
                                      copy[index].conteudo = copy[index].conteudo.filter(
                                        (_, idx) => idx !== blocoIdx,
                                      );
                                      setLocalPosts(copy);
                                    }}
                                    className="absolute -top-1.5 -right-1.5 text-destructive hover:text-red-700 bg-background border rounded-full p-1"
                                  >
                                    <Trash2 className="size-3" />
                                  </button>

                                  {bloco.tipo === "h2" && (
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-brand">
                                        Subtítulo (H2)
                                      </span>
                                      <Input
                                        value={bloco.texto || ""}
                                        onChange={(e) => {
                                          const copy = [...localPosts];
                                          copy[index].conteudo[blocoIdx].texto = e.target.value;
                                          setLocalPosts(copy);
                                        }}
                                        className="h-9 font-semibold"
                                      />
                                    </div>
                                  )}

                                  {bloco.tipo === "p" && (
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-muted-foreground">
                                        Parágrafo (P)
                                      </span>
                                      <Textarea
                                        rows={3}
                                        value={bloco.texto || ""}
                                        onChange={(e) => {
                                          const copy = [...localPosts];
                                          copy[index].conteudo[blocoIdx].texto = e.target.value;
                                          setLocalPosts(copy);
                                        }}
                                        className="text-xs"
                                      />
                                    </div>
                                  )}

                                  {bloco.tipo === "ul" && (
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-muted-foreground">
                                          Lista de Itens (UL)
                                        </span>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => {
                                            const copy = [...localPosts];
                                            if (!copy[index].conteudo[blocoIdx].itens) {
                                              copy[index].conteudo[blocoIdx].itens = [];
                                            }
                                            copy[index].conteudo[blocoIdx].itens!.push(
                                              "Novo item...",
                                            );
                                            setLocalPosts(copy);
                                          }}
                                          className="h-5 text-[8px] rounded px-1"
                                        >
                                          + Item
                                        </Button>
                                      </div>
                                      <div className="space-y-1.5 pl-3">
                                        {bloco.itens?.map((item, itemIdx) => (
                                          <div key={itemIdx} className="flex gap-2 items-center">
                                            <Input
                                              value={item}
                                              onChange={(e) => {
                                                const copy = [...localPosts];
                                                copy[index].conteudo[blocoIdx].itens![itemIdx] =
                                                  e.target.value;
                                                setLocalPosts(copy);
                                              }}
                                              className="h-8 text-xs"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const copy = [...localPosts];
                                                copy[index].conteudo[blocoIdx].itens = copy[
                                                  index
                                                ].conteudo[blocoIdx].itens!.filter(
                                                  (_, idx) => idx !== itemIdx,
                                                );
                                                setLocalPosts(copy);
                                              }}
                                              className="text-destructive hover:text-red-700"
                                            >
                                              <Trash2 className="size-3.5" />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={savePosts} className="rounded-full gap-2 px-6">
                      <Save className="size-4" /> Salvar Artigos do Blog
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Lead details */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg surface-card overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground">Solicitação de Orçamento</h3>
                <span className="text-xs text-muted-foreground block">
                  Enviado em {new Date(selectedLead.created_at).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(selectedLead.created_at).toLocaleTimeString("pt-BR")}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedLead(null)}
                className="size-8 p-0 rounded-full"
              >
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto grow">
              {/* Client and Company */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold block uppercase">
                    Cliente
                  </span>
                  <span className="font-semibold text-base block text-foreground mt-0.5">
                    {selectedLead.nome}
                  </span>
                </div>
                {selectedLead.empresa && (
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold block uppercase">
                      Empresa
                    </span>
                    <span className="font-semibold text-base block text-foreground mt-0.5">
                      {selectedLead.empresa}
                    </span>
                  </div>
                )}
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold block uppercase">
                    WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    {selectedLead.whatsapp} <ExternalLink className="size-3.5" />
                  </a>
                </div>
                {selectedLead.email && (
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold block uppercase">
                      E-mail
                    </span>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="font-semibold text-foreground hover:underline block mt-0.5"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Service and Budget */}
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold block uppercase">
                    Serviço de interesse
                  </span>
                  <span className="font-semibold text-foreground mt-0.5 block">
                    {selectedLead.servico ?? "Não especificado"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-semibold block uppercase">
                    Orçamento estimado
                  </span>
                  <span className="font-semibold text-foreground mt-0.5 block">
                    {selectedLead.orcamento ?? "N/A"}
                  </span>
                </div>
              </div>

              {/* Origin and status */}
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold block uppercase">
                    Origem
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 block bg-secondary px-2.5 py-1 rounded border w-fit">
                    {selectedLead.origem ?? "Direto"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-semibold block uppercase mb-1">
                    Status do atendimento
                  </span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      updateLeadStatus(selectedLead.id, e.target.value as Lead["status"])
                    }
                    className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs font-semibold focus-visible:outline-none"
                  >
                    {Object.entries(statusLabels).map(([statusKey, statusVal]) => (
                      <option key={statusKey} value={statusKey}>
                        {statusVal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              {selectedLead.mensagem && (
                <div className="border-t pt-4 space-y-1">
                  <span className="text-xs text-muted-foreground font-semibold block uppercase">
                    Mensagem comercial
                  </span>
                  <div className="bg-secondary/40 border p-4 rounded-xl text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {selectedLead.mensagem}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-secondary/30 border-t border-border flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => deleteLead(selectedLead.id)}
                className="border-destructive/20 text-destructive hover:bg-destructive/5 rounded-full px-4 h-9 text-xs"
              >
                Excluir Solicitação
              </Button>
              <Button
                onClick={() => setSelectedLead(null)}
                className="rounded-full px-5 h-9 text-xs"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
