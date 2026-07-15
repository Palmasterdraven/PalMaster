export const shopItems = [
    {
        id: 'extra_work',
        name: 'Extra Work Shift',
        price: 5000,
        description: 'Allows 1 extra use of the `/work` command.',
        type: 'consumable',
        maxQuantity: 5,
cooldown: 86400000,
        effect: {
            type: 'command_boost',
            command: 'work',
            uses: 1
        }
    },
    {
        id: 'bank_upgrade_1',
        name: 'Bank Upgrade I',
        price: 15000,
        description: 'Increases bank capacity and allows more funds to be deposited.',
        type: 'upgrade',
        maxLevel: 6,
        effect: {
            type: 'bank_capacity',
            multiplier: 1.5
        }
    },
    {
        id: 'diamond_pickaxe',
        name: 'Diamond Pickaxe',
        price: 50000,
        description: 'Increases yield from `/mine`',
        type: 'tool',
        durability: 100,
        effect: {
            type: 'mining_yield',
            multiplier: 2.0
        }
    },
    {
        id: 'premium_role',
        name: 'Premium Server Role',
        price: 15000,
        description: 'A special role granting a fancy color and a 10% daily bonus.',
        type: 'role',
roleId: null,
        effect: {
            type: 'daily_bonus',
            multiplier: 1.1
        }
    },
    {
        id: 'lucky_clover',
        name: 'Lucky Clover',
        price: 10000,
        description: 'Increases the chance of winning a higher payout on `/gamble` once.',
        type: 'consumable',
        maxQuantity: 10,
        effect: {
            type: 'gamble_boost',
            multiplier: 1.5,
            uses: 1
        }
    },
    {
        id: 'fishing_rod',
        name: '🎣 Fishing Rod',
        price: 5000,
        description: 'Used for fishing commands',
        type: 'tool',
        durability: 100,
        effect: {
            type: 'fishing_yield',
            multiplier: 1.0
        }
    },
    {
        id: 'pickaxe',
        name: '⛏️ Pickaxe',
        price: 7500,
        description: 'Used for mining commands',
        type: 'tool',
        durability: 100,
        effect: {
            type: 'mining_yield',
            multiplier: 1.2
        }
    },
    {
        id: 'laptop',
        name: '💻 Laptop',
        price: 15000,
        description: 'Increases work earnings',
        type: 'tool',
        durability: 200,
        effect: {
            type: 'work_yield',
            multiplier: 1.5
        }
    },
    {
        id: 'lucky_charm',
        name: '🍀 Lucky Charm',
        price: 10000,
        description: 'Increases luck for gambling. Has 3 uses before being consumed.',
        type: 'consumable',
        maxQuantity: 10,
        effect: {
            type: 'gamble_boost',
            multiplier: 1.3,
            uses: 3
        }
    },
    {
        id: 'bank_note',
        name: '📜 Bank Note',
        price: 25000,
        description: 'Increases bank capacity by 10,000. Can be purchased multiple times.',
        type: 'tool',
        durability: null,
        effect: {
            type: 'bank_capacity',
            increase: 10000
        }
    },
    {
        id: 'personal_safe',
        name: '🔒 Personal Safe',
        price: 30000,
        description: 'Protects your money from theft. Prevents others from robbing you.',
        type: 'tool',
        durability: null,
        effect: {
            type: 'robbery_protection',
            protection: true
        }
    }
];

export function getItemById(itemId) {
    return shopItems.find(item => item.id === itemId);
}

export function getItemsByType(type) {
    return shopItems.filter(item => item.type === type);
}

export function getItemPrice(itemId) {
    const item = getItemById(itemId);
    return item ? item.price : 0;
}

export function validatePurchase(itemId, userData) {
    const item = getItemById(itemId);
    if (!item) {
        return { valid: false, reason: 'Item not found' };
    }

    const inventory = userData.inventory || {};
    const upgrades = userData.upgrades || {};

    if (item.type === 'consumable' && item.maxQuantity) {
        const currentQuantity = inventory[itemId] || 0;
        if (currentQuantity >= item.maxQuantity) {
            return { 
                valid: false, 
                reason: `You can only have a maximum of ${item.maxQuantity} ${item.name}s` 
            };
        }
    }

    if (item.type === 'upgrade' && item.maxLevel) {
        
        if (upgrades[itemId]) {
            return { 
                valid: false, 
                reason: `You've already purchased ${item.name}` 
            };
        }
    }

    if (item.type === 'tool') {
        
        const currentQuantity = inventory[itemId] || 0;
        if (itemId !== 'bank_note' && currentQuantity > 0) {
            return { 
                valid: false, 
                reason: `You already have a ${item.name}` 
            };
        }
    }

    if (item.type === 'role' && item.roleId) {
        if (userData.roles?.includes(item.roleId)) {
            return { 
                valid: false, 
                reason: `You already have the ${item.name} role` 
            };
        }
    }

    return { valid: true };
}
// =========================
// TIER 1 PALS
// =========================

{
    id: 'foxparks',
    name: '🦊 Foxparks',
    price: 1000,
    description: 'Kindling Lv.1 - Excellent for cooking and smelting.',
    type: 'pal'
},
{
    id: 'pengullet',
    name: '🐧 Pengullet',
    price: 1000,
    description: 'Watering Lv.1, Cooling Lv.1, Transporting Lv.1',
    type: 'pal'
},
{
    id: 'lifmunk',
    name: '🐿️ Lifmunk',
    price: 1000,
    description: 'Planting, Lumbering, Handiwork & Gathering Lv.1',
    type: 'pal'
},
{
    id: 'tanzee',
    name: '🐵 Tanzee',
    price: 1000,
    description: 'Planting, Lumbering, Handiwork & Gathering Lv.1',
    type: 'pal'
},
{
    id: 'cattiva',
    name: '🐱 Cattiva',
    price: 1000,
    description: 'Handiwork, Transporting & Gathering Lv.1',
    type: 'pal'
},
{
    id: 'lamball',
    name: '🐑 Lamball',
    price: 1000,
    description: 'Handiwork, Transporting & Gathering Lv.1',
    type: 'pal'
},
{
    id: 'gumoss',
    name: '🌱 Gumoss',
    price: 1000,
    description: 'Planting Lv.1 - Great for Berry Plantations.',
    type: 'pal'
},
{
    id: 'eikthyrdeer',
    name: '🦌 Eikthyrdeer',
    price: 1000,
    description: 'Lumbering Lv.2 - Excellent wood cutter.',
    type: 'pal'
},

// =========================
// TIER 2 PALS
// =========================

{
    id: 'anubis',
    name: '⚔️ Anubis',
    price: 2500,
    description: 'Exceptional attack stats with powerful Ground abilities.',
    type: 'pal'
},
{
    id: 'sootseer',
    name: '🔥 Sootseer',
    price: 2500,
    description: 'Excellent Fire damage and raid potential.',
    type: 'pal'
},
{
    id: 'xenogard',
    name: '🌌 Xenogard',
    price: 2500,
    description: 'Heavy Spatial attacks and crowd control.',
    type: 'pal'
},
{
    id: 'selyne',
    name: '🌙 Selyne',
    price: 2500,
    description: 'Powerful Celestial attacker with AoE damage.',
    type: 'pal'
},
{
    id: 'rayhound',
    name: '⚡ Rayhound',
    price: 2500,
    description: 'Fast Electric attacker.',
    type: 'pal'
},

// =========================
// EGGS T1
// =========================

{
    id: 'common_egg',
    name: '🥚 Common Egg',
    price: 500,
    description: 'Random Neutral Pal.',
    type: 'egg'
},
{
    id: 'verdant_egg',
    name: '🌿 Verdant Egg',
    price: 500,
    description: 'Random Grass Pal.',
    type: 'egg'
},
{
    id: 'scorching_egg',
    name: '🔥 Scorching Egg',
    price: 500,
    description: 'Random Fire Pal.',
    type: 'egg'
},
{
    id: 'damp_egg',
    name: '💧 Damp Egg',
    price: 500,
    description: 'Random Water Pal.',
    type: 'egg'
},
{
    id: 'electric_egg',
    name: '⚡ Electric Egg',
    price: 500,
    description: 'Random Electric Pal.',
    type: 'egg'
},
{
    id: 'frozen_egg',
    name: '❄️ Frozen Egg',
    price: 500,
    description: 'Random Ice Pal.',
    type: 'egg'
},

// Hard Eggs T1

{
    id: 'rocky_egg',
    name: '🪨 Rocky Egg',
    price: 750,
    description: 'Random Ground Pal.',
    type: 'egg'
},
{
    id: 'dragon_egg',
    name: '🐉 Dragon Egg',
    price: 750,
    description: 'Random Dragon Pal.',
    type: 'egg'
},
{
    id: 'dark_egg',
    name: '🌑 Dark Egg',
    price: 750,
    description: 'Random Dark Pal.',
    type: 'egg'
},

// =========================
// EGGS T2
// =========================

{
    id: 'large_common_egg',
    name: '🥚 Large Common Egg',
    price: 1000,
    description: 'Random Neutral Pal.',
    type: 'egg'
},
{
    id: 'large_verdant_egg',
    name: '🌿 Large Verdant Egg',
    price: 1000,
    description: 'Random Grass Pal.',
    type: 'egg'
},
{
    id: 'large_scorching_egg',
    name: '🔥 Large Scorching Egg',
    price: 1000,
    description: 'Random Fire Pal.',
    type: 'egg'
},
{
    id: 'large_damp_egg',
    name: '💧 Large Damp Egg',
    price: 1000,
    description: 'Random Water Pal.',
    type: 'egg'
},
{
    id: 'large_electric_egg',
    name: '⚡ Large Electric Egg',
    price: 1000,
    description: 'Random Electric Pal.',
    type: 'egg'
},
{
    id: 'large_frozen_egg',
    name: '❄️ Large Frozen Egg',
    price: 1000,
    description: 'Random Ice Pal.',
    type: 'egg'
},

// Hard Eggs T2

{
    id: 'large_rocky_egg',
    name: '🪨 Large Rocky Egg',
    price: 2500,
    description: 'Random Ground Pal.',
    type: 'egg'
},
{
    id: 'large_dragon_egg',
    name: '🐉 Large Dragon Egg',
    price: 2500,
    description: 'Random Dragon Pal.',
    type: 'egg'
},
{
    id: 'large_dark_egg',
    name: '🌑 Large Dark Egg',
    price: 2500,
    description: 'Random Dark Pal.',
    type: 'egg'
},

// =========================
// EGGS T3
// =========================

{
    id: 'huge_common_egg',
    name: '🥚 Huge Common Egg',
    price: 3000,
    description: 'Rare Neutral Egg.',
    type: 'egg'
},
{
    id: 'huge_verdant_egg',
    name: '🌿 Huge Verdant Egg',
    price: 3000,
    description: 'Rare Grass Egg.',
    type: 'egg'
},
{
    id: 'huge_scorching_egg',
    name: '🔥 Huge Scorching Egg',
    price: 3000,
    description: 'Rare Fire Egg.',
    type: 'egg'
},
{
    id: 'huge_damp_egg',
    name: '💧 Huge Damp Egg',
    price: 3000,
    description: 'Rare Water Egg.',
    type: 'egg'
},
{
    id: 'huge_electric_egg',
    name: '⚡ Huge Electric Egg',
    price: 3000,
    description: 'Rare Electric Egg.',
    type: 'egg'
},
{
    id: 'huge_frozen_egg',
    name: '❄️ Huge Frozen Egg',
    price: 3000,
    description: 'Rare Ice Egg.',
    type: 'egg'
},

// Hard Eggs T3

{
    id: 'huge_rocky_egg',
    name: '🪨 Huge Rocky Egg',
    price: 4000,
    description: 'Rare Ground Egg.',
    type: 'egg'
},
{
    id: 'huge_dragon_egg',
    name: '🐉 Huge Dragon Egg',
    price: 4000,
    description: 'Rare Dragon Egg.',
    type: 'egg'
},
{
    id: 'huge_dark_egg',
    name: '🌑 Huge Dark Egg',
    price: 4000,
    description: 'Rare Dark Egg.',
    type: 'egg'
},

// =========================
// LEGENDARY EGGS T4
// =========================

{
    id: 'legendary_common_egg',
    name: '✨ Legendary Common Egg',
    price: 10000,
    description: 'Huge/Large Neutral Egg.',
    type: 'egg'
},
{
    id: 'legendary_verdant_egg',
    name: '✨ Legendary Verdant Egg',
    price: 10000,
    description: 'Huge/Large Grass Egg.',
    type: 'egg'
},
{
    id: 'legendary_scorching_egg',
    name: '✨ Legendary Scorching Egg',
    price: 10000,
    description: 'Huge/Large Fire Egg.',
    type: 'egg'
},
{
    id: 'legendary_damp_egg',
    name: '✨ Legendary Damp Egg',
    price: 10000,
    description: 'Huge/Large Water Egg.',
    type: 'egg'
},
{
    id: 'legendary_electric_egg',
    name: '✨ Legendary Electric Egg',
    price: 10000,
    description: 'Huge/Large Electric Egg.',
    type: 'egg'
},
{
    id: 'legendary_frozen_egg',
    name: '✨ Legendary Frozen Egg',
    price: 10000,
    description: 'Huge/Large Ice Egg.',
    type: 'egg'
},

// Hard Legendary Eggs

{
    id: 'legendary_rocky_egg',
    name: '💎 Legendary Rocky Egg',
    price: 25000,
    description: 'Huge/Large Ground Egg.',
    type: 'egg'
},
{
    id: 'legendary_dragon_egg',
    name: '💎 Legendary Dragon Egg',
    price: 25000,
    description: 'Huge/Large Dragon Egg.',
    type: 'egg'
},
{
    id: 'legendary_dark_egg',
    name: '💎 Legendary Dark Egg',
    price: 25000,
    description: 'Huge/Large Dark Egg.',
    type: 'egg'
}
