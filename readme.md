# TD2L
A simple program that translates TypeScript definition files to Lua code

## Why?
Most scripts written in Lua lack type information (no [annotations](https://luals.github.io/wiki/annotations/) in comments), which makes it difficult for advanced syntax suggestion tools to function properly.

Years ago, a project called [Ts2Lua](https://typescripttolua.github.io) was created, which translates TypeScript code into Lua. Since TypeScript supports strong typing, a .d.ts file containing information about the methods and types provided by the game engine needs to be included in the project.

This project has been widely adopted, and many games have been supported, for example, [Dota2](https://github.com/TypeScriptToLua/Dota2Declarations), [Garry's Mod](https://github.com/lolleko/gmod-typescript), [Stalker](https://github.com/xray-forge/xray-16-types).

However, writing in TypeScript is not always the best option, and Ts2Lua creates an additional layer over which we have no complete control. Moreover, the [Lua Language Server (LLS)](https://luals.github.io) offers a level of comfort in working with Lua comparable to that of TypeScript limited by Ts2Lua. The only problem is that for LLS to work, it needs type information in the form of annotations in comments.

Therefore, I decided to create a tool that translates .d.ts files written for Ts2Lua back to Lua code with annotations.

## Installation

### Compile from source code
1. Download repo: `git clone https://www.github.com/AmonDeShir/td2l.git`
2. Go to project directory `cd ./td2l`
3. Download dependencies `yarn install`
4. Compile project `yarn build`

### Download pre-built version
https://github.com/AmonDeShir/td2l/releases

## How to use?
Just run `td2l ./source.d.ts /output.lua`