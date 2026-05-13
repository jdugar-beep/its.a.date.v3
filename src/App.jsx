import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "daterank_chicago_dates_v1";


const starterDates = [
  {
    id: "aba-lazybird",
    title: "West Loop Dinner + Drinks",
    neighborhood: "West Loop",
    price: "$$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Romantic", "Pretty", "Lively"],
    rating: 9.4,
    places: [
      { name: "Aba", type: "Dinner", ordered: ["Whipped feta", "Short rib hummus", "Crispy potatoes"] },
      { name: "Lazy Bird", type: "Drinks", ordered: ["Espresso martini"] },
    ],
    notes: "Perfect second date energy. Feels impressive but not too serious.",
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
      { name: "Quartino", type: "Dinner", ordered: ["Truffle pizza", "Carbonara"] },
      { name: "The Violet Hour", type: "Cocktails", ordered: ["Custom cocktails"] },
    ],
    notes: "Great for winter dates and long conversations.",
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
      { name: "Art Institute of Chicago", type: "Activity", ordered: [] },
      { name: "Sawada Coffee", type: "Coffee", ordered: ["Military latte"] },
    ],
    notes: "Ideal first date because there’s always something to talk about.",
  },
  {
    id: "monteverde-rm",
    title: "West Loop Pasta Night",
    neighborhood: "West Loop",
    price: "$$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Romantic", "Fancy", "Impressive"],
    rating: 9.6,
    places: [
      { name: "Monteverde", type: "Dinner", ordered: ["Cacio whey pepe", "Burrata e ham"] },
      { name: "RM Champagne Salon", type: "Cocktails", ordered: ["Champagne"] },
    ],
    notes: "Very strong special occasion energy. Expensive, but feels worth it.",
  },
  {
    id: "dorians-milkbar",
    title: "Wicker Park Late Night",
    neighborhood: "Wicker Park",
    price: "$$$",
    dateTypes: ["Drinks", "Dessert"],
    vibes: ["Dark", "Fun", "Lively"],
    rating: 8.8,
    places: [
      { name: "Dorian's", type: "Drinks", ordered: ["Espresso martini"] },
      { name: "Milk Bar", type: "Dessert", ordered: ["Cereal milk soft serve"] },
    ],
    notes: "Fun, younger, late-night energy. Better once you already know each other.",
  },
  {
    id: "galit-kingston",
    title: "Lincoln Park Foodie Date",
    neighborhood: "Lincoln Park",
    price: "$$$",
    dateTypes: ["Dinner", "Show"],
    vibes: ["Intimate", "Artsy", "Romantic"],
    rating: 9.2,
    places: [
      { name: "Galit", type: "Dinner", ordered: ["Hummus", "Falafel", "Salatim"] },
      { name: "Kingston Mines", type: "Show", ordered: [] },
    ],
    notes: "Dinner into blues club is elite. Great if you want the night to feel planned.",
  },
  {
    id: "avec-aviary",
    title: "Impress Them Date",
    neighborhood: "West Loop",
    price: "$$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Fancy", "Impressive", "Pretty"],
    rating: 9.7,
    places: [
      { name: "avec", type: "Dinner", ordered: ["Chorizo-stuffed dates", "Focaccia"] },
      { name: "The Aviary", type: "Cocktails", ordered: ["Signature cocktails"] },
    ],
    notes: "Very expensive but unforgettable. Best for birthdays, anniversaries, or going all out.",
  },
  {
    id: "northpond-lakefront",
    title: "Classic Chicago Romance",
    neighborhood: "Lincoln Park",
    price: "$$$$",
    dateTypes: ["Dinner", "Walk"],
    vibes: ["Romantic", "Pretty", "Intimate"],
    rating: 9.5,
    places: [
      { name: "North Pond", type: "Dinner", ordered: ["Tasting menu"] },
      { name: "Lakefront Trail", type: "Walk", ordered: [] },
    ],
    notes: "Feels like a movie. Best when the weather is nice enough for a walk after.",
  },
  {
    id: "lula-revolution",
    title: "Logan Square Cozy Date",
    neighborhood: "Logan Square",
    price: "$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Cozy", "Casual", "Cute"],
    rating: 8.9,
    places: [
      { name: "Lula Cafe", type: "Dinner", ordered: ["Pasta yia yia"] },
      { name: "Revolution Brewing", type: "Drinks", ordered: ["Beer flight"] },
    ],
    notes: "Very neighborhood-core. Good when you want something warm and easy.",
  },
  {
    id: "cindys-riverwalk",
    title: "Summer Chicago Date",
    neighborhood: "Loop",
    price: "$$$",
    dateTypes: ["Drinks", "Walk"],
    vibes: ["Pretty", "Daytime", "Romantic"],
    rating: 9.1,
    places: [
      { name: "Cindy's Rooftop", type: "Drinks", ordered: ["Frozen cocktails"] },
      { name: "Chicago Riverwalk", type: "Walk", ordered: [] },
    ],
    notes: "Amazing sunset views. Slightly touristy, but in a good way.",
  },
  {
    id: "spacca-ravenswood",
    title: "Neighborhood Pizza Night",
    neighborhood: "Ravenswood",
    price: "$$",
    dateTypes: ["Dinner"],
    vibes: ["Casual", "Cozy", "Low Pressure"],
    rating: 8.5,
    places: [
      { name: "Spacca Napoli", type: "Dinner", ordered: ["Margherita pizza", "Burrata"] },
    ],
    notes: "Easy low-stress dinner date. Great if you want quality food without making it too formal.",
  },
  {
    id: "gilt-violet",
    title: "Dark River North Date",
    neighborhood: "River North",
    price: "$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Dark", "Romantic", "Intimate"],
    rating: 9.0,
    places: [
      { name: "Gilt Bar", type: "Dinner", ordered: ["Burger", "Truffle fries"] },
      { name: "The Violet Hour", type: "Cocktails", ordered: ["House cocktails"] },
    ],
    notes: "Excellent winter energy. Dark, moody, and easy to keep the conversation going.",
  },
  {
    id: "mca-sparrow",
    title: "Gold Coast Artsy Night",
    neighborhood: "Gold Coast",
    price: "$$$",
    dateTypes: ["Activity", "Cocktails"],
    vibes: ["Artsy", "Pretty", "Cute"],
    rating: 8.8,
    places: [
      { name: "Museum of Contemporary Art", type: "Activity", ordered: [] },
      { name: "Sparrow", type: "Cocktails", ordered: ["Rum cocktails"] },
    ],
    notes: "Very aesthetic date night. Good for someone who likes design, art, and moody cocktails.",
  },
  {
    id: "bavettes-3dots",
    title: "River North Fancy Dinner + Tiki",
    neighborhood: "River North",
    price: "$$$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Romantic", "Dark", "Fun"],
    rating: 9.5,
    places: [
      { name: "Bavette's Bar & Boeuf", type: "Dinner", ordered: ["Steak frites", "Mac & cheese"] },
      { name: "Three Dots and a Dash", type: "Drinks", ordered: ["Tiki cocktails"] },
    ],
    notes: "Starts classic and sexy, ends more playful. Great if you want the night to have range.",
  },
  {
    id: "arlo-drawing-room",
    title: "Gold Coast Hotel Bar Date",
    neighborhood: "Gold Coast",
    price: "$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Fancy", "Intimate", "Pretty"],
    rating: 8.9,
    places: [
      { name: "Adalina", type: "Dinner", ordered: ["Pasta", "Burrata"] },
      { name: "The Drawing Room", type: "Cocktails", ordered: ["Martini"] },
    ],
    notes: "Polished and grown-up. Good for a dressier night without going full special occasion.",
  },
  {
    id: "andros-scofflaw",
    title: "Logan Square Dinner + Gin",
    neighborhood: "Logan Square",
    price: "$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Cozy", "Fun", "Casual"],
    rating: 9.0,
    places: [
      { name: "Andros Taverna", type: "Dinner", ordered: ["Mezze", "Greek salad", "Pita"] },
      { name: "Scofflaw", type: "Cocktails", ordered: ["Gin cocktails"] },
    ],
    notes: "Great food and not too stiff. Works well for a second or third date.",
  },
  {
    id: "lost-larson-walk",
    title: "Andersonville Coffee Walk",
    neighborhood: "Andersonville",
    price: "$",
    dateTypes: ["Coffee", "Walk"],
    vibes: ["Cute", "Daytime", "Low Pressure"],
    rating: 8.6,
    places: [
      { name: "Lost Larson", type: "Coffee", ordered: ["Cardamom bun", "Latte"] },
      { name: "Clark Street shops", type: "Walk", ordered: [] },
    ],
    notes: "Very easy first date. Low pressure, cute, and flexible if the conversation is good.",
  },
  {
    id: "beatnik-sportsmans",
    title: "West Town Pretty Drinks Night",
    neighborhood: "West Town",
    price: "$$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Pretty", "Lively", "Fun"],
    rating: 8.7,
    places: [
      { name: "Beatnik", type: "Dinner", ordered: ["Mezze", "Cocktails"] },
      { name: "Sportsman's Club", type: "Drinks", ordered: ["House cocktail"] },
    ],
    notes: "Very good if you want atmosphere and a slightly cooler neighborhood feel.",
  },
  {
    id: "zanies-oldtown",
    title: "Old Town Comedy Date",
    neighborhood: "Old Town",
    price: "$$",
    dateTypes: ["Dinner", "Show"],
    vibes: ["Fun", "Casual", "Low Pressure"],
    rating: 8.4,
    places: [
      { name: "Topo Gigio", type: "Dinner", ordered: ["Pasta", "Tiramisu"] },
      { name: "Zanies Comedy Club", type: "Show", ordered: [] },
    ],
    notes: "Good if you want built-in entertainment and don’t want to carry the whole conversation.",
  },
  {
    id: "ninebar-chinatown",
    title: "Chinatown Drinks + Bites",
    neighborhood: "Chinatown",
    price: "$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Adventurous", "Fun", "Casual"],
    rating: 8.8,
    places: [
      { name: "Qing Xiang Yuan Dumplings", type: "Dinner", ordered: ["Veggie dumplings", "Cucumber salad"] },
      { name: "Nine Bar", type: "Cocktails", ordered: ["House cocktail"] },
    ],
    notes: "Feels less obvious than the usual date-night neighborhoods. Fun and memorable.",
  },
  {
    id: "promontory-point",
    title: "Hyde Park Lake Date",
    neighborhood: "Hyde Park",
    price: "$",
    dateTypes: ["Walk", "Coffee"],
    vibes: ["Romantic", "Daytime", "Low Pressure"],
    rating: 8.7,
    places: [
      { name: "Promontory Point", type: "Walk", ordered: [] },
      { name: "Plein Air Cafe", type: "Coffee", ordered: ["Latte", "Pastry"] },
    ],
    notes: "Beautiful lake views. Best for daytime, especially when the weather is good.",
  },
  {
    id: "middlebrow-bestintentions",
    title: "Logan Square Pizza + Dive Bar",
    neighborhood: "Logan Square",
    price: "$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Casual", "Fun", "Low Pressure"],
    rating: 8.6,
    places: [
      { name: "Middle Brow Bungalow", type: "Dinner", ordered: ["Pizza", "Natural wine"] },
      { name: "Best Intentions", type: "Drinks", ordered: ["Cocktails"] },
    ],
    notes: "Very easygoing. Good if you want something cool but not too polished.",
  },
  {
    id: "gibsons-sparrow",
    title: "Classic Gold Coast Night",
    neighborhood: "Gold Coast",
    price: "$$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Fancy", "Dark", "Impressive"],
    rating: 8.9,
    places: [
      { name: "Gibsons Bar & Steakhouse", type: "Dinner", ordered: ["Steak", "Loaded baked potato"] },
      { name: "Sparrow", type: "Cocktails", ordered: ["Daiquiri"] },
    ],
    notes: "Old-school Chicago energy. Good for someone who likes classic, not trendy.",
  },
  {
    id: "parsons-estereo",
    title: "Patio Drinks Date",
    neighborhood: "Logan Square",
    price: "$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Casual", "Lively", "Fun"],
    rating: 8.3,
    places: [
      { name: "Parson's Chicken & Fish", type: "Dinner", ordered: ["Hush puppies", "Negroni slushie"] },
      { name: "Estereo", type: "Drinks", ordered: ["Cocktails"] },
    ],
    notes: "Best for warm weather. Casual, social, and good if you want playful energy.",
  },
  {
    id: "boka-kingston",
    title: "Lincoln Park Fancy + Blues",
    neighborhood: "Lincoln Park",
    price: "$$$$",
    dateTypes: ["Dinner", "Show"],
    vibes: ["Romantic", "Fancy", "Artsy"],
    rating: 9.3,
    places: [
      { name: "Boka", type: "Dinner", ordered: ["Seasonal tasting menu"] },
      { name: "Kingston Mines", type: "Show", ordered: [] },
    ],
    notes: "Fancy dinner then music makes it feel like a real planned evening.",
  },
  {
    id: "jibaritos-humboldt",
    title: "Casual Humboldt Park Date",
    neighborhood: "Humboldt Park",
    price: "$",
    dateTypes: ["Dinner", "Walk"],
    vibes: ["Casual", "Fun", "Low Pressure"],
    rating: 8.2,
    places: [
      { name: "Jibaritos y Mas", type: "Dinner", ordered: ["Jibarito", "Tostones"] },
      { name: "Humboldt Park", type: "Walk", ordered: [] },
    ],
    notes: "Affordable, casual, and different from a generic dinner date.",
  },
];

const allVibes = [
  "Romantic",
  "Pretty",
  "Lively",
  "Cozy",
  "Dark",
  "Fun",
  "Cute",
  "Daytime",
  "Artsy",
  "Fancy",
  "Casual",
  "Intimate",
  "Impressive",
  "Low Pressure",
  "Adventurous",
];

const allTypes = [
  "Dinner",
  "Drinks",
  "Cocktails",
  "Coffee",
  "Dessert",
  "Activity",
  "Walk",
  "Brunch",
  "Museum",
  "Show",
  "Rooftop",
];

const allNeighborhoods = [
  "West Loop",
  "River North",
  "Loop",
  "Logan Square",
  "Wicker Park",
  "Lincoln Park",
  "Lakeview",
  "Gold Coast",
  "Hyde Park",
  "Andersonville",
  "Chinatown",
  "Ravenswood",
  "West Town",
  "Old Town",
  "Humboldt Park",
  "Other",
];

const allPrices = ["$", "$$", "$$$", "$$$$"];

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
  Fancy: "bg-fuchsia-100 text-fuchsia-700",
  Casual: "bg-green-100 text-green-700",
  Intimate: "bg-red-100 text-red-700",
  Impressive: "bg-violet-100 text-violet-700",
  "Low Pressure": "bg-teal-100 text-teal-700",
  Adventurous: "bg-lime-100 text-lime-700",
};

function emptyForm() {
  return {
    title: "",
    neighborhood: "West Loop",
    price: "$$",
    dateTypes: ["Dinner"],
    vibes: ["Romantic"],
    rating: "8.5",
    places: [
      { name: "", type: "Dinner", orderedText: "" },
      { name: "", type: "Drinks", orderedText: "" },
    ],
    notes: "",
  };
}

export default function App() {
  const [dates, setDates] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : starterDates;
    } catch {
      return starterDates;
    }
  });

  const [selectedVibe, setSelectedVibe] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  }, [dates]);

  const vibes = useMemo(() => ["All", ...new Set(dates.flatMap((p) => p.vibes))], [dates]);
  const types = useMemo(() => ["All", ...new Set(dates.flatMap((p) => p.dateTypes))], [dates]);
  const neighborhoods = useMemo(() => ["All", ...new Set(dates.map((p) => p.neighborhood))], [dates]);
  const prices = useMemo(() => ["All", ...new Set(dates.map((p) => p.price))], [dates]);

  const filtered = dates.filter((date) => {
    return (
      (selectedVibe === "All" || date.vibes.includes(selectedVibe)) &&
      (selectedType === "All" || date.dateTypes.includes(selectedType)) &&
      (selectedNeighborhood === "All" || date.neighborhood === selectedNeighborhood) &&
      (selectedPrice === "All" || date.price === selectedPrice)
    );
  });

  function toggleArrayValue(field, value) {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      const next = exists ? prev[field].filter((item) => item !== value) : [...prev[field], value];
      return { ...prev, [field]: next.length ? next : [value] };
    });
  }

  function updatePlace(index, field, value) {
    setForm((prev) => ({
      ...prev,
      places: prev.places.map((place, i) => (i === index ? { ...place, [field]: value } : place)),
    }));
  }

  function addStop() {
    setForm((prev) => ({
      ...prev,
      places: [...prev.places, { name: "", type: "Activity", orderedText: "" }],
    }));
  }

  function removeStop(index) {
    setForm((prev) => ({
      ...prev,
      places: prev.places.length === 1 ? prev.places : prev.places.filter((_, i) => i !== index),
    }));
  }

  function submitDate(e) {
    e.preventDefault();

    const cleanPlaces = form.places
      .filter((place) => place.name.trim())
      .map((place) => ({
        name: place.name.trim(),
        type: place.type,
        ordered: place.orderedText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }));

    const newDate = {
      id: `${Date.now()}`,
      title: form.title.trim() || "Untitled Date Night",
      neighborhood: form.neighborhood,
      price: form.price,
      dateTypes: form.dateTypes,
      vibes: form.vibes,
      rating: Number(form.rating) || 8,
      places: cleanPlaces.length ? cleanPlaces : [{ name: "TBD", type: "Activity", ordered: [] }],
      notes: form.notes.trim() || "No notes yet.",
    };

    setDates((prev) => [newDate, ...prev]);
    setForm(emptyForm());
    setIsModalOpen(false);
  }

  function deleteDate(id) {
    setDates((prev) => prev.filter((date) => date.id !== id));
  }

  function resetDemoData() {
    setDates(starterDates);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(starterDates));
  }

  return (
    <div className="min-h-screen bg-[#f7f2e9] text-[#172033]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#10182A] px-6 py-5 text-white shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-xl font-black">
              D
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">DateRank Chicago</h1>
              <p className="text-sm text-slate-400">Rank full date nights, not just places.</p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-orange-600"
          >
            + Add Date
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <section className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                Plan a date
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Find a date night that matches the vibe
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Filter saved date nights by activity, neighborhood, price, and vibe.
              </p>
            </div>

            <button
              onClick={resetDemoData}
              className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 hover:bg-slate-200"
            >
              Reset demo data
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Select label="Date type" value={selectedType} onChange={setSelectedType} options={types} />
            <Select label="Neighborhood" value={selectedNeighborhood} onChange={setSelectedNeighborhood} options={neighborhoods} />
            <Select label="Price" value={selectedPrice} onChange={setSelectedPrice} options={prices} />
            <Select label="Vibe" value={selectedVibe} onChange={setSelectedVibe} options={vibes} />
          </div>
        </section>

        {filtered.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <h3 className="text-2xl font-black">No matching dates yet</h3>
            <p className="mt-2 text-slate-500">
              Try different filters or add a new date with those attributes.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filtered.map((date) => (
              <DateCard key={date.id} date={date} onDelete={deleteDate} />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <form onSubmit={submitDate} className="mx-auto my-8 max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                  Add a date
                </p>
                <h2 className="mt-2 text-3xl font-black">Log a full date night</h2>
                <p className="mt-1 text-sm text-slate-500">
                  This saves locally in this browser for now. Supabase can sync it across devices later.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-xl font-black hover:bg-slate-200"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Date title"
                value={form.title}
                onChange={(value) => setForm({ ...form, title: value })}
                placeholder="West Loop dinner + drinks"
              />
              <Field
                label="Rating"
                value={form.rating}
                onChange={(value) => setForm({ ...form, rating: value })}
                placeholder="9.2"
              />
              <Select
                label="Neighborhood"
                value={form.neighborhood}
                onChange={(value) => setForm({ ...form, neighborhood: value })}
                options={allNeighborhoods}
              />
              <Select
                label="Price"
                value={form.price}
                onChange={(value) => setForm({ ...form, price: value })}
                options={allPrices}
              />
            </div>

            <ChipSection
              title="What did the date include?"
              options={allTypes}
              selected={form.dateTypes}
              onToggle={(value) => toggleArrayValue("dateTypes", value)}
            />

            <ChipSection
              title="What was the vibe?"
              options={allVibes}
              selected={form.vibes}
              onToggle={(value) => toggleArrayValue("vibes", value)}
            />

            <div className="mt-6 rounded-[2rem] bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-black">Stops / places</h3>
                <button
                  type="button"
                  onClick={addStop}
                  className="rounded-2xl bg-[#172033] px-4 py-2 text-sm font-black text-white"
                >
                  + Add stop
                </button>
              </div>

              <div className="space-y-4">
                {form.places.map((place, index) => (
                  <div key={index} className="rounded-3xl bg-white p-4 ring-1 ring-slate-200">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-black text-orange-500">Stop {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeStop(index)}
                        className="text-sm font-bold text-slate-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[1fr_160px]">
                      <Field
                        label="Place name"
                        value={place.name}
                        onChange={(value) => updatePlace(index, "name", value)}
                        placeholder="Aba"
                      />
                      <Select
                        label="Type"
                        value={place.type}
                        onChange={(value) => updatePlace(index, "type", value)}
                        options={allTypes}
                      />
                    </div>

                    <Field
                      label="What did you order / do?"
                      value={place.orderedText}
                      onChange={(value) => updatePlace(index, "orderedText", value)}
                      placeholder="Whipped feta, espresso martini, walk by the river"
                    />
                  </div>
                ))}
              </div>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-black text-slate-700">Notes</span>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="What made this date good? Who is it best for? Any watch-outs?"
                className="min-h-28 w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
              >
                Add date to list
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-slate-50 px-4 py-4 font-bold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400"
      />
    </label>
  );
}

function ChipSection({ title, options, selected, onToggle }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-black text-slate-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                active ? "bg-[#172033] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateCard({ date, onDelete }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            {date.neighborhood}
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight">{date.title}</h2>
          <p className="mt-2 text-sm font-bold text-slate-500">
            {date.price} · {date.dateTypes.join(" + ")}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="rounded-2xl bg-amber-50 px-4 py-3 text-xl font-black text-amber-600">
            ★ {date.rating}
          </div>
          <button
            onClick={() => onDelete(date.id)}
            className="text-xs font-black text-slate-400 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {date.vibes.map((vibe) => (
          <span
            key={vibe}
            className={`rounded-full px-3 py-1 text-xs font-black ${
              vibeColors[vibe] || "bg-slate-100 text-slate-700"
            }`}
          >
            #{vibe}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {date.places.map((place, idx) => (
          <div key={`${place.name}-${idx}`} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#172033] font-black text-white">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-black">{place.name}</h3>
                <p className="text-sm font-semibold text-slate-500">{place.type}</p>
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
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Notes</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">{date.notes}</p>
      </div>
    </div>
  );
}
