import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, easeInOut } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Vaults } from "./Vaults";

const Vault = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const pathname = useLocation();


  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);


  const filteredQuotes = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return Vaults.filter((q) => {
      const matchesQuote = q.quote.toLowerCase().includes(lowerSearch);
      const matchesTags = q.tags?.some((tag) =>
        tag.toLowerCase().includes(lowerSearch)
      );
      return matchesQuote || matchesTags;
    });
  }, [searchTerm]);

  const handleCopy = (text, id) => {
    const cleanText = text.replace(/\*\*/g, "");
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareOnX = (quote) => {
    const cleanQuote = quote.replace(/\*\*/g, "");
    const message = encodeURIComponent(`"${cleanQuote}"\n\n— via The Library\n\ncc: @Ishusyncs`);
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-zinc-500 font-mono p-6 md:p-24 selection:bg-amber-500/30">
      <header className="max-w-4xl mx-auto mb-32">
        <div className="flex justify-between items-baseline border-b border-zinc-900 pb-4 mb-8">
          <h1 className="text-zinc-100 text-[10px] tracking-[0.4em] uppercase">
            The Vault / Index
          </h1>
          <span className="text-[10px] text-zinc-600">
            {filteredQuotes.length} Records Found
          </span>
        </div>
        <input
          type="text"
          placeholder="FILTER_BY_INTENTION..."
          className="w-full bg-transparent outline-none text-zinc-300 placeholder:text-zinc-600 text-sm tracking-widest"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ top: 0 }}
          animate={{ bottom: 0, top: 0 }}
          transition={{ duration: 3, ease: easeInOut }}
          className="absolute left-[18px] w-[1px] bg-zinc-900"
        />

        <div className="flex flex-col gap-12">
          {filteredQuotes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 group/main"
            >
              <div className="absolute left-[15px] top-2 w-2 h-2 rounded-full bg-zinc-900 border border-black group-hover/main:bg-amber-500/50 transition-colors duration-500" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] text-zinc-800">
                  <span className="text-zinc-600 group-hover/main:text-zinc-400 transition-colors">
                    ENTRY_{String(item.id).padStart(3, '0')}
                  </span>
                  <span className="h-[1px] w-8 bg-zinc-900" />
                  <span className="opacity-0 group-hover/main:opacity-100 transition-opacity uppercase">
                    {item.tags?.[0] || "Foundational_Truth"}
                  </span>
                </div>

                <div className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl group-hover/main:text-white transition-colors duration-500">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>
                    }}
                  >
                    {item.quote}
                  </ReactMarkdown>
                </div>

                <div className="flex gap-6 pt-2 opacity-0 -translate-y-2 group-hover/main:opacity-100 group-hover/main:translate-y-0 transition-all duration-500">
                  <button
                    onClick={() => handleCopy(item.quote, item.id)}
                    className="text-[10px] uppercase tracking-widest hover:text-amber-500 transition-colors"
                  >
                    {copiedId === item.id ? "[ COPIED ]" : "Copy"}
                  </button>

                  <button
                    onClick={() => shareOnX(item.quote)}
                    className="flex items-center gap-2 group/child text-[10px] uppercase tracking-widest hover:text-amber-500 transition-colors"
                  >
                    <span>Manifest</span>
                    <motion.svg
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                      className="text-[#3f3f46] group-hover/child:text-zinc-300"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                    </motion.svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="mt-40 text-center opacity-80 text-[9px] tracking-[1em] uppercase">
        Precision • Intention
      </footer>
    </div>
  );
};

export default Vault;