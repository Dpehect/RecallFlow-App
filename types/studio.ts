export type Language = "en" | "de" | "fr";
export type Ritual = { id:string; time:string; title:string; note:string; language:Language };
export type Lexeme = { id:string; word:string; translation:string; note:string; tone:"blue"|"red"|"ink" };
