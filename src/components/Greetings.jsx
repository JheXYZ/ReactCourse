export default function Greetings({ message = "¡Hola! 👋", wip = false }) {
  return (
    <>
      <h2 className="text-lg text-text sm:text-2xl">{message}</h2>
      {wip && <h3 className="text-gray-500 text-sm sm:text-base">⚒️ Todavia seguimos trabajando en la página ⚒️</h3>}
    </>
  );
}
