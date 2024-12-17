// Installation des dépendances requises :
// npm install zustand@latest (pour la gestion d'état)
// npm i @tonejs/midi (pour gérer et lire les fichiers MIDI)

import { Midi } from "@tonejs/midi"; // Importation de la bibliothèque pour lire les fichiers MIDI
import { create } from "zustand"; // Importation de Zustand pour gérer l'état global

// Taille de la timeline pour afficher la progression des notes
export const TIMELINE_SIZE = 1000;

// Configuration des timings pour les notes
export const NOTE_SETTINGS = {
  OK: 0.3, // Tolérance pour une note OK
  GOOD: 0.2, // Tolérance pour une note GOOD
  PERFECT: 0.1, // Tolérance pour une note PERFECT
};

// Types de notes possibles
export const NOTE_TYPES = {
  MISS: "MISS", // Note manquée
  OK: "OK", // Note jouée correctement mais avec retard
  GOOD: "GOOD", // Note jouée avec un bon timing
  PERFECT: "PERFECT", // Note jouée parfaitement
};

// Mapping des codes MIDI aux noms des notes
export const NOTES_MAPPING = {
  45: "Middle", // Code MIDI 45 -> "Middle" (milieu)
  57: "Crash", // Code MIDI 57 -> "Crash" (cymbale)
  38: "Side", // Code MIDI 38 -> "Side" (côté)
};

// Couleurs associées à chaque note
export const NOTES_COLORS = {
  Middle: "#5A30DD", // Violet
  Side: "#82BB78", // Vert
  Crash: "orange", // Orange
};

// Positions des notes dans la scène
export const NOTES_POSITIONS = {
  Middle: { x: -0.5, y: 0 }, // Position de "Middle"
  Side: { x: 0.2, y: 0 }, // Position de "Side"
  Crash: { x: 0.7, y: 0.1 }, // Position de "Crash"
};

// Sons joués pour des événements spécifiques
const applauseAudio = new Audio("audios/applause.mp3"); // Applaudissements en fin de chanson
export const missAudio = new Audio("audios/miss.mp3"); // Son d'échec

// Création du store Zustand pour la gestion d'état global
export const useSong = create((set, get) => {
  // Fonction pour charger une chanson
  const loadSong = async (song) => {
    // Si aucune chanson n'est sélectionnée
    if (song === null) {
      const curAudio = get().songData?.audio;
      if (curAudio) curAudio.pause(); // Pause de l'audio en cours
      set({
        currentSong: null, // Réinitialise la chanson actuelle
        songData: null,
      });
      return;
    }

    // Chargement du fichier audio
    const audio = new Audio(`${song.path}.mp3`);
    await audio.play(); // Lecture immédiate

    // Déclenche l'applaudissement à la fin de la chanson
    audio.addEventListener("ended", () => {
      set({ songEnded: true }); // Marque la chanson comme terminée
      applauseAudio.currentTime = 0; // Redémarre l'applaudissement
      applauseAudio.play();
    });

    // Chargement du fichier MIDI associé à la chanson
    const midi = await Midi.fromUrl(`${song.path}.mid`);

    // Extraction des notes depuis les pistes MIDI
    const notes = [];
    midi.tracks.forEach((track) => {
      notes.push(...track.notes); // Ajoute toutes les notes à l'array "notes"
    });

    // Mise à jour de l'état global
    set({
      currentSong: song,
      songEnded: false,
      songData: { midi, notes, audio },
      combo: 0,
      score: { MISS: 0, OK: 0, GOOD: 0, PERFECT: 0 },
    });
  };

  // Fonction pour calculer la position d'une note dans la timeline
  const getNotePosition = (note) => {
    const songData = get().songData; // Récupère les données de la chanson
    if (!songData) return;

    const songDuration = songData.audio.duration; // Durée totale de la chanson
    return -(note.time / songDuration) * TIMELINE_SIZE; // Retourne la position dans la timeline
  };

  // Liste des callbacks à appeler quand une note est jouée
  const onNotePlayed = [];

  const registerOnNotePlayed = (callback) => {
    onNotePlayed.push(callback); // Ajoute un callback
  };

  const unregisterOnNotePlayed = (callback) => {
    const index = onNotePlayed.indexOf(callback);
    if (index !== -1) onNotePlayed.splice(index, 1); // Retire un callback
  };

  // Fichiers audio pour les différentes notes
  const audioFiles = {
    Middle: "audios/Taiko-Middle.mp3",
    Side: "audios/Taiko-Side.mp3",
    Crash: "audios/Taiko-Crash.mp3",
  };

  // Fonction pour jouer une note
  const playNote = (note) => {
    const audioSrc = audioFiles[note];
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.currentTime = 0; // Repart du début
      audio.play().catch((err) => console.error("Audio play error:", err));
      console.log(`Playing note: ${note}`);
    } else {
      console.error(`No audio file found for note: ${note}`);
    }

    // Déclenche les callbacks enregistrés
    get().playNoteFn(note);
    onNotePlayed.forEach((fn) => fn(note));
  };

  return {
    passthrough: false,
    setPassthrough: (value) => set({ passthrough: value }), // Permet d'activer/désactiver un mode spécifique

    // Liste des chansons disponibles
    songs: [
      {
        name: "Tropical Wawa",
        path: "audios/audiostock_199178",
        thumbnail: "thumbnails/tropical-wawa.webp",
      },
      {
        name: "Wawa City Pop",
        path: "audios/audiostock_1274720",
        thumbnail: "thumbnails/wawa-city-pop.webp",
      },
      {
        name: "Wawa Rock",
        path: "audios/audiostock_1111962",
        thumbnail: "thumbnails/wawa-rock.webp",
      },
    ],

    currentSong: null, // Chanson actuelle
    songData: null, // Données de la chanson chargée
    songEnded: false, // Statut de fin de chanson
    loadSong, // Charge une chanson
    getNotePosition, // Calcule la position d'une note
    registerOnNotePlayed,
    unregisterOnNotePlayed,
    playNote,
    playNoteFn: () => {}, // Fonction de jeu de note vide par défaut
    setPlayNoteFn: (fn) => set({ playNoteFn: fn }), // Définit une fonction pour jouer une note
    combo: 0, // Combo actuel
    score: { MISS: 0, OK: 0, GOOD: 0, PERFECT: 0 }, // Scores par type de note

    // Met à jour le score en fonction du type de note
    updateScore: (type) => {
      set((state) => {
        if (type === NOTE_TYPES.MISS && state.combo > 0) {
          missAudio.currentTime = 0;
          missAudio.play(); // Joue le son d'échec
        }
        return {
          combo: type === NOTE_TYPES.MISS ? 0 : state.combo + 1,
          score: { ...state.score, [type]: state.score[type] + 1 },
        };
      });
    },
  };
});
