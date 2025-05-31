# Spotify Clone

A Spotify Clone built using modern web technologies, replicating core features of Spotify for an enhanced music streaming experience.

## UI images

### 1. log-in

<img src="./assets/screenshorts/login_screen.jpeg" width="150" height="350"/>

### Tabs

<img src="./assets/screenshorts/home_screen.jpeg" width="200" height="400"/>
<img src="./assets/screenshorts/Top_tracks.jpeg" width="200" height="400"/>
<img src="./assets/screenshorts/library.jpeg" width="200" height="400"/>

### Artist, Album and Playlist screens

<img src="./assets/screenshorts/artist.jpeg" width="200" height="400"/>
<img src="./assets/screenshorts/playlist.jpeg" width="200" height="400"/>
<img src="./assets/screenshorts/album.jpeg" width="200" height="400"/>

## Features

### User Authentication

- Secure login with Spotify OAuth
- User profile display with image, name, and account details

### Home Screen

- Discover new music through the latest releases
- Explore top charts and trending tracks

### Search

- Search for songs, albums, artists, and playlists
- Categorized search results for better navigation

### Artist & Album Pages

- View artist details including image, followers, and genres
- Listen to top tracks by the artist
- Explore all the albums of a artist

### Playlist & Library Management

- Display user-created and saved playlists
- View playlist details including cover image, song list, owner, and follower count
- Follow and unfollow playlists

### Favorite Songs & Liked Playlists

- Browse the user's collection of liked songs
- View followed artists and their latest music
- Like and unlike songs with a single click

### Shareable Song Functionality

- Users can share songs with each other using deep linking
- Deep links redirect through a universal link (web domain) and then open the app at the shared song location for a seamless experience

### Multilingual Support

- Users can change the app language from the Settings screen
- Language content is fetched dynamically from the server to support future additions without app updates
- The selected language is cached using AsyncStorage, ensuring persistence across sessions

## 🎥 Demo Video

<a href="https://drive.google.com/drive/u/0/folders/1kY6vWRmDQJaKG-b1KheaYasDQRbubEje" target="_blank">
    <img src="./assets/screenshorts/home_screen.jpeg" width="100" height="200"/>
</a>

---

## Tech Stack

- React native for building the user interface with expo framework
- native for styling
- Redux for state management
- Spotify Web API for fetching music data
- OAuth 2.0 for user authentication
- Tailwind CSS for responsive and modern styling
- React-native libraries for implementing the functionality like deep linking and share song. 

---

## Getting Started

1. Clone the repository: `git clone https://gitlab.com/arvindkumar31.1/spotify-clone-with-react-native.git`
2. Install dependencies: `npm install`
3. Configure Spotify OAuth credentials in the `.env` file
4. Start the development server: `npm start`

---

## Future Improvements

- Offline mode for playing downloaded songs
- Playlist collaboration with other users
- Real-time lyrics display

---
