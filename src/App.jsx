import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./utils/supabase.js";

const exploreDates = [
  {
    id: "explore-aba-lazybird",
    user: "Maya",
    avatar: "M",
    title: "West Loop Dinner + Drinks",
    neighborhood: "West Loop",
    price: "$$$",
    dateTypes: ["Dinner", "Drinks"],
    vibes: ["Romantic", "Pretty", "Lively"],
    rating: 9.4,
    estimatedTotalCost: "$120–$180",
    places: [
      { name: "Aba", type: "Dinner", ordered: ["Whipped feta", "Short rib hummus", "Crispy potatoes"] },
      { name: "Lazy Bird", type: "Drinks", ordered: ["Espresso martini"] },
    ],
    notes: "Perfect second date energy. Feels impressive but not too serious.",
  },
  {
    id: "explore-quartino-violet",
    user: "Sofia",
    avatar: "S",
    title: "River North Cozy Night",
    neighborhood: "River North",
    price: "$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Cozy", "Dark", "Fun"],
    rating: 8.9,
    estimatedTotalCost: "$70–$120",
    places: [
      { name: "Quartino", type: "Dinner", ordered: ["Truffle pizza", "Carbonara"] },
      { name: "The Violet Hour", type: "Cocktails", ordered: ["Custom cocktails"] },
    ],
    notes: "Great for winter dates and long conversations.",
  },
  {
    id: "explore-museum-date",
    user: "Arjun",
    avatar: "A",
    title: "Cute Day Date",
    neighborhood: "Loop",
    price: "$$",
    dateTypes: ["Activity", "Coffee"],
    vibes: ["Cute", "Daytime", "Artsy"],
    rating: 8.7,
    estimatedTotalCost: "$50–$90",
    places: [
      { name: "Art Institute of Chicago", type: "Activity", ordered: [] },
      { name: "Sawada Coffee", type: "Coffee", ordered: ["Military latte"] },
    ],
    notes: "Ideal first date because there’s always something to talk about.",
  },
  {
    id: "explore-monteverde-rm",
    user: "Lena",
    avatar: "L",
    title: "West Loop Pasta Night",
    neighborhood: "West Loop",
    price: "$$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Romantic", "Fancy", "Impressive"],
    rating: 9.6,
    estimatedTotalCost: "$180+",
    places: [
      { name: "Monteverde", type: "Dinner", ordered: ["Cacio whey pepe", "Burrata e ham"] },
      { name: "RM Champagne Salon", type: "Cocktails", ordered: ["Champagne"] },
    ],
    notes: "Very strong special occasion energy. Expensive, but feels worth it.",
  },
  {
    id: "explore-dorians-milkbar",
    user: "Priya",
    avatar: "P",
    title: "Wicker Park Late Night",
    neighborhood: "Wicker Park",
    price: "$$$",
    dateTypes: ["Drinks", "Dessert"],
    vibes: ["Dark", "Fun", "Lively"],
    rating: 8.8,
    estimatedTotalCost: "$80–$130",
    places: [
      { name: "Dorian's", type: "Drinks", ordered: ["Espresso martini"] },
      { name: "Milk Bar", type: "Dessert", ordered: ["Cereal milk soft serve"] },
    ],
    notes: "Fun, younger, late-night energy. Better once you already know each other.",
  },
  {
    id: "explore-galit-kingston",
    user: "Noah",
    avatar: "N",
    title: "Lincoln Park Foodie Date",
    neighborhood: "Lincoln Park",
    price: "$$$",
    dateTypes: ["Dinner", "Show"],
    vibes: ["Intimate", "Artsy", "Romantic"],
    rating: 9.2,
    estimatedTotalCost: "$140–$220",
    places: [
      { name: "Galit", type: "Dinner", ordered: ["Hummus", "Falafel", "Salatim"] },
      { name: "Kingston Mines", type: "Show", ordered: [] },
    ],
    notes: "Dinner into blues club is elite. Great if you want the night to feel planned.",
  },
  {
    id: "explore-avec-aviary",
    user: "Emma",
    avatar: "E",
    title: "Impress Them Date",
    neighborhood: "West Loop",
    price: "$$$$",
    dateTypes: ["Dinner", "Cocktails"],
    vibes: ["Fancy", "Impressive", "Pretty"],
    rating: 9.7,
    estimatedTotalCost: "$220+",
    places: [
      { name: "avec", type: "Dinner", ordered: ["Chorizo-stuffed dates", "Focaccia"] },
      { name: "The Aviary", type: "Cocktails", ordered: ["Signature cocktails"] },
    ],
    notes: "Very expensive but unforgettable. Best for birthdays, anniversaries, or going all out.",
  },
  {
    id: "explore-northpond-lakefront",
    user: "Jordan",
    avatar: "J",
    title: "Classic Chicago Romance",
    neighborhood: "Lincoln Park",
    price: "$$$$",
    dateTypes: ["Dinner", "Walk"],
    vibes: ["Romantic", "Pretty", "Intimate"],
    rating: 9.5,
    estimatedTotalCost: "$180+",
    places: [
      { name: "North Pond", type: "Dinner", ordered: ["Tasting menu"] },
      { name: "Lakefront Trail", type: "Walk", ordered: [] },
    ],
    notes: "Feels like a movie. Best when the weather is nice enough for a walk after.",
  },
];

const allVibes = ["Romantic", "Pretty", "Lively", "Cozy", "Dark", "Fun", "Cute", "Daytime", "Artsy", "Fancy", "Casual", "Intimate", "Impressive", "Low Pressure", "Adventurous"];
const allTypes = ["Dinner", "Lunch", "Drinks", "Cocktails", "Coffee", "Dessert", "Activity", "Walk", "Brunch", "Museum", "Show", "Rooftop"];
const allNeighborhoods = ["West Loop", "River North", "Loop", "Logan Square", "Wicker Park", "Lincoln Park", "Lakeview", "Gold Coast", "Hyde Park", "Andersonville", "Chinatown", "Ravenswood", "West Town", "Old Town", "Humboldt Park", "Other"];
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
    estimatedTotalCost: "",
    places: [
      { name: "", type: "Dinner", orderedText: "" },
      { name: "", type: "Drinks", orderedText: "" },
    ],
    notes: "",
  };
}

function formFromDate(date) {
  return {
    title: date.title || "",
    neighborhood: date.neighborhood || "West Loop",
    price: date.price || "$$",
    dateTypes: date.dateTypes || ["Dinner"],
    vibes: date.vibes || ["Romantic"],
    rating: String(date.rating || "8.5"),
    estimatedTotalCost: date.estimatedTotalCost || "",
    places: (date.places || []).map((place) => ({
      name: place.name || "",
      type: place.type || "Activity",
      orderedText: (place.ordered || []).join(", "),
    })),
    notes: date.notes || "",
  };
}

function cleanDatePayload(form) {
  const cleanPlaces = form.places
    .filter((place) => place.name.trim())
    .map((place) => ({
      name: place.name.trim(),
      type: place.type,
      ordered: place.orderedText.split(",").map((item) => item.trim()).filter(Boolean),
    }));

  return {
    title: form.title.trim() || "Untitled Date Night",
    neighborhood: form.neighborhood,
    estimatedTotalCost: form.estimatedTotalCost.trim() || estimateCostFromPrice(form.price),
    price: form.price,
    dateTypes: form.dateTypes,
    vibes: form.vibes,
    rating: Number(form.rating) || 8,
    places: cleanPlaces.length ? cleanPlaces : [{ name: "TBD", type: "Activity", ordered: [] }],
    notes: form.notes.trim() || "No notes yet.",
  };
}

export default function App() {
  const [activePage, setActivePage] = useState("myDates");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [myDates, setMyDates] = useState([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("Highest rated");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDate, setEditingDate] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [likedExploreDates, setLikedExploreDates] = useState({});
  const [exploreLikeCounts, setExploreLikeCounts] = useState({});
  const [comments, setComments] = useState({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [connectionsModal, setConnectionsModal] = useState(null);
  const [peopleSearch, setPeopleSearch] = useState("");
  const [peopleResults, setPeopleResults] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(null);
  const [viewingProfileDates, setViewingProfileDates] = useState([]);
  const [viewingProfileLoading, setViewingProfileLoading] = useState(false);
  const [publicExploreDates, setPublicExploreDates] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (!session?.user) {
        setMyDates([]);
        setProfile(null);
        setFollowersList([]);
        setFollowingList([]);
        setViewingProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    loadMyDates();
    loadProfile();
    loadPublicExploreDates();
    loadSocialData();
  }, [user]);

  async function loadProfile() {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setProfile(data);
      return;
    }

    const emailName = user.email?.split("@")[0] || "datefan";
    const defaultProfile = {
      id: user.id,
      email: user.email,
      username: `${emailName}${String(user.id).slice(0, 4)}`.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase(),
      display_name: emailName,
    };

    const { data: inserted, error: insertError } = await supabase.from("profiles").insert(defaultProfile).select().single();

    if (insertError) {
      console.error(insertError);
    } else {
      setProfile(inserted);
    }
  }

  async function updateProfile(nextProfile) {
    const cleanUsername = nextProfile.username.trim().replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();

    if (!cleanUsername) {
      alert("Please enter a username using letters, numbers, or underscores.");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: cleanUsername,
        display_name: nextProfile.display_name.trim() || cleanUsername,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      alert(error.message);
    } else {
      setProfile(data);
      setIsProfileOpen(false);
    }
  }

  async function loadSocialData() {
    const { data: follows, error } = await supabase
      .from("follows")
      .select("*")
      .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

    if (error) {
      console.error(error);
      return;
    }

    const followerIds = (follows || []).filter((f) => f.following_id === user.id).map((f) => f.follower_id);
    const followingIds = (follows || []).filter((f) => f.follower_id === user.id).map((f) => f.following_id);
    const allIds = [...new Set([...followerIds, ...followingIds])];

    if (!allIds.length) {
      setFollowersList([]);
      setFollowingList([]);
      return;
    }

    const { data: profilesData, error: profileError } = await supabase.from("profiles").select("*").in("id", allIds);

    if (profileError) {
      console.error(profileError);
      return;
    }

    const byId = Object.fromEntries((profilesData || []).map((p) => [p.id, p]));
    setFollowersList(followerIds.map((id) => byId[id]).filter(Boolean));
    setFollowingList(followingIds.map((id) => byId[id]).filter(Boolean));
  }

  async function searchPeople(query = peopleSearch) {
    const clean = query.trim();
    if (!clean) {
      setPeopleResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`username.ilike.%${clean}%,display_name.ilike.%${clean}%`)
      .neq("id", user.id)
      .limit(20);

    if (error) {
      alert(error.message);
      return;
    }

    setPeopleResults(data || []);
  }

  async function openPublicProfile(person) {
    if (!person) return;
    setConnectionsModal(null);
    setViewingProfile(person);
    setViewingProfileLoading(true);

    const { data, error } = await supabase
      .from("dates")
      .select("*")
      .eq("user_id", person.id)
      .eq("is_public", true)
      .order("public_at", { ascending: false });

    if (error) {
      alert(error.message);
      setViewingProfileDates([]);
    } else {
      setViewingProfileDates((data || []).map(rowToDate));
    }

    setViewingProfileLoading(false);
  }

  async function openPublicProfileById(profileId) {
    if (!profileId || profileId === user.id) return;

    const { data: person, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profileId)
      .maybeSingle();

    if (error) {
      alert(error.message);
      return;
    }

    if (!person) {
      alert("Could not find that profile.");
      return;
    }

    await openPublicProfile(person);
  }

  async function toggleFollow(person) {
    if (!person || person.id === user.id) return;
    const alreadyFollowing = followingList.some((p) => p.id === person.id);

    if (alreadyFollowing) {
      const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", person.id);
      if (error) {
        alert(error.message);
        return;
      }
      setFollowingList((prev) => prev.filter((p) => p.id !== person.id));
    } else {
      const { error } = await supabase.from("follows").insert({ follower_id: user.id, following_id: person.id });
      if (error) {
        alert(error.message);
        return;
      }
      setFollowingList((prev) => [...prev, person]);
    }
  }

  async function loadMyDates() {
    setLoadingDates(true);

    const { data, error } = await supabase
      .from("dates")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoadingDates(false);
      return;
    }

    setMyDates((data || []).map(rowToDate));
    setLoadingDates(false);
  }

  async function loadPublicExploreDates() {
    const { data, error } = await supabase
      .from("dates")
      .select("*")
      .eq("is_public", true)
      .order("public_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("Explore load error:", error);
      return;
    }

    const rows = data || [];
    const userIds = [...new Set(rows.map((row) => row.user_id).filter(Boolean))];

    let profilesById = {};
    if (userIds.length) {
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds);

      if (profilesError) {
        console.error("Explore profile load error:", profilesError);
      } else {
        profilesById = Object.fromEntries((profilesData || []).map((person) => [person.id, person]));
      }
    }

    const publicDates = rows.map((row) => {
      const date = rowToDate(row);
      const person = profilesById[row.user_id];
      const displayName = person?.display_name || person?.username || "User";
      return {
        ...date,
        user: displayName,
        avatar: displayName?.[0]?.toUpperCase() || "U",
        sourceUserId: row.user_id,
        sourceProfile: person || null,
      };
    });

    setPublicExploreDates(publicDates);
    await loadExploreEngagement([...exploreDates, ...publicDates]);
  }

  async function loadExploreEngagement(sourceDates = [...exploreDates, ...publicExploreDates]) {
    const ids = sourceDates.map((date) => String(date.id));

    const [{ data: likes }, { data: allComments }] = await Promise.all([
      supabase.from("explore_likes").select("*").in("explore_date_id", ids),
      supabase.from("explore_comments").select("*, profiles(display_name, username)").in("explore_date_id", ids).order("created_at", { ascending: true }),
    ]);

    const userLikes = {};
    const likeCounts = {};
    (likes || []).forEach((like) => {
      likeCounts[like.explore_date_id] = (likeCounts[like.explore_date_id] || 0) + 1;
      if (like.user_id === user.id) userLikes[like.explore_date_id] = true;
    });

    const groupedComments = {};
    (allComments || []).forEach((comment) => {
      const name = comment.profiles?.display_name || comment.profiles?.username || "User";
      groupedComments[comment.explore_date_id] = [
        ...(groupedComments[comment.explore_date_id] || []),
        { id: comment.id, user: name, text: comment.text },
      ];
    });

    setLikedExploreDates(userLikes);
    setExploreLikeCounts(likeCounts);
    setComments(groupedComments);
  }

  const followingFeedDates = useMemo(() => {
    const followingIds = new Set(followingList.map((person) => person.id));
    return publicExploreDates.filter((date) => followingIds.has(date.sourceUserId));
  }, [publicExploreDates, followingList]);

  const exploreFeedDates = useMemo(
    () => [...publicExploreDates, ...(exploreDates || [])],
    [publicExploreDates]
  );

  const currentDates =
    activePage === "myDates"
      ? myDates
      : activePage === "following"
        ? followingFeedDates
        : exploreFeedDates;
  
  const enrichedDates = useMemo(() => {
    return currentDates.map((date, index) => {
      const baseLikes = (activePage === "explore" || activePage === "following") ? getBaseLikes(date.id, index + 1) : 0;
      const baseComments = (activePage === "explore" || activePage === "following") ? getBaseComments(date.id, index + 1) : 0;
      return {
        ...date,
        likeCount: baseLikes + (exploreLikeCounts[date.id] || 0),
        commentCount: baseComments + (comments[date.id]?.length || 0),
        saved: false,
      };
    });
  }, [currentDates, activePage, exploreLikeCounts, comments]);

  const filterOptions = useMemo(() => {
    const source = currentDates.length ? currentDates : exploreFeedDates;
    return {
      vibes: ["All", ...new Set(source.flatMap((p) => p.vibes || []))],
      types: ["All", ...new Set(source.flatMap((p) => p.dateTypes || []))],
      neighborhoods: ["All", ...new Set(source.map((p) => p.neighborhood).filter(Boolean))],
      prices: ["All", ...new Set(source.map((p) => p.price).filter(Boolean))],
    };
  }, [currentDates, exploreFeedDates]);

  const filtered = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return enrichedDates
      .filter((date) => {
        const searchable = [
          date.title,
          date.neighborhood,
          date.price,
          date.notes,
          ...date.dateTypes,
          ...date.vibes,
          ...date.places.flatMap((p) => [p.name, p.type, ...(p.ordered || [])]),
        ].join(" ").toLowerCase();

        return (
          (!searchText || searchable.includes(searchText)) &&
          (selectedVibe === "All" || date.vibes.includes(selectedVibe)) &&
          (selectedType === "All" || date.dateTypes.includes(selectedType)) &&
          (selectedNeighborhood === "All" || date.neighborhood === selectedNeighborhood) &&
          (selectedPrice === "All" || date.price === selectedPrice)
        );
      })
      .sort((a, b) => {
        if (sortBy === "Highest rated") return Number(b.rating || 0) - Number(a.rating || 0);
        if (sortBy === "Most liked") return Number(b.likeCount || 0) - Number(a.likeCount || 0);
        if (sortBy === "Most commented") return Number(b.commentCount || 0) - Number(a.commentCount || 0);
        if (sortBy === "Cheapest") return a.price.length - b.price.length;
        if (sortBy === "Most expensive") return b.price.length - a.price.length;
        if (sortBy === "Newest") return String(b.created_at || b.id).localeCompare(String(a.created_at || a.id));
        return 0;
      });
  }, [enrichedDates, search, selectedVibe, selectedType, selectedNeighborhood, selectedPrice, sortBy]);

  const kpis = useMemo(() => buildKpis(currentDates), [currentDates]);

  const pageLabel = activePage === "myDates" ? "Your Dates" : activePage === "following" ? "Following" : "Explore";
  const pageTitle = activePage === "myDates" ? "Your ranked date nights" : activePage === "following" ? "Dates from people you follow" : "Find your next date idea";
  const pageDescription =
    activePage === "myDates"
      ? "Track your own dates, edit them anytime, and see them on every device."
      : activePage === "following"
        ? "Keep up with public date ideas posted by accounts you follow."
        : "Browse Chicago date ideas, like your favorites, comment, or copy them into your own list.";
  const kpiCountLabel = activePage === "myDates" ? "Dates logged" : activePage === "following" ? "Following posts" : "Explore posts";
  const kpiCountHelper = activePage === "myDates" ? "Your saved date nights" : activePage === "following" ? "From followed accounts" : "Public inspo posts";

  function resetFilters() {
    setSelectedVibe("All");
    setSelectedType("All");
    setSelectedNeighborhood("All");
    setSelectedPrice("All");
    setSearch("");
  }

  function openAddModal() {
    setEditingDate(null);
    setForm(emptyForm());
    setIsModalOpen(true);
  }

  function openEditModal(date) {
    setEditingDate(date);
    setForm(formFromDate(date));
    setIsModalOpen(true);
  }

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

  async function submitDate(e) {
    e.preventDefault();

    const payload = cleanDatePayload(form);

    if (editingDate) {
      const { data, error } = await supabase
        .from("dates")
        .update({
          title: payload.title,
          neighborhood: payload.neighborhood,
          price: payload.price,
          date_types: payload.dateTypes,
          vibes: payload.vibes,
          rating: payload.rating,
          estimated_total_cost: payload.estimatedTotalCost,
          places: payload.places,
          notes: payload.notes,
          is_public: editingDate.isPublic || false,
        })
        .eq("id", editingDate.id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setMyDates((prev) => prev.map((date) => (date.id === editingDate.id ? rowToDate(data) : date)));
    } else {
      const { data, error } = await supabase
        .from("dates")
        .insert({
          user_id: user.id,
          title: payload.title,
          neighborhood: payload.neighborhood,
          price: payload.price,
          date_types: payload.dateTypes,
          vibes: payload.vibes,
          rating: payload.rating,
          estimated_total_cost: payload.estimatedTotalCost,
          places: payload.places,
          notes: payload.notes,
          is_public: false,
          posted_to_explore: false,
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setMyDates((prev) => [rowToDate(data), ...prev]);
    }

    setForm(emptyForm());
    setEditingDate(null);
    setIsModalOpen(false);
    setActivePage("myDates");
    resetFilters();
  }

  async function deleteDate(id) {
    const { error } = await supabase.from("dates").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      alert(error.message);
      return;
    }
    setMyDates((prev) => prev.filter((date) => date.id !== id));
  }

  async function clearMyDates() {
    if (!window.confirm("Delete all your saved dates?")) return;
    const { error } = await supabase.from("dates").delete().eq("user_id", user.id);
    if (error) {
      alert(error.message);
      return;
    }
    setMyDates([]);
  }

  async function togglePostToExplore(date) {
    const nextPublic = !date.isPublic;
    const { data, error } = await supabase
      .from("dates")
      .update({
        is_public: nextPublic,
        posted_to_explore: nextPublic,
        public_at: nextPublic ? new Date().toISOString() : null,
      })
      .eq("id", date.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const updatedDate = rowToDate(data);
    setMyDates((prev) => prev.map((item) => (item.id === date.id ? updatedDate : item)));
    await loadPublicExploreDates();
    alert(nextPublic ? "Posted to Explore!" : "Removed from Explore.");
  }

  async function toggleExploreLike(id) {
    if (likedExploreDates[id]) {
      const { error } = await supabase.from("explore_likes").delete().eq("user_id", user.id).eq("explore_date_id", id);
      if (error) {
        alert(error.message);
        return;
      }
      setLikedExploreDates((prev) => ({ ...prev, [id]: false }));
      setExploreLikeCounts((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 0) }));
    } else {
      const { error } = await supabase.from("explore_likes").insert({ user_id: user.id, explore_date_id: id });
      if (error) {
        alert(error.message);
        return;
      }
      setLikedExploreDates((prev) => ({ ...prev, [id]: true }));
      setExploreLikeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  }

  async function addComment(id, text) {
    const clean = text.trim();
    if (!clean) return;

    const { data, error } = await supabase
      .from("explore_comments")
      .insert({ user_id: user.id, explore_date_id: id, text: clean })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { user: profile?.display_name || profile?.username || "You", text: clean, id: data.id }],
    }));
  }

  async function addExploreToMyDates(date) {
    const copied = {
      ...date,
      notes: `${date.notes} Saved from Explore.`,
    };

    const { data, error } = await supabase
      .from("dates")
      .insert({
        user_id: user.id,
        title: copied.title,
        neighborhood: copied.neighborhood,
        price: copied.price,
        date_types: copied.dateTypes,
        vibes: copied.vibes,
        rating: copied.rating,
        estimated_total_cost: copied.estimatedTotalCost || estimateCostFromPrice(copied.price),
        places: copied.places,
        notes: copied.notes,
        is_public: false,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setMyDates((prev) => [rowToDate(data), ...prev]);
    setActivePage("myDates");
    resetFilters();
  }

  if (!user) {
    return <AuthGate />;
  }

  return (
    <div className="min-h-screen bg-[#eef7ff] pb-24 text-[#172033] md:pb-0">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#10182A]/95 px-4 py-4 text-white shadow-xl backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-xl font-black shadow-lg md:h-12 md:w-12">♡</div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-black tracking-tight md:text-2xl">IT’S A DATE</h1>
              <p className="hidden text-sm text-slate-400 sm:block">Rank full date nights, not just places.</p>
            </div>
          </div>

          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <NavButton active={activePage === "myDates"} onClick={() => { setActivePage("myDates"); resetFilters(); }}>Your Dates</NavButton>
            <NavButton active={activePage === "explore"} onClick={() => { setActivePage("explore"); resetFilters(); }}>Explore</NavButton>
            <NavButton active={activePage === "following"} onClick={() => { setActivePage("following"); resetFilters(); }}>Following</NavButton>
            <button onClick={openAddModal} className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-orange-600">
              + Add Date
            </button>
            <UserMenu user={user} profile={profile} onProfile={() => setIsProfileOpen(true)} />
          </div>

          <div className="flex gap-2 md:hidden">
            <button onClick={() => setIsProfileOpen(true)} className="rounded-2xl bg-white/10 px-3 py-3 text-xs font-black text-white">
              {profile?.display_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
            </button>
            <button onClick={openAddModal} className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-white shadow-lg">
              +
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-3 md:p-6">
        <section className="mb-5 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="bg-gradient-to-br from-[#172033] to-[#26395f] p-5 text-white md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300 md:text-sm">{pageLabel}</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">
              {pageTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              {pageDescription}
            </p>
          </div>

          <div className="p-4 md:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr]">
              <Field label="Search" value={search} onChange={setSearch} placeholder="Search pasta, romantic, West Loop..." />
              <Select label="Sort by" value={sortBy} onChange={setSortBy} options={["Highest rated", "Most liked", "Most commented", "Cheapest", "Most expensive", "Newest"]} />
              <Select label="Type" value={selectedType} onChange={setSelectedType} options={filterOptions.types} />
              <Select label="Neighborhood" value={selectedNeighborhood} onChange={setSelectedNeighborhood} options={filterOptions.neighborhoods} />
              <Select label="Price" value={selectedPrice} onChange={setSelectedPrice} options={filterOptions.prices} />
              <Select label="Vibe" value={selectedVibe} onChange={setSelectedVibe} options={filterOptions.vibes} />
            </div>
          </div>
        </section>

        {!viewingProfile && activePage !== "myDates" && (
          <div className="mb-5 flex flex-wrap gap-2 rounded-[2rem] bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <button
              onClick={() => { setActivePage("explore"); resetFilters(); }}
              className={`rounded-2xl px-5 py-3 text-sm font-black ${activePage === "explore" ? "bg-[#172033] text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              Explore everyone
            </button>
            <button
              onClick={() => { setActivePage("following"); resetFilters(); }}
              className={`rounded-2xl px-5 py-3 text-sm font-black ${activePage === "following" ? "bg-[#172033] text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              Following feed
            </button>
          </div>
        )}

        {activePage === "myDates" && !viewingProfile && (
          <SocialHeaderCard
            profile={profile}
            followersCount={followersList.length}
            followingCount={followingList.length}
            onFollowers={() => setConnectionsModal("followers")}
            onFollowing={() => setConnectionsModal("following")}
            onFindPeople={() => setConnectionsModal("find")}
            onEditProfile={() => setIsProfileOpen(true)}
          />
        )}

        {viewingProfile ? (
          <PublicProfilePage
            person={viewingProfile}
            dates={viewingProfileDates}
            loading={viewingProfileLoading}
            isFollowing={followingList.some((p) => p.id === viewingProfile.id)}
            onBack={() => { setViewingProfile(null); setViewingProfileDates([]); }}
            onToggleFollow={() => toggleFollow(viewingProfile)}
          />
        ) : (
          <>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <KpiCard label={kpiCountLabel} value={kpis.count} helper={kpiCountHelper} />
          <KpiCard label="Neighborhoods" value={kpis.neighborhoods} helper="Unique areas represented" />
          <KpiCard label="Average rating" value={kpis.averageRating} helper="Across this page" />
          <KpiCard label="Top vibe" value={kpis.topVibe} helper="Most common tag" />
        </section>

        {activePage === "myDates" && myDates.length > 0 && (
          <div className="mb-5 flex justify-end">
            <button onClick={clearMyDates} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-500 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
              Clear your dates
            </button>
          </div>
        )}

        {loadingDates ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <h3 className="text-2xl font-black">Loading your dates...</h3>
          </div>
        ) : activePage === "myDates" && myDates.length === 0 ? (
          <EmptyMyDates onAdd={openAddModal} onExplore={() => setActivePage("explore")} />
        ) : filtered.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <h3 className="text-2xl font-black">{activePage === "following" ? "No following posts yet" : "No matching dates yet"}</h3>
            <p className="mt-2 text-slate-500">
              {activePage === "following"
                ? "Follow people who have posted dates to Explore, then their posts will show up here."
                : "Try different filters or add a date with those attributes."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filtered.map((date, index) => (
              <DateCard
                key={date.id}
                date={date}
                rank={index + 1}
                mode={activePage}
                onDelete={deleteDate}
                onEdit={openEditModal}
                onTogglePost={togglePostToExplore}
                isLiked={!!likedExploreDates[date.id]}
                onLike={toggleExploreLike}
                onAddToMine={addExploreToMyDates}
                comments={comments[date.id] || []}
                onComment={addComment}
                onOpenProfile={openPublicProfileById}
              />
            ))}
          </div>
        )}
          </>
        )}
      </main>

      <MobileNav activePage={activePage} setActivePage={setActivePage} resetFilters={resetFilters} openModal={openAddModal} />

      {isModalOpen && (
        <DateFormModal
          form={form}
          setForm={setForm}
          editingDate={editingDate}
          onSubmit={submitDate}
          onClose={() => {
            setIsModalOpen(false);
            setEditingDate(null);
            setForm(emptyForm());
          }}
          toggleArrayValue={toggleArrayValue}
          updatePlace={updatePlace}
          addStop={addStop}
          removeStop={removeStop}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          user={user}
          profile={profile}
          onClose={() => setIsProfileOpen(false)}
          onSave={updateProfile}
        />
      )}

      {connectionsModal && (
        <ConnectionsModal
          type={connectionsModal}
          followers={followersList}
          following={followingList}
          peopleSearch={peopleSearch}
          setPeopleSearch={setPeopleSearch}
          peopleResults={peopleResults}
          onSearch={searchPeople}
          onClose={() => setConnectionsModal(null)}
          onOpenProfile={openPublicProfile}
          isFollowing={(person) => followingList.some((p) => p.id === person.id)}
          onToggleFollow={toggleFollow}
        />
      )}
    </div>
  );
}


function SocialHeaderCard({ profile, followersCount, followingCount, onFollowers, onFollowing, onFindPeople, onEditProfile }) {
  return (
    <section className="mb-5 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 text-2xl font-black text-white shadow-lg">
            {profile?.display_name?.[0]?.toUpperCase() || profile?.username?.[0]?.toUpperCase() || "Y"}
          </div>
          <div>
            <h3 className="text-2xl font-black">{profile?.display_name || "Your profile"}</h3>
            <p className="text-sm font-bold text-slate-500">@{profile?.username || "username"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
          <button onClick={onFollowers} className="rounded-2xl bg-slate-50 px-5 py-4 text-left ring-1 ring-slate-200 hover:bg-slate-100">
            <div className="text-2xl font-black text-[#172033]">{followersCount}</div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Followers</div>
          </button>
          <button onClick={onFollowing} className="rounded-2xl bg-slate-50 px-5 py-4 text-left ring-1 ring-slate-200 hover:bg-slate-100">
            <div className="text-2xl font-black text-[#172033]">{followingCount}</div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Following</div>
          </button>
          <button onClick={onFindPeople} className="rounded-2xl bg-[#172033] px-5 py-4 text-sm font-black text-white hover:bg-slate-700 sm:ml-2">
            Find people
          </button>
          <button onClick={onEditProfile} className="rounded-2xl bg-orange-500 px-5 py-4 text-sm font-black text-white hover:bg-orange-600">
            Edit profile
          </button>
        </div>
      </div>
    </section>
  );
}

function ConnectionsModal({ type, followers, following, peopleSearch, setPeopleSearch, peopleResults, onSearch, onClose, onOpenProfile, isFollowing, onToggleFollow }) {
  const list = type === "followers" ? followers : type === "following" ? following : peopleResults;
  const title = type === "followers" ? "Followers" : type === "following" ? "Following" : "Find people";
  const emptyText = type === "find" ? "Search for usernames or display names." : `No ${title.toLowerCase()} yet.`;

  function submitSearch(e) {
    e.preventDefault();
    onSearch(peopleSearch);
  }

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Social</p>
            <h2 className="mt-2 text-3xl font-black">{title}</h2>
          </div>
          <button onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl font-black hover:bg-slate-200">×</button>
        </div>

        {type === "find" && (
          <form onSubmit={submitSearch} className="mt-5 flex gap-2">
            <input value={peopleSearch} onChange={(e) => setPeopleSearch(e.target.value)} placeholder="Search username or name..." className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400" />
            <button className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600">Search</button>
          </form>
        )}

        <div className="mt-5 space-y-3">
          {list.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-6 text-center font-bold text-slate-500 ring-1 ring-slate-200">{emptyText}</div>
          ) : (
            list.map((person) => (
              <PersonRow key={person.id} person={person} onOpenProfile={onOpenProfile} isFollowing={isFollowing(person)} onToggleFollow={onToggleFollow} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function PersonRow({ person, onOpenProfile, isFollowing, onToggleFollow }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <button onClick={() => onOpenProfile(person)} className="flex min-w-0 items-center gap-3 text-left">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 font-black text-white">
          {person.display_name?.[0]?.toUpperCase() || person.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="min-w-0">
          <p className="truncate font-black text-[#172033]">{person.display_name || person.username || "User"}</p>
          <p className="truncate text-sm font-bold text-slate-500">@{person.username || "username"}</p>
        </div>
      </button>
      <button onClick={() => onToggleFollow(person)} className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-black ${isFollowing ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-[#172033] text-white hover:bg-slate-700"}`}>
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

function PublicProfilePage({ person, dates, loading, isFollowing, onBack, onToggleFollow }) {
  const kpis = buildKpis(dates);

  return (
    <div>
      <button onClick={onBack} className="mb-4 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
        ← Back to your dates
      </button>

      <section className="mb-5 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="bg-gradient-to-br from-[#172033] to-[#26395f] p-6 text-white">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 text-2xl font-black text-white shadow-lg">
                {person.display_name?.[0]?.toUpperCase() || person.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">Profile</p>
                <h2 className="mt-2 text-3xl font-black md:text-5xl">{person.display_name || person.username}</h2>
                <p className="mt-1 text-sm font-bold text-slate-300">@{person.username}</p>
              </div>
            </div>
            <button onClick={onToggleFollow} className={`rounded-2xl px-6 py-4 font-black ${isFollowing ? "bg-white text-[#172033]" : "bg-orange-500 text-white hover:bg-orange-600"}`}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <KpiCard label="Dates" value={kpis.count} helper="Public date rankings" />
        <KpiCard label="Neighborhoods" value={kpis.neighborhoods} helper="Unique areas represented" />
        <KpiCard label="Average rating" value={kpis.averageRating} helper="Across their dates" />
        <KpiCard label="Top vibe" value={kpis.topVibe} helper="Most common tag" />
      </section>

      {loading ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-black">Loading profile...</h3>
        </div>
      ) : dates.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-black">No dates yet</h3>
          <p className="mt-2 text-slate-500">This person has not logged any visible dates yet.</p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {dates.map((date, index) => (
            <DateCard key={date.id} date={date} rank={index + 1} mode="public" onDelete={() => {}} onEdit={() => {}} isLiked={false} onLike={() => {}} onAddToMine={() => {}} comments={[]} onComment={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}

function AuthGate() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  async function logIn(e) {
    e.preventDefault();
    setBusy(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (error) alert(error.message);
  }

  async function signUp(e) {
    e.preventDefault();
    setBusy(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setBusy(false);
      alert(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        username: email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").toLowerCase(),
        display_name: displayName.trim() || email.split("@")[0],
      });
    }

    setBusy(false);
    alert("Account created. If Supabase asks for email confirmation, check your inbox.");
  }

  async function resetPassword() {
    if (!email) {
      alert("Enter your email first, then hit Reset password.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) alert(error.message);
    else alert("Password reset email sent.");
  }

  return (
    <div className="min-h-screen bg-[#eef7ff] p-4 text-[#172033]">
      <div className="mx-auto grid min-h-screen max-w-5xl place-items-center">
        <div className="grid w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-200 md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-gradient-to-br from-[#10182A] via-[#172033] to-[#26395f] p-8 text-white md:p-12">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 text-3xl font-black shadow-lg">♡</div>
            <h1 className="mt-8 text-5xl font-black tracking-tight md:text-6xl">IT’S A DATE</h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
              Log in to rank your Chicago dates, save ideas across devices, and keep your list private to you.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-bold text-slate-200">
              <div className="rounded-2xl bg-white/10 p-4">✓ Cross-device saved dates</div>
              <div className="rounded-2xl bg-white/10 p-4">✓ Explore likes and comments</div>
              <div className="rounded-2xl bg-white/10 p-4">✓ Private personal date list</div>
            </div>
          </div>

          <form onSubmit={mode === "login" ? logIn : signUp} className="p-6 md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">{mode === "login" ? "Welcome back" : "Create account"}</p>
            <h2 className="mt-3 text-3xl font-black">{mode === "login" ? "Log in to continue" : "Sign up to start"}</h2>

            {mode === "signup" && (
              <Field label="Display name" value={displayName} onChange={setDisplayName} placeholder="Jay" />
            )}

            <div className="mt-4 space-y-4">
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@email.com" />
              <label className="block">
                <span className="mb-2 block text-sm font-black text-slate-700">Password</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400" />
              </label>
            </div>

            <button disabled={busy} type="submit" className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-4 font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-600 disabled:opacity-60">
              {busy ? "Working..." : mode === "login" ? "Log in" : "Sign up"}
            </button>

            <button type="button" onClick={resetPassword} className="mt-4 w-full rounded-2xl bg-slate-100 px-6 py-3 text-sm font-black text-slate-600 hover:bg-slate-200">
              Reset password
            </button>

            <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 w-full text-sm font-black text-orange-600">
              {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DateFormModal({ form, setForm, editingDate, onSubmit, onClose, toggleArrayValue, updatePlace, addStop, removeStop }) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm md:p-4">
      <form onSubmit={onSubmit} className="mx-auto my-4 max-w-4xl rounded-[2rem] bg-white p-5 shadow-2xl md:my-8 md:p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">{editingDate ? "Edit date" : "Add a date"}</p>
            <h2 className="mt-2 text-3xl font-black">{editingDate ? "Update your date night" : "Log one of your date nights"}</h2>
            <p className="mt-1 text-sm text-slate-500">This saves to your account and syncs across devices.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl font-black hover:bg-slate-200">×</button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Date title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} placeholder="West Loop dinner + drinks" />
          <Field label="Rating" value={form.rating} onChange={(value) => setForm({ ...form, rating: value })} placeholder="9.2" />
          <Field label="Estimated Total Cost" value={form.estimatedTotalCost} onChange={(value) => setForm({ ...form, estimatedTotalCost: value })} placeholder="$80–$120" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Select label="Neighborhood" value={form.neighborhood} onChange={(value) => setForm({ ...form, neighborhood: value })} options={allNeighborhoods} />
          <Select label="Price" value={form.price} onChange={(value) => setForm({ ...form, price: value })} options={allPrices} />
        </div>

        <ChipSection title="What did the date include?" options={allTypes} selected={form.dateTypes} onToggle={(value) => toggleArrayValue("dateTypes", value)} />
        <ChipSection title="What was the vibe?" options={allVibes} selected={form.vibes} onToggle={(value) => toggleArrayValue("vibes", value)} />

        <div className="mt-6 rounded-[2rem] bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-black">Stops / places</h3>
            <button type="button" onClick={addStop} className="rounded-2xl bg-[#172033] px-4 py-2 text-sm font-black text-white">+ Add stop</button>
          </div>

          <div className="space-y-4">
            {form.places.map((place, index) => (
              <div key={index} className="rounded-3xl bg-white p-4 ring-1 ring-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-black text-orange-500">Stop {index + 1}</span>
                  <button type="button" onClick={() => removeStop(index)} className="text-sm font-bold text-slate-400 hover:text-red-500">Remove</button>
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr_160px]">
                  <Field label="Place name" value={place.name} onChange={(value) => updatePlace(index, "name", value)} placeholder="Aba" />
                  <Select label="Type" value={place.type} onChange={(value) => updatePlace(index, "type", value)} options={allTypes} />
                </div>
                <Field label="What did you order / do?" value={place.orderedText} onChange={(value) => updatePlace(index, "orderedText", value)} placeholder="Whipped feta, espresso martini, walk by the river" />
              </div>
            ))}
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-black text-slate-700">Notes</span>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="What made this date good? Who is it best for? Any watch-outs?" className="min-h-28 w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400" />
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-600 hover:bg-slate-200">Cancel</button>
          <button type="submit" className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-600">
            {editingDate ? "Save Changes" : "Add to Your Dates"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ProfileModal({ user, profile, onClose, onSave }) {
  const [draft, setDraft] = useState({
    display_name: profile?.display_name || "",
    username: profile?.username || "",
  });

  async function logOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Profile</p>
            <h2 className="mt-2 text-3xl font-black">Your account</h2>
            <p className="mt-1 text-sm font-bold text-slate-500">{user.email}</p>
          </div>
          <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-xl font-black hover:bg-slate-200">×</button>
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Display name" value={draft.display_name} onChange={(value) => setDraft({ ...draft, display_name: value })} placeholder="Jay" />
          <Field label="Username" value={draft.username} onChange={(value) => setDraft({ ...draft, username: value })} placeholder="jaydugar" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button onClick={() => onSave(draft)} className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white hover:bg-orange-600">
            Save profile
          </button>
          <button onClick={logOut} className="rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-600 hover:bg-slate-200">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function UserMenu({ user, profile, onProfile }) {
  return (
    <button onClick={onProfile} className="flex max-w-[260px] items-center gap-3 rounded-2xl bg-white/10 px-3 py-2 text-left hover:bg-white/20">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white font-black text-[#10182A]">
        {profile?.display_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-black">{profile?.display_name || "Your profile"}</p>
        <p className="truncate text-xs text-slate-400">@{profile?.username || user.email}</p>
      </div>
    </button>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`rounded-2xl px-5 py-3 text-sm font-black ${active ? "bg-white text-[#10182A]" : "bg-white/10 text-white hover:bg-white/20"}`}>
      {children}
    </button>
  );
}

function MobileNav({ activePage, setActivePage, resetFilters, openModal }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-[1.7rem] bg-[#10182A] p-2 text-white shadow-2xl md:hidden">
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => { setActivePage("myDates"); resetFilters(); }} className={`rounded-2xl py-3 text-[11px] font-black ${activePage === "myDates" ? "bg-white text-[#10182A]" : "text-slate-300"}`}>♡ Mine</button>
        <button onClick={() => { setActivePage("explore"); resetFilters(); }} className={`rounded-2xl py-3 text-[11px] font-black ${activePage === "explore" ? "bg-white text-[#10182A]" : "text-slate-300"}`}>Explore</button>
        <button onClick={() => { setActivePage("following"); resetFilters(); }} className={`rounded-2xl py-3 text-[11px] font-black ${activePage === "following" ? "bg-white text-[#10182A]" : "text-slate-300"}`}>Following</button>
        <button onClick={openModal} className="rounded-2xl bg-orange-500 py-3 text-[11px] font-black text-white">+ Add</button>
      </div>
    </div>
  );
}

function estimateCostFromPrice(price) {
  if (price === "$") return "$20–$50";
  if (price === "$$") return "$50–$100";
  if (price === "$$$") return "$100–$180";
  if (price === "$$$$") return "$180+";
  return "Not estimated";
}

function rowToDate(row) {
  return {
    id: row.id,
    user: "You",
    avatar: "Y",
    title: row.title,
    neighborhood: row.neighborhood,
    price: row.price,
    dateTypes: row.date_types || [],
    vibes: row.vibes || [],
    rating: row.rating,
    estimatedTotalCost: row.estimated_total_cost,
    places: row.places || [],
    notes: row.notes,
    created_at: row.created_at,
    isPublic: !!row.is_public,
    publicAt: row.public_at,
    sourceUserId: row.user_id,
  };
}

function buildKpis(dates) {
  if (!dates.length) return { count: 0, neighborhoods: 0, averageRating: "—", topVibe: "—" };
  const neighborhoods = new Set(dates.map((date) => date.neighborhood)).size;
  const average = dates.reduce((sum, date) => sum + Number(date.rating || 0), 0) / dates.length;
  const vibeCounts = dates.flatMap((date) => date.vibes || []).reduce((acc, vibe) => ({ ...acc, [vibe]: (acc[vibe] || 0) + 1 }), {});
  const topVibe = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  return { count: dates.length, neighborhoods, averageRating: average.toFixed(1), topVibe };
}

function KpiCard({ label, value, helper }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <div className="mt-3 text-3xl font-black text-[#172033]">{value}</div>
      <p className="mt-1 text-sm font-semibold text-slate-500">{helper}</p>
    </div>
  );
}

function EmptyMyDates({ onAdd, onExplore }) {
  return (
    <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 md:p-10">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-orange-100 text-3xl">💘</div>
      <h3 className="mt-5 text-3xl font-black">No dates logged yet</h3>
      <p className="mx-auto mt-2 max-w-xl text-slate-500">Your personal dashboard starts empty. Add your own date nights here, then use Explore for inspiration.</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button onClick={onAdd} className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-600">+ Add your first date</button>
        <button onClick={onExplore} className="rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-600 hover:bg-slate-200">Browse Explore</button>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl bg-slate-50 px-4 py-4 font-bold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400" />
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
            <button key={option} type="button" onClick={() => onToggle(option)} className={`rounded-full px-4 py-2 text-sm font-black transition ${active ? "bg-[#172033] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getBaseLikes(id, rank) {
  return 18 + ((id.length + rank * 7) % 43);
}

function getBaseComments(id, rank) {
  return 2 + ((id.length + rank * 3) % 11);
}

function DateCard({ date, rank, mode, onDelete, onEdit, onTogglePost, isLiked, onLike, onAddToMine, comments, onComment, onOpenProfile }) {
  const [commentText, setCommentText] = useState("");
  const isExplore = mode === "explore" || mode === "following";

  function submitComment() {
    onComment(date.id, commentText);
    setCommentText("");
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {isExplore ? (
              <button
                type="button"
                onClick={() => date.sourceUserId && onOpenProfile?.(date.sourceUserId)}
                className={`flex items-center gap-3 text-left ${date.sourceUserId ? "hover:opacity-80" : "cursor-default"}`}
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 font-black text-white">{date.avatar}</div>
                <div>
                  <p className="text-sm font-black">{date.user}</p>
                  <p className="text-xs font-semibold text-slate-400">{date.sourceUserId ? "View profile" : "posted a date idea"}</p>
                </div>
              </button>
            ) : (
              <div className="rounded-2xl bg-orange-100 px-4 py-2 text-sm font-black text-orange-600">#{rank} ranked</div>
            )}
          </div>

          {mode === "myDates" && (
            <div className="flex flex-wrap justify-end gap-2">
              <button onClick={() => onTogglePost(date)} className={`rounded-xl px-3 py-2 text-xs font-black ${date.isPublic ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}>
                {date.isPublic ? "Posted" : "Post to Explore"}
              </button>
              <button onClick={() => onEdit(date)} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 hover:bg-slate-200">Edit</button>
              <button onClick={() => onDelete(date.id)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-500 hover:bg-red-100">Delete</button>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">{date.neighborhood}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight">{date.title}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">{date.price} · {date.dateTypes.join(" + ")}</p>
            <p className="mt-1 text-sm font-bold text-emerald-600">Estimated total: {date.estimatedTotalCost || estimateCostFromPrice(date.price)}</p>
            {mode === "myDates" && date.isPublic && <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-orange-500">Posted on Explore</p>}
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-3 text-xl font-black text-amber-600">★ {date.rating}</div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {date.vibes.map((vibe) => (
            <span key={vibe} className={`rounded-full px-3 py-1 text-xs font-black ${vibeColors[vibe] || "bg-slate-100 text-slate-700"}`}>#{vibe}</span>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {date.places.map((place, idx) => (
            <div key={`${place.name}-${idx}`} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#172033] font-black text-white">{idx + 1}</div>
                <div>
                  <h3 className="font-black">{place.name}</h3>
                  <p className="text-sm font-semibold text-slate-500">{place.type}</p>
                </div>
              </div>
              {place.ordered?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {place.ordered.map((item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{item}</span>
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

        {isExplore && (
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => onLike(date.id)} className={`rounded-2xl px-4 py-2 text-sm font-black transition ${isLiked ? "bg-pink-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600"}`}>
              {isLiked ? "♥" : "♡"} {date.likeCount} likes
            </button>
            <button className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-600">
              💬 {date.commentCount} comments
            </button>
            <button onClick={() => onAddToMine(date)} className="rounded-2xl bg-[#172033] px-4 py-2 text-sm font-black text-white hover:bg-slate-700">
              + Add to mine
            </button>
          </div>
        )}
      </div>

      {isExplore && (
        <div className="border-t border-slate-100 bg-slate-50 p-5">
          <div className="space-y-3">
            <Comment user={date.user} text="I’d absolutely do this again." />
            {comments.slice(-3).map((comment) => (
              <Comment key={comment.id} user={comment.user} text={comment.text} />
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." className="min-w-0 flex-1 rounded-2xl bg-white px-4 py-3 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400" />
            <button onClick={submitComment} className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-white hover:bg-orange-600">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Comment({ user, text }) {
  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-xs font-black text-slate-500 ring-1 ring-slate-200">{user?.[0] || "U"}</div>
      <div className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-slate-200">
        <span className="font-black text-slate-700">{user}</span>
        <span className="ml-2 text-slate-500">{text}</span>
      </div>
    </div>
  );
}
