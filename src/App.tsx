/**
 * Root component of the application.
 * Renders the base setup structure.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter text-accent-teal md:text-6xl">
        Helicorp Smart Hub
      </h1>
      <p className="mt-4 text-zinc-400 max-w-md text-base leading-relaxed">
        Hệ thống điều khiển nhà thông minh thế hệ mới. Khởi tạo nền móng thành công và sẵn sàng thiết lập giao diện.
      </p>
    </main>
  )
}

export default App
