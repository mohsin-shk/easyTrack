import { useState } from "react";
import axios from "axios";
import PriceChart from "./PriceChart";
import { Search } from "lucide-react";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackProduct = async () => {
    if (!url) return;
    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/track", { url });
    setData(res.data);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-5xl p-10 bg-linear-to-br from-[#061A48] to-[#020B2A] rounded-3xl shadow-2xl text-white">

      {/* Title */}
      <h2 className="text-3xl font-semibold text-center mb-10">
        Search Price History
      </h2>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter Amazon / Flipkart product link"
          className="w-full bg-[#020B2A] border border-white/20 rounded-full py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={trackProduct}
          className="bg-[#FF4D3F] hover:bg-[#ff6357] px-14 py-3 rounded-full font-semibold shadow-lg transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-sm text-white/60 text-center mt-6 leading-relaxed max-w-3xl mx-auto">
        Want to search historical price charts or the lowest ever price?
        Paste a product link and instantly view historical milestones, price charts,
        and current deals from Amazon & Flipkart.
      </p>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm mt-8 text-white/80">
        {[
          "Amazon Price Tracker",
          "Flipkart Price Tracker",
          "Latest Deals",
          "Amazon Deal Finder",
          "Price Drop",
          "Amazon Price Drop",
        ].map((item, i) => (
          <span key={i} className="hover:text-indigo-400 cursor-pointer">
            {item} |
          </span>
        ))}
      </div>

      {data && <PriceChart history={data.history} />}
    </div>
  );
}
