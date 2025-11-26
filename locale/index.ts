import fs from "fs";
const sourceDirectory = "./resource/lang";
const outputDirectory = "./locale/generated";
type MasterType = Record<string, Record<string, string>>;
const description =
{
    template: `<meta name="description" lang="__LANG__" content="__DESCRIPTION__">`,
    separetor: "\n",
    output: `${outputDirectory}/description.html`,
};
const twitterDescription =
{
    template: `<meta name="twitter:description" lang="__LANG__" content="__DESCRIPTION__">`,
    separetor: "\n",
    output: `${outputDirectory}/twitter-description.html`,
}
const noscriptMessage =
{
    template: `<div lang="__LANG__" dir="__LANG_DIRECTION__">__NOSCRIPT_MESSAGE__</div>`,
    separetor: "\n",
    output: `${outputDirectory}/noscript-message.html`,
};
const makeMasterFromSource = async () =>
{
    const temporaryMaster = { } as MasterType;
    await Promise.all
    (
        fs.readdirSync(sourceDirectory)
        .filter((file: string) => file.endsWith(".json"))
        .sort()
        .map
        (
            async (file: string) =>
            {
                const lang = file.replace(/\.json$/, "");
                const json = JSON.parse(await fs.promises.readFile(`${sourceDirectory}/${file}`, "utf8"));
                temporaryMaster[lang] = json;
            }
        )
    );
    const master = { } as MasterType;
    Object.keys(temporaryMaster)
        .sort()
        .forEach(key => master[key] = temporaryMaster[key]);
    return master;
};
const checkMaster = (master: MasterType) =>
{
    const allUniqueKeys = Object.values(master)
        .reduce((previous, current) => previous.concat(Object.keys(current)), [] as string[])
        .filter((i, ix, list) => list.indexOf(i) === ix);
    const commonUniqueKeys = Object.values(master)
        .reduce((previous, current) => previous.filter(key => key in current), allUniqueKeys);
    Object.keys(master).forEach
    (
        lang =>
        {
            const langKeys = Object.keys(master[lang]);
            const missingKeys = allUniqueKeys.filter(key => ! langKeys.includes(key));
            const extraKeys = langKeys.filter(key => ! commonUniqueKeys.includes(key));
            if (0 < missingKeys.length)
            {
                if (0 < extraKeys.length)
                {
                    console.error(`🚫 ${sourceDirectory}/${lang}.json: Missing keys: ${missingKeys.join(", ")}, Extra keys: ${extraKeys.join(", ")}`);
                }
                else
                {
                    console.error(`🚫 ${sourceDirectory}/${lang}.json: Missing keys: ${missingKeys.join(", ")}`);
                }
            }
            else
            if (0 < extraKeys.length)
            {
                console.error(`🚫 ${sourceDirectory}/${lang}.json: Extra keys: ${extraKeys.join(", ")}`);
            }
        }
    );
};
const writeHtmlPart = (master: MasterType, data: { template: string, separetor: string, output: string }) => fs.writeFileSync
(
    data.output,
    Object.keys(master).map
        (
            (lang: string) => data.template
                .replace(/__LANG__/g, lang)
                .replace(/__LANG_DIRECTION__/g, master[lang]["lang-direction"])
                .replace(/__DESCRIPTION__/g, master[lang]["description"])
                .replace(/__NOSCRIPT_MESSAGE__/g, master[lang]["noscript-message"])
                .replace(/__NOSCRIPT_INTRODUCTION_TITLE__/g, master[lang]["noscript-introduction-title"])
                .replace(/__NOSCRIPT_INTRODUCTION_DESCRIPTION__/g, master[lang]["noscript-introduction-description"])
        )
        .join(data.separetor),
    "utf8"
);
const writeSCSS = (master: MasterType) =>
{
    const keys = Object.keys(master);
    const initialWait = 1;
    const showSpan = 4.5;
    const showRate = 100 / keys.length;
    const fadeDuration = showRate *0.2;;
    let scss = "";
    scss += `#noscript\n`;
    scss += `{\n`;
    scss += `    *[lang]\n`;
    scss += `    {\n`;
    scss += `        opacity: 0;\n`;
    scss += `        animation: noscript-langs-fade ${keys.length *showSpan}s infinite;\n`;
    scss += `    }\n`;
    keys.forEach
    (
        (lang: string, ix: number) => scss += `    *[lang="${lang}"] { animation-delay: ${initialWait +(ix *showSpan)}s; }\n`
    );
    scss += `}\n`;
    scss += `@keyframes noscript-langs-fade\n`;
    scss += `{\n`;
    scss += `    0% { opacity: 0; }\n`;
    scss += `    ${fadeDuration}% { opacity: 1; }\n`;
    scss += `    ${showRate}% { opacity: 1; }\n`;
    scss += `    ${showRate +fadeDuration}% { opacity: 0; }\n`;
    scss += `    100% { opacity: 0; }\n`;
    scss += `}\n`;
    fs.writeFileSync
    (
        `${outputDirectory}/langs.scss`,
        scss,
        "utf8"
    );
};
const main = async () =>
{
    const master = await makeMasterFromSource();
    checkMaster(master);
    fs.writeFileSync
    (
        `./README.md`,
        fs.readFileSync("./README.template.md", "utf8")
            .replace(/__LANG_LABEL_LIST__/g, Object.keys(master).map(key => `${master[key]["lang-label"]}(${key})`).join(", ")),
        "utf8"
    );
    fs.writeFileSync
    (
        `${outputDirectory}/master.ts`,
        `export const localeMaster = ${JSON.stringify(master, null, 4)};`,
        "utf8"
    );
    fs.writeFileSync
    (
        `${outputDirectory}/manifest.langs.json`,
        JSON.stringify(Object.keys(master).map(lang => ({ "__LOCALE__": lang})), null, 4),
        "utf8"
    );
    fs.writeFileSync
    (
        `${outputDirectory}/web-manifest-assets.json`,
        JSON.stringify(Object.keys(master).map(lang => `./web.manifest/generated/${lang}.json`), null, 4),
        "utf8"
    );
    writeSCSS(master);
    writeHtmlPart(master, description);
    writeHtmlPart(master, twitterDescription);
    writeHtmlPart(master, noscriptMessage);
};
main();
