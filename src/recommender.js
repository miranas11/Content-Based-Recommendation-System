const { getWeek, selectRandomItems } = require("./utils");

const createUser = (req, res, userId) => {
    const cookieName = `${userId}_recommendations`;
    if (!req.cookies || !req.cookies[cookieName]) {
        res.cookie(
            cookieName,
            JSON.stringify({
                lastUpdateWeek: getWeek(new Date()),
                tags: {},
            }),
            { maxAge: 900000, httpOnly: true }
        );
        console.log(`Empty cookie ${cookieName} created for user ${userId}.`);
    } else {
        console.log(`User ${userId} already has the cookie ${cookieName}.`);
    }
};

const addTag = (req, res, userId, tagName) => {
    const cookieName = `${userId}_recommendations`;

    let userActivity = req.cookies[cookieName];

    if (!userActivity) {
        userActivity = {
            lastUpdateWeek: getWeek(new Date()),
            tags: {},
        };
        console.log(`Empty cookie ${cookieName} created for user ${userId}.`);
    } else {
        userActivity = JSON.parse(userActivity);
    }

    if (!userActivity.tags[tagName]) {
        userActivity.tags[tagName] = [[], [], []];
        res.cookie(cookieName, JSON.stringify(userActivity), {
            maxAge: 900000,
            httpOnly: true,
        });
        console.log(
            `Added tag ${tagName} with 3 epochs to cookie ${cookieName} for user ${userId}.`
        );
    } else {
        console.log(
            `Tag ${tagName} already exists in cookie ${cookieName} for user ${userId}.`
        );
    }
};

const addItemToTag = (req, res, userId, tagName, newItems) => {
    const cookieName = `${userId}_recommendations`;
    const currentWeekNumber = getWeek(new Date());
    let userActivity = req.cookies[cookieName];
    if (!userActivity) {
        userActivity = {
            lastUpdateWeek: getWeek(new Date()),
            tags: {},
        };
        userActivity.tags[tagName] = [[], [], []];
    } else {
        userActivity = JSON.parse(userActivity);
    }

    if (userActivity.lastUpdateWeek != currentWeekNumber) {
        userActivity.tags[tagName].pop();
        userActivity.tags[tagName].unshift([]);
        userActivity.lastUpdateWeek = currentWeekNumber;
    }

    if (!Array.isArray(newItems)) {
        newItems = [newItems];
    }

    newItems.forEach((item) => {
        userActivity.tags[tagName][0].push(item);
    });

    console.log(userActivity);
    res.cookie(cookieName, JSON.stringify(userActivity), {
        maxAge: 900000,
        httpOnly: true,
    });
    console.log(
        `Added items ${newItems} to epoch one of tag ${tagName} for user ${userId}.`
    );
};

const getRecommendedTags = (req, res, userId, tagName) => {
    const cookieName = `${userId}_recommendations`;
    let userActivity = req.cookies[cookieName];
    if (!userActivity) {
        console.log(`No cookie found with ${userId} userId`);
        return;
    }
    userActivity = JSON.parse(userActivity);
    if (!userActivity.tags[tagName]) {
        console.log(`No tag found with ${tagName} name`);
        return;
    }
    const epochs = userActivity.tags[tagName];

    const itemsFromFirstEpoch = selectRandomItems(epochs[0], 3);
    const itemsFromSecondEpoch = selectRandomItems(epochs[1], 2);
    const itemsFromThirdEpoch = selectRandomItems(epochs[2], 1);
    return [
        ...itemsFromFirstEpoch,
        ...itemsFromSecondEpoch,
        ...itemsFromThirdEpoch,
    ];
};

module.exports = { createUser, addTag, addItemToTag, getRecommendedTags };
