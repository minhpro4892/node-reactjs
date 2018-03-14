function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("REDIS_KEY", {
    "CC_SESSION_KEY": "CC_SESS:",
    "leaderboardsUser": "BP_LEADERBOARDS:USER"
});
define("SECURE", "cc@($#h434#$#Ls");