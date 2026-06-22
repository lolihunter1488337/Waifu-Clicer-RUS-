"use strict";

const SAVE_KEY = "waifu-stardust-hearts-v4";
const CASE_COST = 100;
const LOCAL_SAVE_DELAY = 700;
const CLOUD_SAVE_DELAY = 15000;
const COLLECTION_PAGE_SIZE = 20;

const RARITY_ORDER = ["Common", "Rare", "Epic", "Mythic", "Ultra"];
const RARITY_ODDS = [
  ["Common", 0.72],
  ["Rare", 0.16],
  ["Epic", 0.08],
  ["Mythic", 0.03],
  ["Ultra", 0.01]
];

const RARITY_COLORS = {
  Common: "#b8bfca",
  Rare: "#d36bff",
  Epic: "#ff6da6",
  Mythic: "#ffd57e",
  Ultra: "#ff4d86",
  Event: "#7af7ff"
};

const RARITY_BASE = {
  Common: [1, 1, 1],
  Rare: [2, 2, 2],
  Epic: [4, 3, 4],
  Mythic: [8, 5, 7],
  Ultra: [14, 8, 11]
};

const PORTRAIT_ASSETS = Object.freeze([
  "assets/characters/1.png",
  "assets/characters/2.png",
  "assets/characters/3.png",
  "assets/characters/4.png",
  "assets/characters/5.png",
  "assets/characters/6.png",
  "assets/characters/7.png",
  "assets/characters/8.png",
  "assets/characters/9.png",
  "assets/characters/10.png"
]);

const CHARACTER_NAMES = [
  "Luna", "Mika", "Yumi", "Airi", "Sora", "Nami", "Rin", "Kiko", "Emi", "Hana",
  "Momo", "Rei", "Yuna", "Akari", "Mei", "Neko", "Rika", "Noa", "Saya", "Kira",
  "Faye", "Iris", "Mina", "Ena", "Rumi", "Yui", "Nina", "Asa", "Lily", "Kumi",
  "Eira", "Miu", "Aya", "Nora", "Hoshi", "Mari", "Tama", "Saki", "Mira", "Kanna",
  "Runa", "Shiro", "Eri", "Niko", "Ami", "Kaia", "Neri", "Fumi", "Tori", "Chiyo",
  "Vela", "Lyra", "Selene", "Nova", "Raven", "Violet", "Nyx", "Echo", "Astra", "Ciel",
  "Elara", "Freya", "Zora", "Seren", "Maia", "Opal", "Aria", "Isla", "Luma", "Nessa",
  "Vesper", "Sable", "Cora", "Eris", "Thea", "Aveline", "Calista", "Dahlia", "Estelle", "Fiore",
  "Glimmer", "Helia", "Ione", "Juno", "Kallie", "Lorelei", "Mavis", "Neve", "Ori", "Petra",
  "Quinn", "Rosalie", "Sylvie", "Thalia", "Umbra", "Valora", "Wisteria", "Xanthe", "Yvaine", "Zenith"
];

const PALETTES = [
  ["#f1d7ff", "#6d3b8d", "#ffd8cf", "#6f2b82", "#ff70c8"],
  ["#b8efff", "#275c88", "#ffd1c6", "#244477", "#73ddff"],
  ["#ffcadf", "#8d315d", "#f9cfc7", "#7b244c", "#ff8eb4"],
  ["#e5d0ac", "#6d492b", "#f5c8b6", "#3f254f", "#ffc45e"],
  ["#d0d4ff", "#3c3e8c", "#f7cbc4", "#28365e", "#9986ff"],
  ["#eeeff7", "#60667b", "#eec5b8", "#4b1f38", "#ff607d"],
  ["#bff7d2", "#237759", "#ffd8ca", "#255b54", "#67e6a5"],
  ["#ffc4a8", "#8d3d2c", "#f3c2ae", "#6b263b", "#ff7a67"]
];

const TITLES = [
  "Лунный мечтатель",
  "Вишнёвая комета",
  "Бархатный идол",
  "Звёздная ведьма",
  "Принцесса шуток",
  "Небесная магесса",
  "Ночная певчая",
  "Закатная жрица"
];

const ELEMENTS = [
  "ЛУНА",
  "ЦВЕТЕНИЕ",
  "ЗВЕЗДА",
  "ПРИЛИВ",
  "АВРОРА",
  "БАРХАТ",
  "КОМЕТА",
  "ЭХО"
];

const NATION_POOLS = {
  Common: ["Солария", "Вердис", "Кассия", "Сильва"],
  Rare: ["Лунария", "Кораллия"],
  Epic: ["Мирайя", "Этерия"],
  Mythic: ["Ноксис"],
  Ultra: ["Элизиум", "Аурелия", "Соларис"]
};

const ACCESSORIES = Object.freeze([
  { id: "acc-1", name: "Лунный ободок", rarity: "Common", cost: 420, slot: "head", bonuses: { click: 1 } },
  { id: "acc-2", name: "Бант клятвы", rarity: "Common", cost: 560, slot: "hair", bonuses: { aura: 2 } },
  { id: "acc-3", name: "Сапфировая заколка", rarity: "Rare", cost: 820, slot: "hair", bonuses: { idle: 1 } },
  { id: "acc-4", name: "Сердечный кулон", rarity: "Rare", cost: 1120, slot: "neck", bonuses: { click: 2, aura: 1 } },
  { id: "acc-5", name: "Искристые серьги", rarity: "Epic", cost: 1750, slot: "ears", bonuses: { idle: 2, combo: 1 } },
  { id: "acc-6", name: "Розовый жетон", rarity: "Epic", cost: 2200, slot: "badge", bonuses: { click: 2, combo: 1 } },
  { id: "acc-7", name: "Мифический браслет", rarity: "Mythic", cost: 3600, slot: "wrist", bonuses: { click: 3, idle: 2 } },
  { id: "acc-8", name: "Корона сияния", rarity: "Mythic", cost: 4700, slot: "head", bonuses: { click: 2, combo: 2 } },
  { id: "acc-9", name: "Астральная лента", rarity: "Ultra", cost: 7200, slot: "ribbon", bonuses: { aura: 10, combo: 2 } },
  { id: "acc-10", name: "Печать судьбы", rarity: "Ultra", cost: 10800, slot: "sigil", bonuses: { click: 5, idle: 3, combo: 2 } }
]);

const BANNERS = Object.freeze([
  {
    id: "standard",
    name: "Обычный баннер",
    cost: 180,
    subtitle: "Первый мир. Только базовые вайфу и редкий шанс на удачу",
    refund: 55,
    unlockWorld: "garden",
    odds: [["Common", 0.965], ["Rare", 0.035]]
  },
  {
    id: "moon",
    name: "Лунный баннер",
    cost: 650,
    subtitle: "Открывается во втором мире и впервые показывает эпик",
    refund: 160,
    unlockWorld: "lunar",
    odds: [["Common", 0.885], ["Rare", 0.08], ["Epic", 0.025], ["Mythic", 0.008], ["Ultra", 0.002]]
  },
  {
    id: "royal",
    name: "Королевский баннер",
    cost: 2200,
    subtitle: "Входит в игру позже и уже может дать мифик",
    refund: 500,
    unlockWorld: "royal",
    odds: [["Common", 0.76], ["Rare", 0.15], ["Epic", 0.06], ["Mythic", 0.025], ["Ultra", 0.005]]
  },
  {
    id: "mythic",
    name: "Мифический баннер",
    cost: 6200,
    subtitle: "Поздний мир, где ультра уже начинает светиться",
    refund: 1300,
    unlockWorld: "mythic",
    odds: [["Common", 0.6], ["Rare", 0.2], ["Epic", 0.12], ["Mythic", 0.065], ["Ultra", 0.015]]
  },
  {
    id: "celestial",
    name: "Небесный баннер",
    cost: 14000,
    subtitle: "Финальный баннер для ультраредких вайфу",
    refund: 3000,
    unlockWorld: "ultra",
    odds: [["Common", 0.43], ["Rare", 0.22], ["Epic", 0.2], ["Mythic", 0.11], ["Ultra", 0.04]]
  },
  {
    id: "event",
    name: "Ивент-кейс",
    cost: 5200,
    subtitle: "Открывается только во время события и даёт кошкодевочку",
    refund: 1400,
    eventOnly: true,
    odds: [["Common", 0.686], ["Rare", 0.2], ["Epic", 0.095], ["Mythic", 0.01], ["Ultra", 0.001], ["Event", 0.008]]
  }
]);

const CASE_ART_BY_BANNER = Object.freeze({
  standard: "assets/cases/1.png",
  moon: "assets/cases/2.png",
  royal: "assets/cases/3.png",
  mythic: "assets/cases/4.png",
  celestial: "assets/cases/5.png"
});

const EVENT_ROTATION_MS = 30 * 60 * 1000;
const BOSS_COOLDOWN_MS = 18 * 60 * 1000;
const BOSS_DURATION_MS = 12 * 60 * 1000;
const BOSS_ATTACK_DELAY_MS = 900;

const BOSS_DEFS = Object.freeze([
  { worldId: "garden", name: "Праматерь Лепестков", subtitle: "Собирает первую ауру в венец", shards: 1, pity: 0.04 },
  { worldId: "lunar", name: "Лунный Страж", subtitle: "Проверяет терпение фарма", shards: 2, pity: 0.05 },
  { worldId: "royal", name: "Королевская Наследница", subtitle: "Не отдаёт редкость без боя", shards: 3, pity: 0.06 },
  { worldId: "mythic", name: "Хранитель Мифа", subtitle: "Срывает маску у долгого гринда", shards: 4, pity: 0.08 },
  { worldId: "ultra", name: "Небесная Палачка", subtitle: "Появляется только у самых упрямых", shards: 6, pity: 0.1 }
]);

const WORLD_DEFS = Object.freeze([
  {
    id: "garden",
    name: "Сад первого света",
    threshold: 1,
    description: "Стартовый мир. Фарм быстрый, но баннеры почти без сюрпризов.",
    bonuses: { aura: 1, click: 1, idle: 1, combo: 1 },
    unlocks: "standard"
  },
  {
    id: "lunar",
    name: "Лунный двор",
    threshold: 10,
    description: "Открывает второй баннер и ускоряет базовый фарм.",
    bonuses: { aura: 1.08, click: 1.05, idle: 1.1, combo: 1.03 },
    unlocks: "moon"
  },
  {
    id: "royal",
    name: "Королевский квартал",
    threshold: 25,
    description: "Дольше фарм, лучше бонусы, появляется шанс на мифик.",
    bonuses: { aura: 1.2, click: 1.1, idle: 1.18, combo: 1.06 },
    unlocks: "royal"
  },
  {
    id: "mythic",
    name: "Храм мифов",
    threshold: 45,
    description: "Мир долгой игры. Здесь уже реально копится редкость.",
    bonuses: { aura: 1.38, click: 1.2, idle: 1.32, combo: 1.1 },
    unlocks: "mythic"
  },
  {
    id: "ultra",
    name: "Небесный разлом",
    threshold: 70,
    description: "Финальный мир. Здесь живут ультраредкие вайфу и самый дорогой баннер.",
    bonuses: { aura: 1.62, click: 1.32, idle: 1.48, combo: 1.16 },
    unlocks: "celestial"
  }
]);

const EVENT_DURATION_MS = 14 * 24 * 60 * 60 * 1000;
const EVENT_CHARACTER = Object.freeze({
  id: "EV-001",
  name: "Мия",
  rarity: "Event",
  title: "Кошка фестиваля",
  element: "ЛАПКА",
  nation: "Мурландия",
  quote: "Мяу. Это мой праздник, но я остаюсь рядом с тобой.",
  stats: Object.freeze({ aura: 9, click: 6, combo: 7 }),
  asset: "assets/characters/10.png",
  sprite: "portrait-event-001",
  palette: Object.freeze(["#f8f3ff", "#8b7cff", "#fff1d9", "#5a4b8a", "#8df6ff"]),
  isEvent: true,
  eventSource: "Ивент-кейс"
});

const EVENT_CHARACTER_IDS = new Set([EVENT_CHARACTER.id]);
const HERO_VIEW_ACTIVE = "active";
const HERO_VIEW_EVENT = "event";
const COLLECTION_TAB_ALL = "all";
const COLLECTION_TAB_REGULAR = "regular";
const COLLECTION_TAB_EVENT = "event";

const WORLD_EVENTS = Object.freeze([
  { id: "festival", name: "Фестиваль света", text: "Аура и клики сияют ярче.", aura: 1.12, click: 1.08, idle: 1.04, combo: 1.03 },
  { id: "mist", name: "Лунный туман", text: "Медленный фарм, но сильнее автоигра.", aura: 1.06, click: 1.02, idle: 1.18, combo: 1.02 },
  { id: "storm", name: "Грозовой разлом", text: "Комбо и клик получают резкий буст.", aura: 1.1, click: 1.14, idle: 1.03, combo: 1.08 },
  { id: "dream", name: "Сон держав", text: "Редкость мира усиливает общий цикл.", aura: 1.16, click: 1.05, idle: 1.08, combo: 1.05 },
  { id: "silence", name: "Тихая ночь", text: "Пассивный фарм становится стабильнее.", aura: 1.08, click: 1.03, idle: 1.12, combo: 1.04 }
]);

const DAILY_CONTRACT_POOL = Object.freeze([
  { id: "clicks-220", title: "Накликать 220 раз", kind: "lifetimeClicks", target: 220, rewardAura: 260, rewardShards: 1 },
  { id: "clicks-480", title: "Накликать 480 раз", kind: "lifetimeClicks", target: 480, rewardAura: 460, rewardShards: 2 },
  { id: "aura-3500", title: "Собрать 3 500 ауры", kind: "aura", target: 3500, rewardAura: 420, rewardShards: 2 },
  { id: "aura-9000", title: "Собрать 9 000 ауры", kind: "aura", target: 9000, rewardAura: 900, rewardShards: 3 },
  { id: "cards-14", title: "Открыть 14 вайфу", kind: "ownedIds", target: 14, rewardAura: 580, rewardShards: 2 },
  { id: "cards-28", title: "Открыть 28 вайфу", kind: "ownedIds", target: 28, rewardAura: 1180, rewardShards: 4 },
  { id: "cases-6", title: "Открыть 6 кейсов", kind: "caseOpens", target: 6, rewardAura: 700, rewardShards: 2 },
  { id: "accessories-4", title: "Купить 4 аксессуара", kind: "ownedAccessories", target: 4, rewardAura: 650, rewardShards: 3 }
]);

const EXPEDITION_ROUTES = Object.freeze([
  { id: "garden", name: "Патруль сада", world: "garden", duration: 8 * 60 * 1000, aura: 280, shards: 1, caseBoost: 0.02 },
  { id: "lunar", name: "Лунная разведка", world: "lunar", duration: 14 * 60 * 1000, aura: 620, shards: 2, caseBoost: 0.03 },
  { id: "royal", name: "Королевский рейд", world: "royal", duration: 22 * 60 * 1000, aura: 1350, shards: 3, caseBoost: 0.04 },
  { id: "mythic", name: "Охота на миф", world: "mythic", duration: 30 * 60 * 1000, aura: 2600, shards: 5, caseBoost: 0.05 },
  { id: "ultra", name: "Небесный марш", world: "ultra", duration: 40 * 60 * 1000, aura: 5400, shards: 8, caseBoost: 0.08 }
]);

const BUFF_OPTIONS = Object.freeze([
  { id: "spark", name: "Пульс ауры", text: "Аура x1.25, клик x1.08", duration: 30 * 60 * 1000, effects: { aura: 1.25, click: 1.08 } },
  { id: "tempo", name: "Ритм связей", text: "Афк x1.30, комбо x1.08", duration: 30 * 60 * 1000, effects: { idle: 1.3, combo: 1.08 } },
  { id: "fortune", name: "Зов редкости", text: "Пит-рост кейсов сильнее, шансы на редкость выше", duration: 30 * 60 * 1000, effects: { pity: 1.25, luck: 1.12 } },
  { id: "forge", name: "Горнило", text: "Шарды и крафт работают быстрее", duration: 30 * 60 * 1000, effects: { shards: 1.4, craft: 1.25 } },
  { id: "gale", name: "Порыв", text: "Клик x1.18, афк x1.12", duration: 30 * 60 * 1000, effects: { click: 1.18, idle: 1.12 } }
]);

const LORE_CHAPTERS = Object.freeze([
  { threshold: 1, title: "Пролог", text: "Аура раскололась на шесть государств, и каждая вайфу хранит часть её сердца." },
  { threshold: 10, title: "Первый союз", text: "Когда альбом набирает силу, государства начинают слышать друг друга сквозь шум кликов." },
  { threshold: 25, title: "Королевская печать", text: "Редкие вайфу приходят только к тем, кто выдержал долгий фарм и выдержал тишину между вспышками." },
  { threshold: 45, title: "Храм мифов", text: "Мифические карты не выпадают. Их нужно заслужить давлением, временем и упрямством." },
  { threshold: 70, title: "Небесный разлом", text: "Ультраредкие вайфу живут на краю света, где энергия не тратится, а меняет форму." }
]);

const CRAFT_RECIPES = Object.freeze([
  { id: "craft-aura", name: "Резонатор сердца", cost: 6, description: "Постоянно усиливает ауру.", bonuses: { aura: 0.05 } },
  { id: "craft-click", name: "Ключ харизмы", cost: 8, description: "Постоянно усиливает клик.", bonuses: { click: 0.05 } },
  { id: "craft-idle", name: "Тихий подвес", cost: 10, description: "Постоянно усиливает афк.", bonuses: { idle: 0.08 } },
  { id: "craft-combo", name: "Печать синергии", cost: 14, description: "Постоянно усиливает комбо.", bonuses: { combo: 0.06 } }
]);

const GOALS = Object.freeze([
  { id: "clicks-250", title: "Накликать 250 раз", reward: 250, kind: "lifetimeClicks", target: 250 },
  { id: "earn-2500", title: "Накопить 2 500 ауры", reward: 350, kind: "aura", target: 2500 },
  { id: "cases-5", title: "Открыть 5 баннеров", reward: 450, kind: "caseOpens", target: 5 },
  { id: "accessories-3", title: "Купить 3 аксессуара", reward: 500, kind: "ownedAccessories", target: 3 },
  { id: "collection-20", title: "Собрать 20 вайфу", reward: 600, kind: "ownedIds", target: 20 }
]);

const QUOTES = [
  "Останься рядом. Звёзды рядом с тобой мягче.",
  "Каждый клик делает меня чуть счастливее.",
  "Давай превратим эту тихую ночь в фестиваль.",
  "Ты фармишь ауру, а я добавляю искры.",
  "Не моргай. Я краснею только на секунду.",
  "Загадывай осторожно. Я слышу драматичные сердца.",
  "Наш комбо-цепь уже похожа на судьбу с блёстками.",
  "Если ты и дальше выбираешь меня, я начну верить в предназначение."
];

const DEFAULT_STATE = Object.freeze({
  aura: 0,
  ownedIds: ["W-001"],
  ownedEventIds: [],
  activeId: "W-001",
  worldId: "garden",
  heroView: "active",
  collectionTab: "all",
  eventId: "festival-miya",
  eventEndsAt: 0,
  upgrades: { click: 0, idle: 0, combo: 0 },
  ownedAccessories: [],
  equippedAccessoryIds: [],
  craftedPerks: [],
  accessoryShards: 0,
  dailyContractDate: "",
  dailyContracts: [],
  expeditions: [],
  buffDraft: [],
  activeBuffId: "",
  activeBuffUntil: 0,
  prestigePoints: 0,
  casePity: {},
  bossNextAt: 0,
  bossActiveUntil: 0,
  bossHp: 0,
  bossMaxHp: 0,
  bossWorldId: "garden",
  bossVictories: 0,
  caseOpens: 0,
  eventCasePity: 0,
  claimedGoalIds: [],
  settings: { sound: true, reducedMotion: false, language: "ru", introSeen: false },
  lifetimeClicks: 0,
  lifetimeAuraEarned: 0,
  updatedAt: 0
});

const CHARACTERS = Object.freeze(CHARACTER_NAMES.map((name, index) => {
  const rarity = rarityFor(index);
  const base = RARITY_BASE[rarity];
  return Object.freeze({
    index,
    id: `W-${String(index + 1).padStart(3, "0")}`,
    name,
    rarity,
    title: TITLES[index % TITLES.length],
    element: ELEMENTS[index % ELEMENTS.length],
    nation: nationFor(rarity, index),
    quote: QUOTES[index % QUOTES.length],
    stats: Object.freeze({
      aura: base[0] + (index % 3),
      click: base[1] + ((index * 2) % 3),
      combo: base[2] + ((index * 3) % 4)
    }),
    asset: PORTRAIT_ASSETS[index % PORTRAIT_ASSETS.length],
    sprite: `portrait-${String(index + 1).padStart(3, "0")}`,
    palette: Object.freeze(PALETTES[index % PALETTES.length])
  });
}));

const CHARACTER_BY_ID = new Map(CHARACTERS.map(character => [character.id, character]));
const VALID_CHARACTER_IDS = new Set(CHARACTERS.map(character => character.id));
const RARITY_POOLS = Object.freeze(Object.fromEntries(
  RARITY_ORDER.map(rarity => [rarity, CHARACTERS.filter(character => character.rarity === rarity)])
));

let state = cloneDefaults();
let activeOverlay = null;
let comboStreak = 0;
let lastClickAt = 0;
let comboResetTimer = null;
let localSaveTimer = null;
let cloudSaveTimer = null;
let filter = "All";
let ownershipFilter = "All";
let collectionPage = 1;
let selectedBannerId = "standard";
let caseOpening = false;
let caseRollResults = [];
let caseOpeningRunId = 0;
let caseOpeningTimers = [];
let caseShakeTimer = null;
let audioContext = null;
let sdkLoadPromise = null;

const storageState = {
  local: createMemoryStorage(),
  ysdk: null,
  player: null,
  saveMode: "DEVICE SAVE",
  playerLabel: "Гость"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function rarityFor(index) {
  if (index < 68) return "Common";
  if (index < 86) return "Rare";
  if (index < 94) return "Epic";
  if (index < 97) return "Mythic";
  return "Ultra";
}

function nationFor(rarity, index) {
  const pool = NATION_POOLS[rarity] || NATION_POOLS.Common;
  return pool[index % pool.length];
}

function createMemoryStorage() {
  const map = new Map();
  return {
    getItem(key) {
      return map.has(key) ? map.get(key) : null;
    },
    setItem(key, value) {
      map.set(key, String(value));
    },
    removeItem(key) {
      map.delete(key);
    }
  };
}

function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function safeLevel(value) {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

function sanitizeState(parsed) {
  if (!parsed || typeof parsed !== "object") return cloneDefaults();
  const fallback = cloneDefaults();
  const validIds = new Set(CHARACTERS.map(character => character.id));
  const ownedIds = Array.isArray(parsed.ownedIds)
    ? [...new Set(parsed.ownedIds.filter(id => validIds.has(id)))]
    : [...fallback.ownedIds];

  if (!ownedIds.length) ownedIds.push("W-001");

  return {
    aura: Number.isFinite(parsed.aura) ? Math.max(0, parsed.aura) : fallback.aura,
    ownedIds,
    ownedEventIds: Array.isArray(parsed.ownedEventIds)
      ? [...new Set(parsed.ownedEventIds.filter(id => EVENT_CHARACTER_IDS.has(id)))]
      : [...fallback.ownedEventIds],
    activeId: ownedIds.includes(parsed.activeId) ? parsed.activeId : ownedIds[0],
    worldId: WORLD_DEFS.some(world => world.id === parsed.worldId) ? parsed.worldId : fallback.worldId,
    heroView: parsed.heroView === HERO_VIEW_EVENT ? HERO_VIEW_EVENT : HERO_VIEW_ACTIVE,
    collectionTab: [COLLECTION_TAB_ALL, COLLECTION_TAB_REGULAR, COLLECTION_TAB_EVENT].includes(parsed.collectionTab)
      ? parsed.collectionTab
      : fallback.collectionTab,
    eventId: typeof parsed.eventId === "string" ? parsed.eventId : fallback.eventId,
    eventEndsAt: Number.isFinite(parsed.eventEndsAt) ? parsed.eventEndsAt : fallback.eventEndsAt,
    upgrades: {
      click: safeLevel(parsed.upgrades?.click),
      idle: safeLevel(parsed.upgrades?.idle),
      combo: safeLevel(parsed.upgrades?.combo)
    },
    ownedAccessories: Array.isArray(parsed.ownedAccessories)
      ? [...new Set(parsed.ownedAccessories.filter(id => ACCESSORIES.some(accessory => accessory.id === id)))]
      : [...fallback.ownedAccessories],
    equippedAccessoryIds: Array.isArray(parsed.equippedAccessoryIds)
      ? [...new Set(parsed.equippedAccessoryIds.filter(id => ACCESSORIES.some(accessory => accessory.id === id)))]
      : [...fallback.equippedAccessoryIds],
    craftedPerks: Array.isArray(parsed.craftedPerks)
      ? [...new Set(parsed.craftedPerks.filter(id => CRAFT_RECIPES.some(recipe => recipe.id === id)))]
      : [...fallback.craftedPerks],
    accessoryShards: safeLevel(parsed.accessoryShards),
    dailyContractDate: typeof parsed.dailyContractDate === "string" ? parsed.dailyContractDate : fallback.dailyContractDate,
    dailyContracts: Array.isArray(parsed.dailyContracts)
      ? parsed.dailyContracts.map(contract => ({
        id: typeof contract.id === "string" ? contract.id : "",
        title: typeof contract.title === "string" ? contract.title : "",
        kind: typeof contract.kind === "string" ? contract.kind : "",
        target: safeLevel(contract.target),
        rewardAura: safeLevel(contract.rewardAura),
        rewardShards: safeLevel(contract.rewardShards),
        claimed: contract.claimed === true
      })).filter(contract => contract.id && contract.kind && contract.target > 0)
      : [...fallback.dailyContracts],
    expeditions: Array.isArray(parsed.expeditions)
      ? parsed.expeditions.map(expedition => ({
        id: typeof expedition.id === "string" ? expedition.id : "",
        routeId: typeof expedition.routeId === "string" ? expedition.routeId : "",
        characterId: VALID_CHARACTER_IDS.has(expedition.characterId) ? expedition.characterId : fallback.activeId,
        startedAt: Number.isFinite(expedition.startedAt) ? expedition.startedAt : Date.now(),
        endsAt: Number.isFinite(expedition.endsAt) ? expedition.endsAt : Date.now(),
        claimed: expedition.claimed === true
      })).filter(expedition => expedition.id && expedition.routeId)
      : [...fallback.expeditions],
    buffDraft: Array.isArray(parsed.buffDraft)
      ? [...new Set(parsed.buffDraft.filter(id => BUFF_OPTIONS.some(option => option.id === id)))]
      : [...fallback.buffDraft],
    activeBuffId: BUFF_OPTIONS.some(option => option.id === parsed.activeBuffId) ? parsed.activeBuffId : fallback.activeBuffId,
    activeBuffUntil: Number.isFinite(parsed.activeBuffUntil) ? parsed.activeBuffUntil : fallback.activeBuffUntil,
    prestigePoints: safeLevel(parsed.prestigePoints),
    casePity: parsed.casePity && typeof parsed.casePity === "object"
      ? Object.fromEntries(
        Object.entries(parsed.casePity)
          .filter(([worldId, value]) => WORLD_DEFS.some(world => world.id === worldId) && Number.isFinite(value))
          .map(([worldId, value]) => [worldId, Math.max(0, Math.min(1, value))])
      )
      : { ...fallback.casePity },
    bossNextAt: Number.isFinite(parsed.bossNextAt) ? parsed.bossNextAt : fallback.bossNextAt,
    bossActiveUntil: Number.isFinite(parsed.bossActiveUntil) ? parsed.bossActiveUntil : fallback.bossActiveUntil,
    bossHp: Number.isFinite(parsed.bossHp) ? Math.max(0, parsed.bossHp) : fallback.bossHp,
    bossMaxHp: Number.isFinite(parsed.bossMaxHp) ? Math.max(0, parsed.bossMaxHp) : fallback.bossMaxHp,
    bossWorldId: WORLD_DEFS.some(world => world.id === parsed.bossWorldId) ? parsed.bossWorldId : fallback.bossWorldId,
    bossVictories: safeLevel(parsed.bossVictories),
    caseOpens: safeLevel(parsed.caseOpens),
    eventCasePity: safeLevel(parsed.eventCasePity),
    claimedGoalIds: Array.isArray(parsed.claimedGoalIds)
      ? [...new Set(parsed.claimedGoalIds.filter(id => GOALS.some(goal => goal.id === id)))]
      : [...fallback.claimedGoalIds],
    settings: {
      sound: parsed.settings?.sound !== false,
      reducedMotion: parsed.settings?.reducedMotion === true,
      language: parsed.settings?.language === "en" ? "en" : "ru",
      introSeen: parsed.settings?.introSeen === true
    },
    lifetimeClicks: safeLevel(parsed.lifetimeClicks),
    lifetimeAuraEarned: safeLevel(parsed.lifetimeAuraEarned),
    updatedAt: Number.isFinite(parsed.updatedAt) ? parsed.updatedAt : 0
  };
}

function chooseNewestState(localState, cloudState) {
  if (!localState) return cloudState || cloneDefaults();
  if (!cloudState) return localState;
  return cloudState.updatedAt > localState.updatedAt ? cloudState : localState;
}

function buildSnapshot() {
  state.updatedAt = Date.now();
  return {
    aura: state.aura,
    ownedIds: [...state.ownedIds],
    ownedEventIds: [...state.ownedEventIds],
    activeId: state.activeId,
    worldId: state.worldId,
    heroView: state.heroView,
    collectionTab: state.collectionTab,
    eventId: state.eventId,
    eventEndsAt: state.eventEndsAt,
    upgrades: { ...state.upgrades },
    ownedAccessories: [...state.ownedAccessories],
    equippedAccessoryIds: [...state.equippedAccessoryIds],
    craftedPerks: [...state.craftedPerks],
    accessoryShards: state.accessoryShards,
    dailyContractDate: state.dailyContractDate,
    dailyContracts: state.dailyContracts.map(contract => ({ ...contract })),
    expeditions: state.expeditions.map(expedition => ({ ...expedition })),
    buffDraft: [...state.buffDraft],
    activeBuffId: state.activeBuffId,
    activeBuffUntil: state.activeBuffUntil,
    prestigePoints: state.prestigePoints,
    casePity: { ...state.casePity },
    bossNextAt: state.bossNextAt,
    bossActiveUntil: state.bossActiveUntil,
    bossHp: state.bossHp,
    bossMaxHp: state.bossMaxHp,
    bossWorldId: state.bossWorldId,
    bossVictories: state.bossVictories,
    caseOpens: state.caseOpens,
    eventCasePity: state.eventCasePity,
    claimedGoalIds: [...state.claimedGoalIds],
    settings: { ...state.settings },
    lifetimeClicks: state.lifetimeClicks,
    lifetimeAuraEarned: state.lifetimeAuraEarned,
    updatedAt: state.updatedAt
  };
}

function readLocalState() {
  try {
    const raw = storageState.local.getItem(SAVE_KEY);
    if (!raw) return null;
    return sanitizeState(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

function writeLocalState(snapshot) {
  try {
    storageState.local.setItem(SAVE_KEY, JSON.stringify(snapshot));
    return true;
  } catch (error) {
    return false;
  }
}

async function readCloudState() {
  if (!storageState.player) return null;
  try {
    const data = await storageState.player.getData([SAVE_KEY]);
    return data?.[SAVE_KEY] ? sanitizeState(data[SAVE_KEY]) : null;
  } catch (error) {
    return null;
  }
}

async function writeCloudState(snapshot, flush) {
  if (!storageState.player) return false;
  try {
    await storageState.player.setData({ [SAVE_KEY]: snapshot }, flush);
    return true;
  } catch (error) {
    return false;
  }
}

function getBestLocalStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch (error) {
    return createMemoryStorage();
  }
  return createMemoryStorage();
}

function shouldTryYandexSDK() {
  return typeof window !== "undefined" && (window.location.protocol === "http:" || window.location.protocol === "https:");
}

function getYandexSdkUrl() {
  return window.location.hostname.includes("yandex")
    ? "/sdk.js"
    : "https://sdk.games.s3.yandex.net/sdk.js";
}

function loadExternalScript(src) {
  if (window.YaGames) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const existing = [...document.scripts].find(script => script.src === src);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("SDK script failed")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("SDK script failed"));
    document.head.append(script);
  });

  return sdkLoadPromise;
}

async function initStorage() {
  storageState.local = getBestLocalStorage();

  if (!shouldTryYandexSDK()) {
    storageState.saveMode = "DEVICE SAVE";
    return;
  }

  try {
    await loadExternalScript(getYandexSdkUrl());
    if (typeof window.YaGames === "undefined") return;

    storageState.ysdk = await window.YaGames.init();
    storageState.ysdk.features?.LoadingAPI?.ready?.();

    try {
      const safeStorage = await storageState.ysdk.getStorage();
      if (safeStorage) storageState.local = safeStorage;
    } catch (error) {
      // Safe storage is optional. Standard local storage is still fine.
    }

    try {
      storageState.player = await storageState.ysdk.getPlayer();
      storageState.saveMode = "YANDEX SAVE";
      if (storageState.player?.getName?.()) {
        storageState.playerLabel = storageState.player.getName();
      } else {
        storageState.playerLabel = storageState.player?.isAuthorized?.() ? "Игрок Яндекса" : "Гость";
      }
    } catch (error) {
      storageState.saveMode = "DEVICE SAVE";
    }
  } catch (error) {
    storageState.saveMode = "DEVICE SAVE";
  }
}

async function loadState() {
  const localState = readLocalState();
  const cloudState = await readCloudState();
  const selected = chooseNewestState(localState, cloudState);
  writeLocalState(selected);
  return selected;
}

function updateSaveStatus(label = storageState.saveMode) {
  const status = $("#saveStatus");
  const badge = $("#saveModeBadge");
  const translated = localizeSaveLabel(label);
  if (status) status.textContent = translated;
  if (badge) badge.textContent = translated;
}

function saveState(immediate = false) {
  clearTimeout(localSaveTimer);
  clearTimeout(cloudSaveTimer);

  const queueWrite = async flush => {
    const snapshot = buildSnapshot();
    const localOkay = writeLocalState(snapshot);
    let cloudOkay = true;

    if (storageState.player) {
      cloudOkay = await writeCloudState(snapshot, flush);
    }

    updateSaveStatus(localOkay && cloudOkay ? storageState.saveMode : "SAVE ERROR");
  };

  if (immediate) {
    void queueWrite(true);
    return;
  }
  localSaveTimer = setTimeout(() => {
    const snapshot = buildSnapshot();
    const localOkay = writeLocalState(snapshot);
    updateSaveStatus(localOkay ? storageState.saveMode : "SAVE ERROR");
  }, LOCAL_SAVE_DELAY);

  if (storageState.player) {
    cloudSaveTimer = setTimeout(() => {
      void queueWrite(false);
    }, CLOUD_SAVE_DELAY);
  }
}

function getCharacter(id = state.activeId) {
  if (id === EVENT_CHARACTER.id) return EVENT_CHARACTER;
  return CHARACTER_BY_ID.get(id) || CHARACTERS[0];
}

function isOwned(id) {
  return state.ownedIds.includes(id) || state.ownedEventIds.includes(id);
}

function isEventCharacterOwned() {
  return state.ownedEventIds.includes(EVENT_CHARACTER.id);
}

function isEventActive(now = Date.now()) {
  return Number.isFinite(state.eventEndsAt) && state.eventEndsAt > now;
}

function getEventTimeLeft(now = Date.now()) {
  return Math.max(0, state.eventEndsAt - now);
}

function getActiveEventMeta() {
  if (!isEventActive()) return null;
  return {
    id: state.eventId,
    name: "Кошачий фестиваль",
    text: "Ивентовая кошкодевочка уже в кейсе. Открывай событие и собирай редкий образ.",
    bannerId: "event",
    character: EVENT_CHARACTER
  };
}

function getFeaturedCharacter() {
  if (state.heroView === HERO_VIEW_EVENT && isEventActive()) return EVENT_CHARACTER;
  return getCharacter();
}

function normalizeRuntimeState() {
  if (!Number.isFinite(state.aura)) state.aura = 0;
  if (!Number.isFinite(state.lifetimeClicks)) state.lifetimeClicks = 0;
  if (!Number.isFinite(state.lifetimeAuraEarned)) state.lifetimeAuraEarned = 0;
  if (!Number.isFinite(state.caseOpens)) state.caseOpens = 0;
  if (!Number.isFinite(state.accessoryShards)) state.accessoryShards = 0;
  if (!Number.isFinite(state.prestigePoints)) state.prestigePoints = 0;
  if (!Number.isFinite(state.bossVictories)) state.bossVictories = 0;
  if (!Number.isFinite(state.activeBuffUntil)) state.activeBuffUntil = 0;
  if (!Number.isFinite(state.bossNextAt)) state.bossNextAt = 0;
  if (!Number.isFinite(state.bossActiveUntil)) state.bossActiveUntil = 0;
  if (!Number.isFinite(state.bossHp)) state.bossHp = 0;
  if (!Number.isFinite(state.bossMaxHp)) state.bossMaxHp = 0;
  if (!Number.isFinite(state.eventCasePity)) state.eventCasePity = 0;
  if (!Array.isArray(state.ownedIds)) state.ownedIds = [CHARACTERS[0].id];
  state.ownedIds = [...new Set(state.ownedIds.filter(id => VALID_CHARACTER_IDS.has(id)))];
  if (!state.ownedIds.length) state.ownedIds = [CHARACTERS[0].id];
  if (!Array.isArray(state.ownedEventIds)) state.ownedEventIds = [];
  state.ownedEventIds = [...new Set(state.ownedEventIds.filter(id => EVENT_CHARACTER_IDS.has(id)))];
  if (!VALID_CHARACTER_IDS.has(state.activeId)) state.activeId = state.ownedIds[0];
  if (!WORLD_DEFS.some(world => world.id === state.worldId)) state.worldId = WORLD_DEFS[0].id;
  if (![HERO_VIEW_ACTIVE, HERO_VIEW_EVENT].includes(state.heroView)) state.heroView = HERO_VIEW_ACTIVE;
  if (![COLLECTION_TAB_ALL, COLLECTION_TAB_REGULAR, COLLECTION_TAB_EVENT].includes(state.collectionTab)) {
    state.collectionTab = COLLECTION_TAB_ALL;
  }
  if (typeof state.eventId !== "string" || !state.eventId) state.eventId = "festival-miya";
  if (!Number.isFinite(state.eventEndsAt) || state.eventEndsAt <= 0) {
    state.eventEndsAt = Date.now() + EVENT_DURATION_MS;
  }
  if (!isEventActive() && state.heroView === HERO_VIEW_EVENT) state.heroView = HERO_VIEW_ACTIVE;
  if (!state.casePity || typeof state.casePity !== "object") state.casePity = {};
  if (!Array.isArray(state.craftedPerks)) state.craftedPerks = [];
  if (!Array.isArray(state.dailyContracts)) state.dailyContracts = [];
  if (!Array.isArray(state.expeditions)) state.expeditions = [];
  if (!Array.isArray(state.buffDraft)) state.buffDraft = [];
  for (const key of Object.keys(state.upgrades || {})) {
    if (!Number.isFinite(state.upgrades[key])) state.upgrades[key] = 0;
  }

  const unlockedWorldIndex = getUnlockedWorldIndex();
  const currentWorldIndex = getWorldIndex(state.worldId);
  if (currentWorldIndex > unlockedWorldIndex) {
    state.worldId = WORLD_DEFS[unlockedWorldIndex].id;
  }
  normalizeMechanicsState();
}

function collectionProgressRatio() {
  return CHARACTERS.length ? new Set(state.ownedIds).size / CHARACTERS.length : 0;
}

function autoClickRate() {
  const progress = collectionProgressRatio();
  if (progress < 0.5) return 0;
  return 1 + Math.floor((progress - 0.5) * 10);
}

function renderCollectionProgress() {
  const progress = collectionProgressRatio();
  const percent = Math.floor(progress * 100);
  const bar = $("#collectionProgressBar");
  const text = $("#collectionProgressText");
  const autoText = $("#collectionAutoText");
  const bonus = collectionBonus();
  if (bar) bar.style.width = `${Math.min(100, percent)}%`;
  if (text) text.textContent = `${percent}%`;
  if (autoText) {
    if (progress >= 0.5) {
      autoText.textContent = `Автокликер активен: ${autoClickRate()} клик/сек. Бонус коллекции: +${bonus.click} к клику, +${bonus.idle} к авто-фарму.`;
    } else {
      const left = Math.max(0, Math.ceil((0.5 - progress) * 100));
      autoText.textContent = `До автокликера осталось ${left}% коллекции. Бонус коллекции: +${bonus.click} к клику, +${bonus.idle} к авто-фарму.`;
    }
  }
}

function portraitStyle(character) {
  const [hair, hairDark, skin, outfit, accent] = character.palette;
  const hue = (character.index * 29) % 360;
  const scale = (0.98 + (character.index % 5) * 0.01).toFixed(2);
  const lean = ((character.index % 7) - 3) * 0.75;
  const lift = ((character.index % 4) - 1) * 1.5;
  return [
    `--rarity:${RARITY_COLORS[character.rarity]}`,
    `--hair:${hair}`,
    `--hair-dark:${hairDark}`,
    `--skin:${skin}`,
    `--outfit:${outfit}`,
    `--accent:${accent}`,
    `--portrait-hue:${hue}deg`,
    `--portrait-scale:${scale}`,
    `--portrait-lean:${lean}deg`,
    `--portrait-lift:${lift}px`
  ].join(";") + ";";
}

function eventPortraitOrnamentsMarkup() {
  return `
    <span class="event-ornament event-ear left" aria-hidden="true"></span>
    <span class="event-ornament event-ear right" aria-hidden="true"></span>
    <span class="event-ornament event-tail" aria-hidden="true"></span>
    <span class="event-ornament event-spark event-spark-a" aria-hidden="true"></span>
    <span class="event-ornament event-spark event-spark-b" aria-hidden="true"></span>
    <span class="event-ornament event-spark event-spark-c" aria-hidden="true"></span>`;
}

function portraitMarkup(character, extraClass = "") {
  return `
    <div class="portrait has-image ${character.isEvent ? "event-portrait" : ""} ${extraClass}" aria-hidden="true">
      ${character.isEvent ? eventPortraitOrnamentsMarkup() : ""}
      ${portraitImageMarkup(character)}
    </div>`.trim();
}

function portraitImageMarkup(character) {
  return `<img class="portrait-image" src="${character.asset}" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
}

function rarityClass(rarity) {
  return `rarity-${rarity.toLowerCase()}`;
}

function formatAura(value) {
  const rounded = Math.floor(value);
  if (rounded < 1000) return String(rounded);
  if (rounded < 1e6) return `${(rounded / 1e3).toFixed(rounded < 1e4 ? 1 : 0)}K`;
  if (rounded < 1e9) return `${(rounded / 1e6).toFixed(rounded < 1e7 ? 1 : 0)}M`;
  return `${(rounded / 1e9).toFixed(1)}B`;
}

function upgradeCost(type) {
  const base = { click: 80, idle: 130, combo: 190 }[type];
  return Math.floor(base * Math.pow(1.72, state.upgrades[type]));
}

function tapPower() {
  const active = getCharacter();
  const world = getSelectedWorld().bonuses;
  const event = getCurrentEvent().event;
  const buff = activeBuffEffects();
  const raw = 1 + state.upgrades.click + Math.floor(active.stats.click / 2) + accessoryBonus("click") + collectionBonus().click;
  return Math.max(1, Math.round(raw * world.click * event.click * (buff.click || 1)));
}

function idlePower() {
  const active = getCharacter();
  const world = getSelectedWorld().bonuses;
  const event = getCurrentEvent().event;
  const buff = activeBuffEffects();
  const raw = state.upgrades.idle + active.stats.aura * 0.2 + accessoryBonus("idle") * 0.5 + collectionBonus().idle * 0.35;
  return raw * world.idle * event.idle * (buff.idle || 1);
}

function comboMultiplier() {
  const active = getCharacter();
  const world = getSelectedWorld().bonuses;
  const event = getCurrentEvent().event;
  const buff = activeBuffEffects();
  const step = (0.2 + state.upgrades.combo * 0.03 + active.stats.combo * 0.01 + accessoryBonus("combo") * 0.01 + collectionBonus().combo * 0.02) * world.combo * event.combo * (buff.combo || 1);
  return 1 + Math.floor(comboStreak / 5) * step;
}

function getEquippedAccessories() {
  return state.equippedAccessoryIds
    .map(id => ACCESSORIES.find(accessory => accessory.id === id))
    .filter(Boolean);
}

function accessoryBonus(type) {
  return getEquippedAccessories().reduce((sum, accessory) => sum + (accessory.bonuses?.[type] || 0), 0);
}

function accessoryBonusText() {
  const bonuses = { click: 0, idle: 0, combo: 0, aura: 0 };
  for (const accessory of getEquippedAccessories()) {
    for (const key of Object.keys(bonuses)) {
      bonuses[key] += accessory.bonuses?.[key] || 0;
    }
  }
  return bonuses;
}

function collectionBonus() {
  const uniqueIds = [...new Set(state.ownedIds)];
  const totals = {
    click: Math.floor(uniqueIds.length / 10),
    idle: Math.floor(uniqueIds.length / 16),
    combo: Math.floor(uniqueIds.length / 24)
  };
  const nationCounts = new Map();

  for (const id of uniqueIds) {
    const character = getCharacter(id);
    nationCounts.set(character.nation, (nationCounts.get(character.nation) || 0) + 1);
  }

  for (const count of nationCounts.values()) {
    if (count >= 3) totals.click += 1;
    if (count >= 5) totals.idle += 1;
    if (count >= 8) totals.combo += 1;
  }

  return totals;
}

function worldBonus() {
  return getSelectedWorld().bonuses;
}

function getGoalProgress(goal) {
  switch (goal.kind) {
    case "lifetimeClicks":
      return Math.min(goal.target, state.lifetimeClicks);
    case "aura":
      return Math.min(goal.target, state.aura);
    case "caseOpens":
      return Math.min(goal.target, state.caseOpens);
    case "ownedAccessories":
      return Math.min(goal.target, state.ownedAccessories.length);
    case "ownedIds":
      return Math.min(goal.target, new Set(state.ownedIds).size);
    default:
      return 0;
  }
}

function goalIsComplete(goal) {
  return getGoalProgress(goal) >= goal.target;
}

function getWorldIndex(id) {
  return WORLD_DEFS.findIndex(world => world.id === id);
}

function getUnlockedWorldIndex() {
  const ownedCount = new Set(state.ownedIds).size;
  let unlockedIndex = 0;
  WORLD_DEFS.forEach((world, index) => {
    if (ownedCount >= world.threshold) unlockedIndex = index;
  });
  return unlockedIndex;
}

function getSelectedWorld() {
  const unlockedIndex = getUnlockedWorldIndex();
  const currentIndex = Math.max(0, getWorldIndex(state.worldId));
  return WORLD_DEFS[Math.min(currentIndex, unlockedIndex)] || WORLD_DEFS[0];
}

function getAvailableWorlds() {
  return WORLD_DEFS.slice(0, getUnlockedWorldIndex() + 1);
}

function getAvailableBanners() {
  const unlockedIndex = getUnlockedWorldIndex();
  return BANNERS.filter(banner => {
    const worldUnlocked = getWorldIndex(banner.unlockWorld || WORLD_DEFS[0].id) <= unlockedIndex;
    const eventUnlocked = !banner.eventOnly || isEventActive();
    return worldUnlocked && eventUnlocked;
  });
}

function isBannerUnlocked(bannerOrId) {
  const banner = typeof bannerOrId === "string"
    ? BANNERS.find(item => item.id === bannerOrId)
    : bannerOrId;
  if (!banner) return false;
  return getWorldIndex(banner.unlockWorld || WORLD_DEFS[0].id) <= getUnlockedWorldIndex() && (!banner.eventOnly || isEventActive());
}

function getBanner(id = selectedBannerId) {
  const chosen = BANNERS.find(banner => banner.id === id);
  if (chosen && isBannerUnlocked(chosen)) return chosen;
  return getAvailableBanners()[0] || BANNERS[0];
}

function rollFromOdds(odds) {
  const roll = Math.random();
  let total = 0;
  for (const [rarity, chance] of odds) {
    total += chance;
    if (roll <= total) return rarity;
  }
  return odds[odds.length - 1][0];
}

function applyCasePity(odds, pity = 0) {
  if (!pity) return odds;
  const adjusted = odds.map(([rarity, chance]) => [rarity, chance]);
  const bonus = clamp(pity, 0, 0.18);
  adjusted[0][1] = Math.max(0.01, adjusted[0][1] - bonus * 0.82);
  if (adjusted[1]) adjusted[1][1] += bonus * 0.44;
  if (adjusted[2]) adjusted[2][1] += bonus * 0.2;
  if (adjusted[3]) adjusted[3][1] += bonus * 0.12;
  if (adjusted[4]) adjusted[4][1] += bonus * 0.06;
  const total = adjusted.reduce((sum, [, chance]) => sum + chance, 0) || 1;
  return adjusted.map(([rarity, chance]) => [rarity, chance / total]);
}

function pickCaseCharacter(banner = getBanner()) {
  const pity = clamp(state.casePity[banner.unlockWorld || WORLD_DEFS[0].id] || 0, 0, 0.18);
  const rarity = rollFromOdds(applyCasePity(banner.odds, pity));
  if (banner.id === "event") {
    if (state.eventCasePity >= 99 || rarity === "Event") {
      state.eventCasePity = 0;
      return EVENT_CHARACTER;
    }
    state.eventCasePity = clamp(state.eventCasePity + 1, 0, 99);
  }
  const pool = RARITY_POOLS[rarity] || CHARACTERS;
  return pool[Math.floor(Math.random() * pool.length)] || CHARACTERS[0];
}

function getBannerIntro(banner = getBanner()) {
  return `${banner.name} • ${banner.subtitle}`;
}

function getAccessoryBonusLine(accessory) {
  const parts = [];
  if (accessory.bonuses.click) parts.push(`клик +${accessory.bonuses.click}`);
  if (accessory.bonuses.idle) parts.push(`афк +${accessory.bonuses.idle}`);
  if (accessory.bonuses.combo) parts.push(`комбо +${accessory.bonuses.combo}`);
  if (accessory.bonuses.aura) parts.push(`аура +${accessory.bonuses.aura}`);
  return parts.join(" | ");
}

function isAccessoryEquipped(id) {
  return state.equippedAccessoryIds.includes(id);
}

function canEquipAccessory(id) {
  return state.ownedAccessories.includes(id);
}

function todayKey(date = new Date()) {
  return date.toLocaleDateString("sv-SE");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hashString(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle(items, seed) {
  const result = [...items];
  let value = hashString(seed) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    const swapIndex = value % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}ч ${String(minutes).padStart(2, "0")}м`;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getCurrentEvent(now = Date.now()) {
  const cycle = Math.floor(now / EVENT_ROTATION_MS);
  const event = WORLD_EVENTS[cycle % WORLD_EVENTS.length] || WORLD_EVENTS[0];
  return {
    event,
    endsAt: (cycle + 1) * EVENT_ROTATION_MS
  };
}

function getActiveBuff(now = Date.now()) {
  if (!state.activeBuffId || !state.activeBuffUntil || now >= state.activeBuffUntil) return null;
  return BUFF_OPTIONS.find(option => option.id === state.activeBuffId) || null;
}

function activeBuffEffects(now = Date.now()) {
  const buff = getActiveBuff(now);
  return buff?.effects || {};
}

function maybeExpireBuff(now = Date.now()) {
  if (state.activeBuffId && state.activeBuffUntil && now >= state.activeBuffUntil) {
    state.activeBuffId = "";
    state.activeBuffUntil = 0;
  }
}

function bossTemplate(worldId = state.bossWorldId) {
  const def = BOSS_DEFS.find(item => item.worldId === worldId) || BOSS_DEFS[0];
  const worldIndex = Math.max(0, getWorldIndex(def.worldId));
  return {
    ...def,
    worldIndex,
    name: def.name,
    subtitle: def.subtitle,
    rewardAura: Math.round((worldIndex + 1) * 320 * (1.25 + worldIndex * 0.18)),
    rewardShards: def.shards,
    maxHp: Math.round((worldIndex + 1) * 220 + new Set(state.ownedIds).size * 18 + state.upgrades.click * 30 + state.upgrades.idle * 18)
  };
}

function bossIsActive(now = Date.now()) {
  return state.bossHp > 0 && state.bossMaxHp > 0 && state.bossActiveUntil > now;
}

function spawnBossEncounter(now = Date.now()) {
  const world = getSelectedWorld();
  const template = bossTemplate(world.id);
  state.bossWorldId = template.worldId;
  state.bossHp = template.maxHp;
  state.bossMaxHp = template.maxHp;
  state.bossActiveUntil = now + BOSS_DURATION_MS;
  state.bossNextAt = 0;
}

function endBossEncounter(defeated = false, now = Date.now()) {
  const worldId = state.bossWorldId || WORLD_DEFS[0].id;
  if (defeated) {
    const template = bossTemplate(worldId);
    state.aura += template.rewardAura;
    state.lifetimeAuraEarned += template.rewardAura;
    state.accessoryShards += template.rewardShards;
    state.casePity[worldId] = clamp((state.casePity[worldId] || 0) + template.pity, 0, 0.5);
    const buff = BUFF_OPTIONS[Math.floor(Math.random() * BUFF_OPTIONS.length)];
    if (buff) {
      state.activeBuffId = buff.id;
      state.activeBuffUntil = now + buff.duration;
    }
    state.bossVictories += 1;
    showToast(`Босс побеждён: +${template.rewardAura} ауры`);
  }
  state.bossHp = 0;
  state.bossMaxHp = 0;
  state.bossActiveUntil = 0;
  state.bossNextAt = now + BOSS_COOLDOWN_MS;
}

function damageBoss(amount, source = "click") {
  if (!Number.isFinite(amount) || amount <= 0) return false;
  const now = Date.now();
  if (!bossIsActive(now)) return false;
  state.bossHp = Math.max(0, state.bossHp - amount);
  if (state.bossHp <= 0) {
    endBossEncounter(true, now);
    renderBalance();
    renderGameStats();
    renderCaseButton();
    renderGoals();
    renderMechanicsPanels();
    saveState(true);
    return true;
  }
  if (source === "click") playTone(540, 0.03, "triangle");
  return true;
}

function ensureDailyContracts(now = Date.now()) {
  const day = todayKey(new Date(now));
  if (state.dailyContractDate !== day || !Array.isArray(state.dailyContracts) || state.dailyContracts.length === 0) {
    const seed = `${day}-${new Set(state.ownedIds).size}-${state.caseOpens}-${state.lifetimeClicks}`;
    state.dailyContractDate = day;
    state.dailyContracts = seededShuffle(DAILY_CONTRACT_POOL, seed).slice(0, 3).map(contract => ({
      id: contract.id,
      title: contract.title,
      kind: contract.kind,
      target: contract.target,
      rewardAura: contract.rewardAura,
      rewardShards: contract.rewardShards,
      claimed: false
    }));
  }
}

function contractProgressValue(contract) {
  switch (contract.kind) {
    case "lifetimeClicks":
    return Math.min(contract.target, state.lifetimeClicks);
    case "aura":
      return Math.min(contract.target, state.lifetimeAuraEarned);
    case "ownedIds":
      return Math.min(contract.target, new Set(state.ownedIds).size);
    case "caseOpens":
      return Math.min(contract.target, state.caseOpens);
    case "ownedAccessories":
      return Math.min(contract.target, state.ownedAccessories.length);
    default:
      return 0;
  }
}

function claimContract(id) {
  ensureDailyContracts();
  const contract = state.dailyContracts.find(item => item.id === id);
  if (!contract || contract.claimed) return;
  const progress = contractProgressValue(contract);
  if (progress < contract.target) return;
  contract.claimed = true;
  state.aura += contract.rewardAura;
  state.lifetimeAuraEarned += contract.rewardAura;
  state.accessoryShards += contract.rewardShards;
  if (contract.rewardShards > 0) {
    state.casePity[getSelectedWorld().id] = clamp((state.casePity[getSelectedWorld().id] || 0) + contract.rewardShards * 0.01, 0, 0.5);
  }
  showToast(`Контракт выполнен: +${contract.rewardAura} ауры`);
  renderBalance();
  renderGameStats();
  renderMechanicsPanels();
  saveState(true);
}

function getExpeditionRoute(routeId) {
  return EXPEDITION_ROUTES.find(route => route.id === routeId) || EXPEDITION_ROUTES[0];
}

function getExpeditionProgress(expedition, now = Date.now()) {
  return clamp((now - expedition.startedAt) / Math.max(1, expedition.endsAt - expedition.startedAt), 0, 1);
}

function expeditionStateFor(routeId) {
  return state.expeditions.find(expedition => expedition.routeId === routeId && !expedition.claimed) || null;
}

function startExpedition(routeId) {
  const route = getExpeditionRoute(routeId);
  if (getWorldIndex(route.world) > getUnlockedWorldIndex()) return;
  if (expeditionStateFor(routeId)) return;
  const now = Date.now();
  state.expeditions.push({
    id: `${routeId}-${now}`,
    routeId,
    characterId: state.activeId,
    startedAt: now,
    endsAt: now + route.duration,
    claimed: false
  });
  showToast(`Экспедиция началась: ${route.name}`);
  renderMechanicsPanels();
  saveState(true);
}

function claimExpedition(expeditionId) {
  const expedition = state.expeditions.find(item => item.id === expeditionId && !item.claimed);
  if (!expedition) return;
  const now = Date.now();
  if (now < expedition.endsAt) return;
  const route = getExpeditionRoute(expedition.routeId);
  expedition.claimed = true;
  state.aura += route.aura;
  state.lifetimeAuraEarned += route.aura;
  state.accessoryShards += route.shards;
  state.casePity[route.world] = clamp((state.casePity[route.world] || 0) + route.caseBoost, 0, 0.5);
  state.expeditions = state.expeditions.filter(item => item.id !== expeditionId);
  showToast(`Экспедиция завершена: +${route.aura} ауры`);
  renderBalance();
  renderGameStats();
  renderMechanicsPanels();
  saveState(true);
}

function normalizeMechanicsState(now = Date.now()) {
  ensureDailyContracts(now);
  maybeExpireBuff(now);
  if (state.bossHp > 0 && state.bossActiveUntil > 0 && now >= state.bossActiveUntil) {
    endBossEncounter(false, now);
  }
  if (!bossIsActive(now) && now >= state.bossNextAt) {
    spawnBossEncounter(now);
  }
  state.expeditions = Array.isArray(state.expeditions)
    ? state.expeditions.filter(expedition => expedition && expedition.id && expedition.routeId)
    : [];
}

function currentLoreChapter() {
  const ownedCount = new Set(state.ownedIds).size;
  let chapter = LORE_CHAPTERS[0];
  for (const item of LORE_CHAPTERS) {
    if (ownedCount >= item.threshold) chapter = item;
  }
  return chapter;
}

function renderEventPanel() {
  const { event, endsAt } = getCurrentEvent();
  const timer = $("#eventTimer");
  const name = $("#eventName");
  const text = $("#eventText");
  const bonus = $("#eventBonusLine");
  const buff = getActiveBuff();
  const buffLine = $("#activeBuffLine");
  if (timer) timer.textContent = formatDuration(endsAt - Date.now());
  if (name) name.textContent = event.name;
  if (text) text.textContent = event.text;
  if (bonus) bonus.textContent = `Бонусы: аура x${event.aura.toFixed(2)}, клик x${event.click.toFixed(2)}, афк x${event.idle.toFixed(2)}, комбо x${event.combo.toFixed(2)}`;
  if (buffLine) {
    buffLine.textContent = buff ? `Активный буст: ${buff.name} до ${new Date(state.activeBuffUntil).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Активный буст отсутствует";
  }
}

function renderBossPanel() {
  const panel = $("#bossPanel");
  if (!panel) return;
  const now = Date.now();
  const active = bossIsActive(now);
  const template = bossTemplate(state.bossWorldId);
  const hpPercent = template.maxHp ? (state.bossHp / template.maxHp) * 100 : 0;
  const title = $("#bossName");
  const desc = $("#bossText");
  const hpText = $("#bossHpText");
  const hpBar = $("#bossHpBar");
  const reward = $("#bossRewardLine");
  const timer = $("#bossTimer");
  const attack = $("#bossAttackButton");
  if (title) title.textContent = active ? template.name : "Ожидание босса";
  if (desc) desc.textContent = active ? template.subtitle : `Следующий босс появится через ${formatDuration(Math.max(0, state.bossNextAt - now))}`;
  if (hpText) hpText.textContent = active ? `${Math.max(0, Math.ceil(state.bossHp))} / ${template.maxHp}` : `Побед: ${state.bossVictories}`;
  if (hpBar) hpBar.style.width = `${clamp(hpPercent, 0, 100)}%`;
  if (reward) reward.textContent = active ? `Награда: +${template.rewardAura} ауры, +${template.rewardShards} шардов, pity +${(template.pity * 100).toFixed(0)}%` : "Босс отдыхает";
  if (timer) timer.textContent = active ? formatDuration(state.bossActiveUntil - now) : formatDuration(Math.max(0, state.bossNextAt - now));
  if (attack) attack.disabled = !active;
}

function renderContractsPanel() {
  const list = $("#contractList");
  if (!list) return;
  ensureDailyContracts();
  list.innerHTML = state.dailyContracts.map(contract => {
    const progress = contractProgressValue(contract);
    const complete = progress >= contract.target;
    return `
      <button class="contract-card ${contract.claimed ? "claimed" : complete ? "ready" : ""}" type="button" data-contract="${contract.id}" ${complete && !contract.claimed ? "" : "disabled"}>
        <div class="contract-head">
          <strong>${contract.title}</strong>
          <span>${progress}/${contract.target}</span>
        </div>
        <div class="contract-bar"><span style="width:${Math.min(100, progress / contract.target * 100)}%"></span></div>
        <div class="contract-foot">
          <small>+${contract.rewardAura} A и +${contract.rewardShards} шардов</small>
          <b>${contract.claimed ? "ПОЛУЧЕНО" : complete ? "ЗАБРАТЬ" : "В ПРОЦЕССЕ"}</b>
        </div>
      </button>`;
  }).join("");
}

function renderExpeditionsPanel() {
  const list = $("#expeditionList");
  if (!list) return;
  const now = Date.now();
  list.innerHTML = EXPEDITION_ROUTES.map(route => {
    const unlocked = getWorldIndex(route.world) <= getUnlockedWorldIndex();
    const expedition = expeditionStateFor(route.id);
    const complete = expedition && now >= expedition.endsAt;
    const worldIndex = Math.max(0, getWorldIndex(route.world));
    return `
      <article class="expedition-card ${unlocked ? "" : "locked"} ${complete ? "ready" : ""}">
        <div class="expedition-head">
          <strong>${route.name}</strong>
          <span>Мир ${worldIndex + 1}</span>
        </div>
        <p>${unlocked ? `Аура +${route.aura}, шарды +${route.shards}, pity +${Math.round(route.caseBoost * 100)}%` : "Закрыто текущим прогрессом"}</p>
        <div class="expedition-foot">
          <small>${formatDuration(route.duration)}</small>
          ${expedition
            ? complete
              ? `<button type="button" data-expedition-claim="${expedition.id}">ЗАБРАТЬ</button>`
              : `<span>${formatDuration(expedition.endsAt - now)} осталось</span>`
            : `<button type="button" data-expedition-start="${route.id}" ${unlocked ? "" : "disabled"}>ОТПРАВИТЬ</button>`}
        </div>
      </article>`;
  }).join("");
}

function renderLorePanel() {
  const chapter = currentLoreChapter();
  const title = $("#loreTitle");
  const text = $("#loreText");
  if (title) title.textContent = chapter.title;
  if (text) text.textContent = chapter.text;
}

function renderMechanicsPanels() {
  renderEventPanel();
  renderBossPanel();
  renderContractsPanel();
  renderExpeditionsPanel();
  renderLorePanel();
}

function renderAll() {
  renderTopbar();
  renderBalance();
  renderLiveCharacter();
  renderGameStats();
  renderCollection();
  renderCaseButton();
  renderBanners();
  renderAccessories();
  renderGoals();
  renderSettings();
}

function renderTopbar() {
  $("#playerTag").textContent = storageState.playerLabel;
  updateSaveStatus();
}

function renderBalance() {
  $("#collectionCountMenu").textContent = `${state.ownedIds.length} / ${CHARACTERS.length}${state.ownedEventIds?.length ? ` + ${state.ownedEventIds.length} ИВЕНТ` : ""}`;
  normalizeRuntimeState();
  $("#auraBalance").textContent = formatAura(state.aura);
  $("#clickBalance").textContent = formatAura(state.lifetimeClicks);
  $("#collectionCount").textContent = `${state.ownedIds.length} / ${CHARACTERS.length}`;
  $("#collectionCountMenu").textContent = `${state.ownedIds.length} / ${CHARACTERS.length} открыто`;
  $("#collectionCountMenu").textContent = `${state.ownedIds.length} / ${CHARACTERS.length}${state.ownedEventIds?.length ? ` + ${state.ownedEventIds.length} ИВЕНТ` : ""}`;
  renderCollectionProgress();
  renderWorlds();
  renderMechanicsPanels();
  updateGoalPanel();
}

function updateGoalPanel() {
  const summary = $("#goalsList");
  if (!summary) return;
  const activeGoal = GOALS.find(goal => !state.claimedGoalIds.includes(goal.id)) || GOALS[0];
  const progress = getGoalProgress(activeGoal);
  summary.dataset.goalTitle = activeGoal.title;
  summary.dataset.goalProgress = `${progress}/${activeGoal.target}`;
}

function renderHeroSwitcher() {
  const buttons = $$("[data-hero-view]");
  buttons.forEach(button => {
    const view = button.dataset.heroView;
    const active = view === state.heroView && (view !== HERO_VIEW_EVENT || isEventActive());
    button.classList.toggle("active", active);
    button.disabled = view === HERO_VIEW_EVENT && !isEventActive();
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function renderLiveCharacter() {
  const character = getFeaturedCharacter();
  const card = $("#liveCard");
  card.className = `waifu-card live-card ${rarityClass(character.rarity)} ${character.isEvent ? "event-feature" : ""} ${state.heroView === HERO_VIEW_EVENT ? "view-event" : "view-active"}`;
  card.style.cssText = portraitStyle(character);
  $("#liveId").textContent = character.id;
  $("#liveName").textContent = character.name;
  $("#liveTitle").textContent = character.title;
  $("#liveElement").textContent = character.element;
  $("#liveQuote").textContent = `"${character.quote}"`;
  $("#liveRarity").textContent = displayRarity(character.rarity);
  $("#liveAuraStat").textContent = character.stats.aura;
  $("#liveClickStat").textContent = character.stats.click;
  $("#liveComboStat").textContent = character.stats.combo;
  $("#liveNation").textContent = character.nation;
  const portrait = $("#livePortrait");
  if (portrait) {
    portrait.className = `portrait large has-image ${character.isEvent ? "event-portrait" : ""}`;
    portrait.style.cssText = portraitStyle(character);
    portrait.innerHTML = `${character.isEvent ? eventPortraitOrnamentsMarkup() : ""}${portraitImageMarkup(character)}`;
  }
  renderHeroSwitcher();
}

function renderGameStats() {
  const character = getCharacter();
  const world = getSelectedWorld();
  $("#tapPower").textContent = tapPower();
  $("#idlePower").textContent = idlePower().toFixed(1);
  $("#sessionClicks").textContent = formatAura(state.lifetimeClicks);
  $("#clickLevel").textContent = state.upgrades.click;
  $("#idleLevel").textContent = state.upgrades.idle;
  $("#comboLevel").textContent = state.upgrades.combo;

  for (const type of ["click", "idle", "combo"]) {
    const cost = upgradeCost(type);
    $(`#${type}Cost`).textContent = cost;
    $(`[data-upgrade="${type}"]`).disabled = state.aura < cost;
  }

  const mini = $("#activeMini");
  mini.style.setProperty("--rarity", RARITY_COLORS[character.rarity]);
  mini.innerHTML = `
    <div class="active-mini-inner" style="${portraitStyle(character)}">
      <div class="mini-portrait has-image">${portraitImageMarkup(character)}</div>
      <div>
        <b>${character.name}</b>
        <small>${character.title} | ${character.rarity.toUpperCase()} | ${character.element} | ${character.nation}</small>
      </div>
    </div>`;

  const worldLabel = $("#worldCurrentLabel");
  const worldWorld = $("#worldCurrentWorld");
  const worldCase = $("#worldCurrentCase");
  if (worldLabel && worldWorld && worldCase) {
    const worldIndex = Math.max(0, getWorldIndex(world.id));
    worldLabel.textContent = `Мир ${worldIndex + 1} / ${WORLD_DEFS.length}`;
    worldWorld.textContent = world.name;
    worldCase.textContent = `Баннер: ${BANNERS.find(banner => banner.unlockWorld === world.id)?.name || "нет"}`;
  }
}

function renderWorlds() {
  const panel = $("#worldPanel");
  const list = $("#worldList");
  const name = $("#worldCurrentWorld");
  const desc = $("#worldCurrentDesc");
  const progress = $("#worldUnlockProgress");
  const bonus = $("#worldBonusLine");
  if (!panel || !list || !name || !desc || !progress || !bonus) return;

  const unlockedIndex = getUnlockedWorldIndex();
  const currentWorld = getSelectedWorld();
  const nextWorld = WORLD_DEFS[unlockedIndex + 1];
  const ownedCount = new Set(state.ownedIds).size;
  const nextTarget = nextWorld ? nextWorld.threshold : WORLD_DEFS[WORLD_DEFS.length - 1].threshold;

  name.textContent = currentWorld.name;
  desc.textContent = currentWorld.description;
  progress.textContent = `${ownedCount} / ${nextTarget}`;
  bonus.textContent = `Бонус мира: аура x${currentWorld.bonuses.aura.toFixed(2)}, клик x${currentWorld.bonuses.click.toFixed(2)}, афк x${currentWorld.bonuses.idle.toFixed(2)}, комбо x${currentWorld.bonuses.combo.toFixed(2)}`;

  list.innerHTML = WORLD_DEFS.map((worldDef, index) => {
    const unlocked = index <= unlockedIndex;
    const active = worldDef.id === currentWorld.id;
    const unlockCase = BANNERS.find(banner => banner.unlockWorld === worldDef.id);
    return `
      <button class="world-card ${active ? "active" : ""} ${unlocked ? "" : "locked"}" type="button" data-world="${worldDef.id}" ${unlocked ? "" : "disabled"}>
        <strong>${worldDef.name}</strong>
        <small>${worldDef.description}</small>
        <span>${unlocked ? `Мир ${index + 1}` : `Откроется на ${worldDef.threshold} вайфу`}</span>
        <div>${unlockCase ? `Баннер: ${unlockCase.name}` : "Финальный мир"}</div>
      </button>`;
  }).join("");
}

function getCollectionPool() {
  if (state.collectionTab === COLLECTION_TAB_EVENT) return [EVENT_CHARACTER];
  if (state.collectionTab === COLLECTION_TAB_REGULAR) return CHARACTERS;
  return [...CHARACTERS, EVENT_CHARACTER];
}

function renderCollection() {
  const collectionPool = getCollectionPool();
  const visible = collectionPool.filter(character => {
    if (state.collectionTab === COLLECTION_TAB_EVENT && character.id === EVENT_CHARACTER.id) return true;
    const rarityMatch = filter === "All" || character.rarity === filter;
    const owned = isOwned(character.id);
    const ownershipMatch = ownershipFilter === "All"
      || (ownershipFilter === "Owned" && owned)
      || (ownershipFilter === "Locked" && !owned);
    return rarityMatch && ownershipMatch;
  });

  const totalPages = Math.max(1, Math.ceil(visible.length / COLLECTION_PAGE_SIZE));
  collectionPage = Math.min(collectionPage, totalPages);
  const startIndex = (collectionPage - 1) * COLLECTION_PAGE_SIZE;
  const pageItems = visible.slice(startIndex, startIndex + COLLECTION_PAGE_SIZE);
  const grid = $("#collectionGrid");
  grid.innerHTML = pageItems.length
    ? pageItems.map(character => {
        const owned = isOwned(character.id);
        return `
          <button class="collection-card ${rarityClass(character.rarity)} ${character.id === state.activeId ? "selected" : ""} ${owned ? "" : "locked"}"
            type="button" data-character="${character.id}" style="${portraitStyle(character)}" aria-label="${owned ? `Выбрать ${character.name}` : `${character.name} ещё не открыта`}">
        <div class="collection-ribbon">${owned ? "ОТКРЫТА" : "ЗАКРЫТА"}</div>
        <div class="collection-portrait">${portraitMarkup(character)}</div>
        <div class="collection-card-copy">
          <small>${character.id} | ${displayRarity(character.rarity)}</small>
          <h3>${owned ? character.name : "Скрытая вайфу"}</h3>
          <p>${owned ? `${character.title} | ${character.nation}` : "Открой баннеры, чтобы раскрыть вайфу"}</p>
          <div class="collection-stats">
            <span>A <b>${character.stats.aura}</b></span>
            <span>C <b>${character.stats.click}</b></span>
            <span>F <b>${character.stats.combo}</b></span>
          </div>
            </div>
          </button>`;
      }).join("")
    : `
      <div class="collection-empty">
        <span>НЕТ СОВПАДЕНИЙ</span>
        <h3>СТРАНИЦА ПУСТА</h3>
        <p>Сдвинь фильтр по редкости или владению, чтобы увидеть другие вайфу.</p>
      </div>`;

  $("#collectionPageLabel").textContent = `СТРАНИЦА ${collectionPage} / ${totalPages}`;
  $("#collectionPageCount").textContent = `${visible.length} КАРТОЧЕК`;
  $("#collectionPrevPage").disabled = collectionPage <= 1;
  $("#collectionNextPage").disabled = collectionPage >= totalPages;
  $$("[data-filter]").forEach(button => button.classList.toggle("active", button.dataset.filter === filter));
  $$("[data-status-filter]").forEach(button => button.classList.toggle("active", button.dataset.statusFilter === ownershipFilter));
  $$("[data-collection-tab]").forEach(button => button.classList.toggle("active", button.dataset.collectionTab === state.collectionTab));
  const focusCharacter = state.collectionTab === COLLECTION_TAB_EVENT
    ? EVENT_CHARACTER
    : pageItems.find(character => character.id === state.activeId) || pageItems[0] || visible[0] || getFeaturedCharacter();
  renderCollectionShowcase(focusCharacter);
}

function renderCollectionShowcase(character = getFeaturedCharacter()) {
  const showcase = $("#collectionShowcase");
  if (!showcase || !character) return;
  const owned = isOwned(character.id);
  let eventActive = false;
  $("#collectionShowcaseName").textContent = owned ? character.name : "Неоткрытая вайфу";
  $("#collectionShowcaseTitle").textContent = owned ? `${character.title} | ${character.nation}` : "Открой баннер, чтобы увидеть вайфу";
  $("#collectionShowcaseQuote").textContent = owned ? `"${character.quote}"` : "Продолжай призыв. Альбом оживает с каждым новым открытием.";
  $("#collectionShowcaseRarity").textContent = displayRarity(character.rarity);
  $("#collectionShowcaseElement").textContent = character.element;
  $("#collectionShowcaseStatus").textContent = owned ? (character.id === state.activeId ? "АКТИВНАЯ" : "ОТКРЫТА") : "ЗАКРЫТА";
  $("#collectionShowcasePortrait").className = `collection-showcase-portrait ${rarityClass(character.rarity)} ${owned ? "" : "locked"}`;
  const image = $("#collectionShowcaseImage");
  image.src = character.asset;
  image.alt = "";
  showcase.style.cssText = portraitStyle(character);
  if (character.isEvent) {
    $("#collectionShowcaseStatus").textContent = eventActive ? "ИВЕНТ" : "ИВЕНТ ЗАВЕРШЕН";
  }
  eventActive = character.isEvent && isEventActive();
  $("#collectionShowcaseName").textContent = owned ? character.name : (character.isEvent ? "Ивентовая карта" : "Неоткрытая вайфу");
  $("#collectionShowcaseTitle").textContent = owned
    ? `${character.title} | ${character.nation}`
    : character.isEvent
      ? "Только во время события"
      : "Открой баннер, чтобы увидеть вайфу";
  $("#collectionShowcaseQuote").textContent = owned
    ? `"${character.quote}"`
    : character.isEvent
      ? "Ивентовая карта сияет только во время проведения."
      : "Продолжай призыв. Альбом оживает с каждым новым открытием.";
  $("#collectionShowcaseStatus").textContent = character.isEvent
    ? (eventActive ? "ИВЕНТ" : "ТУРГ ЗАВЕРШЕН")
    : owned ? (character.id === state.activeId ? "АКТИВНАЯ" : "ОТКРЫТА") : "ЗАКРЫТА";
  $("#collectionShowcasePortrait").className = `collection-showcase-portrait ${rarityClass(character.rarity)} ${character.isEvent ? "event-portrait" : ""} ${owned ? "" : "locked"}`;
  const showcaseImage = $("#collectionShowcaseImage");
  if (showcaseImage) {
    showcaseImage.src = character.asset;
    showcaseImage.alt = "";
  }
  showcase.style.cssText = portraitStyle(character);
}

function renderBalance() {
  normalizeRuntimeState();
  const ownedTotal = state.ownedIds.length + state.ownedEventIds.length;
  const collectionTotal = CHARACTERS.length + 1;
  $("#auraBalance").textContent = formatAura(state.aura);
  $("#clickBalance").textContent = formatAura(state.lifetimeClicks);
  $("#collectionCount").textContent = `${ownedTotal} / ${collectionTotal}`;
  $("#collectionCountMenu").textContent = `${ownedTotal} / ${collectionTotal} открыто`;
  renderCollectionProgress();
  renderWorlds();
  renderMechanicsPanels();
  updateGoalPanel();
}

function renderCollectionShowcase(character = getFeaturedCharacter()) {
  const showcase = $("#collectionShowcase");
  if (!showcase || !character) return;
  const owned = isOwned(character.id);
  const eventActive = character.isEvent && isEventActive();
  $("#collectionShowcaseName").textContent = owned ? character.name : (character.isEvent ? "Ивентовая карта" : "Неоткрытая вайфу");
  $("#collectionShowcaseTitle").textContent = owned
    ? `${character.title} | ${character.nation}`
    : character.isEvent
      ? "Только во время события"
      : "Открой баннер, чтобы увидеть вайфу";
  $("#collectionShowcaseQuote").textContent = owned
    ? `"${character.quote}"`
    : character.isEvent
      ? "Ивентовая карта сияет только во время проведения."
      : "Продолжай призыв. Альбом оживает с каждым новым открытием.";
  $("#collectionShowcaseRarity").textContent = displayRarity(character.rarity);
  $("#collectionShowcaseElement").textContent = character.element;
  $("#collectionShowcaseStatus").textContent = character.isEvent
    ? (eventActive ? "ИВЕНТ" : "ИВЕНТ ЗАВЕРШЕН")
    : owned ? (character.id === state.activeId ? "АКТИВНАЯ" : "ОТКРЫТА") : "ЗАКРЫТА";
  $("#collectionShowcasePortrait").className = `collection-showcase-portrait ${rarityClass(character.rarity)} ${character.isEvent ? "event-portrait" : ""} ${owned ? "" : "locked"}`;
  const image = $("#collectionShowcaseImage");
  if (image) {
    image.src = character.asset;
    image.alt = "";
  }
  showcase.style.cssText = portraitStyle(character);
}

function renderSettings() {
  $("#soundToggle").checked = state.settings.sound;
  $("#motionToggle").checked = state.settings.reducedMotion;
  $("#languageSelect").value = state.settings.language;
  $("#app").classList.toggle("reduce-motion", state.settings.reducedMotion);
  updateSaveStatus();
}

function renderGoals() {
  const list = $("#goalsList");
  if (!list) return;

  list.innerHTML = GOALS.map(goal => {
    const progress = getGoalProgress(goal);
    const complete = goalIsComplete(goal);
    const claimed = state.claimedGoalIds.includes(goal.id);
    return `
      <button class="goal-card ${complete ? "complete" : ""} ${claimed ? "claimed" : ""}" type="button" data-goal="${goal.id}" ${claimed ? "disabled" : ""}>
        <div class="goal-head">
          <strong>${goal.title}</strong>
          <span>${progress}/${goal.target}</span>
        </div>
        <div class="goal-bar"><span style="width:${Math.min(100, progress / goal.target * 100)}%"></span></div>
        <div class="goal-foot">
          <small>Награда +${goal.reward} A</small>
          <b>${claimed ? "ПОЛУЧЕНО" : complete ? "ЗАБРАТЬ" : "В ПРОЦЕССЕ"}</b>
        </div>
      </button>`;
  }).join("");
}

function claimGoal(id) {
  const goal = GOALS.find(item => item.id === id);
  if (!goal || state.claimedGoalIds.includes(goal.id) || !goalIsComplete(goal)) return;
  state.claimedGoalIds.push(goal.id);
  state.aura += goal.reward;
  state.lifetimeAuraEarned += goal.reward;
  showToast(`Цель выполнена: +${goal.reward} ауры`);
  renderBalance();
  renderGameStats();
  renderGoals();
  renderCollection();
  saveState(true);
}

function renderBanners() {
  const row = $("#bannerRow");
  if (!row) return;
  const visibleBanners = getAvailableBanners();
  if (!isBannerUnlocked(selectedBannerId)) {
    selectedBannerId = visibleBanners[0]?.id || BANNERS[0].id;
  }

  row.innerHTML = BANNERS.map(banner => {
    const unlocked = isBannerUnlocked(banner);
    const worldIndex = Math.max(0, getWorldIndex(banner.unlockWorld || WORLD_DEFS[0].id));
    const label = banner.id === "event" ? "Событие" : unlocked ? `Мир ${worldIndex + 1}` : `Закрыт до ${WORLD_DEFS[worldIndex].name}`;
    return `
        <button class="banner-card ${banner.id === "event" ? "event" : ""} ${banner.id === selectedBannerId ? "active" : ""} ${unlocked ? "" : "locked"}" type="button" data-banner="${banner.id}" ${unlocked ? "" : "disabled"} aria-disabled="${unlocked ? "false" : "true"}">
          <strong>${banner.name}</strong>
          <small>${banner.subtitle}</small>
          <span>${banner.cost} A | ${label}</span>
        </button>`;
    }).join("");

  const banner = getBanner();
  $("#bannerName").textContent = banner.name;
  $("#bannerSubtitle").textContent = banner.subtitle;
  $("#bannerReward").textContent = `Дубликат: +${banner.refund} ауры`;
  $("#caseOdds").textContent = banner.odds.map(([rarity, chance]) => `${displayRarity(rarity)} ${Math.round(chance * 1000) / 10}%`).join(" | ");
  $("#openCaseButton strong").textContent = `${banner.cost} A`;
    $("#openCaseButton span").textContent = "ОТКРЫТЬ 1";
    $("#openFiveCaseButton strong").textContent = `${banner.cost * 5} A`;
    updateCaseArt(banner);
    const room = $(".case-room");
    const display = $("#caseDisplay");
    const lock = $("#caseDisplay .case-lock");
    if (room) room.dataset.banner = banner.id;
    if (display) display.dataset.banner = banner.id;
    if (lock) lock.textContent = banner.id === "event" ? "EV" : "WA";
    if (banner.id === "event") {
      $("#bannerReward").textContent = isEventActive() ? "Дубликат кошкодевочки: +1400 A" : "ИВЕНТ ЗАВЕРШЕН";
      $("#caseOdds").textContent = banner.odds.map(([rarity, chance]) => `${displayRarity(rarity)} ${Math.round(chance * 1000) / 10}%`).join(" | ");
    }
    const progress = $("#eventCaseProgress");
    const progressText = $("#eventCaseProgressText");
    const progressFill = $("#eventCaseProgressFill");
    if (progress && progressText && progressFill) {
      const isEventBanner = banner.id === "event";
      progress.hidden = !isEventBanner;
      if (isEventBanner) {
        progressText.textContent = `${Math.min(100, state.eventCasePity)} / 100`;
        progressFill.style.width = `${Math.min(100, state.eventCasePity)}%`;
      }
    }
  }

function selectBanner(id) {
  if (!isBannerUnlocked(id)) return;
  selectedBannerId = id;
  renderBanners();
  renderCaseButton();
}

function setHeroView(view) {
  const nextView = view === HERO_VIEW_EVENT && isEventActive() ? HERO_VIEW_EVENT : HERO_VIEW_ACTIVE;
  if (state.heroView === nextView) return;
  state.heroView = nextView;
  renderLiveCharacter();
  renderCollection();
  saveState();
  playTone(nextView === HERO_VIEW_EVENT ? 432 : 288, 0.05, "sine");
}

function updateCaseArt(banner = getBanner()) {
  const art = $("#caseArt");
  if (!art) return;
  const source = CASE_ART_BY_BANNER[banner?.id] || CASE_ART_BY_BANNER.standard;
  const room = $(".case-room");
  const display = $("#caseDisplay");
  const lock = $("#caseDisplay .case-lock");
  if (room) room.dataset.banner = banner?.id || "standard";
  if (display) display.dataset.banner = banner?.id || "standard";
  if (lock) lock.textContent = banner?.id === "event" ? "EV" : "WA";
  if (!art.dataset.errorBound) {
    art.addEventListener("error", () => {
      art.hidden = true;
    });
    art.dataset.errorBound = "1";
  }
  art.hidden = false;
  art.alt = banner?.name || "Кейс";
  art.src = source;
}

function renderAccessories() {
  const grid = $("#accessoriesGrid");
  const equippedList = $("#equippedList");
  const summary = $("#accessoryStatsSummary");
  if (!grid || !equippedList || !summary) return;

  grid.innerHTML = ACCESSORIES.map(accessory => {
    const owned = canEquipAccessory(accessory.id);
    const equipped = isAccessoryEquipped(accessory.id);
    return `
      <button class="accessory-card ${accessory.rarity.toLowerCase()} ${owned ? "" : "locked"} ${equipped ? "equipped" : ""}" type="button" data-accessory="${accessory.id}">
        <span class="accessory-badge">${accessory.rarity.toUpperCase()}</span>
        <strong>${accessory.name}</strong>
        <small>${getAccessoryBonusLine(accessory)}</small>
        <div class="accessory-cost">${owned ? equipped ? "СНЯТЬ" : "НАДЕТЬ" : `${accessory.cost} A`}</div>
      </button>`;
  }).join("");

  const equipped = getEquippedAccessories();
  equippedList.innerHTML = equipped.length
    ? equipped.map(accessory => `<div class="equipped-chip">${accessory.name}</div>`).join("")
    : '<div class="equipped-empty">Ничего не надето</div>';

  const bonus = accessoryBonusText();
  summary.innerHTML = `
    <div><b>Клик</b><span>+${bonus.click}</span></div>
    <div><b>Афк</b><span>+${bonus.idle}</span></div>
    <div><b>Комбо</b><span>+${bonus.combo}</span></div>
    <div><b>Аура</b><span>+${bonus.aura}</span></div>`;
}

function buyOrToggleAccessory(id) {
  const accessory = ACCESSORIES.find(item => item.id === id);
  if (!accessory) return;

  if (!canEquipAccessory(accessory.id)) {
    if (state.aura < accessory.cost) {
      showToast("Не хватает ауры");
      return;
    }
    state.aura -= accessory.cost;
    state.ownedAccessories.push(accessory.id);
    showToast(`${accessory.name} куплен`);
  }

  if (isAccessoryEquipped(accessory.id)) {
    state.equippedAccessoryIds = state.equippedAccessoryIds.filter(current => current !== accessory.id);
    showToast(`${accessory.name} снят`);
  } else {
    if (state.equippedAccessoryIds.length >= 3) {
      state.equippedAccessoryIds.shift();
    }
    state.equippedAccessoryIds.push(accessory.id);
    showToast(`${accessory.name} надет`);
  }

  renderBalance();
  renderGameStats();
  renderAccessories();
  renderGoals();
  renderCollection();
  saveState(true);
}

function rarityLabelRu(rarity) {
  if (rarity === "Event") return "ИВЕНТ";
  return {
    Common: "ОБЫЧНЫЕ",
    Rare: "РЕДКИЕ",
    Epic: "ЭПИЧЕСКИЕ",
    Mythic: "МИФИЧЕСКИЕ",
    Ultra: "УЛЬТРАРЕДКИЕ"
  }[rarity] || rarity.toUpperCase();
}

function displayRarity(rarity) {
  return state.settings.language === "en" ? rarity.toUpperCase() : rarityLabelRu(rarity);
}

function localizeSaveLabel(label) {
  if (state.settings.language !== "ru") return label;
  return {
    "DEVICE SAVE": "СОХРАНЕНИЕ НА УСТРОЙСТВЕ",
    "YANDEX SAVE": "СОХРАНЕНИЕ YANDEX",
    "SAVING...": "СОХРАНЕНИЕ...",
    "SAVE ERROR": "ОШИБКА СОХРАНЕНИЯ"
  }[label] || label;
}

function openOverlay(id) {
  if (activeOverlay) activeOverlay.hidden = true;
  activeOverlay = document.getElementById(id);
  if (!activeOverlay) return;
  activeOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  if (id === "collectionOverlay") renderCollection();
  if (id === "casesOverlay") {
    if (caseOpening) {
      if (caseRollResults.length) renderCaseResult(caseRollResults);
    } else {
      resetCaseView();
    }
  }
  if (id === "accessoriesOverlay") renderAccessories();
  if (id === "gameOverlay") {
    renderWorlds();
    renderGameStats();
    renderMechanicsPanels();
  }
  const focusTarget = $("[data-exit]", activeOverlay);
  requestAnimationFrame(() => focusTarget?.focus({ preventScroll: true }));
  playTone(320, 0.035, "sine");
}

function closeOverlay() {
  if (!activeOverlay) return;
  if (activeOverlay.id === "gameOverlay") {
    clearTimeout(caseShakeTimer);
    caseShakeTimer = null;
    const app = $("#app");
    app?.classList.remove("case-shake", "case-shake-ultra");
    $$("#gameOverlay .drop-impact").forEach(node => node.remove());
  }
  activeOverlay.hidden = true;
  activeOverlay = null;
  document.body.style.overflow = "";
  comboStreak = 0;
  clearCardTracking();
  updateComboUI();
  renderAll();
  $("[data-open=\"gameOverlay\"]")?.focus({ preventScroll: true });
  playTone(220, 0.03, "sine");
}

function farmAura(event) {
  if (activeOverlay?.id !== "gameOverlay") return;

  const now = performance.now();
  comboStreak = now - lastClickAt < 650 ? Math.min(comboStreak + 1, 30) : 1;
  lastClickAt = now;

  const world = getSelectedWorld().bonuses;
  const eventBoost = getCurrentEvent().event;
  const buff = activeBuffEffects();
  const gain = (tapPower() * comboMultiplier() + accessoryBonus("aura")) * world.aura * eventBoost.aura * (buff.aura || 1);
  state.aura += gain;
  state.lifetimeAuraEarned += gain;
  state.lifetimeClicks += 1;
  damageBoss(Math.max(1, Math.round(tapPower() * comboMultiplier() * 0.7)), "click");

  clearTimeout(comboResetTimer);
  comboResetTimer = setTimeout(() => {
    comboStreak = 0;
    updateComboUI();
  }, 1100);

  updateComboUI();
  renderBalance();
  renderGameStats();
  renderCaseButton();
  renderGoals();
  showGain(event, gain);
  pulseCore();
  playTone(190 + Math.min(comboStreak, 20) * 12, 0.025, "triangle");
  saveState();
}

function selectWorld(id) {
  const worldIndex = getWorldIndex(id);
  if (worldIndex < 0 || worldIndex > getUnlockedWorldIndex()) return;
  state.worldId = id;
  renderWorlds();
  renderGameStats();
  renderMechanicsPanels();
  renderBanners();
  renderCaseButton();
  showToast(`Мир активен: ${getSelectedWorld().name}`);
  playTone(360, 0.05, "sine");
  saveState();
}

function updateComboUI() {
  const multiplier = comboMultiplier();
  $("#comboValue").textContent = `x${multiplier.toFixed(2)}`;
  $("#comboBar").style.width = `${Math.min(100, comboStreak / 30 * 100)}%`;
}

function showGain(event, gain) {
  const pop = document.createElement("span");
  pop.className = "gain-pop";
  pop.textContent = `+${gain.toFixed(gain % 1 ? 1 : 0)} A`;

  const fallback = $("#auraCore").getBoundingClientRect();
  const x = event?.clientX || fallback.left + fallback.width / 2;
  const y = event?.clientY || fallback.top + fallback.height / 2;

  pop.style.left = `${x - 22}px`;
  pop.style.top = `${y - 20}px`;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 750);
}

function pulseCore() {
  const core = $("#auraCore");
  core.classList.remove("pressed");
  requestAnimationFrame(() => {
    core.classList.add("pressed");
    setTimeout(() => core.classList.remove("pressed"), 90);
  });
}

function buyUpgrade(type) {
  const cost = upgradeCost(type);
  if (state.aura < cost) return;

  state.aura -= cost;
  state.upgrades[type] += 1;
  renderBalance();
  renderGameStats();
  renderCaseButton();
  showToast(`${upgradeLabel(type)} достигло уровня ${state.upgrades[type]}`);
  playTone(520, 0.08, "sine");
  saveState();
}

function upgradeLabel(type) {
  return {
    click: "Импульс харизмы",
    idle: "Шёпот отдыха",
    combo: "Цепь судьбы"
  }[type];
}

function renderCaseButton() {
  const banner = getBanner();
  $("#openCaseButton").disabled = state.aura < banner.cost || caseOpening;
  $("#openFiveCaseButton").disabled = state.aura < banner.cost * 5 || caseOpening;
}

function renderCaseResult(results) {
  const display = $("#caseDisplay");
  const result = $("#dropResult");
  const room = $(".case-room");
  display.classList.add("opening");
  room?.classList.add("opening");
  display.hidden = true;
  result.hidden = false;
  result.className = "drop-result";
  result.innerHTML = results.map(item => {
    const duplicate = item.duplicate;
    return `
      <article class="drop-card ${rarityClass(item.character.rarity)}">
        <div class="drop-portrait ${rarityClass(item.character.rarity)}">${portraitMarkup(item.character)}</div>
        <div class="drop-copy">
          <small>${item.character.id} | ${displayRarity(item.character.rarity)} | ${item.character.element} | ${item.character.nation}</small>
          <h3>${item.character.name}</h3>
          <p>${duplicate ? `Дубликат | +${item.refund} ауры` : item.character.quote}</p>
        </div>
      </article>`;
  }).join("");
}

function finishCaseOpening(results) {
  caseOpening = false;
  caseOpeningTimers.forEach(timer => clearTimeout(timer));
  caseOpeningTimers = [];
  caseRollResults = [];
  if (results.length) {
    triggerCaseImpact(bestCaseRarity(results), { final: true });
  }
  renderBalance();
  renderCaseButton();
  renderCollection();
  renderBanners();
  renderGoals();
  results.forEach(item => playDropSound(item.character.rarity));
  saveState(true);
}

function resolveBannerPull() {
  const banner = getBanner();
  const character = pickCaseCharacter(banner);
  const duplicate = isOwned(character.id);

  if (duplicate) {
    state.aura += banner.refund;
    state.lifetimeAuraEarned += banner.refund;
  } else {
    if (character.isEvent) {
      state.ownedEventIds.push(character.id);
    } else {
      state.ownedIds.push(character.id);
    }
  }

  state.caseOpens += 1;
  return { character, duplicate, refund: banner.refund };
}

function openCase(count = 1) {
  normalizeRuntimeState();
  count = Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 1;
  const banner = getBanner();
  const cost = banner.cost * count;
  if (caseOpening || state.aura < cost) return;

  caseOpening = true;
  caseOpeningRunId += 1;
  const runId = caseOpeningRunId;
  state.aura -= cost;
  caseRollResults = [];
  renderBalance();
  renderCaseButton();
  const room = $(".case-room");
  room?.classList.add("opening");
  $("#caseDisplay").classList.add("opening");

  const delays = Array.from({ length: count }, (_, index) => index * (state.settings.reducedMotion ? 60 : 180));
  delays.forEach((delay, index) => {
    const timer = setTimeout(() => {
      if (runId !== caseOpeningRunId) return;
      const item = resolveBannerPull();
        caseRollResults.push(item);
        triggerCaseImpact(item.character.rarity);
        renderCaseResult(caseRollResults);
        renderBalance();
        renderBanners();
        renderCaseButton();
      showToast(item.duplicate ? `${item.character.name}: дубликат` : `${item.character.name} добавлена в альбом`);
      if (index === count - 1) {
        const display = $("#caseDisplay");
        display.classList.remove("opening");
        room?.classList.remove("opening");
        finishCaseOpening(caseRollResults);
      }
    }, delay);
    caseOpeningTimers.push(timer);
  });
}

function resetCaseView() {
  caseOpening = false;
  caseOpeningRunId += 1;
  caseOpeningTimers.forEach(timer => clearTimeout(timer));
  caseOpeningTimers = [];
  caseRollResults = [];
  clearTimeout(caseShakeTimer);
  caseShakeTimer = null;
  const app = $("#app");
  app?.classList.remove("case-shake", "case-shake-ultra");
  $$("#gameOverlay .drop-impact").forEach(node => node.remove());
  const display = $("#caseDisplay");
  const room = $(".case-room");
  display.hidden = false;
  display.classList.remove("opening");
  room?.classList.remove("opening");
  $("#dropResult").hidden = true;
  $("#dropResult").innerHTML = "";
  updateCaseArt();
  renderBanners();
  renderCaseButton();
}

function selectCharacter(id) {
  if (id === EVENT_CHARACTER.id) {
    if (!isEventCharacterOwned()) {
      showToast("Ивентовая карта еще не открыта");
      playTone(260, 0.04, "sine");
      return;
    }
    state.heroView = HERO_VIEW_EVENT;
    state.collectionTab = COLLECTION_TAB_EVENT;
    renderLiveCharacter();
    renderGameStats();
    renderCollection();
    showToast(`${EVENT_CHARACTER.name} теперь на главной карточке`);
    playTone(440, 0.06, "sine");
    saveState();
    return;
  }
  if (!isOwned(id)) {
    const character = getCharacter(id);
    showToast(`${character.name} ещё закрыта`);
    playTone(260, 0.04, "sine");
    return;
  }
  state.activeId = id;
  state.heroView = HERO_VIEW_ACTIVE;
  renderLiveCharacter();
  renderGameStats();
  renderCollection();
  showToast(`${getCharacter(id).name} теперь активная вайфу`);
  playTone(440, 0.06, "sine");
  saveState();
}

function setFilter(nextFilter) {
  filter = nextFilter;
  collectionPage = 1;
  renderCollection();
}

function setOwnershipFilter(nextFilter) {
  ownershipFilter = nextFilter;
  collectionPage = 1;
  renderCollection();
}

function changeCollectionPage(delta) {
  collectionPage += delta;
  renderCollection();
}

function toggleSetting(key, value) {
  state.settings[key] = value;
  renderSettings();
  saveState(true);
}

function dismissIntro() {
  state.settings.introSeen = true;
  renderSettings();
  saveState(true);
  closeOverlay();
}

function setLanguage(language) {
  state.settings.language = language === "en" ? "en" : "ru";
  document.documentElement.lang = state.settings.language;
  applyLanguage();
  renderSettings();
  updateSaveStatus();
  saveState(true);
}

function applyLanguage() {
  const isEnglish = state.settings.language === "en";
  const menuButtons = [
    {
      open: "gameOverlay",
      title: isEnglish ? "BOND MODE" : "РЕЖИМ СВЯЗИ",
      subtitle: isEnglish ? "Click to earn aura with your active waifu" : "Кликай, чтобы зарабатывать ауру с активной вайфу"
    },
    {
      open: "collectionOverlay",
      title: isEnglish ? "WAIFU ALBUM" : "АЛЬБОМ ВАЙФУ",
      subtitle: isEnglish ? "See who you have already unlocked" : "Смотри, кто уже открыт"
    },
    {
      open: "casesOverlay",
      title: isEnglish ? "WISH BANNERS" : "БАННЕРЫ ЖЕЛАНИЙ",
      subtitle: isEnglish ? "Summon new waifus and accessories" : "Призывай новых вайфу и аксессуары"
    },
    {
      open: "accessoriesOverlay",
      title: isEnglish ? "ACCESSORIES" : "АКСЕССУАРЫ",
      subtitle: isEnglish ? "Wear items and boost stats" : "Одевай предметы и усиливай статы"
    },
    {
      open: "settingsOverlay",
      title: isEnglish ? "SETTINGS" : "НАСТРОЙКИ",
      subtitle: isEnglish ? "Sound, motion, language, and saves" : "Звук, движение, язык и сохранения"
    }
  ];

  for (const item of menuButtons) {
    const button = $(`[data-open="${item.open}"]`);
    if (!button) continue;
    const title = button.querySelector("b");
    const subtitle = button.querySelector("small");
    if (title) title.textContent = item.title;
    if (subtitle) subtitle.textContent = item.subtitle;
  }

  const texts = {
    brand: isEnglish ? "waifu hearts aura" : "СЕРДЦА ВАЙФУ АУРА",
    eyebrow: isEnglish ? "MOON FLOW" : "ЛУННЫЙ ПОТОК",
    intro: isEnglish
      ? "Farm aura, raise affection, and build a collection that keeps its save outside one browser."
      : "Фарми ауру, прокачивай привязанность и собирай коллекцию вайфу, которая живёт дольше одного браузера."
  };

  const brandSmall = $(".brand-mark small");
  if (brandSmall) brandSmall.textContent = texts.brand;
  const intro = $(".menu-intro");
  if (intro) intro.textContent = texts.intro;
  const titleMap = {
    gameTitle: isEnglish ? "BOND MODE" : "РЕЖИМ СВЯЗИ",
    collectionTitle: isEnglish ? "WAIFU ALBUM" : "АЛЬБОМ ВАЙФУ",
    casesTitle: isEnglish ? "WISH BANNERS" : "БАННЕРЫ ЖЕЛАНИЙ",
    accessoriesTitle: isEnglish ? "ACCESSORIES" : "АКСЕССУАРЫ",
    settingsTitle: isEnglish ? "SETTINGS" : "НАСТРОЙКИ"
  };
  for (const [id, text] of Object.entries(titleMap)) {
    const node = $(`#${id}`);
    if (node) node.childNodes[0].textContent = text;
  }
  document.title = isEnglish ? "Waifu Hearts Aura" : "СЕРДЦА ВАЙФУ АУРА";
}

function resetProgress() {
  const confirmed = window.confirm("Сбросить всю ауру, улучшения и собранных вайфу? Это нельзя отменить.");
  if (!confirmed) return;

  state = cloneDefaults();
  selectedBannerId = "standard";
  filter = "All";
  ownershipFilter = "All";
  collectionPage = 1;
  renderAll();
  resetCaseView();
  saveState(true);
  showToast("Прогресс сброшен");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  $("#toastRegion").appendChild(toast);
  setTimeout(() => toast.remove(), 2700);
}

function playTone(frequency, duration, wave) {
  if (!state.settings.sound) return;

  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    // Audio remains optional.
  }
}

function playDropSound(rarity) {
  const index = RARITY_ORDER.indexOf(rarity);
  [0, 1, 2].forEach(step => setTimeout(() => playTone(360 + index * 80 + step * 110, 0.12, "sine"), step * 90));
}

function bestCaseRarity(results) {
  return results.reduce((best, item) => {
    const bestIndex = RARITY_ORDER.indexOf(best);
    const itemIndex = RARITY_ORDER.indexOf(item.character.rarity);
    return itemIndex > bestIndex ? item.character.rarity : best;
  }, "Common");
}

function triggerCaseImpact(rarity, { final = false } = {}) {
  const overlay = $("#gameOverlay");
  const app = $("#app");
  if (!overlay || !app) return;

  const impact = document.createElement("div");
  const rarityClassName = rarityClass(rarity);
  impact.className = `drop-impact ${rarityClassName}${final ? " final" : ""}`;
  impact.innerHTML = `
    <span class="drop-impact-flash"></span>
    <span class="drop-impact-rays"></span>
    <span class="drop-impact-particles"></span>
  `;
  overlay.prepend(impact);

  app.classList.remove("case-shake", "case-shake-ultra");
  void app.offsetWidth;
  app.classList.add("case-shake");
  if (rarity === "Mythic" || rarity === "Ultra" || final) {
    app.classList.add("case-shake-ultra");
  }

  clearTimeout(caseShakeTimer);
  caseShakeTimer = setTimeout(() => {
    app.classList.remove("case-shake", "case-shake-ultra");
  }, final ? 1100 : rarity === "Ultra" ? 900 : rarity === "Mythic" ? 760 : 580);

  const cleanupDelay = final ? 1300 : rarity === "Ultra" ? 1100 : rarity === "Mythic" ? 980 : 820;
  setTimeout(() => impact.remove(), cleanupDelay);
}

function handleCardTracking(event) {
  if (state.settings.reducedMotion || matchMedia("(pointer: coarse)").matches) return;

  const card = $("#liveCard");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--tilt-x", `${x * 12}deg`);
  card.style.setProperty("--tilt-y", `${y * -9}deg`);
  card.style.setProperty("--card-lift", `${-8 - Math.abs(x * 10) - Math.abs(y * 8)}px`);
  card.style.setProperty("--card-scale", "1.02");
}

function clearCardTracking() {
  const card = $("#liveCard");
  if (!card) return;
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--card-lift", "0px");
  card.style.setProperty("--card-scale", "1");
}

function bindEvents() {
  $$("[data-open]").forEach(button => button.addEventListener("click", () => openOverlay(button.dataset.open)));
  $$("[data-exit]").forEach(button => button.addEventListener("click", closeOverlay));
  $$("[data-upgrade]").forEach(button => button.addEventListener("click", () => buyUpgrade(button.dataset.upgrade)));
  $$("[data-filter]").forEach(button => button.addEventListener("click", () => setFilter(button.dataset.filter)));
  $$("[data-status-filter]").forEach(button => button.addEventListener("click", () => setOwnershipFilter(button.dataset.statusFilter)));
  $$("[data-collection-tab]").forEach(button => button.addEventListener("click", () => {
    state.collectionTab = button.dataset.collectionTab;
    collectionPage = 1;
    renderCollection();
    saveState();
  }));
  $$("[data-hero-view]").forEach(button => button.addEventListener("click", () => setHeroView(button.dataset.heroView)));
  $("#liveCard")?.addEventListener("click", () => {
    if (!isEventActive()) return;
    setHeroView(state.heroView === HERO_VIEW_EVENT ? HERO_VIEW_ACTIVE : HERO_VIEW_EVENT);
  });
  $("#collectionPrevPage").addEventListener("click", () => changeCollectionPage(-1));
  $("#collectionNextPage").addEventListener("click", () => changeCollectionPage(1));
  $("#bannerRow").addEventListener("click", event => {
    const button = event.target.closest("[data-banner]");
    if (button) selectBanner(button.dataset.banner);
  });
  $("#worldList").addEventListener("click", event => {
    const button = event.target.closest("[data-world]");
    if (button) selectWorld(button.dataset.world);
  });
  $("#goalsList").addEventListener("click", event => {
    const button = event.target.closest("[data-goal]");
    if (button) claimGoal(button.dataset.goal);
  });
  $("#contractList").addEventListener("click", event => {
    const button = event.target.closest("[data-contract]");
    if (button) claimContract(button.dataset.contract);
  });
  $("#expeditionList").addEventListener("click", event => {
    const claimButton = event.target.closest("[data-expedition-claim]");
    const startButton = event.target.closest("[data-expedition-start]");
    if (claimButton) claimExpedition(claimButton.dataset.expeditionClaim);
    if (startButton) startExpedition(startButton.dataset.expeditionStart);
  });
  $("#bossAttackButton")?.addEventListener("click", () => {
    damageBoss(Math.max(1, Math.round(tapPower() * 1.5)), "click");
  });
  $("#accessoriesGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-accessory]");
    if (button) buyOrToggleAccessory(button.dataset.accessory);
  });

  $("#clickStage").addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    farmAura(event);
  });

  $("#auraCore").addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      farmAura();
    }
  });

  $("#collectionGrid").addEventListener("click", event => {
    const card = event.target.closest("[data-character]");
    if (card) selectCharacter(card.dataset.character);
  });

  $("#openCaseButton").addEventListener("click", () => openCase(1));
  $("#openFiveCaseButton").addEventListener("click", () => openCase(5));
  $("#soundToggle").addEventListener("change", event => toggleSetting("sound", event.target.checked));
  $("#motionToggle").addEventListener("change", event => toggleSetting("reducedMotion", event.target.checked));
  $("#languageSelect").addEventListener("change", event => setLanguage(event.target.value));
  $("#resetButton").addEventListener("click", resetProgress);
  $("#introStartButton")?.addEventListener("click", dismissIntro);

  const liveCard = $("#liveCard");
  if (liveCard) {
    liveCard.addEventListener("pointerenter", handleCardTracking);
    liveCard.addEventListener("pointermove", handleCardTracking);
    liveCard.addEventListener("pointerleave", clearCardTracking);
    liveCard.addEventListener("blur", clearCardTracking);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && activeOverlay) closeOverlay();
  });

  $$(".overlay").forEach(overlay => overlay.addEventListener("pointerdown", event => {
    if (event.target === overlay) closeOverlay();
  }));

  window.addEventListener("beforeunload", () => saveState(true));
  window.addEventListener("pagehide", () => saveState(true));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) saveState(true);
  });
}

function startIdleLoop() {
  setInterval(() => {
    normalizeRuntimeState();
    const autoClicks = autoClickRate();
    if (autoClicks > 0) {
      const autoGain = tapPower() * autoClicks;
      state.aura += autoGain;
      state.lifetimeAuraEarned += autoGain;
      state.lifetimeClicks += autoClicks;
      damageBoss(Math.max(1, Math.round(autoGain * 0.65)), "idle");
    }
    const gain = idlePower();
    if (gain > 0) {
      state.aura += gain;
      state.lifetimeAuraEarned += gain;
      damageBoss(Math.max(1, Math.round(gain * 0.22)), "idle");
    }
    renderBalance();
    renderGameStats();
    renderCaseButton();
    renderGoals();
    saveState();
  }, 1000);
}

async function init() {
  bindEvents();
  await initStorage();
  state = await loadState();
  document.documentElement.lang = state.settings.language;
  applyLanguage();
  renderAll();
  updateComboUI();
  startIdleLoop();
  if (!state.settings.introSeen) {
    openOverlay("introOverlay");
  }
}

void init();
