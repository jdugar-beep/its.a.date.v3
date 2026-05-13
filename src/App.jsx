import React, { useMemo, useState } from "react";

const places = [
  {
    id: "aba-lazybird",
    title: "West Loop Dinner + Drinks",
    neighborhood: "West Loop",
    price: "$$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Romantic", "Pretty", "Lively"],
    rating: 9.4,
    places: [
      {
        name: "Aba",
        type: "Dinner",
        ordered: ["Whipped feta", "Short rib hummus", "Crispy potatoes"],
      },
      {
        name: "Lazy Bird",
        type: "Drinks",
        ordered: ["Espresso martini"],
      },
    ],
    notes:
      "Perfect second date energy. Feels impressive but not too serious.",
  },

  {
    id: "quartino-violet",
    title: "River North Cozy Night",
    neighborhood: "River North",
    price: "$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Cozy", "Dark", "Fun"],
    rating: 8.9,
    places: [
      {
        name: "Quartino",
        type: "Dinner",
        ordered: ["Truffle pizza", "Carbonara"],
      },
      {
        name: "The Violet Hour",
        type: "Drinks",
        ordered: ["Custom cocktails"],
      },
    ],
    notes:
      "Great for winter dates and long conversations.",
  },

  {
    id: "museum-date",
    title: "Cute Day Date",
    neighborhood: "Loop",
    price: "$$",
    dateTypes: ["Activity", "Coffee"],
    vibes: ["Cute", "Daytime", "Artsy"],
    rating: 8.7,
    places: [
      {
        name: "Art Institute",
        type: "Activity",
        ordered: [],
      },
      {
        name: "Sawada Coffee",
        type: "Coffee",
        ordered: ["Military latte"],
      },
    ],
    notes:
      "Ideal first date because there’s always something to talk about.",
  },
];

const vibeColors = {
  Romantic: "bg-pink-100 text-pink-700",
  Pretty: "bg-purple-100 text-purple-700",
  Lively: "bg-orange-100 text-orange-700",
  Cozy: "bg-amber-100 text-amber-700",
  Dark: "bg-slate-200 text-slate-700",
  Fun: "bg-yellow-100 text-yellow-700",
  Cute: "bg-rose-100 text-rose-700",
  Daytime: "bg-sky-100 text-sky-700",
  Artsy: "bg-indigo-100 text-indigo-700",
};

export default function App() {
  const [selectedVibe, setSelectedVibe] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");

  const vibes = useMemo(
    () => [
      "All",
      ...new Set(places.flatMap((p) => p.vibes)),
    ],
    []
  );

  const types = useMemo(
    () => [
      "All",
      ...new Set(places.flatMap((p) => p.dateTypes)),
    ],
    []
  );

  const neighborhoods = useMemo(
    () => [
      "All",
      ...new Set(places.map((p) => p.neighborhood)),
    ],
    []
  );

  const filtered = places.filter((date) => {
    return (
      (selectedVibe === "All" ||
        date.vibes.includes(selectedVibe)) &&
      (selectedType === "All" ||
        date.dateTypes.includes(selectedType)) &&
      (selectedNeighborhood === "All" ||
        date.neighborhood === selectedNeighborhood)
    );
  });

  return (
    <div className="min-h-screen bg-[#f7f2e9] text-[#172033]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#10182A] px-6 py-5 text-white shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-xl font-black">
              D
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                DateRank Chicago
              </h1>

              <p className="text-sm text-slate-400">
                Rank full date nights, not just places.
              </p>
            </div>
          </div>

          <button className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg">
            + Add Date
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value)
              }
              className="rounded-2xl bg-slate-50 px-4 py-4 font-bold ring-1 ring-slate-200"
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedNeighborhood}
              onChange={(e) =>
                setSelectedNeighborhood(e.target.value)
              }
              className="rounded-2xl bg-slate-50 px-4 py-4 font-bold ring-1 ring-slate-200"
            >
              {neighborhoods.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <select
              value={selectedVibe}
              onChange={(e) =>
                setSelectedVibe(e.target.value)
              }
              className="rounded-2xl bg-slate-50 px-4 py-4 font-bold ring-1 ring-slate-200"
            >
              {vibes.map((vibe) => (
                <option key={vibe}>{vibe}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((date) => (
            <div
              key={date.id}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                    {date.neighborhood}
                  </p>

                  <h2 className="mt-2 text-3xl font-black leading-tight">
                    {date.title}
                  </h2>

                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {date.price} ·{" "}
                    {date.dateTypes.join(" + ")}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 px-4 py-3 text-xl font-black text-amber-600">
                  ★ {date.rating}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {date.vibes.map((vibe) => (
                  <span
                    key={vibe}
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      vibeColors[vibe]
                    }`}
                  >
                    #{vibe}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {date.places.map((place, idx) => (
                  <div
                    key={place.name}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#172033] font-black text-white">
                        {idx + 1}
                      </div>

                      <div>
                        <h3 className="font-black">
                          {place.name}
                        </h3>

                        <p className="text-sm font-semibold text-slate-500">
                          {place.type}
                        </p>
                      </div>
                    </div>

                    {place.ordered.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {place.ordered.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-[#172033] p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                  Notes
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-200">
                  {date.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
