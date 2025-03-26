import Note from "@/components/features/Note/Note";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/auth/signin">
        <Button label="Sign in" /> 
      </Link>
      <Link href="/auth/signup">
        <Button label="Sign up" /> 
      </Link>
      <Note />
    </>
  )
}
