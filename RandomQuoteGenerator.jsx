import { useState, useEffect } from "react";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
  { text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron" },
  { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
];

const COLORS = [
  { bg: "#1a1a2e", accent: "#e94560", light: "#f5a623" },
  { bg: "#0f3460", accent: "#e94560", light: "#a8edea" },
  { bg: "#16213e", accent: "#0f3460", light: "#e94560" },
  { bg: "#1b262c", accent: "#0f4c75", light: "#bbe1fa" },
  { bg: "#2c003e", accent: "#e040fb", light: "#f8bbd0" },
  { bg: "#004d40", accent: "#00bfa5", light: "#f9fbe7" },
  { bg: "#1a237e", accent: "#3f51b5", light: "#e8eaf6" },
  { bg: "#4a148c", accent: "#7b1fa2", light: "#f3e5f5" },
];

function getRandomIndex(arr, exclude) {
  let idx;
  do { idx = Math.floor(Math.random() * arr.length); } while (arr.length > 1 && idx === exclude);
  return idx;
}

export default function App() {
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * quotes.length));
  const [colorIdx, setColorIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const quote = quotes[quoteIdx];
  const color = COLORS[colorIdx];

  const nextQuote = () => {
    if (animating) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setQuoteIdx(prev => getRandomIndex(quotes, prev));
      setColorIdx(prev => getRandomIndex(COLORS, prev));
      setVisible(true);
      setAnimating(false);
    }, 400);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetQuote = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" — ${quote.author}`)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === " " || e.key === "ArrowRight") nextQuote(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [animating]);

  return (
    <div style={{
      minHeight: "100vh",
      background: color.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      transition: "background 0.6s ease",
      padding: "20px",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <div style={{
        position: "absolute",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ fontSize: "20px" }}>💬</span>
        <span style={{
          color: color.accent,
          fontSize: "13px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontFamily: "'Arial', sans-serif",
          fontWeight: "600",
          filter: "brightness(1.8)",
        }}>
          Daily Wisdom
        </span>
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: `1px solid rgba(255,255,255,0.1)`,
        padding: "clamp(32px, 6vw, 56px)",
        maxWidth: "680px",
        width: "100%",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}>

        {/* Quote mark */}
        <div style={{
          fontSize: "80px",
          lineHeight: "0.6",
          marginBottom: "16px",
          color: color.accent,
          filter: "brightness(1.6)",
          fontFamily: "Georgia, serif",
        }}>"</div>

        {/* Quote text */}
        <p style={{
          color: "#ffffff",
          fontSize: "clamp(18px, 3vw, 26px)",
          lineHeight: "1.65",
          margin: "0 0 28px 0",
          fontStyle: "italic",
          fontWeight: "400",
          letterSpacing: "0.2px",
        }}>
          {quote.text}
        </p>

        {/* Divider */}
        <div style={{
          width: "48px",
          height: "2px",
          background: color.accent,
          filter: "brightness(1.6)",
          marginBottom: "16px",
          borderRadius: "2px",
        }} />

        {/* Author */}
        <p style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "14px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "'Arial', sans-serif",
          fontWeight: "600",
          margin: "0 0 36px 0",
        }}>
          — {quote.author}
        </p>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

          {/* New Quote — primary */}
          <button onClick={nextQuote} style={{
            flex: "1",
            minWidth: "140px",
            padding: "14px 24px",
            background: color.accent,
            filter: "brightness(1.5)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "700",
            fontFamily: "'Arial', sans-serif",
            cursor: "pointer",
            letterSpacing: "0.5px",
            transition: "transform 0.15s, opacity 0.15s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            onMouseDown={e => e.target.style.transform = "scale(0.97)"}
            onMouseUp={e => e.target.style.transform = "scale(1)"}
          >
            ✨ New Quote
          </button>

          {/* Copy */}
          <button onClick={copyQuote} style={{
            padding: "14px 20px",
            background: "rgba(255,255,255,0.08)",
            color: copied ? "#4ade80" : "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Arial', sans-serif",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>

          {/* Tweet */}
          <button onClick={tweetQuote} style={{
            padding: "14px 20px",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Arial', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            𝕏 Tweet
          </button>
        </div>
      </div>

      {/* Quote counter */}
      <p style={{
        color: "rgba(255,255,255,0.3)",
        fontSize: "12px",
        marginTop: "24px",
        fontFamily: "'Arial', sans-serif",
        letterSpacing: "1px",
      }}>
        {quoteIdx + 1} of {quotes.length} quotes · Press Space for next
      </p>

      {/* Footer */}
      <p style={{
        position: "absolute",
        bottom: "20px",
        color: "rgba(255,255,255,0.2)",
        fontSize: "11px",
        fontFamily: "'Arial', sans-serif",
        letterSpacing: "1px",
      }}>
        CodeAlpha Internship · Task 2
      </p>
    </div>
  );
}
