import React, { useMemo } from 'react';
import { AccountProduct, CartItem } from '../../types';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { 
  ArrowLeft, 
  Bitcoin, 
  ShieldCheck, 
  Zap, 
  ShoppingBag, 
  Check, 
  Key, 
  Tag as TagIcon, 
  FileText, 
  Building2, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Clock,
  HelpCircle,
  Shield
} from 'lucide-react';
import { isModifiedClick, getProductUrl } from '../../utils/navigation';

interface ProductPageProps {
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
  onNavigateHome: () => void;
  onExploreAccounts: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  onBuyNow,
  onAddToCart,
  onNavigateHome,
  onExploreAccounts,
}) => {
  // Determine product from pathname (e.g. /product/btc-4k)
  const currentProduct: AccountProduct = useMemo(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      for (const p of ACCOUNT_PRODUCTS) {
        if (pathname.includes(`/product/${p.id}`) || pathname.endsWith(`/${p.id}`)) {
          return p;
        }
      }
    }
    return ACCOUNT_PRODUCTS[0]; // fallback
  }, []);

  const isBtc = currentProduct.btcEnabled;

  const relatedProducts = useMemo(() => {
    return ACCOUNT_PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 3);
  }, [currentProduct.id]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <a
          href="/buy-verified-cashapp-accounts"
          onClick={(e) => {
            if (isModifiedClick(e)) return;
            e.preventDefault();
            onExploreAccounts();
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D632] transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Accounts</span>
        </a>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="hidden sm:inline">Canonical URL:</span>
          <span className="text-[#00D632] bg-[#00D632]/10 px-2 py-0.5 rounded-lg border border-[#00D632]/20">
            https://cashappagent.com/product/{currentProduct.id}
          </span>
        </div>
      </div>

      {/* Main Product Hero Dossier */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/30 p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          {isBtc ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/40 text-xs font-black">
              <Bitcoin className="w-4 h-4" />
              BTC Enabled &bull; On-Chain Withdrawal Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/50 text-xs font-black">
              <ShieldCheck className="w-4 h-4 text-[#00D632]" />
              USD Non-BTC Verified &bull; High Fiat Volume
            </span>
          )}
          {currentProduct.tag && (
            <span className="px-3.5 py-1.5 rounded-full bg-[#00D632]/15 border border-[#00D632]/40 text-[#00D632] text-xs font-black">
              {currentProduct.tag}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
            Limit: {currentProduct.limitDisplay}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['Outfit',sans-serif] leading-tight">
            {currentProduct.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {currentProduct.shortDesc}
          </p>
        </div>

        {/* Pricing & CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instant Crypto Checkout Price</div>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#00D632] font-['Outfit',sans-serif]">
                ${currentProduct.price}
              </span>
              <span className="text-sm font-bold text-slate-300">USD Equivalent</span>
            </div>
            <div className="text-xs text-emerald-400 flex items-center justify-center md:justify-start gap-1 font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Automated Email &amp; Telegram Delivery within 5–15 Minutes</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onBuyNow(currentProduct)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] hover:to-[#00FF55] text-black font-black text-sm rounded-xl shadow-lg shadow-[#00D632]/25 hover:shadow-[#00D632]/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now (${currentProduct.price})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => onAddToCart(currentProduct)}
              className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Verification Specifications */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
            <Building2 className="w-5 h-5 text-[#00D632]" />
            <span>Technical Verification Specs</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-400 block text-xs">Daily Limit:</span>
              <strong className="text-white text-base">{currentProduct.specs.dailyLimit}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-400 block text-xs">Weekly Limit:</span>
              <strong className="text-white text-base">{currentProduct.specs.weeklyLimit}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-400 block text-xs">Monthly Limit:</span>
              <strong className="text-white text-base">{currentProduct.specs.monthlyLimit}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-400 block text-xs">BTC External Sends:</span>
              <strong className={isBtc ? 'text-[#00D632] text-sm' : 'text-slate-400 text-sm'}>
                {currentProduct.specs.btcWithdrawal}
              </strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-xs">Direct Deposit Routing:</span>
              <strong className="text-emerald-300 text-sm">{currentProduct.specs.directDeposit}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-xs">Included KYC Records:</span>
              <strong className="text-emerald-300 text-sm">{currentProduct.specs.documents}</strong>
            </div>
          </div>
        </div>

        {/* Complete Inclusions List */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
            <CheckCircle2 className="w-5 h-5 text-[#00D632]" />
            <span>Complete Order Inclusions</span>
          </h2>
          <ul className="space-y-3">
            {currentProduct.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <div className="p-0.5 rounded-full bg-[#00D632]/20 text-[#00D632] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Dossier Description */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-2xl font-bold text-white font-['Outfit',sans-serif]">
          Comprehensive Profile Architecture &amp; Use Cases
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          {currentProduct.description}
        </p>
      </div>

      {/* Safety Blueprint Callout */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider justify-center md:justify-start">
            <Shield className="w-4 h-4" />
            <span>30-Day Escrow &amp; Anti-Ban Guarantee</span>
          </div>
          <h3 className="text-xl font-bold text-white">Protect Your Account with Our 7-Day Protocol</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Every purchased account includes our comprehensive device fingerprinting and residential proxy warmup instructions to guarantee permanent longevity.
          </p>
        </div>
        <a
          href="/safety-guide"
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 whitespace-nowrap"
        >
          Read Safety Blueprint &rarr;
        </a>
      </div>

      {/* Related Products */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-white font-['Outfit',sans-serif]">
          Alternative Account Tiers &bull; Instant Stock
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 text-emerald-400">
                  {p.btcEnabled ? 'BTC Enabled' : 'Non-BTC'}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  <a href={getProductUrl(p)} className="hover:text-[#00D632] transition-colors">
                    {p.name}
                  </a>
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.shortDesc}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xl font-black text-white font-['Outfit',sans-serif]">${p.price}</span>
                <a
                  href={getProductUrl(p)}
                  className="text-xs font-bold text-[#00D632] hover:underline"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
