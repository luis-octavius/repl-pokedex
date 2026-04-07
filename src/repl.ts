import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input) => {
    const cleaned = cleanInput(input);

    if (input.length === 0) {
      rl.prompt();
    } else {
      console.log(`Your command was: ${cleaned[0]}`);
    }
  });
}

export function cleanInput(input: string): string[] {
  const cleaned = input.trim().split(/\s+/);
  for (let i = 0; i < cleaned.length; i++) {
    cleaned[i] = cleaned[i].toLowerCase();
  }

  return cleaned;
}
