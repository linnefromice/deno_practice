import { parse, green, bold } from './deps.ts';
import { displayHelpAndQuit } from './error.ts';

const BANNER = `
    ${bold("------------")}
    ${bold(green("Newzzer"))}
    ${bold("------------")}
    ${bold(green("Find your quick news byte at your terminal. Powered by News API"))}
`

const displayBanner = (): void => {
    console.clear();
    console.log(BANNER);
}

// main logic
if (import.meta.main) {
    const { args } = Deno;
    const parseArgs = parse(args);
    displayBanner();
    if (args.length === 0 || parseArgs.h || parseArgs.help) {
        displayHelpAndQuit();
    } else {
        displayHelpAndQuit("Invalid argument");
    }
}
