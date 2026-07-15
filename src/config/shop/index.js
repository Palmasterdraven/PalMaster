import { shopItems, getItemById, getItemsByType, getItemPrice, validatePurchase } from './items.js';
import { botConfig } from '../bot.js';

const { currency } = botConfig.economy;

export const shopConfig = {
    name: 'PalShop',
    currency: currency.name,
    currencyName: currency.name,
    currencyNamePlural: currency.namePlural || `${currency.name}s`,
    currencySymbol: currency.symbol || '💵',
    
    categories: [
        {
            id: 'consumables',
            name: 'Consumables',
            description: 'One-time use items that provide temporary benefits',
            icon: '🍯',
            itemTypes: ['consumable']
        },
        {
            id: 'upgrades',
            name: 'Upgrades',
            description: 'Permanent upgrades that enhance your abilities',
            icon: '⚡',
            itemTypes: ['upgrade']
        },
        {
            id: 'tools',
            name: 'Tools',
            description: 'Equipment that helps you gather resources more efficiently',
            icon: '⛏️',
            itemTypes: ['tool']
        },
        {
            id: 'roles',
            name: 'Roles',
            description: 'Special roles with unique perks',
            icon: '🎭',
            itemTypes: ['role']
        }
    ],
    
    transaction: {
cooldown: 1000,
maxQuantity: 10,
confirmTimeout: 30000,
        
        refundPolicy: {
            enabled: true,
window: 300000,
fee: 0.1
        }
    },
    
    ui: {
        itemsPerPage: 5,
        showOutOfStock: true,
        showOwnedItems: true,
        showAffordability: true,
        
        colors: {
primary: '#5865F2',
success: '#43B581',
error: '#F04747',
warning: '#FAA61A',
info: '#00B0F4',
            
            rarity: {
common: '#99AAB5',
uncommon: '#2ECC71',
rare: '#3498DB',
epic: '#9B59B6',
legendary: '#F1C40F',
mythic: '#E74C3C'
            }
        },
        
        emojis: {
            currency: '🪙',
            quantity: '✖️',
            price: '💵',
            owned: '✅',
            outOfStock: '❌',
            
            types: {
                consumable: '🍯',
                upgrade: '⚡',
                tool: '⛏️',
                role: '🎭'
            }
        }
    },
    
    events: {
        restock: {
            enabled: true,
interval: 86400000,
announcementChannel: null,
            message: '🛒 **Shop Restocked!** New items are now available!'
        },
        
        sales: {
            enabled: true,
            schedule: [
                {
day: 0,
discount: 0.2,
                    message: '🔥 **Weekend Sale!** 20% off all items!'
                },
            ]
        }
    }
};

export {
    shopItems,
    getItemById,
    getItemsByType,
    getItemPrice,
    validatePurchase
};

export function getCurrentPrice(itemId, { quantity = 1, userData = null } = {}) {
    const basePrice = getItemPrice(itemId) * quantity;
    
    let discount = 0;
    
    const now = new Date();
    if (shopConfig.events.sales.enabled) {
        const today = now.getDay();
        const sale = shopConfig.events.sales.schedule.find(s => s.day === today);
        if (sale) {
            discount += sale.discount;
        }
    }
    
    if (userData) {
        if (userData.roles?.includes('premium')) {
            discount += 0.1;
        }
        
        if (quantity >= 10) {
discount += 0.1;
        }
    }
    
    discount = Math.max(0, Math.min(1, discount));
    
    return Math.floor(basePrice * (1 - discount));
}

export function getCategoryForItem(itemType) {
    return shopConfig.categories.find(cat => 
        cat.itemTypes.includes(itemType)
    ) || {
        id: 'other',
        name: 'Other',
        description: 'Miscellaneous items',
        icon: '📦'
    };
}

export function getItemsInCategory(categoryId) {
    const category = shopConfig.categories.find(cat => cat.id === categoryId);
    if (!category) return [];
    
    return shopItems.filter(item => 
        category.itemTypes.includes(item.type)
    );
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
},
