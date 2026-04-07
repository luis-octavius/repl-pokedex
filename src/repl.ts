import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { CLICommand, getCommands } from "./commands.js";

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const commands: Record<string, CLICommand> = getCommands();

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];

    for (const [name, callback] of Object.entries(commands)) {
      if (name === commandName) {
        callback.callback(commands);
        return;
      }
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  const cleaned = input.trim().split(/\s+/);
  for (let i = 0; i < cleaned.length; i++) {
    cleaned[i] = cleaned[i].toLowerCase();
  }

  return cleaned;
}
