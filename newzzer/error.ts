// Importing colors
import { red, bold, cyan } from "./deps.ts";

const HELP_MESSAGE = `
    Usage: newzzer [filters]
    Optional flags:
        ${bold("-q, --query")}\t\t Find news related to a specific keyword.
        ${bold("-c, --category")}\t\t Find news in valid category. The valid categories are: business, entertainment, general, health, science, sports, technology.
        ${bold("--config <API_KEY>")}\t\t Set API Key for news API. The key can be recieved from ${cyan(`https://newsapi.org/register`)}
`;

// Shows help text, error message (if present) and exits the program
export const displayHelpAndQuit = (error?: string): void => {
    if (!error) {
        // do nothing
    } else if (error === "INVALID_KEY") {
        console.log(bold(red(`ERROR: Invalid API key. Use --config flag to set key`)));
    } else {
        console.log(bold(red(`ERROR: ${error}`)));
    }
    console.log(HELP_MESSAGE);
    // Exits the program
    Deno.exit();
}