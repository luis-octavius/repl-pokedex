import { type State } from "./state.js";

export async function startREPL(state: State) {
  state.read.prompt();

  state.read.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.read.prompt();
      return;
    } 

    const commandName = words[0];


    for (const [name, callback] of Object.entries(state.commands)) {
      if (name === commandName) {
        try {
          if (name === "explore") {
            await callback.callback(state, words[1])
            continue;
          }
          
          await callback.callback(state)

        } catch (err) {
          console.error((err as Error).message);
          return;
        }
      }
    }

    state.read.prompt();
  });
}

export function cleanInput(input: string): string[] {
  const cleaned = input.trim().split(/\s+/);
  for (let i = 0; i < cleaned.length; i++) {
    cleaned[i] = cleaned[i].toLowerCase();
  }

  return cleaned;
}
