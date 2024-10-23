import Greetings from "./Greetings.jsx";

export default function MainContainer() {
  return (
    <main className="rounded-3xl border border-secondary border-x-transparent">
      <div className="flex flex-col items-center p-3">
        <h1 className="text-2xl text-text sm:text-4xl">Ultra Store</h1>
        <Greetings message="¡Te doy la bievenida a mi tienda! 👋" />
        <h2 className="text-sm text-[gray] sm:text-base">
          ⚒️ Todavia seguimos trabajando en la página ⚒️
        </h2>
      </div>
    </main>
  );
}
