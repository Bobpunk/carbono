const LETTERS = [
  { ch: "C", color: "#4285F4" },
  { ch: "a", color: "#EA4335" },
  { ch: "r", color: "#FBBC05" },
  { ch: "b", color: "#4285F4" },
  { ch: "o", color: "#34A853" },
  { ch: "n", color: "#EA4335" },
  { ch: "o", color: "#4285F4" },
];

export default function LandingLogo() {
  return (
    <div className="text-center select-none">
      <h1
        aria-label="Carbono"
        className="font-sans font-semibold tracking-[-0.035em] leading-none text-[clamp(3.25rem,9vw,6rem)]"
      >
        {LETTERS.map((letter, index) => (
          <span key={letter.ch + index} aria-hidden="true" style={{ color: letter.color }}>
            {letter.ch}
          </span>
        ))}
      </h1>
      <p className="mt-12 text-body-large text-black-alpha-72">
        Nada se cria, tudo se copia!
      </p>
    </div>
  );
}
