import { 
  Bot, 
  Cpu, 
  Database, 
  Workflow, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Layers, 
  Code2, 
  BarChart3, 
  Terminal, 
  Lock 
} from 'lucide-react';

export const servicesList = [
  {
    id: 'autonomous-agents',
    number: '01',
    icon: Bot,
    title: 'Autonomous AI Agents & Swarms',
    tagline: 'Multi-agent cognitive systems with tool execution',
    description: 'We architect autonomous multi-agent swarms capable of executing complex end-to-end workflows, code generation, multi-source research, and operational decision-making with high reliability.',
    features: [
      'Multi-agent orchestration & task delegation',
      'Dynamic tool-use & API integration loops',
      'Self-healing error recovery protocols',
      'Human-in-the-loop audit checkpoints',
    ],
    badge: 'Flagship Service',
  },
  {
    id: 'llm-fine-tuning',
    number: '02',
    icon: Sparkles,
    title: 'Enterprise LLM Tuning & RAG',
    tagline: 'Domain-specific intelligence tailored to proprietary data',
    description: 'Transform frontier open-source and proprietary foundation models with parameter-efficient fine-tuning (PEFT/LoRA) and high-speed Hybrid Vector Search RAG pipelines.',
    features: [
      'Custom dataset curation & synthetic generation',
      'LoRA / QLoRA parameter-efficient fine-tuning',
      'Hybrid dense/sparse vector retrieval (RAG)',
      'Sub-20ms context reranking engines',
    ],
    badge: 'High Demand',
  },
  {
    id: 'workflow-automation',
    number: '03',
    icon: Workflow,
    title: 'Intelligent Process Automation',
    tagline: 'Eliminate manual bottlenecks with cognitive pipelines',
    description: 'Modernize legacy enterprise operations with intelligent cognitive workflows. Automatically parse complex unstructured documents, route tickets, and trigger automated cross-system actions.',
    features: [
      'Unstructured document & invoice extraction',
      'Automated triage & semantic routing',
      'ERP / CRM bidirectional synchronization',
      'Real-time SLA compliance tracking',
    ],
    badge: 'Enterprise ROI',
  },
  {
    id: 'predictive-analytics',
    number: '04',
    icon: BarChart3,
    title: 'Predictive Data Intelligence',
    tagline: 'Real-time forecasting and neural pattern discovery',
    description: 'Harness deep learning and time-series neural architectures to detect anomalies, forecast market demand, predict user churn, and optimize resource allocation in real-time.',
    features: [
      'Real-time anomaly detection pipelines',
      'Deep learning time-series forecasting',
      'High-throughput stream processing',
      'Automated BI dashboards & alerting',
    ],
    badge: 'Real-Time',
  },
  {
    id: 'neural-vision',
    number: '05',
    icon: Cpu,
    title: 'Computer Vision & Multimodal AI',
    tagline: 'Visual reasoning and high-speed inference',
    description: 'Deploy cutting-edge vision-language models for automated quality inspection, OCR, spatial recognition, video understanding, and real-time visual defect classification.',
    features: [
      'Real-time edge & cloud object detection',
      'Vision-Language Model (VLM) reasoning',
      'Defect classification & automated QA',
      'High-FPS embedded device optimization',
    ],
    badge: 'Edge & Cloud',
  },
  {
    id: 'infrastructure-security',
    number: '06',
    icon: ShieldCheck,
    title: 'Private & Secure AI Infrastructure',
    tagline: 'Zero data retention, SOC2 Type II compliance & VPC hosting',
    description: 'Deploy AI models within your private VPC or dedicated on-premises H100/A100 compute clusters with guaranteed zero data leakage, strict encryption, and enterprise governance.',
    features: [
      'Dedicated VPC and On-Premises deployments',
      'Zero data retention and training isolation',
      'SOC2 Type II & GDPR compliance guardrails',
      'vLLM / TensorRT-LLM cluster orchestration',
    ],
    badge: 'Zero-Trust',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery & Feasibility Audit',
    description: 'We evaluate your technical stack, identify high-impact automation vectors, and establish concrete latency, accuracy, and ROI benchmarks.',
  },
  {
    step: '02',
    title: 'Architecture & Rapid Prototyping',
    description: 'We build an interactive working PoC within 10 days, validating model performance against ground-truth evaluation datasets.',
  },
  {
    step: '03',
    title: 'Production Hardening & Scale',
    description: 'We deploy low-latency inference pipelines into your secure VPC, configured with load balancing, caching, and failover redundancies.',
  },
  {
    step: '04',
    title: 'Continuous Fine-Tuning & Monitoring',
    description: '24/7 telemetry, automated regression tests, and continuous dataset retraining ensure your models stay sharp as your business scales.',
  },
];

export const serviceFAQs = [
  {
    question: 'How fast can you deploy a custom AI solution?',
    answer: 'Our rapid prototyping framework delivers a validated working proof-of-concept in 7–14 days. Full enterprise production rollouts typically take 3–6 weeks depending on compliance and integration requirements.',
  },
  {
    question: 'Is our proprietary enterprise data kept private and secure?',
    answer: 'Yes, 100%. We enforce zero data retention policies. All model fine-tuning and inference pipelines are hosted within your dedicated VPC or private infrastructure. Your data is never used to train public foundation models.',
  },
  {
    question: 'Can you integrate AI agents with our existing internal tools and APIs?',
    answer: 'Absolutely. We specialize in custom tool-use protocols, connecting autonomous agents directly to PostgreSQL, Snowflake, Salesforce, Jira, GitHub, Slack, and custom REST/GraphQL endpoints.',
  },
  {
    question: 'What models and frameworks do you build on?',
    answer: 'We leverage state-of-the-art open models (Llama 3.3, DeepSeek, Mistral, Qwen) along with frontier APIs (Anthropic Claude, OpenAI, Google Gemini), orchestrated using vLLM, LangChain, and custom high-throughput Rust/Python backends.',
  },
];
