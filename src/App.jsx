import { useState, useMemo, createContext, useContext, useRef } from "react";

const LOGO_WHITE = "data:image/png;base64,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";
const LOGO_DARK = "data:image/png;base64,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";

const TK = {
  dark: {
    bg:"#0A0A0B", srf:"#141416", srf2:"#1C1C20", srf3:"#26262B", hover:"#2E2E33", card:"#141416",
    brd:"rgba(255,255,255,0.06)", brdS:"rgba(255,255,255,0.12)",
    acc:"#E8DA82", accS:"rgba(232,218,130,0.10)", accT:"#EFE59A", acc2:"#D4C270",
    tx:"#F5F5F7", tx2:"#98989D", tx3:"#636366", tx4:"#3A3A3C",
    ok:"#30D158", wrn:"#E8DA82", err:"#FF453A", inf:"#64D2FF", vio:"#BF5AF2", pnk:"#FF375F",
    inp:"#1C1C20", glass:"rgba(20,20,22,0.85)",
    sh:"0 2px 8px rgba(0,0,0,0.3)", shL:"0 16px 48px rgba(0,0,0,0.6)",
    grad1:"linear-gradient(135deg, #E8DA82 0%, #D4C270 100%)",
    grad2:"linear-gradient(135deg, #BF5AF2 0%, #FF375F 100%)",
    logo: LOGO_WHITE
  },
  light: {
    bg:"#F5F5F7", srf:"#FFFFFF", srf2:"#FAFAFC", srf3:"#F0F0F3", hover:"#EBEBF0", card:"#FFFFFF",
    brd:"rgba(0,0,0,0.06)", brdS:"rgba(0,0,0,0.12)",
    acc:"#D18B4A", accS:"rgba(209,139,74,0.10)", accT:"#B57336", acc2:"#A06028",
    tx:"#1D1D1F", tx2:"#6E6E73", tx3:"#A1A1A6", tx4:"#D1D1D6",
    ok:"#30B14A", wrn:"#D18B4A", err:"#FF3B30", inf:"#007AFF", vio:"#AF52DE", pnk:"#FF2D55",
    inp:"#F5F5F7", glass:"rgba(255,255,255,0.85)",
    sh:"0 2px 8px rgba(0,0,0,0.04)", shL:"0 16px 48px rgba(0,0,0,0.1)",
    grad1:"linear-gradient(135deg, #D18B4A 0%, #B57336 100%)",
    grad2:"linear-gradient(135deg, #AF52DE 0%, #FF2D55 100%)",
    logo: LOGO_DARK
  }
};

const Ctx = createContext(TK.dark);
const useT = () => useContext(Ctx);

/* ═══ DATA ═══ */
const TEAM = [
  { id:1, name:"Ana Beatriz Costa", role:"Gerente Comercial", av:"AC", email:"ana@mulapreta.com", pw:"ana123", clients:18, deals:12, rev:890000, tgt:1000000, meets:24, calls:67, emails:143, tOk:45, tPd:8, on:true },
  { id:2, name:"Carlos Eduardo", role:"Consultor Técnico", av:"CE", email:"carlos@mulapreta.com", pw:"carlos123", clients:14, deals:9, rev:620000, tgt:750000, meets:18, calls:52, emails:98, tOk:38, tPd:5, on:true },
  { id:3, name:"Fernanda Oliveira", role:"Exec. Contas", av:"FO", email:"fernanda@mulapreta.com", pw:"fer123", clients:22, deals:15, rev:1150000, tgt:1200000, meets:31, calls:89, emails:201, tOk:52, tPd:3, on:false },
  { id:4, name:"Diego Martins", role:"Rep. SP", av:"DM", email:"diego@mulapreta.com", pw:"diego123", clients:16, deals:8, rev:480000, tgt:700000, meets:14, calls:43, emails:87, tOk:29, tPd:11, on:true },
  { id:5, name:"Patrícia Lima", role:"Rep. RJ", av:"PL", email:"patricia@mulapreta.com", pw:"pat123", clients:11, deals:6, rev:340000, tgt:600000, meets:10, calls:38, emails:72, tOk:22, tPd:7, on:false }
];
const ADM = { id:0, name:"Administrador", role:"Admin", av:"MP", email:"admin@mulapreta.com", pw:"admin123" };

const INIT_ARCH = [
  { id:1, name:"Marina Lopes", firm:"Studio ML", city:"São Paulo", status:"ativo", tier:"gold", projects:12, rev:485000, sat:95, av:"ML", lastC:"2026-03-28", nextF:"2026-04-07", notes:"Materiais sustentáveis." },
  { id:2, name:"Rafael Mendes", firm:"RM Design", city:"São Paulo", status:"ativo", tier:"platinum", projects:24, rev:1280000, sat:98, av:"RM", lastC:"2026-04-01", nextF:"2026-04-10", notes:"Principal parceiro." },
  { id:3, name:"Camila Ferreira", firm:"CF Interiores", city:"Rio de Janeiro", status:"ativo", tier:"silver", projects:6, rev:178000, sat:82, av:"CF", lastC:"2026-03-15", nextF:"2026-04-05", notes:"Corporativos." },
  { id:4, name:"Pedro Nakamura", firm:"Nakamura Arq.", city:"Curitiba", status:"ativo", tier:"gold", projects:15, rev:620000, sat:90, av:"PN", lastC:"2026-03-30", nextF:"2026-04-12", notes:"Educacionais." },
  { id:5, name:"Isabela Duarte", firm:"ID Arquitetura", city:"BH", status:"prospect", tier:"bronze", projects:2, rev:45000, sat:75, av:"ID", lastC:"2026-03-20", nextF:"2026-04-04", notes:"Expo Revestir." },
  { id:6, name:"Thiago Rocha", firm:"Rocha Assoc.", city:"Porto Alegre", status:"inativo", tier:"silver", projects:8, rev:295000, sat:45, av:"TR", lastC:"2026-01-10", nextF:"2026-04-15", notes:"Reativação urgente." },
  { id:7, name:"Juliana Santos", firm:"JS Sustentável", city:"Salvador", status:"ativo", tier:"gold", projects:10, rev:410000, sat:92, av:"JS", lastC:"2026-03-25", nextF:"2026-04-08", notes:"Embaixadora NE." },
  { id:8, name:"Lucas Pimentel", firm:"Pimentel Design", city:"Brasília", status:"ativo", tier:"silver", projects:5, rev:165000, sat:78, av:"LP", lastC:"2026-04-02", nextF:"2026-04-09", notes:"Governamentais." }
];

const INIT_EV = [
  { id:1, title:"Alinhamento Rafael", date:"2026-04-03", time:"09:00", dur:60, type:"reuniao", loc:"Escritório SP", parts:[0,1,2], arch:"Rafael Mendes", notes:"Premium", by:1 },
  { id:2, title:"Visita Alphaville", date:"2026-04-03", time:"14:00", dur:120, type:"visita", loc:"Alphaville", parts:[2,4], arch:"Marina Lopes", notes:"Amostras", by:2 },
  { id:3, title:"Follow-up Isabela", date:"2026-04-04", time:"10:30", dur:30, type:"ligacao", loc:"Remoto", parts:[4], arch:"Isabela", notes:"Proposta", by:4 },
  { id:4, title:"Expo Revestir", date:"2026-04-05", time:"08:00", dur:480, type:"evento", loc:"SP Expo", parts:[0,1,2,3,4,5], arch:"", notes:"Stand 42B", by:0 },
  { id:5, title:"Linha sustentável", date:"2026-04-07", time:"11:00", dur:90, type:"reuniao", loc:"Meet", parts:[0,1,3], arch:"Juliana", notes:"Eco", by:1 },
  { id:6, title:"Pipeline mensal", date:"2026-04-07", time:"15:00", dur:60, type:"interna", loc:"Sala", parts:[0,1,2,3,4,5], arch:"", notes:"Q2", by:0 },
  { id:7, title:"Workshop premium", date:"2026-04-10", time:"09:00", dur:240, type:"evento", loc:"Showroom SP", parts:[0,1,2,3,4], arch:"", notes:"Top 10", by:0 }
];

const SALES_DATA = [
  { m:"Out", v:280000, t:300000, year:"2025" }, { m:"Nov", v:320000, t:310000, year:"2025" },
  { m:"Dez", v:410000, t:350000, year:"2025" }, { m:"Jan", v:290000, t:320000, year:"2026" },
  { m:"Fev", v:350000, t:340000, year:"2026" }, { m:"Mar", v:480000, t:380000, year:"2026" }
];

const PIPE_DATA = [
  { s:"Prospecção", n:14, v:420000 }, { s:"Qualificação", n:8, v:680000 },
  { s:"Proposta", n:5, v:890000 }, { s:"Negociação", n:3, v:520000 },
  { s:"Fechamento", n:2, v:310000 }
];

const INIT_SEASONS = [
  {
    id:1, name:"Season 1 · 2026.1", period:"Jan–Jun 2026", status:"active",
    rules: [
      { id:1, d:"Venda até R$50k", p:100 },
      { id:2, d:"Venda R$50k–150k", p:300 },
      { id:3, d:"Venda acima R$150k", p:600 },
      { id:4, d:"Novo projeto", p:150 },
      { id:5, d:"Indicação arquiteto", p:200 }
    ],
    prizes: [
      { id:1, tier:"Ouro", min:2000, prize:"Viagem Expo Milano + Kit", icon:"trophy" },
      { id:2, tier:"Prata", min:1200, prize:"Voucher R$5k + Jantar", icon:"award" },
      { id:3, tier:"Bronze", min:600, prize:"Kit Materiais + Certificado", icon:"gift" }
    ]
  },
  { id:2, name:"Season 2 · 2026.2", period:"Jul–Dez 2026", status:"upcoming", rules:[], prizes:[] }
];

const INIT_PTS = [
  { a:2, s:1, sales:[{d:"Comercial Paulista",v:320000},{d:"Residencial Morumbi",v:180000},{d:"Indicação Camila",v:0}], b:200 },
  { a:1, s:1, sales:[{d:"Alphaville I",v:120000},{d:"Alphaville II",v:85000},{d:"Escola sustentável",v:60000}], b:150 },
  { a:7, s:1, sales:[{d:"Resort eco Bahia",v:210000},{d:"Pousada Trancoso",v:95000}], b:0 },
  { a:4, s:1, sales:[{d:"Centro educacional",v:180000},{d:"Biblioteca",v:140000}], b:150 },
  { a:3, s:1, sales:[{d:"Escritório RJ",v:78000}], b:0 },
  { a:5, s:1, sales:[{d:"Amostra premium",v:25000}], b:0 },
  { a:8, s:1, sales:[{d:"Projeto gov.",v:65000}], b:0 }
];

const INIT_INTER = [
  { id:1, archId:2, type:"meeting", date:"2026-04-01", time:"10:00", user:1, title:"Reunião alinhamento Q2", notes:"Discutimos a linha premium e novos projetos em andamento. Cliente muito satisfeito." },
  { id:2, archId:2, type:"call", date:"2026-03-28", time:"14:30", user:1, title:"Ligação follow-up proposta", notes:"Proposta aprovada. Enviar amostras até sexta." },
  { id:3, archId:2, type:"email", date:"2026-03-25", time:"09:15", user:0, title:"Envio de catálogo 2026", notes:"Catálogo completo + tabela de preços." },
  { id:4, archId:1, type:"meeting", date:"2026-03-28", time:"15:00", user:2, title:"Visita showroom", notes:"Marina trouxe cliente final. Aprovou linha sustentável." },
  { id:5, archId:1, type:"whatsapp", date:"2026-03-20", time:"11:00", user:1, title:"Confirmação pedido Alphaville", notes:"Pedido confirmado, entrega 15/04." },
  { id:6, archId:5, type:"call", date:"2026-03-20", time:"16:00", user:4, title:"Primeiro contato", notes:"Interesse inicial. Agendar visita." },
  { id:7, archId:3, type:"note", date:"2026-03-15", time:"09:00", user:2, title:"Cliente potencial para corporativos", notes:"Focar em projetos de escritórios. Orçamento médio R$200k." }
];

const INIT_TASKS = [
  { id:1, title:"Enviar proposta Morumbi", archId:2, assignee:1, due:"2026-04-04", priority:"high", status:"pending", desc:"Proposta detalhada com cronograma e valores." },
  { id:2, title:"Follow-up Isabela", archId:5, assignee:4, due:"2026-04-04", priority:"medium", status:"pending", desc:"Retornar contato após envio do catálogo." },
  { id:3, title:"Reativar Thiago Rocha", archId:6, assignee:1, due:"2026-04-05", priority:"high", status:"pending", desc:"Cliente inativo há 3 meses. Agendar call." },
  { id:4, title:"Enviar amostras Rafael", archId:2, assignee:1, due:"2026-04-03", priority:"high", status:"done", desc:"Linha premium completa." },
  { id:5, title:"Ligar para Pedro sobre projeto escolar", archId:4, assignee:2, due:"2026-04-08", priority:"medium", status:"pending", desc:"" },
  { id:6, title:"Preparar apresentação workshop", archId:null, assignee:0, due:"2026-04-10", priority:"high", status:"pending", desc:"Slides para workshop Top 10." }
];

const INIT_DEALS = [
  { id:1, title:"Residencial Morumbi Premium", archId:2, assignee:1, value:180000, stage:"proposta", prob:70, expected:"2026-04-20", created:"2026-03-20", notes:"Aguardando aprovação final." },
  { id:2, title:"Comercial Paulista", archId:2, assignee:1, value:320000, stage:"fechamento", prob:95, expected:"2026-04-15", created:"2026-02-10", notes:"Contrato em revisão jurídica." },
  { id:3, title:"Alphaville Fase 2", archId:1, assignee:2, value:150000, stage:"negociacao", prob:60, expected:"2026-04-25", created:"2026-03-15", notes:"Ajuste de preços em andamento." },
  { id:4, title:"Escritório RJ", archId:3, assignee:3, value:78000, stage:"qualificacao", prob:40, expected:"2026-05-10", created:"2026-03-25", notes:"" },
  { id:5, title:"Centro Educacional PR", archId:4, assignee:2, value:180000, stage:"proposta", prob:65, expected:"2026-04-30", created:"2026-03-18", notes:"Material sustentável." },
  { id:6, title:"Resort Bahia Fase 1", archId:7, assignee:1, value:210000, stage:"negociacao", prob:75, expected:"2026-05-05", created:"2026-03-05", notes:"Embaixadora NE." },
  { id:7, title:"Prospecção Lucas Gov.", archId:8, assignee:4, value:65000, stage:"prospeccao", prob:20, expected:"2026-05-20", created:"2026-04-01", notes:"" }
];

const INIT_GOALS = [
  { id:1, userId:1, period:"monthly", month:"2026-04", target:100000, achieved:0, desc:"Meta Abril" },
  { id:2, userId:1, period:"quarterly", quarter:"2026-Q2", target:300000, achieved:0, desc:"Meta Q2" },
  { id:3, userId:1, period:"yearly", year:"2026", target:1200000, achieved:890000, desc:"Meta Anual" },
  { id:4, userId:2, period:"monthly", month:"2026-04", target:75000, achieved:0, desc:"Meta Abril" },
  { id:5, userId:2, period:"yearly", year:"2026", target:900000, achieved:620000, desc:"Meta Anual" },
  { id:6, userId:3, period:"monthly", month:"2026-04", target:120000, achieved:0, desc:"Meta Abril" },
  { id:7, userId:3, period:"yearly", year:"2026", target:1400000, achieved:1150000, desc:"Meta Anual" },
  { id:8, userId:4, period:"monthly", month:"2026-04", target:70000, achieved:0, desc:"Meta Abril" },
  { id:9, userId:4, period:"yearly", year:"2026", target:840000, achieved:480000, desc:"Meta Anual" },
  { id:10, userId:5, period:"monthly", month:"2026-04", target:60000, achieved:0, desc:"Meta Abril" },
  { id:11, userId:5, period:"yearly", year:"2026", target:720000, achieved:340000, desc:"Meta Anual" }
];

const INIT_COMMENTS = [
  { id:1, archId:2, userId:1, date:"2026-03-28", text:"Cliente prefere reuniões pela manhã. Sempre confirma por WhatsApp." },
  { id:2, archId:2, userId:0, date:"2026-03-20", text:"Atenção: indicado pela Fernanda. Tratar com prioridade." },
  { id:3, archId:1, userId:2, date:"2026-03-25", text:"Gosta de receber amostras físicas antes de qualquer apresentação." },
  { id:4, archId:5, userId:4, date:"2026-03-22", text:"Primeiro contato na Expo Revestir. Interesse em linha sustentável." }
];

const fm = (v) => new Intl.NumberFormat("pt-BR", { style:"currency", currency:"BRL" }).format(v);
const fk = (v) => "R$" + (v / 1000).toFixed(0) + "k";
const fd = (d) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit" });
const fdf = (d) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday:"short", day:"numeric", month:"short" });
const TD = "2026-04-03";

function calcPts(ap, rules) {
  var p = ap.b || 0;
  var sales = ap.sales || [];
  for (var i = 0; i < sales.length; i++) {
    var sale = sales[i];
    if (sale.v === 0) {
      for (var j = 0; j < rules.length; j++) {
        if (rules[j].d.toLowerCase().indexOf("indica") >= 0) { p += rules[j].p; break; }
      }
    } else {
      for (var k = 0; k < rules.length; k++) {
        if (rules[k].d.toLowerCase().indexOf("projeto") >= 0) { p += rules[k].p; break; }
      }
      if (sale.v >= 150000) {
        for (var l = 0; l < rules.length; l++) {
          if (rules[l].d.toLowerCase().indexOf("acima") >= 0) { p += rules[l].p; break; }
        }
      } else if (sale.v >= 50000) {
        for (var m = 0; m < rules.length; m++) {
          if (rules[m].d.toLowerCase().indexOf("50k") >= 0) { p += rules[m].p; break; }
        }
      } else {
        for (var n = 0; n < rules.length; n++) {
          if (rules[n].d.toLowerCase().indexOf("até") >= 0) { p += rules[n].p; break; }
        }
      }
    }
  }
  return p;
}

/* ═══ ICON ═══ */
function Ic(props) {
  var t = props.t;
  var s = props.s || 16;
  var c = props.c;
  var st = { width:s, height:s, display:"inline-block", verticalAlign:"middle", flexShrink:0 };
  var sp = { style:st, viewBox:"0 0 24 24", fill:"none", stroke:c||"currentColor", strokeWidth:"1.5", strokeLinecap:"round", strokeLinejoin:"round" };

  if (t === "home") return <svg {...sp}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if (t === "layers") return <svg {...sp}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>;
  if (t === "chart") return <svg {...sp}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>;
  if (t === "users") return <svg {...sp}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>;
  if (t === "cal") return <svg {...sp}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
  if (t === "trophy") return <svg {...sp}><path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2"/><path d="M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>;
  if (t === "search") return <svg {...sp}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
  if (t === "plus") return <svg {...sp}><path d="M12 5v14M5 12h14"/></svg>;
  if (t === "back") return <svg {...sp}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
  if (t === "sun") return <svg {...sp}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
  if (t === "moon") return <svg {...sp}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
  if (t === "out") return <svg {...sp}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
  if (t === "x") return <svg {...sp}><path d="M18 6L6 18M6 6l12 12"/></svg>;
  if (t === "trash") return <svg {...sp}><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>;
  if (t === "upload") return <svg {...sp}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
  if (t === "check") return <svg {...sp} strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>;
  if (t === "dot") return <svg style={st} viewBox="0 0 24 24" fill={c || "currentColor"}><circle cx="12" cy="12" r="4"/></svg>;
  if (t === "menu") return <svg {...sp}><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
  if (t === "gcal") return <svg style={st} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#4285F4" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#4285F4" strokeWidth="1.5"/><circle cx="12" cy="15" r="2" fill="#EA4335"/></svg>;
  if (t === "zap") return <svg {...sp}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  if (t === "gift") return <svg {...sp}><rect x="3" y="8" width="18" height="4" rx="1"/><rect x="5" y="12" width="14" height="9" rx="1"/><path d="M12 8v13M12 8c-2-3-6-3-6 0M12 8c2-3 6-3 6 0"/></svg>;
  if (t === "award") return <svg {...sp}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
  if (t === "star") return <svg style={st} viewBox="0 0 24 24" fill={c || "currentColor"} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
  if (t === "chev") return <svg {...sp}><path d="M9 18l6-6-6-6"/></svg>;
  return null;
}

/* ═══ UI PRIMITIVES ═══ */
function Tag(props) {
  var T = useT();
  var color = props.color || T.accT;
  var bg = props.solid ? color : (props.color ? props.color + "18" : T.accS);
  var txC = props.solid ? "#fff" : color;
  return <span style={{ display:"inline-flex", padding:"4px 11px", borderRadius:100, fontSize:10, fontWeight:700, background:bg, color:txC, letterSpacing:"0.02em", whiteSpace:"nowrap" }}>{props.children}</span>;
}

function Bar(props) {
  var T = useT();
  var pct = Math.min((props.value / props.max) * 100, 100);
  return (
    <div style={{ width:"100%", height:props.h || 6, background:T.brd, borderRadius:100, overflow:"hidden" }}>
      <div style={{ width:pct + "%", height:"100%", background:props.color || T.acc, borderRadius:100, transition:"width 0.6s cubic-bezier(.4,0,.2,1)" }}/>
    </div>
  );
}

function Avatar(props) {
  var T = useT();
  var sz = props.size || 40;
  return (
    <div style={{ position:"relative", width:sz, height:sz, flexShrink:0 }}>
      <div style={{ width:sz, height:sz, borderRadius:sz, background:props.bg || T.accS, display:"flex", alignItems:"center", justifyContent:"center", fontSize:sz * 0.34, fontWeight:700, color:props.bg ? "#fff" : T.accT, border:props.ring ? "2px solid " + props.ring : "none", boxShadow:props.bg ? "0 2px 8px " + props.bg + "40" : "none" }}>{props.initials}</div>
      {props.online !== undefined && <div style={{ position:"absolute", bottom:0, right:0, width:sz * 0.28, height:sz * 0.28, borderRadius:100, background:props.online ? T.ok : T.tx3, border:"2px solid " + T.srf }}/>}
    </div>
  );
}

function Glass(props) {
  var T = useT();
  return (
    <div onClick={props.onClick} className={"mp-card " + (props.onClick ? "mp-hover" : "")} style={{ background:T.card, borderRadius:20, border:"1px solid " + T.brd, padding:22, cursor:props.onClick ? "pointer" : "default", transition:"all 0.25s cubic-bezier(.4,0,.2,1)", boxShadow:T.sh, ...props.style }}>
      {props.children}
    </div>
  );
}

function Metric(props) {
  var T = useT();
  var c = props.color || T.acc;
  return (
    <Glass style={{ position:"relative", overflow:"hidden" }}>
      {props.accent && <div style={{ position:"absolute", top:0, right:0, width:120, height:120, background:"radial-gradient(circle, " + c + "22 0%, transparent 70%)", pointerEvents:"none" }}/>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
        <span style={{ color:T.tx3, fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{props.label}</span>
        {props.icon && <div style={{ width:36, height:36, borderRadius:12, background:c + "1a", display:"flex", alignItems:"center", justifyContent:"center" }}><Ic t={props.icon} s={17} c={c}/></div>}
      </div>
      <div style={{ fontSize:props.big ? 36 : 30, fontWeight:200, color:T.tx, letterSpacing:"-0.03em", marginTop:14, lineHeight:1, position:"relative" }}>{props.value}</div>
      {(props.trend || props.sub) && (
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:12, flexWrap:"wrap", position:"relative" }}>
          {props.trend !== undefined && props.trend !== null && <span style={{ fontSize:11, fontWeight:700, color:props.trend >= 0 ? T.ok : T.err, background:props.trend >= 0 ? "rgba(48,209,88,0.15)" : "rgba(255,69,58,0.15)", padding:"3px 9px", borderRadius:100, display:"inline-flex", alignItems:"center", gap:3 }}>{props.trend >= 0 ? "↑" : "↓"} {Math.abs(props.trend)}%</span>}
          {props.sub && <span style={{ fontSize:11, color:T.tx3, fontWeight:500 }}>{props.sub}</span>}
        </div>
      )}
    </Glass>
  );
}

function Btn(props) {
  var T = useT();
  var base = { border:"none", borderRadius:12, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, fontWeight:700, fontFamily:"inherit", fontSize:props.sm ? 12 : 13, padding:props.sm ? "9px 16px" : "12px 20px", transition:"all 0.2s cubic-bezier(.4,0,.2,1)", letterSpacing:"0.01em", whiteSpace:"nowrap" };
  var styles = {
    primary: { background:T.acc, color:"#0A0A0B", boxShadow:"0 4px 12px " + T.acc + "40" },
    ghost: { background:T.accS, color:T.accT },
    danger: { background:"rgba(255,69,58,0.12)", color:T.err },
    outline: { background:"transparent", color:T.tx2, border:"1px solid " + T.brdS },
    dark: { background:T.srf3, color:T.tx }
  };
  var v = styles[props.variant] || styles.primary;
  return <button onClick={props.onClick} style={{ ...base, ...v, ...props.style }}>{props.icon && <Ic t={props.icon} s={props.sm ? 13 : 14}/>}{props.children}</button>;
}

function Input(props) {
  var T = useT();
  var sh = { background:T.inp, border:"1px solid " + T.brdS, borderRadius:12, color:T.tx, padding:"12px 14px", fontSize:13, fontFamily:"inherit", outline:"none", width:"100%", boxSizing:"border-box", transition:"all 0.2s" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7, ...props.style }}>
      {props.label && <label style={{ fontSize:11, fontWeight:700, color:T.tx2, textTransform:"uppercase", letterSpacing:"0.06em" }}>{props.label}</label>}
      {props.textarea
        ? <textarea value={props.value} onChange={function(e) { props.onChange(e.target.value); }} placeholder={props.placeholder} rows={3} style={{ ...sh, resize:"vertical" }}/>
        : <input type={props.type || "text"} value={props.value} onChange={function(e) { props.onChange(e.target.value); }} placeholder={props.placeholder} style={sh}/>
      }
    </div>
  );
}

function Select(props) {
  var T = useT();
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      {props.label && <label style={{ fontSize:11, fontWeight:700, color:T.tx2, textTransform:"uppercase", letterSpacing:"0.06em" }}>{props.label}</label>}
      <select value={props.value} onChange={function(e) { props.onChange(e.target.value); }} style={{ background:T.inp, border:"1px solid " + T.brdS, borderRadius:12, color:T.tx, padding:"12px 14px", fontSize:13, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
        {props.options.map(function(o) { return <option key={o.v} value={o.v}>{o.l}</option>; })}
      </select>
    </div>
  );
}

function Modal(props) {
  var T = useT();
  if (!props.show) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:12 }}>
      <div onClick={props.onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(8px)" }}/>
      <div className="mp-modal" style={{ position:"relative", zIndex:201, background:T.srf, borderRadius:20, border:"1px solid " + T.brd, padding:28, width:"100%", maxWidth:460, maxHeight:"85vh", overflowY:"auto", boxShadow:T.shL }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ fontSize:17, fontWeight:600, color:T.tx, margin:0 }}>{props.title}</h3>
          <span onClick={props.onClose} style={{ cursor:"pointer", color:T.tx3, padding:8 }}><Ic t="x" s={18}/></span>
        </div>
        {props.children}
      </div>
    </div>
  );
}

/* ═══ LOGIN ═══ */
function LoginPage(props) {
  var T = TK[props.theme];
  var [email, setEmail] = useState("");
  var [pass, setPass] = useState("");
  var [error, setError] = useState("");
  var [loading, setLoading] = useState(false);

  function go() {
    setError(""); setLoading(true);
    setTimeout(function() {
      var all = [ADM].concat(TEAM);
      var u = all.find(function(u) { return u.email === email && u.pw === pass; });
      if (u) props.onLogin(u);
      else { setError("Credenciais inválidas"); setLoading(false); }
    }, 500);
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:T.bg, fontFamily:"'Inter','DM Sans',-apple-system,sans-serif" }}>
      <div style={{ position:"absolute", top:20, right:20 }}>
        <button onClick={props.toggle} style={{ background:T.accS, border:"none", borderRadius:100, width:40, height:40, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Ic t={props.theme === "dark" ? "sun" : "moon"} s={16} c={T.accT}/>
        </button>
      </div>
      <div style={{ width:"100%", maxWidth:380, padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:48, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <img src={T.logo} alt="Mula Preta" style={{ height:60, objectFit:"contain", marginBottom:20 }} onError={function(e) { e.target.outerHTML = "<h1 style='font-size:28px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin:0 0 16px'>MULA PRETA</h1>"; }}/>
          <p style={{ fontSize:12, color:T.tx3, letterSpacing:"0.14em", textTransform:"uppercase" }}>Specifiers CRM</p>
        </div>
        <div style={{ background:T.glass, backdropFilter:"blur(40px)", borderRadius:24, border:"1px solid " + T.brd, padding:32, boxShadow:T.shL }}>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:"block", fontSize:13, fontWeight:500, color:T.tx2, marginBottom:8 }}>E-mail</label>
            <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); setError(""); }} placeholder="seu@email.com" onKeyDown={function(e) { if (e.key === "Enter") go(); }} style={{ width:"100%", background:T.inp, border:"1px solid " + T.brd, borderRadius:14, padding:"14px 16px", color:T.tx, fontSize:15, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:"block", fontSize:13, fontWeight:500, color:T.tx2, marginBottom:8 }}>Senha</label>
            <input type="password" value={pass} onChange={function(e) { setPass(e.target.value); setError(""); }} placeholder="••••••" onKeyDown={function(e) { if (e.key === "Enter") go(); }} style={{ width:"100%", background:T.inp, border:"1px solid " + T.brd, borderRadius:14, padding:"14px 16px", color:T.tx, fontSize:15, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
          </div>
          {error && <div style={{ background:"rgba(255,59,48,0.08)", borderRadius:12, padding:"10px 14px", marginBottom:16, fontSize:13, color:T.err }}>{error}</div>}
          <button onClick={go} disabled={loading} style={{ width:"100%", padding:"14px", background:T.acc, color:"#fff", border:"none", borderRadius:14, fontSize:14, fontWeight:600, cursor:loading ? "wait" : "pointer", fontFamily:"inherit" }}>{loading ? "Entrando..." : "Entrar"}</button>
          <div style={{ marginTop:20, paddingTop:14, borderTop:"1px solid " + T.brd }}>
            <p style={{ fontSize:11, color:T.tx3, textAlign:"center", lineHeight:1.6 }}>Admin: admin@mulapreta.com / admin123<br/>Equipe: ana@mulapreta.com / ana123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ DASHBOARD ═══ */
function DashPage(props) {
  var T = useT();
  var archs = props.archs;
  var tR = archs.reduce(function(s, a) { return s + a.rev; }, 0);
  var todayEv = props.events.filter(function(e) { return e.date === TD; });
  var pColors = [T.inf, T.wrn, T.acc, T.accT, T.ok];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <h2 style={{ fontSize:24, fontWeight:300, color:T.tx, margin:0 }}>Olá, {props.user.name.split(" ")[0]}</h2>
        <p style={{ fontSize:13, color:T.tx3, margin:"4px 0 0" }}>{new Date().toLocaleDateString("pt-BR", { weekday:"long", day:"numeric", month:"long" })}</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:12 }}>
        <Metric label="Receita" value={fk(tR)} sub="vs anterior" icon="chart" trend={18.4}/>
        <Metric label="Arquitetos" value={archs.filter(function(a) { return a.status === "ativo"; }).length} sub={"de " + archs.length} icon="layers" trend={8} color={T.ok}/>
        <Metric label="Satisfação" value={Math.round(archs.reduce(function(s, a) { return s + a.sat; }, 0) / archs.length) + "%"} icon="star" trend={3} color={T.wrn}/>
        <Metric label="Pipeline" value={fk(PIPE_DATA.reduce(function(s, p) { return s + p.v; }, 0))} sub={PIPE_DATA.reduce(function(s, p) { return s + p.n; }, 0) + " neg."} icon="layers" trend={12} color={T.inf}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:12 }}>
        <Glass>
          <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.06em" }}>Vendas Mensais</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:140 }}>
            {(props.salesData || []).map(function(m, i) {
              var mx = Math.max.apply(null, (props.salesData || []).map(function(s) { return Math.max(s.v, s.t); }));
              return (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <span style={{ fontSize:9, color:T.tx3 }}>{fk(m.v)}</span>
                  <div style={{ width:"100%", height:120, display:"flex", alignItems:"flex-end", justifyContent:"center", gap:2 }}>
                    <div style={{ width:"36%", height:(m.t / mx) * 110, background:T.brd, borderRadius:4 }}/>
                    <div style={{ width:"36%", height:(m.v / mx) * 110, borderRadius:4, background:m.v >= m.t ? T.acc : T.err }}/>
                  </div>
                  <span style={{ fontSize:10, color:T.tx2, fontWeight:500 }}>{m.m}</span>
                </div>
              );
            })}
          </div>
        </Glass>
        <Glass>
          <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:12, textTransform:"uppercase", display:"flex", justifyContent:"space-between" }}>
            <span>Hoje</span>
            <span onClick={function() { props.setPage("agenda"); }} style={{ color:T.acc, cursor:"pointer", textTransform:"none" }}>Agenda →</span>
          </div>
          {todayEv.length === 0
            ? <p style={{ fontSize:13, color:T.tx3, padding:"20px 0", textAlign:"center" }}>Sem eventos</p>
            : todayEv.map(function(e) {
                return (
                  <div key={e.id} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:"1px solid " + T.brd }}>
                    <div style={{ width:3, height:32, borderRadius:2, background:T.acc, flexShrink:0 }}/>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:T.tx }}>{e.title}</div>
                      <div style={{ fontSize:11, color:T.tx3 }}>{e.time} · {e.loc}</div>
                    </div>
                  </div>
                );
              })
          }
        </Glass>
      </div>
      <Glass>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.tx3, textTransform:"uppercase", letterSpacing:"0.06em" }}>Minhas Tarefas</div>
          <span onClick={function() { props.setPage("tasks"); }} style={{ color:T.acc, cursor:"pointer", fontSize:11, fontWeight:700 }}>Ver todas →</span>
        </div>
        {(props.tasks || []).filter(function(t) { return t.status === "pending" && t.assignee === props.user.id; }).slice(0, 5).map(function(t) {
          var overdue = t.due < TD;
          var pC = { high:T.err, medium:T.wrn, low:T.tx3 };
          return (
            <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid " + T.brd }}>
              <div style={{ width:6, height:6, borderRadius:100, background:pC[t.priority], flexShrink:0 }}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.tx, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.title}</div>
                <div style={{ fontSize:10, color:overdue ? T.err : T.tx3, marginTop:2 }}>{fdf(t.due)}{overdue ? " · Atrasada" : ""}</div>
              </div>
            </div>
          );
        })}
        {(props.tasks || []).filter(function(t) { return t.status === "pending" && t.assignee === props.user.id; }).length === 0 && <p style={{ fontSize:12, color:T.tx3, padding:"12px 0", textAlign:"center" }}>Nenhuma tarefa pendente 🎉</p>}
      </Glass>
      <Glass>
        <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:12, textTransform:"uppercase" }}>Pipeline</div>
        {PIPE_DATA.map(function(p, i) {
          return (
            <div key={i} style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:12, color:T.tx, fontWeight:500 }}>{p.s}</span>
                <span style={{ fontSize:11, color:T.tx3 }}>{p.n} · {fk(p.v)}</span>
              </div>
              <Bar value={p.v} max={900000} color={pColors[i]}/>
            </div>
          );
        })}
      </Glass>
    </div>
  );
}

/* ═══ ARCHITECTS ═══ */
function ArchPage(props) {
  var T = useT();
  var [q, setQ] = useState("");
  var [f, setF] = useState("all");
  var fileRef = useRef(null);
  var [showModal, setShowModal] = useState(false);
  var [editA, setEditA] = useState(null);
  var emptyA = { name:"", firm:"", city:"", status:"prospect", tier:"bronze", projects:0, rev:0, sat:70, av:"", lastC:TD, nextF:TD, notes:"" };
  var [form, setForm] = useState(Object.assign({}, emptyA));
  var [confirmDelA, setConfirmDelA] = useState(null);
  var archs = props.archs;
  var filtered = archs.filter(function(a) {
    var match = (a.name + a.firm + a.city).toLowerCase().indexOf(q.toLowerCase()) >= 0;
    return match && (f === "all" || a.status === f);
  });
  var tierC = { platinum:"#B8C5D6", gold:T.acc, silver:"#A0A0A0", bronze:"#C4956A" };
  var statC = { ativo:T.ok, prospect:T.inf, inativo:T.err };

  function openNew() { setEditA(null); setForm(Object.assign({}, emptyA)); setShowModal(true); }
  function openEdit(a, e) { if (e) e.stopPropagation(); setEditA(a); setForm({ name:a.name, firm:a.firm, city:a.city, status:a.status, tier:a.tier, projects:a.projects, rev:a.rev, sat:a.sat, av:a.av, lastC:a.lastC, nextF:a.nextF, notes:a.notes }); setShowModal(true); }
  function save() {
    if (!form.name.trim()) return;
    var av = form.av || form.name.split(" ").map(function(w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
    if (editA) {
      props.setArchs(function(p) { return p.map(function(a) { return a.id === editA.id ? Object.assign({}, a, form, { av:av }) : a; }); });
    } else {
      props.setArchs(function(p) { return p.concat([Object.assign({}, form, { id:Date.now(), av:av })]); });
    }
    setShowModal(false); setEditA(null); setForm(Object.assign({}, emptyA));
  }
  function remove(id) { props.setArchs(function(p) { return p.filter(function(a) { return a.id !== id; }); }); setShowModal(false); setEditA(null); }
  function upd(key, val) { setForm(function(p) { var n = Object.assign({}, p); n[key] = val; return n; }); }

  var handleExcel = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    import("sheetjs").then(function(XLSX) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var wb = XLSX.read(ev.target.result, { type:"binary" });
          var ws = wb.Sheets[wb.SheetNames[0]];
          var data = XLSX.utils.sheet_to_json(ws);
          var na = data.map(function(r, i) {
            return { id:Date.now() + i, name:r["Nome"] || "", firm:r["Escritório"] || "", city:r["Cidade"] || "", status:r["Status"] || "prospect", tier:r["Tier"] || "bronze", projects:parseInt(r["Projetos"]) || 0, rev:parseFloat(r["Receita"]) || 0, sat:parseInt(r["Satisfação"]) || 70, av:(r["Nome"] || "??").split(" ").map(function(w) { return w[0]; }).join("").slice(0, 2).toUpperCase(), lastC:r["Último Contato"] || TD, nextF:r["Follow-Up"] || TD, notes:r["Notas"] || "" };
          });
          props.setArchs(function(prev) { return prev.concat(na); });
        } catch(err) { console.error(err); }
      };
      reader.readAsBinaryString(file);
    }).catch(function(err) { console.error(err); });
    e.target.value = "";
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <Modal show={showModal} onClose={function() { setShowModal(false); setEditA(null); }} title={(editA ? "Editar" : "Novo") + " Arquiteto"}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="Nome" value={form.name} onChange={function(v) { upd("name", v); }} placeholder="Ex: Marina Lopes"/>
            <Input label="Escritório" value={form.firm} onChange={function(v) { upd("firm", v); }} placeholder="Ex: Studio ML"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <Input label="Cidade" value={form.city} onChange={function(v) { upd("city", v); }}/>
            <Select label="Status" value={form.status} onChange={function(v) { upd("status", v); }} options={[{v:"prospect",l:"Prospect"},{v:"ativo",l:"Ativo"},{v:"inativo",l:"Inativo"}]}/>
            <Select label="Tier" value={form.tier} onChange={function(v) { upd("tier", v); }} options={[{v:"bronze",l:"Bronze"},{v:"silver",l:"Silver"},{v:"gold",l:"Gold"},{v:"platinum",l:"Platinum"}]}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <Input label="Projetos" type="number" value={form.projects} onChange={function(v) { upd("projects", parseInt(v) || 0); }}/>
            <Input label="Receita (R$)" type="number" value={form.rev} onChange={function(v) { upd("rev", parseFloat(v) || 0); }}/>
            <Input label="Satisfação (%)" type="number" value={form.sat} onChange={function(v) { upd("sat", parseInt(v) || 0); }}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="Último Contato" type="date" value={form.lastC} onChange={function(v) { upd("lastC", v); }}/>
            <Input label="Próx. Follow-Up" type="date" value={form.nextF} onChange={function(v) { upd("nextF", v); }}/>
          </div>
          <Input label="Observações" value={form.notes} onChange={function(v) { upd("notes", v); }} textarea placeholder="Detalhes sobre o arquiteto..."/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:6 }}>
            {editA && <Btn variant="danger" sm icon="trash" onClick={function() { remove(editA.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowModal(false); setEditA(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={save}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:24, fontWeight:300, color:T.tx, margin:0 }}>Arquitetos</h2>
          <p style={{ fontSize:13, color:T.tx3, margin:"4px 0 0" }}>{archs.length} cadastrados</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn variant="ghost" sm icon="upload" onClick={function() { if(fileRef.current) fileRef.current.click(); }}>Importar</Btn>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleExcel} style={{ display:"none" }}/>
          <Btn sm icon="plus" onClick={openNew}>Novo</Btn>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200, display:"flex", alignItems:"center", gap:8, background:T.card, border:"1px solid " + T.brd, borderRadius:14, padding:"0 14px" }}>
          <Ic t="search" s={15} c={T.tx3}/>
          <input value={q} onChange={function(e) { setQ(e.target.value); }} placeholder="Buscar..." style={{ background:"none", border:"none", outline:"none", color:T.tx, fontSize:13, padding:"12px 0", width:"100%", fontFamily:"inherit" }}/>
        </div>
        <select value={f} onChange={function(e) { setF(e.target.value); }} style={{ background:T.card, border:"1px solid " + T.brd, borderRadius:14, color:T.tx, padding:"0 14px", fontSize:12, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
          <option value="all">Todos</option>
          <option value="ativo">Ativo</option>
          <option value="prospect">Prospect</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
      {filtered.map(function(a) {
        return (
          <div key={a.id}>
          <Glass onClick={function() { props.setSelA(a); props.setPage("archDetail"); }} style={{ padding:16, display:"flex", alignItems:"center", gap:14 }}>
            <Avatar initials={a.av} size={44} bg={tierC[a.tier]}/>
            <div style={{ flex:1, minWidth:130 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:14, fontWeight:600, color:T.tx }}>{a.name}</span>
                <Tag color={statC[a.status]}>{a.status}</Tag>
              </div>
              <div style={{ fontSize:12, color:T.tx2, marginTop:2 }}>{a.firm} · {a.city}</div>
            </div>
            <div style={{ display:"flex", gap:18 }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:15, fontWeight:600, color:T.acc }}>{fk(a.rev)}</div>
                <div style={{ fontSize:9, color:T.tx3, textTransform:"uppercase" }}>receita</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:15, fontWeight:600, color:a.sat >= 80 ? T.ok : T.wrn }}>{a.sat}%</div>
                <div style={{ fontSize:9, color:T.tx3, textTransform:"uppercase" }}>sat.</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <button onClick={function(e) { e.stopPropagation(); openEdit(a, e); }} style={{ cursor:"pointer", padding:"8px 10px", border:"none", background:T.accS, color:T.accT, borderRadius:10, display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600, fontFamily:"inherit" }} title="Editar"><Ic t="edit" s={14}/>Editar</button>
              <button onClick={function(e) { e.stopPropagation(); setConfirmDelA(confirmDelA === a.id ? null : a.id); }} style={{ cursor:"pointer", padding:"8px 10px", border:"none", background:confirmDelA === a.id ? T.err + "30" : T.err + "15", color:T.err, borderRadius:10, display:"flex", alignItems:"center", fontFamily:"inherit" }} title="Excluir"><Ic t="trash" s={14}/></button>
            </div>
          </Glass>
          {confirmDelA === a.id && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:8, padding:"10px 16px", background:T.srf2, borderRadius:"0 0 16px 16px", border:"1px solid " + T.brd, borderTop:"none", marginTop:-4 }}>
              <span style={{ fontSize:12, color:T.err, fontWeight:500, flex:1 }}>Excluir {a.name}?</span>
              <Btn variant="danger" sm onClick={function(e) { e.stopPropagation(); remove(a.id); setConfirmDelA(null); }}>Sim, excluir</Btn>
              <Btn variant="outline" sm onClick={function(e) { e.stopPropagation(); setConfirmDelA(null); }}>Cancelar</Btn>
            </div>
          )}
          </div>
        );
      })}
    </div>
  );
}

function ArchDetailPage(props) {
  var T = useT();
  var a = props.arch;
  if (!a) return null;
  var tierC = { platinum:"#B8C5D6", gold:T.acc, silver:"#A0A0A0", bronze:"#C4956A" };
  var statC = { ativo:T.ok, prospect:T.inf, inativo:T.err };
  var [tab, setTab] = useState("timeline");
  var [editing, setEditing] = useState(false);
  var [form, setForm] = useState(null);
  var [confirmDel, setConfirmDel] = useState(false);
  var [showInter, setShowInter] = useState(false);
  var emptyI = { type:"call", date:TD, time:"09:00", title:"", notes:"" };
  var [iForm, setIForm] = useState(Object.assign({}, emptyI));

  var archInters = (props.interactions || []).filter(function(i) { return i.archId === a.id; }).sort(function(x, y) { return (y.date + y.time).localeCompare(x.date + x.time); });
  var archDeals = (props.deals || []).filter(function(d) { return d.archId === a.id; });
  var archTasks = (props.tasks || []).filter(function(t) { return t.archId === a.id; });
  var archComments = (props.comments || []).filter(function(c) { return c.archId === a.id; }).sort(function(x, y) { return y.date.localeCompare(x.date); });
  var [newComment, setNewComment] = useState("");
  function addComment() {
    if (!newComment.trim()) return;
    var nc = { id:Date.now(), archId:a.id, userId:props.user.id, date:TD, text:newComment.trim() };
    props.setComments(function(p) { return [nc].concat(p); });
    setNewComment("");
  }
  function delComment(id) { props.setComments(function(p) { return p.filter(function(c) { return c.id !== id; }); }); }
  var team = props.team || [];

  function startEdit() { setForm({ name:a.name, firm:a.firm, city:a.city, status:a.status, tier:a.tier, projects:a.projects, rev:a.rev, sat:a.sat, lastC:a.lastC, nextF:a.nextF, notes:a.notes }); setEditing(true); }
  function saveEdit() {
    if (!form) return;
    var av = form.name.split(" ").map(function(w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
    props.setArchs(function(p) { return p.map(function(x) { return x.id === a.id ? Object.assign({}, x, form, { av:av }) : x; }); });
    setEditing(false); props.setPage("archs");
  }
  function deleteArch() { props.setArchs(function(p) { return p.filter(function(x) { return x.id !== a.id; }); }); props.setPage("archs"); }
  function upd(key, val) { setForm(function(p) { var n = Object.assign({}, p); n[key] = val; return n; }); }
  function updI(key, val) { setIForm(function(p) { var n = Object.assign({}, p); n[key] = val; return n; }); }
  function saveInter() {
    if (!iForm.title.trim()) return;
    var ni = Object.assign({}, iForm, { id:Date.now(), archId:a.id, user:props.user.id });
    props.setInteractions(function(p) { return [ni].concat(p); });
    props.setArchs(function(p) { return p.map(function(x) { return x.id === a.id ? Object.assign({}, x, { lastC:iForm.date }) : x; }); });
    setIForm(Object.assign({}, emptyI)); setShowInter(false);
  }
  function delInter(id) { props.setInteractions(function(p) { return p.filter(function(i) { return i.id !== id; }); }); }

  var typeIcons = { call:"phone", email:"mail", meeting:"users", whatsapp:"mail", note:"edit" };
  var typeLabels = { call:"Ligação", email:"E-mail", meeting:"Reunião", whatsapp:"WhatsApp", note:"Nota" };
  var typeColors = { call:T.inf, email:T.wrn, meeting:T.acc, whatsapp:T.ok, note:T.tx2 };

  function userName(id) { var u = team.find(function(t) { return t.id === id; }); return u ? u.name.split(" ")[0] : (id === 0 ? "Admin" : "?"); }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      <Modal show={showInter} onClose={function() { setShowInter(false); }} title="Registrar Interação">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Select label="Tipo" value={iForm.type} onChange={function(v) { updI("type", v); }} options={[{v:"call",l:"Ligação"},{v:"email",l:"E-mail"},{v:"whatsapp",l:"WhatsApp"},{v:"meeting",l:"Reunião"},{v:"note",l:"Nota interna"}]}/>
          <Input label="Título / Assunto" value={iForm.title} onChange={function(v) { updI("title", v); }} placeholder="Ex: Envio de proposta"/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="Data" type="date" value={iForm.date} onChange={function(v) { updI("date", v); }}/>
            <Input label="Hora" type="time" value={iForm.time} onChange={function(v) { updI("time", v); }}/>
          </div>
          <Input label="Detalhes" value={iForm.notes} onChange={function(v) { updI("notes", v); }} textarea placeholder="O que aconteceu nessa interação..."/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            <Btn variant="outline" sm onClick={function() { setShowInter(false); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={saveInter}>Registrar</Btn>
          </div>
        </div>
      </Modal>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div onClick={function() { props.setPage("archs"); }} style={{ display:"flex", alignItems:"center", gap:8, color:T.acc, cursor:"pointer", fontSize:13, fontWeight:600 }}><Ic t="back" s={16}/>Arquitetos</div>
        <div style={{ display:"flex", gap:8 }}>
          {!editing && <Btn variant="ghost" sm icon="plus" onClick={function() { setShowInter(true); }}>Registrar</Btn>}
          {!editing && <Btn variant="outline" sm icon="edit" onClick={startEdit}>Editar</Btn>}
          {!editing && !confirmDel && <Btn variant="danger" sm icon="trash" onClick={function() { setConfirmDel(true); }}>Excluir</Btn>}
          {confirmDel && <span style={{ fontSize:12, color:T.err, display:"flex", alignItems:"center", gap:8 }}>Confirmar? <Btn variant="danger" sm onClick={deleteArch}>Sim</Btn><Btn variant="outline" sm onClick={function() { setConfirmDel(false); }}>Não</Btn></span>}
        </div>
      </div>

      {editing && form ? (
        <Glass>
          <div style={{ fontSize:14, fontWeight:600, color:T.tx, marginBottom:16 }}>Editando: {a.name}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Nome" value={form.name} onChange={function(v) { upd("name", v); }}/>
              <Input label="Escritório" value={form.firm} onChange={function(v) { upd("firm", v); }}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              <Input label="Cidade" value={form.city} onChange={function(v) { upd("city", v); }}/>
              <Select label="Status" value={form.status} onChange={function(v) { upd("status", v); }} options={[{v:"prospect",l:"Prospect"},{v:"ativo",l:"Ativo"},{v:"inativo",l:"Inativo"}]}/>
              <Select label="Tier" value={form.tier} onChange={function(v) { upd("tier", v); }} options={[{v:"bronze",l:"Bronze"},{v:"silver",l:"Silver"},{v:"gold",l:"Gold"},{v:"platinum",l:"Platinum"}]}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              <Input label="Projetos" type="number" value={form.projects} onChange={function(v) { upd("projects", parseInt(v) || 0); }}/>
              <Input label="Receita" type="number" value={form.rev} onChange={function(v) { upd("rev", parseFloat(v) || 0); }}/>
              <Input label="Satisfação (%)" type="number" value={form.sat} onChange={function(v) { upd("sat", parseInt(v) || 0); }}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Último Contato" type="date" value={form.lastC} onChange={function(v) { upd("lastC", v); }}/>
              <Input label="Follow-Up" type="date" value={form.nextF} onChange={function(v) { upd("nextF", v); }}/>
            </div>
            <Input label="Observações" value={form.notes} onChange={function(v) { upd("notes", v); }} textarea/>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
              <Btn variant="outline" sm onClick={function() { setEditing(false); }}>Cancelar</Btn>
              <Btn sm icon="check" onClick={saveEdit}>Salvar</Btn>
            </div>
          </div>
        </Glass>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Glass style={{ display:"flex", gap:20, flexWrap:"wrap", alignItems:"center" }}>
            <Avatar initials={a.av} size={64} bg={tierC[a.tier]}/>
            <div style={{ flex:1, minWidth:180 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <h2 style={{ fontSize:22, fontWeight:600, color:T.tx, margin:0, letterSpacing:"-0.02em" }}>{a.name}</h2>
                <Tag color={statC[a.status]}>{a.status}</Tag>
                <Tag color={tierC[a.tier]}>{a.tier}</Tag>
              </div>
              <p style={{ fontSize:13, color:T.tx2, margin:"6px 0 0" }}>{a.firm} · {a.city}</p>
            </div>
          </Glass>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:12 }}>
            <Metric label="Projetos" value={a.projects} icon="layers"/>
            <Metric label="Receita" value={fk(a.rev)} icon="chart" color={T.acc}/>
            <Metric label="Satisfação" value={a.sat + "%"} icon="star" color={a.sat >= 80 ? T.ok : T.wrn}/>
            <Metric label="Follow-Up" value={fdf(a.nextF)} icon="cal"/>
          </div>

          <div style={{ display:"flex", gap:4, background:T.srf2, padding:4, borderRadius:12, alignSelf:"flex-start", flexWrap:"wrap" }}>
            {[{id:"timeline",l:"Timeline",ic:"clock"},{id:"comments",l:"Comentários",ic:"edit"},{id:"deals",l:"Oportunidades ("+archDeals.length+")",ic:"zap"},{id:"tasks",l:"Tarefas ("+archTasks.length+")",ic:"check"},{id:"info",l:"Detalhes",ic:"layers"}].map(function(tb) {
              var act = tab === tb.id;
              return <div key={tb.id} onClick={function() { setTab(tb.id); }} style={{ padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", borderRadius:9, background:act ? T.card : "transparent", color:act ? T.accT : T.tx2, display:"flex", alignItems:"center", gap:6, transition:"all 0.2s" }}><Ic t={tb.ic} s={13}/>{tb.l}</div>;
            })}
          </div>

          {tab === "timeline" && (
            <Glass>
              <div style={{ fontSize:13, fontWeight:700, color:T.tx2, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.06em" }}>Histórico de Interações</div>
              {archInters.length === 0 ? (
                <div style={{ textAlign:"center", padding:"32px 0", color:T.tx3 }}>
                  <Ic t="clock" s={32} c={T.tx4}/>
                  <p style={{ fontSize:13, marginTop:10 }}>Nenhuma interação registrada</p>
                  <Btn sm icon="plus" onClick={function() { setShowInter(true); }} style={{ marginTop:12 }}>Primeira interação</Btn>
                </div>
              ) : (
                <div style={{ position:"relative", paddingLeft:24 }}>
                  <div style={{ position:"absolute", left:11, top:6, bottom:6, width:2, background:T.brd }}/>
                  {archInters.map(function(i) {
                    return (
                      <div key={i.id} style={{ position:"relative", marginBottom:18 }}>
                        <div style={{ position:"absolute", left:-24, top:2, width:24, height:24, borderRadius:100, background:(typeColors[i.type] || T.acc) + "22", border:"2px solid " + T.card, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Ic t={typeIcons[i.type] || "dot"} s={11} c={typeColors[i.type] || T.acc}/>
                        </div>
                        <div style={{ background:T.srf2, borderRadius:12, padding:"12px 14px" }}>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <Tag color={typeColors[i.type]}>{typeLabels[i.type]}</Tag>
                              <span style={{ fontSize:13, fontWeight:600, color:T.tx }}>{i.title}</span>
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <span style={{ fontSize:11, color:T.tx3 }}>{fdf(i.date)} · {i.time} · {userName(i.user)}</span>
                              <span onClick={function() { delInter(i.id); }} style={{ cursor:"pointer", color:T.tx3, opacity:0.5 }}><Ic t="trash" s={12}/></span>
                            </div>
                          </div>
                          {i.notes && <p style={{ fontSize:12, color:T.tx2, lineHeight:1.6, margin:"8px 0 0" }}>{i.notes}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Glass>
          )}

          {tab === "deals" && (
            <Glass>
              <div style={{ fontSize:13, fontWeight:700, color:T.tx2, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.06em" }}>Oportunidades</div>
              {archDeals.length === 0 ? <p style={{ fontSize:13, color:T.tx3, textAlign:"center", padding:"20px 0" }}>Nenhuma oportunidade.</p>
                : archDeals.map(function(d) {
                    var stC = { prospeccao:T.tx3, qualificacao:T.inf, proposta:T.wrn, negociacao:T.acc, fechamento:T.ok };
                    return (
                      <div key={d.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid " + T.brd }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:T.tx }}>{d.title}</div>
                          <div style={{ fontSize:11, color:T.tx3, marginTop:2 }}>Fechamento esperado: {fdf(d.expected)} · {d.prob}% prob.</div>
                        </div>
                        <Tag color={stC[d.stage]}>{d.stage}</Tag>
                        <div style={{ fontSize:14, fontWeight:700, color:T.acc, minWidth:80, textAlign:"right" }}>{fk(d.value)}</div>
                      </div>
                    );
                  })}
            </Glass>
          )}

          {tab === "tasks" && (
            <Glass>
              <div style={{ fontSize:13, fontWeight:700, color:T.tx2, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.06em" }}>Tarefas Relacionadas</div>
              {archTasks.length === 0 ? <p style={{ fontSize:13, color:T.tx3, textAlign:"center", padding:"20px 0" }}>Nenhuma tarefa.</p>
                : archTasks.map(function(t) {
                    var pC = { high:T.err, medium:T.wrn, low:T.tx3 };
                    return (
                      <div key={t.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid " + T.brd }}>
                        <div style={{ width:20, height:20, borderRadius:6, border:"2px solid " + (t.status === "done" ? T.ok : T.brd), background:t.status === "done" ? T.ok : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {t.status === "done" && <Ic t="check" s={11} c="#fff"/>}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:t.status === "done" ? T.tx3 : T.tx, textDecoration:t.status === "done" ? "line-through" : "none" }}>{t.title}</div>
                          <div style={{ fontSize:10, color:T.tx3, marginTop:2 }}>{fdf(t.due)} · {userName(t.assignee)}</div>
                        </div>
                        <Tag color={pC[t.priority]}>{t.priority}</Tag>
                      </div>
                    );
                  })}
            </Glass>
          )}

          {tab === "comments" && (
            <Glass>
              <div style={{ fontSize:13, fontWeight:700, color:T.tx2, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.06em" }}>Comentários Internos</div>
              <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                <input value={newComment} onChange={function(e) { setNewComment(e.target.value); }} placeholder="Adicione uma observação interna sobre este arquiteto..." onKeyDown={function(e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addComment(); } }} style={{ flex:1, background:T.inp, border:"1px solid " + T.brdS, borderRadius:12, color:T.tx, padding:"11px 14px", fontSize:13, fontFamily:"inherit", outline:"none" }}/>
                <Btn sm icon="plus" onClick={addComment}>Adicionar</Btn>
              </div>
              {archComments.length === 0 ? (
                <div style={{ textAlign:"center", padding:"32px 0", color:T.tx3 }}>
                  <Ic t="edit" s={28} c={T.tx4}/>
                  <p style={{ fontSize:13, marginTop:10 }}>Nenhum comentário ainda</p>
                  <p style={{ fontSize:11, marginTop:4, color:T.tx4 }}>Comentários são visíveis apenas para a equipe interna</p>
                </div>
              ) : archComments.map(function(c) {
                var u = (props.team || []).find(function(t) { return t.id === c.userId; });
                var name = u ? u.name : (c.userId === 0 ? "Administrador" : "Desconhecido");
                var av = u ? u.av : "MP";
                return (
                  <div key={c.id} style={{ display:"flex", gap:12, padding:"14px 0", borderBottom:"1px solid " + T.brd }}>
                    <Avatar initials={av} size={36}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:13, fontWeight:600, color:T.tx }}>{name}</span>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:11, color:T.tx3 }}>{fdf(c.date)}</span>
                          {(c.userId === props.user.id || props.user.id === 0) && <span onClick={function() { delComment(c.id); }} style={{ cursor:"pointer", color:T.tx3, padding:4, opacity:0.6 }}><Ic t="trash" s={12}/></span>}
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:T.tx2, lineHeight:1.6, margin:0, whiteSpace:"pre-wrap" }}>{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </Glass>
          )}

          {tab === "info" && (
            <Glass>
              <div style={{ fontSize:13, fontWeight:700, color:T.tx2, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.06em" }}>Informações Detalhadas</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:16 }}>
                <div><div style={{ fontSize:11, color:T.tx3, fontWeight:600, textTransform:"uppercase" }}>Último Contato</div><div style={{ fontSize:14, color:T.tx, marginTop:4 }}>{fdf(a.lastC)}</div></div>
                <div><div style={{ fontSize:11, color:T.tx3, fontWeight:600, textTransform:"uppercase" }}>Próx. Follow-Up</div><div style={{ fontSize:14, color:T.tx, marginTop:4 }}>{fdf(a.nextF)}</div></div>
                <div><div style={{ fontSize:11, color:T.tx3, fontWeight:600, textTransform:"uppercase" }}>Status</div><div style={{ fontSize:14, color:T.tx, marginTop:4, textTransform:"capitalize" }}>{a.status}</div></div>
                <div><div style={{ fontSize:11, color:T.tx3, fontWeight:600, textTransform:"uppercase" }}>Tier</div><div style={{ fontSize:14, color:T.tx, marginTop:4, textTransform:"capitalize" }}>{a.tier}</div></div>
              </div>
              {a.notes && <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid " + T.brd }}>
                <div style={{ fontSize:11, color:T.tx3, fontWeight:600, textTransform:"uppercase", marginBottom:6 }}>Notas</div>
                <p style={{ fontSize:13, color:T.tx, lineHeight:1.6, margin:0 }}>{a.notes}</p>
              </div>}
            </Glass>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══ AGENDA ═══ */
function AgendaPage(props) {
  var T = useT();
  var [filter, setFilter] = useState("all");
  var [showM, setShowM] = useState(false);
  var [editE, setEditE] = useState(null);
  var typeLabels = { reuniao:"Reunião", visita:"Visita", ligacao:"Ligação", evento:"Evento", interna:"Interna", social:"Social" };
  var empty = { title:"", date:TD, time:"09:00", dur:60, type:"reuniao", loc:"", parts:[], arch:"", notes:"" };
  var [nE, setNE] = useState(Object.assign({}, empty));

  var fEv = useMemo(function() {
    var ev = props.events.slice().sort(function(a, b) { return a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date); });
    if (filter === "mine") ev = ev.filter(function(e) { return e.parts.indexOf(props.user.id) >= 0; });
    if (filter === "others") ev = ev.filter(function(e) { return e.parts.indexOf(props.user.id) < 0; });
    return ev;
  }, [props.events, filter, props.user.id]);

  var wk = useMemo(function() {
    var s = new Date(TD + "T12:00:00");
    var dow = s.getDay();
    var mon = new Date(s);
    mon.setDate(mon.getDate() - (dow === 0 ? 6 : dow - 1));
    var days = [];
    for (var i = 0; i < 7; i++) {
      var dd = new Date(mon);
      dd.setDate(dd.getDate() + i);
      var ds = dd.toISOString().split("T")[0];
      days.push({ date:ds, dn:dd.toLocaleDateString("pt-BR", { weekday:"short" }), num:dd.getDate(), today:ds === TD });
    }
    return days;
  }, []);

  function save() {
    if (!nE.title.trim()) return;
    if (editE) {
      props.setEvents(function(p) { return p.map(function(e) { return e.id === editE.id ? Object.assign({}, editE, nE) : e; }); });
    } else {
      var parts = nE.parts.slice();
      if (parts.indexOf(props.user.id) < 0) parts.push(props.user.id);
      props.setEvents(function(p) { return p.concat([Object.assign({}, nE, { id:Date.now(), by:props.user.id, parts:parts })]); });
    }
    setShowM(false); setEditE(null); setNE(Object.assign({}, empty));
  }
  function openEdit(ev) { setEditE(ev); setNE({ title:ev.title, date:ev.date, time:ev.time, dur:ev.dur, type:ev.type, loc:ev.loc, parts:ev.parts, arch:ev.arch, notes:ev.notes }); setShowM(true); }
  function openNew(d) { setEditE(null); setNE(Object.assign({}, empty, d ? { date:d } : {})); setShowM(true); }
  function gcalUrl(ev) { return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) + "&dates=" + ev.date.replace(/-/g, "") + "T" + ev.time.replace(/:/g, "") + "00/" + ev.date.replace(/-/g, "") + "T" + ev.time.replace(/:/g, "") + "00&location=" + encodeURIComponent(ev.loc); }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <Modal show={showM} onClose={function() { setShowM(false); setEditE(null); setNE(Object.assign({}, empty)); }} title={(editE ? "Editar" : "Novo") + " Evento"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="Título" value={nE.title} onChange={function(v) { setNE(function(p) { return Object.assign({}, p, { title:v }); }); }}/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            <Input label="Data" type="date" value={nE.date} onChange={function(v) { setNE(function(p) { return Object.assign({}, p, { date:v }); }); }}/>
            <Input label="Hora" type="time" value={nE.time} onChange={function(v) { setNE(function(p) { return Object.assign({}, p, { time:v }); }); }}/>
            <Input label="Duração" type="number" value={nE.dur} onChange={function(v) { setNE(function(p) { return Object.assign({}, p, { dur:parseInt(v) || 0 }); }); }}/>
          </div>
          <Input label="Notas" value={nE.notes} onChange={function(v) { setNE(function(p) { return Object.assign({}, p, { notes:v }); }); }} textarea/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            {editE && <Btn variant="danger" sm icon="trash" onClick={function() { props.setEvents(function(p) { return p.filter(function(e) { return e.id !== editE.id; }); }); setShowM(false); setEditE(null); setNE(Object.assign({}, empty)); }}>Excluir</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowM(false); setEditE(null); setNE(Object.assign({}, empty)); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={save}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:10 }}>
        <h2 style={{ fontSize:24, fontWeight:300, color:T.tx, margin:0 }}>Agenda</h2>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ display:"flex", border:"1px solid " + T.brd, borderRadius:10, overflow:"hidden" }}>
            {[{ id:"all", l:"Todos" }, { id:"mine", l:"Meus" }, { id:"others", l:"Outros" }].map(function(fi) {
              return <div key={fi.id} onClick={function() { setFilter(fi.id); }} style={{ padding:"7px 14px", fontSize:12, fontWeight:600, cursor:"pointer", background:filter === fi.id ? T.accS : "transparent", color:filter === fi.id ? T.accT : T.tx2 }}>{fi.l}</div>;
            })}
          </div>
          <Btn sm icon="plus" onClick={function() { openNew(); }}>Evento</Btn>
        </div>
      </div>

      <div className="mp-wk" style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:6 }}>
        {wk.map(function(d) {
          var dayEv = fEv.filter(function(e) { return e.date === d.date; });
          return (
            <div key={d.date} onClick={function() { openNew(d.date); }} style={{ background:d.today ? T.accS : T.card, border:"1px solid " + (d.today ? T.acc : T.brd), borderRadius:14, padding:10, minHeight:110, cursor:"pointer" }}>
              <div style={{ textAlign:"center", marginBottom:6 }}>
                <div style={{ fontSize:10, color:T.tx3, textTransform:"uppercase", fontWeight:600 }}>{d.dn}</div>
                <div style={{ fontSize:20, fontWeight:d.today ? 700 : 200, color:d.today ? T.acc : T.tx, marginTop:2 }}>{d.num}</div>
              </div>
              {dayEv.slice(0, 3).map(function(e) {
                return (
                  <div key={e.id} onClick={function(ev) { ev.stopPropagation(); openEdit(e); }} style={{ padding:"3px 5px", borderRadius:6, marginBottom:2, background:T.srf2, borderLeft:"3px solid " + T.acc, cursor:"pointer" }}>
                    <div style={{ fontSize:8, fontWeight:600, color:T.tx, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{e.time} {e.title.slice(0, 10)}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <Glass>
        <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:12, textTransform:"uppercase" }}>Próximos</div>
        {fEv.filter(function(e) { return e.date >= TD; }).slice(0, 10).map(function(e) {
          return (
            <div key={e.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 6px", borderRadius:10, cursor:"pointer", borderLeft:"3px solid " + T.acc, marginBottom:3 }} onClick={function() { openEdit(e); }}>
              <div style={{ width:42, textAlign:"center" }}>
                <div style={{ fontSize:16, fontWeight:200, color:e.date === TD ? T.acc : T.tx }}>{new Date(e.date + "T12:00:00").getDate()}</div>
                <div style={{ fontSize:9, color:T.tx3 }}>{fd(e.date)}</div>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.tx }}>{e.title}</div>
                <div style={{ fontSize:11, color:T.tx3, marginTop:1 }}>{e.time} · {e.dur}min · {e.loc}</div>
              </div>
              <a href={gcalUrl(e)} target="_blank" rel="noopener noreferrer" onClick={function(ev) { ev.stopPropagation(); }} style={{ flexShrink:0 }}><Ic t="gcal" s={16}/></a>
              <Tag>{typeLabels[e.type] || e.type}</Tag>
            </div>
          );
        })}
      </Glass>
    </div>
  );
}

/* ═══ SALES ═══ */
function SalesPage(props) {
  var T = useT();
  var fileRef = useRef(null);
  var data = props.salesData || [];
  var [viewYear, setViewYear] = useState("all");

  // Extract unique years from data
  var years = [];
  data.forEach(function(d) {
    if (d.year && years.indexOf(d.year) < 0) years.push(d.year);
  });
  years.sort();
  if (years.length === 0) years.push("2026");

  // Filter by selected year
  var filtered = viewYear === "all" ? data : data.filter(function(d) { return d.year === viewYear; });

  var tR = filtered.reduce(function(s, m) { return s + m.v; }, 0);
  var tT = filtered.reduce(function(s, m) { return s + (m.t || 0); }, 0);
  var ac = tT > 0 ? Math.round(tR / tT * 100) : 0;

  // By city
  var byC = {};
  props.archs.forEach(function(a) { byC[a.city] = (byC[a.city] || 0) + a.rev; });
  var cities = Object.entries(byC).sort(function(a, b) { return b[1] - a[1]; });
  var mx = cities[0] ? cities[0][1] : 1;

  // Year-over-year comparison
  var yoyData = {};
  data.forEach(function(d) {
    var yr = d.year || "2026";
    if (!yoyData[yr]) yoyData[yr] = 0;
    yoyData[yr] += d.v;
  });
  var yoyEntries = Object.entries(yoyData).sort(function(a, b) { return a[0].localeCompare(b[0]); });
  var yoyMax = Math.max.apply(null, yoyEntries.map(function(e) { return e[1]; }).concat([1]));
  var yoyColors = [T.tx3, T.inf, T.wrn, T.acc, T.ok];

  function handleExcel(e) {
    var file = e.target.files[0];
    if (!file) return;
    import("sheetjs").then(function(XLSX) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var wb = XLSX.read(ev.target.result, { type:"binary" });
          var ws = wb.Sheets[wb.SheetNames[0]];
          var rows = XLSX.utils.sheet_to_json(ws);
          var newData = rows.map(function(r, i) {
            return {
              m: r["Mês"] || r["Mes"] || r["mes"] || r["month"] || ("M" + (i + 1)),
              v: parseFloat(r["Faturamento"] || r["Valor"] || r["faturamento"] || r["valor"] || r["value"] || 0),
              t: parseFloat(r["Meta"] || r["meta"] || r["target"] || 0),
              year: String(r["Ano"] || r["ano"] || r["year"] || "Importado")
            };
          });
          props.setSalesData(function(prev) { return prev.concat(newData); });
        } catch(err) { console.error(err); }
      };
      reader.readAsBinaryString(file);
    }).catch(function(err) { console.error(err); });
    e.target.value = "";
  }

  function clearImported() {
    props.setSalesData(SALES_DATA);
    setViewYear("all");
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:24, fontWeight:300, color:T.tx, margin:0 }}>Vendas</h2>
          <p style={{ fontSize:13, color:T.tx3, margin:"4px 0 0" }}>{filtered.length} registros {viewYear !== "all" ? "· " + viewYear : ""}</p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {years.length > 1 && (
            <select value={viewYear} onChange={function(e) { setViewYear(e.target.value); }} style={{ background:T.card, border:"1px solid " + T.brd, borderRadius:12, color:T.tx, padding:"8px 12px", fontSize:12, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
              <option value="all">Todos os anos</option>
              {years.map(function(y) { return <option key={y} value={y}>{y}</option>; })}
            </select>
          )}
          <Btn variant="ghost" sm icon="upload" onClick={function() { if (fileRef.current) fileRef.current.click(); }}>Importar Faturamento</Btn>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleExcel} style={{ display:"none" }}/>
          {data.length > SALES_DATA.length && (
            <Btn variant="outline" sm icon="trash" onClick={clearImported}>Limpar importados</Btn>
          )}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:12 }}>
        <Metric label="Receita Total" value={fm(tR)} icon="chart" trend={15}/>
        <Metric label="Meta" value={tT > 0 ? fm(tT) : "—"} icon="chart"/>
        <Metric label="Atingimento" value={tT > 0 ? ac + "%" : "—"} icon="check" color={ac >= 100 ? T.ok : T.wrn}/>
        <Metric label="Registros" value={filtered.length} sub={years.length + " ano(s)"} icon="layers"/>
      </div>

      {/* Year-over-year */}
      {yoyEntries.length > 1 && (
        <Glass>
          <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.06em" }}>Faturamento Anual Comparativo</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:160 }}>
            {yoyEntries.map(function(entry, i) {
              var barH = yoyMax > 0 ? (entry[1] / yoyMax) * 140 : 0;
              var color = yoyColors[i % yoyColors.length];
              return (
                <div key={entry[0]} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:10, color:T.tx2, fontWeight:600 }}>{fm(entry[1])}</span>
                  <div style={{ width:"60%", height:barH, borderRadius:8, background:color, transition:"height 0.5s ease", minHeight:4 }}/>
                  <span style={{ fontSize:12, color:T.tx, fontWeight:600 }}>{entry[0]}</span>
                </div>
              );
            })}
          </div>
        </Glass>
      )}

      {/* Monthly chart */}
      <Glass>
        <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.06em" }}>Faturamento Mensal {viewYear !== "all" ? "· " + viewYear : ""}</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:140 }}>
          {filtered.map(function(m, i) {
            var mxV = Math.max.apply(null, filtered.map(function(s) { return Math.max(s.v, s.t || 0); }).concat([1]));
            return (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, minWidth:0 }}>
                <span style={{ fontSize:9, color:T.tx3, whiteSpace:"nowrap" }}>{fk(m.v)}</span>
                <div style={{ width:"100%", height:120, display:"flex", alignItems:"flex-end", justifyContent:"center", gap:2 }}>
                  {m.t > 0 && <div style={{ width:"36%", height:(m.t / mxV) * 110, background:T.brd, borderRadius:4 }}/>}
                  <div style={{ width: m.t > 0 ? "36%" : "60%", height:(m.v / mxV) * 110, borderRadius:4, background: m.t > 0 ? (m.v >= m.t ? T.acc : T.err) : T.acc }}/>
                </div>
                <span style={{ fontSize:10, color:T.tx2, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"100%" }}>{m.m}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display:"flex", gap:16, marginTop:12, justifyContent:"center" }}>
          <span style={{ fontSize:10, color:T.tx3, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:2, background:T.brd, display:"inline-block" }}/> Meta</span>
          <span style={{ fontSize:10, color:T.tx3, display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:2, background:T.acc, display:"inline-block" }}/> Realizado</span>
        </div>
      </Glass>

      <Glass>
        <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:12, textTransform:"uppercase" }}>Por Cidade</div>
        {cities.map(function(c) {
          return (
            <div key={c[0]} style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:13, color:T.tx }}>{c[0]}</span>
                <span style={{ fontSize:12, color:T.acc, fontWeight:600 }}>{fm(c[1])}</span>
              </div>
              <Bar value={c[1]} max={mx}/>
            </div>
          );
        })}
      </Glass>

      {/* Table */}
      <Glass>
        <div style={{ fontSize:11, fontWeight:600, color:T.tx3, marginBottom:12, textTransform:"uppercase" }}>Detalhamento</div>
        <div style={{ overflowX:"auto" }}>
          <table className="mp-tbl" style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr>
                {["Mês", "Ano", "Faturamento", "Meta", "Dif", ""].map(function(h) {
                  return <th key={h} style={{ textAlign:"left", padding:"10px", color:T.tx3, fontWeight:600, borderBottom:"1px solid " + T.brd, fontSize:10, textTransform:"uppercase" }}>{h}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {filtered.map(function(m, i) {
                var d = m.t > 0 ? m.v - m.t : null;
                var hit = d !== null ? d >= 0 : null;
                return (
                  <tr key={i} style={{ borderBottom:"1px solid " + T.brd }}>
                    <td style={{ padding:10, color:T.tx }}>{m.m}</td>
                    <td style={{ padding:10, color:T.tx2 }}>{m.year || "2026"}</td>
                    <td style={{ padding:10, color:T.acc, fontWeight:600 }}>{fm(m.v)}</td>
                    <td style={{ padding:10, color:T.tx2 }}>{m.t > 0 ? fm(m.t) : "—"}</td>
                    <td style={{ padding:10, color:hit === null ? T.tx3 : hit ? T.ok : T.err, fontWeight:600 }}>{d !== null ? (hit ? "+" : "") + fm(d) : "—"}</td>
                    <td style={{ padding:10 }}>{hit !== null && <Tag color={hit ? T.ok : T.err}>{hit ? "OK" : "—"}</Tag>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Glass>

      {/* Import instructions */}
      <Glass style={{ background:T.srf2, border:"1px dashed " + T.brd }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <Ic t="upload" s={20} c={T.tx3}/>
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:T.tx2 }}>Importar faturamento de anos anteriores</div>
            <div style={{ fontSize:11, color:T.tx3, marginTop:4, lineHeight:1.5 }}>
              Excel com colunas: <strong style={{ color:T.tx2 }}>Mês</strong>, <strong style={{ color:T.tx2 }}>Ano</strong>, <strong style={{ color:T.tx2 }}>Faturamento</strong>, <strong style={{ color:T.tx2 }}>Meta</strong> (opcional). Aceita .xlsx, .xls e .csv.
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
}

/* ═══ TEAM ═══ */
function TeamPage(props) {
  var T = useT();
  var team = props.team;
  var goals = props.goals || [];
  var [sel, setSel] = useState(null);
  var [showModal, setShowModal] = useState(false);
  var [editM, setEditM] = useState(null);
  var [showGoal, setShowGoal] = useState(false);
  var [editG, setEditG] = useState(null);
  var [goalUser, setGoalUser] = useState(null);
  var emptyG = { period:"monthly", month:"2026-04", quarter:"2026-Q2", year:"2026", target:0, achieved:0, desc:"" };
  var [gForm, setGForm] = useState(Object.assign({}, emptyG));
  var empty = { name:"", role:"", email:"", pw:"", av:"", clients:0, deals:0, rev:0, tgt:0, meets:0, calls:0, emails:0, tOk:0, tPd:0, on:false };
  var [form, setForm] = useState(Object.assign({}, empty));

  function openNew() { setEditM(null); setForm(Object.assign({}, empty)); setShowModal(true); }
  function openEdit(m) { setEditM(m); setForm({ name:m.name, role:m.role, email:m.email, pw:m.pw, av:m.av, clients:m.clients, deals:m.deals, rev:m.rev, tgt:m.tgt, meets:m.meets, calls:m.calls, emails:m.emails, tOk:m.tOk, tPd:m.tPd, on:m.on }); setShowModal(true); }
  function save() {
    if (!form.name.trim() || !form.email.trim()) return;
    var av = form.av || form.name.split(" ").map(function(w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
    if (editM) {
      props.setTeam(function(p) { return p.map(function(m) { return m.id === editM.id ? Object.assign({}, m, form, { av:av }) : m; }); });
    } else {
      props.setTeam(function(p) { return p.concat([Object.assign({}, form, { id:Date.now(), av:av })]); });
    }
    setShowModal(false); setEditM(null); setForm(Object.assign({}, empty));
  }
  function remove(id) { props.setTeam(function(p) { return p.filter(function(m) { return m.id !== id; }); }); props.setGoals(function(p) { return p.filter(function(g) { return g.userId !== id; }); }); setShowModal(false); setEditM(null); setConfirmDel(null); }
  function upd(key, val) { setForm(function(p) { var n = Object.assign({}, p); n[key] = val; return n; }); }
  var [confirmDel, setConfirmDel] = useState(null);

  function openNewGoal(userId) { setGoalUser(userId); setEditG(null); setGForm(Object.assign({}, emptyG)); setShowGoal(true); }
  function openEditGoal(g) { setGoalUser(g.userId); setEditG(g); setGForm({ period:g.period, month:g.month || "2026-04", quarter:g.quarter || "2026-Q2", year:g.year || "2026", target:g.target, achieved:g.achieved, desc:g.desc || "" }); setShowGoal(true); }
  function saveGoal() {
    if (!goalUser || gForm.target <= 0) return;
    var base = { userId:goalUser, period:gForm.period, target:gForm.target, achieved:gForm.achieved, desc:gForm.desc };
    if (gForm.period === "monthly") base.month = gForm.month;
    else if (gForm.period === "quarterly") base.quarter = gForm.quarter;
    else base.year = gForm.year;
    if (editG) {
      props.setGoals(function(p) { return p.map(function(g) { return g.id === editG.id ? Object.assign({}, g, base) : g; }); });
    } else {
      props.setGoals(function(p) { return p.concat([Object.assign({}, base, { id:Date.now() })]); });
    }
    setShowGoal(false); setEditG(null); setGoalUser(null);
  }
  function delGoal(id) { props.setGoals(function(p) { return p.filter(function(g) { return g.id !== id; }); }); setShowGoal(false); setEditG(null); }
  function updG(k, v) { setGForm(function(p) { var n = Object.assign({}, p); n[k] = v; return n; }); }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <Modal show={showModal} onClose={function() { setShowModal(false); setEditM(null); }} title={(editM ? "Editar" : "Novo") + " Colaborador"}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="Nome completo" value={form.name} onChange={function(v) { upd("name", v); }} placeholder="Ex: João Silva"/>
            <Input label="Cargo" value={form.role} onChange={function(v) { upd("role", v); }} placeholder="Ex: Gerente Comercial"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="E-mail (login)" value={form.email} onChange={function(v) { upd("email", v); }} placeholder="nome@mulapreta.com"/>
            <Input label="Senha" value={form.pw} onChange={function(v) { upd("pw", v); }} placeholder="Mín. 6 caracteres" type="password"/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <Input label="Meta (R$)" type="number" value={form.tgt} onChange={function(v) { upd("tgt", parseInt(v) || 0); }}/>
            <Input label="Receita (R$)" type="number" value={form.rev} onChange={function(v) { upd("rev", parseInt(v) || 0); }}/>
            <Input label="Clientes" type="number" value={form.clients} onChange={function(v) { upd("clients", parseInt(v) || 0); }}/>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:6 }}>
            {editM && <Btn variant="danger" sm icon="trash" onClick={function() { remove(editM.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowModal(false); setEditM(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={save}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <Modal show={showGoal} onClose={function() { setShowGoal(false); setEditG(null); setGoalUser(null); }} title={(editG ? "Editar" : "Nova") + " Meta"}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Select label="Período" value={gForm.period} onChange={function(v) { updG("period", v); }} options={[{v:"monthly",l:"Mensal"},{v:"quarterly",l:"Trimestral"},{v:"yearly",l:"Anual"}]}/>
          {gForm.period === "monthly" && <Input label="Mês (YYYY-MM)" type="month" value={gForm.month} onChange={function(v) { updG("month", v); }}/>}
          {gForm.period === "quarterly" && <Input label="Trimestre (ex: 2026-Q2)" value={gForm.quarter} onChange={function(v) { updG("quarter", v); }}/>}
          {gForm.period === "yearly" && <Input label="Ano" value={gForm.year} onChange={function(v) { updG("year", v); }}/>}
          <Input label="Descrição" value={gForm.desc} onChange={function(v) { updG("desc", v); }} placeholder="Ex: Meta Abril 2026"/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="Meta (R$)" type="number" value={gForm.target} onChange={function(v) { updG("target", parseFloat(v) || 0); }}/>
            <Input label="Realizado (R$)" type="number" value={gForm.achieved} onChange={function(v) { updG("achieved", parseFloat(v) || 0); }}/>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            {editG && <Btn variant="danger" sm icon="trash" onClick={function() { delGoal(editG.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowGoal(false); setEditG(null); setGoalUser(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={saveGoal}>Salvar</Btn>
          </div>
        </div>
      </Modal>
        <Btn sm icon="plus" onClick={openNew}>Novo Colaborador</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:12 }}>
        <Metric label="Receita" value={fk(team.reduce(function(s, c) { return s + c.rev; }, 0))} icon="chart" trend={14}/>
        <Metric label="Reuniões" value={team.reduce(function(s, c) { return s + c.meets; }, 0)} icon="cal" color={T.inf}/>
        <Metric label="Concluídas" value={team.reduce(function(s, c) { return s + c.tOk; }, 0)} sub={team.reduce(function(s, c) { return s + c.tPd; }, 0) + " pend."} icon="check" color={T.ok}/>
      </div>
      {team.map(function(c) {
        var pct = c.tgt > 0 ? Math.round(c.rev / c.tgt * 100) : 0;
        var isSel = sel && sel.id === c.id;
        return (
          <div key={c.id}>
            <Glass onClick={function() { setSel(isSel ? null : c); }} style={{ padding:16, border:"1px solid " + (isSel ? T.acc : T.brd) }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                <Avatar initials={c.av} size={44} online={c.on}/>
                <div style={{ flex:1, minWidth:110 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:T.tx }}>{c.name}</div>
                  <div style={{ fontSize:12, color:T.tx2 }}>{c.role}</div>
                </div>
                <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:14, fontWeight:600, color:T.acc }}>{fk(c.rev)}</div>
                    <div style={{ fontSize:9, color:T.tx3 }}>Receita</div>
                  </div>
                  {c.tgt > 0 && <div style={{ width:60 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:pct >= 90 ? T.ok : pct >= 70 ? T.wrn : T.err, marginBottom:3 }}>{pct}%</div>
                    <Bar value={c.rev} max={c.tgt} color={pct >= 90 ? T.ok : pct >= 70 ? T.wrn : T.err}/>
                  </div>}
                </div>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <button onClick={function(e) { e.stopPropagation(); openEdit(c); }} style={{ cursor:"pointer", padding:"8px 10px", border:"none", background:T.accS, color:T.accT, borderRadius:10, display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600, fontFamily:"inherit" }} title="Editar"><Ic t="edit" s={14}/>Editar</button>
                  <button onClick={function(e) { e.stopPropagation(); setConfirmDel(confirmDel === c.id ? null : c.id); }} style={{ cursor:"pointer", padding:"8px 10px", border:"none", background:confirmDel === c.id ? T.err + "30" : T.err + "15", color:T.err, borderRadius:10, display:"flex", alignItems:"center", fontFamily:"inherit" }} title="Excluir"><Ic t="trash" s={14}/></button>
                </div>
              </div>
              {confirmDel === c.id && (
                <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:8, marginTop:12, paddingTop:12, borderTop:"1px solid " + T.brd }}>
                  <span style={{ fontSize:12, color:T.err, fontWeight:500 }}>Excluir {c.name.split(" ")[0]}?</span>
                  <Btn variant="danger" sm onClick={function(e) { e.stopPropagation(); remove(c.id); }}>Sim, excluir</Btn>
                  <Btn variant="outline" sm onClick={function(e) { e.stopPropagation(); setConfirmDel(null); }}>Cancelar</Btn>
                </div>
              )}
            </Glass>
            {isSel && (
              <Glass style={{ marginTop:6, borderColor:T.acc }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(110px, 1fr))", gap:10 }}>
                  {[{ l:"Reuniões", v:c.meets, color:T.inf }, { l:"Ligações", v:c.calls, color:T.acc }, { l:"E-mails", v:c.emails, color:T.wrn }, { l:"Concluídas", v:c.tOk, color:T.ok }, { l:"Pendentes", v:c.tPd, color:T.err }].map(function(x) {
                    return <div key={x.l} style={{ background:T.srf2, borderRadius:12, padding:12 }}><div style={{ fontSize:10, color:T.tx3, marginBottom:4 }}>{x.l}</div><div style={{ fontSize:20, fontWeight:200, color:T.tx }}>{x.v}</div></div>;
                  })}
                </div>
                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid " + T.brd }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:T.tx3, textTransform:"uppercase", letterSpacing:"0.06em" }}>Metas</div>
                    <Btn variant="ghost" sm icon="plus" onClick={function(e) { e.stopPropagation(); openNewGoal(c.id); }}>Meta</Btn>
                  </div>
                  {goals.filter(function(g) { return g.userId === c.id; }).length === 0 ? (
                    <p style={{ fontSize:12, color:T.tx3, textAlign:"center", padding:"14px 0" }}>Nenhuma meta definida</p>
                  ) : goals.filter(function(g) { return g.userId === c.id; }).map(function(g) {
                    var gpct = g.target > 0 ? Math.round(g.achieved / g.target * 100) : 0;
                    var pColor = gpct >= 100 ? T.ok : gpct >= 70 ? T.wrn : T.err;
                    var pLabel = { monthly:"Mensal", quarterly:"Trimestral", yearly:"Anual" }[g.period];
                    var pPeriod = g.month || g.quarter || g.year;
                    return (
                      <div key={g.id} style={{ background:T.srf2, borderRadius:12, padding:12, marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                            <Tag color={T.inf}>{pLabel}</Tag>
                            <span style={{ fontSize:11, color:T.tx3 }}>{pPeriod}</span>
                            {g.desc && <span style={{ fontSize:11, color:T.tx2 }}>· {g.desc}</span>}
                          </div>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                            <span style={{ fontSize:13, fontWeight:600, color:T.tx }}>{fk(g.achieved)} / {fk(g.target)}</span>
                            <span style={{ fontSize:13, fontWeight:700, color:pColor }}>{gpct}%</span>
                          </div>
                          <Bar value={g.achieved} max={g.target} color={pColor}/>
                        </div>
                        <button onClick={function(e) { e.stopPropagation(); openEditGoal(g); }} style={{ cursor:"pointer", padding:"6px 8px", border:"none", background:T.accS, color:T.accT, borderRadius:8, display:"flex", alignItems:"center", fontFamily:"inherit" }}><Ic t="edit" s={13}/></button>
                      </div>
                    );
                  })}
                </div>
              </Glass>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══ SPECIFIERS ═══ */
function SpecPage(props) {
  var T = useT();
  var [tab, setTab] = useState("ranking");
  var activeSeason = props.seasons.find(function(s) { return s.status === "active"; });
  var [sId, setSId] = useState((activeSeason && activeSeason.id) || (props.seasons[0] && props.seasons[0].id));
  var [showR, setShowR] = useState(false);
  var [showP, setShowP] = useState(false);
  var [showS, setShowS] = useState(false);
  var [showAp, setShowAp] = useState(false);
  var [editR, setEditR] = useState(null);
  var [editP, setEditP] = useState(null);
  var [editS, setEditS] = useState(null);
  var [editAp, setEditAp] = useState(null);
  var [confirmDelS, setConfirmDelS] = useState(false);
  var [nR, setNR] = useState({ d:"", p:0 });
  var [nP, setNP] = useState({ tier:"", min:0, prize:"", icon:"trophy" });
  var [nS, setNS] = useState({ name:"", period:"", status:"upcoming" });
  var [nAp, setNAp] = useState({ a:0, sales:[], b:0 });

  var sn = props.seasons.find(function(s) { return s.id === sId; });
  var rules = sn ? sn.rules : [];
  var prizes = sn ? sn.prizes.slice().sort(function(a, b) { return b.min - a.min; }) : [];
  var tierC = { "Ouro":"#C9A96E", "Prata":"#A8B0B8", "Bronze":"#C4956A" };
  var podC = ["#C9A96E", "#A8B0B8", "#C4956A"];

  var ranking = useMemo(function() {
    return props.pts.filter(function(p) { return p.s === sId; }).map(function(ap) {
      var arch = props.archs.find(function(a) { return a.id === ap.a; });
      var points = calcPts(ap, rules);
      var tm = prizes.find(function(p) { return points >= p.min; });
      return { apIdx:props.pts.indexOf(ap), archId:ap.a, arch:arch, points:points, tier:tm ? tm.tier : "—", prize:tm ? tm.prize : "", salesCount:(ap.sales || []).length, totalVal:(ap.sales || []).reduce(function(s, v) { return s + v.v; }, 0), ap:ap };
    }).sort(function(a, b) { return b.points - a.points; });
  }, [props.pts, sId, rules, prizes, props.archs]);

  function openNewRule() { setEditR(null); setNR({ d:"", p:0 }); setShowR(true); }
  function openEditRule(r) { setEditR(r); setNR({ d:r.d, p:r.p }); setShowR(true); }
  function saveRule() {
    if (!nR.d.trim()) return;
    if (editR) {
      props.setSeasons(function(p) { return p.map(function(s) { return s.id === sId ? Object.assign({}, s, { rules:s.rules.map(function(x) { return x.id === editR.id ? Object.assign({}, x, nR) : x; }) }) : s; }); });
    } else {
      props.setSeasons(function(p) { return p.map(function(s) { return s.id === sId ? Object.assign({}, s, { rules:s.rules.concat([{ id:Date.now(), d:nR.d, p:nR.p }]) }) : s; }); });
    }
    setNR({ d:"", p:0 }); setShowR(false); setEditR(null);
  }
  function delRule(id) { props.setSeasons(function(p) { return p.map(function(s) { return s.id === sId ? Object.assign({}, s, { rules:s.rules.filter(function(x) { return x.id !== id; }) }) : s; }); }); setShowR(false); setEditR(null); }

  function openNewPrize() { setEditP(null); setNP({ tier:"", min:0, prize:"", icon:"trophy" }); setShowP(true); }
  function openEditPrize(pr) { setEditP(pr); setNP({ tier:pr.tier, min:pr.min, prize:pr.prize, icon:pr.icon || "trophy" }); setShowP(true); }
  function savePrize() {
    if (!nP.tier.trim()) return;
    if (editP) {
      props.setSeasons(function(p) { return p.map(function(s) { return s.id === sId ? Object.assign({}, s, { prizes:s.prizes.map(function(x) { return x.id === editP.id ? Object.assign({}, x, nP) : x; }) }) : s; }); });
    } else {
      props.setSeasons(function(p) { return p.map(function(s) { return s.id === sId ? Object.assign({}, s, { prizes:s.prizes.concat([{ id:Date.now(), tier:nP.tier, min:nP.min, prize:nP.prize, icon:nP.icon }]) }) : s; }); });
    }
    setNP({ tier:"", min:0, prize:"", icon:"trophy" }); setShowP(false); setEditP(null);
  }
  function delPrize(id) { props.setSeasons(function(prev) { return prev.map(function(s) { return s.id === sId ? Object.assign({}, s, { prizes:s.prizes.filter(function(x) { return x.id !== id; }) }) : s; }); }); setShowP(false); setEditP(null); }

  function openNewSeason() { setEditS(null); setNS({ name:"", period:"", status:"upcoming" }); setShowS(true); }
  function openEditSeason() { if (!sn) return; setEditS(sn); setNS({ name:sn.name, period:sn.period, status:sn.status }); setShowS(true); }
  function saveSeason() {
    if (!nS.name.trim()) return;
    if (editS) {
      props.setSeasons(function(p) { return p.map(function(s) { return s.id === editS.id ? Object.assign({}, s, nS) : s; }); });
    } else {
      var newId = Date.now();
      props.setSeasons(function(p) { return p.concat([{ id:newId, name:nS.name, period:nS.period, status:nS.status, rules:[], prizes:[] }]); });
      setSId(newId);
    }
    setNS({ name:"", period:"", status:"upcoming" }); setShowS(false); setEditS(null);
  }
  function delSeason() {
    if (!sn) return;
    var remaining = props.seasons.filter(function(s) { return s.id !== sn.id; });
    props.setSeasons(function() { return remaining; });
    props.setPts(function(p) { return p.filter(function(x) { return x.s !== sn.id; }); });
    if (remaining.length > 0) setSId(remaining[0].id);
    setConfirmDelS(false);
  }

  function openNewAp() { setEditAp(null); setNAp({ a:props.archs[0] ? props.archs[0].id : 0, sales:[], b:0 }); setShowAp(true); }
  function openEditAp(ap) { setEditAp(ap); setNAp({ a:ap.a, sales:ap.sales ? ap.sales.slice() : [], b:ap.b || 0 }); setShowAp(true); }
  function saveAp() {
    if (editAp) {
      props.setPts(function(p) { return p.map(function(x) { return x === editAp ? Object.assign({}, x, { a:nAp.a, sales:nAp.sales, b:nAp.b }) : x; }); });
    } else {
      props.setPts(function(p) { return p.concat([{ a:nAp.a, s:sId, sales:nAp.sales, b:nAp.b }]); });
    }
    setNAp({ a:0, sales:[], b:0 }); setShowAp(false); setEditAp(null);
  }
  function delAp() { if (!editAp) return; props.setPts(function(p) { return p.filter(function(x) { return x !== editAp; }); }); setShowAp(false); setEditAp(null); }
  function addSaleToAp() { setNAp(function(p) { return Object.assign({}, p, { sales:p.sales.concat([{ d:"Nova venda", v:0 }]) }); }); }
  function updSale(idx, key, val) { setNAp(function(p) { var ns = p.sales.slice(); ns[idx] = Object.assign({}, ns[idx]); ns[idx][key] = val; return Object.assign({}, p, { sales:ns }); }); }
  function rmSale(idx) { setNAp(function(p) { return Object.assign({}, p, { sales:p.sales.filter(function(_, i) { return i !== idx; }) }); }); }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Ic t="trophy" s={24} c={T.acc}/>
          <div>
            <h2 style={{ fontSize:24, fontWeight:300, color:T.tx, margin:0 }}>Specifiers</h2>
            <p style={{ fontSize:12, color:T.tx3 }}>Programa de premiação</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <select value={sId} onChange={function(e) { setSId(Number(e.target.value)); }} style={{ background:T.card, border:"1px solid " + T.brd, borderRadius:12, color:T.tx, padding:"8px 12px", fontSize:12, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
            {props.seasons.map(function(s) { return <option key={s.id} value={s.id}>{s.name}</option>; })}
          </select>
          {sn && <Btn variant="outline" sm icon="edit" onClick={openEditSeason}>Editar</Btn>}
          {sn && !confirmDelS && <Btn variant="danger" sm icon="trash" onClick={function() { setConfirmDelS(true); }}>Excluir</Btn>}
          {confirmDelS && <span style={{ display:"flex", gap:8 }}><Btn variant="danger" sm onClick={delSeason}>Confirmar</Btn><Btn variant="outline" sm onClick={function() { setConfirmDelS(false); }}>Cancelar</Btn></span>}
          <Btn variant="ghost" sm icon="plus" onClick={openNewSeason}>Season</Btn>
        </div>
      </div>

      {sn && <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}><Tag color={sn.status === "active" ? T.ok : T.inf}>{sn.status === "active" ? "Ativa" : sn.status === "upcoming" ? "Próxima" : "Encerrada"}</Tag><span style={{ fontSize:12, color:T.tx2 }}>{sn.period} · {ranking.length} participantes · {rules.length} critérios · {prizes.length} faixas</span></div>}

      <div style={{ display:"flex", border:"1px solid " + T.brd, borderRadius:12, overflow:"hidden", alignSelf:"flex-start", flexWrap:"wrap" }}>
        {[{ id:"ranking", l:"Ranking", ic:"trophy" }, { id:"rules", l:"Critérios", ic:"zap" }, { id:"prizes", l:"Premiações", ic:"gift" }].map(function(tb) {
          return <div key={tb.id} onClick={function() { setTab(tb.id); }} style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 18px", fontSize:12, fontWeight:600, cursor:"pointer", background:tab === tb.id ? T.accS : "transparent", color:tab === tb.id ? T.accT : T.tx2 }}><Ic t={tb.ic} s={14}/>{tb.l}</div>;
        })}
      </div>

      {tab === "ranking" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", justifyContent:"flex-end" }}><Btn sm icon="plus" onClick={openNewAp}>Adicionar Participante</Btn></div>
          {ranking.length >= 3 && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {ranking.slice(0, 3).map(function(r, i) {
                return (
                  <Glass key={r.archId} style={{ textAlign:"center", padding:24, border:"1px solid " + podC[i] }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
                    <Avatar initials={r.arch ? r.arch.av : "?"} size={52} bg={podC[i]}/>
                    <div style={{ fontSize:15, fontWeight:600, color:T.tx, marginTop:10 }}>{r.arch ? r.arch.name : "?"}</div>
                    <div style={{ fontSize:11, color:T.tx2, marginTop:2 }}>{r.arch ? r.arch.firm : ""}</div>
                    <div style={{ fontSize:32, fontWeight:200, color:podC[i], marginTop:12 }}>{r.points}</div>
                    <div style={{ fontSize:10, color:T.tx3, textTransform:"uppercase", letterSpacing:"0.08em" }}>pontos</div>
                    <div style={{ marginTop:8 }}><Tag color={podC[i]}>{r.tier}</Tag></div>
                    <div style={{ fontSize:11, color:T.tx2, marginTop:8 }}>{r.salesCount} vendas · {fk(r.totalVal)}</div>
                  </Glass>
                );
              })}
            </div>
          )}
          {ranking.map(function(r, i) {
            return (
              <Glass key={r.archId} style={{ padding:16, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:28, textAlign:"center", fontSize:15, fontWeight:700, color:i < 3 ? podC[i] : T.tx3 }}>#{i + 1}</div>
                <Avatar initials={r.arch ? r.arch.av : "?"} size={40} bg={tierC[r.tier]}/>
                <div style={{ flex:1, minWidth:120 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:T.tx }}>{r.arch ? r.arch.name : "?"}</div>
                  <div style={{ fontSize:12, color:T.tx2 }}>{r.arch ? r.arch.firm : ""} · {r.salesCount} vendas · {fk(r.totalVal)}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:22, fontWeight:200, color:T.acc }}>{r.points}</div>
                  <div style={{ fontSize:9, color:T.tx3 }}>pts</div>
                </div>
                <Tag color={tierC[r.tier]}>{r.tier}</Tag>
                <span onClick={function() { openEditAp(r.ap); }} style={{ cursor:"pointer", color:T.tx3, padding:4 }}><Ic t="edit" s={14}/></span>
              </Glass>
            );
          })}
          {ranking.length === 0 && <p style={{ fontSize:13, color:T.tx3, textAlign:"center", padding:24 }}>Nenhum participante. Clique em "Adicionar Participante".</p>}
        </div>
      )}

      {tab === "rules" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", justifyContent:"flex-end" }}><Btn sm icon="plus" onClick={openNewRule}>Critério</Btn></div>
          {rules.map(function(r) {
            return (
              <Glass key={r.id} style={{ padding:16, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:T.accS, display:"flex", alignItems:"center", justifyContent:"center" }}><Ic t="zap" s={20} c={T.acc}/></div>
                <div style={{ flex:1, fontSize:14, fontWeight:500, color:T.tx }}>{r.d}</div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:22, fontWeight:200, color:T.acc }}>+{r.p}</div><div style={{ fontSize:9, color:T.tx3 }}>pts</div></div>
                <span onClick={function() { openEditRule(r); }} style={{ cursor:"pointer", color:T.tx3, padding:4 }}><Ic t="edit" s={14}/></span>
                <span onClick={function() { delRule(r.id); }} style={{ cursor:"pointer", color:T.err, padding:4 }}><Ic t="trash" s={14}/></span>
              </Glass>
            );
          })}
          {rules.length === 0 && <p style={{ fontSize:13, color:T.tx3, textAlign:"center", padding:24 }}>Nenhum critério</p>}
        </div>
      )}

      {tab === "prizes" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", justifyContent:"flex-end" }}><Btn sm icon="plus" onClick={openNewPrize}>Premiação</Btn></div>
          {prizes.map(function(p) {
            var qualified = ranking.filter(function(r) { return r.tier === p.tier; }).length;
            return (
              <Glass key={p.id} style={{ padding:18, display:"flex", alignItems:"center", gap:16, borderLeft:"4px solid " + (tierC[p.tier] || T.acc) }}>
                <div style={{ width:48, height:48, borderRadius:14, background:tierC[p.tier] || T.accS, display:"flex", alignItems:"center", justifyContent:"center" }}><Ic t={p.icon || "trophy"} s={22} c="#fff"/></div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:16, fontWeight:600, color:T.tx }}>{p.tier}</span><Tag>A partir de {p.min} pts</Tag></div>
                  <div style={{ fontSize:13, color:T.tx2, marginTop:4 }}>{p.prize}</div>
                  <div style={{ fontSize:11, color:T.tx3, marginTop:6 }}>{qualified} qualificado(s)</div>
                </div>
                <span onClick={function() { openEditPrize(p); }} style={{ cursor:"pointer", color:T.tx3, padding:4 }}><Ic t="edit" s={14}/></span>
                <span onClick={function() { delPrize(p.id); }} style={{ cursor:"pointer", color:T.err, padding:4 }}><Ic t="trash" s={14}/></span>
              </Glass>
            );
          })}
          {prizes.length === 0 && <p style={{ fontSize:13, color:T.tx3, textAlign:"center", padding:24 }}>Nenhuma premiação</p>}
        </div>
      )}

      <Modal show={showR} onClose={function() { setShowR(false); setEditR(null); }} title={(editR ? "Editar" : "Novo") + " Critério"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="Descrição" value={nR.d} onChange={function(v) { setNR(function(p) { return Object.assign({}, p, { d:v }); }); }}/>
          <Input label="Pontos" type="number" value={nR.p} onChange={function(v) { setNR(function(p) { return Object.assign({}, p, { p:parseInt(v) || 0 }); }); }}/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            {editR && <Btn variant="danger" sm icon="trash" onClick={function() { delRule(editR.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowR(false); setEditR(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={saveRule}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <Modal show={showP} onClose={function() { setShowP(false); setEditP(null); }} title={(editP ? "Editar" : "Nova") + " Premiação"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="Faixa (Ouro, Prata...)" value={nP.tier} onChange={function(v) { setNP(function(p) { return Object.assign({}, p, { tier:v }); }); }}/>
          <Input label="Pontuação mínima" type="number" value={nP.min} onChange={function(v) { setNP(function(p) { return Object.assign({}, p, { min:parseInt(v) || 0 }); }); }}/>
          <Input label="Prêmio" value={nP.prize} onChange={function(v) { setNP(function(p) { return Object.assign({}, p, { prize:v }); }); }}/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            {editP && <Btn variant="danger" sm icon="trash" onClick={function() { delPrize(editP.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowP(false); setEditP(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={savePrize}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <Modal show={showS} onClose={function() { setShowS(false); setEditS(null); }} title={(editS ? "Editar" : "Nova") + " Season"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="Nome" value={nS.name} onChange={function(v) { setNS(function(p) { return Object.assign({}, p, { name:v }); }); }} placeholder="Season 3 · 2027.1"/>
          <Input label="Período" value={nS.period} onChange={function(v) { setNS(function(p) { return Object.assign({}, p, { period:v }); }); }} placeholder="Jan–Jun 2027"/>
          <Select label="Status" value={nS.status} onChange={function(v) { setNS(function(p) { return Object.assign({}, p, { status:v }); }); }} options={[{v:"upcoming",l:"Próxima"},{v:"active",l:"Ativa"},{v:"closed",l:"Encerrada"}]}/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            <Btn variant="outline" sm onClick={function() { setShowS(false); setEditS(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={saveSeason}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <Modal show={showAp} onClose={function() { setShowAp(false); setEditAp(null); }} title={(editAp ? "Editar" : "Adicionar") + " Participante"}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Select label="Arquiteto" value={nAp.a} onChange={function(v) { setNAp(function(p) { return Object.assign({}, p, { a:parseInt(v) }); }); }} options={props.archs.map(function(a) { return { v:a.id, l:a.name + " · " + a.firm }; })}/>
          <Input label="Bônus manual (pts)" type="number" value={nAp.b} onChange={function(v) { setNAp(function(p) { return Object.assign({}, p, { b:parseInt(v) || 0 }); }); }}/>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <label style={{ fontSize:11, fontWeight:700, color:T.tx2, textTransform:"uppercase", letterSpacing:"0.06em" }}>Vendas Registradas</label>
              <Btn variant="ghost" sm icon="plus" onClick={addSaleToAp}>Venda</Btn>
            </div>
            {nAp.sales.length === 0 && <p style={{ fontSize:12, color:T.tx3, textAlign:"center", padding:12 }}>Nenhuma venda registrada</p>}
            {nAp.sales.map(function(sale, idx) {
              return (
                <div key={idx} style={{ display:"flex", gap:8, marginBottom:8 }}>
                  <input value={sale.d} onChange={function(e) { updSale(idx, "d", e.target.value); }} placeholder="Descrição" style={{ flex:1, background:T.inp, border:"1px solid " + T.brd, borderRadius:10, color:T.tx, padding:"10px 12px", fontSize:12, fontFamily:"inherit", outline:"none" }}/>
                  <input type="number" value={sale.v} onChange={function(e) { updSale(idx, "v", parseFloat(e.target.value) || 0); }} placeholder="Valor" style={{ width:110, background:T.inp, border:"1px solid " + T.brd, borderRadius:10, color:T.tx, padding:"10px 12px", fontSize:12, fontFamily:"inherit", outline:"none" }}/>
                  <span onClick={function() { rmSale(idx); }} style={{ cursor:"pointer", color:T.err, padding:8 }}><Ic t="trash" s={14}/></span>
                </div>
              );
            })}
            <p style={{ fontSize:10, color:T.tx3, marginTop:6 }}>Dica: use valor 0 para indicações sem venda associada.</p>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:6 }}>
            {editAp && <Btn variant="danger" sm icon="trash" onClick={delAp}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowAp(false); setEditAp(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={saveAp}>Salvar</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ═══ TASKS ═══ */
function TasksPage(props) {
  var T = useT();
  var [filter, setFilter] = useState("pending");
  var [showM, setShowM] = useState(false);
  var [editT, setEditT] = useState(null);
  var empty = { title:"", archId:null, assignee:props.user.id, due:TD, priority:"medium", status:"pending", desc:"" };
  var [form, setForm] = useState(Object.assign({}, empty));
  var team = props.team || [];
  var archs = props.archs || [];

  var filtered = props.tasks.slice().filter(function(t) {
    if (filter === "pending") return t.status === "pending";
    if (filter === "done") return t.status === "done";
    if (filter === "mine") return t.assignee === props.user.id && t.status === "pending";
    if (filter === "overdue") return t.status === "pending" && t.due < TD;
    return true;
  }).sort(function(a, b) { return (a.due + (a.priority === "high" ? "0" : "1")).localeCompare(b.due + (b.priority === "high" ? "0" : "1")); });

  function openNew() { setEditT(null); setForm(Object.assign({}, empty)); setShowM(true); }
  function openEdit(t) { setEditT(t); setForm({ title:t.title, archId:t.archId, assignee:t.assignee, due:t.due, priority:t.priority, status:t.status, desc:t.desc || "" }); setShowM(true); }
  function save() {
    if (!form.title.trim()) return;
    if (editT) props.setTasks(function(p) { return p.map(function(x) { return x.id === editT.id ? Object.assign({}, x, form) : x; }); });
    else props.setTasks(function(p) { return p.concat([Object.assign({}, form, { id:Date.now() })]); });
    setShowM(false); setEditT(null);
  }
  function toggleStatus(id) { props.setTasks(function(p) { return p.map(function(t) { return t.id === id ? Object.assign({}, t, { status:t.status === "done" ? "pending" : "done" }) : t; }); }); }
  function del(id) { props.setTasks(function(p) { return p.filter(function(t) { return t.id !== id; }); }); setShowM(false); setEditT(null); }
  function upd(k, v) { setForm(function(p) { var n = Object.assign({}, p); n[k] = v; return n; }); }

  function archName(id) { var a = archs.find(function(x) { return x.id === id; }); return a ? a.name : null; }
  function userName(id) { var u = team.find(function(x) { return x.id === id; }); return u ? u.name.split(" ")[0] : (id === 0 ? "Admin" : "?"); }

  var pC = { high:T.err, medium:T.wrn, low:T.tx3 };
  var pL = { high:"Alta", medium:"Média", low:"Baixa" };
  var overdueC = props.tasks.filter(function(t) { return t.status === "pending" && t.due < TD; }).length;
  var pendingC = props.tasks.filter(function(t) { return t.status === "pending"; }).length;
  var mineC = props.tasks.filter(function(t) { return t.assignee === props.user.id && t.status === "pending"; }).length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      <Modal show={showM} onClose={function() { setShowM(false); setEditT(null); }} title={(editT ? "Editar" : "Nova") + " Tarefa"}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Input label="Título" value={form.title} onChange={function(v) { upd("title", v); }} placeholder="O que precisa ser feito"/>
          <Input label="Descrição" value={form.desc} onChange={function(v) { upd("desc", v); }} textarea/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Input label="Prazo" type="date" value={form.due} onChange={function(v) { upd("due", v); }}/>
            <Select label="Prioridade" value={form.priority} onChange={function(v) { upd("priority", v); }} options={[{v:"low",l:"Baixa"},{v:"medium",l:"Média"},{v:"high",l:"Alta"}]}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Select label="Arquiteto" value={form.archId || ""} onChange={function(v) { upd("archId", v ? parseInt(v) : null); }} options={[{v:"",l:"Nenhum"}].concat(archs.map(function(a) { return { v:a.id, l:a.name }; }))}/>
            <Select label="Responsável" value={form.assignee} onChange={function(v) { upd("assignee", parseInt(v)); }} options={[{v:0,l:"Admin"}].concat(team.map(function(t) { return { v:t.id, l:t.name.split(" ")[0] }; }))}/>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:6 }}>
            {editT && <Btn variant="danger" sm icon="trash" onClick={function() { del(editT.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowM(false); setEditT(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={save}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:24, fontWeight:600, color:T.tx, margin:0, letterSpacing:"-0.02em" }}>Tarefas</h2>
          <p style={{ fontSize:13, color:T.tx3, margin:"4px 0 0" }}>{pendingC} pendentes{overdueC > 0 ? " · " + overdueC + " atrasadas" : ""}</p>
        </div>
        <Btn sm icon="plus" onClick={openNew}>Nova Tarefa</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:12 }}>
        <Metric label="Minhas" value={mineC} icon="check" color={T.acc}/>
        <Metric label="Pendentes" value={pendingC} icon="clock" color={T.inf}/>
        <Metric label="Atrasadas" value={overdueC} icon="bell" color={T.err}/>
        <Metric label="Concluídas" value={props.tasks.filter(function(t) { return t.status === "done"; }).length} icon="check" color={T.ok}/>
      </div>

      <div style={{ display:"flex", gap:4, background:T.srf2, padding:4, borderRadius:12, alignSelf:"flex-start", flexWrap:"wrap" }}>
        {[{id:"pending",l:"Pendentes"},{id:"mine",l:"Minhas"},{id:"overdue",l:"Atrasadas"},{id:"done",l:"Concluídas"},{id:"all",l:"Todas"}].map(function(tb) {
          var act = filter === tb.id;
          return <div key={tb.id} onClick={function() { setFilter(tb.id); }} style={{ padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", borderRadius:9, background:act ? T.card : "transparent", color:act ? T.accT : T.tx2 }}>{tb.l}</div>;
        })}
      </div>

      {filtered.length === 0 ? (
        <Glass style={{ textAlign:"center", padding:"40px 20px" }}>
          <Ic t="check" s={32} c={T.tx4}/>
          <p style={{ fontSize:13, color:T.tx3, marginTop:12 }}>Nenhuma tarefa nessa categoria</p>
        </Glass>
      ) : filtered.map(function(t) {
        var overdue = t.status === "pending" && t.due < TD;
        return (
          <Glass key={t.id} style={{ padding:16, display:"flex", alignItems:"center", gap:14, borderLeft:"3px solid " + (t.status === "done" ? T.ok : pC[t.priority]) }}>
            <div onClick={function() { toggleStatus(t.id); }} style={{ width:22, height:22, borderRadius:7, border:"2px solid " + (t.status === "done" ? T.ok : T.brdS), background:t.status === "done" ? T.ok : "transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
              {t.status === "done" && <Ic t="check" s={12} c="#fff"/>}
            </div>
            <div style={{ flex:1, minWidth:0, cursor:"pointer" }} onClick={function() { openEdit(t); }}>
              <div style={{ fontSize:14, fontWeight:600, color:t.status === "done" ? T.tx3 : T.tx, textDecoration:t.status === "done" ? "line-through" : "none" }}>{t.title}</div>
              <div style={{ fontSize:11, color:T.tx3, marginTop:3, display:"flex", gap:10, flexWrap:"wrap" }}>
                <span style={{ color:overdue ? T.err : T.tx3, fontWeight:overdue ? 600 : 500 }}>{fdf(t.due)}{overdue ? " · Atrasada" : ""}</span>
                <span>· {userName(t.assignee)}</span>
                {t.archId && archName(t.archId) && <span>· {archName(t.archId)}</span>}
              </div>
            </div>
            <Tag color={pC[t.priority]}>{pL[t.priority]}</Tag>
          </Glass>
        );
      })}
    </div>
  );
}

/* ═══ DEALS ═══ */
function DealsPage(props) {
  var T = useT();
  var [showM, setShowM] = useState(false);
  var [editD, setEditD] = useState(null);
  var [view, setView] = useState("kanban");
  var [dragId, setDragId] = useState(null);
  var [dragOver, setDragOver] = useState(null);
  var empty = { title:"", archId:null, assignee:props.user.id, value:0, stage:"prospeccao", prob:20, expected:TD, notes:"" };
  var [form, setForm] = useState(Object.assign({}, empty));
  var team = props.team || [];
  var archs = props.archs || [];

  var stages = [
    { id:"prospeccao", l:"Prospecção", c:T.tx3 },
    { id:"qualificacao", l:"Qualificação", c:T.inf },
    { id:"proposta", l:"Proposta", c:T.wrn },
    { id:"negociacao", l:"Negociação", c:T.acc },
    { id:"fechamento", l:"Fechamento", c:T.ok }
  ];

  function openNew() { setEditD(null); setForm(Object.assign({}, empty)); setShowM(true); }
  function openEdit(d) { setEditD(d); setForm({ title:d.title, archId:d.archId, assignee:d.assignee, value:d.value, stage:d.stage, prob:d.prob, expected:d.expected, notes:d.notes || "" }); setShowM(true); }
  function save() {
    if (!form.title.trim()) return;
    if (editD) props.setDeals(function(p) { return p.map(function(x) { return x.id === editD.id ? Object.assign({}, x, form) : x; }); });
    else props.setDeals(function(p) { return p.concat([Object.assign({}, form, { id:Date.now(), created:TD })]); });
    setShowM(false); setEditD(null);
  }
  function del(id) { props.setDeals(function(p) { return p.filter(function(d) { return d.id !== id; }); }); setShowM(false); setEditD(null); }
  function moveStage(id, stage) { props.setDeals(function(p) { return p.map(function(d) { return d.id === id ? Object.assign({}, d, { stage:stage }) : d; }); }); }
  function upd(k, v) { setForm(function(p) { var n = Object.assign({}, p); n[k] = v; return n; }); }
  function archName(id) { var a = archs.find(function(x) { return x.id === id; }); return a ? a.name : "—"; }
  function userName(id) { var u = team.find(function(x) { return x.id === id; }); return u ? u.name.split(" ")[0] : "?"; }

  var totalValue = props.deals.reduce(function(s, d) { return s + d.value; }, 0);
  var weightedValue = props.deals.reduce(function(s, d) { return s + (d.value * d.prob / 100); }, 0);
  var wonValue = props.deals.filter(function(d) { return d.stage === "fechamento"; }).reduce(function(s, d) { return s + d.value; }, 0);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      <Modal show={showM} onClose={function() { setShowM(false); setEditD(null); }} title={(editD ? "Editar" : "Nova") + " Oportunidade"}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Input label="Título" value={form.title} onChange={function(v) { upd("title", v); }} placeholder="Ex: Residencial Alphaville Fase 2"/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Select label="Arquiteto" value={form.archId || ""} onChange={function(v) { upd("archId", v ? parseInt(v) : null); }} options={[{v:"",l:"Nenhum"}].concat(archs.map(function(a) { return { v:a.id, l:a.name }; }))}/>
            <Select label="Responsável" value={form.assignee} onChange={function(v) { upd("assignee", parseInt(v)); }} options={[{v:0,l:"Admin"}].concat(team.map(function(t) { return { v:t.id, l:t.name.split(" ")[0] }; }))}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <Input label="Valor (R$)" type="number" value={form.value} onChange={function(v) { upd("value", parseFloat(v) || 0); }}/>
            <Input label="Probabilidade (%)" type="number" value={form.prob} onChange={function(v) { upd("prob", parseInt(v) || 0); }}/>
            <Input label="Fechamento" type="date" value={form.expected} onChange={function(v) { upd("expected", v); }}/>
          </div>
          <Select label="Etapa" value={form.stage} onChange={function(v) { upd("stage", v); }} options={stages.map(function(s) { return { v:s.id, l:s.l }; })}/>
          <Input label="Observações" value={form.notes} onChange={function(v) { upd("notes", v); }} textarea/>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:6 }}>
            {editD && <Btn variant="danger" sm icon="trash" onClick={function() { del(editD.id); }}>Remover</Btn>}
            <Btn variant="outline" sm onClick={function() { setShowM(false); setEditD(null); }}>Cancelar</Btn>
            <Btn sm icon="check" onClick={save}>Salvar</Btn>
          </div>
        </div>
      </Modal>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:24, fontWeight:600, color:T.tx, margin:0, letterSpacing:"-0.02em" }}>Oportunidades</h2>
          <p style={{ fontSize:13, color:T.tx3, margin:"4px 0 0" }}>{props.deals.length} oportunidades · {fk(totalValue)} em pipeline</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ display:"flex", gap:4, background:T.srf2, padding:4, borderRadius:10 }}>
            <div onClick={function() { setView("kanban"); }} style={{ padding:"6px 12px", fontSize:11, fontWeight:700, cursor:"pointer", borderRadius:7, background:view === "kanban" ? T.card : "transparent", color:view === "kanban" ? T.accT : T.tx2 }}>Kanban</div>
            <div onClick={function() { setView("list"); }} style={{ padding:"6px 12px", fontSize:11, fontWeight:700, cursor:"pointer", borderRadius:7, background:view === "list" ? T.card : "transparent", color:view === "list" ? T.accT : T.tx2 }}>Lista</div>
          </div>
          <Btn sm icon="plus" onClick={openNew}>Nova</Btn>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:12 }}>
        <Metric label="Pipeline Total" value={fk(totalValue)} icon="chart" color={T.acc}/>
        <Metric label="Valor Ponderado" value={fk(weightedValue)} icon="zap" color={T.inf}/>
        <Metric label="Em Fechamento" value={fk(wonValue)} icon="check" color={T.ok}/>
        <Metric label="Ticket Médio" value={props.deals.length > 0 ? fk(Math.round(totalValue / props.deals.length)) : "—"} icon="layers"/>
      </div>

      {view === "kanban" ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:10, overflowX:"auto" }}>
          {stages.map(function(s) {
            var sDeals = props.deals.filter(function(d) { return d.stage === s.id; });
            var sTotal = sDeals.reduce(function(sum, d) { return sum + d.value; }, 0);
            var isOver = dragOver === s.id;
            return (
              <div key={s.id}
                onDragOver={function(e) { e.preventDefault(); setDragOver(s.id); }}
                onDragLeave={function() { setDragOver(null); }}
                onDrop={function(e) { e.preventDefault(); if (dragId !== null) { moveStage(dragId, s.id); } setDragId(null); setDragOver(null); }}
                style={{ background:isOver ? s.c + "15" : T.srf2, borderRadius:14, padding:12, minWidth:200, border:"2px dashed " + (isOver ? s.c : "transparent"), transition:"all 0.2s" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, paddingBottom:10, borderBottom:"2px solid " + s.c }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:8, height:8, borderRadius:100, background:s.c }}/>
                    <span style={{ fontSize:11, fontWeight:700, color:T.tx, textTransform:"uppercase", letterSpacing:"0.04em" }}>{s.l}</span>
                  </div>
                  <span style={{ fontSize:10, color:T.tx3, fontWeight:700 }}>{sDeals.length}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:s.c, marginBottom:10 }}>{fk(sTotal)}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, minHeight:50 }}>
                  {sDeals.map(function(d) {
                    var dragging = dragId === d.id;
                    return (
                      <div key={d.id}
                        draggable="true"
                        onDragStart={function(e) { setDragId(d.id); e.dataTransfer.effectAllowed = "move"; }}
                        onDragEnd={function() { setDragId(null); setDragOver(null); }}
                        onClick={function() { if (!dragging) openEdit(d); }}
                        style={{ background:T.card, borderRadius:10, padding:12, cursor:"grab", border:"1px solid " + T.brd, opacity:dragging ? 0.4 : 1, transition:"opacity 0.2s, transform 0.2s", transform:dragging ? "scale(0.95)" : "scale(1)", userSelect:"none" }}>
                        <div style={{ fontSize:12, fontWeight:600, color:T.tx, marginBottom:4 }}>{d.title}</div>
                        <div style={{ fontSize:10, color:T.tx3 }}>{archName(d.archId)}</div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
                          <span style={{ fontSize:13, fontWeight:700, color:T.acc }}>{fk(d.value)}</span>
                          <span style={{ fontSize:10, color:T.tx3 }}>{d.prob}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Glass>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr>{["Oportunidade","Arquiteto","Resp.","Etapa","Valor","Prob.","Fechamento",""].map(function(h) {
                  return <th key={h} style={{ textAlign:"left", padding:"12px 10px", color:T.tx3, fontWeight:700, borderBottom:"1px solid " + T.brd, fontSize:10, textTransform:"uppercase", letterSpacing:"0.04em" }}>{h}</th>;
                })}</tr>
              </thead>
              <tbody>
                {props.deals.map(function(d) {
                  var s = stages.find(function(x) { return x.id === d.stage; });
                  return (
                    <tr key={d.id} onClick={function() { openEdit(d); }} style={{ borderBottom:"1px solid " + T.brd, cursor:"pointer" }}>
                      <td style={{ padding:12, color:T.tx, fontWeight:600 }}>{d.title}</td>
                      <td style={{ padding:12, color:T.tx2 }}>{archName(d.archId)}</td>
                      <td style={{ padding:12, color:T.tx2 }}>{userName(d.assignee)}</td>
                      <td style={{ padding:12 }}><Tag color={s ? s.c : T.tx3}>{s ? s.l : d.stage}</Tag></td>
                      <td style={{ padding:12, color:T.acc, fontWeight:700 }}>{fk(d.value)}</td>
                      <td style={{ padding:12, color:T.tx2 }}>{d.prob}%</td>
                      <td style={{ padding:12, color:T.tx2 }}>{fd(d.expected)}</td>
                      <td style={{ padding:12 }}><Ic t="chev" s={14} c={T.tx3}/></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Glass>
      )}
    </div>
  );
}

/* ═══ NOTIFICATIONS ═══ */
function NotificationBell(props) {
  var T = useT();
  var [open, setOpen] = useState(false);
  var user = props.user;

  var notifs = useMemo(function() {
    var list = [];
    (props.archs || []).forEach(function(a) {
      if (a.nextF && a.nextF < TD && a.status !== "inativo") {
        var days = Math.floor((new Date(TD + "T12:00:00") - new Date(a.nextF + "T12:00:00")) / (1000 * 60 * 60 * 24));
        list.push({ type:"followup", severity:"err", icon:"bell", title:"Follow-up vencido", desc:a.name + " · " + days + "d atrasado", action:function() { props.setSelA(a); props.setPage("archDetail"); setOpen(false); } });
      }
    });
    (props.tasks || []).forEach(function(t) {
      if (t.status === "pending" && t.due < TD && t.assignee === user.id) {
        list.push({ type:"task", severity:"err", icon:"check", title:"Tarefa atrasada", desc:t.title, action:function() { props.setPage("tasks"); setOpen(false); } });
      }
    });
    (props.tasks || []).forEach(function(t) {
      if (t.status === "pending" && t.due === TD && t.assignee === user.id) {
        list.push({ type:"task-today", severity:"wrn", icon:"clock", title:"Tarefa para hoje", desc:t.title, action:function() { props.setPage("tasks"); setOpen(false); } });
      }
    });
    (props.deals || []).forEach(function(d) {
      if (d.assignee === user.id && d.expected < TD && d.stage !== "fechamento") {
        list.push({ type:"deal", severity:"wrn", icon:"zap", title:"Oportunidade em risco", desc:d.title + " · fechamento atrasado", action:function() { props.setPage("deals"); setOpen(false); } });
      }
    });
    return list;
  }, [props.archs, props.tasks, props.deals, user.id]);

  var sevC = { err:T.err, wrn:T.wrn, ok:T.ok, inf:T.inf };

  return (
    <div style={{ position:"relative" }}>
      <button onClick={function() { setOpen(!open); }} style={{ position:"relative", background:T.srf2, border:"1px solid " + T.brd, borderRadius:12, width:42, height:42, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.tx2, fontFamily:"inherit" }}>
        <Ic t="bell" s={17}/>
        {notifs.length > 0 && (
          <span style={{ position:"absolute", top:-4, right:-4, minWidth:18, height:18, borderRadius:100, background:T.err, color:"#fff", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 5px", border:"2px solid " + T.srf }}>{notifs.length}</span>
        )}
      </button>
      {open && (
        <div>
          <div onClick={function() { setOpen(false); }} style={{ position:"fixed", inset:0, zIndex:150 }}/>
          <div style={{ position:"absolute", top:50, right:0, width:340, maxWidth:"calc(100vw - 32px)", background:T.srf, border:"1px solid " + T.brd, borderRadius:16, boxShadow:T.shL, zIndex:151, maxHeight:480, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"16px 18px", borderBottom:"1px solid " + T.brd, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontSize:14, fontWeight:700, color:T.tx }}>Notificações</div>
              <span style={{ fontSize:11, color:T.tx3 }}>{notifs.length} ativas</span>
            </div>
            <div style={{ overflowY:"auto", flex:1 }}>
              {notifs.length === 0 ? (
                <div style={{ textAlign:"center", padding:"40px 20px", color:T.tx3 }}>
                  <Ic t="check" s={28} c={T.ok}/>
                  <p style={{ fontSize:12, marginTop:10 }}>Tudo em dia 🎉</p>
                </div>
              ) : notifs.map(function(n, i) {
                return (
                  <div key={i} onClick={n.action} style={{ padding:"12px 18px", borderBottom:"1px solid " + T.brd, cursor:"pointer", display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:32, height:32, borderRadius:10, background:sevC[n.severity] + "18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ic t={n.icon} s={14} c={sevC[n.severity]}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:T.tx }}>{n.title}</div>
                      <div style={{ fontSize:11, color:T.tx2, marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{n.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  var [theme, setTheme] = useState("dark");
  var [user, setUser] = useState(null);
  var [page, setPage] = useState("dash");
  var [selA, setSelA] = useState(null);
  var [sb, setSb] = useState(false);
  var [events, setEvents] = useState(INIT_EV);
  var [archs, setArchs] = useState(INIT_ARCH);
  var [teamMembers, setTeamMembers] = useState(TEAM);
  var [seasons, setSeasons] = useState(INIT_SEASONS);
  var [pts, setPts] = useState(INIT_PTS);
  var [salesData, setSalesData] = useState(SALES_DATA);
  var [pipeData, setPipeData] = useState(PIPE_DATA);
  var [interactions, setInteractions] = useState(INIT_INTER);
  var [tasks, setTasks] = useState(INIT_TASKS);
  var [deals, setDeals] = useState(INIT_DEALS);
  var [goals, setGoals] = useState(INIT_GOALS);
  var [comments, setComments] = useState(INIT_COMMENTS);
  var toggle = function() { setTheme(function(p) { return p === "dark" ? "light" : "dark"; }); };
  var T = TK[theme];

  if (!user) return <LoginPage onLogin={setUser} theme={theme} toggle={toggle}/>;

  var nav = [
    { id:"dash", l:"Painel", ic:"home" },
    { id:"archs", l:"Arquitetos", ic:"layers" },
    { id:"deals", l:"Oportunidades", ic:"zap" },
    { id:"tasks", l:"Tarefas", ic:"check" },
    { id:"spec", l:"Specifiers", ic:"trophy" },
    { id:"agenda", l:"Agenda", ic:"cal" },
    { id:"sales", l:"Vendas", ic:"chart" },
    { id:"team", l:"Equipe", ic:"users" }
  ];
  var activePage = page === "archDetail" ? "archs" : page;

  function renderPage() {
    if (page === "dash") return <DashPage setPage={setPage} events={events} user={user} archs={archs} salesData={salesData} tasks={tasks} deals={deals} team={teamMembers} setSelA={setSelA}/>;
    if (page === "archs") return <ArchPage setPage={setPage} setSelA={setSelA} archs={archs} setArchs={setArchs}/>;
    if (page === "archDetail") return <ArchDetailPage arch={selA} setPage={setPage} setArchs={setArchs} interactions={interactions} setInteractions={setInteractions} tasks={tasks} setTasks={setTasks} deals={deals} team={teamMembers} user={user} comments={comments} setComments={setComments}/>;
    if (page === "deals") return <DealsPage deals={deals} setDeals={setDeals} archs={archs} team={teamMembers} user={user}/>;
    if (page === "tasks") return <TasksPage tasks={tasks} setTasks={setTasks} archs={archs} team={teamMembers} user={user}/>;
    if (page === "spec") return <SpecPage archs={archs} seasons={seasons} setSeasons={setSeasons} pts={pts} setPts={setPts}/>;
    if (page === "agenda") return <AgendaPage events={events} setEvents={setEvents} user={user}/>;
    if (page === "sales") return <SalesPage archs={archs} salesData={salesData} setSalesData={setSalesData} pipeData={pipeData} setPipeData={setPipeData}/>;
    if (page === "team") return <TeamPage team={teamMembers} setTeam={setTeamMembers} goals={goals} setGoals={setGoals}/>;
    return null;
  }

  return (
    <Ctx.Provider value={T}>
      <div style={{ fontFamily:"'Inter','DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", background:T.bg, color:T.tx, minHeight:"100vh", display:"flex", WebkitFontSmoothing:"antialiased" }}>
        <style>{
          "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:wght@200;300;400;500;600;700;800&display=swap');" +
          "*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}" +
          "html,body{overflow-x:hidden;max-width:100vw}" +
          "input,select,textarea,button{font-family:inherit;font-size:16px}" +
          "::-webkit-scrollbar{width:4px;height:4px}" +
          "::-webkit-scrollbar-thumb{background:" + T.brd + ";border-radius:100px}" +
          "::selection{background:" + T.accS + ";color:" + T.accT + "}" +
          "select option{background:" + T.card + ";color:" + T.tx + "}" +
          "table{min-width:100%}" +
          /* Tablet & Desktop default - sidebar visible, header hidden */
          ".mp-hover:hover{transform:translateY(-2px);box-shadow:" + T.shL + ";border-color:" + T.brdS + "}" +
          "@media(min-width:769px){.mp-mh{display:none!important}}" +
          "@media(max-width:768px){.mp-tb{display:none!important}}" +
          /* Mobile - sidebar hidden by default, header visible */
          "@media(max-width:768px){" +
            ".mp-sb{display:none!important}" +
            ".mp-sb.open{display:flex!important;position:fixed!important;top:0!important;left:0!important;bottom:0!important;width:82vw!important;max-width:300px!important;z-index:100!important;height:100vh!important;box-shadow:0 0 40px rgba(0,0,0,0.5)}" +
            ".mp-mh{display:flex!important}" +
            ".mp-content{padding:14px!important}" +
            "h2{font-size:20px!important}" +
            /* Force single column for 2-column grids */
            ".mp-g2,.mp-g3{grid-template-columns:1fr!important}" +
            /* Week calendar - scrollable horizontally */
            ".mp-wk{overflow-x:auto!important;scroll-snap-type:x mandatory!important;-webkit-overflow-scrolling:touch}" +
            ".mp-wk>div{min-width:80px!important;scroll-snap-align:start}" +
            /* Tables - smaller padding, smaller font */
            ".mp-tbl{font-size:11px!important}" +
            ".mp-tbl th,.mp-tbl td{padding:8px 6px!important}" +
            /* Inputs bigger tap targets */
            "input,select,textarea{padding:13px 14px!important}" +
            /* Buttons bigger on mobile */
            "button{min-height:40px}" +
            /* Modal full width with less padding */
            ".mp-modal{padding:20px!important;width:calc(100vw - 24px)!important;max-height:92vh!important}" +
            /* Filter bars wrap nicely */
            ".mp-filters{flex-direction:column!important}" +
            ".mp-filters>*{width:100%!important}" +
            /* Cards with less padding */
            ".mp-card{padding:14px!important}" +
            /* Hide some stats on mobile to save space */
            ".mp-hide-mob{display:none!important}" +
            /* Action icons area - wrap below on mobile */
            ".mp-actions{flex-wrap:wrap!important;justify-content:flex-end!important;width:100%!important;padding-top:8px!important;border-top:1px solid " + T.brd + "!important;margin-top:8px!important}" +
          "}"
        }</style>

        {sb && <div onClick={function() { setSb(false); }} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(8px)", zIndex:90 }}/>}

        <aside className={"mp-sb" + (sb ? " open" : "")} style={{ width:220, background:T.srf, borderRight:"1px solid " + T.brd, display:"flex", flexDirection:"column", padding:"20px 12px", position:"sticky", top:0, height:"100vh", overflowY:"auto", flexShrink:0, zIndex:100 }}>
          <div style={{ padding:"0 8px", marginBottom:32 }}>
            <img src={T.logo} alt="Mula Preta" style={{ height:35, objectFit:"contain", display:"block" }} onError={function(e) { e.target.outerHTML = "<span style='font-size:16px;font-weight:700;letter-spacing:0.1em;color:" + T.tx + "'>MULA PRETA</span>"; }}/>
          </div>
          <nav style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }}>
            {nav.map(function(n) {
              var active = activePage === n.id;
              return (
                <div key={n.id} onClick={function() { setPage(n.id); setSb(false); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", background:active ? T.accS : "transparent", color:active ? T.accT : T.tx2, fontWeight:active ? 600 : 500, fontSize:13, transition:"all 0.15s" }}>
                  <Ic t={n.ic} s={18}/>{n.l}
                </div>
              );
            })}
          </nav>
          <div style={{ borderTop:"1px solid " + T.brd, paddingTop:12, display:"flex", flexDirection:"column", gap:4 }}>
            <div onClick={toggle} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:12, cursor:"pointer", color:T.tx2, fontSize:12, fontWeight:500 }}>
              <Ic t={theme === "dark" ? "sun" : "moon"} s={16}/>{theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            </div>
            <div onClick={function() { setUser(null); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:12, cursor:"pointer", color:T.err, fontSize:12, fontWeight:500 }}>
              <Ic t="out" s={16} c={T.err}/>Sair
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", marginTop:4 }}>
              <Avatar initials={user.av} size={30} online={true}/>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:T.tx }}>{user.name.split(" ").slice(0, 2).join(" ")}</div>
                <div style={{ fontSize:10, color:T.tx3 }}>{user.role}</div>
              </div>
            </div>
          </div>
        </aside>

        <main style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          <div className="mp-mh" style={{ display:"none", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid " + T.brd, background:T.srf }}>
            <span onClick={function() { setSb(true); }} style={{ cursor:"pointer" }}><Ic t="menu" s={20}/></span>
            <img src={T.logo} alt="MP" style={{ height:22, objectFit:"contain" }} onError={function(e) { e.target.outerHTML = "<span style='font-size:14px;font-weight:700;letter-spacing:0.1em'>MULA PRETA</span>"; }}/>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <NotificationBell archs={archs} tasks={tasks} deals={deals} user={user} setPage={setPage} setSelA={setSelA}/>
              <span onClick={toggle} style={{ cursor:"pointer", color:T.tx2 }}><Ic t={theme === "dark" ? "sun" : "moon"} s={18}/></span>
            </div>
          </div>
          <div className="mp-tb" style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", padding:"14px 28px", borderBottom:"1px solid " + T.brd, background:T.srf, gap:12 }}>
            <NotificationBell archs={archs} tasks={tasks} deals={deals} user={user} setPage={setPage} setSelA={setSelA}/>
          </div>
          <div className="mp-content" style={{ flex:1, padding:"24px 28px", overflowY:"auto" }}>{renderPage()}</div>
        </main>
      </div>
    </Ctx.Provider>
  );
}
