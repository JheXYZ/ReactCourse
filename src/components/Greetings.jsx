export default function Greetings({ message = "¡Hola! 👋" }) {
  return <h2 className="text-lg text-text sm:text-2xl">{message}</h2>;
}
