"use client";
import { useState } from "react";
import {
  BookOpen,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  User,
} from "lucide-react";

interface AdviceItem {
  id: string;
  author: string;
  advice: string;
  likes: number;
}

// Example advice from other users
const exampleAdvice: AdviceItem[] = [
  {
    id: "1",
    author: "George X.",
    advice:
      "Try not to rush the negotiation. Take your time to understand everyone's needs.",
    likes: 24,
  },
  {
    id: "2",
    author: "Rebecca W.",
    advice:
      "The best negotiators listen more than they speak in a negotiation.",
    likes: 18,
  },
  {
    id: "3",
    author: "Joaquin G.",
    advice:
      "Focus on building rapport before diving into numbers. People are more likely to work with you when they like you!",
    likes: 31,
  },
  {
    id: "4",
    author: "Nicole B.",
    advice:
      'Use the "anchor" technique early in the negotiation. It sets the frame for all subsequent discussions.',
    likes: 28,
  },
];

export default function Reflection() {
  const [reflection, setReflection] = useState("");
  const [newAdvice, setNewAdvice] = useState("");
  const [userName, setUserName] = useState("");
  const [advice, setAdvice] = useState<AdviceItem[]>(exampleAdvice);

  const handleSubmitAdvice = () => {
    if (newAdvice.trim() && userName.trim()) {
      const newAdviceItem: AdviceItem = {
        id: Date.now().toString(),
        author: userName,
        advice: newAdvice,
        likes: 0,
      };
      setAdvice([newAdviceItem, ...advice]);
      setNewAdvice("");
      setUserName("");
    }
  };

  const handleLike = (id: string) => {
    setAdvice(
      advice.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reflection</h2>
          <p className="text-muted">
            Learn from your experience and help others
          </p>
        </div>
      </div>

      {/* Personal Reflection Section */}
      <div className="bg-card-bg border border-card-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-accent" />
          Your Reflection
        </h3>
        <p className="text-sm text-muted mb-4">
          Take a moment to reflect on the negotiation. What went well? What
          would you do differently next time? (There are reflection prompts
          below).
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full h-40 px-4 py-3 bg-background border border-card-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted">
            Your reflection is private and stored locally
          </p>
          <button
            onClick={() => {
              // Could save to localStorage or trigger download
              console.log("Saving reflection:", reflection);
            }}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Save Reflection
          </button>
        </div>
      </div>

      {/* Community Advice Section */}
      <div className="bg-card-bg border border-card-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          Share Your Advice
        </h3>
        <p className="text-sm text-muted mb-4">
          Help other negotiators by sharing your best tip or lesson learned
        </p>

        {/* Add New Advice Form */}
        <div className="bg-background border border-card-border rounded-lg p-4 mb-6">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name (e.g., John D.)"
            className="w-full px-3 py-2 mb-3 bg-card-bg border border-card-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            value={newAdvice}
            onChange={(e) => setNewAdvice(e.target.value)}
            placeholder="Share your advice here..."
            className="w-full h-24 px-3 py-2 bg-card-bg border border-card-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          <button
            onClick={handleSubmitAdvice}
            disabled={!newAdvice.trim() || !userName.trim()}
            className="mt-3 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share Advice
          </button>
        </div>

        {/* Advice List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Community Wisdom
          </h4>
          {advice.map((item) => (
            <div
              key={item.id}
              className="bg-background border border-card-border rounded-lg p-4 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.author}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {item.advice}
                  </p>
                  <button
                    onClick={() => handleLike(item.id)}
                    className="mt-3 flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors group"
                  >
                    <ThumbsUp className="w-4 h-4 group-hover:fill-current" />
                    <span>
                      {item.likes}{" "}
                      {item.likes === 1 ? "person found" : "people found"} this
                      helpful
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="bg-linear-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-accent">
          <Lightbulb className="w-5 h-5" />
          Reflection Prompts
        </h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">•</span>
            <span>
              How did your preparation impact the negotiation outcome?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">•</span>
            <span>Which strategies that you used proved most effective?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">•</span>
            <span>
              What did you learn about the other party&apos;s priorities?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">•</span>
            <span>
              If you could do it again, what would you do differently?
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
