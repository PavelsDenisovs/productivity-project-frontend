import MainNavBar from "@/components/features/MainNavBar";

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  )
}