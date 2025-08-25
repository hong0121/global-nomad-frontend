export default function DateButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className='w-full px-3 py-4 text-16 border border-[#d3d3d3] rounded-xl'>
      {children}
    </button>
  );
}
