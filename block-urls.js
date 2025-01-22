function updateDynamicRules(blockedUrls) {
    const rules = blockedUrls.map((url, index) => ({
        id: index + 1,
        condition: { urlFilter: url },
        action: { type: "block" }
    }));

    browser.declarativeNetRequest.getDynamicRules().then((existingRules) => {
        const existingRuleIds = existingRules.map((rule) => rule.id);
        browser.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: existingRuleIds,
            addRules: rules
        });
    });
}

browser.storage.local.onChanged.addListener((changes) => {
    if (changes.blockedUrls) {
        updateDynamicRules(changes.blockedUrls.newValue || []);
    }
});

browser.storage.local.get("blockedUrls").then((data) => {
    updateDynamicRules(data.blockedUrls || []);
});