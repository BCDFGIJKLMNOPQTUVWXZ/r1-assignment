export const DashboardLayout = ({ header, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {header}
      
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
};
