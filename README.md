## Ericarthurc.com

Project version: `0.2.0 alpha | 1/16/2023`

### Currently built with [Remix](https://remix.run/)

- My personal blog website and testing ground for all thinks full stack web
- You can never trust this stack will be in production as I change the stack all the time

### Why Remix

- It is currently the most mature [PESPA](https://www.epicweb.dev/the-webs-next-transition)
- Allows me to:
  1. Write dynamic backend content
  2. Serve HTML from the backend to the client
  3. Hydrate the frontend for a SPA feel
  4. Not having to use an AJAX style API

### Why not Remix

- Well it is a very new technology and stack. There isn't a ton of community knowledge floating around yet. With Remix your whole stack will be in JavaScript/TypeScript which a lot of people don't love. I am okay with the JS/TS stack here; I have a lot of experience with lots of languages/frameworks and the JavaScript hate is definitely coming from purists, but hey this is 2023 and you never know what will suprise you in the web design space. And then lastly, there is going to be a lot of new and upcoming [PESPA](https://www.epicweb.dev/the-webs-next-transition) frameworks this year and they could be better? If you're in love with Rust, like me, go take a look at [Leptos](https://github.com/leptos-rs/leptos). If it wasn't so bleeding edge and the tooling in Rust wasn't so absolutely horrible I may be building in Leptos right now. WASM, Rust, and Leptos have a long road ahead of them, but this stuff is the beginning of the future.

### Database stack

- CockroachDB
- Redis

### Previous stacks

##### A list of stacks and the reason I moved on

- Rust Axum | SolidJs (2022/2023)
  - wanted to get away from api fetching on SPAs for my blog
- Rust Axum | Leptos (2022)
  - tooling is not mature enough yet, but very interested in its SSR partial hydration
- Rust Axum | Askama/Preact/Webpack (2022)
  - missing the SPA user feel
- Go Gin | Pongo2 (2022)
  - didn't enjoy working with gin
- Go Echo | Pongo2 (2022)
  - wanted to move to Rust
- Go Fiber | Pongo2 (2022)
  - fiber isn't built on net/http
- F# Giraffe (2022)
  - F# is an awesome language, just very niche and still relies on .Net. I just have a hard time finding a use case for F#
- C# Blazor/Razor (2022)
  - want to love C# but don't enjoy the .Net framework; and I am a bigger fan of functional/procedural coding styles over OOP
- Nim Prologue | Karax (2021)
  - nim is an amazing language but still very immature
- Deno Oak | ETA (2021)
  - deno was a little to new at the time
- Node Koa | React (2021)
  - wanted to move to Deno
- Node Express | EJS (2020)
  - started everything here a couple years back; express

### Todo

- lots of stuff, this isn't production ready
- will update this more as I make progress towards version 1.0.0
- admin console doesn't need to be up to be version 1
