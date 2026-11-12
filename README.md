# Quiz

Ett quiz med 10 frågor om webbutveckling, gjort med HTML, CSS och JavaScript.

## Så kör du projektet

Koden använder JavaScript-moduler (`import`/`export`). Webbläsaren tillåter inte moduler när `index.html` öppnas direkt med dubbelklick (`file://`), så projektet måste köras via en lokal webbserver. Välj ett av alternativen:

### Alternativ 1: Live Server i VS Code
1. Installera tillägget **Live Server**.
2. Högerklicka på `index.html` och välj **Open with Live Server**.

### Alternativ 2: Node.js
Kräver att [Node.js](https://nodejs.org) är installerat. Kör i projektmappen:

```
npx serve
```

Öppna sedan adressen som skrivs ut i terminalen, vanligtvis `http://localhost:3000`.

## Funktioner
- Namnformulär med validering (minst 2 tecken)
- Rätt och fel svar markeras direkt, och knapparna låses efter svar
- Resultat med lista över felsvar och rätt svar
- Spela igen utan att ladda om sidan
- Senaste resultatet sparas i `localStorage`

## Filer
- `index.html` – sidans struktur
- `css/style.css` – utseende (mobile first)
- `js/main.js` – logik och rendering
- `js/state.js` – quizets tillstånd
- `js/questions.js` – frågorna
- `js/storage.js` – sparar och läser senaste resultatet
- `js/elements.js` – skapar svarsknapparna
