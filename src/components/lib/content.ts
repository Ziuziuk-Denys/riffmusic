export const repo = "rootscripts/riff";

export const links = {
  repo: "https://github.com/rootscripts/riff",
  releases: "https://github.com/rootscripts/riff/releases",
  latestRelease: "https://github.com/rootscripts/riff/releases/latest",
  license: "https://github.com/rootscripts/riff/blob/main/LICENSE",
  telegram: "https://t.me/riffplayer",
  koFi: "https://ko-fi.com",
  mobileFork: "https://rootless.shit.vc/fork",
};

export const sections = [
  { id: "themes", label: "Themes" },
  { id: "editor", label: "Audio Editor" },
  { id: "features", label: "Features" },
  { id: "download", label: "Download" },
  { id: "faq", label: "FAQ" },
] as const;

export const nav = {
  star: "Star",
  download: "Download",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  starOnGithub: "Star on GitHub",
  toggleTheme: "Toggle dark theme",
  skip: "Skip to content",
};

export const hero = {
  title: "Riff",
  subtitle: "The music player for your desktop.",
  download: "Download",
  otherPlatforms: "Other platforms",
  viewSource: "View source",
  note: "Free and open source. For Windows, Linux and macOS.",
  mobileNote: "Unofficial community fork, not an official Riff build.",
  mobileNoteLink: "Read the FAQ",
};

export const counters = {
  downloads: "total downloads",
  stars: "GitHub stars",
  subscribers: "Telegram subscribers",
};

export const telegram = {
  title: "Join the Riff channel",
  subtitle: "@riffplayer · news, releases and sneak peeks",
  action: "Open Telegram",
};

export const themes = {
  title: "Dress it up.",
  lead: "Pick Dark, Light or another preset, then tune hue, saturation and brightness. Add your own wallpaper, or write custom CSS and rebuild the whole look.",
  note: "Pick a color. It changes this whole page.",
  pickerLabel: "Accent color",
  custom: "Custom color",
};

export const editor = {
  title: "Edit tracks right in the player.",
  lead: "Slow a song down or speed it up, push the bass, and dial in a 10-band equalizer. Tempo changes keep the original pitch, and reverb or distortion apply live while the track plays.",
};

export const features = {
  title: "Why switch to Riff",
  streaming: {
    title: "Streaming with no ads or telemetry.",
    body: "Listen to YouTube Music, YouTube and SoundCloud without ads or a Premium plan. Riff caches what you play, so tracks start instantly instead of making you wait on a buffer.",
  },
  files: {
    title: "Your files, untouched.",
    body: "Tags and cover art are read in place. Riff never renames, moves or rewrites a file, and local audio plays lossless.",
    formats: ["FLAC", "MP3", "WAV", "OGG"],
  },
  importing: {
    title: "Switch easy.",
    body: "Drop in a public playlist link from Spotify, Apple Music, YouTube or SoundCloud and Riff rebuilds it in your library.",
  },
  discord: {
    title: "Discord RPC, easier.",
    body: "Your Discord profile shows what is playing: title, artist, cover and a live progress bar. Nothing to sign in to.",
    status: "Listening to Riff",
  },
  memory: {
    title: "Fast and light on memory.",
    body: "A single small process that launches quickly and keeps the music going in the background.",
    value: 150,
    unit: "MB",
  },
};

export const download = {
  title: "Download",
  lead: "All tools are included on Windows and Linux.",
  macHint: "If macOS blocks Riff, open Terminal and run:",
  macCommands: ["xattr -cr /Applications/Riff.app", "brew install yt-dlp ffmpeg"],
  copy: "Copy",
  copied: "Copied",
  copyFailed: "Select and copy",
};

export const platforms = [
  {
    os: "win",
    name: "Windows",
    requirement: "Windows 10 and 11, 64-bit",
    body: "One installer with every dependency inside. Media keys and taskbar playback controls just work.",
    primary: { asset: "win", label: "Download installer" },
    secondary: { asset: "winzip", label: "Portable .zip" },
  },
  {
    os: "linux",
    name: "Linux",
    requirement: "AppImage and .deb",
    body: "Works across Ubuntu, Debian, Arch and Fedora, and can put its own shortcut in your app menu.",
    primary: { asset: "appimage", label: "Download AppImage" },
    secondary: { asset: "deb", label: "Download .deb" },
  },
  {
    os: "mac",
    name: "macOS",
    requirement: "Beta. Apple silicon and Intel",
    body: "Native builds for Apple silicon (M1 to M4) and for Intel. The app is not notarized yet, so you may need the Terminal commands below.",
    primary: { asset: "dmgarm", label: "Download for Apple silicon" },
    secondary: { asset: "dmgx64", label: "Download for Intel" },
  },
] as const;

export const faq = {
  title: "Questions",
  items: [
    {
      question: "Does Riff cost anything?",
      answer: "Nothing. Riff is MIT-licensed open source software with no subscription, trial or paid upgrade.",
    },
    {
      question: "Are there ads?",
      answer: "None. Music from YouTube Music and SoundCloud plays ad-free.",
    },
    {
      question: "Do I need an account?",
      answer: "No. Install it and start listening. Riff never asks you to sign in and sends no usage data.",
    },
    {
      question: "Can it play my own music files?",
      answer:
        "Yes. FLAC, MP3, WAV and OGG are supported. Riff reads tags and artwork and builds playlists without modifying your files.",
    },
    {
      question: "Does it work offline?",
      answer: "Yes. Your local library and anything you have downloaded play with no connection.",
    },
    {
      question: "How do I import a Spotify playlist?",
      answer:
        "Paste a public playlist link. Riff recreates it in your library, and large playlists of more than 100 tracks work too.",
    },
    {
      question: "Is there an Android or iOS version?",
      answer:
        "There is no official mobile app; Riff is a desktop player. On Android and iOS the download button opens a page listing community forks.",
    },
    {
      question: "Are the Android and iOS forks official?",
      answer:
        "No. They are community projects, not made by the Riff author. The linked page lists forks the author trusts or has been sent, so it is not complete. Forks that are not listed are unverified; install them at your own risk.",
    },
  ],
};

export const footer = {
  links: [
    { href: links.repo, label: "GitHub" },
    { href: links.releases, label: "Releases" },
    { href: links.telegram, label: "Telegram" },
    { href: links.koFi, label: "Support on Ko-fi" },
    { href: links.license, label: "MIT License" },
  ],
  note: "Riff is for personal and educational use.",
};

export const accentColors = [
  { name: "Blue", value: "#0071e3" },
  { name: "Purple", value: "#8d5ef2" },
  { name: "Pink", value: "#ff2d92" },
  { name: "Red", value: "#ff3b30" },
  { name: "Orange", value: "#ff9500" },
  { name: "Green", value: "#28a745" },
  { name: "Graphite", value: "#3a3a3c" },
];

export const playlistLinks = [
  { service: "spotify", url: "open.spotify.com/playlist/…" },
  { service: "appleMusic", url: "music.apple.com/playlist/…" },
  { service: "youtube", url: "youtube.com/playlist?list=…" },
  { service: "soundcloud", url: "soundcloud.com/sets/…" },
] as const;

export const images = {
  hero: { src: "https://i.postimg.cc/J7knTx10/image.png", alt: "Riff on a laptop", width: 1008, height: 635 },
  themes: { src: "https://i.postimg.cc/MT4S7Cc4/image.png", alt: "Riff theme settings", width: 1021, height: 672 },
  editor: { src: "https://i.postimg.cc/vZCpTrVv/Frame-2-(1).png", alt: "Riff audio editor", width: 1021, height: 672 },
  releases: { src: "https://i.postimg.cc/wBVcZHg1/image.png", alt: "Riff releases on GitHub", width: 1008, height: 639 },
  icon: "/images/icon-black.png",
};
