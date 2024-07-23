import Header from "./header";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-[100vh] main-layout">
      <Header />
      <div className="grow p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="max-w-[1000px] mx-auto ">{children}</div>
      </div>
    </div>
  );
}
