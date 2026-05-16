"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Bot,
    ShieldCheck,
    Zap,
    Package,
    XCircle,
    BarChart3,
    Globe,
    CheckCircle2,
    X,
    ChevronRight,
    Sparkles,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type BillingCycle = "monthly" | "yearly";

interface Plan {
    name: string;
    tier: "free" | "pro" | "enterprise";
    price_monthly: number;
    price_yearly: number;
    description: string;
    max_stores: number;
    max_conversations: number | null;
    analytics_enabled: boolean;
    custom_branding: boolean;
    priority_support: boolean;
    agentic_tools: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
    {
        name: "Free",
        tier: "free",
        price_monthly: 0,
        price_yearly: 0,
        description: "Explore the platform and get your first chatbot live.",
        max_stores: 1,
        max_conversations: 500,
        analytics_enabled: false,
        custom_branding: false,
        priority_support: false,
        agentic_tools: false,
    },
    {
        name: "Pro",
        tier: "pro",
        price_monthly: 4900,
        price_yearly: 3900,
        description: "Everything a growing store needs to automate support.",
        max_stores: 3,
        max_conversations: 10000,
        analytics_enabled: true,
        custom_branding: true,
        priority_support: false,
        agentic_tools: true,
    },
    {
        name: "Enterprise",
        tier: "enterprise",
        price_monthly: 14900,
        price_yearly: 11900,
        description: "Unlimited scale, dedicated support, and full control.",
        max_stores: 0,
        max_conversations: null,
        analytics_enabled: true,
        custom_branding: true,
        priority_support: true,
        agentic_tools: true,
    },
];

const FEATURES = [
    {
        icon: Search,
        colorClass: "text-blue-400",
        bgClass: "bg-blue-400/10 border-blue-400/20",
        tag: "Knowledge Base",
        tagClass: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        title: "RAG-Powered Q&A",
        desc: "Answers product questions, FAQs, and store policies using your own knowledge base — with source citations and confidence scores.",
    },
    {
        icon: Package,
        colorClass: "text-amber-400",
        bgClass: "bg-amber-400/10 border-amber-400/20",
        tag: "Agentic",
        tagClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        title: "Order Tracking",
        desc: "Customers ask 'Where is my order?' and get live carrier status, estimated delivery, and tracking links — instantly.",
    },
    {
        icon: XCircle,
        colorClass: "text-red-400",
        bgClass: "bg-red-400/10 border-red-400/20",
        tag: "Agentic",
        tagClass: "text-red-400 bg-red-400/10 border-red-400/20",
        title: "Order Cancellation",
        desc: "Autonomous cancellation flow for eligible orders, with automatic refund processing and confirmation emails.",
    },
    {
        icon: BarChart3,
        colorClass: "text-emerald-400",
        bgClass: "bg-emerald-400/10 border-emerald-400/20",
        tag: "Agentic",
        tagClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        title: "Stock Intelligence",
        desc: "Real-time inventory lookups across size, color, and variant. Suggests alternatives when items are out of stock.",
    },
    {
        icon: Zap,
        colorClass: "text-violet-400",
        bgClass: "bg-violet-400/10 border-violet-400/20",
        tag: "Integration",
        tagClass: "text-violet-400 bg-violet-400/10 border-violet-400/20",
        title: "Instant Sync",
        desc: "One-click WooCommerce integration. Products, orders, and inventory sync automatically and in real-time.",
    },
    {
        icon: ShieldCheck,
        colorClass: "text-cyan-400",
        bgClass: "bg-cyan-400/10 border-cyan-400/20",
        tag: "Security",
        tagClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
        title: "Privacy-First by Design",
        desc: "Conversations are encrypted in transit. No customer data is ever used for AI training. You control retention.",
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (cents: number) =>
    cents === 0 ? "$0" : `$${Math.round(cents / 100)}`;

// ─── Nav ──────────────────────────────────────────────────────────────────────

function NavBar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/6 bg-[#08080e]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-linear-to-br from-emerald-400 to-blue-500">
                        <Bot className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-serif text-xl font-normal tracking-tight text-slate-100">
                        StoreChat
                    </span>
                </div>

                {/* Center nav links */}
                <nav className="mx-auto hidden gap-8 md:flex">
                    {["Features", "Pricing", "Docs"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Link href="/login">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "cursor-pointer",
                                "text-zinc-400 transition-all duration-200", // Default state: muted
                                "hover:text-white hover:bg-white/10",         // Hover state: bright text + subtle glass bg
                                "active:scale-95"                            // Pro touch: slight "squish" effect on click
                            )}
                        >
                            Log in
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button
                            size="sm"
                            className="gap-1.5 bg-linear-to-r from-emerald-500 to-blue-500 text-white hover:opacity-90 hover:from-emerald-500 hover:to-blue-500 cursor-pointer"
                        >
                            Get started <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pb-32 pt-28 text-center">
            {/* Radial glows */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.13)_0%,transparent_70%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute left-[10%] top-[30%] h-125 w-125 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.07)_0%,transparent_70%)]"
            />

            <div className="relative mx-auto max-w-4xl">
                {/* Eyebrow badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                        AI-Powered WooCommerce Assistant
                    </span>
                </div>

                {/* Headline */}
                <h1 className="mb-6 font-serif text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[1.06] tracking-tight text-slate-100">
                    Your Store,{" "}
                    <span className="bg-linear-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                        Always On.
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto mb-10 max-w-140 text-lg leading-relaxed text-slate-400">
                    StoreChat connects to your WooCommerce store and handles customer
                    queries, order tracking, cancellations, and stock checks —
                    autonomously.
                </p>

                {/* CTA row */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link href="/register">
                        <Button
                            size="lg"
                            className="h-12 gap-2 bg-linear-to-r from-emerald-500 to-blue-500 px-8 text-base font-semibold text-white shadow-[0_0_40px_rgba(16,185,129,0.25),0_8px_24px_rgba(0,0,0,0.4)] transition-all hover:opacity-90 hover:shadow-[0_0_60px_rgba(16,185,129,0.35)] hover:from-emerald-500 hover:to-blue-500"
                        >
                            Start for free <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <a href="#features">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 gap-2 border-white/10 bg-white/5 px-7 text-base text-slate-300 hover:bg-white/10 hover:text-slate-100"
                        >
                            See how it works <ChevronRight className="h-4 w-4" />
                        </Button>
                    </a>
                </div>

                {/* Stats bar */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-10">
                    {[
                        ["2,400+", "Active stores"],
                        ["98.7%", "Uptime SLA"],
                        ["< 300ms", "Avg. response"],
                        ["4.9 / 5", "Customer rating"],
                    ].map(([val, label]) => (
                        <div key={label} className="text-center">
                            <div className="text-xl font-bold tracking-tight text-slate-100">
                                {val}
                            </div>
                            <div className="mt-0.5 text-xs text-slate-500">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Chat Preview ─────────────────────────────────────────────────────────────

function ChatPreview() {
    const messages = [
        { from: "user", text: "Where is my order #WC-8821?" },
        {
            from: "bot",
            text: "Your order #WC-8821 is out for delivery with DHL. Estimated arrival: today between 2–5 PM.",
            tag: "order_tracking",
            tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
            dot: "bg-blue-400",
        },
        { from: "user", text: "Can I cancel order #WC-8840?" },
        {
            from: "bot",
            text: "Done! Order #WC-8840 has been cancelled. Your refund of $49.00 will arrive in 3–5 business days.",
            tag: "order_cancel",
            tagColor: "text-red-400 bg-red-400/10 border-red-400/20",
            dot: "bg-red-400",
        },
        { from: "user", text: "Is the Nike Air Max 90 in stock in size 11?" },
        {
            from: "bot",
            text: "Yes! Nike Air Max 90 in size 11 — 3 units in stock.",
            tag: "stock_check",
            tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
            dot: "bg-emerald-400",
        },
    ];

    return (
        <section className="px-6 pb-28">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/8 bg-white/3 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-white/6 bg-white/4 px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    <div className="ml-2 flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1">
                        <Globe className="h-2.5 w-2.5 text-slate-500" />
                        <span className="text-[11px] text-slate-500">
                            yourstore.com/chat
                        </span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col gap-3.5 p-5 pb-6">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex",
                                m.from === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {m.from === "bot" && (
                                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-blue-500">
                                    <Bot className="h-3.5 w-3.5 text-white" />
                                </div>
                            )}
                            <div className="max-w-[75%]">
                                <div
                                    className={cn(
                                        "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed text-slate-200",
                                        m.from === "user"
                                            ? "rounded-tr-sm border border-blue-400/25 bg-blue-400/15"
                                            : "rounded-tl-sm border border-white/8 bg-white/5"
                                    )}
                                >
                                    {m.text}
                                </div>
                                {m.tag && (
                                    <div
                                        className={cn(
                                            "mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
                                            m.tagColor
                                        )}
                                    >
                                        <div className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
                                        <span className="text-[10px] font-semibold uppercase tracking-wider">
                                            {m.tag.replace("_", " ")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-blue-500">
                            <Bot className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/8 bg-white/5 px-4 py-3">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400/50"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
    return (
        <section id="features" className="px-6 pb-28">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                        Capabilities
                    </span>
                    <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-tight text-slate-100">
                        Not just a chatbot.
                        <br />
                        <span className="text-slate-500">An autonomous store agent.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-400">
                        StoreChat handles both knowledge retrieval and real store actions —
                        from answering FAQs to cancelling orders on your behalf.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="group rounded-2xl border border-white/[0.07] bg-white/3 p-6 transition-all hover:border-white/[0.14] hover:bg-white/[0.05]"
                        >
                            {/* Icon */}
                            <div
                                className={cn(
                                    "mb-5 flex h-11 w-11 items-center justify-center rounded-xl border",
                                    f.bgClass
                                )}
                            >
                                <f.icon className={cn("h-5 w-5", f.colorClass)} />
                            </div>

                            {/* Title + tag */}
                            <div className="mb-2.5 flex items-center gap-2.5">
                                <h3 className="text-[15px] font-semibold text-slate-100">
                                    {f.title}
                                </h3>
                                <span
                                    className={cn(
                                        "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                        f.tagClass
                                    )}
                                >
                                    {f.tag}
                                </span>
                            </div>

                            <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
    const [cycle, setCycle] = useState<BillingCycle>("monthly");

    const getPlanFeatures = (plan: Plan) => [
        {
            label:
                plan.max_stores === 0
                    ? "Unlimited stores"
                    : `${plan.max_stores} store${plan.max_stores > 1 ? "s" : ""}`,
            ok: true,
        },
        {
            label:
                plan.max_conversations === null
                    ? "Unlimited conversations / mo"
                    : `${plan.max_conversations.toLocaleString()} conversations / mo`,
            ok: true,
        },
        {
            label: plan.analytics_enabled ? "Advanced analytics" : "Basic analytics",
            ok: true,
        },
        {
            label: "Agentic tools (tracking, cancel, stock)",
            ok: plan.agentic_tools,
        },
        { label: "Custom bot persona & branding", ok: plan.custom_branding },
        { label: "Priority support", ok: plan.priority_support },
    ];

    return (
        <section id="pricing" className="px-6 pb-32">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                        Pricing
                    </span>
                    <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal tracking-tight text-slate-100">
                        Simple, transparent pricing.
                    </h2>
                    <p className="mt-3 text-[15px] text-slate-400">
                        Start free. Upgrade when you&apos;re ready.
                    </p>

                    {/* Billing toggle */}
                    <div className="mt-6 inline-flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
                        {(["monthly", "yearly"] as BillingCycle[]).map((c) => (
                            <button
                                key={c}
                                onClick={() => setCycle(c)}
                                className={cn(
                                    "rounded-lg px-5 py-2 text-sm font-medium transition-all",
                                    cycle === c
                                        ? "bg-slate-100 text-slate-900 shadow-sm"
                                        : "text-slate-400 hover:text-slate-200"
                                )}
                            >
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                                {c === "yearly" && (
                                    <span className="ml-1.5 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                        −20%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plan cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {PLANS.map((plan) => {
                        const price =
                            cycle === "yearly" ? plan.price_yearly : plan.price_monthly;
                        const isPro = plan.tier === "pro";

                        return (
                            <div
                                key={plan.tier}
                                className={cn(
                                    "relative flex flex-col rounded-2xl p-7 transition-transform hover:-translate-y-0.5",
                                    isPro
                                        ? "border border-emerald-500/30 bg-linear-to-b from-emerald-500/[0.07] to-blue-500/[0.07]"
                                        : "border border-white/8 bg-white/3"
                                )}
                            >
                                {isPro && (
                                    <div className="absolute -top-px left-1/2 -translate-x-1/2">
                                        <span className="rounded-b-lg bg-linear-to-r from-emerald-500 to-blue-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                                            Most popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-5">
                                    <p
                                        className={cn(
                                            "mb-1.5 text-xs font-semibold uppercase tracking-widest",
                                            isPro ? "text-emerald-400" : "text-slate-500"
                                        )}
                                    >
                                        {plan.name}
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[2.6rem] font-bold leading-none tracking-tight text-slate-100">
                                            {formatPrice(price)}
                                        </span>
                                        <span className="text-sm text-slate-500">/mo</span>
                                    </div>
                                    {cycle === "yearly" && price > 0 && (
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            Billed annually
                                        </p>
                                    )}
                                    <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
                                        {plan.description}
                                    </p>
                                </div>

                                <Link href="/register" className="mb-6">
                                    <Button
                                        className={cn(
                                            "w-full font-semibold",
                                            isPro
                                                ? "bg-linear-to-r from-emerald-500 to-blue-500 text-white hover:opacity-90 hover:from-emerald-500 hover:to-blue-500"
                                                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-slate-100"
                                        )}
                                        variant={isPro ? "default" : "outline"}
                                    >
                                        {plan.tier === "enterprise"
                                            ? "Contact sales"
                                            : plan.tier === "free"
                                                ? "Get started free"
                                                : "Start Pro trial"}
                                    </Button>
                                </Link>

                                <div className="mt-auto flex flex-col gap-3 border-t border-white/[0.07] pt-5">
                                    {getPlanFeatures(plan).map((f) => (
                                        <div key={f.label} className="flex items-center gap-2.5">
                                            {f.ok ? (
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                            ) : (
                                                <X className="h-4 w-4 shrink-0 text-white/20" />
                                            )}
                                            <span
                                                className={cn(
                                                    "text-[13px]",
                                                    f.ok ? "text-slate-300" : "text-slate-600"
                                                )}
                                            >
                                                {f.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
    return (
        <section className="px-6 pb-28">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/10 via-blue-500/8 to-violet-500/10 px-12 py-20 text-center">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.08)_0%,transparent_70%)]"
                />
                <div className="relative">
                    <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-normal leading-tight tracking-tight text-slate-100">
                        Ready to put your store on autopilot?
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-400">
                        Free to start. Set up in under 5
                        minutes. No credit card required.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="h-12 gap-2 bg-linear-to-r from-emerald-500 to-blue-500 px-8 text-base font-semibold text-white shadow-[0_0_40px_rgba(16,185,129,0.3),0_8px_24px_rgba(0,0,0,0.4)] hover:opacity-90 hover:from-emerald-500 hover:to-blue-500"
                            >
                                Start for free <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 border-white/10 bg-white/5 px-8 text-base text-slate-300 hover:bg-white/10 hover:text-slate-100"
                            >
                                Log in to dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer className="border-t border-white/6 px-6 py-10">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-linear-to-br from-emerald-400 to-blue-500">
                        <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="font-serif text-base text-slate-100">StoreChat</span>
                </div>
                <p className="text-xs text-slate-600">
                    © {new Date().getFullYear()} StoreChat. All rights reserved.
                </p>
                <div className="flex gap-5">
                    {["Privacy", "Terms", "Contact"].map((l) => (
                        <a
                            key={l}
                            href="#"
                            className="text-xs text-slate-500 transition-colors hover:text-slate-300"
                        >
                            {l}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export function LandingPage() {
    return (
        <div className="min-h-screen bg-[#08080e] font-sans text-slate-100 antialiased">
            {/* DM Serif Display for headings via font-serif override */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        .font-serif { font-family: 'DM Serif Display', Georgia, serif !important; }
      `}</style>
            <NavBar />
            <main>
                <HeroSection />
                <ChatPreview />
                <FeaturesSection />
                <PricingSection />
                <CTABanner />
            </main>
            <Footer />
        </div>
    );
}