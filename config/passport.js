// Script de JavaScript hecho por @Adeveloper_games //
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: [
                "identify"
            ]
        },
        async (accessToken, refreshToken, profile, done) => {
            const avatarURL = profile.avatar
                ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`
                : `https://cdn.discordapp.com/embed/avatars/${Number(profile.discriminator) % 5}.png`;

            const user = {
                provider: "discord",
                discord: {
                    id: profile.id,
                    username: profile.username,
                    displayName: profile.global_name || profile.username,
                    discriminator: profile.discriminator,
                    avatar: profile.avatar,
                    avatarURL: avatarURL
                }
            };
            return done(null, user);
        }
    )
);
module.exports = passport;