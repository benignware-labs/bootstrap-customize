# bootstrap-customize

Drop-in add-on for Bootstrap to customize theme colors at runtime

## Why?

Despite the Bootstrap community's efforts to push it further towards css-variables, still theme-colors are rather exposed than being dynamically integrated. Also, it hasn't caught up yet with recent css spec baselines. Make no mistake: It's foundational for the success of a library to not change stuff every now and then.

However, by leveraging the benefits of css color module level 4 as well as some further tweaks, we can overcome this limitations. Our solution takes care of tint and contrast colors. It is conceived as a patch that has Bootstrap as a peer dependency, so we're always as up-to-date as possible. Though being implemented in scss, so it integrates with your setup, we can also pull in the css build: It's actually dynamic.

