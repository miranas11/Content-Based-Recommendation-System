const cookieParser = require("cookie-parser");

getWeek = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;

    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

getWeek(new Date());

createUser = (req, res, userId) => {
    const cookieName = `${userId}_recommendations`;
    if (!req.cookies[cookieName]) {
        res.cookies(cookieName, {
            lastUpdateWeek: getWeek(new Date()),
            tags: {},
        });
        console.log(`Empty cookie ${cookieName} created for user ${userId}.`);
    } else {
        console.log(`User ${userId} already has the cookie ${cookieName}.`);
    }
};

addTag = (req, res, tagName) => {
    const cookieName = `${userId}_recommendations`;
    let userActivity = req.cookies[cookieName]
        ? JSON.parse(req.cookies[cookieName])
        : {};
    if (!userActivity) {
        userActivity = {
            lastUpdateWeek: getWeek(new Date()),
            tags: {
                tagName: [[], [], []],
            },
        };
    }

    if (!userActivity.tags.tagName) {
        userActivity.tags[tagName] = [[], [], []];
        res.cookies(cookieName, JSON.stringify(userActivity));
        console.log(
            `Added tag ${tagName} with 3 epochs to cookie ${cookieName} for user ${userId}.`
        );
    } else {
        console.log(
            `Tag ${tagName} already exists in cookie ${cookieName} for user ${userId}.`
        );
    }
};

addItemToTag = (req, res, tagName) => {
    const cookieName = `${userId}_recommendations`;
    const currentWeekNumber = getWeek(new Date());
    let userActivity = req.cookies[cookieName]
        ? JSON.parse(req.cookies[cookieName])
        : {};
    if (!userActivity) {
        userActivity = {
            lastUpdateWeek: getWeek(new Date()),
            tags: {
                tagName: [[], [], []],
            },
        };
    }

    if (userActivity.lastUpdateWeek != currentWeekNumber) {
        userActivity.tags[tagName].pop();
        userActivity.tags[tagName].unshift([]);
        userActivity.lastUpdateWeek = currentWeek;
    }
    if (!userActivity) userActivity[tagName][0].push(newItem);

    res.cookie(cookieName, JSON.stringify(userActivity));
    console.log(
        `Added item ${newItem} to epoch one of tag ${tagName} for user ${userId}.`
    );
};
