# DAWesome - DAW that is awesome!

Hi! This is **DAWesome** - an awesome Digital Audio Workstation created in **ReactJS** with **TypeScript**!

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Technical Choices](#technical-choices)
* [Testing](#testing)
* [Additional Features](#additional-features)
* [TODO Features](#todo-features)
## Installation

In the project root directory simply run `npm install`.

## Getting Started

Start the app by executing the `npm start` command in your terminal. It will run the development server on **localhost:3000**. From now on, you are good to go and can start playing with the app!

You can set the *TIMELINE* scale (zoom) and *DURATION* of the song in *config.ts* file located at *src/app/_config*.

## Technical Choices

- ***Create React App*** - Initial configuration for ReactJS app - [Docs](https://github.com/facebook/create-react-app#readme).
- ***TypeScript*** - improves the code quality making it more reliable and easier to maintain and refactor.
- ***SCSS modules*** - CSS preprocessor make writing styles more easily, give avalibity to use imports, mixins, variables. Modules
  scope scss stylesheet inside particular component.
- ***Redux and ReduxToolKit*** - simplifies store management and development of store related features. Minimizes boilerplate code and
  improves readibility - [Docs](https://redux-toolkit.js.org/).
- ***React DnD*** - For making drag and drop easy - [Docs](https://react-dnd.github.io/react-dnd/about).
- ***Standardized Audio Context*** - A cross-browser wrapper for the Web Audio API -
  [Docs](https://github.com/chrisguttandin/standardized-audio-context).
- ***Prettier*** - To ensure that code is always correctly formatted - [Docs](https://prettier.io/)

Apart from what is above, there are a couple of addional packages listed in `package.json` file which usage is self explanatory.

## Testing
To run existing tests execute `npm run test`. Basic tests are written which covers some of the components, services and utils. Web Audio API is mocked using additonal package called *standardized-audio-context-mock*.

## Additional Features

- **Playback Controller** - Allows to play, pause and stop simultaneously multiple tracks. Comes with a timer and tick marker to indicate the current second of the playback. Controller is horizontally scrollable (you can use scrollbar or *SHIFT + mouswheel* on controller itself or on any track). It position is sticky so it's always at the top regardless of how many tracks there are.
- **Multiple Tracks** - Adds and removes track from the view making the content vertically scrollable.
- **Mute Track** - Allows to mute and unmute certain track so it won't be heard during the playback.

## TODO Features
This list could be endless as there are infitie possibilities to make this app better but here I will list some easy-wins that will improve the app and the user experience:

- Make *TIMESCALE* and *DURATION* variables dynamic and specified by user
- Import of music files from drive
- Editing saved tracks (user click on EDIT button on saved track and that creates new track  containing proper samples)
- Saving whole arragement (logic for saving single track is done, now it only needs to be extended to save a list of tracks)
- Solo track (opposite of muting, mute others and keep only "soloed" track playing)
- Adding more plugins (apart from gainNode which is already created) and effects (Web Audio API gives many fantastic features to experiment with AudioNodes or use an existing libraries like [Tuna](https://github.com/Theodeus/tuna).
