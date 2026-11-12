# Comp CRM Dashboard

Dashboard en tiempo real para Comp AI CRM - Interfaz de visualización y gestión de leads, pipeline de ventas y métricas en tiempo real.

## 🚀 Características

- **Pipeline Kanban** - Gestión visual de leads por etapas
- **Embudo de Conversión** - Visualización del funnel de ventas
- **KPIs en Tiempo Real** - Métricas actualizadas automáticamente
- **Actualizaciones en Tiempo Real** - WebSocket para updates live
- **Filtros Avanzados** - Por etapa, intención, búsqueda
- **CRUD Completo** - Crear, leer, actualizar leads
- **Integración Comp CRM** - Conexión nativa con Comp AI CRM

## 🛠 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Estado**: SWR + Zustand
- **Tiempo Real**: WebSockets
- **Despliegue**: Vercel

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Cuenta en Vercel
- Comp CRM deployado (ver [Comp AI CRM](https://github.com/trycompai/crm))

### Instalación Local

```bash
# Clonar e instalar
cd vercel-crm-dashboard
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Desarrollo
npm run dev
```

### Variables de Entorno

```bash
# .env.local
COMP_CRM_API_URL=https://api.trycrm.ai
COMP_CRM_API_KEY=tu_api_key_aqui
COMP_CRM_WS_URL=wss://api.trycrm.ai/ws

# Opcional: Vercel AI Gateway
VERCEL_AI_GATEWAY_API_KEY=***
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Deploy en Vercel

1. Push a GitHub
2. Importar proyecto en Vercel
3. Configurar variables de entorno en Vercel Dashboard
4. Deploy automático

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   │   ├── leads/         # CRUD Leads
│   │   ├── companies/     # Empresas
│   │   ├── facts/         # Hechos verificados
│   │   ├── pipeline/      # Pipeline data
│   │   ├── kpis/          # KPIs
│   │   └── ws/            # WebSocket endpoint
│   ├── page.tsx           # Dashboard principal
│   ├── layout.tsx         # Layout raíz
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── PipelineKanban.tsx
│   ├── FunnelChart.tsx
│   ├── KPICards.tsx
│   ├── LeadCard.tsx
│   └── RealTimeProvider.tsx
├── lib/
│   ├── api/               # Cliente API
│   │   └── crm.ts
│   └── hooks/             # Custom hooks
│       ├── useLeads.ts
│       └── useRealtime.ts
├── components/            # Componentes UI
├── types/                 # TypeScript types
└── lib/                   # Utilidades
```

## 🎨 Componentes Principales

| Componente | Descripción |
|------------|-------------|
| `PipelineKanban` | Tablero Kanban drag-and-drop |
| `FunnelChart` | Embudo de conversión visual |
| `KPICards` | Tarjetas de métricas KPI |
| `LeadCard` | Tarjeta de lead individual |
| `RealTimeProvider` | Provider WebSocket |

## 🔌 API Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/leads` | GET/POST | Listar/Crear leads |
| `/api/leads/[id]` | GET/PATCH/DELETE | CRUD lead individual |
| `/api/pipeline` | GET | Pipeline Kanban |
| `/api/kpis` | GET | Métricas KPI |
| `/api/companies` | GET/POST | Empresas |
| `/api/facts` | GET/POST | Hechos verificados |
| `/api/ws` | GET | WebSocket endpoint |

## 🔧 Configuración de Comp CRM

El dashboard requiere un Comp CRM funcionando. Opciones:

1. **SaaS**: https://trycrm.ai (registrarse y obtener API key)
2. **Self-hosted**: Deploy desde https://github.com/trycompai/crm

### Variables Requeridas
```bash
COMP_CRM_API_URL=https://tu-crm.trycrm.ai
COMP_CRM_API_KEY=sk-xxxxxxxxxxxxx
COMP_CRM_WS_URL=wss://api.trycrm.ai/ws
```

## 🔒 Seguridad

- Variables de entorno en Vercel (no en repo)
- API Keys solo en servidor
- CORS configurado para dominio propio
- Rate limiting en API routes

## 📱 Responsive

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Kanban responsive en móvil

## 📊 Métricas Incluidas

- Total Leads / Nuevos / Calificados
- Valor Total Pipeline
- Tasa de Conversión
- Embudo de Conversión
- Pipeline Kanban
- Top Empresas
- Distribución por Intención

## 🤝 Contribuir

1. Fork el repo
2. Crea branch feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Add: nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Pull Request

## 📄 Licencia

MIT License - Ver LICENSE para detalles.

## 🔗 Enlaces Útiles

- [Comp AI CRM](https://github.com/trycompai/crm)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)