import {
    parse,
    green,
    bold,
    Args,
    existsSync,
    writeJsonSync,
    readJsonSync,
} from "./deps.ts";
import { displayHelpAndQuit } from './error.ts';
import { IConfigFile } from "./type.d.ts";

const setApiKey = (parsedArgs: Args): void => {
    // Get home directory address
    let homeEnv: string | undefined = Deno.env.get("HOME");
    let home: string = "";
    if (typeof homeEnv === "string") home = homeEnv;
    let configFilePath: string = `${home}/.newzzer.json`;
    // Check if api-key is provided
    if (typeof parsedArgs.config === "string") {
        // If the file is  not  present, then create file
        if (!existsSync(configFilePath)) {
            Deno.createSync(configFilePath);
        }
        // Write apiKey in the file
        writeJsonSync(configFilePath, { apiKey: parsedArgs.config });
        console.log(`${green(bold("Success"))} ApiKey set Successfully`);
        displayHelpAndQuit();
    } else {
        // Handling if apiKey is not present after --config
        displayHelpAndQuit("Config flag should be followed by apiKey");
    }
}

const getApiKey = () : any => {
    // Get home directory address
    let homeEnv: string | undefined = Deno.env.get("HOME");
    let home: string = "";
    if (typeof homeEnv === "string") home = homeEnv;
    let configFilePath: string = `${home}/.newzzer.json`;
    try {
        // try to read ~/.newzzer.json
        let file = readJsonSync(configFilePath);
        if (typeof file === "object" && file !== null) {
            let configFile = file as IConfigFile;
            if (configFile.apiKey) {
                return configFile.apiKey;
            } else {
                // If apiKey not present in file show error
                displayHelpAndQuit("apiKey not found in the config file");
            }
        }
    } catch (err) {
        // if file is not present, show error message and quit
        displayHelpAndQuit("Config file not present. Use --config to set apiKey");
    }
};

const BANNER = `
${bold("------------")}
${bold(green("Newzzer"))}
${bold("------------")}
${bold(green("Find your quick news byte at your terminal. Powered by News API"))}
`;

const displayBanner = (): void => {
    console.clear();
    console.log(BANNER);
}

// main logic
if (import.meta.main) {
    const { args } = Deno;
    const parsedArgs = parse(args);
    displayBanner();
    // If option to set API key i.e. --config flag is passed
    if (parsedArgs.config) setApiKey(parsedArgs);
    let apiKey: string = getApiKey();
    console.log(`Found API key: ${apiKey}`);
    if (args.length === 0 || parsedArgs.h || parsedArgs.help) {
        displayHelpAndQuit();
    } else {
        displayHelpAndQuit("Invalid argument");
    }
}
