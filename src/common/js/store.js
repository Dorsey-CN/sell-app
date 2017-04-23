export function saveToLocal(id, key, value) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    seller = JSON.stringify(seller);
    window.localStorage.__seller__ = seller;
};

export function loadFromLocal(id, key, def) {
    let seller = window.localStorage.__seller__;
    let ret = '';
    if (!seller) {
        return def;
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            return def;
        }
        ret = seller[id][key];
    }

    return ret || def;
};
